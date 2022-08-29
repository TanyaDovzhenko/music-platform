import { useState } from 'react'
import SearchSwitchers from '../../../components/search/SearchSwitchers'
import MainLayout from '../../../layouts/MainLayout'
import { UserRoles } from '../../../types/user/userRoles.enum'
import style from '../../../styles/search/Search.module.scss'
import Search from '../../../components/common/Serach'
import UserList from '../../../components/common/UserList'


export default function Musicians() {
    const [users, setUsers] = useState<any[]>()

    return (
        <MainLayout>
            <div className={style.header}>
                <Search
                    type="user"
                    onDataRecieved={setUsers}
                    userRole={UserRoles.MUSICIAN} />
                <SearchSwitchers />
            </div>
            <UserList users={users ?? []} smallCard={true} />
        </MainLayout>
    )
}