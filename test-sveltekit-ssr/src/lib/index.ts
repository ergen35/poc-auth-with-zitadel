// place files you want to import through the `$lib` alias in this folder.


export type SessionData = {
    oauth: SessionTokensData,
    identity: {
        id: string | undefined,
        username: string | undefined,
        email: string | undefined,
        fullname: string | undefined
    },
    roles: Array<string>
}
export type SessionTokensData = {
    access_token: string | undefined,
    refresh_token: string | undefined,
    id_token: string | undefined
}
