import {defineStore} from "pinia"
import { loginApi } from "@/api/user"
// import router from "@/router";
interface LoginParams{
  username:string;
  password:string
}
export const useUserStore = defineStore("user",{
  state:()=>({
    //令牌
    token:sessionStorage.getItem("token")||"",
    //权限数组
    roles:sessionStorage.getItem("roles")?JSON.parse(sessionStorage.getItem("roles")!):[],
    username:sessionStorage.getItem("username")||"",
    //根据角色返回对应菜单
    menu:sessionStorage.getItem("menu")?JSON.parse(sessionStorage.getItem("menu")!):[],
  }),
  actions:{
    async login(data:LoginParams){//传入router验证用户信息
      //pinia数据是响应式的，本地存储不是响应式的
      //数据取值存值，pinia更快，性能更好
      try{
        const {
          data:{
            token,
            user:{username,roles},
            menulist
          }
        }= await loginApi(data)
        this.token = token
        this.roles = roles
        this.menu = menulist
        this.username = username
        //本地存储
        sessionStorage.setItem("token",token)
        //本地存储只能存基本类型，不能存对象，先转换成字符串类型
        sessionStorage.setItem("roles",JSON.stringify(roles))
        sessionStorage.setItem("username",username)
        sessionStorage.setItem("menu",JSON.stringify(menulist))
        //传入的router实现跳转到主页面
        // router.push('/')
      }catch(error){
        console.log("error",error);
      }
    },
    logout(){
      this.token=""
      this.roles=[]
      this.username=""
      this.menu=[]
      sessionStorage.clear()
    }
  }
})