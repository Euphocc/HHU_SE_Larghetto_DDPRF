<template>
    <h2>使用已有模型进行预测</h2>
    <div v-if="isModelExisted"><el-upload class="upload-demo0" drag action="string" :show-file-list="false"
            :http-request="uploadPredictFile">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖拽待验证的文件到这里或 <em>点击上传</em>
            </div>
        </el-upload>
        <div>测试结果：{{ predictresult === true ? '成功' : '未上传成功' }}</div>
        <div v-if="predictresult"><img :src='imageDataUrl' alt="Classified result" /></div>
        <div><el-button type="primary" v-if="predictresult" @click="downloadResult(jsonfile)">下载预测结果</el-button></div>
    </div>
    <div v-if="!isModelExisted">尚未训练任何模型，无法进行预测~</div>
</template>
<script setup>
import { ref } from 'vue';
import axios from "axios";
import { saveAs } from 'file-saver';
import { UploadFilled } from '@element-plus/icons-vue'


let predictresult = ref(false);
let jsonfile = null;
let imageDataUrl = ref(''); // 存储转换后的图像URL
let base64String = ''; // 要转换的Base64字符串
let isModelExisted = ref(localStorage.isModelExisted);

let downloadResult = (jsonfile) => {
    let downloadStr = JSON.stringify(jsonfile);
    let str = new Blob([downloadStr], { type: 'text/plain;charset=utf-8' });
    // 文件名自定义，注意这里要手动写上文件的后缀名
    saveAs(str, `predictResult.json`);
}

let uploadPredictFile = (params) => {
    axios.post('/api1/predict',
        { file: params.file }
        , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    ).then((res) => {
        if (res.data !== 'failure') {
            jsonfile = res.data;
            predictresult.value = true;
            base64String = res.data.image;
            // 图片解码展示
            convertBase64ToImage(imageDataUrl, base64String);
            base64String = '';
        }
        else {
            alert("上传失败，请检查文件格式或网络链接！");
        }
    }).catch((e) => {
        alert('上传失败，请检查文件格式或网络链接！');
    });
};

let convertBase64ToImage = (imageDataUrl, base64String) => {
    const byteCharacters = atob(base64String); // 将Base64字符串转换为二进制数据
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays); // 创建Uint8Array

    const blob = new Blob([byteArray], { type: 'image/png' }); // 创建Blob对象

    imageDataUrl.value = URL.createObjectURL(blob); // 将Blob对象转换为图像URL
}

</script>
<style scoped></style>