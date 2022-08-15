import { useEffect, useRef, useState } from 'react'
import style from '../../../styles/profile/TrackCreatingPanel.module.scss'
import { createTrack } from '../../../utilities/music/create-track'
import ProfileInput from '../../common/ProfileInput'
import checkIcon from '../../../images/icons/check.svg'
import addIcon from '../../../images/icons/add.svg'
import Image from 'next/image'
import ProfileButton from '../../common/ProfileButton'
import loadGif from '../../../images/gif/loading.gif'
import { useLazyQuery } from '@apollo/client'
import { GET_USER_SINGLES } from '../../../graphql/queries/profile-tracks.queries'

interface ITrackCreatingPanelProps {
    userProfileId: number
}

const TrackCreatingPanel = ({ userProfileId }: ITrackCreatingPanelProps) => {
    const [getSingles, { refetch }] = useLazyQuery(GET_USER_SINGLES);

    const [name, setName] = useState('')
    const [image, setImage] = useState<any>(null)
    const [audio, setAudio] = useState<any>(null)

    const [buttonDisable, setButtonDisable] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [trackCreated, setTrackCreated] = useState(false)

    const imageRef = useRef<HTMLInputElement>()
    const audioRef = useRef<HTMLInputElement>()

    const createTrackHandler = async () => {
        setError(false)
        setLoading(true)
        setButtonDisable(true)
        const created = await createTrack({ name, userProfileId, image, audio })
        setButtonDisable(false)
        setLoading(false)
        if (created) {
            setName('')
            setImage(null)
            setAudio(null)
            setCreatedTrackMessage()
            refetch()
        }
        if (!created) setError(true)
    }

    const setCreatedTrackMessage = () => {
        setTrackCreated(true)
        setTimeout(() => setTrackCreated(false), 4000)
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

                <div className={style.uploadItem} onClick={() => imageRef.current.click()}>
                    {image ? <Image src={checkIcon} /> : <Image src={addIcon} />}
                    <span>cover</span>
                    <input
                        ref={imageRef}
                        type='file'
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ display: "none" }} />
                </div>

                <div className={style.uploadItem} onClick={() => audioRef.current.click()}>
                    {audio ? <Image src={checkIcon} /> : <Image src={addIcon} />}
                    <span>audio</span>
                    <input
                        ref={audioRef}
                        type='file'
                        accept="audio/*"
                        onChange={(e) => setAudio(e.target.files[0])}
                        style={{ display: "none" }} />
                </div>
            </div>

            <div className={style.uploadSubmit}>
                {loading &&
                    <Image src={loadGif} className={style.loading} width="20px" height="20px" />}
                {error && <span className={style.error}>error</span>}
                {trackCreated && <span className={style.trackCreated}>successfully added</span>}
                <ProfileButton
                    text='upload track'
                    disabled={buttonDisable}
                    onClick={createTrackHandler} />
            </div>
        </div>
    )
}

export default TrackCreatingPanel