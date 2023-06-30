<template>
    <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="intro" @click="fun1">项目简介</el-menu-item>
        <el-menu-item index="tech" @click="fun2">技术栈</el-menu-item>
    </el-menu>

    <div v-if="display1">
        <div>
            <el-row>
                <el-col>
                    <p style="font-weight: bold; font-size: larger;">欢迎来到分布式系统故障诊断平台</p>
                    <p>如果您是第一次使用本平台，请接着读下去：</p>
                    <p>分布式系统故障诊断平台是一个旨在提供高效、准确的故障诊断和排除解决方案的工具。<br>
                        该平台基于分布式系统的架构和设计理念，<br>旨在帮助企业和组织快速识别、定位和解决分布式系统中的故障和问题。</p>
                    <p>本平台优势：</p>
                    <p>1.在线训练、验证与预测</p>
                    <p>2.基于随机森林的集成机器学习算法 </p>
                    <p>3.B/S前后端分离式架构</p>
                </el-col>
                <el-col class="bord3">
                    <p style="font-weight: bold;">项目开发成员</p>
                    <div></div>
                    <img src="../../image/xch.jpg" width="80" height="80" style="margin-left: 20px; margin-right: 10px;">
                    <img src="../../image/xxy.jpg" width="80" height="80" style="margin-left: 20px; margin-right: 10px;">
                    <img src="../../image/wyl.jpg" width="80" height="80" style="margin-left: 20px; margin-right: 10px;">
                    <img src="../../image/ycy.jpg" width="80" height="80" style="margin-left: 20px; margin-right: 10px;">
                    <img src="../../image/yqy.jpg" width="80" height="80" style="margin-left: 20px; margin-right: 10px;">
                </el-col>
            </el-row>
        </div>
        <el-row>
            <el-col>
                <div>
                    <p style="font-weight: bold;">注意事项</p>
                    <p>!!! 由于系统暂运行于基于CPU的机器学习平台上，训练速度可能较慢</p>
                    <p>还请您耐心等待哦~</p>
                </div>
            </el-col>
        </el-row>
    </div>

    <div v-if="display2">
        <div>
            <div class="bord">
                <p style="font-size: large;font-weight: bold;margin-top: 5px ;">所使用的技术栈：</p>
                <p style="font-weight: bold;">算法设计</p>
                <p>使用众数填充缺失值，特征选择基于scikit-learn中的随机森林选择器；基于scikit-learn中的随机森林封装分类器，并返回相关可视化结果实例。</p>
                <p style="font-weight: bold;">前端设计</p>
                <p>前端采用MVVM的典型框架Vue3进行开发，静态界面使用了Element Plus组件库进行构建，动态交互通过调用后端接口实现前后端连接。</p>
                <p style="font-weight: bold;">后端设计</p>
                <p>选择使用轻量化的Flask框架开发后端系统；采取了MySQL与PyMySQL维护用户登录与注册。</p>
            </div>

            <el-divider content-position="left">
                <div class="title" style="font-size: large;">前端</div>
            </el-divider>
            <div class="div-inline">
                <img src="../../assets/vue.svg" width="100" height="100" style="margin-right: 200px; margin-left: 100px;">
                <p style="margin-right: 200px; margin-left: 137px;">Vue</p>
            </div>
            <div class="div-inline">
                <img src="/vite.svg" width="300" height="100">
                <p style="margin-right: 200px; margin-left: 137px;">Vite</p>
            </div>
            <div class="div-inline">
                <img src="../../assets/axios.jpg" width="100" height="100" style="margin-left: 110px;">
                <p style="margin-right: 200px; margin-left: 137px;">Axios</p>
            </div>
            <el-divider content-position="left">
                <div class="title" style="font-size: large;">后端</div>
            </el-divider>
            <div class="div-inline">
                <img src="../../assets/Flask_Logo.svg" width="100" height="100"
                    style="margin-right: 200px; margin-left: 100px;">
                <p style="margin-right: 200px; margin-left: 137px;">Flask</p>
            </div>
            <div class="div-inline">
                <img src="../../assets/Scikit_Learn_Logo.svg" width="300" height="100">
                <p style="margin-right: 200px; margin-left: 110px;">scikit-learn</p>
            </div>
            <div class="div-inline">
                <img src="../../assets/MySQL_logo.png" width="300" height="100">
                <p style="margin-right: 200px; margin-left: 137px;">MySQL</p>
            </div>
            <br>

            <el-divider content-position="left">
                <div style="font-size: large;">核心算法</div>
            </el-divider>
            <div>
                <el-card class='card1'>
                    <img src="../../assets//feature.jpg">
                    <div>
                        <b>特征工程</b><br>
                        <span>基于决策树的特征选择</span>
                    </div>
                </el-card>
                <el-card style="display: inline-block">
                    <img src="../../assets//random.jpg">
                    <div>
                        <b>随机森林</b><br>
                        <span>较好的分类效果</span>
                    </div>
                </el-card>
            </div>

            <br>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let display1 = ref(true);
let display2 = ref(false);


let fun1 = () => {
    display1.value = true;
    display2.value = false;
}

let fun2 = () => {
    display2.value = true;
    display1.value = false;
}


</script>
<style scoped>
.div-inline {
    display: inline-block;
}

.card1 {
    display: inline-block;
    transform: translateY(-20%);
}
</style>