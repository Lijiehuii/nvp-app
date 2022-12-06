import http from "@/http"
import type {
    Cate,
    RecommendData,
    MustSeeData,
    SelectionData,
    HotData,
    VideoData,
    VideoLikeData,
    VideoCommentData,
    UserinfoData,
    UserCreationData,
    UserLikeData,
    CategoryData,
    SearchData
} from "@/typings"

export const Api = {

    // 获取分类数据
    getCateData: () => {
        return http.request<Cate>({
            url: "/page/discovery",
            method: "GET"
        })
    },
    getRecommendData: () => {
        return http.request<RecommendData>({
            url: "/home/recommend",
            method: "GET"
        })
    },
    getMustSeeData: () => {
        return http.request<MustSeeData>({
            url: "/home/mustSee",
            method: "GET"
        })
    },
    getSelectionData: () => {
        return http.request<SelectionData>({
            url: "/home/selection",
            method: "GET"
        })
    },
    getHotData: () => {
        return http.request<HotData>({
            url: "/home/hot",
            method: "GET"
        })
    },
    getVideoData: (id: string) => {
        return http.request<VideoData>({
            url: "/article/" + id,
            method: "GET"
        })
    },
    getVideoLikeData: (id: string) => {
        return http.request<VideoLikeData>({
            url: "/article/" + id + "/next",
            method: "GET"
        })
    },
    getVideoCommentData: (id: string) => {
        return http.request<VideoCommentData>({
            url: "/comments?resource_id=" + id,
            method: "GET"
        })
    },
    getUserInfoDetailData: (id: string) => {
        return http.request<UserinfoData>({
            url: "/user/" + id,
            method: "GET"
        })
    },
    getUserCreationData: (id: string) => {
        return http.request<UserCreationData>({
            url: "/user/" + id + "/articles",
            method: "GET"
        })
    },
    getUserLikeData: (id: string) => {
        return http.request<UserLikeData>({
            url: "/user/" + id + "/articles-approved",
            method: "GET"
        })
    },
    getCategoryData: (id: string, page: number) => {
        return http.request<CategoryData>({
            url: "/articles?category_id=" + id + "&page=" + page,
            method: "GET"
        })
    },
    getSearchData: (searchInput: string) => {
        return http.request<SearchData>({
            url: "/search?kw=" + searchInput + "&sort=hot",
            method: "GET"
        })
    }
}
