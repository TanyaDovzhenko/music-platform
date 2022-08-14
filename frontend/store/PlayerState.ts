import { makeAutoObservable } from 'mobx'
import { ITrack } from '../types/music/track.interface'
import { BASE_SERVER_USR } from '../utilities/constants'

interface ActivePlaylist {
    id: number,
    tracks: [ITrack]
}

class PlayerState {
    activeTrack: ITrack | null = null
    activePlaylist: ActivePlaylist | [] = []
    activeTrackIndex: number = NaN
    playing: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setActiveTrack(track: ITrack) {
        this.activeTrack = {
            ...track,
            audio: BASE_SERVER_USR + track.audio,
            image: BASE_SERVER_USR + track.image
        }
        this.activeTrackIndex = this.activePlaylist?.tracks?.findIndex
            (el => el.id === this.activeTrack.id)
    }

    removeActiveTrack() {
        this.activeTrack = null
    }

    setActivePlaylist(playlist: ActivePlaylist) {
        this.activePlaylist = playlist
    }

    togglePlaying() {
        if (this.playing) this.playing = false
        else if (!this.playing) this.playing = true
    }

    pauseTrack() {
        this.playing = false
    }

    playTrack() {
        this.playing = true
    }

    changePlayerTrack(track: ITrack) {
        this.pauseTrack()
        this.setActiveTrack(track)
        setTimeout(() => this.playTrack(), 100)
    }

    nextTrack() {
        this.pauseTrack()
        if (this.activeTrackIndex == this.activePlaylist?.tracks.length - 1) {
            this.setActiveTrack(this.activePlaylist.tracks[0])
        } else {
            this.setActiveTrack(this.activePlaylist?.tracks[this.activeTrackIndex + 1])
        }
        setTimeout(() => this.playTrack(), 100)
    }

    prevTrack() {
        if (this.activeTrackIndex == 0) {
            return
        } else {
            this.pauseTrack()
            this.setActiveTrack(this.activePlaylist?.tracks[this.activeTrackIndex - 1])
        }
        setTimeout(() => this.playTrack(), 100)
    }
}

export default new PlayerState()