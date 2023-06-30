<template>
    <el-menu class="el-menu-vertical-demo" @select="handleSelectMenu">
        <el-menu-item index="about">
            <el-icon>
                <ChatDotRound />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="userinfo">
            <el-icon>
                <User />
            </el-icon>
            <span>用户信息</span>
        </el-menu-item>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <DataLine />
                </el-icon>
                <span>模型训练</span>
            </template>
            <el-menu-item index="newmodule">训练新模型</el-menu-item>
            <el-menu-item index="uploadmodule">使用已有模型预测</el-menu-item>
        </el-sub-menu>

    </el-menu>
</template>
  
<script setup>
import { User, DataLine, ChatDotRound } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let handleSelectMenu = (item) => {
    if (item === 'userinfo') {
        router.push('/UserInfo');
    } else if (item === 'newmodule') {
        router.push('/NewModule');
    } else if (item === 'uploadmodule') {
        router.push('/UploadPredict');
    } else if (item === 'about') {
        router.push('/About');
    }
}
</script>
<style scoped></style>