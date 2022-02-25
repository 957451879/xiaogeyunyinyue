<template>
  <div>
      <div>
        <el-form>
          <el-form-item
          
          ></el-form-item>
              <el-input
              type="text"
              placeholder="输入账号"
              v-model="phone"
              ></el-input>
          <el-form-item>
              <el-input
              type="password"
              placeholder="输入密码"
              v-model="password"
              @keyup.enter.native="Login"
              ></el-input>
          </el-form-item>

          <el-button
          type="primary"
          @click="Login"
          >
            登录
          </el-button>


        </el-form>

      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      phone:'',
      password:'',
    }
  },
  created(){

  },
  methods:{
   async Login(){
      let res = await this.$api.login(this.phone,this.password)
      if(res.code == 200){
        window.localStorage.setItem('cookie', res.cookie)
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('loginStatu', true)
        this.getUserDetail(res.profile.userId)
      }else{
        this.$message.error(res.msg)
      }
    },
    async getUserDetail(uid){
      try {
        let res = await this.$api.getUserDetail(uid)
        if(res.code == 200){
          let userInfo = res.profile
          userInfo.level = res.level
          userInfo.listenSongs = res.listenSongs
          userInfo.createTime = res.createTime
          userInfo.createDays = res.createDays
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          setTimeout(() => {
            this.loginLoading = false
            this.$router.go(-1)
          }, 1500)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>