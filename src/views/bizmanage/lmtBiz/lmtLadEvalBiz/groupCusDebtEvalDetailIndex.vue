<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './groupCusDebtEvalDetail_d1_BillCard.vue'
/**
 * title 债项评级查看列表
 * author yangwl
 * date 2021-04-13
 * */
let par = {};

export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(par);
      // this.d1_BillCard.execBillCardDefaultValueFormula();
    }
  }
};
</script>
