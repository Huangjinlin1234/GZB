<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpRepayInterestChgViewLoanDetail_d1_BillCard.vue'
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
    // 借据信息详情页面
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({billNo:this.pageParams.billNo});
      this.d1_BillCard.setItemEditable('*', false);
    }
  }
};
</script>
