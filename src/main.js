import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import getApi from './api/index'
import loading from './components/transition/loading.vue'


// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
import {
  Carousel,
  CarouselItem,
  RadioGroup,
  Radio,
  RadioButton,
  Tabs,
  TabPane,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Button,
  Image,
  Icon,
  InfiniteScroll,
  Pagination,
  MessageBox,
  Message,
  Notification,
  Table,
  TableColumn,
  Popover,
  Tooltip,
  Slider,
  Loading
} from 'element-ui'
// import { use } from 'vue/types/umd'
Vue.use(Carousel)
  .use(CarouselItem)
  .use(RadioGroup)
  .use(Radio)
  .use(RadioButton)
  .use(Tabs)
  .use(TabPane)
  .use(Avatar)
  .use(Image)
  .use(Icon)
  .use(Pagination)
  .use(InfiniteScroll)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Button)
  .use(Table)
  .use(TableColumn)
  .use(Popover)
  .use(Tooltip)
  .use(Slider)
  .use(Loading)
Vue.config.productionTip = false
Vue.prototype.$api = getApi
// Vue.prototype.utils = utils
// Vue.use(VueAwesomeSwiper)
// Vue.use(infiniteScroll)

Vue.config.devtools = true
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
// Vue.component('niceLoading', niceLoading)
// Vue.component('niceEmpty', niceEmpty)
// button阻止重复点击
Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})

Vue.component("Loading", loading)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
