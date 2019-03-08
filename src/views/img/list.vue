<template>
  <div>
    <li class="p-item" v-show="product.goodsId !== ''" v-for="product in productList" :key="product.goodsId">
      <div class="p-img-con">
        <a class="link" @click="goProductDetailPage(product.goodsId)">
          <img class="p-img" :src="product.image" alt="name"/>
        </a>
      </div>
      <div class="p-price-con">
        <span class="p-price">￥{{product.sellPrice}}</span>
      </div>
      <div class="p-name-con">
        <a class="p-name" @click="goProductDetailPage(product.goodsId)">{{product.goodsName}}</a>
      </div>
    </li>
    <p class="err-tip" v-show="productList === null || productList.length < 1">很抱歉，实在找不到您要的商品。</p>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        queryInfo: {
          categoryId: '',
          keyword: '',
          pageNum: '1',
          pageSize: '10',
          orderBy: 'name asc'
        },
        productList: []
      };
    },
    created() {
      // this.$pcBus.$on('productSort', (orderBy) => {
      //   console.info('$on(\'productSort\'');
      //   this.queryInfo.orderBy = orderBy;
      //   this.queryProductList();
      // });
      // this.$pcBus.$on('searchProduct', () => {
      //   console.info('$on searchProduct');
      //   this.queryProductList();
      // });
      this.queryProductList();
    },
    activated() {
      this.queryProductList();
    },
    methods: {
      goProductDetailPage(goodsId) {
        this.loadPage('goodsDetail', {'goodsId': goodsId});
      },
      queryProductList() {
        this.queryInfo.categoryId = this.getUrlParam('categoryId');
        this.queryInfo.keyword = this.getUrlParam('keyword');
        this.$axios.post(
          this.global.baseUrl + '/goodsList',
          this.queryInfo
        ).then((res) => {
          // alert(JSON.stringify(res.data));
          console.log(this);
          if(res.data.data.length < 1 ){
            this.productList = [];
          }else {
            // for(let i = 0;i<res.data.data.length;i++){
            //   this.productList[i].id = res.data.data[i].goodsId;
            //   this.productList[i].name = res.data.data[i].goodsName;
            //   this.productList[i].mainImage = res.data.data[i].image;
            //   this.productList[i].price = res.data.data[i].sellPrice;
            // }
            this.productList = res.data.data;
            // console.log(this.productList)
          }
        }).catch(function (res) {
          alert(res);
        })

      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
