<template>
  <div class="album-container">
      <div class="album">
          <div v-for="(item,index) in albums" :key="index" class="album-content">
              <!-- <loading v-if="loading" style="width:120px;height:120px;"/> -->
              <img :src="item.picUrl+'?param=120y120'" loading="lazy" :alt="item.name">
              <router-link :to="{name:'album',query:{id:item.id}}"></router-link>
              <p>{{item.name}}</p>
          </div>
      </div>
      <div>
          <!-- <el-pagination :total="" :current-page="" :page-size="" @current-change="" layout=""></el-pagination> -->
          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="page"
            :page-size="limit"
            @current-change="changepage"
            >
          </el-pagination> -->
      </div>
  </div>
</template>

<script>
export default {

props:['albums'],

mounted(){
    console.log(this.albums)
}
}
</script>

<style>
.album{
    display:flex;
    width:660px;
    flex-wrap:wrap;
    flex-grow:1;
}
.album-content{
    width:145px;
    margin-left:15px;
    margin-bottom:15px;
    position: relative;
}
.album-content a{
    width:145px;
    height:120px;
    position:absolute;
    left:0;
    top:0;
    background:url('https://s2.music.126.net/style/web2/img/coverall.png?8a8f8c0c02d3d02e74b78b513cdb6bd3') no-repeat;
    background-position: -170px -850px;;
}
</style>