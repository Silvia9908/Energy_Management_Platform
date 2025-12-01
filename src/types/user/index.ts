//类型单独写
interface MenuItem{
  name:string,
  icon:string,
  url:string,
  children?:MenuItem[]
}
export type {MenuItem}