import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { openIdClient } from '$lib/server/auth';
import type { SigninState } from 'oidc-client-ts';
import { env } from '$env/dynamic/private';
import type { SessionData } from '$lib';

export const load = (async ({ locals, cookies, request }) => {

    const localAuthCookie = cookies.get("__auth") || undefined;

    const localAuth = localAuthCookie ? JSON.parse(localAuthCookie) as { code_verifier: SigninState | undefined, state: string | undefined } : undefined;

    if (!localAuth) {
        return redirect(303, "/error")
    }

    const signinResponse = await openIdClient.processSigninResponse(
        request.url
    )

    //set vars
    locals.isLoggedIn = true;

    locals.session = {

        oauth: {
            access_token: signinResponse.access_token,
            id_token: signinResponse.id_token,
            refresh_token: signinResponse.refresh_token
        },
        identity: {
            email: signinResponse.profile.email,
            fullname: signinResponse.profile.name,
            username: signinResponse.profile.preferred_username,
            id: signinResponse.profile.sub
        },
        roles: []

    } satisfies SessionData

    cookies.set(env.SESSION_COOKIE_NAME, JSON.stringify(locals.session), {
        path: "/",
        domain: env.ENV_NAME == "development" ? undefined : env.APP_DOMAIN,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
        sameSite: "lax",
        secure: env.ENV_NAME != "development"
    });


    return redirect(303, "/dashboard")

}) satisfies PageServerLoad;
