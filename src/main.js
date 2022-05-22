import { createApp } from 'vue'
import App from './App.vue'
import BaseSpinner from '../src/components/BaseSpinner.vue'
import BaseDialog from '../src/components/BaseDialog.vue'
import './index.css'
import router from './router'
import store from './store/index.js'
const app = createApp(App)

app.use(store)
app.use(router)
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.mount('#app')
