import { env } from '$env/dynamic/private'
import { OidcClient as OpenIdClient } from 'oidc-client-ts';

export const openIdClient = new OpenIdClient({
    authority: env.OAUTH_ISSUER,
    client_id: env.OAUTH_CLIENT_ID,
    redirect_uri: "http://localhost:5173/auth/callback/zitadel",
    loadUserInfo: true,
    post_logout_redirect_uri: 'http://localhost:5173/',
    response_type: 'code',
    scope: `openid email profile urn:zitadel:iam:org:project:id:zitadel:aud urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:${env.ZITADEL_ORG_ID}`,
});
