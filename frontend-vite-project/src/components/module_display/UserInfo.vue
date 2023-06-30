<template>
    <h1>账号：</h1><el-text class="mx-1" size="large">{{ username }}</el-text><br><br>
    <el-button type="danger" class="loginBtn" @click="logout">
        登出账号
    </el-button>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
let username = ref(localStorage.username);
const router = useRouter();

let logout = () => {
    localStorage.isLogin = 'false';
    router.push('/Login');
}

</script>
<style scoped></style>