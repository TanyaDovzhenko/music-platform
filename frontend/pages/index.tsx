import Router from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'
import { reload } from '../utilities/common/reload'


export default function Home() {

  useEffect(() => {
    let cookies = parseCookies()
    if (cookies.access_token) Router.push('/profile')
    else Router.push('/auth/signin')
  }, [])

  return (<></>)
}