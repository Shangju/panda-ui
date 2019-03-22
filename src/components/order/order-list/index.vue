<template>
  <div>
    <table class="order-list-table header">
      <tr>
        <th class="cell cell-img">&nbsp;</th>
        <th class="cell cell-info">商品信息</th>
        <th class="cell cell-price">单价</th>
        <th class="cell cell-count">数量</th>
        <th class="cell cell-total">小计</th>
      </tr>
    </table>
    <!--#list-->
    <table class="order-list-table order-item">
      <div v-for="order in orderVoList" :key="order.id">
        <tr>
          <td colspan="5" class="order-info">
                    <span class="order-text">
                        <span>订单号：</span>
                        <a class="link order-num"
                           @click="toDetailPage(order.orderId)">{{order.orderId}}</a>
                    </span>
            <span class="order-text">{{renderTime(order.createTime)}}</span>
            <span class="order-text">收件人：{{order.userName}}</span>
            <span class="order-text">订单状态：{{order.status}}</span>
            <span class="order-text">
                    <span>订单总价：</span>
                    <span class="order-total">{{order.totalPrice}}</span>
                    </span>
            <a class="link order-detail" @click="toDetailPage(order.orderId)">查看详情></a>
          </td>
        </tr>
        <tr v-for="detail in order.orderGoods" :key="detail.productId">
          <td class="cell cell-img">
            <a @click="toDetailPage(order.orderId)" target="_blank">
              <img class="p-img" :src="detail.mainImage" :alt="detail.productName"/>
            </a>
          </td>
          <td class="cell cell-info">
            <a class="link" @click="toDetailPage(order.orderId)" target="_blank">{{detail.productName}}</a>
          </td>
          <td class="cell cell-price">{{detail.productPrice}}</td>
          <td class="cell cell-count">{{detail.quantity}}</td>
          <td class="cell cell-total">{{detail.quantity * detail.productPrice}}</td>
        </tr>
      </div>
    </table>
    <!--/list-->
    <!--^list-->
    <p v-if="orderVoList.length === 0" class="err-tip">您暂时还没有订单</p>
    <!--/list-->
  </div>

</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      orderVoList: {
        type: Array,
        required: false
      }
    },
    methods: {
      toDetailPage(orderId) {
        this.loadPage('orderDetail', {'orderId': orderId});
      },
      renderTime(date) {
        let dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
