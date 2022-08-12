import { useEffect } from 'react'
import Menu from '../components/common/Menu'
import { checkAuth } from '../utilities/auth/checkAuth'


export default function MainLayout({ children }: any) {
    useEffect(() => checkAuth(), [])
    return (
        <div className='container'>
            <Menu />
            <div className='content'>
                {children}
            </div>
        </div>
    )
}