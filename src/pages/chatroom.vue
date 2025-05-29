<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
import { Promotion } from '@element-plus/icons-vue'
</script>

<template>
    <div class="bg-gradient-to-r from-[#cee2f2] to-[#b2d0f4] flex justify-center w-[100%] h-[100%] py-10 px-20">
        <el-container>
            <el-aside width="250px" class="box mr-2 flex flex-col items-center">
                <div class="h-12 leading-[3rem]">好友列表</div>
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
                <h1 class="box h-12 leading-[3rem] mb-2">聊天室</h1>
                <div class="box flex-1 flex flex-col">
                    <div class="flex-1 overflow-y-auto "></div>
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
</style>