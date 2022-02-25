<template>
  <div class="toplist">
      <div class="toplist-list">
          <ul>
              <h2>云音乐特色榜</h2>
              <li v-for="item in toplist.slice(0,4)" :class="{checkedLi:item.id==checkedId}" :key="item.id" @click="changeToplist(item)">
                  <div class="topli">
                      <div>
                         <img :src="item.coverImgUrl+'?param=40y40'" alt=""> 
                      </div>
                      
                      <div class="txt">
                          <p>{{item.name}}</p>
                          <p>{{item.updateFrequency}}</p>
                      </div>
                  </div>
              </li>
              <h2>全球媒体榜</h2>
              <li v-for="item in toplist.slice(4)"  :class="{checkedLi:item.id==checkedId}" :key="item.id" @click="changeToplist(item)">
                  <div class="topli" >
                      <div>
                         <img :src="item.coverImgUrl+'?param=40y40'" alt=""> 
                         
                      </div>
                      
                      <div class="txt">
                          <p>{{item.name}}</p>
                          <p>{{item.updateFrequency}}</p>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
      <div class="toplist-content">
          <div class="toplist-info">
              <div class="info-img">
                  <img :src="toplistDetail.coverImgUrl+'?param=150y150'" alt="">
                  <span></span>
              </div>
              
              <div class="info-title">
                  <h2>{{toplistDetail.name}}</h2>
                  <span>
                      <i></i>
                      <span>最近更新</span>
                      <span>{{new Date(toplistDetail.updateTime).getFullYear()+'-'+(new Date(toplistDetail.updateTime).getMonth()+1)+'-'+new Date(toplistDetail.updateTime).getDate()}}</span>
                      <span>({{updateTime}})</span>
                  </span>
                  <div class="song-feature">
                    <el-button type="primary" size="mini" @click="playAll(tracks)">播放</el-button>
                    <el-button type="primary" size="mini" @click="add(tracks)">+</el-button>
                    <el-button type="primary" size="mini">收藏夹{{toplistDetail.subscribedCount}}</el-button>
                    <el-button type="primary" size="mini">转发{{toplistDetail.shareCount}}</el-button>
                    <el-button type="primary" size="mini">下载</el-button>
                    <el-button type="primary" size="mini">评论{{toplistDetail.commentCount}}</el-button>
                </div>
              </div>
          </div>
          <div class="toplist-songs">
              <div class="toplist-songs-head">
                  <h2 style="float:left">歌曲列表</h2>
                  <span style="float:left; margin:9px 0 0 20px;">{{tracks.length}}首歌</span>
                  <span style="float:right; margin:9px 0 0 20px;">播放:<span style="color:red;">{{toplistDetail.playCount}}</span>次</span>
              </div>
              <table>
                  <thead>
                   <tr>
                      <th width="50px"></th>
                      <th width="290px">标题</th>
                      <th width="100px">时长</th>
                      <th width="240px">歌手</th>
                  </tr>   
                  </thead>
                  
                  <tbody>
                     <tr v-for="(item,index) in tracks" :key="item.id">
                      <td width="50px">{{index+1}}</td>
                      <td v-if="index<3" width="290px">
                          <div>
                              <img :src="item.al.picUrl+'?param=50y50&quality=100'" alt="">
                              <span class="icon-video-play" @click="playSong(item)"></span>
                              <span>
                                    <router-link :to="{name:'song',query:{id:item.id}}">
                                        {{item.name}}
                                    </router-link>                          
                                    
                                    <template v-if="item.tns">
                                        -(<span v-for="it in item.tns" :key="it">{{it}}</span>)
                                    </template>
                              </span>
                              <i v-if="item.mv!=0" class="el-icon-video-camera-solid"></i>
                          </div>
                      </td>
                      <td v-else width="290px">
                          <div>
                                <span class="icon-video-play" @click="playSong(item)"></span>
                                <span >
                                    <router-link :to="{name:'song',query:{id:item.id}}">
                                        {{item.name}}
                                    </router-link>  
                                    <span v-if="item.alia.length>0" style="color:#808080">
                                        -(<span v-for="it in item.alia" :key="it">{{it}}</span>)
                                    </span>
                                </span>
                                <i v-if="item.mv!=0" class="el-icon-video-camera-solid"></i>
                         </div>
                      </td>
                      
                      <td width="100px">
                          <span>
                                  {{'0'+Math.floor(item.dt/1000/60)+':'+(String(Math.round(item.dt/1000%60)).length==2?Math.round(item.dt/1000%60):'0'+Math.round(item.dt/1000%60))}}
                          </span>
                          <span style="font-size:18px;">
                                  <i class="el-icon-plus" @click="add(item)"></i>
                                  <i class="el-icon-folder-add"></i>
                                  <i class="el-icon-share"></i>
                                  <i class="el-icon-download"></i>
                          </span>
                      </td>
                      <td width="240px">
                          <span v-for="(i) in item.ar" :key="i.id">
                              <router-link :to="{name:'singer',query:{id:i.id}}">
                                  {{i.name}}
                              </router-link>
                              
                          </span>                        
                      </td>
                     </tr> 
                  </tbody>
                  
              </table>
          </div>
      </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
data(){
    return {
        toplist:[],
        toplistDetail:{},
        updateTime:'',
        tracks:[],
        checkedId:0,

    }
},
created(){
    let id = this.$route.query.id
    this.checkedId = id
    this.getToplist()
    this.getPlayListDetail(id,8)
},
computed:{
  ...mapGetters([
    'playList',
    'currentSong',
    'playing',
    'currentIndex',
    'mode',
  ])
},
watch: {
    '$route'() {
    //当参数改变时就会触发比方法，以此达到数据属性
     let id = this.$route.query.id;
     this.getPlayListDetail(id,8)
      
    }
  },
methods:{
    async getToplist(){
        try {
            let res = await this.$api.getToplist()
            if(res.code == 200){
                this.toplist = res.list
                this.updateTime =this.toplist[0].updateFrequency
            }
        } catch (err) {
            console.log(err)
        }
    },
    async getPlayListDetail(id,s){
        try {
            let time = new Date().getTime()            
            let res = await this.$api.getPlayListDetail(id,s,time)
            if(res.code == 200){
                
                this.toplistDetail = res.playlist
                
                this.tracks = res.playlist.tracks

            }
        } catch (err) {
            console.log(err)
        }
    },
    changeToplist(item){
        this.$router.push({name:'toplist',query:{id:item.id}})
        this.updateTime = item.updateFrequency
        this.checkedId = item.id
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'saveHistoryList',
      'deleteHistoryList',
      'clearHistoryList',
      'selectPlay',
      'pausePlay',
      'addSong',
      'delSong',
      'setSongUrl',
      
    ]),
    add(i){
        // console.log(i)
        this.addSong({playList:this.playList,song:i})
        // console.log(this.playList)
    },
    playAll(list){
        this.setPlayList(list)
        this.setCurrentIndex(0)
        this.setPlayingState(true)
    },
    playSong(song){
        if(!this.findSong(song)){
        this.addSong({playList:this.playList,song:song})
        this.setSongUrl(song.id)
        this.selectPlay(this.playList.length-1)
        }
    },
    findSong(song){
        for (let i = 0; i < this.playList.length; i++){
            if (this.playList[i].id == song.id) {
                if(this.currentSong.id == song.id){
                    this.setPlayingState(true)
                }else{
                    this.setCurrentIndex(i)
                }
                

                return true
            }
        }   
        return false    
    }
    
}
}
</script>

<style lang="stylus">
.toplist{
    display:flex;
    width:1080px;
    min-height:700px;
    margin:0 auto;
    border:1px solid #d3d3d3;
    font-size:12px;
    background-color: #fff;
    .toplist-list{
        width:240px;
        padding-top:20px;
        h2{
            margin:10px 20px;
        }
        li{
            padding:10px 15px;
            &:hover{
                background-color: #eee;
            }

        }
        .topli{
           display: flex;

           .txt{
               margin-left:6px;
               p{
                   line-height:20px;
               }
               
           }
           
        &>div{
            font-size:12px;
            height:40px;
        }
        p:nth-child(2){
            color:grey;
        }
        }
        ul{
            list-style-type:none;

           .checkedLi{
               background-color:#eee;
           }
        }
    }
    .toplist-content{
        border-left: 1px solid #d3d3d3;
        width:820px;
        padding-top:20px;
        .toplist-info{
            display: flex;
            padding-left:30px;
            .info-img{
                position:relative;
                padding:3px;
                border:1px solid #ccc;

                span{
                    position:absolute;
                    left:0;
                    top:0;
                    width:150px;
                    height:150px;
                    background: url(https://s2.music.126.net/style/web2/img/coverall.png?6a941e602d82c63bb7cf5ee22fed8dc3) no-repeat -230px -380px;
                }
            }
            .info-title{
                margin-left:30px;
                
            }
        }
        .toplist-songs{
            .toplist-songs-head{
                margin-left:30px;
                margin-right: 30px;
                border-bottom:3px solid red;

                &:after{
                    content:'-';
                    clear:both;
                    display:block;
                    height:0;
                    visibility:hidden;
                }
            }
            table{
                width:760px;
                table-layout:fixed;
                margin:0px 30px;
                // font-size:18px;
                border-spacing:0;
                border: 1px solid #d9d9d9;
                // border-top:2px solid red;
                tbody{
                    tr:nth-child(2n){
                        background-color: #f7f7f7;
                    }
                }
            }
            th,td{
                padding:6px 10px;
            }
            th{
                text-align:left;
                background:url(https://s2.music.126.net/style/web2/img/table.png?55c0d5cf06020d94347cd660b9f73193) no-repeat;
                background-position: 0 0px;
                background-repeat: repeat-x;
                border-bottom:1px solid #d9d9d9;
            }
            td{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height:24px;
                height:24px;
                div{
                    display: flex;
                    align-items: center;

                    &>span:nth-child(2){
                        max-width:216px;
                        overflow:hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

            }
            td:nth-child(3){
                span:nth-child(2){
                    display:none;

                }
               

            }
            
            tr:hover>td:nth-child(3){
                span:first-child{
                        display: none;
                    }
                    span:nth-child(2){
                        display:block;
                    }
            }
        }
    }
}
.icon-video-play{
    background: url(https://s2.music.126.net/style/web2/img/table.png?55c0d5cf06020d94347cd660b9f73193) no-repeat;
    background-position: 0 -103px;
    width:17px;
    height:17px;
    margin:16px 10px;
}
.icon-video-play:hover{
    background-position: 0 -128px;
}
</style>