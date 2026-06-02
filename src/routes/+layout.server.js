import { connectToDatabase } from '$lib/server/db';
import { ObjectId } from 'mongodb';

export async function load({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		return { user: null };
	}

	// Basic validation for ObjectId
	if (!/^[0-9a-fA-F]{24}$/.test(session)) {
		return { user: null };
	}

	const { db } = await connectToDatabase();
	const usersCollection = db.collection('users');
	const user = await usersCollection.findOne({ _id: new ObjectId(session) });

	if (!user) {
		return { user: null };
	}

	return {
		user: {
			id: user._id.toString(),
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		}
	};
}
