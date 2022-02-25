export const selectPlay = function ({commit }, index ) {
    // commit('SET_PLAYING_STATE', false)
    
      commit('SET_CURRENT_INDEX', index)
      commit('SET_PLAYING_STATE', true)  
    
    
}

export const setPlayingState = function ({commit },state) {
    commit('SET_PLAYING-STATE',state)
}

export const addSong = function ({ commit }, {playList, song }) {
    // console.log(song)
    
    // for (let i = 0; i < playList.length; i++){
    //     if (playList[i].id == song.id) {
    //         commit('SET_CURRENT_INDEX', i)
    //         break;
    //     }
    // }
    if (!Array.isArray(song)) {
        if (playList.every((item) => {
            return item.id !=song.id
        })) {
            commit('SET_SONG', song)
        }
    } else {
        song.forEach(el => {
            if (playList.every((item) => {
                return item.id !=el.id
            })) {
                commit('SET_SONG', el)
            }
        });
    }
    
    

    
}

export const delSong = function ({ commit ,getters}, index) {
    if (getters.currentIndex == getters.playList.length - 1) {
        commit('SET_CURRENT_INDEX',getters.currentIndex-1)
    }


    else if (getters.currentIndex > index) {
        commit('SET_CURRENT_INDEX',getters.currentIndex-1)
    } 

    commit('DEL_SONG',index)
}

export const playingOrPause = function ({ commit }, status) {
    // console.log(status)
    commit('SET_PLAYING_STATE',status)
}

export const setPlayMode = function ({ commit }, mode) {
    commit('SET_PLAY_MODE',mode)
}

export const setSongUrl = function ({ commit }, url) {
    commit('SET_SONG_URL',url)
}

export const setLoginStatus = function ({ commit }, status) {
    commit('SET_LOGINSTATUS',status)
}

export const setUserInfo = function ({ commit }, info) {
    commit('SET_USERINFO',info)
}