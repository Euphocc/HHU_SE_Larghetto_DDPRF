<template>
    <el-container>
        <div class="train">
            <h2>训练模型</h2>
            <el-upload class="upload-demo0" drag action="string" :show-file-list="false" :http-request="uploadTrainFile">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽训练集到这里或 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        训练耗时可能较长，请耐心等待哦~
                    </div>
                </template>
            </el-upload>
            <div>本次训练：{{ trainResult === true ? '成功' : '请重新训练' }}</div>
        </div>
        <!-- 数据驱动展示验证部分 -->
        <div class="validate" v-if="trainResult">
            <h2>检验效果</h2>
            <el-upload class="upload-demo1" drag action="string" :show-file-list="false" :http-request="uploadValidateFile">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽验证集到这里或 <em>点击上传</em>
                </div>
            </el-upload>
            <div>检验结果：{{ testResult === true ? '成功' : '请重新检验' }}</div>
            <div v-if="testResult">验证报告与混淆矩阵展示如下：</div>
        </div>
    </el-container>
    <div v-if="testResult"><br>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="index" label="Index" width="120" />
                <el-table-column prop="precision" label="Precision" />
                <el-table-column prop="recall" label="Recall" />
                <el-table-column prop="f1" label="F1-score" />
                <el-table-column prop="support" label="Support" />
            </el-table>
        </div>
        <img :src='imageDataUrl' alt="Converted Image" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { UploadFilled } from '@element-plus/icons-vue'

let trainResult = ref(false);
let testResult = ref(false);
let validateData = null;
let imageDataUrl = ref(''); // 存储转换后的图像URL
let base64String = ''; // 要转换的Base64字符串

let tableData = ref([]);

let uploadTrainFile = (params) => {
    axios.post('/api1/train',
        { file: params.file }
        , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    ).then((res) => {
        if (res.data === 'success') {
            trainResult.value = true;// 数据驱动展示验证部分
            localStorage.isModelExisted = true;
        } else if (res.data === 'failure') {
            alert("上传失败，请检查文件格式或网络链接！");
        }
    }).catch((error) => {
        alert('上传失败，请检查文件格式或网络链接！')
    });
};
let uploadValidateFile = (params) => {
    axios.post('/api1/test',
        { file: params.file }
        , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    ).then((res) => {
        if (res.data === 'failure') {
            alert("上传失败，请检查文件格式或网络链接！")
        }
        else {
            tableData.value = [];
            showTable(tableData, res.data);
            validateData = res.data;
            testResult.value = true;
            base64String = validateData.image;
            convertBase64ToImage(imageDataUrl, base64String);
            base64String = '';
        }
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



let showTable = (tableData, jsonfile) => {
    let sum = 0;
    for (let key in jsonfile) {
        if (key !== 'accuracy' && key !== 'macro avg' && key !== 'weighted avg' && key !== 'image') {
            let item = jsonfile[key];
            tableData.value.push({
                index: key,
                precision: item.precision.toFixed(4),
                recall: item.recall.toFixed(4),
                f1: item['f1-score'].toFixed(4),
                support: item.support,
            });
            sum += item.support;
        }
    }
    tableData.value.push({
        index: 'accuracy',
        precision: '',
        recall: '',
        f1: jsonfile.accuracy.toFixed(4),
        support: sum,
    });

    tableData.value.push({
        index: 'macro avg',
        precision: jsonfile['macro avg'].precision.toFixed(4),
        recall: jsonfile['macro avg'].recall.toFixed(4),
        f1: jsonfile['macro avg']['f1-score'].toFixed(4),
        support: jsonfile['macro avg'].support,
    });

    tableData.value.push({
        index: 'weighted avg',
        precision: jsonfile['weighted avg'].precision.toFixed(4),
        recall: jsonfile['weighted avg'].recall.toFixed(4),
        f1: jsonfile['weighted avg']['f1-score'].toFixed(4),
        support: jsonfile['weighted avg'].support,
    });

}




</script>
<style scoped>
.train {
    display: inline;
}

.validate {
    display: inline;
    margin-left: 200px;
}
</style>