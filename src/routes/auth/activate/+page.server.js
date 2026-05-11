import { redirect } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load({ url, cookies }) {
	// Get token from URL parameter
	const token = url.searchParams.get('token');

	// No token → redirect to home
	if (!token) {
		throw redirect(303, '/');
	}

	try {
		const { db } = await connectToDatabase();
		const usersCollection = db.collection('users');

		// Find user with this activation token
		const user = await usersCollection.findOne({ activationToken: token });

		// User not found → redirect to home
		if (!user) {
			throw redirect(303, '/');
		}

		// Activate user and remove token
		await usersCollection.updateOne(
			{ _id: user._id },
			{
				$set: { isActive: true },
				$unset: { activationToken: '' }
			}
		);

		// Set session cookie (HTTP-only)
		cookies.set('session', user._id.toString(), {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		// Redirect to /listen
		throw redirect(303, '/listen');
	} catch (error) {
		if (error.status === 303) throw error; // Re-throw redirect
		console.error('Activation error:', error);
		throw redirect(303, '/');
	}
}
