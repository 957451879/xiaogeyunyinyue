
import login from '@/view/login/login.vue'
export const loginRouter = [
    {
        path:'/login',
        name:'login',
        meta:{
            title:'登录',
            isLogin:true
        },
        component:login
},
{
    path:'/recommendsinger',
    name:'recommendsinger',
    component:resolve => {
        require(['../components/recommendsinger'], resolve)
      }
},
{
    path:'/recommendsongs',
    name:'recommendsongs',
    component:resolve => {
        require(['../components/recommendsongs'], resolve)
      }
}
]
export const appRouter = 
    {
        path:'/banner',
        name:'banner',
        component:resolve => {
            require(['../components/banner'], resolve)
          }
    }


export const routes = [loginRouter,appRouter]