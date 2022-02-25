<template>
  <div class="album">
      <div class="album-header">
          <div class="avator">
              <img :src="album.blurPicUrl+'?param=177y177'" alt="">
              <span></span>
              
          </div>
          <div class="title">
              <h2>{{album.name}}</h2>
              <p>歌手：{{artist.name}}</p>
              <p>发行时间：{{date(album.publishTime)}}</p>
              <p>发行公司：{{album.company}}</p>
          </div>
      </div>
      <div class="album-introduction">
          <h3>专辑介绍</h3>
          <p v-for="item in despscriptionArr" :key="item">
            {{item}}
          </p>
          <!-- <span v-if="despLength>7" @click="changeDsp" :class="{showCtl:!isActive}" >展开<i class="el-icon-arrow-down" /></span>
          <span v-if="despLength>7" @click="changeDsp" :class="{showCtl:isActive}">收起<i class="el-icon-arrow-up" /></span> -->
      </div>
      <div class="album-songs">
          <div>
              <h2>包含歌曲列表</h2>
              <span>{{album.size}}首歌</span>
          </div>
          <table>
              <thead>
                  <tr>
                      <th></th>
                      <th>歌曲标题</th>
                      <th>时长</th>
                      <th>歌手</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in songs" :key="item.id">
                      <td>{{index+1}}</td>
                      <td>{{item.name}}</td>
                      <td>
                          {{'0'+Math.floor(item.dt/1000/60)+':'+(String(Math.round(item.dt/1000%60)).length==2?Math.round(item.dt/1000%60):'0'+Math.round(item.dt/1000%60))}}
                      </td>
                      <td><span v-for="i in item.ar" :key="i.id">{{i.name}}</span></td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
export default {
data(){
    return {
        album:{},
        songs:[],
        artist:{},
        despscriptionArr:[],
        isActive:true,
    }
},
created(){
    let id = this.$route.query.id
    this.getAlbumData(id)
},
computed:{
    date:function(){
        return function(time){
            return new Date(time).getFullYear()+'-'+(new Date(time).getMonth()+1)+'-'+new Date(time).getDate()
        }
    },
    despLength:function(){
            return this.despscriptionArr.reduce(function(total,num){
                if(num == null){
                return total+1
                }else{
                return total+Math.ceil(num.length/7)
                }
                },0)
    }
},
methods:{
    async getAlbumData(id){
        try {
            let res = await this.$api.getAlbumData(id)
            if(res.code == 200){
                this.album = res.album
                this.songs = res.songs
                this.artist = res.album.artist
                let arr = res.album.description.split('\n')
                console.log(arr)
                this.despscriptionArr = arr.filter(function(item){
                   return  item.length>0
                })
                
            }
        } catch (err) {
            console.log(err)
        }
    }
},

}
</script>

<style lang="stylus" scoped>
.album{
    width:800px;
    margin:0 auto;
    border:1px solid #d3d3d3;
    padding:40px 35px 0 35px;
    background-color: #fff;
    font-size:12px;
    .album-header{
        display:flex;
        .avator{
            position:relative;
            margin-right:50px;
            span{
                width: 209px;
                height: 177px;
                background: url(https://s2.music.126.net/style/web2/img/coverall.png?664eb83a7bf160a11a0a0bc934705778) no-repeat;
                background-position: 0 -986px;
                position:absolute;
                top:0;
                left:0;

            }
        }
    }
    .album-introduction{
        p{
            
            text-indent:2em;
            

        }
        .closeP{
            overflow:hidden;
            text-overflow:ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 7;
        }
    }
    .album-songs{

    }
}
</style>