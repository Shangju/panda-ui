<template>
  <div>
    <div class="w">
      <ul class="keywords-list">
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','手机')">手机</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','数码')">数码</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','电脑')">电脑</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','办公配件')">办公配件</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','电视')">电视</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','空调')">空调</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','冰箱')">冰箱</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','洗衣机')">洗衣机</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','厨卫家电')">厨卫家电</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','小家电')">小家电</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','家具')">家具</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','家具')">家具</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','家装')">家装</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','厨卫家电')">厨卫家电</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','小家电')">小家电</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','个护化妆')">个护化妆</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','清洁用品')">清洁用品</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','纸品')">纸品</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','母婴用品')">母婴用品</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','儿童玩具')">儿童玩具</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','童装童鞋')">童装童鞋</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','鞋靴')">鞋靴</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','箱包')">箱包</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','钟表')">钟表</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','珠宝')">珠宝</a>
        </li>
        <li class="keywords-item">
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','图书')">图书</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','音像')">音像</a>
          <a class="link" target="_blank" href="javascript:void(0)" @click="goGoodsListPage('','电子书')">电子书</a>
        </li>
      </ul>
      <div class="banner-con">
        <pc-banner></pc-banner>
        <!--<div class="loading"></div>-->
      </div>
    </div>
  <div class="w">
    <div class="floor-wrap" v-for="(category, index1) in  categoryData" :key="category.categoryId">
      <h1 class="floor-title">F{{index1 + 1}} {{category.categoryName}}</h1>
      <ul class="floor-list">
        <li class="floor-item" v-for="(item, index2) in  category.categoryList" :key="item.categoryId">
          <a href="javascript:void(0)" @click="goGoodsListPage(item.categoryId)">
            <span class="floor-text">{{item.categoryName}}</span>
            <img class="floor-img" :src="getImage(index1, index2)" alt="双开门冰箱"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
  import pcBanner from '@/components/banner';

  export default {
    data() {
      return {
        categoryData: [
          {
          categoryId: '1',
          categoryName: '家用电器',
          categoryList: [
            {
            categoryId: 1,
            categoryName: '冰箱'
          },{
              categoryId: 2,
              categoryName: '电视'
            },{
              categoryId: 3,
              categoryName: '洗衣机'
            },{
              categoryId: 4,
              categoryName: '空调'
            },{
              categoryId: 5,
              categoryName: '电热水器'
            }
          ]
        },{
            categoryId: '2',
            categoryName: '数码3C',
            categoryList: [
              {
                categoryId: 1,
                categoryName: '电脑'
              },{
                categoryId: 2,
                categoryName: '手机'
              },{
                categoryId: 3,
                categoryName: '平板电脑'
              },{
                categoryId: 4,
                categoryName: '数码相机'
              },{
                categoryId: 5,
                categoryName: '3C配件'
              }
            ]
          },{
            categoryId: '3',
            categoryName: '服装箱包',
            categoryList: [
              {
                categoryId: 1,
                categoryName: '女装'
              },{
                categoryId: 2,
                categoryName: '帽子'
              },{
                categoryId: 3,
                categoryName: '旅行箱'
              },{
                categoryId: 4,
                categoryName: '手提包'
              },{
                categoryId: 5,
                categoryName: '保暖内衣'
              }
            ]
          },{
            categoryId: '4',
            categoryName: '食品生鲜',
            categoryList: [
              {
                categoryId: 1,
                categoryName: '零食'
              },{
                categoryId: 2,
                categoryName: '生鲜'
              },{
                categoryId: 3,
                categoryName: '半成品菜'
              },{
                categoryId: 4,
                categoryName: '速冻食品'
              },{
                categoryId: 5,
                categoryName: '进口食品'
              }
            ]
          },{
            categoryId: '5',
            categoryName: '酒水饮料',
            categoryList: [
              {
                categoryId: 1,
                categoryName: '白酒'
              },{
                categoryId: 2,
                categoryName: '红酒'
              },{
                categoryId: 3,
                categoryName: '饮料'
              },{
                categoryId: 4,
                categoryName: '鸡尾酒'
              },{
                categoryId: 5,
                categoryName: '进口洋酒'
              }
            ]
          }
        ],
      };
    },
    methods: {
      getImage(index1, index2) {
        return require('../../assets/image/floor/floor' + (index1 + 1) + '-' + (index2 + 1) + '.jpg');
      },
      goGoodsListPage(categoryId, keyword) {
        let param = {};
        param.categoryId = categoryId;
        param.keyword = keyword;
        this.loadPage('goodsList', param);
      }
    },
    components: {
      pcBanner
    }
  }

</script>

