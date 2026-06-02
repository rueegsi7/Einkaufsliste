// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load({ params, cookies }) {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie) {
		throw redirect(303, '/');
	}

	const { id: listId, shop } = params;
	if (!listId || !shop) {
		throw redirect(303, '/listen');
	}

	try {
		const userId = new ObjectId(sessionCookie);
		const listObjectId = new ObjectId(listId);

		const { db } = await connectToDatabase();
		const listsCollection = db.collection('lists');
		const itemsCollection = db.collection('items');

		const list = await listsCollection.findOne({ _id: listObjectId, members: userId });
		if (!list) {
			throw redirect(303, '/listen');
		}

		// Set shopping status
		await listsCollection.updateOne(
			{ _id: listObjectId },
			{ $set: { shoppingStatus: { userId: sessionCookie, shop } } }
		);

		const items = await itemsCollection
			.find({ listId: listObjectId, shop: decodeURIComponent(shop), isBought: false })
			.toArray();

		return {
			listId,
			shop,
			items: items.map((item) => ({
				id: item._id.toString(),
				name: item.name
			}))
		};
	} catch (error) {
		console.error('Load shopping mode error:', error);
		throw redirect(303, `/listen/${listId}`);
	}
}

export const actions = {
	finishShopping: async ({ request, params }) => {
		const formData = await request.formData();
		const itemIds = formData.getAll('itemIds[]');
		const { id: listId } = params;

		if (itemIds && itemIds.length > 0) {
			try {
				const itemObjectIds = itemIds.map((id) => new ObjectId(id));
				const { db } = await connectToDatabase();
				await db
					.collection('items')
					.updateMany({ _id: { $in: itemObjectIds } }, { $set: { isBought: true } });
			} catch (error) {
				console.error('Finish shopping error:', error);
			}
		}

		// Clear shopping status regardless of whether items were updated
		const { db } = await connectToDatabase();
		await db
			.collection('lists')
			.updateOne({ _id: new ObjectId(listId) }, { $set: { shoppingStatus: null } });

		throw redirect(303, `/listen/${listId}`);
	}
};
