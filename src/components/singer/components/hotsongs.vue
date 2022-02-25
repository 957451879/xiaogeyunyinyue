<template>
  <div>
      <div>
          <button>播放</button>
          <button>添加到播放列表</button>
          <button>收藏</button>
      </div>
      <div>
          <table>
              <template v-for="(item,index) in hotsongs" >
                <tr :key="index">
                    <td width="25px">                       
                        <div>
                            <span></span>
                            {{index+1}}
                        </div>
                    </td>
                    <td>
                        <router-link :to="{name:'song',query:{id:item.id}}">{{item.name}}</router-link>
                    </td>
                    <td>{{Math.floor(item.dt/1000/60)+':'+Math.round(item.dt/1000%60)}}</td>
                    <td>
                        <router-link :to="{name:'album',query:{id:item.al.id}}">
                            {{item.al.name}}
                        </router-link>
                    </td>
                </tr>
              </template>
            </table>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            hotsongs:[]
        }
    },
    created(){
        let id = this.$route.query.id
        this.getHotsongs(id)
    },
    methods:{
        async getHotsongs(singerId){
            try {
                let res = await this.$api.getArtists(singerId)
                if(res.code ==200){
                    this.hotsongs = res.hotSongs
                }
            } catch (error) {
                console(error)
            }
        }
    }
}
</script>

<style>

</style>