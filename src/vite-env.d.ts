/// <reference types="vite/client" />
// vite-env.d.ts是全局类型声明文件

// 在引入插件库时，出现报错 -> 无法找到模块 “xxxxxx” 或 “file-saver” 的声明文件，可以手动声明全局类型
declare module 'mockjs'
declare module 'file-saver'

// 在引入组件时如果出现报错：无法找到模块“@/xxx/xxx/.vue”的声明文件
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions
  export default componentOptions
}
declare module '*.png' {
  const src: string
  export default src
}
declare module 'mockjs'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'
declare module '*.ico'
declare module '*.webp'
declare module '*.woff'
declare module '*.woff2'
declare module '*.ttf'
declare module '*.eot'
