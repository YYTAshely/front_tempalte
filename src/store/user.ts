import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CookieUtil } from "../utils/cookie";
import router from "../router";

export const useUserStore = defineStore('user', () => {
  const token = ref<string | undefined>(CookieUtil.getCookie("token"));
  const userInfo = ref(JSON.parse(localStorage.getItem("userInfo") || "{}"));

  function setToken(newToken: string) {
    token.value = newToken 
    CookieUtil.setCookie("token", newToken)
  }

  function setUserInfo(info: object) {
    userInfo.value = info
    localStorage.setItem("userInfo", JSON.stringify(info))
  }

  function loginOut() {
    token.value = undefined;
    CookieUtil.deleteCookie("token");
    localStorage.removeItem("userInfo");
    router.push('/')
  }

  return{setToken,setUserInfo,loginOut}
})

