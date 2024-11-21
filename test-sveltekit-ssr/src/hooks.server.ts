import { env } from "$env/dynamic/private";
import type { SessionData } from "$lib";
import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";



export const authGuard: Handle = ({ resolve, event }) => {

    const authCookie = event.cookies.get(env.SESSION_COOKIE_NAME) || '';

    if(authCookie){
        
        const authParameters = JSON.parse(authCookie) as SessionData;

        event.locals.isLoggedIn = true;
        event.locals.session = authParameters;
    }
    else {
        event.locals.isLoggedIn = false;
        event.locals.session = null;
    }

    return resolve(event);
}


export const handle = sequence(authGuard);
