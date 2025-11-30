import { post } from "@/utils/http";

//项目中所有接口
enum Api{
  Login="/login"
}

interface LoginParams{
  username:string;
  password:string
}

function loginApi(data:LoginParams):Promise<any>{
  return post(Api.Login,data)
}
export {loginApi}