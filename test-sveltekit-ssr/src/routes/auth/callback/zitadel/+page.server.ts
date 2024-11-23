import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { openIdClient } from '$lib/server/auth';
import { env } from '$env/dynamic/private';
import type { SessionData } from '$lib';
import jwts from 'jsonwebtoken';
import { generateState } from 'arctic';

export const load = (async ({ cookies, request }) => {

    const signinResponse = await openIdClient.processSigninResponse(
        request.url
    )

    const sessionData = {

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


    const auth_token = jwts.sign(sessionData, env.AUTH_SECRET, { expiresIn: '3d', issuer: env.AUTH_SESSION_JWT_ISSUER, audience: env.AUTH_SESSION_JWT_ISSUER, subject: sessionData.identity.id, algorithm: 'HS384', keyid: generateState(), mutatePayload: false, jwtid: generateState() });


    //set auth cookie
    cookies.set(env.SESSION_COOKIE_NAME, auth_token, {
        path: "/",
        domain: env.ENV_NAME == "development" ? undefined : env.APP_DOMAIN,
        maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
        httpOnly: true,
        sameSite: "lax",
        secure: env.ENV_NAME != "development"
    });

    return redirect(303, "/dashboard")

}) satisfies PageServerLoad;
