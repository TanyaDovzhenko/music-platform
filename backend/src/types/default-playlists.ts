export enum DefaultPlaylistsNames {
    FAVORITE = 'Favorite',
    SUGGESTED = 'Suggested'
}

export const DefaultPlaylistsObj = [
    {
        name: DefaultPlaylistsNames.FAVORITE,
        description: 'Save your favorite tracks here.'
    },
    {
        name: DefaultPlaylistsNames.SUGGESTED,
        description: 'Tracks that other users invite you to listen.'
    }
]