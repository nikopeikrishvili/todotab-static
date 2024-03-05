import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueGtag from "vue-gtag";
createApp(App).use(createPinia()).use(VueGtag,{
  config: { id: "G-QCXEBR8N20" }
}).mount('#app')

