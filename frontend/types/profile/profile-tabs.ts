export enum ProfileTabsEnum {
    PLAYLISTS = 'playlists',
    ALBUMS = 'albums',
    SINGLES = 'singles',
    FOLLOWING = 'following',
    MUSIC = 'music'
}

export const ListenerTabsObj = [
    { name: ProfileTabsEnum.MUSIC },
    { name: ProfileTabsEnum.FOLLOWING }
]

export const MusicianTabsObj = [
    { name: ProfileTabsEnum.ALBUMS },
    { name: ProfileTabsEnum.SINGLES },
    { name: ProfileTabsEnum.PLAYLISTS },
    { name: ProfileTabsEnum.FOLLOWING }
]