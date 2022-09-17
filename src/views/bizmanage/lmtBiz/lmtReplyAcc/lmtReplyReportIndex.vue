<template>
  <div></div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    // 初始化页面
    AfterInit() {
      // // 明确是否为流程进入页面
      // initWfStatus();
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片

      this.d1_BillCard.queryDataByCondition({'cusId': this.pageParams.cus_id});
      this.initBillCard();
    },

    // 初始化触发
    initBillCard() {
      // 针对查看以及流程进入页面，不允许编辑操作
      if (this.pageParams.op == 'VIEW' || this.wfFlag) {
        this.d1_BillCard.setBillCardItemRequired('*', false);
        this.d1_BillCard.setBillCardItemEditable('*', false);
      }
      // if (frameContext.op == 'EDIT') {
      //   d1_BillCard.setBillCardItemEditable('*', false);
      //   d1_BillCard.setItemEditable('eval_high_curfund_lmt_amt;lmt_term;lmt_graper_term', true);
      // }
      // // 绑定onchange事件
      // {
      //   // d1_BillCard.addEditChangeAction(isBasicChangeFn);
      // }
    }
  }
};
</script>
