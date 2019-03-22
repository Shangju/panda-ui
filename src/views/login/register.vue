<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">用户注册</h3>
    <el-form-item prop="name">
      <el-input type="text"  v-model="loginForm.adminName" auto-complete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.userPassword"  auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input type="text" v-model="loginForm.userPhone" auto-complete="off" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item >
      <el-col :span="12">
        <el-form-item prop="captcha">
          <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
                    style="width: 100%;">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item>
          <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
        </el-form-item>
      </el-col>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:40%; margin-left:200px" @click.native.prevent="reset">注册</el-button>
      <!--<el-button type="primary" style="width:40%;" @click.native.prevent="login" :loading="logining">登 录</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        logining: false,
        loginForm: {
          adminName: '',
          userPassword: '',
          userPhone:'',
          captcha:'',
          src:this.global.baseUrl + "/captcha.jpg"
        },
        fieldRules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },
        checked: true
      };
    },
    methods: {
      refreshCaptcha: function(){
        this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
      },
      reset() {
        let userInfo = {
          adminName: this.loginForm.adminName,
          userPassword: this.loginForm.userPassword,
          userPhone: this.loginForm.userPhone,
          captcha: this.loginForm.captcha
        };
        // 定义一个变量指向vue实例
        let self = this;
        this.$axios.post(this.global.baseUrl+'/sys/register',userInfo).then(function (res) {
          if(res.data.code === 200){
            //跳向注册成功界面
            self.loadPage('result', {'type': 'user-register'});
          }else {
            alert(res.data.msg);
          }
        }).catch(function (res) {
          alert("系统内部异常，请联系管理员");
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
