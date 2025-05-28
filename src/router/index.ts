import { createMemoryHistory, createRouter } from 'vue-router'

import LoginView from '../pages/login.vue'


const routes = [
  { path: '/', component: LoginView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;