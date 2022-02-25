<template>
  <div class="singers-container">
    <div>
            <el-radio-group v-model="radio.type" @change="radioChange">
                <el-radio :label="-1">全部</el-radio>
                <el-radio :label="1">男歌手</el-radio>
                <el-radio :label="2">女歌手</el-radio>
                <el-radio :label="3">乐队</el-radio>
            </el-radio-group>
    </div>
    <div>
            <el-radio-group v-model="radio.area" @change="radioChange">
                <el-radio :label="-1">全部</el-radio>
                <el-radio :label="7">华语</el-radio>
                <el-radio :label="96">欧美</el-radio>
                <el-radio :label="8">日本</el-radio>
                <el-radio :label="16">韩国</el-radio>
                <el-radio :label="0">其他</el-radio>
            </el-radio-group>
    </div>
    <div>
            <el-radio-group v-model="radio.initial" @change="radioChange">
                <el-radio :label="-1">热门</el-radio>
                <el-radio v-for="item in initial" :label="item" :key="item">{{item.toUpperCase()}}</el-radio>
                <el-radio :label="0">其他</el-radio>
            </el-radio-group>
    </div>
    <div class="singers-content">
        <div v-for="item in artists" :key="item.id" class="singers">
            
            <router-link :to="{name:'singer',query:{id:item.id}}" >
                <img :src="item.picUrl+'?param=88y88'" loading="lazy" alt="">
                <p>{{item.name}}</p>
            </router-link>
            
        </div>
    </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        initial:[...Array(26).keys()].map(i => String.fromCharCode(i + 97)),
        radio:{
        type:-1,
        area:-1,
        initial:-1,
        limit:70,
        offset:0,
        },
        artists:[],
        page:1,
    }
},
created(){
    this.getSingerList(this.radio)
},
methods:{
    async getSingerList(params){
        try {
            let res = await this.$api.getSingerList(params)
            if(res.code == 200){
                this.artists = res.artists
            }
        } catch (err) {
            console.log(err)
        }
    },
    radioChange(){
        this.getSingerList(this.radio)
    }
}
}
</script>

<style>
.singers-container{
    width:700px;
    margin:0px auto;
    padding:0 20px;
    background-color:#fff;
    border-left:1px solid #d3d3d3;
    border-right:1px solid #d3d3d3;
}
.singers-content{
    width:700px;
    display: flex;
    flex-wrap: wrap;
}
.singers{
    width:88px;
    margin:6px;
    font-size:14px;
}
.singers img{
    border-radius: 50%;
}
.singers p{
    text-align: center;
}
.el-radio__input{
    display:none;
}
.el-radio__label{
    padding-left:0;
}
.el-radio{
    margin-right:15px;
}
</style>