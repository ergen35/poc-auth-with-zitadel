import type { SessionData, SessionTokensData } from '$lib';
import * as OidcClient from 'openid-client';
import { defaultSessionData } from './lib/index';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isLoggedIn: boolean = false,
			session: SessionData | null = null,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
