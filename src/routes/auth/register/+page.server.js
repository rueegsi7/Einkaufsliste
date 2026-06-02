import { fail } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db.js';
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');
		const email = formData.get('email');
		const password = formData.get('password');

		// Validation
		if (!firstName || !lastName || !email || !password) {
			return fail(400, { message: 'Alle Felder sind erforderlich', error: true });
		}

		try {
			const { db } = await connectToDatabase();
			const usersCollection = db.collection('users');

			// Check if user already exists
			const existingUser = await usersCollection.findOne({ email });
			if (existingUser) {
				return fail(400, { message: 'Ein User mit dieser E-Mail existiert bereits', error: true });
			}

			// Hash password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create new user
			const newUser = {
				firstName,
				lastName,
				email,
				passwordHash: hashedPassword,
				isActive: true,
				createdAt: new Date()
			};

			await usersCollection.insertOne(newUser);

			return {
				success: true,
				message: 'Registrierung erfolgreich. Du kannst dich jetzt einloggen.'
			};
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, { message: 'Ein Fehler ist aufgetreten', error: true });
		}
	}
};
