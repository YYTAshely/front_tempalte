<script setup>
import Camera from '../pages/camera.vue'
import { ref,nextTick } from 'vue'

const arrID = ref(null)
const scrollContainer = ref(null)
const handleId = (data) => {
  arrID.value = data.value
  console.log()
}

const scrollToBottom = () => {
  const el = scrollContainer.value
  if (el) el.scrollTop = el.scrollHeight
}

nextTick(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="flex flex-col h-100vh">
          <div class=" bg-[#409eff]  flex-[1] text-white flex justify-center items-center">人员id输出</div>
          <div class="flex-[12] bg-[#ecf5ff] overflow-y-auto" ref="scrollContainer">
            <div v-for="id in arrID" :key="id">Hi~ {{ id }}</div>
          </div>
        </div>

      </el-aside>
      <el-container>
        <el-header>人员识别</el-header>
        <el-main>
          <Camera @sendId="handleId" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>