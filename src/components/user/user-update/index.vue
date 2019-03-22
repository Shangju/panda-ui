<template>
  <div class="user-info">
    <el-form :label-position="labelPosition" label-width="100px" :model="updateUserForm">
      <el-form-item label="用户编号">
        <el-input v-model="updateUserForm.userId" class="form-line-input" :disabled="true"/>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="updateUserForm.adminName" class="form-line-input" :disabled="true"/>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="updateUserForm.userName" class="form-line-input"/>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="updateUserForm.userNum" class="form-line-input"/>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="updateUserForm.userPhone" class="form-line-input"/>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="updateUserForm.cityName" placeholder="一级地址，如：重庆，北京"  class="form-line-input"/>
        <el-input v-model="updateUserForm.areaName" placeholder="二级地址，如：南岸，北碚"  class="form-line-input"/>
        <el-input v-model="updateUserForm.userAddress" placeholder="详细收货地址" class="form-line-input"/>
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
          userId:'',
          adminName:'',
          userName:'',
          userNum:'',
          userPhone:'',
          userAddress:'',
          cityName:'',
          areaName:''
        }
      };
    },
    created() {
      this.UserInfo();
    },
    methods: {
      updateUserInfo() {
        let userInfo = {
          userId: this.updateUserForm.userId, adminName: this.updateUserForm.adminName,
          userName: this.updateUserForm.userName, userNum: this.updateUserForm.userNum,
          userPhone: this.updateUserForm.userPhone, userAddress: this.updateUserForm.userAddress
        };
        let addressInfo = {
          userId: this.updateUserForm.userId ,userName:this.updateUserForm.userName,
          cityName: this.updateUserForm.cityName,areaName:this.updateUserForm.areaName,
          userAddress: this.updateUserForm.userAddress
        };
        this.$axios.post(
          this.global.baseUrl + '/updateUserInfo',
          userInfo
        ).then((res) => {
          // alert(JSON.stringify(res.data));
            if(res.data.code === 200) {
              this.updateUserForm.userId = res.data.data.userId;
              this.updateUserForm.adminName = res.data.data.adminName;
              this.updateUserForm.userName = res.data.data.userName;
              this.updateUserForm.userNum = res.data.data.userNum;
              this.updateUserForm.userPhone = res.data.data.userPhone;
              this.updateUserForm.userAddress = res.data.data.userAddress;
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
          if (res.data.code === 200) {
            this.updateUserForm.userId = res.data.data.userId;
            this.updateUserForm.adminName = res.data.data.adminName;
            this.updateUserForm.userName = res.data.data.userName;
            this.updateUserForm.userNum = res.data.data.userNum;
            this.updateUserForm.userPhone = res.data.data.userPhone;
            this.updateUserForm.userAddress = res.data.data.userAddress;
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
