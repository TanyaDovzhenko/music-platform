export enum ProfileTabsEnum {
    ALBUMS = 'albums',
    SINGLES = 'singles',
    FOLLOWING = 'following',
    LIKED_TRACKS = 'liked tracks'
}

export const ListenerTabsObj = [
    { name: ProfileTabsEnum.LIKED_TRACKS },
    { name: ProfileTabsEnum.FOLLOWING }
]

export const MusicianTabsObj = [
    { name: ProfileTabsEnum.ALBUMS },
    { name: ProfileTabsEnum.SINGLES },
    { name: ProfileTabsEnum.LIKED_TRACKS },
    { name: ProfileTabsEnum.FOLLOWING }
]