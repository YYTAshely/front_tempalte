<template>
    <div class="flex justify-center items-center w-[100%] h-[100%]">
        <div class="flex flex-col palce-items-center">
            <div>
                <h1 class="text-center my-2 font-semibold">后台管理系统</h1>
            </div>
            <el-tabs type="border-card" stretch>
                <el-tab-pane>
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
                <el-tab-pane>
                    <template #label>
                        <el-icon>
                            <Iphone />
                        </el-icon>
                        <span>手机登录</span>
                    </template>
                    <el-form label-width="3rem">
                        <el-form-item label="手机号">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="验证码">
                            <div class="flex">
                                <el-input></el-input>
                                <el-button type="primary" class="ml-4">获取验证码</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div class="flex justify-between">
                <el-checkbox label="记住密码" size="large" class="text-[#569ef8]" />
                <div class="flex items-center text-[#409eff] text-[14px]">忘记密码</div>
            </div>


            <el-button type="primary">立刻登录</el-button>

        </div>
    </div>
</template>