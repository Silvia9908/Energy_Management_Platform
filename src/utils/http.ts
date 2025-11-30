//封装get post请求
import service from "./axios";

interface ResponseDate{
  code:number,
  data:any,
  message:string
}

function get(url:string,params?:any):Promise<ResponseDate>{
  return service.get(url,{params})
}

function post(url:string,data?:any):Promise<ResponseDate>{
  return service.post(url,data)
}

export {get,post}