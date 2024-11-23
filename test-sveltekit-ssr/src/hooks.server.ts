import { env } from "$env/dynamic/private";
import type { SessionData } from "$lib";
import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import jwts from 'jsonwebtoken';
import moment from "moment";

export const authGuard: Handle = ({ resolve, event }) => {

    const authCookie = event.cookies.get(env.SESSION_COOKIE_NAME) || '';

    if (authCookie) {

        const decoded = jwts.decode(authCookie, {
            complete: true,
            json: true
        });

        if (decoded) {

            const payload = decoded.payload as SessionData & { iat: number, exp: number, aud: string, iss: string, sub: string, jti: string };

            if (moment(payload.exp * 1000).diff(moment.now(), 'hours') < 0) {
                //delete cookie
                event.cookies.delete(env.SESSION_COOKIE_NAME, { path: "/" });
            }
            else {

                if (payload.identity && payload.oauth) {
                    event.locals.isLoggedIn = true;
                    event.locals.session = payload;
                }

            }
        }
    }
    else {
        event.locals.isLoggedIn = false;
        event.locals.session = null;
    }

    return resolve(event);
}


export const handle = sequence(authGuard);
