<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <h1>分布式系统故障诊断平台</h1>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <NavBar />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import NavBar from './components/NavBar.vue';
</script>
<style scoped>
.header {
  background-color: black;
  font-size: larger;
  color: white;
  text-align: center;
}

.aside {
  width: 15rem;
}

h1 {
  margin-top: 10px;
  display: inline-block;
}
</style>
