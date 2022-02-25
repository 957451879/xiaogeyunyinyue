<template>
  <div class="login">
      <div class="login-container">
          <span>
                账号
            </span>
            <el-input placeholder="请输入账号" type="text" v-model="phone">

            </el-input>
            <span>
                密码
            </span>
            <el-input placeholder="请输入密码" type="password" v-model="password">
                
            </el-input>
            <el-button @click="doLogin">
                登录
            </el-button>
            <el-button @click="cancel">
                取消
            </el-button>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    data(){
        return {
           phone:"", 
           password:""
        }
    },
    created(){

    },
    mounted(){

    },
    computed:{
        ...mapGetters([
            'loginStatu',
            'userInfo'
        ])
    },
    watch:{

    },
    methods:{
        doLogin(){
            console.log(this.phone,this.password)
            console.log(this.loginStatu)
            // console.log(this.userInfo)
            this.setUserInfo({name:"李晓",avatarUrl:"http://p1.music.126.net/2sXz1IajNh4ynE4OkKBSSg==/109951163514186192.jpg"})
            this.setLoginStatus(true)
            // console.log(this.loginStatu)
            // console.log(this.userInfo)
            this.$router.go(-1)
            // this.$api.login(this.phone,this.password).then(res=>{
            //     if(res.code == 200){
            //         console.log(res.profile)
            //         window.localStorage.setItem("token",res.token)
            //         window.localStorage.setItem("cookie",res.cookie)
            //         this.setLoginStatus(true)
            //         this.getUserInfo(res.profile.userId)
            //     }else{
            //         this.$message({
            //             message:"密码错误",
            //             type:"error"
            //         })
            //     }
                
            // })
        },
        cancel(){
            this.$router.go(-1)
        },
        getUserInfo(uid){
            try {
                this.$api.getUserDetail(uid).then(res=>{
                    if(res.code==200){
                        let userInfo = res.profile
                        userInfo.level = res.level
                        userInfo.listenSongs = res.listenSongs
                        userInfo.createTime = res.createTime
                        userInfo.createDays = res.createDays
                        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                        this.setUserInfo(res.profile)

                    }
                }) 
            } catch (error) {
                console.log(error)
            }
            
        },
        ...mapActions([
            'setLoginStatus',
            'setUserInfo'
        ])
    }
}
</script>

<style lang="stylus">
    .login{
        width:600px;
        height:600px;
        position:fixed;
        z-index:1000;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        display:flex;
        justify-content: center;
        
        
        .login-container{
            width:500px;
            height:500px;
            background-color #fff;
            
            
        }
    }
    
</style>