// @ts-nocheck
import { redirect, fail } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load({ cookies }) {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie) {
		throw redirect(303, '/');
	}

	try {
		const { db } = await connectToDatabase();
		const listsCollection = db.collection('lists');
		const usersCollection = db.collection('users');
		const itemsCollection = db.collection('items');
		const userId = new ObjectId(sessionCookie);

		const lists = await listsCollection.find({ members: userId }).toArray();

		const listsWithDetails = await Promise.all(
			lists.map(async (list) => {
				const members = await usersCollection
					.find({ _id: { $in: list.members } })
					.project({ firstName: 1, lastName: 1 })
					.toArray();

				const unboughtItemCount = await itemsCollection.countDocuments({
					listId: list._id,
					isBought: false
				});

				let shoppingBy = null;
				if (list.shoppingStatus?.userId) {
					const shoppingUser = await usersCollection.findOne({
						_id: new ObjectId(list.shoppingStatus.userId)
					});
					if (shoppingUser) {
						shoppingBy = `${shoppingUser.firstName} ${shoppingUser.lastName}`;
					}
				}

				return {
					_id: list._id.toString(),
					title: list.title,
					itemCount: unboughtItemCount,
					members: members.map((m) => ({
						id: m._id.toString(),
						initials: `${m.firstName?.charAt(0) ?? ''}${m.lastName?.charAt(0) ?? ''}`.toUpperCase()
					})),
					shoppingBy,
					isShopping: !!list.shoppingStatus
				};
			})
		);

		return {
			lists: listsWithDetails
		};
	} catch (error) {
		console.error('Load lists error:', error);
		throw redirect(303, '/');
	}
}

export const actions = {
	create: async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) {
			return fail(401, { message: 'Nicht authentifiziert' });
		}

		const formData = await request.formData();
		const title = formData.get('title');
		if (!title || typeof title !== 'string' || title.trim().length === 0) {
			return fail(400, { message: 'Listenname ist erforderlich' });
		}

		const { db } = await connectToDatabase();
		const userId = new ObjectId(sessionCookie);
		await db.collection('lists').insertOne({
			title: title.trim(),
			members: [userId],
			createdAt: new Date(),
			updatedAt: new Date(),
			shoppingStatus: null
		});

		return { success: true };
	},

	deleteList: async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) return fail(401, { message: 'Nicht authentifiziert' });

		const formData = await request.formData();
		const listId = formData.get('listId');

		const { db } = await connectToDatabase();
		const listObjectId = new ObjectId(listId);

		// Also delete all items associated with the list
		await db.collection('items').deleteMany({ listId: listObjectId });
		await db.collection('lists').deleteOne({ _id: listObjectId });

		return { success: true };
	},

	renameList: async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) return fail(401, { message: 'Nicht authentifiziert' });

		const formData = await request.formData();
		const listId = formData.get('listId');
		const newTitle = formData.get('title');

		if (!newTitle || typeof newTitle !== 'string' || newTitle.trim().length === 0) {
			return fail(400, { message: 'Neuer Name ist erforderlich' });
		}

		const { db } = await connectToDatabase();
		await db
			.collection('lists')
			.updateOne({ _id: new ObjectId(listId) }, { $set: { title: newTitle.trim() } });

		return { success: true };
	},

	inviteUser: async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) return fail(401, { message: 'Nicht authentifiziert' });

		const formData = await request.formData();
		const listId = formData.get('listId');
		const email = formData.get('email');

		if (!email) return fail(400, { message: 'E-Mail ist erforderlich' });

		const { db } = await connectToDatabase();
		const userToInvite = await db.collection('users').findOne({ email });

		if (!userToInvite) return fail(404, { message: 'Benutzer nicht gefunden' });

		await db
			.collection('lists')
			.updateOne({ _id: new ObjectId(listId) }, { $addToSet: { members: userToInvite._id } });

		return { success: true };
	}
};
