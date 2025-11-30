import {defineStore} from "pinia"
export const useUserStore = defineStore("user",{
  state:()=>({
    //令牌
    token:null,
    //权限数组
    roles:[],
    username:"",
    //根据角色返回对应菜单
    menu:[]
  }),
  actions:{
    
  }
})