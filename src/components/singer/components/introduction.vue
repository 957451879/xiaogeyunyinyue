<template>
  <div class="introduction">
      <ul>
        <li>
            <h2>介绍</h2>
            <p>{{briefDesc}}</p>
        </li>
        <li v-for="item in introduction" :key="item.ti">
            <h2>{{item.ti}}</h2>
            <!-- <p v-for="(item2,index2) in item.txt.split('\n')" :key="index2">{{item2}}</p> -->
            <p>{{item.txt}}</p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {

data(){
    return{
        introduction:[],
        briefDesc:'',
        
    }
},
created(){
    let id = this.$route.query.id
    this.getArtistDesc(id)
},
methods:{
    async getArtistDesc(id){
        
        try {
            let res = await this.$api.getArtistDesc(id)
            // console.log("res",res)
            if(res.code ==200){
                this.introduction = res.introduction
                this.briefDesc = res.briefDesc
            }
        } catch (error) {
            console.log(error)
        }
    },
}
}
</script>

<style>
.introduction{
    width:630px;
}
.introduction ul{
    list-style-type: none;
}
.introduction h2{
    font-size: 14px;
    margin-top:20px;
    margin-bottom:15px;
}
.introduction p{
    font-size: 12px;
    white-space:pre-wrap;
}
</style>