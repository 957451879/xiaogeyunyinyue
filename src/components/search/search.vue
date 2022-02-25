<template>
  <div class="search">     
      <div class="srch">
          <input v-model="keyword" type="text"><button @click="dosearch">搜索</button>
      </div>
      <div class="tabs">
          <ul>
              <li>单曲</li>
              <li>专辑</li>
              <li>歌手</li>
              <li>歌单</li>
          </ul>
          <el-radio-group v-model="type" size="medium" @change="dosearch1()">
            <el-radio-button label="1" >单曲</el-radio-button>
            <el-radio-button label="10">专辑</el-radio-button>
            <el-radio-button label="100">歌手</el-radio-button>
            <el-radio-button label="1000">歌单</el-radio-button>
          </el-radio-group>
      </div>
      <song v-if="type==1" :songs="results"></song>
      <album v-if="type==10" :albums="results"></album>
      <!-- <el-pagination 
      :total="total" 
      :current-page="page" 
      :page-size="20" 
      @current-change="dosearch" 
      layout=""
      ></el-pagination> -->
  </div>
</template>

<script>
import album from '@/components/search/components/album.vue'
import song from '@/components/search/components/song.vue'

export default {
    data(){
        return {
            active:1,
            results:[],
            keyword:'',
            page:1,
            total:0,
            type:1,

        }
    },
    components:{
        song,
        album,

    },
    created(){
        let keyword = this.$route.query.keyword
        let type = this.$route.query.type
        this.search(keyword,(this.page-1)*20,type)
    },
    watch:{
        // '$route'(){
        //     let keyword = this.$route.query.keyword
        //     let type = this.$route.query.type
        //     this.search(keyword,(this.page-1)*20,type)

        // }
    },
    methods:{
        async search(keyword, offset, type){
            try {
                let res =await  this.$api.search(keyword, 20, offset, type)
                if(res.code == 200){
                    if(type == 1){
                        this.results = res.result.songs
                        this.total = res.result.songCount
                    }else if(type == 10){
                        this.results = res.result.albums
                        this.total = res.result.albumCount
                    }else if(type == 100){
                        this.results = res.result.songs 
                        this.total = res.result.artistCount
                    }else{
                        this.results = res.result.playlists
                        this.total = res.result.playlistCount
                    }
                    console.log(res.songs)
                    console.log(this.results)

                }
            } catch (err) {
                console.log(err)
            }
        },
        dosearch(){
            // this.page = 1
            this.search(this.keyword,(this.page-1)*20,this.type)
            // this.$router.push({name:'search',query:{keyword:this.keyword,type:this.active}})
        },
        dosearch1(){
            console.log(this.keyword)
            this.page = 1
            this.search(this.keyword,(this.page-1)*20,this.type)
        }
    }
}
</script>

<style lang="stylus" scoped>
.search{
    width:900px;
    margin:0 auto;
    background-color:#fff;
    .srch{
        // width:800px;
        height:80px;
        margin:0 auto;
        padding:20px 80px;
        input{
            width:200px;
            height:30px;

        }
    }

    .tabs{
        ul{
            width:800px;
            margin:5px auto;

            display:flex;
            background-image: linear-gradient(45deg, #61ec1f, transparent);
            li{
                width:200px;
                list-style-type:none;
                // border:1px solid #3d3d3d;
                text-align: center;
                height:40px;
                line-height:40px;
                font-size:16px;
                font-family: "STCaiyun";
                color: darkviolet;
            }


        
        }


    }





}
</style>