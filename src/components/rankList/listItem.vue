<template>
  <div class="listItem">
      <dl>
        <dt>
        <div class="listItem-head">
          <router-link :to="{name:'toplist',query:{id:listId}}">
              <img :src="playlist.coverImgUrl+'?param=100y100'" alt="">
          </router-link>
          
          <div class="listItem-content">
              <router-link :to="{name:'toplist',query:{id:listId}}">{{playlist.name}}</router-link>
              <div>
                <i class="el-icon-video-play block-i"></i>
                <i class="el-icon-folder-add block-i"></i>
              </div>
          </div>
          </div>  
        </dt>
          <dd>
              <loading v-if="loading" style="width:229.67px;height:331px;"/>
              <ol class="listItem-ol" v-else>
                  <li v-for="item in playlist.tracks.slice(0,10)" :key="item.id">
                      <router-link :to="{name:'song',query:{id:item.id}}">{{item.name}}</router-link>                
                  </li>                 
              </ol>
                <div style="text-align:right;margin-right:15px;">
                    <router-link :to="{name:'toplist',query:{id:listId}}">查看全部>>></router-link>
                </div>
              

          </dd>
      </dl>
      
  </div>
</template>

<script>
import loading from '@/components/transition/loading.vue'
export default {
props:
    ['listId']
,
data(){
    return{
        playlist:[],
        loading:true,
    }
},
components:{loading},
created(){
    this.getPlayListDetail()
},
methods:{
    async getPlayListDetail(){
        try {
            let res = await this.$api.getPlayListDetail2(this.listId)
            // console.log(res)
            if(res.code == 200){
                this.playlist = res.playlist
                this.loading = false
            }
        } catch (error) {
            console.log(error)
        }
    }
}
}
</script>

<style lang="stylus">
.listItem{
    width:230px;
    .listItem-head{
        padding:20px 25px;
    }
}
.listItem li{
    width:120px;
    text-align: left;
    white-space: nowrap;/*强制在一行显示*/
	text-overflow:ellipsis;/*设置超出内容显示...*/
	overflow: hidden;/*一定不能少 超出的内容进行隐藏*/
    list-style-position: inside;
}
.listItem-ol{
    list-style-type: decimal;
    margin-left: 25px;
}
.listItem-head img{
    vertical-align: middle;
}
.listItem-content{
    display:inline-block;
}
.block-i{
    /* display: block; */
}
</style>