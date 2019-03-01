<template>
  <div class="page">
    <h2>Home Page</h2>
    <el-button type="primary" @click="getUser()">获取用户信息</el-button>
    <el-button type="primary" @click="loadPage('Register')">获取菜单信息</el-button>
    <el-button type="primary" @click="logout()">登出</el-button>
  </div>
</template>

<script>
  // import axios from 'axios'
  // import mock from '@/mock/index.js'
  import $axios from "../../http/axios";
  export default {
    name:'Login',
    methods:{
      getUser(){
        // axios.get('http://localhost:8080/user')
        //   .then(function (res) {
        //     alert(JSON.stringify(res.data));
        //   }).catch(function (res) {
        //   alert(res);
        // });
        // axios({
        //     url: this.global.baseURL + '/findAll',
        //     methods:'GET',
        //   }
        // ).then(function (res) {
        //     alert(JSON.stringify(res.data));
        //   }).catch(function (res) {
        //   alert(res);
        // });

        // axios.get(this.global.baseUrl+'/findAll')
        //   .then(function (res) {
        //   alert(JSON.stringify(res.data));
        // }).catch(function (res) {
        //   alert(res);
        // });

        this.$axios.post(
          this.global.baseUrl+'/findAll'
        ).then(function (res) {
            alert(JSON.stringify(res.data));
            // console.log(res.data[1].password);
          }).catch(function (res) {
          alert(res);
        });
      },
      getMenu(){
        axios.get('http://localhost:8080/menu')
          .then(function (res) {
            alert(JSON.stringify(res.data));
          }).catch(function (res) {
          alert(res);
        });
      },
      // layout(){
        // this.$axios.get(
        //   this.global.baseUrl+'/sys/logout'
        // ).then(function (res) {
        //   alert(JSON.stringify(res.data));
        //   // console.log(res.data[1].password);
        // }).catch(function (res) {
        //   alert(res);
        // });

      // }

      logout: function() {
        this.$confirm("确认退出吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            sessionStorage.removeItem("user")
            this.$router.push("/login")
            this.$api.login.logout().then((res) => {
            }).catch(function(res) {
            })
          })
          .catch(() => {})
      }
    }
  }

</script>

