// 分类
export interface Cate {
    data: CateData
}

export interface CateData {
    banners: Array<BannerList>,
    categories: Array<CategorieList>
}

export interface SwiperList {
    image: string,
    id: string
}

export interface BannerList {
    cover: string,
    id: number,
    title: string
}

export interface CategorieList {
    id: number,
    category_name: string,
    cover: string
}


// 首页推荐
export interface RecommendData {
    data: ChildrenData
}

export interface ChildrenData {
    children: Array<Children1Data>,
    type: string
}

interface Children1Data {
    type: string,
    children: Array<UiBanner | UiMiddleCard>
}

export interface UiBanner {
    model: MBanner
    type: string
}

interface MBanner {
    cover: string
    title: string
}

export interface UiMiddleCard {
    children: Array<MArticle>
    type: string
}

// 首页入场必看
export interface MustSeeData {
    data: MsChildren
}

// 首页编辑精选
export interface SelectionData {
    data: MsChildren
}

// 首页热门
export interface HotData {
    data: MsChildren
}

interface MsChildren {
    children: Array<UiBigCard>
}

export interface UiBigCard {
    children: Array<MArticle>
    type: string
}

export interface MArticle {
    model: Resource
    type: string
}

interface Resource {
    resource: ResourceObj
}

interface ResourceObj {
    duration: number
    id: number
    title: string
    cover: string
    count: VideoCount
    like: boolean
    collection: boolean
    author: Userinfo
    share_info: {
        url: string
    }
}

interface UserCount {
    count_collected: number
    count_followee: number
    count_follower: number
    count_liked: number
    count_popularity: number
}

interface Userinfo {
    follow: boolean
    userinfo: VideoUserInfo
}

export interface NBigCard {
    duration: number
    id: number
    title: string
    cover: string
    count: VideoCount
    like: boolean
    collection: boolean
    author: Userinfo
    cardtype: string
    share_info: {
        url: string
    }
}

// 视频详情
export interface VideoData {
    data: VideoDataDetail
}

// 相似视频
export interface VideoLikeData {
    data: VideoLikeList
}

export interface VideoLikeList {
    list: Array<VideoListListItem>
}

export interface VideoListListItem {
    title: string
    count: VideoCount
    cover: string
    author: {
        userinfo: {
            id: number
            avatar: string
            username: string
        }
    }
    duration: number
    id: number
}

export interface VideoDataDetail {
    title: string
    content?: string
    count: VideoCount
    cover: string
    like: boolean
    collection: boolean
    author: VideoAuthor
    tags: Array<Tag>
    duration: number
    categories: Array<categories>
    publish_time: number
    ip_location: string
    id: number
    video: VideoContent
    cardtype: string
    share_info: {
        url: string
    }
}

export interface categories {
    category_name: string,
    sub: {
        category_name: string
    }
}

interface VideoContent {
    content: {
        progressive: Array<Video>
    }
}

interface Video {
    url: string,
    duration: number,
    width: number
    height: number
}

interface VideoCount {
    count_like: number
    count_collect: number
    count_view: number
}

interface VideoAuthor {
    follow: boolean
    userinfo: VideoUserInfo
}

interface VideoUserInfo {
    avatar: string
    id: number
    username: string
    count: UserCount
}

interface Tag {
    name: string
}

// 视频评论
export interface VideoCommentData {
    data: CommentList
}

interface CommentList {
    list: Array<Comment>
}

export interface ListItem {
    addtime: number,
    content: string,
    ip_location: string,
    userInfo: VideoUserInfo
}

// 用户详情
export interface UserinfoData {
    data: UserinfoDetail
}
export interface UserinfoDetail {
    follow: boolean
    id: number
    username: string
    avatar: string
    ip_location: string
    verify_description: string
    count: {
        count_popularity: number
        count_follower: number
        count_followee: number
    }
    share_info: {
        url: string
    }
}

// 用户作品
export interface UserCreationData {
    data: UserCreation
}

export interface UserCreation {
    list: Array<CreationList>
}

export interface CreationList {
    resource: CreationListItem
}

export interface CreationListItem {
    title: string
    cover: string
    count: VideoCount
    publish_time: number
    duration: number
    id: number
}

// 用户喜欢
export interface UserLikeData {
    data: UserLike
}

export interface UserLike {
    list: Array<LikeList>
}

export interface LikeList {
    resource: LikeListItem
}

export interface LikeListItem {
    title: string
    count: VideoCount
    cover: string
    author: {
        userinfo: {
            id: number
            avatar: string
            username: string
        }
    }
    duration: number
    id: number
}

interface VideoResource {
    id: number
    cover: string
    title: string
    duration: number
    publish_time: number
    count: VideoCount
    author: Userinfo
}

// 分类列表
export interface CategoryData {
    data: CategoryList
}

export interface CategoryList {
    list: Array<VideoDataDetail>
}

export interface HotSearchKeyword {
    list: Array<Keyword>
}
export interface Keyword {
    id: number
    name: string
}

export interface MyUserInfo {
    avatarUrl: string
    nickname: string
}

export interface SearchData {
    data: SearchList
}

export interface SearchList {
    list: Array<SarchVideo>
}

export interface SarchVideo {
    id: number
    title: string
    cover: string
    duration: number
    count: {
        count_view: number
        count_like: number
    }
    author: {
        userinfo: {
            avatar: string
            username: string
        }
    }
}

// 用户关注的
export interface UserFollow {
    avatar: string
    follower: number
    id: number
    username: string
}

// 用户收藏的
export interface UserCollection {
    author: {
        avatar: string
        username: string
    }
    count: {
        count_like: number
        count_view: number
    }
    cover: string
    duration: number
    id: number
    title: string
    share_url: string
}

// 用户足迹
export interface UserFootprint {
    author: {
        avatar: string
        username: string
    }
    cover: string
    duration: number
    id: number
    title: string
    time: number
    share_url: string
}

export interface BigCardData {
    id: number,
    cardtype: string
}

export interface Comment {
    addtime: number
    ip_location: string
    userInfo: {
        avatar: string
        username: string
    }
    content: string
}

export interface MyMsg {
    avatarUrl: string
    ip_location: string
    nickname: string
}