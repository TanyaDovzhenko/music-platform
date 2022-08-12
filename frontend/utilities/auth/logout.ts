import Router from "next/router"
import { destroyCookie } from "nookies"


export function logout() {
    Router.replace('/auth/signin')
    destroyCookie(null, 'access_token')
}