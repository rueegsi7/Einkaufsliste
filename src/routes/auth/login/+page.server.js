import { fail, redirect } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		// Validation
		if (!email || !password) {
			return fail(400, { message: 'E-Mail und Passwort sind erforderlich', error: true });
		}

		try {
			const { db } = await connectToDatabase();
			const usersCollection = db.collection('users');

			// Find user
			const user = await usersCollection.findOne({ email });
			if (!user) {
				return fail(401, { message: 'Ungültige E-Mail oder Passwort', error: true });
			}

			// Check if account is active
			if (!user.isActive) {
				return fail(403, { message: 'Dein Account ist nicht aktiviert', error: true });
			}

			// Verify password
			const passwordMatch = await bcrypt.compare(password, user.passwordHash);
			if (!passwordMatch) {
				return fail(401, { message: 'Ungültige E-Mail oder Passwort', error: true });
			}

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
			console.error('Login error:', error);
			return fail(500, { message: 'Ein Fehler ist aufgetreten', error: true });
		}
	}
};
