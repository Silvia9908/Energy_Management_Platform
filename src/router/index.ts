//只创造路由实例
import { createRouter,createWebHistory } from "vue-router"
import routes from "./basicRouteMap"

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router