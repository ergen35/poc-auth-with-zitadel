import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateState } from 'arctic';
import { openIdClient } from '$lib/server/auth';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({ request, locals, cookies }) => {

        if(locals.isLoggedIn) {
            throw redirect(303, "/dashboard")
        }

        const signinRequest = await openIdClient.createSigninRequest({
            state: generateState()
        });
    
        cookies.set("__auth", JSON.stringify({ state: signinRequest.state }), {
            path: "/",
            expires: new Date(Date.now() + 20 * 60 * 1000), //20min
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });
        
        throw redirect(301, signinRequest.url);
    }
}