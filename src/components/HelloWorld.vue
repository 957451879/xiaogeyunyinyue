<template>
  <div class="hello">
            <div class="picture">
                <h2 style="color: white;">heilan</h2>
                <h2 style="color: white;">海澜电力交易系统</h2>
                <!-- <img src="src=http___pic.vjshi.com_2017-04-10_f653f1d322ffb0ca694bc4d301c7e411_00001.jpg_x-oss-process=style_watermark&refer=http___pic.vjshi.jpg" alt="" width="400px" height="500px"> -->
            </div>
            <div class="login">
             <form action="">
               <h1>欢迎登陆！</h1>
               <br>
              <p>用户或手机号</p>
              <input type="text" placeholder="请输入用户名或手机号" v-model="ruleForm.phone" class="in">
              <br>
              <br>
              <p>密码</p>
              <input type="text" placeholder="请输入密码" v-model="ruleForm.password" class="in">
               <br><br>
               <input type="checkbox" id="check1"><span>保持登录</span>
               <br>  <br>
               <button type="submit" style="display:block;margin:0 auto">登录</button>
             </form>
            </div>
           </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
   return {
     ruleForm:{
       phone:'',
       passsword:''

     },
     rule:{
       phone: [{ required: true, message: '手机号都没有！', trigger: 'blur' }],
        password: [{ required: true, message: '密码呢！', trigger: 'blur' }]
     },
     loginLoading: false,
      parallax: 'depth'
   } 
  },
  methods:{
    login(ruleForm){
      this.loginLoading = false;
      let {phone,password} = ruleForm;
      this.$api.login(phone,password).then(res=>{
        console.log(res);

        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
  
}

.hello{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
.picture{
  width: 400px;
  height: 500px;
  background:000;
  border-radius: 10px;
  box-shadow: 10px 10px 5px #888888;
  padding-left: 20px;
  background-image: url(../assets/1.jpg);
  background-size:100% 100%;
  text-align: left;
}
.login{
  padding: 20px;
  width: 300px;
  height: 300px;
  background: white;
  position: relative;
  left: -150px;
  border-radius: 10px;
  text-align:left;
  box-shadow:10px 10px 5px #888888
}
button{
  width: 150px;
  height: 40px;
  background-color: cornflowerblue;
  border-radius: 5px;
  font: bold 20px arial,microsoft yahei;
  color: aliceblue;
  /* font-family:'SimHei';
  font-weight: 100px; */
}
h1{
    color: blue;
}
.in{
    width: 200px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid gray;
    padding-left: 5px;
}
</style>
