import type{ MenuItem } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue"
export const useTabStore=defineStore("tabs",()=>{
  const tabs= ref<MenuItem[]>([])
  const currentTab=ref<{name:string,url:string}>({name:"",url:""})
  const addTab = (name:string,url:string,icon:string)=>{
    //判断点击的页面pinia数组中是否已经有了
    if(!tabs.value.some((tab)=>tab.url===url)){
      tabs.value.push({name,url,icon})
    }
  }
  const setCurrentTab=(name:string,url:string)=>{
    currentTab.value={name,url}
  }
  //删除tab
  const removeTab=(name:string)=>{
    //如果删除的是高亮
    if(currentTab.value.name===name){
      const currentIndex=tabs.value.findIndex(tab=>tab.name===name)
      if(currentIndex!==0){//如果删除的是第一个就不让它删除
        const item=tabs.value[currentIndex-1]
        if(!item) return
        currentTab.value=item
      }else{
        return
      }

    }
    tabs.value=tabs.value.filter(tab=>tab.name!==name)
  }
  return {tabs,addTab,currentTab,setCurrentTab,removeTab}
})