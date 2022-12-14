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

export default function AlbumCreatingPanel({ refetchAlbums, loading }
    : IAlbumCreatingPanelProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<any>(null)
    const [buttonDisable, setButtonDisable] = useState(true)
    const [createdMessage, setCreatedMessage] = useState(false)
    const [error, setError] = useState(false)

    const createAlbumHandler = async () => {
        await createAlbum({ name, description, image })
            .then((data) => {
                if (data) setTemporaryMessage(setCreatedMessage)
                else setTemporaryMessage(setError)
                refetchAlbums()
            })
        setName('')
        setDescription('')
        setImage('')
    }

    useEffect(() => {
        if (name && description && image) setButtonDisable(false)
    }, [name, description, image])

    return (
        <div className={style.container}>
            <div className={style.info}>
                <div className={style.infoItems}>
                    <ProfileInput
                        placeholder="name of the album..."
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        maxСharacters={50}
                        width={250} />

                    <div className={style.upload}>
                        <UploadInput
                            title="cover"
                            state={image}
                            onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                </div>
                <ProfileInput
                    placeholder="description..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    maxСharacters={250}
                    width={350} />
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