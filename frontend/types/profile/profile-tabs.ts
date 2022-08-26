export enum ProfileTabsEnum {
    POSTS = 'posts',
    REVIEWS = 'reviews',
    PLAYLISTS = 'playlists',
    ALBUMS = 'albums',
    LIKED_ALBUMS = 'liked albums',
    SINGLES = 'singles',
    ABOUT = 'about musician',
    FOLLOWING = 'following',
    FIRST_IMP = 'first impression',
    MUSIC = 'music'
}

export const ListenerTabsObj = [
    { name: ProfileTabsEnum.MUSIC },
    { name: ProfileTabsEnum.PLAYLISTS },
    { name: ProfileTabsEnum.FOLLOWING }
]

export const MusicianTabsObj = [
    { name: ProfileTabsEnum.ALBUMS },
    { name: ProfileTabsEnum.SINGLES },
    { name: ProfileTabsEnum.PLAYLISTS },
    { name: ProfileTabsEnum.FOLLOWING }
]