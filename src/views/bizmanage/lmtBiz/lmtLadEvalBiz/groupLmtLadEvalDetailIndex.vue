<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './groupLmtLadEvalDetail_d1_BillCard.vue';
/**
 * title 集团成员客户限额及债项评级详情
 * author yangwl
 * date 2021-04-13
 * */

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(this.pageParams);
    }
  }
};
</script>
