import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld'
// import { routes } from '@/router/routes'
Vue.use(Router)

const router = new Router({
  routes: [
    {
        path:'/login',
        name:'login',
        meta:{
            title:'登录',
            isLogin:true
        },
        component:resolve => {
          require(['../view/login/login'], resolve)
        },
    },
    {
      path: '/',
      name: 'begin',
      component:resolve => {
        require(['../components/begin'], resolve)
      },
      redirect: {
        name: 'home'
      },
      children: [
        {
          path:'/home',
          name:'home',
          component:resolve => {
            require(['../components/home'], resolve)
          }
        },
        {
          path:'/singer',
          name:'singer',
          component:resolve => {
            require(['@/components/singer/singer.vue'], resolve)
          }
        },
        {
          path: '/singers',
          name: 'singers',
          component:resolve => {
            require(['@/components/singers.vue'], resolve)
          }
        },
        {
          path: '/playlists',
          name: 'playlists',
          component:resolve => {
            require(['@/components/playlist/playlist.vue'], resolve)
          }
        },
        {
          path: '/playlistDetail',
          name: 'playlistDetail',
          component:resolve => {
            require(['@/components/playlist/components/detail.vue'], resolve)
          }
        },
        {
          path: '/toplist',
          name: 'toplist',
          component:resolve => {
            require(['@/components/toplist/toplist.vue'], resolve)
          }
        },
        {
          path: '/song',
          name: 'song',
          component:resolve => {
            require(['@/components/song/song.vue'], resolve)
          }
        },
        {
          path: '/album',
          name: 'album',
          component:resolve => {
            require(['@/components/album/album.vue'], resolve)
          }
        },
        {
          path: '/search',
          name: 'search',
          component:resolve => {
            require(['@/components/search/search.vue'], resolve)
          }
        }
      ]
      },
    
    ],
// routes,
scrollBehavior() {
    return { x: 0, y: 0 }
  }
    
})
export default router