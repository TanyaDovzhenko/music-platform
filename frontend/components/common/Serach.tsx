import { useLazyQuery } from "@apollo/client"
import { ChangeEvent, useEffect, useState } from "react"
import searchIcon from '../../images/icons/search.svg'
import style from '../../styles/common/Search.module.scss'
import { UserRoles } from "../../types/user/userRoles.enum"
import {
    GET_ALBUMS_BY_PARAMS,
    GET_TRACKS_BY_PARAMS, GET_USERS_BY_PARAMS
} from "../../graphql/queries/search-queries"
import Image from "next/image"


interface ISearchProps {
    type: 'album' | 'user' | 'track'
    userRole?: UserRoles
    onDataRecieved: any
}

export default function Search({ type, userRole, onDataRecieved }: ISearchProps) {
    const [searchValue, setSearchValue] = useState('')

    const [getUsers, { data: users, refetch: refetchUsers }] =
        useLazyQuery(GET_USERS_BY_PARAMS, {
            variables: { userName: searchValue, userRole: (userRole)?.toUpperCase() ?? null }
        })

    const [getTracks, { data: tracks, refetch: refetchTracks }] =
        useLazyQuery(GET_TRACKS_BY_PARAMS, {
            variables: { trackName: searchValue }
        })

    const [getAlbums, { data: albums, refetch: refetchAlbums }] =
        useLazyQuery(GET_ALBUMS_BY_PARAMS, {
            variables: { albumName: searchValue }
        })

    const search = async (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        setTimeout(async () => {
            if (type == 'user') {
                await refetchUsers()
                    .then(data => onDataRecieved(data?.data.usersByParams))
            } else if (type == 'album') {
                await refetchAlbums()
                    .then(data => onDataRecieved(data?.data.albumsByParams))
            } else if (type == 'track') {
                await refetchTracks()
                    .then(data => onDataRecieved(data?.data.tracksByParams))
            }
        }, 1000)
    }

    const getInitialData = async () => {
        if (type == 'user') {
            await getUsers()
                .then(data => onDataRecieved(data?.data?.usersByParams))
        } else if (type == 'album') {
            await getAlbums()
                .then(data => onDataRecieved(data?.data?.albumsByParams))
        } else if (type == 'track') {
            await getTracks()
                .then(data => onDataRecieved(data?.data?.tracksByParams))
        }
    }

    useEffect(() => { getInitialData() }, [])

    return (
        <div className={style.container}>
            <Image src={searchIcon} width={15} height={15} />
            <input
                className={style.input}
                type='text'
                value={searchValue}
                onChange={search} />
        </div>
    )
}