<template>
  <d1-billcard ref="d1_BillCard" :page-data="pageData"></d1-billcard>
</template>
<script>
import d1Billcard from '../coopPlanAccInfo/cooPlanAppInfoIndex.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      type: '',
      pageData: {}
    };
  },
  created () {
    this.type = this.$route.meta.params.type;
    this.pageData = this.$route.meta.params.planAppData;
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 加载默认值
      // d1_BillCard.execBillCardDefaultValueFormula();
      // if (this.type == 'doView') {
      //   this.d1_BillCard.setBillCardValue(this.getFactory().contextData.planAppData);
      //   this.d1_BillCard.setBillCardEditable(false);
      // }
    },

    back () {
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
