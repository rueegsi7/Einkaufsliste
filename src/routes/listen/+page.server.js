// @ts-nocheck
import { redirect, fail } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load({ cookies }) {
	// Check if session cookie exists
	const sessionCookie = cookies.get('session');
	if (!sessionCookie) {
		throw redirect(303, '/');
	}

	try {
		const { db } = await connectToDatabase();
		const listsCollection = db.collection('lists');

		// Find all lists where user is a member
		const userId = new ObjectId(sessionCookie);
		const lists = await listsCollection
			.find({ members: userId })
			.toArray();

		return {
			lists: lists.map((list) => ({
				_id: list._id.toString(),
				title: list.title,
				itemCount: list.items ? list.items.length : 0,
				updatedAt: list.updatedAt || list.createdAt
			}))
		};
	} catch (error) {
		console.error('Load lists error:', error);
		throw redirect(303, '/');
	}
}

export const actions = {
	create: async ({ request, cookies }) => {
		// Check session
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) {
			return fail(401, { message: 'Nicht authentifiziert' });
		}

		try {
			const formData = await request.formData();
			const title = formData.get('title');

			// Validation
			if (!title || typeof title !== 'string' || title.trim().length === 0) {
				return fail(400, { message: 'Listenname ist erforderlich' });
			}

			const { db } = await connectToDatabase();
			const listsCollection = db.collection('lists');

			// Create new list
			const userId = new ObjectId(sessionCookie);
			const newList = {
				title: title.trim(),
				members: [userId],
				items: [],
				createdAt: new Date(),
				updatedAt: new Date()
			};

			const result = await listsCollection.insertOne(newList);

			return {
				success: true,
				listId: result.insertedId.toString()
			};
		} catch (error) {
			console.error('Create list error:', error);
			return fail(500, { message: 'Ein Fehler ist aufgetreten' });
		}
	}
};
