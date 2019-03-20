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
    <div class="confirm-wrap w">
      <div class="panel panel-color panel-padding">
        <h1 class="panel-title panel-padding">收货地址</h1>
        <div class="panel-body address-list panel-padding">
          <template v-if="addressList.length">
            <pc-address-list :addressList="addressList" :selectAddress="selectAddress"/>
          </template>
        </div>
      </div>
      <div class="panel panel-color panel-padding">
        <h1 class="panel-title panel-padding">商品清单</h1>
        <div class="panel-body product-con panel-padding">
          <pc-product-list :orderItemVoList="orderItemVoList"/>
        </div>
        <div class="submit-con" v-show="orderItemVoList.length > 0">
          <span>订单总价:</span>
          <span class="submit-total">{{totalPrice}}</span>
          <span class="btn order-submit" @click="createOrderDoc">前往支付</span>
        </div>
      </div>
    </div>
    <div class="modal-wrap">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from '@/components/layout/nav-side';
  import pcProductList from '@/components/order/product-list';
  import pcAddressList from '@/components/order/address-list';

  export default {
    data() {
      return {
        addressList: [{
          provinceName:'',
          cityName:'',
          receiverName:''
        }],
        orderItemVoList: [],
        productTotalPrice: 0,
        addressId: '',
        totalNum:0,
        totalPrice:0

      };
    },
    created() {
      this.queryAddressList();
      this.queryOrderItemVoList();
    },
    methods: {
      selectAddress(addressId) {
        console.info(addressId);
        this.addressId = addressId;
      },
      queryAddressList() {
      },
      queryOrderItemVoList() {
        this.$axios.post(
          this.global.baseUrl + '/getOrderGoods',
        ).then((res) => {
          if (res.data.code === 200) {
            // alert(JSON.stringify(res.data));
            this.orderItemVoList = res.data.data;
            for(let i = 0; i < this.orderItemVoList.length; i++){
              this.totalNum = this.totalNum + this.orderItemVoList[i].quantity;
              this.totalPrice = this.totalPrice + this.orderItemVoList[i].productPrice * this.orderItemVoList[i].quantity;
            }
          } else {
            this.orderItemVoList = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      createOrderDoc() {
        if (!this.addressId) {
          alert('请选择发货地址');
          return;
        }
      }
    },
    components: {
      pcNavSide,
      pcProductList,
      pcAddressList
    }
  };
</script>
