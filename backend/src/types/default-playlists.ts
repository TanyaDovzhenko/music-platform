export enum DefaultPlaylistsNames {
    FAVORITE = 'Favorite',
    SUGGESTED = 'Suggested'
}

export enum DefaultPlaylistImgSrc {
    FAVORITE = 'image/playlist/default-favorite-playlist-img.jpg',
    SUGGESTED = 'image/playlist/default-suggested-playlist-img.jpg',
    DEFAULT = 'image/playlist/default-playlist.jpg'
}

export const DefaultPlaylistsObj = [
    {
        name: DefaultPlaylistsNames.FAVORITE,
        image: DefaultPlaylistImgSrc.FAVORITE,
        description: 'Save your favorite tracks here. <3'
    },
    {
        name: DefaultPlaylistsNames.SUGGESTED,
        image: DefaultPlaylistImgSrc.SUGGESTED,
        description: 'Tracks that other users invite you to listen.'
    }
]