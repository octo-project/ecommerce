import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import vClickAway from './directives/v-click-away'

const app = createApp(App)
app.directive("click-away", vClickAway)
app.use(router)
app.mount('#app')
