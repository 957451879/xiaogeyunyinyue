<template>
  <div class="recommendsingerlist">
     <!-- <ul>
         <li v-for="item of singers" :key="item.id">
            <img :src="item.picUrl" alt="item.name" width='200px' height='200px'>
         </li>
     </ul> -->
        <h1>热门歌手</h1>
      <div v-for="item of singers" :key="item.id" class="recommendsingers" @click="toSinger(item.id)">
          
          <img :src="item.picUrl" alt="item.name" loading="lazy" width='88px' height='88px'>
          <h5>{{item.name}}</h5>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            singers:[],
            
        }
    },
    
    created(){
        
    },
    methods:{
         async getHotsinger(){
            try {
                let res = await this.$api.getHotSinger(28)
                
            if(res.code === 200){

                this.singers = res.artists
                
            }
            }
             catch (error) {
                console.log(error)
            }
            
    },
    toSinger(id){
        console.log("跳转")
        this.$router.push({
            name:'singer',
            query:{
                id:id
            }
        })
    }
    
    
},
    
    mounted(){
        this.getHotsinger()
    }
}
</script>

<style lang="stylus">
*{
    margin:0;
    padding:0;
    /* list-style-type: none; */
   
}
.recommendsingerlist{
    width:700px;
    
    margin:0 auto;
    &::after{
        content:'';
        display: block; 
        height: 0; 
        clear: both; 
        visibility: hidden;  
    }
    
}
.recommendsingers{
    float:left;
    margin:6px;
    width:88px;
    height:130px;
    
}
h1{
    text-align:left
}
.recommendsingers img{
    border-radius: 50%;
}
.recommendsingers h5{
    text-align:center;
}
</style>