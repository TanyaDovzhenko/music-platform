import PlayerState from "../../store/PlayerState"

export const setActivePlaylist = async (e: React.MouseEvent<HTMLElement>, singlesTracks: any) => {
    e.stopPropagation()
    if (PlayerState.activePlaylist?.id === singlesTracks?.singlesTracks?.id) return
    else PlayerState.setActivePlaylist({
        id: singlesTracks?.singlesTracks?.id,
        tracks: singlesTracks?.singlesTracks?.tracks
    })
}