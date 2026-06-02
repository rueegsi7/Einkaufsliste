// @ts-nocheck
import { redirect, fail } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load({ params, cookies }) {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie) {
		throw redirect(303, '/');
	}

	const listId = params.id;
	if (!listId) {
		throw redirect(303, '/listen');
	}

	let userId;
	let listObjectId;
	try {
		userId = new ObjectId(sessionCookie);
		listObjectId = new ObjectId(listId);
	} catch (error) {
		throw redirect(303, '/listen');
	}

	try {
		const { db } = await connectToDatabase();
		const listsCollection = db.collection('lists');
		const itemsCollection = db.collection('items');

		const list = await listsCollection.findOne({ _id: listObjectId, members: userId });
		if (!list) {
			throw redirect(303, '/listen');
		}

		const items = await itemsCollection
			.find({ listId: listObjectId, isBought: false })
			.sort({ createdAt: -1 })
			.toArray();

		return {
			listTitle: list.title,
			listId: list._id.toString(),
			items: items.map((item) => ({
				id: item._id.toString(),
				name: item.name,
				shop: item.shop,
				isBought: Boolean(item.isBought)
			}))
		};
	} catch (error) {
		console.error('Load list detail error:', error);
		throw redirect(303, '/listen');
	}
}

export const actions = {
	addItem: async ({ request, params, cookies }) => {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) {
			return fail(401, { message: 'Nicht authentifiziert' });
		}

		const listId = params.id;
		if (!listId) {
			return fail(400, { message: 'Listen-ID fehlt' });
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const shop = formData.get('shop');

		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return fail(400, { message: 'Artikelname ist erforderlich' });
		}

		if (!shop || typeof shop !== 'string' || shop.trim().length === 0) {
			return fail(400, { message: 'Laden ist erforderlich' });
		}

		try {
			const { db } = await connectToDatabase();
			const listsCollection = db.collection('lists');
			const itemsCollection = db.collection('items');
			const userId = new ObjectId(sessionCookie);
			const listObjectId = new ObjectId(listId);

			const list = await listsCollection.findOne({ _id: listObjectId, members: userId });
			if (!list) {
				return fail(403, { message: 'Zugriff verweigert' });
			}

			await itemsCollection.insertOne({
				name: name.trim(),
				shop: shop.trim(),
				listId: listObjectId,
				isBought: false,
				createdAt: new Date(),
				updatedAt: new Date()
			});

			return { success: true };
		} catch (error) {
			console.error('Add item error:', error);
			return fail(500, { message: 'Ein Fehler ist aufgetreten' });
		}
	},

	toggleItem: async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) {
			return fail(401, { message: 'Nicht authentifiziert' });
		}

		const formData = await request.formData();
		const itemId = formData.get('itemId');

		if (!itemId || typeof itemId !== 'string') {
			return fail(400, { message: 'Artikel-ID fehlt' });
		}

		try {
			const { db } = await connectToDatabase();
			const itemsCollection = db.collection('items');
			const itemObjectId = new ObjectId(itemId);

			const item = await itemsCollection.findOne({ _id: itemObjectId });
			if (!item) {
				return fail(404, { message: 'Artikel nicht gefunden' });
			}

			await itemsCollection.updateOne(
				{ _id: itemObjectId },
				{ $set: { isBought: !item.isBought, updatedAt: new Date() } }
			);

			return { success: true };
		} catch (error) {
			console.error('Toggle item error:', error);
			return fail(500, { message: 'Ein Fehler ist aufgetreten' });
		}
	},

	deleteItem: async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) {
			return fail(401, { message: 'Nicht authentifiziert' });
		}

		const formData = await request.formData();
		const itemId = formData.get('itemId');

		if (!itemId || typeof itemId !== 'string') {
			return fail(400, { message: 'Artikel-ID fehlt' });
		}

		try {
			const { db } = await connectToDatabase();
			const itemsCollection = db.collection('items');
			const itemObjectId = new ObjectId(itemId);

			await itemsCollection.deleteOne({ _id: itemObjectId });
			return { success: true };
		} catch (error) {
			console.error('Delete item error:', error);
			return fail(500, { message: 'Ein Fehler ist aufgetreten' });
		}
	}
};