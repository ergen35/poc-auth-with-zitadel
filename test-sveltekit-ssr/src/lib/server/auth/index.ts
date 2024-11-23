import { env } from '$env/dynamic/private'
import { OidcClient as OpenIdClient } from 'oidc-client-ts';

export const openIdClient = new OpenIdClient({
    response_type: 'code',
    authority: env.OAUTH_ISSUER,
    client_id: env.OAUTH_CLIENT_ID,
    redirect_uri: env.OAUTH_POST_LOGIN_REDIRECT_URI,
    loadUserInfo: true,
    post_logout_redirect_uri: 'http://localhost:5173/',
    scope: `openid email profile urn:zitadel:iam:org:project:id:zitadel:aud urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:${env.ZITADEL_ORG_ID}`,
});
