export enum ProfileTabsEnum {
    POSTS = 'posts',
    REVIEWS = 'reviews',
    PLAYLISTS = 'playlists',
    ALBUMS = 'albums',
    SINGLES = 'singles',
    ABOUT = 'about musician',
    FOLLOWING = 'following',
    FIRST_IMP = 'first impression'
}

export const ListenerTabsObj = [
    { name: ProfileTabsEnum.POSTS },
    { name: ProfileTabsEnum.REVIEWS },
    { name: ProfileTabsEnum.PLAYLISTS },
    { name: ProfileTabsEnum.ALBUMS },
    { name: ProfileTabsEnum.FOLLOWING }
]

export const MusicianTabsObj = [
    { name: ProfileTabsEnum.FIRST_IMP },
    { name: ProfileTabsEnum.ALBUMS },
    { name: ProfileTabsEnum.SINGLES },
    { name: ProfileTabsEnum.POSTS },
    { name: ProfileTabsEnum.PLAYLISTS },
    { name: ProfileTabsEnum.FOLLOWING }
]