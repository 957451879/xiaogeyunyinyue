const mutations = {
    ['SET_LOGINSTATUS'](state, loginStatu) {
        state.loginStatu = loginStatu
      },
    ['SET_USERINFO'](state, userInfo) {
        state.userInfo = userInfo
    },
    ['SET_SINGER'](state, singer) {
        state.singer = singer
      },
    ['SET_PLAYING_STATE'](state, flag) {
        state.playing = flag
      },
    ['SET_PLAYLIST'](state, list) {
        state.playList = list
      },
    ['SET_SEQUENCE_LIST'](state, list) {
        state.sequenceList = list
      },
    ['SET_PLAY_MODE'](state, mode) {
        state.mode = mode
      },
    ['SET_CURRENT_INDEX'](state, index) {
        state.currentIndex = index
      },
    // ['SET_SEARCH_HISTORY'](state, history) {
    //     state.searchHistory = history
    //   },
    // ['SET_HISTORY_LIST'](state, list) {
    //     state.historyList = list
    //   }
    ['SET_SONG'](state, song) {
      
        Array.isArray(song)?state.playList.push(...song):state.playList.push(song)
    },
    ['DEL_SONG'](state, index) {
        state.playList.splice(index,1)
      },
    ['SET_SONG_URL'](state,id) {
        state.songUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      },
    

}
export default mutations