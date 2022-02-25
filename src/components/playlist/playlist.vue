<template>
  <div class="playlist-container">
      <div class="playlist-head">
          <h2>{{cat}}</h2>
          <el-popover
            placement="bottom"
            trigger="click"
            v-model="visible"
            width="600"
            >
            <ul >
                <el-radio v-model="params.cat" label="全部" @change="changecategory">全部</el-radio>
                <li v-for="(item,index) in catList" :key="index">
                    <h3>{{categories[index]}}</h3>
                    <!-- <span v-for="(i,ind) in item" :key="ind" @click="changecategory(i.name)">
                        {{i.name}}
                    </span> -->
                    <el-radio 
                    v-model="params.cat" 
                    v-for="(i,ind) in item" 
                    :label="i.name" 
                    :key="ind" 
                    @change="changecategory"
                    >{{i.name}}</el-radio>
                </li>
            </ul>
            <el-button slot="reference">选择类别</el-button>
          </el-popover>
      </div>
      <div class="playlist-content">
          <div v-for="item in playLists" :key="item.id" class="playlist">
              <img :src="item.coverImgUrl+'?param=140y140'" loading="lazy" alt="">
              <router-link :to="{name:'playlistDetail',query:{id:item.id}}" class="playlist-img"></router-link>
              <p>{{item.name}}</p>
              <p>by<a>{{item.creator.nickname}}</a></p>
          </div>
      </div>
      <el-pagination 
      :total="total" 
      :current-page="page" 
      :page-size="50" 
      @current-change="pagechange" 
      layout="prev, pager, next"></el-pagination>
  </div>
</template>

<script>
export default {
data(){
    return {
        all:{},
        catList:[],
        playLists:[],
        params:{
            cat:'全部',
            limit:50,
            offset:0,
            order:'hot'
        },
        total:0,
        page:1,
        cat:'',
        categories:[],
        visible:false,
    }
},
created(){
    if(this.$route.query.cat){
        this.params.cat = this.$route.query.cat
        this.getCatList()
        this.getPlayList(this.params)
        
    }else{
        console.log('出现了')
        this.getCatList()
        this.getPlayList(this.params) 
    }
    
},
methods:{
    async getCatList(){
        
        try {
            let res = await this.$api.getCatList()
            if(res.code ==200){
                this.all = res.all
                let category = res.sub
                this.categories = res.categories
                // this.catList = this.all.sub
                // console.log(this.category)
                this.catList = this.categoryGroup(category)
                // console.log(this.catList)
            }
        } catch (err) {
            console.log(err)
        }
    },
    async getPlayList(params){
        try {
            let res = await this.$api.getPlayList(params)
            if(res.code ==200){
                this.playLists = res.playlists
                this.total = res.total
                this.cat = res.cat
            }
        } catch (err) {
            console.log(err)
        }
    },
    pagechange(page){
        this.params.offset = (page-1)*this.params.limit
        this.getPlayList(this.params)
    },
    categoryGroup(arr){
        
        let res = {
            '0':[],
            '1':[],
            '2':[],
            '3':[],
            '4':[],
        }
        arr.forEach(el => {
            res[el.category].push(el)           
        });
        console.log(res)
        return res
    },
    changecategory(){
        // console.log(this.params)
        // this.params.cat = cat
        this.$router.replace({name:'playlists',query:{cat:this.params.cat}})
        this.getPlayList(this.params)
        this.visible = false
    }
}
}
</script>

<style>
.playlist-container{
    width:750px;
    margin:0 auto;
}
.el-popover .el-radio__input{
    display:none;
}
.el-popover ul{
    list-style-type: none;
}

.playlist-content{
    width:750px;
    display:flex;
    flex-wrap: wrap;
}
.playlist-content .playlist{
    width:140px;
    margin:5px;
    position: relative;
    /* overflow: hidden; */
}
.playlist .playlist-img{
    width:140px;
    height:140px;
    position:absolute;
    /* top:0; */
    left:0;
    background:url(https://s2.music.126.net/style/web2/img/coverall.png?6a8072e5796e5f559728ab13d717d21d);
    background-position: 0 0;

}
.playlist p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-pagination{
    text-align: center;
}

</style>