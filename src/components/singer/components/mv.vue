<template>
  <div class="mv-container">
      <div v-for="item in mv" :key="item.id" class="mv">
          <img :src="item.imgurl16v9+'?param=140y120'" alt="">
          <p>{{item.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            mv:[],

        }
    },
    created(){
        let id = this.$route.query.id
        this.getArtistMv(id)
    },
    methods:{
        async getArtistMv(id){
            try {
                let res = await this.$api.getArtistMv(id)
                if(res.code == 200){
                    this.mv = res.mvs
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>
.mv-container{
    width:640px;
    display:flex;
    flex-wrap: wrap;
}
.mv{
    width:140px;
    margin:10px 10px;

}
.mv p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>