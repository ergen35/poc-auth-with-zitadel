import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateState } from 'arctic';
import { openIdClient } from '$lib/server/auth';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({ locals, cookies }) => {

        if(locals.isLoggedIn) {
            throw redirect(303, "/dashboard")
        }

        const signinRequest = await openIdClient.createSigninRequest({
            state: generateState()
        });
        
        throw redirect(303, signinRequest.url);
    }
}