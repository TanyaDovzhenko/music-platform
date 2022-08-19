import Image from 'next/image';
import { useEffect, useState } from 'react';
import style from '../../../styles/profile/AlbumCreatingPanel.module.scss'
import ProfileInput from '../../common/ProfileInput';
import loadGif from '../../../images/gif/loading.gif'
import ProfileButton from '../../common/ProfileButton';
import { createAlbum } from '../../../utilities/music/create-album';
import { setTemporaryMessage } from '../../../utilities/common/set-temporary-message';
import UploadInput from '../../common/UploadInput';

interface IAlbumCreatingPanelProps {
    refetchAlbums: any
    loading: boolean
}

export default function AlbumCreatingPanel({ refetchAlbums, loading }: IAlbumCreatingPanelProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<any>(null)
    const [buttonDisable, setButtonDisable] = useState(true)
    const [createdMessage, setCreatedMessage] = useState(false)
    const [error, setError] = useState(false)

    const createAlbumHandler = async () => {
        const created = await createAlbum({ name, description, image })
        setName(''); setDescription(''); setImage('')
        if (created) {
            setTemporaryMessage(setCreatedMessage)
            refetchAlbums()
        } else setTemporaryMessage(setError)
    }

    useEffect(() => {
        if (name && description && image) setButtonDisable(false)
    }, [name, description, image])

    return (
        <div className={style.container}>
            <div className={style.info}>
                <ProfileInput
                    placeholder="name of the album..."
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    maxСharacters={45} />

                <ProfileInput
                    placeholder="description..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    maxСharacters={100} />

                <UploadInput
                    title="cover"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>

            <div className={style.uploadSubmit}>
                {loading && <Image
                    src={loadGif}
                    className={style.loading}
                    width="20px"
                    height="20px" />}

                {error && <span className={style.error}>error</span>}
                {createdMessage && <span className={style.albumCreated}>successfully added</span>}

                <ProfileButton
                    text='create album'
                    disabled={buttonDisable}
                    onClick={createAlbumHandler} />
            </div>
        </div>
    )
}