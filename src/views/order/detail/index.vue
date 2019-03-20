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
    <div class="order-detail-wrap w">
      <pc-nav-side></pc-nav-side>
      <div class="content with-nav">
        <div class="panel">
          <div class="panel-title">订单信息</div>
          <div class="panel-body">
            <div class="order-info">
              <div class="text-line">
                <span class="text">订单号：{{orderVo.orderId}}</span>
                <span class="text">创建时间：{{orderVo.createTime}}</span>
              </div>
              <div class="text-line">
                                <span class="text">
                                    收件人：
                                    {{orderVo.customerName}}
                                  <!--{{orderVo.shippingVo.receiverProvince}}-->
                                  <!--{{orderVo.shippingVo.receiverCity}}-->
                                  <!--{{orderVo.shippingVo.receiverAddress}}-->
                                  <!--{{orderVo.shippingVo.receiverMobile}}-->
                                </span>
              </div>
              <div class="text-line">
                <span class="text">订单状态： {{orderVo.status}}</span>
              </div>
              <div class="text-line">
                <span class="text">支付方式：{{orderVo.paymentTypeDesc}}</span>
              </div>
              <div class="text-line" v-if="orderVo.status === 10">
                <a class="btn" @click="loadPage('order-payment', {'orderNo': orderVo.orderNo})">去支付</a>
                <a class="btn order-cancel" @click="cancelOrder(orderVo.orderNo)">取消订单</a>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">商品清单</div>
          <div class="panel-body">
            <table class="product-table">
              <tr>
                <th class="cell-th cell-img">&nbsp;</th>
                <th class="cell-th cell-info">商品信息</th>
                <th class="cell-th cell-price">单价</th>
                <th class="cell-th cell-count">数量</th>
                <th class="cell-th cell-total">小计</th>
              </tr>
              <tr v-for="detail in orderVo.orderGoods" :key="detail.id">
                <td class="cell cell-img">
                  <a href="javascript:void(0)" @click="goProductDetailPage(detail.productId)" target="_blank">
                    <img class="p-img" :src="detail.mainImage" :alt="detail.productName"/>
                  </a>
                </td>
                <td class="cell cell-info">
                  <a class="link" href="javascript:void(0)" @click="goProductDetailPage(detail.productId)" target="_blank">{{detail.productName}}</a>
                </td>
                <td class="cell cell-price">{{detail.productPrice}}</td>
                <td class="cell cell-count">{{detail.quantity}}</td>
                <td class="cell cell-total">{{detail.quantity * detail.productPrice}}</td>
              </tr>
            </table>
            <p class="total">
              <span>订单总价：</span>
              <span class="total-price">{{totalPrice}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from '@/components/layout/nav-side';

  export default {
    data() {
      return {
        orderVo: {},
        totalNum:0,
        totalPrice:0
      };
    },
    created() {
      this.queryOrderItemVoList();
    },
    activated() {
    },
    methods: {
      goProductDetailPage(productId) {
        this.loadPage('goodsDetail', {'goodsId': productId});
      },
      queryOrderItemVoList() {
        let orderId = {orderId:this.getUrlParam("orderId")};
        this.$axios.post(
          this.global.baseUrl + '/getSingleOrders',
          orderId
        ).then((res) => {
          if (res.data.code === 200) {
            console.log(res.data);
            this.orderVo = res.data.data;
            for (let i = 0; i < this.orderVo.orderGoods.length; i++) {
              this.totalNum = this.totalNum + this.orderVo.orderGoods[i].quantity;
              this.totalPrice = this.totalPrice + this.orderVo.orderGoods[i].productPrice * this.orderVo.orderGoods[i].quantity;
            }
          } else {
            this.orderVo = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      },
      cancelOrder(orderNo) {
        if (!orderNo) {
          alert('订单号不能为空');
          return;
        }
        if (window.confirm('确实要取消该订单？')) {
          this.ajax({
            url: `/omc/order/cancelOrderDoc/` + orderNo,
            success: (res) => {
              if (res.code === 200) {
                this.goBack();
              }
            }
          });
        }
      }
    },
    components: {
      pcNavSide
    }
  };
</script>
