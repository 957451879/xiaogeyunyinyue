<template>
  <div class="player">
        <div class="bg">

        </div>
        <div class="progress">

        </div>
        <span class="pointer">

        </span>
            
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.player{
    width:300px;
    height:8px;
    margin:10px 5px;
    position:relative;
    .bg{
        width:100%;
        height:100%;
        position: absolute;
        top:0;

        background-color: grey;
        border-radius:4px;
    }
    .progress{
        position: absolute;
        background-color: red;
        border-radius:4px;
        height:100%;
        width:50%;
        top:0;
        left:0;
    }
    .pointer{
        position: absolute;
        display: block;
        width:12px;
        height:12px;
        background-color: black;
        top:-2px;
        left:calc(-6px+50%)
        border-radius:6px;
    }

}
</style>