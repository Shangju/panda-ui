let mixin = {
  data() {
    return {};
  },
  methods: {
    // 此方法获取url后面的值
      getUrlParam(name) {
      // let reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)");
        // console.log(reg);
        // let result = window.location.search.substr(1).match(reg);
        // console.log(result);
        // return result ? decodeURIComponent(result[2]) : null;

        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?");
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        var arr=str.split("&"); //各个参数放到数组里
        // console.log(arr);
        for(var i=0;i < arr.length;i++){
            var result = arr[i].split("=");
            if(result[0] == name){
              return decodeURI(result[1]);
            }
        }
    },
    // 此方法用来跳转页面
    loadPage(routerName, param) {
      if (param) {
        this.$router.push({name: routerName, query: param});
      } else {
        this.$router.push({name: routerName});
      }
    },
    successTips(msg) {
      alert(msg || '操作成功！');
    },
    errorTips(msg) {
      alert(msg || '哪里不对了~');
    },
    goBack() {
      this.$router.go(-1);
    },
    //回到主页
    goHome() {
      // this.loadPage('/');
      window.location.href = "/";
    },
    goSignIn() {
      this.$router.push('/login')  // 注册成功，跳转到登录界面
    },
    goSignUp() {
      if (process.env.NODE_ENV === 'production') {
        window.location.href = 'http://login.paascloud.net/register';
      } else {
        window.location.href = 'http://dev-login.paascloud.net/register';
      }
    },

    // 字段的验证，支持非空、手机、邮箱的判断
    validate(value, type) {
      // 非空验证
      if (type === 'require') {
        return !!value;
      }
      // 手机号验证
      if (type === 'phone') {
        return /^1\d{10}$/.test(value);
      }
      // 邮箱格式验证
      if (type === 'email') {
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
      }
    }
  }
};

export default mixin;
