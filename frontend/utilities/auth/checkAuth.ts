import Router from 'next/router'
import { parseCookies } from "nookies";


export function checkAuth() {
    let cookies = parseCookies()
    if (!cookies.access_token) Router.replace('/auth/signin')
}