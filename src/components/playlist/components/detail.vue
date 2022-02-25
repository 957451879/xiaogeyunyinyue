<template>
  <div class="playlist-detail-container">
      <div class="left">
          <div class="top">
              <div class="avatar">
                  <!-- <loading v-if="loading"/> -->
                  <img :src="playlist.coverImgUrl+'?param=208y208'"/>
              </div>
              <div class="info">
                  <div class="title">
                      <h2>{{playlist.name}}</h2>
                  </div>
                  
                <div class="creator">
                  <!-- <loading v-if="loading"/> -->
                    <img :src="creator.avatarUrl+'?param=40y40'" alt="">
                    <span>{{creator.nickname}}</span>
                    <span>{{new Date(playlist.createTime).getFullYear()+'-'+(new Date(playlist.createTime).getMonth()+1)+'-'+new Date(playlist.createTime).getDate()}} 创建</span>  
                </div>
                <div class="song-feature">
                    <el-button type="primary" size="mini">播放</el-button>
                    <el-button type="primary" size="mini">+</el-button>
                    <el-button type="primary" size="mini">收藏夹</el-button>
                    <el-button type="primary" size="mini">转发</el-button>
                    <el-button type="primary" size="mini">下载</el-button>
                    <el-button type="primary" size="mini">评论</el-button>
                </div>
                <div>
                
                  <span>标签:</span>
                  <el-button round v-for="item in playlist.tags" :key="item" size="mini" @click="toplaylist(item)">{{item}}</el-button>
                </div>
                
                <div class="description ">
                  
                  <p :class="{closeP:isActive}" >描述:{{playlist.description}}</p> 
                  
                  <span v-if="despLength>7" @click="changeDsp" :class="{showCtl:!isActive}" >展开<i class="el-icon-arrow-down" /></span>
                  <span v-if="despLength>7" @click="changeDsp" :class="{showCtl:isActive}">收起<i class="el-icon-arrow-up" /></span>
                </div>
                
                

              </div>
            
          </div>
          <div class="content">
              <table>
                  <tr>
                      <th width="5%"></th>
                      <th width="5%"></th>
                      <th width="30%">歌曲标题</th>
                      <th width="20%">时长</th>
                      <th width="20%">歌手</th>
                      <th width="20%">专辑</th>
                  </tr>
                  <template v-for="(item,index) in tracks">
                      <tr :key="item.id">
                          <td width="10%">{{index+1}}</td>
                          <td width="10%"><i class="el-icon-video-play block-i"></i></td>
                          <td width="30%">
                              <router-link :to="{name:'song',query:{id:item.id}}">{{item.name}}</router-link>
                              </td>
                          <td width="10%" @mouseenter="changeTF" @mouseleave="changeTF">
                              <span>
                                  {{Math.floor(item.dt/1000/60)+':'+(String(Math.round(item.dt/1000%60)).length==2?Math.round(item.dt/1000%60):'0'+Math.round(item.dt/1000%60))}}
                              </span>
                              
                              <span>
                                  <i class="el-icon-plus"></i>
                                  <i class="el-icon-folder-add"></i>
                                  <i class="el-icon-share"></i>
                                  <i class="el-icon-download"></i>
                              </span>

                          </td>
                          <td width="20%">
                              <span v-for="i in item.ar" :key="i.id">
                                  <router-link :to="{name:'singer',query:{id:i.id}}">
                                      {{i.name}}
                                    </router-link>                              
                              </span>
                              
                            </td>
                          <td width="20%">{{item.al.name}}</td>
                      </tr>
                  </template>
              </table>
          </div>
          <div class="comment">
              
          </div>
      </div>
      <div class="right">喜欢|热门</div>
      <comment :mold="mold"></comment>
  </div>
</template>

<script>
import Comment from "@/components/comment/comment.vue"
export default {
    data(){
        return {
            playlist:{},
            loading:true,
            creator:{},
            tracks:[],
            isActive:true,
            despscriptionArr:[],
            tf:true,
            mold:'playlist',
        }
    },
    components:{
        Comment
    },
    created(){
        let id = this.$route.query.id
        this.getPlaylistDetail(id,8)
        
    },
    mounted(){
        
        
    },
    computed:{
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
        async getPlaylistDetail(id,s){
            let timestamp = new Date().valueOf()
            try {
                let res = await this.$api.getPlayListDetail(id,s,timestamp)
                if(res.code == 200){
                    this.playlist = res.playlist
                    this.creator = res.playlist.creator
                    this.tracks = res.playlist.tracks
                    this.despscriptionArr = res.playlist.description.split('\n')
                    this.loading = false
                    // console.log(this.playlist.description.length)
                }
            } catch (err) {
                console.log(err)
            }
        },
        toplaylist(cat){
            this.$router.push({name:'playlists',query:{
                cat:cat
            }})
        },
        changeDsp(){
            this.isActive = !this.isActive
        },
        changeTF(){
            this.tf = !this.tf
        }
    }
}
</script>

<style lang="stylus" scoped>

.playlist-detail-container{
    width:700px;
    margin:0 auto;
    padding:5px 40px;
    border-left:1px solid #d3d3d3;
    border-right:1px solid #d3d3d3;
    background-color: #fff;
    .top{
        display: flex;
        

        .avatar{
            width:213px;
            height:213px;
            border:1px solid grey;
            margin:5px;
            padding:2px;
            img{
                margin:2px;
            }
        }
        .info{
            margin:5px 0 5px 20px;
            font-size:12px;
            .creator{
                height:40px;
                margin-bottom: 10px;
                
                span{
                    
                    line-height: 40px;
                    verticle-align:middle;
                    display:inline-block;
                    height:40px;
                }
            }
            .showCtl{
                display:none;
            }
        }
    }
    .left{
        width:700px;
        .content{
            width:700px;
        }
    }
    

}

table {
    width:700px;
    table-layout:fixed;
    word-break:break-all;
  th{
      text-align: left;
  }
  th
  td{
    height:30px;
    line-height: 30px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }  
  th:nth-child(n+3)
  td:nth-child(n+3){
      padding:3px 10px;
  }
  .timefunction{
      display:none;
  }
  span:nth-child(2){
      
      display:none;
  }
  tr:hover{
     td:nth-child(4){
  
      span:first-child{
      display: none;
    }
      span:nth-child(2){
          display:block;
      }
  } 
  }
  
}
.info .description{
    
    width:450px;
    
    p{
        width:450px;
        
        white-space:pre-wrap;
        
    }
    .closeP{
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 7;
    }
    span{
        text-align: right;
    }
    
}

</style>