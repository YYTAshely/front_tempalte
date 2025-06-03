<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
import { Promotion } from '@element-plus/icons-vue'
// import useWebSocket from '@/utils/websocket';//引入websocket.ts文件
 
// import config from '@/config' //引入公共配置文件
 
// const wsOptions = {
//   url: config.wbBaseURL,
// };
 
// const { open, close, reconnect, on, send } = useWebSocket(wsOptions);
 
// onMounted(() => {
//   open();//在onMounted钩子中调用open函数，链接websocket
 
//   // 注册消息接收处理函数
//   on('message', (data) => {
//     receivedMessage = data;
//     console.log(data)
//   });
// });
</script>

<template>
    <div class="bg-gradient-to-r from-[#cee2f2] to-[#b2d0f4] flex justify-center w-[100%] h-[100%] py-20 px-40">
        <el-container>
            <el-aside width="250px" class="box mr-2 flex flex-col items-center">
                <div class="h-12 leading-[3rem] font-bold text-lg">好友列表</div>
                <div class="friends">
                    <h1>年</h1>
                    <h2 class="text-sm">状态：在线</h2>
                </div>
                <div class="friends">
                    <h1>夕</h1>
                    <h2 class="text-sm">状态：在线</h2>
                </div>
            </el-aside>
            <el-main style="--el-main-padding:0px" class="flex flex-col">
                <h1 class="box h-12 leading-[3rem] mb-2 font-bold text-lg">聊天室</h1>
                <div class="box flex-1 flex flex-col">
                    <div class="flex-1 overflow-y-auto flex flex-col p-4">
                        <div class="mine">
                            <span class="minetext">你好！</span>
                            <el-avatar :size="50" src="../../public/nian.webp" />
                        </div>
                        <div class="mine">
                            <span class="minetext">你好！</span>
                            <el-avatar :size="50" src="../../public/nian.webp" />
                        </div>

                        <div class="your">
                            <el-avatar :size="50" src="../../public/xi.webp" />
                            <span class="yourtext">早上好！</span>                       
                        </div>
                    </div>
                    <div class="h-12 leading-[3rem]">
                        <el-input v-model="input" style="width: 600px">
                            <template #prefix>
                                <el-icon style="font-size: 24px">
                                    <img src="../../public/smile.svg">
                                </el-icon>
                                <el-icon style="font-size: 24px">
                                    <Picture />
                                </el-icon>
                            </template>
                        </el-input>
                        <el-button type="primary" round class="ml-2">
                            <template #icon>
                                <el-icon style="font-size: 24px">
                                    <Promotion />
                                </el-icon>
                            </template>
                        </el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>

</template>


<style scoped>
.box {
    border: 2px solid white;
    border-radius: 8px;
    background-color: #e3ecf3;
}
.friends {
    text-align: left;
    /* background-color: #434343; */
    background: linear-gradient(to right, #434343, #454545);
    color: white;
    border-radius: 5px;
    width: 90%;
    margin-bottom: 5px;
    padding: 5px 5px;
}
.mine {   
    width: fit-content;
    align-self: flex-end;
    margin-top: 5px;
    display: flex;
    align-items:center;
}
.minetext {
    border-radius: 5px 1px 10px 5px;
    background-color: #1e6eff;
    color: white;
    padding: 5px;
    margin-right: 5px;
}
.your {  
    width: fit-content;
    margin-top: 5px;
    display: flex;
    align-items:center;   
}
.yourtext {
    background-color: white;
    border-radius:1px 5px 5px 10px;
    color: black;
    margin-left: 5px;
    padding: 5px;
}
</style>