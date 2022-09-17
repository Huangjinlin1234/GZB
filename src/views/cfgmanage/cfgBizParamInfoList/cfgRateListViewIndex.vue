<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgRateListView_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_OPRD_TYP", "STD_ZB_CUR_TYP", "STD_ZB_BIZ_TYP");
    this.AfterInit();
  },
  methods: {
    /**
     *  业务参数配置列表
     */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({ pkId: this.pageParams.pkId });
      this.d1_BillCard.setBillCardItemEditable("*", false); //只读
    },

    bycancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
