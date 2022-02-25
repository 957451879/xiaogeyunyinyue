<template>
  <div class="begin">
      <div class="nav">        
        <ul class="postion">
          <li :class="{chosenLi:routeName == 'home'}"><router-link :to="{name:'home'}">发现</router-link></li>
          <li :class="{chosenLi:routeName == 'toplist'}"><router-link :to="{name:'toplist',query:{id:19723756}}">排行榜</router-link></li>
          <li :class="{chosenLi:routeName == 'singers'}"><router-link :to="{name:'singers'}">歌手</router-link></li>
          <li :class="{chosenLi:routeName == 'playlists'}"><router-link :to="{name:'playlists'}">歌单</router-link></li>
          <li>MV</li>
        </ul>
        <div class="search postion">
          <input type="text" v-model="keyword">
          <i class="el-icon-search" @click="dosearch"></i>
        </div>
        <div class="postion avatar">
          <el-button v-if="loginStatu!=true" @click="login">登录</el-button>
          <template v-else >
            <el-dropdown>
              <el-avatar :size="35" :src="userInfo.avatarUrl" @click="info"></el-avatar>
              <el-dropdown-menu  slot="dropdown">
                <el-dropdown-item>
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item @click="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          
        </div>     
      </div>
    <div class="content"> 
    <!-- <hello-world/> -->
    <router-view></router-view>

    </div>
    <div class="footer">
      <p>打</p>
      <p>的撒</p>
      <p>的撒aa</p>
      <p>的阿达</p>
      <p>打</p>
    </div>
    <div class="toTop" @click="toTop"></div>
    <playbar></playbar>
    
  </div>
</template>

<script>
import playbar from '@/components/playBar/playBar.vue'

import {mapGetters,mapActions} from 'vuex'
export default {
  // name:'playbar',
  components:{
    playbar,

  },
  data(){
    return {
      routeName:this.$route.name,
      keyword:'',
      circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      
      loginS:false
    }
  },
  computed:{
    myroute(){
      return this.$route.name
    },
    ...mapGetters([
      "loginStatu",
      "userInfo"
    ])
  },
  watch: {
    '$route'() {
    //当参数改变时就会触发比方法，以此达到数据属性
     this.routeName = this.$route.name;
     
      
    }
  },
  created(){
    console.log(this.loginStatu)
  },
  methods:{
    ...mapActions([
            'setLoginStatus',
            'setUserInfo'
        ]),
    routeChange(name){
      this.routeName = name
    },
    toTop(){
      window.scrollTo({top:0,behavior: "smooth" })
    },
    dosearch(){
            if(this.keyword){
              this.$router.push({name:'search',query:{keyword:this.keyword,type:1}})
              this.keyword = ''
            }
            
    },
    login(){
      this.$router.push({name:"login"});
    },

    info(){

    },
    logout(){
      window.localStorage.removeItem('cookie')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userInfo')
      this.setLoginStatus(false)
      this.setUserInfo(null)
      this.$api.logout().then(res=>{
        // console.log("已退出！")
        if(res.code == 200){
          this.$message({
          message:"已退出！"
          })
        }
        
      })
    }
  }
}
</script>

<style lang="stylus">
.begin{
  position:relative;
  left:0;
  top:0;
  .nav ul li{
    float:left;
    width:100px;
    height: 40px;
    
    color: aliceblue;
    line-height: 40px;
  }
  .nav{
    /* margin:5px auto; */
    height: 40px;
    width:100%;
    background-color: #242424;
    display:flex;
    /* align-content: center; */
    justify-content: center;
    .search{

    }
    .avatar{
      margin-left:15px;
    }
  }
  
  .postion{
    display:inline-block;
    height:100%;
    vertical-align: top;
    line-height:40px;
    color:aliceblue;
    list-style-type: none;
    .chosenLi{
      background-image: linear-gradient(#ff0404,#1c0101,#ff0404)
    }
    li{
      text-align: center;
      
    }
  } 
  a{
    color:#000;
    text-decoration:none;
  }
  .postion a{
    color:white;
    text-decoration:none;
  }
  .footer{
    // width:800px;
    padding-bottom:60px;
    // margin:0 auto;
    background-color:#fff;
    border-top:1px solid #d3d3d3;
    
  }
  .toTop{
    width:50px;
    height:50px;
    background-color: red;
    position:fixed;
    right:20px;
    bottom:75px;
  }
}
</style>