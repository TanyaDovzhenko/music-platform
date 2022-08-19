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
    refetchSingles: any
    loading: boolean
}

const TrackCreatingPanel = ({ refetchSingles, loading }: ITrackCreatingPanelProps) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState<any>(null)
    const [audio, setAudio] = useState<any>(null)

    const [buttonDisable, setButtonDisable] = useState(true)
    const [error, setError] = useState(false)
    const [createdMessage, setCreatedMessage] = useState(false)

    const createTrackHandler = async () => {
        setButtonDisable(true)
        const created = await createTrack({ name, image, audio })
        setButtonDisable(false)
        if (created) {
            setTemporaryMessage(setCreatedMessage)
            refetchSingles()
            setName('')
            setImage(null)
            setAudio(null)
        }
        if (!created) setTemporaryMessage(setError)
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
                    maxСharacters={45} />
                <UploadInput title="cover"
                    onChange={(e) => setImage(e.target.files[0])} />
                <UploadInput title="audio" fileType="audio"
                    onChange={(e) => setAudio(e.target.files[0])} />
            </div>

            <div className={style.uploadSubmit}>
                {loading &&
                    <Image src={loadGif} className={style.loading} width="20px" height="20px" />}
                {error && <span className={style.error}>error</span>}
                {createdMessage && <span className={style.trackCreated}>successfully added</span>}

                <ProfileButton
                    text='upload track'
                    disabled={buttonDisable}
                    onClick={createTrackHandler} />
            </div>
        </div>
    )
}

export default TrackCreatingPanel