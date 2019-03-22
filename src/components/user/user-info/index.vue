<template>
  <div class="user-info">
    <div class="form-line">
      <span class="label">用户编号：</span>
      <span class="text">{{userId}}</span>
    </div>
    <div class="form-line">
      <span class="label">登录名：</span>
      <span class="text">{{adminName}}</span>
    </div>
    <div class="form-line">
      <span class="label">真实姓名：</span>
      <span class="text">{{userName}}</span>
    </div>
    <div class="form-line">
      <span class="label">身份证号：</span>
      <span class="text">{{userNum}}</span>
    </div>
    <div class="form-line">
      <span class="label">手机号码：</span>
      <span class="text">{{userPhone}}</span>
    </div>
    <div class="form-line">
      <span class="label">收货地址：</span>
      <span class="text">{{userAddress}}</span>
    </div>
    <a class="btn btn-submit" @click="loadPage('userCenterUpdate')">编辑</a>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
          userId:'',
          adminName:'',
          userName:'',
          userNum:'',
          userPhone:'',
          userAddress:''
      };
    },
    created() {
      this.queryUserInfo();
    },
    methods: {
      queryUserInfo() {
        this.$axios.post(
          this.global.baseUrl + '/getUserInfo'
        ).then((res) => {
          // alert(JSON.stringify(res.data));
          if(res.data.code === 200){
            this.userId = res.data.data.userId;
            this.adminName = res.data.data.adminName;
            this.userName = res.data.data.userName;
            this.userNum = res.data.data.userNum;
            this.userPhone = res.data.data.userPhone;
            this.userAddress = res.data.data.userAddress;
          }
        }).catch(function (res) {
          alert(res);
        })
      }
    },
    components: {}
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
