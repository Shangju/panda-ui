<template>
  <div>
    <li class="p-item" v-show="product.goodsId !== ''" v-for="product in productList" :key="product.goodsId">
      <div class="p-img-con">
        <a class="link" @click="goProductDetailPage(product.goodsId)">
          <img class="p-img" :src="product.image" alt="name"/>
        </a>
      </div>
      <div class="p-price-con">
        <span class="p-price">{{product.sellPrice | formatMoney}}</span>
      </div>
      <div class="p-name-con">
        <a class="p-name" @click="goProductDetailPage(product.goodsId)">{{product.goodsName}}</a>
      </div>
    </li>

    <div class="page-bar" v-show = "productList.length > 0">
      <ul>
        <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
        <li v-if="cur==1"><a class="banclick">上一页</a></li>
        <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
          <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
        <li v-if="cur == all"><a class="banclick">下一页</a></li>
        <li><a>共<i>{{all}}</i>页</a></li>
      </ul>
    </div>

    <p class="err-tip" v-show="productList === null || productList.length < 1">很抱歉，实在找不到您要的商品。</p>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        queryInfo: {
          keyword: '',
          pageNum: '1',
          pageSize: '10',
          orderBy: 'name asc'
        },
        productList: [],
        all: 0, //总页数
        cur: 1  //当前页码
      };
    },
    created() {
      this.$pcBus.$on('productSort', (orderBy) => {
        this.queryInfo.orderBy = orderBy;
        this.queryProductList();
      });
      this.$pcBus.$on('searchProduct', () => {
        this.getAllPage();
        this.queryProductList();
      });
      //初始化列，显示10条信息
      this.queryProductList();
      // 获取页数
      this.getAllPage();
    },
    activated() {
    },
    computed: {
      indexs: function(){
        let left = 1;
        let right = this.all;
        let ar = [];
        if(this.all>= 5){
          if(this.cur > 3 && this.cur < this.all-2){
            left = this.cur - 2;
            right = this.cur + 2
          }else{
            if(this.cur<=3){
              left = 1;
              right = 5
            }else{
              right = this.all;
              left = this.all -4
            }
          }
        }
        while (left <= right){
          ar.push(left);
          left ++
        }
        return ar
      }
    },
    methods: {
      goProductDetailPage(goodsId) {
        this.loadPage('goodsDetail', {'goodsId': goodsId});
      },
      getAllPage(){
        let keyword= this.getUrlParam('keyword');
        let info = {keyword:keyword};
        this.$axios.post(
          this.global.baseUrl + '/getAllPage',
          info
        ).then((res) => {
          if (res.data.code === 200){
            this.all = res.data.data;
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
        // 获取分页的开始与结束行
        let staNum = (this.cur - 1) * 10;
        let endNum = this.cur * 10;
        let keyword = this.getUrlParam("keyword");
        let orderBy = this.queryInfo.orderBy;

        let num = {keyword: keyword, staNum: staNum, endNum: endNum, orderBy: orderBy};
        this.$axios.post(
          this.global.baseUrl + '/getLimitPage',
          num
        ).then((res) => {
          // console.log(res.data.data);
          if(res.data.code === 200){
            this.productList = res.data.data;
          }else {
            this.productList = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      pageClick: function(){
        // 获取分页的开始与结束行
        let staNum = (this.cur - 1) * 10;
        let endNum = this.cur * 10;
        let keyword = this.getUrlParam("keyword");
        let orderBy = this.queryInfo.orderBy;

        let num = {keyword: keyword, staNum: staNum, endNum: endNum, orderBy: orderBy};
        this.$axios.post(
          this.global.baseUrl + '/getLimitPage',
          num
        ).then((res) => {
          // console.log(res.data.data);
          if(res.data.code === 200){
            this.productList = res.data.data;
          }else {
            this.productList = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      queryProductList() {
        this.queryInfo.keyword = this.getUrlParam('keyword');
        this.$axios.post(
          this.global.baseUrl + '/goodsList',
          this.queryInfo
        ).then((res) => {
          // alert(JSON.stringify(res.data));
          if (res.data.code === 200){
            this.productList = res.data.data;
            this.cur = 1;
          }else {
            this.productList = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .page-bar{
    margin:40px;
  }
  ul,li{
    margin: 0px;
    padding: 0px;
  }
  li{
    list-style: none
  }
  .page-bar li:first-child>a {
    margin-left: 0px
  }
  .page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
  }
  .page-bar a:hover{
    background-color: #eee;
  }
  .page-bar a.banclick{
    cursor:not-allowed;
  }
  .page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>
