// const getters  = {
//     loginStatu : state => {
//         return (
//           state.loginStatu || JSON.parse(window.localStorage.getItem('loginStatu'))
//         )
//       },
//     userInfo: state => {
//         return state.userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
//     },
//     singer: state => state.singer,
//     playing : state => state.playing,

//     // 播放列表
//     playList  : state => state.playList,

//     // 顺序列表
//     sequenceList  : state => state.sequenceList,

//     // 当前播放模式(循环，单曲，随机)
//     mode  : state => state.mode,

//     // 当前播放索引
//     currentIndex  : state => state.currentIndex,

//     // 当前播放歌曲
//     currentSong  : state => {
//     return state.playList[state.currentIndex] || {}
//     },

    
    
// }
// export default getters

export const loginStatu = state => {
    return (
      // state.loginStatu || JSON.parse(window.localStorage.getItem('loginStatu'))
      state.loginStatu
    )
  }
export const userInfo= state => {
    return state.userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
}
export const singer= state => state.singer
export const playing = state => state.playing

// 播放列表
export const playList  = state => state.playList

// 顺序列表
export const sequenceList  = state => state.sequenceList

// 当前播放模式(循环，单曲，随机)
export const mode  = state => state.mode

// 当前播放索引
export const currentIndex  = state => state.currentIndex

// 当前播放歌曲
export const currentSong  = state => {
return state.playList[state.currentIndex] || {}
}

export const songUrl = state => state.songUrl