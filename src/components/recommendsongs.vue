<template>
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
</template>

<script>
export default {
    data(){
        return {
            songlist:[]
        }
    },
    created(){
        // this.getPersonalized(8)
        this.$api.getPersonalized(8).then(res=>{
            // console.log(res)
            this.songlist = res.result
        })
    },
    methods:{
        async getPersonalized(limit){
            try{
            let res = await this.$api.getPersonalized(limit)
            if(res.code === 200){
                console.log(res)
                this.songlist = res.result
            }
                
            }
            catch(err){
                console.log(err)
            }
        },
        toplaylist(id){
            this.$router.push({
                name:'playlistDetail',
                query:{
                    id:id
                }
            })
        }
    }
}
</script>

<style>
.recommendsongs{
    width:689px;
    height:523px;
    margin:5px auto;
    
}
.songlist{
    width:140px;
    height:180px;
    margin:25px 15px;
}
.songlist-box{
    display:flex;
    flex-wrap: wrap;
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
</style>