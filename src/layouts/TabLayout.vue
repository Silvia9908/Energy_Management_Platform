<template>
  <el-tabs
    v-model="currentTab.name"
    class="demo-tabs"
    type="card"
    closable
    @tab-click="handleClick"
    @tab-remove="remove"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.name"
      :name="item.name"
    >
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>&nbsp;{{ item.name }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <RouterView />
</template>

<script setup lang="ts">
import { useTabStore } from "@/store/tabs";
import { useUserStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import { useRouter, useRoute } from "vue-router";

const tabsStore = useTabStore();
const { tabs, currentTab } = storeToRefs(tabsStore);
const { addTab, setCurrentTab, removeTab } = tabsStore;

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const handleClick = ({ index }: { index: number }) => {
  const item = tabs.value[index];
  if (!item) return;
  router.push(item.url); //路由跳转
  setCurrentTab(item.name, item.url); //设置当前高亮
};
const remove = (TabPaneName: string) => {
  removeTab(TabPaneName);
  router.push(currentTab.value.url);
};

const { menu } = storeToRefs(userStore);
//当前侧边栏信息
function findObjectByUrl(arr: any[], url: string) {
  for (const item of arr) {
    if (item.url === url) {
      return item;
    }
    if (item.children) {
      const found: any = findObjectByUrl(item.children, url);
      if (found) return found;
    }
  }
  return null;
}
const { name, url, icon } = findObjectByUrl(menu.value, route.path);
addTab(name, url, icon);
setCurrentTab(name, url);
</script>

<style lang="less" scoped>
.demo-tabs {
  ::v-deep .is-active {
    background-color: rgb(34, 136, 255) !important;
    color: white !important;
  }
}
</style>
