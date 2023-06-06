import { createApp } from "vue";

import router from "./router";
import store from "./store";
import { TreeSelect, Tab, Tabs, Swipe, SwipeItem, Toast, RadioGroup, Radio, Stepper, Icon, Notify, Dialog } from "vant";
import { get, post } from "./api/axios.js";
import App from "./App.vue";
import 'vant/lib/index.css'
import FlipDown from 'vue-flip-down';
const app = createApp(App);
app.config.globalProperties.$axios = { get, post };

app
  .use(store)
  .use(router)
  .use(FlipDown)
  .use(TreeSelect)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(Notify)
  .use(Dialog)
  .use(RadioGroup)
  .use(Radio)
  .use(Stepper)
  .use(Icon)
  .mount('#app')
