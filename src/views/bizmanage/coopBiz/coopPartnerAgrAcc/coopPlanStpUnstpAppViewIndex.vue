<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './coopPlanStpUnstpAppView_d1_BillCard.vue';
export default {
  components: {d1Billcard},
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
    // 合作方案中止恢复查看列表
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition('serno = \'' + this.getFactory().contextData.serno + '\'');
      this.d1_BillCard.setItemEditable('*');
    },

    onBack () {
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
