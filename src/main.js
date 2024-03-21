import { defineCustomElementWrapped } from './utils/defineElement'
import App from './App.ce.vue'
import router from './router'

const appComponent = defineCustomElementWrapped(App, {
  plugins: [router]
})
customElements.define('app-component', appComponent)
