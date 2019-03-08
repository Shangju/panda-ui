<template>
  <div class="nav">
    <div class="w">
      <div class="user-info">
                <span class="user not-login" v-show="isNotActive">
                    <span class="link js-login" @click="loadPage('login')">登录</span>
                    <span class="link js-register" @click="loadPage('Register')">注册</span>
                </span>
        <span class="user login" v-show="isActive">
        <span class="link-text">
        欢迎，
        <span class="username">{{userName}}</span>
        </span>
        <span class="link js-logout" @click.prevent="logout">退出</span>
        </span>
        <ul class="nav-list">
          <!--<li class="nav-item">-->
          <!--<a class="link" @click="loadPage('user-cart')">-->
          <!--<i class="fa fa-shopping-cart"></i>-->
          <!--购物车(<span class="cart-count">{{cartList.length}}</span>)-->
          <!--</a>-->
          <!--</li>-->
          <li class="nav-item">
            <a class="link" href="javascript:void(0)" @click.prevent="loadPage('userCart')">购物车</a>
          </li>
          <li class="nav-item">
            <a class="link" href="javascript:void(0)" @click.prevent="loadPage('userOrder')">我的订单</a>
          </li>
          <li class="nav-item">
            <a class="link" href="javascript:void(0)" @click.prevent="loadPage('userCenter')">我的PCMall</a>
          </li>
          <li class="nav-item">
            <a class="link" href="javascript:void(0)" @click.preventk="loadPage('about')">关于PCMall</a>
          </li>
        </ul>
      </div>
      <!--<ul class="nav-list">-->
        <!--<li class="nav-item">-->
          <!--<a class="link" @click="loadPage('user-cart')">-->
            <!--<i class="fa fa-shopping-cart"></i>-->
            <!--购物车(<span class="cart-count">{{cartList.length}}</span>)-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
          <!--<a class="link" href="javascript:void(0)" @click.prevent="loadPage('user-order')">我的订单</a>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
          <!--<a class="link" href="javascript:void(0)" @click.prevent="loadPage('user-center')">我的PCMall</a>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
          <!--<a class="link" href="javascript:void(0)" @click.preventk="loadPage('about')">关于PCMall</a>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  export default {
    data(){
      return{
        isNotActive: true,
        isActive:false,
        userName:''
      }
    },
    mounted(){
      this.getUserInfo();
    },
    methods: {
      getUserInfo(){
        this.$axios.post(
          this.global.baseUrl + '/userInfo'
        ).then((res) => {
          // alert(JSON.stringify(res.data));
          if (res.data.msg == null) {
            this.userName = res.data.data.userId;
            this.isNotActive = false;
            this.isActive = true;
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      logout() {
        this.$confirm("确认退出吗?", "提示", {
          type: "warning"
        }).then(() => {
            // sessionStorage.removeItem("user");
            Cookies.remove('token');
            // this.$router.push("/login");
          // window.location.reload();
          window.location.href = "/";
          }).catch(() => {})
      }
    }
  };
</script>
