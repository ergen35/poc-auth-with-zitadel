import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './dashboard/$types';

export const load = (async ({ locals }) => {

    if(!locals.isLoggedIn || !locals.session) {
        throw redirect(303, "/");
    }
    
    return {};
}) satisfies LayoutServerLoad;