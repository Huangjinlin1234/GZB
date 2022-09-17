<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './perferRateApply_d1_BillCard.vue'
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
    //优惠利率申请
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardItemValue('surveySerno', this.pageParams.flowData.instanceInfo.bizId);
      let sql = 'survey_no=\'' + this.pageParams.flowData.instanceInfo.bizId + '\'';
  
      this.d1_BillCard.queryDataByCondition(sql);
      this.d1_BillCard.setItemEditable('*', false);
    }
  }
};
</script>
