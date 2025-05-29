<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
const activeTab = ref('login')
</script>


<template>
    <div class="flex justify-center items-center w-[100%] h-[100%]">
        <div class="flex flex-col palce-items-center">
            <div>
                <h1 class="text-center my-2 font-semibold">聊天系统</h1>
            </div>
            <el-tabs type="border-card" stretch v-model="activeTab">
                <el-tab-pane name="login">
                    <template #label>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>帐号登录</span>
                    </template>
                    <el-form label-width="3rem" label-position="right" size="large" 
                         ref="formRef">
                        <el-form-item label="帐号" prop="username">
                            <el-input  style="width: 222px;" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input show-password style="width: 222px;" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane name="rigster">
                    <template #label>
                        <el-icon>
                            <Iphone />
                        </el-icon>
                        <span>账号注册</span>
                    </template>
                    <el-form label-width="5rem" label-position="right" size="large" 
                         ref="formRef">
                        <el-form-item label="帐号" prop="username">
                            <el-input  style="width: 222px;" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input show-password style="width: 222px;" />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="password">
                            <el-input show-password style="width: 222px;" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-button type="primary" class="m-4" v-if="activeTab=='rigster'">立刻注册</el-button>
            <el-button type="primary" class="m-4" v-else @click="router.push('/chatroom')">立刻登录</el-button>
            

        </div>
    </div>
</template>