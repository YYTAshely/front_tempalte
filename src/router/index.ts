import { createMemoryHistory, createRouter } from 'vue-router'

import LoginView from '../pages/login.vue'
import ChatroomView from '../pages/chatRoom.vue'


const routes = [
  { path: '/', component: LoginView },
  { path: '/chatroom', component: ChatroomView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;