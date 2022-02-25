<template>
  <div>
  <div class="playbar">
      <div class="playbar-content">
          <div class="left">
              <span class="pre" @click="preSong"></span>
              <span :class="{pause:!playing,playing:playing}" @click="myplayingOrPause()">               
              </span>
              <span class="next" @click="nextSong"></span>
          </div>
          <div class="center">
            <div class="songPic">
              <img v-if="playList.length>0&&currentIndex!=-1" :src="songAl.al?songAl.al.picUrl+'?param=36y36':''" alt="">
              <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" style="width:36px;height:36px;" alt="">
            </div>
            <div class="aud">
              <p v-if="playList.length>0&&currentIndex!=-1">{{playList[currentIndex].name}}-{{playList[currentIndex].ar[0].name}}</p>
              <p v-else>歌名-歌手</p>
              <div style="width:350px;height:8px;">
                <el-slider 
                v-model="percent" 
                :show-tooltip="false" 
                
                @input="inputTime"
                @change="changeTime"
                ></el-slider>
              </div>
            </div>
            <div class="timeProgress">
              <p v-if="playList.length>0&&currentIndex!=-1">{{changeTimeFormat(1000*currentTime)+'/'+changeTimeFormat(currentSong.dt)}}</p>
              <p v-else>00:00/00:00</p>
            </div>
            

          </div>
          <div class="right">
            <!-- <i class="el-icon-s-operation" @click="changePlayMode"></i> -->
            <a :class="{seq:mode==0,loop:mode==1,rad:mode==2}" class="icon-playBar" @click="changePlayMode"></a>
            <el-popover 
            placement="top"
            width="30"
            trigger="click"
            >
            <div class="elsldbox">
              <el-slider
              v-model="volume"
              vertical
              
              height="80px"
              @change="changeVolume"
              ></el-slider>
            </div>
            

            <!-- <i class="el-icon-s-data" slot="reference" ></i> -->
            <a class="icon-volume icon-playBar" slot="reference"></a>
            </el-popover>
            <!-- <i class="el-icon-s-order" @click="show = !show"></i> -->
            <a class="icon-playList icon-playBar"  @click="show = !show">
              {{playList.length}}
            </a>
          </div>

      </div>
      
  </div>
      
      <div class="playlist" :class="{playlistshow:show}">
        
        <div class="playbar-lyric">
          <h3>{{playList[currentIndex]?playList[currentIndex].name:' '}}</h3>
          <ul ref="lyric">
            <template v-if="standardLyric">
              <li v-for="(item,index) in standardLyric" :key="item" :class="{chosen:lyricstamp==index}">
                 <p >{{item.replace(/[[0-9]+:[0-9]+.[0-9]+]/g,'')}}</p>
              </li>
            </template>
            
          </ul>
        </div>
        <div class="playbar-playlist" >
        <h3>歌曲列表</h3>
        <ul>
          
          <template v-if="playList.length>0">
          <li v-for="(item,index) in playList" :key="item.id" :class="{selected:index==currentIndex}">
            <span  class="song">
              <span  @click="select(item,index)">{{item.name}}</span>
              <span >-{{item.ar[0].name}}</span>
              <!-- {{item.name}}-{{item.ar[0].name}} -->
            </span>
            <span class="songAction">
              <i class="el-icon-delete" @click="delSong(index)"></i>
            </span>
          </li>
          </template>
        </ul>
      </div>
      <img :src="songAl.al?songAl.al.picUrl+'?param=800y380':''" alt="">
      </div>
      

      <audio 
      ref="audio"
      :src="songUrl"
      :loop="isLoop"
      @timeupdate="updateTime"
      @ended="audioEnd"
      ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
data(){
  return {
    isPlaying:true,
    percent:0,
    show:false,
    thissongUrl:'',
    volume:50,
    currentTime:0,
    isLoop:false,
    tempSong:{},
    lyric:'',
    lyricstamp:0
  }
},
computed:{
  ...mapGetters([
    'playList',
    'currentSong',
    'playing',
    'currentIndex',
    'mode',
    'songUrl',
  ]),
  changeTimeFormat(){
    return function(time){
      return '0'+Math.floor(time/1000/60)+':'+(String(Math.round(time/1000%60)).length==2?Math.round(time/1000%60):'0'+Math.round(time/1000%60))
    }
  },
  songAl(){
    return this.currentSong
  },
  standardLyric:function(){
        return this.lyric.split('\n')
    },
  timestamp(){
    return this.lyric.match(/\d+:\d+/g)
  }
},
created(){
  
},
watch:{
    playing:function(newVal){
        if(newVal == true){
          // this.getSongUrl(this.currentSong.id)
          
          this.$nextTick(()=>{
            this.$refs.audio.play()
            document.title = this.currentSong.name
          })
          
          
        }else{
          this.$nextTick(()=>{
            this.$refs.audio.pause()
            document.title = '晓哥云音乐'
          })
        }
    },
    currentSong(a,b){
      if(a.id!=b.id){
        this.setSongUrl(a.id)
        this.$refs.audio.src = this.songUrl
        this.getLyric(a.id)
        this.setPlayingState(true)
        this.$nextTick(()=>{
          // console.log(this.currentIndex)
              this.$refs.audio.play()
            })
        
      }    
    },
    lyricstamp(a){
      if(2<a){
          if((a-3)*55 > this.$refs.lyric.scrollTop){
            console.log(1)
            this.$refs.lyric.scrollTo({top:(a-2)*55})
          }else {
            this.$refs.lyric.scrollBy({top:55,behavior: "smooth" })
            console.log(2)
          }
          console.log(this.$refs.lyric.scrollTop)
        }
    }
},
methods:{
  select(a,b){
  // console.log(b)
  this.setSongUrl(a.id)
  this.$refs.audio.src = this.songUrl
  this.selectPlay(b)
  // this.$refs.audio.play()
  // this.playingOrPause(true)
},
async getSongUrl(id){
  try {
    let res = await this.$api.getSongUrl(id)
    if(res.code==200){
      // this.songUrl = res.data[0].url
      console.log('1',res.data[0].url)
      
      this.setSongUrl(res.data[0].url)
      this.$refs.audio.src = res.data[0].url
      this.$refs.audio.play()
      // console.log(this.songUrl)
    }
  } catch (err) {
    console.log(err)
  }
},

myplayingOrPause(){
  if(this.playing == false){
    // console.log(this.playing)

    this.playingOrPause(true)
    // this.$refs.audio.play()

  }else{
    // console.log(this.playing)
    this.playingOrPause(false)  
    // this.$refs.audio.pause()
  }
},
preSong(){
  if(this.playList.length ==1){
    this.playingOrPause(false)
    this.playingOrPause(true)
  }
  else if(this.currentIndex == 0){
    // this.selectPlay(this.playList.length-1)
    // this.select(this.playList[this.playList.length-1],this.playList.length-1)
    
    this.setCurrentIndex(this.playList.length-1)
    
  }else{
    
    this.setCurrentIndex(this.currentIndex-1)
  }
  // this.select(this.playList[this.currentIndex-1],this.currentIndex-1)
  
  
},
nextSong(){
  if(this.playList.length ==1){
    this.myplayingOrPause()
    this.$nextTick(()=>{
      this.myplayingOrPause()
    })
    
  }
  else if(this.currentIndex == this.playList.length-1){
    // this.selectPlay(this.playList.length-1)
    // this.select(this.playList[0],0)
    // this.setCurrentIndex(-1)
    this.setCurrentIndex(0)
     
  }
  // this.select(this.playList[this.currentIndex+1],this.currentIndex+1)
  // this.setCurrentIndex(-1)
  else{
    this.setCurrentIndex(this.currentIndex+1)
    }
  
},
updateTime(e){
  // console.log(e.target.currentTime)
  this.currentTime = parseInt(e.target.currentTime)
  this.percent = this.currentTime*1000/this.currentSong.dt*100
  // const that = this
  // console.log(this.timestamp)
  // this.$refs.lyric.scrollTo(0,parseInt(e.target.currentTime)*55)
  if(this.timestamp){
  this.timestamp.forEach((el,index,arr) => {
    if(e.target.currentTime>(Number(arr[arr.length-1].slice(0,2))*60+Number(arr[arr.length-1].slice(3)))){
      this.lyricstamp = index

    }
    else if(
      (Number(el.slice(0,2))*60+Number(el.slice(3)))<e.target.currentTime
      &&
      e.target.currentTime<(Number(arr[index+1].slice(0,2))*60+Number(arr[index+1].slice(3)))
      ){
         
         
         
        //  if(2<index){
        //   if((index-2)*55 != that.$refs.lyric.scrollTop){
            
        //     that.$refs.lyric.scrollTo({top:(index-2)*55})
        //   }else {
        //     that.$refs.lyric.scrollBy({top:55,behavior: "smooth" })
            
        //   }
        //   console.log(that.$refs.lyric.scrollTop)
        // }
      this.lyricstamp = index
    }
  })
  }
},
inputTime(val){
  this.currentTime = val/100*this.currentSong.dt/1000
  this.percent = val
  // this.$refs.audio.currentTime = this.currentTime
},
changeTime(val ){
  this.percent = val
  // console.log(this.percent)
  const currentTime = val/100*this.currentSong.dt/1000
  // console.log(currentTime)
  this.currentTime = currentTime
  this.$refs.audio.currentTime = currentTime
  // this.$refs.audio.play()
  // this.playingOrPause(true)
},
changeVolume(val){
  this.volume = val
  this.$refs.audio.volume = val/100
},
audioEnd(){
  if(this.mode == 1){
    this.nextSong()
  }else if(this.mode == 2){
    // this.preSong()
    let num = Math.floor(Math.random()*this.playList.length)
    this.select(this.playList[num],num)
  }else{
    // const currentSong = this.playList[this.currentIndex]
    // const id = currentSong.id
    this.select(this.currentSong,this.currentIndex)
  }
  this.lyricstamp = 0
  this.$refs.lyric.scrollTo(0,0)
},
changePlayMode(){
  if(this.mode == 0){
    this.setPlayMode(1)
    this.isLoop = false
    // this.$refs.audio.loop = false
  }else if(this.mode ==1){
    this.setPlayMode(2)
  }else{
    this.setPlayMode(0)
    this.isLoop = true
    // this.$refs.audio.loop = false
  }
  console.log(this.mode)
},
//获取歌词
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
...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',

    }),
    ...mapActions([
      'saveHistoryList',
      'deleteHistoryList',
      'clearHistoryList',
      'selectPlay',
      'pausePlay',
      'addSong',
      'delSong',
      'playingOrPause',
      'setPlayMode',
      'setSongUrl'
    ])
}
}
</script>

<style lang="stylus" scoped>
.playbar{
  position:fixed;
  color:#fff;
  // background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?b55cbfc467533078837d597ff88056af) repeat-x 0 0;
  background-image: linear-gradient(rgb(55,55,55),rgb(35,35,35),rgb(50,50,50),rgb(35,35,35));
  bottom:0;
  height:60px;
  width:100%; 
  // background-color: #3d3d3d;
  border-top:1px solid #000;
  opacity:0.95;
  &-content{
    width:800px;
    display:flex;
    margin:0 auto;
    // background-color: #1f1f1f;
    background-image: linear-gradient(rgb(55,55,55),rgb(35,35,35),rgb(50,50,50),rgb(35,35,35));
    .left{
      position:relative;
      height:36px;
      width:94px;
      padding:12px 12px;
      span{
        background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?b55cbfc467533078837d597ff88056af) no-repeat 0 9999px;
        float:left;
        display:block;
        width:28px;
        height:28px;
      }
      .pre{
        background-position:0 -130px;
        margin-top: 4px;
      }
      .pause{
        width:36px;
        height:36px;
        background-position:-40px -204px;
      }
      .playing{
        width:36px;
        height:36px;
        background-position:-40px -165px;
      }
      .next{
        background-position:-80px -130px;
        margin-top: 4px;
      }

    }
    .center{
      display:flex;
      width:550px;
      .songPic{
        margin:auto auto;

      }
      .aud{
        padding:4px 5px;
        width:350px;
        p{
          width: 411px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .timeProgress{
        width:100px;
        color:#fff;
        p{
          margin-left:8px;
          margin-top:20px;
        }
      }
    }
    .right{
      // width:100px;
      padding-top:20px;
      // padding-left:10px;
      &:after{
        content:'-';
        clear:both;
        display:block;
        height:0;
        visibility:hidden;
      }
      .elsldbox{
        width:30px;
        
      }
      .icon-playBar{
        background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?b55cbfc467533078837d597ff88056af) no-repeat;
        float: left;
        width:25px;
        height:25px;

      }
      .icon-playList{
        background-position: -42px -68px;
        width:34px;
        height:22px;
        padding-left:25px;
        padding-top:3px;
        color:#3c3c3c;
        font-size:16px;
        text-align:center;
      }
      .icon-volume{
        background-position: -2px -248px;
      }
      .seq{
        background-position: -66px -344px;
      }
      .loop{
        background-position: -3px -344px
      }
      .rad{
        background-position: -66px -248px
      }
    }
  }
  
}
.playlist{
  position:fixed;
  bottom:60px;
  left:50%;
  
  margin-left:-405px;
  display:none;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  overflow: hidden;
  img{
    position:absolute;
    top:30px;
    left:0;
    
    z-index:-1;
  }
  
  &:after{
    content:'-';
    clear:both;
    height:0;
    display:block;
    visibility:hidden;
  }
}
.playbar-lyric{
  width:400px;
  height:410px;
  float: left;
  background: #2e2e2e;
  text-align: center;
  opacity: 0.9;
  h3{
      padding-top:5px;
      padding-left:20px;
      color:#fff;
      font-family:"Arial";
      font-size:20px;
      height:30px;
      border-bottom:1px solid black;
      background-color: #080808;
    }
  ul{
    height:338px;
    width:380px;
    margin:26px 10px;
    overflow-y:scroll;
    color:#8a8a8a;
    
    li,p{
      height:55px;
      line-height:55px;
      
      
    }
    .chosen{
      color:#fff;
      font-size:20px;
      // transition:color .7s linear;
      transition-property:color,font-size;
      transition-duration:.7s;
      transition-timing-function:linear;
      -webkit-transition:color .7s linear;
    }
    &::-webkit-scrollbar{  
          width: 5px;  
          height:10px;
      }  
      &::-webkit-scrollbar-track       
      {  
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
          border-radius: 10px; 
          background-color:transparent;    

      }
      &::-webkit-scrollbar-thumb{
        background-color:#868686;
        border-radius: 10px;
      }
  }
}
.playbar-playlist{
    // position:fixed;
    // bottom:60px;
    float: left;
    right:10px;
    width:400px;
    height:410px;
    background-color: #2e2e2e;
    opacity: 0.9;
    z-index:100;
    color:#fff;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    // padding:5px;
    h3{
      padding-top:5px;
      padding-left:20px;
      font-family:"Arial";
      font-size:20px;
      height:30px;
      border-bottom:1px solid black;
      background-color: #080808;
    }
    ul{
      list-style-type: none;
      overflow-y: scroll;
      height:370px;
      // padding-left:20px;
      
      li{
        // width:360px;
        height: 21px;
        color:#ccc;
        vertical-align:top;
        line-height: 21px;
        padding-left:20px;
        padding-top:5px;
        padding-bottom:5px;
        .song{
          display:inline-block;
          width:310px;
          line-height: 21px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align:top;
        }
        
        .songAction{
          visibility: hidden;
          // line-height: 21px;
        }
        &:hover{
          background-color: grey;
          color:#fff;
          .songAction{
            visibility: visible;

          }
        }
      }
      .selected{
          color:#fff;
          background-color: grey;
        }
      &::-webkit-scrollbar{  
          width: 5px;  
          height:10px;
      }  
      &::-webkit-scrollbar-track       
      {  
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
          border-radius: 10px; 
          background-color:transparent;    

      }
      &::-webkit-scrollbar-thumb{
        background-color:#868686;
        border-radius: 10px;
      }
    }
}
  .playlistshow{
    display:block;
  }
  .el-popover{
    min-width:30px;
    left:922px;
  }
</style>