import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(303, '/auth/login');
	}
};
