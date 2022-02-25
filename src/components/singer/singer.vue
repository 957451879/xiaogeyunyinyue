<template>
  <div class="singer">
      <div>
          <h2>{{name}}</h2>
          <i v-if="loading" class="el-icon-loading"></i>
          <img v-else :src="artistDetal.artist.cover+'?param=640y300'" :alt="name" >
      </div>
      <div>
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="热门作品" name="first">
                <hotsongs/>
            </el-tab-pane>
            <el-tab-pane label="所有专辑" name="second">
                <album/>
            </el-tab-pane>
            <el-tab-pane label="相关MV" name="third">
                <mv/>
            </el-tab-pane>
            <el-tab-pane label="艺人介绍" name="fourth">
                <introduction/>
            </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import introduction from '@/components/singer/components/introduction.vue'
import hotsongs from '@/components/singer/components/hotsongs.vue'
import album from '@/components/singer/components/album.vue'
import mv from '@/components/singer/components/mv.vue'
export default {
data(){
    return{
        
        introduction:[],
        artistDetal:{},
        activeName:'first',
        loading:true,
        name:'',
    }
},
components:{
    introduction,
    hotsongs,
    album,
    mv,
},
created(){
    let id = this.$route.query.id
    
    this.getArtistDetail(id)
},
methods:{
    
    async getArtistDetail(id){
        try {
            let res = await this.$api.getArtistDetail(id)
            if(res.code ==200){
                this.loading = false
                this.artistDetal = res.data
                this.name = res.data.artist.name
            }
        } catch (error) {
            console.log(error)
        }
    },
    
}
}
</script>

<style>
.singer{
    margin:5px auto !important;
    width:660px;
}
.singer .el-tabs{
    width:640px;
}
</style>