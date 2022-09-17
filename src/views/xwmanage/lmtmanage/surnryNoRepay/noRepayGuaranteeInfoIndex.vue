<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './noRepayGuaranteeInfo_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /* 初始化页面*/
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      // d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    /* 新增按钮*/
    doAdd() {
      this.$dialog.open(
        '抵押信息录入',
        'yuxp/product/pages/xwmanage/lmtmanage/surnryNoRepay/noRepayGuaranteeUpdatePageIndex',
        1000,
        600,
        {},
        () => {}
      );
    }
  }
};
</script>
