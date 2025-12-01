import router from "./index";
import { useUserStore } from "@/store/auth";
router.beforeEach((to)=>{
  const userStore = useUserStore()
  //能取到userStore.login就是有值
  //undefined就是false
  const isLogin = userStore.token
  if(!isLogin){
    //未登录需要跳转到登录页
    //如果to.path不是登录页也强制跳转
    if(to.path!=="/login"){
      return {path:'/login'}
    }
  }else{
    //登录成功后
    //如果去的还是登录页，那么重定向到主页
    if(to.path==='/login'){
      return {path:'/'}
    }
    if(to.meta?.needAuth&&!userStore.roles.some((role:string)=>(to.meta.needAuth as string[]).includes(role))){
      //需要的权限是否包含我现在有的权限role
      //这边取反：不包含跳转home
      return {path:"/"}
    }
  }
})