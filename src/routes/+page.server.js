import { fail, redirect } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export const actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');
		const email = formData.get('email');
		const password = formData.get('password');

		// Validation
		if (!firstName || !lastName || !email || !password) {
			return fail(400, { message: 'Alle Felder sind erforderlich' });
		}

		try {
			const { db } = await connectToDatabase();
			const usersCollection = db.collection('users');

			// Check if user already exists
			const existingUser = await usersCollection.findOne({ email });
			if (existingUser) {
				return fail(400, { message: 'Ein User mit dieser E-Mail existiert bereits' });
			}

			// Hash password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Generate activation token
			const activationToken = randomUUID();

			// Create new user
			const newUser = {
				firstName,
				lastName,
				email,
				passwordHash: hashedPassword,
				isActive: false,
				activationToken,
				createdAt: new Date()
			};

			const result = await usersCollection.insertOne(newUser);

			// Log activation link (for development)
			console.log(
				`\n✉️  Aktivierungslink für ${email}:\nhttp://localhost:5173/auth/activate?token=${activationToken}\n`
			);

			return {
				success: true,
				message: 'Registrierung erfolgreich. Bitte überprüfe deine E-Mail zur Aktivierung.'
			};
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, { message: 'Ein Fehler ist aufgetreten' });
		}
	},

	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		// Validation
		if (!email || !password) {
			return fail(400, { message: 'E-Mail und Passwort sind erforderlich' });
		}

		try {
			const { db } = await connectToDatabase();
			const usersCollection = db.collection('users');

			// Find user
			const user = await usersCollection.findOne({ email });
			if (!user) {
				return fail(401, { message: 'Ungültige E-Mail oder Passwort' });
			}

			// Check if account is active
			if (!user.isActive) {
				return fail(403, { message: 'Dein Account ist nicht aktiviert' });
			}

			// Verify password
			const passwordMatch = await bcrypt.compare(password, user.passwordHash);
			if (!passwordMatch) {
				return fail(401, { message: 'Ungültige E-Mail oder Passwort' });
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
			return fail(500, { message: 'Ein Fehler ist aufgetreten' });
		}
	}
};
