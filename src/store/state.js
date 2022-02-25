const state = {
      // 是否登录
    loginStatu: window.localStorage.getItem("token")?true:false,
    // 用户信息
    userInfo: null,
    // 歌手信息
    singer: {},
    // 播放状态
    playing: false,
    // 播放列表
    playList: [],
    // 顺序列表
    sequenceList: [],
    // 播放模式(循环，单曲，随机)
    mode: 1,
    // 播放索引
    currentIndex: -1,
    // 搜索历史
    // searchHistory: getSearch(),
    // 历史播放列表
    // historyList: [],
    //歌曲URL
    songUrl:'',
}
export default state