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
          <span>运输方式:</span>
          <span class="submit-total">{{shipType}}</span>
          <span>订单总价:</span>
          <span class="submit-total">{{totalPrice}}</span>
          <span class="btn order-submit" @click="createOrderDoc">前往支付</span>
        </div>
      </div>
    </div>
    <div class="modal-wrap">
    </div>
    <div v-html="message">{{message}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from '@/components/layout/nav-side';
  import pcProductList from '@/components/order/product-list';
  import pcAddressList from '@/components/order/address-list';

  export default {
    data() {
      return {
        // addressList: [{
        //   provinceName:'',
        //   cityName:'',
        //   receiverName:''
        // }],
        addressList:[],
        orderItemVoList: [],
        productTotalPrice: 0,
        addressId: '',
        totalNum:0,
        totalPrice:0,
        message:'',
        shipType:''
      };
    },
    created() {
      this.queryAddressList();
      this.queryOrderItemVoList();
      this.createOrderPay();
    },
    methods: {
      selectAddress(addressId) {
        console.info(addressId);
        this.addressId = addressId;
      },
      queryAddressList() {
        this.$axios.post(
          this.global.baseUrl + '/getAddressList',
        ).then((res) => {
          if (res.data.code === 200) {
            console.log(res.data);
            this.addressList = res.data.data;
          } else {
            this.addressList = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      queryOrderItemVoList() {
        this.$axios.post(
          this.global.baseUrl + '/getOrderGoods',
        ).then((res) => {
          if (res.data.code === 200) {
            // alert(JSON.stringify(res.data));
            console.log(res.data);
            this.orderItemVoList = res.data.data.orderGoods;
            for(let i = 0; i < this.orderItemVoList.length; i++){
              this.totalPrice = res.data.data.totalPrice;
              this.shipType = res.data.data.orderType;
            }
          } else {
            this.orderItemVoList = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      createOrderPay(){
        this.$axios.post(
          this.global.baseUrl+'/createOrderPay'
        ).then((res) => {
          this.message = res.data.msg;
          // alert(this.message)
        }).catch(function (res) {
          alert(res);
        });
      },
      createOrderDoc() {
        let orderId = this.orderItemVoList[0].orderId;
        if (!this.addressId) {
          alert('请选择发货地址');
          return;
        }else {
          // this.loadPage('orderPayment',{'orderId': orderId});
          document.forms[0].submit();
        }

        let info = {order:this.orderItemVoList[0].orderId}
        // this.$axios.post(
        //   this.global.baseUrl + '/payMoney',
        // ).then((res) => {
        //   if (res.data.code === 200) {
        //     this.loadPage('orderPayment', {'orderId': orderId});
        //   }
        // }).catch(function (res) {
        //   alert(res);
        // })
      }
    },
    components: {
      pcNavSide,
      pcProductList,
      pcAddressList
    }
  };
</script>
