<script setup lang="ts">
import { ref, reactive,watch } from 'vue'
import router from '../router'
import { loginRequest,checkCodeRequest } from '../api/login'
import { useUserStore } from '../store/user'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const userStore = useUserStore()

const activeTab = ref('login')
const loginData = reactive({
    email: '',
    password: ''
})
const registerData = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    redisCheckCode: '',
    checkCode: '',
    nickName: ''
})
const base64 = ref("")

// form 表单组件实例
const loginDataRef = ref<FormInstance>()
const registerDataRef = ref<FormInstance>()

//监听登录和注册页面的变化

watch(activeTab, async (tab,preTab)=>{
    if(tab=="register"){
        const res = await checkCodeRequest()
        registerData.redisCheckCode = res.data.redisCheckCode
        base64.value = res.data.base64
    }
    
})

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码！'))
    } else {
        if (registerData.password !== '') {
            if (!registerDataRef.value) return
            registerDataRef.value.validateField('password')
        }
        callback()
    }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请重新再输入一次密码！'))
    } else if (value !== registerData.password) {
        callback(new Error("两次密码不相同！"))
    } else {
        callback()
    }
}

// 表单验证规则
const rules = reactive({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '请输入有效的邮箱地址',
            trigger: 'blur'
        },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { trigger: 'blur', validator: validatePass, },
    ],
    confirmPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { trigger: 'blur', validator: validatePass2, },
    ],
    nickName: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
    ],
    checkCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ],

})

const submitLoginForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            console.log('登录表单提交成功!')
            const data = {
                email: loginData.email,
                password: loginData.password
            }
            loginRequest(data).then(res => {
                const { token } = res.data
                // 设置token
                userStore.setToken(token)
                router.push('/chatroom')
            }).catch(err => {
                ElMessage({ type: 'error', message: err })
            })
        }
        else {
            console.log('error submit!')
        }
    })
}

const submitRisgterForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async(valid) => {
        if (valid) {
            console.log('submit!')
            const{confirmPassword,...data} = registerData
            await 
        } else {
            console.log('error submit!')
        }
    })
}



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
                    <el-form label-width="4rem" label-position="right" size="large" ref="loginDataRef"
                        :model="loginData" :rules="rules">
                        <el-form-item label="邮箱" prop="email">
                            <el-input style="width: 222px;" v-model="loginData.email" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input show-password style="width: 222px;" v-model="loginData.password" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane name="register">
                    <template #label>
                        <el-icon>
                            <Iphone />
                        </el-icon>
                        <span>账号注册</span>
                    </template>
                    <el-form label-width="5rem" label-position="right" size="large" ref="registerDataRef"
                        :model="registerData" :rules="rules">
                        <el-form-item label="昵称" prop="nickName">
                            <el-input style="width: 222px;" v-model="registerData.nickName" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input style="width: 222px;" v-model="registerData.email" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input show-password style="width: 222px;" v-model="registerData.password" />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input show-password style="width: 222px;" v-model="registerData.confirmPassword" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="checkCode">
                            <el-input style="width: 222px;" v-model="registerData.checkCode" />
                        </el-form-item>
                        <el-form-item>
                            <img :src="base64" alt="验证码" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-button type="primary" class="m-4" v-if="activeTab == 'register'"
                @click="submitRisgterForm(registerDataRef)">立刻注册</el-button>
            <el-button type="primary" class="m-4" v-else @click="submitLoginForm(loginDataRef)">立刻登录</el-button>


        </div>
    </div>
</template>