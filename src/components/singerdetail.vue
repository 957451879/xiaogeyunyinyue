<template>
  <div class="singerdetail">
      
      <!-- <iframe src="Water3.html" frameborder="0" width="1700px" height="670px"></iframe> -->
      <ul>
        <li v-for="item in introduction" :key="item.ti">
          <h2>{{item.ti}}</h2>
          <p>{{item.txt}}</p>
          <p>{{briefDesc}}</p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      introduction:{},
      briefDesc:""
    }
  },
  methods:{
    async getsingerdetail(id){
        
        try {
          let res = await this.$api.getArtistDesc(id)
        if(res.code==200){
          this.introduction = res.introduction
          this.briefDesc = res.briefDesc
        }
        } catch (error) {
          console.log(error)
        }
      }
  },
  created(){
    let id = this.$route.query.id
    this.getsingerdetail(id)
  },
  mounted(){

  }
}
</script>

<style>
.singerdetail{
  width:800px;
  height: 1000px;
}
</style>