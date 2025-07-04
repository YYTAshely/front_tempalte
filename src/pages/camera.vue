<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { getUserId } from '../api/camera'

// 响应式数据
const videoWidth = ref(640)
const videoHeight = ref(480)
const facingMode = ref('user')
const imgSrc = ref('')
const stream = ref(null)
const error = ref(null)
const isCameraActive = ref(false)
const testImg = ref('')
const captureInterval = ref(null)//请求发送定时器
const arrID = ref(null)
const emit = defineEmits(['sendId'])


//捕捉图片
const captureImage = async () => {
  const res = setImage()
  // console.log(res)
  if (res != undefined) {
    testImg.value = res
    const idData = await getUserId(res)
    arrID.value = idData.data
    // console.log(arrID.value)
    emit('sendId', arrID)
  }
}

// 停止定时截图
const stopCaptureInterval = () => {
  if (captureInterval.value !== null) {
    clearInterval(captureInterval.value)
    captureInterval.value = null
  }
}


// 开始定时截图
const startCaptureInterval = () => {
  // 先清除已有定时器
  stopCaptureInterval()
  
  // 每100毫秒截图一次
  captureInterval.value = window.setInterval(() => {
    if (isCameraActive.value) {
      captureImage()
    } else {
      stopCaptureInterval()
    }
  }, 100)
}

// 捕获当前帧为图片
const setImage = () => {
  const video = document.getElementById('videoCamera')
  const canvas = document.getElementById('canvasCamera')

  if (video && canvas) {
    const context = canvas.getContext('2d')
    canvas.width = videoWidth.value
    canvas.height = videoHeight.value
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    imgSrc.value = canvas.toDataURL('image/png')
    return imgSrc.value
  }
}

// 获取摄像头权限
const getCompetence = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        width: videoWidth.value,
        height: videoHeight.value,
        facingMode: facingMode.value
      }
    })
    const video = document.getElementById('videoCamera')
    if (video) {
      video.srcObject = stream.value
      isCameraActive.value = true
    }
  } catch (err) {
    error.value = `获取摄像头权限失败: ${err.message}`
    console.error(error.value)
  }
  startCaptureInterval()
}

// 停止摄像头
const stopNavigator = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    isCameraActive.value = false
  }
  stopCaptureInterval()
}


// 转换Base64为Blob
const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// 上传图片
const uploadImage = async () => {
  if (!imgSrc.value) return

  try {
    const blob = dataURLtoBlob(imgSrc.value)
    const formData = new FormData()
    formData.append('image', blob, 'capture.png')

    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (err) {
    error.value = `上传失败: ${err.message}`
    throw err
  }
}

// 切换前后摄像头
const switchCamera = () => {
  stopNavigator()
  facingMode.value = facingMode.value === 'user' ? 'environment' : 'user'
  getCompetence()
}

// 生命周期钩子
onMounted(() => {
  getCompetence()
})

onBeforeUnmount(() => {
  stopNavigator()
})

// 暴露给模板的方法
defineExpose({
  getCompetence,
  stopNavigator,
})
</script>


<template>
  <div>
    <el-button type="primary" @click="getCompetence()">打开摄像头</el-button>
    <el-button type="danger" @click="stopNavigator()">关闭摄像头</el-button>
    <el-select v-model="facingMode" placeholder="请选择摄像头类型">
      <el-option label="前置" value="user"></el-option>
      <el-option label="后置" value="environment"></el-option>
    </el-select>
    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    <canvas id="canvasCamera" style="display: none;"></canvas>
    <!-- <img :src="testImg" alt="我是测试图片"> -->
  </div>
</template>

<style>
.captureImg {
  width: 100%;
  max-width: 640px;
  margin-top: 20px;
}
</style>