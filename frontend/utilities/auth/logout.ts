import Router from "next/router"
import { destroyCookie } from "nookies"

export function logout() {
    destroyCookie(null, 'access_token')
    setTimeout(() => destroyCookie(null, 'access_token'), 1000)
    Router.replace('/auth/signin')
}