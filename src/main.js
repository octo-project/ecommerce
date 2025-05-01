import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import vClickAway from './directives/v-click-away'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const queryClient = new QueryClient()

const app = createApp(App)
app.use(VueQueryPlugin, {
    queryClient
})
app.use(pinia)
app.directive("click-away", vClickAway)
app.use(router)
app.mount('#app')
