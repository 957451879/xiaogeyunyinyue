<template>
  <div class="ranklist">
    <div class="list-head">
          <span style="float: left;">榜单</span>
          <span style="float: right;">
              <router-link :to="{name:'toplist',query:{id:19723756}}">更多</router-link>
              <i class="el-icon-right"></i>
          </span>
    </div>
    <loading v-if="loading"/>
    <div v-else class="list-content">
      <list-item :listId="rankList[0].id"></list-item>
      <list-item :listId="rankList[1].id"></list-item>
      <list-item :listId="rankList[2].id"></list-item>
    </div>
      
  </div>


</template>

<script>
import listItem from './listItem.vue'
import loading from '@/components/transition/loading.vue'
export default {
  components: { listItem ,loading},
    data(){
        return{
            rankList:[],
            loading:true,
        }
    },
    
    created(){
        this.getToplist()
    },
    methods:{
        async getToplist(){
            try {
                let res = await this.$api.getToplist()
                if(res.code == 200){
                    this.loading = false
                    this.rankList = res.list
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    }
}
</script>

<style>
.ranklist{
    width:800px;
    margin:0 auto;
    border-left:1px solid #d3d3d3;
    border-right:1px solid #d3d3d3;
    background-color:#fff;
}
.list-head{
    border-bottom:2px solid #C10D0C;
    background-image: linear-gradient(white,grey);
}
.list-head::after{
    clear:both;content:'';display:block;width:0;height:0;visibility:hidden;
}
.list-content{
    display:flex;
    margin:0 56px;
}
</style>