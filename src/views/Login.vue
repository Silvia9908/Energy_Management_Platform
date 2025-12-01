<template>
  <div class="bg">
    <div class="login">
      <div class="logo">
        <img :src="logo" alt="" width="70px" height="70px" />
        <h1 class="ml">动力港能源管理平台</h1>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.png";
// import { User } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import type { FormRules, FormInstance } from "element-plus";
////Pinia 的用户状态仓库，用来全局管理登录状态和权限信息。
import { useUserStore } from "@/store/auth";

import { useRouter } from "vue-router";

//RuleForm接口
interface RuleForm {
  username: string;
  password: string;
}
//ruleForm 是一个响应式的表单数据对象，用来绑定输入框的数据并保证类型安全。
const ruleForm: RuleForm = reactive({
  username: "",
  password: "",
});

//输入框规则，失去焦点时触发
//<FormRules<RuleForm>>官网范例中用的泛型，但是一般reactiive不建议用泛型
//定义 Element Plus 表单的校验规则，并让它变成响应式对象，用在 <el-form :rules="rules"> 上
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 4, max: 8, message: "用户名要求4-8位数字字母组合", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      // pattern: /^\d{6}$/,
      message: "密码必须是6位纯数字",
      trigger: "blur",
    },
  ],
});
//ref通过泛型定义类型
//formRef 的作用是拿到 <el-form> 的实例，并让 TS 知道它的类型，从而可以调用 validate() 等方法。
const formRef = ref<FormInstance>();

const userStore = useUserStore();
const router = useRouter();

//handleLogin 做的就是：
// 先校验表单 → 校验通过后再调用登录方法，防止空密码/乱输入直接提交。
const handleLogin = () => {
  formRef.value?.validate(async (valid: boolean) => {
    //?.可选链操作符  obj?.name 如果obj不是对象或者不存在，则直接报错
    //这里formRef.value可能不是实例对象
    //Element Plus 的表单校验方法，回调里参数 valid 表示：
    //true → 所有表单项校验通过
    //false → 校验失败（某一项不符合 rules）
    if (valid) {
      //校验通过
      //触发 Pinia 的登录逻辑（发请求、存 token、存菜单）
      //这里的异步
      //让代码按先登录-》再跳转
      await userStore.login(ruleForm); //serStore.login(ruleForm)是一个异步操作,会发http请求
      //如果不await，浏览器同时开始执行登录和跳转
      //请求可能还没有收到token，
      //路由守卫因为请求没完成->token没被写入pinia/sessionStorage导致被拦住
      //await会等login()完整执行：请求-信息存储-菜单保存
      //然后再push
      router.push("/");
    }
  });
};
</script>

<style lang="less" scoped>
.bg {
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;

  // less和css的区别就是less可嵌套，能直观的看出css的层级
  .login {
    width: 500px;
    height: 300px;
    padding: 50px;
    box-shadow: 0 0 10px 10px #f4f4f4;
    text-align: center;
    position: absolute;
    top: 50%;
    margin-top: -200px;
    left: 10%;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      h1 {
        color: rgb(14, 53, 148);
      }
    }
  }
}
</style>
