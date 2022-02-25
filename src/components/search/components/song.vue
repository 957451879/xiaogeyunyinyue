<template>
  <div class="songList">      
      <table>
          <tr v-for="item in songs" :key="item.id">
              <td width="350px">
                  
                  <span class="songaction">
                        <i class="el-icon-plus" @click="add(item)"></i>
                        <i class="el-icon-folder-add"></i>
                        <i class="el-icon-share"></i>
                        <i class="el-icon-download"></i>
                  </span>
                  <span class="songname">
                    <router-link :to="{name:'song',query:{id:item.id}}">
                        {{item.name}}
                    </router-link>
                    
                  </span>
              </td>
              <td width="200px">
                  <span>{{item.artists[0]?item.artists[0].name:''}}</span>
              </td>
              <td width="200px"><span>{{item.album?item.album.name:''}}</span></td>
              <td width="50px">{{'0'+Math.floor(item.duration/1000/60)+':'+(String(Math.round(item.duration/1000%60)).length==2?Math.round(item.duration/1000%60):'0'+Math.round(item.duration/1000%60))}}</td>
          </tr>
      </table>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    data(){
        return {
            
            
        }
    },
    props:['songs'],
    created(){
        // console.log(this.songs)
    },
    computed:{
        ...mapGetters([
            'playList',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
        ]),
        
    },
    methods:{
        ...mapActions([
            'addSong'
        ]),
        add(i){
        // console.log(i)
        this.addSong({playList:this.playList,song:i})
        // console.log(this.playList)
    },
    }
}
</script>

<style lang="stylus" >
.songList{
    padding:5px 45px;
    font-size:14px;
    color:#3d3d3d;
    tr{
        height:28px;
    }
    tr:hover{
        .songaction{
            
            visibility: visible;

        }
    }
    td:nth-child(1){
        .songname{
            display:block;
            max-width:280px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
    }
    td:nth-child(2){
        span{
            margin-left:20px;
        }
    }
    td:nth-child(3){
        
        &>span{
            display:block;
            max-width:200px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
    }
    }
}
.songaction{
    float:right;
    visibility:hidden;

}
</style>