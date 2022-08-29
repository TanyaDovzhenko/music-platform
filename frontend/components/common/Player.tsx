import Image from 'next/image'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import PlayerState from '../../store/PlayerState'
import style from '../../styles/Music/Player.module.scss'
import soundIcon from '../../images/icons/sound-icon.svg'
import noSoundIcon from '../../images/icons/no-sound.svg'
import heartIcon from '../../images/icons/heart-icon.svg'
import closeIcon from '../../images/icons/close-icon.svg'
import playButtonIcon from '../../images/icons/play-button.svg'
import pauseButtonIcon from '../../images/icons/pause-button.svg'
import forwardButtonIcon from '../../images/icons/fast-forward-button.svg'
import backwardButtonIcon from '../../images/icons/backward-button.svg'



function Player() {
    const [audio, setAudio] = useState<any>()
    const [volume, setVolume] = useState<number>(50)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    if (audio) {
        audio.ontimeupdate = () =>
            setCurrentTime(Math.ceil(audio.currentTime))
        audio.onended = function () {
            PlayerState.nextTrack()
        }
    }

    const volumeToggle = () => {
        if (!volume) setVolume(50)
        else setVolume(0)
    }

    useEffect(() => {
        if (PlayerState.playing) audio?.play()
        else if (!PlayerState.playing) audio?.pause()
    }, [PlayerState.playing])

    useEffect(() => { if (audio) audio.volume = volume / 100 }, [volume])

    useEffect(() => {
        if (audio) {
            audio.src = PlayerState.activeTrack?.audio
            audio.onloadedmetadata = () =>
                setDuration(Math.ceil(audio.duration))
        }
    }, [PlayerState.activeTrack])

    useEffect(() => { setAudio(new Audio(PlayerState.activeTrack?.audio)) }, [])

    return (
        <div className={cn(style.player, { [style.notActive]: !PlayerState.activeTrack })}
            style={{ backgroundImage: `url(${PlayerState.activeTrack?.image})` }}>
            <div className={style.wrapper}>
                <div className={style.img}
                    style={{ backgroundImage: `url(${PlayerState.activeTrack?.image})` }}>
                </div>
                <div>
                    <div className={style.trackName}>{PlayerState.activeTrack?.name}</div>
                    <div className={style.author}>{PlayerState.activeTrack?.musician}</div>
                </div>
                <Image className={style.icon} src={heartIcon} />
                <div className={style.controls}>
                    <div className={style.buttons}>
                        <Image className={style.icon}
                            width={20}
                            src={backwardButtonIcon}
                            onClick={() => PlayerState.prevTrack()} />
                        <Image className={style.icon}
                            onClick={() => PlayerState.togglePlaying()}
                            width={20}
                            src={PlayerState.playing ? pauseButtonIcon : playButtonIcon} />
                        <Image className={style.icon}
                            width={20}
                            src={forwardButtonIcon}
                            onClick={() => PlayerState.nextTrack()} />
                    </div>
                    <div className={style.time}>
                        <span>{Math.floor(currentTime / 60)}:{currentTime % 60}</span>
                        <input
                            type='range'
                            max={duration}
                            min={0}
                            value={currentTime}
                            onChange={e => { if (audio) audio.currentTime = Number(e.target.value) }
                            } />
                        <span>{Math.floor(duration / 60)}:{duration % 60}</span>
                    </div>
                </div>
                <div className={style.volume}>
                    <Image className={style.icon}
                        onClick={volumeToggle}
                        width={20}
                        src={volume ? soundIcon : noSoundIcon} />
                    <input
                        onChange={(e) => setVolume(Number(e.target.value))}
                        value={volume}
                        type='range'
                        max={100}
                        min={0} />
                </div>
                <span className={style.close}
                    onClick={() => PlayerState.removeActiveTrack()}>
                    <Image src={closeIcon} />
                </span>
            </div>
        </div>
    )
}

export default observer(Player)
