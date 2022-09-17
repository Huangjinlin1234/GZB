<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./compareToMarket4Land_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      confirm: this.confirm,
      reset: this.reset
    }
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_LAND_USE_QUAL", "STD_ZB_LAND_USE_WAY", "STD_ZB_LAND_PURP", "STD_ZB_LAND_NOTINUSE_TYPE", "STD_ZB_LAND_LOCATE_AREA", "STD_ZB_CUR_TYP", "STD_ZB_YES_NO", "STD_ZB_LAND_UP_TYPE", "STD_ZB_LAND_UP_SCOPE");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
    },
    //估值
    confirm() {
      let validatedResult = false;
      this.d1_BillCard.$refs.refForm.validate((valid) => {
        validatedResult = valid;
      });
      if(!validatedResult) { return; }

      let rsPars = {};
      rsPars["street"] = this.d1_BillCard.formdata.provinceCdName + this.d1_BillCard.formdata.cityCdName + this.d1_BillCard.formdata.countyCdName;
      rsPars["landUseArea"] = this.d1_BillCard.formdata.landUseArea;
      rsPars["landUseBeginDate"] = this.d1_BillCard.formdata.landUseBeginDate;
      rsPars["landUseEndDate"] = this.d1_BillCard.formdata.landUseEndDate;
      this.$dialog.open("", "evalmanage/evalTool/guarEvalLandSampleIndex", -1, -1, rsPars);
    },

    reset() {
      this.d1_BillCard.$refs.refForm.resetFields();
    }
  }
};
</script>
