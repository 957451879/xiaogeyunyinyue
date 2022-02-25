<template>
  <div class="song">
      <div class="song-content">
          <div class="left">
              <img :src="al.picUrl+'?param=131y131'" alt="">
              <span></span>
          </div>
          <div class="right">
              <h2>{{songDetail.name}}</h2>
              <p>歌手：<span v-for="item in songDetail.ar" :key="item.id"><router-link :to="{name:'singer',query:{id:item.id}}">{{item.name}}</router-link></span></p>
              <p>所属专辑：<span>
                  {{al.name}}
              </span></p>
              <div>
                  <button @click="playSong(songDetail)">播放</button>
                  <button @click="add(songDetail)">+</button>
                  <button>收藏</button>
                  <button>分享</button>
                  <button>下载</button>
                  <button>评论</button>
              </div>
              <p :class="{closeP:isActive}">
                  {{standardLyric}}
              </p>
              <span :class="{showCtl:!isActive}" @click="changelrc">展开<i class="el-icon-arrow-down" /></span>
              <span :class="{showCtl:isActive}" @click="changelrc">收起<i class="el-icon-arrow-up" /></span>
          </div>
      </div>
      <comment :mold="mold"></comment>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Comment from "@/components/comment/comment.vue"

export default {
data(){
    return {
        songDetail:{},
        al:{},
        lyric:'',
        isActive:true,
        songUrl:'',
        mold:'music',
    }
},
components:{
    Comment
},
created(){
    let id = this.$route.query.id

    this.getSongDetail(id)
    this.getLyric(id)
    
},
computed:{
    standardLyric:function(){
        return this.lyric.replace(/[[0-9]+:[0-9]+.[0-9]+]/g,'').trim().replace(/ /g,'')
    },
    ...mapGetters([
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
    ])
},

methods:{
    ...mapActions([
        'selectPlay',
        'pausePlay',
        'addSong',
        'delSong',
        'setSongUrl',
    ]),
    async getSongDetail(id){
        try {
            let time = new Date().getTime()
            let res = await this.$api.getSongDetail(id,time)
            if(res.code == 200){
                this.songDetail = res.songs[0]
                this.al = res.songs[0].al
            }
        } catch (err) {
            console.log(err)
        }
    },
    async getLyric(id){
        try {
            let res = await this.$api.getLyric(id)
            if(res.code == 200){
                this.lyric = res.lrc.lyric
            }
        } catch (err) {
            console.log(err)
        }
    },
    
    changelrc(){
        this.isActive = !this.isActive
    },
    playSong(song){
        this.addSong({playList:this.playList,song:song})
        this.setSongUrl(song.id)
        this.selectPlay(this.playList.length-1)
        
    },
    add(song){
        this.addSong({playList:this.playList,song:song})
    }

}
}
</script>

<style lang="stylus" scoped>
.song{
    width:750px;
    border:1px solid #d3d3d3;
    background-color:#fff;
    margin:0 auto;
    .song-content{
        margin-top:10px;
        .left{
            float:left;
            width:131px;
            
            position:relative;
            padding:37.5px;
            
            margin-top:15px;
            margin-left:15px;
            
            span{
                width:205px;
                height:205px;
                position:absolute;
                top:0;
                left:0;
                background:url(https://s2.music.126.net/style/web2/img/coverall.png?6a941e602d82c63bb7cf5ee22fed8dc3) no-repeat -140px -580px;

            }
        }
        .right{
            margin-top:15px;
            margin-left:15px;
            float:right;
            width:500px;

            p{
                white-space:pre-wrap;
            }
            .closeP{
                overflow:hidden;
                // text-overflow:ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 15;
            }
            .showCtl{
                display:none;
            }
            
        }
        &:after{
            content:'-';
            clear:both;
            display:block;
            height:0;
            visibility:hidden;
        }
    }
}

</style>