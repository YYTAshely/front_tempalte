import axios from "axios";
import { CookieUtil } from "./cookie";
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (CookieUtil.getCookie("token")) {
      config.headers["Authorization"] = CookieUtil.getCookie("token");
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
axios.interceptors.response.use( (response):any=> {
    if(response.status==200){
        return response
    }
    
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default instance