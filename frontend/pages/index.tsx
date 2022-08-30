import Router from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'


export default function Home() {

  useEffect(() => {
    let cookies = parseCookies()
    if (cookies.access_token) Router.push('/profile')
    else Router.push('/auth/signin')
  }, [])

  return (<></>)
}