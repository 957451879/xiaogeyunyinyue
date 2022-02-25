<template>
  <div id="home">
      <div class="out" ref="out">
        <el-carousel indicator-position="outside" class="banner" @change="bannerbackground">
          <el-carousel-item v-for="item in banners" :key="item.imageUrl">
            <img :src="item.imageUrl" alt="" style="width:800px; height:100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
  <div class="recommendsongs">
      <div class="recommendsongs-head">
          <span style="float: left; font-size:15px;" >热门推荐</span>
          <div class="recommendsongs-style">
          <router-link :to="{name:'playlists',query:{cat:'华语'}}">华语</router-link><span>|</span>
          <router-link :to="{name:'playlists',query:{cat:'流行'}}">流行</router-link><span>|</span>
          <router-link :to="{name:'playlists',query:{cat:'摇滚'}}">摇滚</router-link><span>|</span>
          <router-link :to="{name:'playlists',query:{cat:'民谣'}}">民谣</router-link><span>|</span>
          <router-link :to="{name:'playlists',query:{cat:'电子'}}">电子</router-link>
          </div>
          <span style="float: right;">              
              <router-link :to="{name:'playlists'}">更多</router-link>
              <i class="el-icon-right"></i>
          </span>
      </div>
      <div class="songlist-box">
          <div v-for="item in songlist" :key="item.id" class="songlist" @click="toplaylist(item.id)">
              <img :src="item.picUrl+'?param=140y140'" alt="">
              <span>{{item.name}}</span>
          </div>         
      </div>
  </div>
  <rank-list class="home-list"/>
  <div class="recommendsingerlist">
      <h1>热门歌手</h1>
      <div v-for="item of singers" :key="item.id" class="recommendsingers" @click="toSinger(item.id)">
          
          <img :src="item.picUrl+'?param=88y88'" alt="item.name" loading="lazy">
          <h5>{{item.name}}</h5>
      </div>
  </div>






      <!-- <banner/>
      <recommendsongs/>
      
      <recommendsinger/> -->

  </div>
</template>

<script>

// import banner from './banner.vue'
// import recommendsinger from './recommendsinger.vue'
// import recommendsongs from './recommendsongs.vue'
import rankList from './rankList/rankList.vue'
export default {
    name:'home',
    components:{
    // banner,
    // recommendsinger,
    // recommendsongs,
    rankList,

},  
data(){
  return{
    banners:[],
    songlist:[],
    singers:[],

  }
},
created(){
      this.getBanner();
      this.$api.getPersonalized(8).then(res=>{
            // console.log(res)
            this.songlist = res.result
        })
      this.getHotsinger()
}, 
methods:{
      async getBanner(){
            try {
                 let res = await this.$api.getBanner();
                 this.banners = res.banners;
                 
            } catch (error) {
                console.log(error)
            }
        },
      
      toplaylist(id){
            this.$router.push({
                name:'playlistDetail',
                query:{
                    id:id
                }
            })
        },
      async getHotsinger(){
            try {
                let res = await this.$api.getHotSinger(32)
                
            if(res.code === 200){

                this.singers = res.artists
                
            }
            }
             catch (error) {
                console.log(error)
            }
            
    },
    toSinger(id){
        console.log("跳转")
        this.$router.push({
            name:'singer',
            query:{
                id:id
            }
        })
    },
    bannerbackground(i){
        this.$refs.out.style.background = "url("+this.banners[i].imageUrl+"?imageView&blur=40x20) center"
    }
}
}
</script>

<style lang="stylus">
#home{
//   width:800px;
//   border:1px solid #d3d3d3;
  margin:0 auto;
  background-color:#f7f7f7;
}
.home-list{
//   margin:0 auto;
//   width:689px;
}
.out{
//   width:800px;
//   margin:0 auto;
  text-align: center;
  display:flex;
  justify-content: center;
  .banner{
      width:800px;
  }
}
.recommendsongs{
    width:800px;
    height:523px;
    margin:0 auto;
    border-left:1px solid #d3d3d3;
    border-right:1px solid #d3d3d3;
    background-color:#fff;
}
.songlist{
    width:140px;
    height:180px;
    margin:25px 15px;
}
.songlist-box{
    display:flex;
    flex-wrap: wrap;
    margin:5px 56px;
}
.recommendsongs-style{
    float:left;
}
.recommendsongs-head{
    border-bottom: 2px solid #C10D0C;
    background-image: linear-gradient(white,grey);
}
.recommendsongs-head::after{
    clear:both;content:'';display:block;width:0;height:0;visibility:hidden;
}
.recommendsingerlist{
    width:800px;
    border-left:1px solid #d3d3d3;
    border-right:1px solid #d3d3d3;
    margin:0 auto;
    background-color:#fff;
    &::after{
        content:'';
        display: block; 
        height: 0; 
        clear: both; 
        visibility: hidden;  
    }
    
}
.recommendsingers{
    float:left;
    margin:6px;
    width:88px;
    height:130px;
    
}
h1{
    text-align:left
}
.recommendsingers img{
    border-radius: 50%;
}
.recommendsingers h5{
    text-align:center;
}
</style>