<template>
  <div class="comment">
      <h3 v-if="hotComments.length">热门评论</h3>
      <div >
          <div v-for="item in hotComments" :key="item.commentId" class="item">
              <div class="info">
                  <img v-if="item.user" :src="item.user.avatarUrl+'?param=50y50'" alt="">
              </div>
              <div class="content">
                  <span class="name">{{item.user?item.user.nickname:''}}</span>
                  <p>{{item.content}}</p>
                  <div v-if="item.beReplied">
                      <!-- {{item.beReplied[0].user?(item.beReplied[0].user.nickname+':'+item.beReplied[0].content):''}} -->
                  </div>
                  <span class="date">{{getDate(item.time)}}</span>
                  <span style="float:right;">
                  <i v-if="item.liked" class="el-icon-message-solid"></i>
                  <i v-else class="el-icon-bell"></i>
                  <span v-if="item.likedCount!='0'">({{item.likedCount>1000?(item.likedCount/1000).toFixed(1)+'k':item.likedCount}})</span>
                  <a href="javascript:;" style="margin-left:10px;">回复</a>
                  </span>
              </div>
          </div>
      </div>
      <h3>最新评论</h3>
      <div >
          <div v-for="item in comments" :key="item.commentId" class="item">
              <div class="info">
                  <img v-if="item.user" :src="item.user.avatarUrl+'?param=50y50'" alt="">
              </div>
              <div class="content">
                  <span class="name">{{item.user?item.user.nickname:''}}</span>
                  <p>{{item.content}}</p>
                  <div v-if="item.beReplied">
                      <!-- {{item.beReplied[0].user?(item.beReplied[0].user.nickname+':'+item.beReplied[0].content):''}} -->
                  </div>
                  <span class="date">{{getDate(item.time)}}</span>
                  <span style="float:right;">
                  <i v-if="item.liked" class="el-icon-message-solid"></i>
                  <i v-else class="el-icon-bell"></i>
                  <span v-if="item.likedCount!='0'">({{item.likedCount>1000?(item.likedCount/1000).toFixed(1)+'k':item.likedCount}})</span>
                  <a href="javascript:;" style="margin-left:10px;">回复</a>
                  </span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import utils from '@/utils/utils.js'
export default {
 name:'comment',
 props:{
     mold:String,
     
 },   
 data(){
     return {
        hotComments:[],
        comments:[],
     }
 },
 created(){
    let id = this.$route.query.id
    this.getSongComment(this.mold,{id:id})
 },
 computed:{
     getDate(){
         return function(time){
            return utils.getFullDate(time)
            //  let date = new Date(time)
            //  return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'
         }
     }
 },
 methods:{
     async getSongComment(mold,params){
         try {
             let res = await this.$api.getComment(mold,params)
             if(res.code == 200){
                 this.hotComments = res.hotComments
                 this.comments = res.comments
             }
         } catch (err) {
             console.log(err)
         }
     },
     getFullDate(time){
         utils.getFullDate(time)
     }
 }
}
</script>

<style lang="stylus" scoped>
.comment{
    width:700px;
    padding:25px;
    .item{
        padding:10px 5px;
        font-size: 14px;
        .info{
            float:left;
            width:60px;
            height:60px;
            
        }

        .content{
            margin-left:60px;


            .name{
                color:#0c73c2;
            }
            p{
                padding:5px;
            }
            .date{
                color:#6b6b6b;
            }
        } 
    }
    


}
</style>