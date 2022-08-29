import { useState } from "react";
import SearchSwitchers from "../../components/search/SearchSwitchers";
import MainLayout from "../../layouts/MainLayout";
import Search from "../../components/common/Serach";
import style from '../../styles/search/Search.module.scss'
import UserList from "../../components/common/UserList";

export default function SearchPage() {
    const [users, setUsers] = useState<any[]>()

    return (
        <MainLayout>
            <div className={style.header}>
                <Search type="user" onDataRecieved={setUsers} />
                <SearchSwitchers />
            </div>
            <UserList users={users ?? []} smallCard={true} />
        </MainLayout>
    )
}