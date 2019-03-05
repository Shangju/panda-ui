<template>
  <div class="user-info">
    <el-form :label-position="labelPosition" label-width="100px" :model="updateUserForm">
      <el-form-item label="用户编号">
        <el-input v-model="updateUserForm.customerId" class="form-line-input" :disabled="true"/>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="updateUserForm.admin" class="form-line-input" :disabled="true"/>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="updateUserForm.customerName" class="form-line-input"/>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="updateUserForm.customerNumber" class="form-line-input"/>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="updateUserForm.customerPhone" class="form-line-input"/>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="updateUserForm.customerAddress" class="form-line-input"/>
      </el-form-item>

    </el-form>
    <a class="btn btn-submit" @click="updateUserInfo">保存</a>
  </div>
</template>
<script type="text/ecmascript-6">
  // import {gbs} from '../../../util/settings';
  export default {
    data() {
      return {
        errMsg: '',
        labelPosition: 'right',
        updateUserForm: {
          customerId: '',
          admin:'',
          customerName: '',
          customerNumber: '',
          customerPhone: '',
          customerAddress:''
        }
      };
    },
    created() {
      this.UserInfo();
    },
    methods: {
      updateUserInfo() {
        let userInfo = {
          customerId: this.updateUserForm.customerId, adminName: this.updateUserForm.admin,
          customerName: this.updateUserForm.customerName, customerNumber: this.updateUserForm.customerNumber,
          customerPhone: this.updateUserForm.customerPhone, customerAddress: this.updateUserForm.customerAddress
        };
        this.$axios.post(
          this.global.baseUrl + '/updateUserInfo',
          userInfo
        ).then((res) => {
          // alert(JSON.stringify(res.data));
            this.updateUserForm.customerId = res.data.data.customerId;
            this.updateUserForm.admin = res.data.data.adminName;
            this.updateUserForm.customerName = res.data.data.customerName;
            this.updateUserForm.customerNumber = res.data.data.customerNumber;
            this.updateUserForm.customerPhone = res.data.data.customerPhone;
            this.updateUserForm.customerAddress = res.data.data.customerAddress;
            if(res.data.code == 200) {
              alert("资料更新成功");
            }
        }).catch(function (res) {
          alert(res);
        })
      },
      UserInfo() {
        this.$axios.post(
          this.global.baseUrl + '/getUserInfo'
        ).then((res) => {
          // alert(JSON.stringify(res.data));
          if (res.data.msg != null) {
            this.updateUserForm.customerId = res.data.data.userId;
            this.updateUserForm.admin = res.data.data.name;
            this.updateUserForm.customerPhone = res.data.data.mobile;
          }else {
            this.updateUserForm.customerId = res.data.data.customerId;
            this.updateUserForm.admin = res.data.data.adminName;
            this.updateUserForm.customerName = res.data.data.customerName;
            this.updateUserForm.customerNumber = res.data.data.customerNumber;
            this.updateUserForm.customerPhone = res.data.data.customerPhone;
            this.updateUserForm.customerAddress = res.data.data.customerAddress;
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
  .user-info .error-item {
    position: relative;
    padding: 4px 0 4px 40px;
    margin-bottom: 10px;
    border: 1px solid red;
    color: red;
    background: #fde9e9;
  }
</style>
