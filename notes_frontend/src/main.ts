import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// PUBLIC_INTERFACE
// App bootstrap: creates and mounts Vue app with Pinia + Router.
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
