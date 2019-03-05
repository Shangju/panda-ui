<template>
  <div>
    <div class="crumb">
      <div class="w">
        <div class="crumb-con">
          <a class="link" href="javascript:void(0)" @click.prevent="goHome">PCMall</a>
          <span>></span>
          <span class="link-text">{{$route.meta.name}}</span>
        </div>
      </div>
    </div>
    <div class="pass-update-wrap w">
      <pc-nav-side></pc-nav-side>
      <div class="content with-nav">
        <div class="panel">
          <div class="panel-title">修改密码</div>
          <div class="panel-body">
            <div class="user-info">
              <div class="form-line">
                <span class="label">原密码：</span>
                <input type="password" class="input" v-model="passwordOld" name="passwordOld" autocomplete="off"/>
              </div>
              <div class="form-line">
                <span class="label">新密码：</span>
                <input type="password" class="input" v-model="passwordNew" autocomplete="off"/>
              </div>
              <div class="form-line">
                <span class="label">确认密码：</span>
                <input type="password" class="input" v-model="passwordConfirm" autocomplete="off"/>
              </div>
              <span class="btn btn-submit"  @click="updatePassword()">提交</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from '@/components/layout/nav-side';
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        passwordOld:'',
        passwordNew:'',
        passwordConfirm:'',
      };
    },
    created() {
    },
    methods: {
      updatePassword(){
        let password = {
          passwordOld: this.passwordOld,
          passwordNew: this.passwordNew,
          passwordConfirm: this.passwordConfirm
        };
        let self = this; // 定义一个变量指向vue实例
        this.$axios.post(
          this.global.baseUrl + '/updatePassword',
          password
        ).then((res) => {
          alert(res.data.msg);
          if(res.data.msg == "密码修改成功，请重新登录。"){
            Cookies.remove("token");
            self.$router.push('/test'); // 登录成功，跳转到主页
          }
        }).catch(function (res) {
          alert(res);
        })
      }
    },
    components: {
      pcNavSide
    }
  };
</script>
