<template>
  <div class="page">
    <h2>Test Page</h2>
    <el-button type="primary" @click="getUser()">获取用户信息</el-button>
    <el-button type="primary" @click="getMenu()">获取菜单信息</el-button>
  </div>
</template>

<script>
  import axios from 'axios'
  // import mock from '@/mock/index.js'
  export default {
    name:'test',
    methods:{
      getUser(){
        axios.get('/panda/findAll')
          .then(function (res) {
            alert(JSON.stringify(res.data));
          }).catch(function (res) {
          alert(res);
        });
      },
      getMenu(){
        axios.get('/panda/findAll')
          .then(function (res) {
            alert(JSON.stringify(res.data));
          }).catch(function (res) {
          alert(res);
        });
      }
    }
  }

</script>

