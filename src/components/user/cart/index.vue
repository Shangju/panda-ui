<template>
  <div>
    <div id="cart_table" v-show="isShowCart">
      <div class="cart-header">
        <table class="cart-table">
          <tr>
            <th class="cart-cell cell-check">
              <label class="cart-label">
                <input type="checkbox" class="cart-select-all" v-model="checkedAllFlag" @click="selectAll"/>
                <span>全选</span>
              </label>
            </th>
            <th class="cart-cell cell-info">商品信息</th>
            <th class="cart-cell cell-price">单价</th>
            <th class="cart-cell cell-count">数量</th>
            <th class="cart-cell cell-total">合计</th>
            <th class="cart-cell cell-opera">操作</th>
          </tr>
        </table>
      </div>
      <div class="cart-list">
        <table class="cart-table" data-product-id="productId">
          <tr v-for="cart in cartList" :key="cart.productId">
            <td class="cart-cell cell-check">
              <label class="cart-label">
                <input type="checkbox" class="cart-select" @click="selectProduct(cart)" v-model="cart.checked"/>
              </label>
            </td>
            <td class="cart-cell cell-img">
              <a class="link" @click="loadPage('goodsDetail', {'goodsId': cart.productId})">
                <img class="p-img" :src="cart.mainImage" alt="productName"/>
              </a>
            </td>
            <td class="cart-cell cell-info">
              <a class="link" @click="loadPage('goodsDetail', {'goodsId': cart.productId})">{{cart.productName}}</a>
            </td>
            <td class="cart-cell cell-price">{{cart.productPrice}}</td>
            <td class="cart-cell cell-count">
              <span class="count-btn minus" @click="actionCart(cart.productId, 'minus_count')">-</span>
              <input class="count-input" :value="cart.quantity" data-max="cart.productStock"/>
              <span class="count-btn plus" @click="actionCart(cart.productId, 'plus_count')">+</span>
            </td>
            <td class="cart-cell cell-total">{{cart.productPrice * cart.quantity}}</td>
            <td class="cart-cell cell-opera">
              <span class="link cart-delete" @click="actionCart(cart.productId, 'delete_product')">删除</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="cart-footer">
        <div class="select-con">
          <label>
            <input type="checkbox" class="cart-select-all" v-model="checkedAllFlag" @click="selectAll"/>
            <span>全选</span>
          </label>
        </div>
        <div class="delete-con">
                    <span class="link delete-selected">
                    <i class="fa fa-trash-o"></i>
                    <span @click="deleteSelectProduct">删除选中</span>
                    </span>
        </div>
        <div class="submit-con">
          <div v-if="">
            <span>已选择{{totalNum}}件商品</span>
            <span>总价：</span>
            <span class="submit-total">{{totalPrice}}</span>
            <span @click="loadPage('orderConfirm')" class="btn btn-submit">去结算</span>
          </div>
        </div>
      </div>
    </div>
    <p v-show="cartList.length === 0" class="err-tip">
      <span>您的购物车空空如也，</span>
      <a style="cursor: pointer;" @click="goHome">立即去购物</a>
    </p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isShowCart:true,
        checkedAllFlag: true,
        userCart: [],
        selectProductIdArr: [],
        cartList:[],
        totalNum:0,
        totalPrice:0
      };
    },
    created() {
      this.getCartInfo();
      // this.isCheckAll();
    },
    activated() {
      // this.isCheckAll();
    },
    computed: {

    },
    filters: {},
    methods: {
      getCartInfo(){
        this.$axios.post(
          this.global.baseUrl + '/getCartInfo',
        ).then((res) => {
          if (res.data.code === 200) {
            // alert(JSON.stringify(res.data));
            this.cartList = res.data.data;
            for(let i = 0; i < this.cartList.length; i++){
              this.totalNum = this.totalNum + this.cartList[i].quantity;
              this.totalPrice = this.totalPrice + this.cartList[i].productPrice * this.cartList[i].quantity;
            }
          } else {
            this.cartList = [];
            this.isShowCart = false;
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      selectProduct(item) {
        if(item.checked === false){
          item.checked = true;
          this.checkedAllFlag = false;
          this.totalNum = this.totalNum + item.quantity;
          this.totalPrice = this.totalPrice + item.quantity * item.productPrice;
        }else {
          item.checked = false;
          this.checkedAllFlag = false;
          this.totalNum = this.totalNum - item.quantity;
          this.totalPrice = this.totalPrice - item.quantity * item.productPrice;
        }
      },
      isCheckAll() {
        this.checkedAllFlag = 1;
        for (let index in this.cartList) {
          let item = this.cartList[index];
          if (typeof item.checked === 'undefined' || item.checked === 0) {
            this.checkedAllFlag = '';
            break;
          }
        }
      },
      selectAll(event) {
        let checkedAll = event.currentTarget.checked;{
          for (let item of this.cartList) {
            if (this.checkedAllFlag === true) {
              item.checked = false;
            } else {
              item.checked = true;
            }
          }
          if(this.checkedAllFlag === true){
            this.checkedAllFlag = false;
            this.totalNum = 0;
            this.totalPrice = 0;
          }else {
            this.checkedAllFlag = true;
            for(let i = 0; i < this.cartList.length; i++){
              this.totalNum = this.totalNum + this.cartList[i].quantity;
              this.totalPrice = this.totalPrice + this.cartList[i].productPrice * this.cartList[i].quantity;
            }
          }
        }
      },
      getCartIndex(id) {
        let index = -1;
        let list = this.cartList;
        for (let i = 0; i < list.length; i++) {
          if (list[i].productId === id) {
            index = i;
            break;
          }
        }
        return index;
      },
      /**
       * 购物车加减删操作
       * @param  {number} index 当前操作的索引
       * @param  {string} type  对应的mutations值[plus_count增加, minus_count 减少, delete_product 删除]
       */
      actionCart(productId, type) {
        // if(type === "minus_count"){
        //   this.totalNum--;
        // }else if(type === "plus_count"){
        //   this.totalNum++;
        // }
        let cartInfo = {productId: productId, type: type};
        this.$axios.post(
          this.global.baseUrl + '/actionCart',
          cartInfo
        ).then((res) => {
          if (res.data.code === 200) {
            // alert(JSON.stringify(res.data));
            this.cartList = res.data.data;
            this.totalPrice = 0;
            this.totalNum = 0;
            for(let i = 0; i < this.cartList.length; i++){
              this.totalNum = this.totalNum + this.cartList[i].quantity;
              this.totalPrice = this.totalPrice + this.cartList[i].productPrice * this.cartList[i].quantity;
            }
          } else {
            this.cartList = [];
            this.isShowCart = false;
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      deleteSelectProduct() {
        this.$axios.post(
          this.global.baseUrl + '/cart/deleteSelectProduct',
          this.cartList
        ).then((res) => {
          if (res.data.code === 200) {
            // alert(JSON.stringify(res.data));
            this.cartList = res.data.data;
            this.totalPrice = 0;
            this.totalNum = 0;
            for(let i = 0; i < this.cartList.length; i++){
              this.totalNum = this.totalNum + this.cartList[i].quantity;
              this.totalPrice = this.totalPrice + this.cartList[i].productPrice * this.cartList[i].quantity;
            }
          } else {
            this.cartList = [];
            this.isShowCart = false;
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
