<template>
    <div class="layout">
        <el-tabs type="border-card">
            <el-tab-pane label="登录">
                <el-form label-position="right" label-width="60px" style="max-width: 460px" class="loginForm">
                    <el-form-item label="账号：">
                        <el-input v-model="account" maxlength="10" show-word-limit />
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input type="password" v-model="pwd" maxlength="15" />
                    </el-form-item>
                    <el-button type="primary" class="loginBtn" @click="login">
                        登录
                    </el-button>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="注册">
                <el-form label-position="right" label-width="60px" style="max-width: 460px" class="loginForm">
                    <el-form-item label="账号：">
                        <el-input v-model="rAccount" maxlength="10" show-word-limit placeholder="不超过十位" />
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input type="password" v-model="rPwd" maxlength="10" placeholder="不超过十位" show-word-limit />
                    </el-form-item>
                    <el-button type="primary" class="loginBtn" @click="register">
                        注册
                    </el-button>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();


let account = ref('');
let pwd = ref('');
let rPwd = ref('');
let rAccount = ref('');

// 登录
let login = () => {
    axios.post('/api1/login', {
        username: account.value,
        password: pwd.value
    }
    ).then((resp) => {
        console.log(resp);
        if (resp.data === false) {
            localStorage.isLogin = false;
            alert('账号或密码错误！');
        } else {
            localStorage.isLogin = true;
            localStorage.username = account.value;
            router.push('/About');
        }
    })
}
// 注册
let register = () => {
    axios.post('/api1/register', {
        username: rAccount.value,
        password: rPwd.value,
    }
    ).then((resp) => {
        if (resp.data === 'success') {
            alert('注册成功！');
        } else {
            alert('用户名已被注册，换个用户名试试看吧！');
        }
    })
}

</script>
<style scoped></style>
  