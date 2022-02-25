<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld
  
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width:100%;
  /* height:100%; */
  background: #f5f5f5;
}
*{
  margin:0;
  padding: 0;
}
html,body{
  height:100%;
  
}
</style>
