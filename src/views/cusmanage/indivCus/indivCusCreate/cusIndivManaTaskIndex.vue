<!--个人待处理 -->
<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusIndivManaTask_d1_BillList.vue';
/**
 * 个人客户日常管理
 * @constructor
 */
let data = {};

export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
    },

    // 返回
    doBack () {
      this.getFactory().back();
      // data.doBack();
    },

    // 定义树切换调用方法
    showAction () {}
  }
};
</script>
