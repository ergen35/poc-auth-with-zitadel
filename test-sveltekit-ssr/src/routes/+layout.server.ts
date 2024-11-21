import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {
        authState: {
            isLoggedIn: locals.isLoggedIn,
            session: locals.session
        }
    };
}) satisfies LayoutServerLoad;