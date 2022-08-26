import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from '../../../styles/profile/TrackCreatingPanel.module.scss'
import { createTrack } from '../../../utilities/music/create-track'
import ProfileInput from '../../common/ProfileInput'
import ProfileButton from '../../common/ProfileButton'
import loadGif from '../../../images/gif/loading.gif'
import { setTemporaryMessage } from '../../../utilities/common/set-temporary-message'
import UploadInput from '../../common/UploadInput'

interface ITrackCreatingPanelProps {
    refetchTracks?: any
    loading?: boolean
    albumId?: number
}

const TrackCreatingPanel = ({ refetchTracks, loading, albumId }: ITrackCreatingPanelProps) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState<any>(null)
    const [audio, setAudio] = useState<any>(null)

    const [buttonDisable, setButtonDisable] = useState(true)
    const [error, setError] = useState(false)
    const [createdMessage, setCreatedMessage] = useState(false)

    const stylesIds = [1, 2, 3]

    const createTrackHandler = async () => {
        setButtonDisable(true)
        const created = await createTrack({ name, image, audio, albumId, stylesIds })
        setButtonDisable(false)
        setImage(null)
        setAudio(null)
        if (created) {
            setName('')
            setTemporaryMessage(setCreatedMessage)
            if (refetchTracks) refetchTracks()
        }
        if (!created) {
            setTemporaryMessage(setError)
        }
    }

    useEffect(() => {
        if (name && image && audio) setButtonDisable(false)
    }, [name, image, audio])

    return (
        <div className={style.container}>
            <div className={style.info}>
                <ProfileInput
                    placeholder="name of the track..."
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    maxСharacters={45}
                    width={250} />
                <UploadInput
                    title="cover"
                    onChange={(e) => setImage(e.target.files[0])}
                    state={image}
                />
                <UploadInput
                    title="audio"
                    fileType="audio"
                    state={audio}
                    onChange={(e) => setAudio(e.target.files[0])} />
            </div>

            <div className={style.uploadSubmit}>
                {loading &&
                    <Image src={loadGif} className={style.loading} width="20px" height="20px" />}
                {error && <span className={style.error}>error</span>}
                {createdMessage && <span className={style.trackCreated}>added</span>}

                <ProfileButton
                    text='upload track'
                    disabled={buttonDisable}
                    onClick={createTrackHandler} />
            </div>
        </div>
    )
}

TrackCreatingPanel.defaultProps = {
    borderBottom: true
};

export default TrackCreatingPanel