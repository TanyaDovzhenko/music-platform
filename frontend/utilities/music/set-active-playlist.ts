import PlayerState from "../../store/PlayerState"

export const setActivePlaylist = async (
    e: React.MouseEvent<HTMLElement>, tracks: any, playlistId: number
) => {
    e.stopPropagation()
    if (PlayerState.activePlaylist?.id === playlistId) return
    else PlayerState.setActivePlaylist({
        id: playlistId,
        tracks: tracks
    })
}