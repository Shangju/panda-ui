<template>
  <div>
    <div class="crumb">
      <div class="w">
        <div class="crumb-con">
          <!--<a class="link" href="javascript:void(0)" @click.prevent="goHome">PCMall</a>-->
          <a class="link" href="/">PCMall</a>
          <span>></span>
          <span class="link-text">{{$route.meta.name}}</span>
        </div>
      </div>
    </div>
    <div class="order-list-wrap w">
      <pc-nav-side/>
      <div class="content with-nav">
        <div class="panel">
          <div class="panel-title">{{$route.meta.name}}</div>
          <div class="panel-body">
            <div class="order-list-con">
              <pc-order-list :orderVoList="orderVoList"/>
            </div>
            <div class="pagination">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from '@/components/layout/nav-side';
  import pcOrderList from '@/components/order/order-list';

  export default {
    data() {
      return {
        orderVoList: [],
        orderItemVoList:[],
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
      queryOrderItemVoList() {
        this.$axios.post(
          this.global.baseUrl + '/getOrders',
        ).then((res) => {
          if (res.data.code === 200) {
            console.log(res.data);
            this.orderVoList = res.data.data;
            for(let i = 0; i < this.orderVoList.length; i++){
              this.totalNum = this.totalNum + this.orderVoList[i].quantity;
              this.totalPrice = this.totalPrice + this.orderVoList[i].productPrice * this.orderVoList[i].quantity;
            }
          } else {
            this.orderVoList = [];
          }
        }).catch(function (res) {
          alert(res);
        })
      }
    },
    components: {
      pcNavSide,
      pcOrderList
    }
  };
</script>
