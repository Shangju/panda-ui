<template>
  <div class="user-info">
    <div class="form-line">
      <span class="label">用户编号：</span>
      <span class="text">{{customerId}}</span>
    </div>
    <div class="form-line">
      <span class="label">登录名：</span>
      <span class="text">{{admin}}</span>
    </div>
    <div class="form-line">
      <span class="label">真实姓名：</span>
      <span class="text">{{customerName}}</span>
    </div>
    <div class="form-line">
      <span class="label">身份证号：</span>
      <span class="text">{{customerNumber}}</span>
    </div>
    <div class="form-line">
      <span class="label">手机号码：</span>
      <span class="text">{{customerPhone}}</span>
    </div>
    <div class="form-line">
      <span class="label">收货地址：</span>
      <span class="text">{{customerAddress}}</span>
    </div>
    <a class="btn btn-submit" @click="loadPage('userCenterUpdate')">编辑</a>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
          customerId:'',
          admin:'',
          customerName:'',
          customerNumber:'',
          customerPhone:'',
          customerAddress:''
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
          if (res.data.msg != null) {
            this.customerId = res.data.data.userId;
            this.admin = res.data.data.name;
            this.customerPhone = res.data.data.mobile;
          }else {
            this.customerId = res.data.data.customerId;
            this.admin = res.data.data.adminName;
            this.customerName = res.data.data.customerName;
            this.customerNumber = res.data.data.customerNumber;
            this.customerPhone = res.data.data.customerPhone;
            this.customerAddress = res.data.data.customerAddress;
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
