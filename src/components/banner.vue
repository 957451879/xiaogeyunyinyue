<template>
  <div class="out">
  <!-- <div class="banner">
      <ul class= "list" v-if="bannersInit">
          <li v-for="item of banners" :key="item.imageUrl" >
              <img  :src="item.imageUrl" alt="item.typeTitle" height="400px" width="1000px">
              </li>
              <li>
                  <img :src="banners[0].imageUrl" alt="banners[0].typeTitle" height="400px" width="1000px"></li>
      </ul>
  </div> -->
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in banners" :key="item.imageUrl">
      <img :src="item.imageUrl" alt="" style="width:800px; height:100%;">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
    name:'Banner',
    data(){
        return {
            banners:[]
        }
    },
    methods:{
        async getBanner(){
            try {
                 let res = await this.$api.getBanner();
                 this.banners = res.banners;
                 
            } catch (error) {
                console.log(error)
            }

            
        }
    },
    computed:{
      bannersInit() {
      return this.banners.length
    }
    },
    created(){
      this.getBanner();
    },
    mounted(){
        
    }
}
</script>

<style>
*{
    /* list-style-type: none; */
    margin:0;
    padding:0;
}
.out{
  width:1000px;
  margin:0 auto;
  text-align: center;
}
 .banner{
     width:1000px;
     height:400px;
     margin:20px auto;
     overflow:hidden;
 }
 .list{
     width:11000px;
     height:400px;
     position:relative;
     animation:  move 20s ease 10s infinite;
    }
    @keyframes move {
      0% {
        transform: translate(0);
      }
      10% {
        transform: translate(-1000px);
      }
      20% {
        transform: translate(-2000px);
      }
      30% {
        transform: translate(-3000px);
      }
      40% {
        transform: translate(-4000px);
      }
      50% {
        transform: translate(-5000px);
      }
      60% {
        transform: translate(-6000px);
      }
      70% {
        transform: translate(-7000px);
      }
      80% {
        transform: translate(-8000px);
      }
      100% {
        transform: translate(-9000px);
      }
      /* 100% {
        transform: translate(-10000px);
      } */
    }


 
 .list li{
     float:left;
 }

</style>