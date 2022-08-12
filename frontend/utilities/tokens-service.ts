import { destroyCookie, setCookie } from "nookies";

export function setToken(token: string) {
    setCookie(null, 'access_token', token,
        { maxAge: 60 * 60 * 24 * 7, path: '/' }
    )
}

export function removeToken() {
    destroyCookie(null, 'access_token')
}