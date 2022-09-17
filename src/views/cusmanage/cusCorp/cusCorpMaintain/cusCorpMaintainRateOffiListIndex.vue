<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cusCorpMaintainRateOffiList_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    cusCorp: Object,
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      var _this = this;
      _this.d1_BillCard = _this.$refs.d1_BillCard;
      if (_this.cusCorp) {
        // _this.d1_BillCard.formdata.certType = _this.cusCorp.certType;
        // _this.d1_BillCard.formdata.certCode = _this.cusCorp.certCode;
        // _this.d1_BillCard.formdata.cusType = _this.cusCorp.cusType;
        // _this.d1_BillCard.formdata.cusId = _this.cusCorp.cusId;
        // _this.d1_BillCard.formdata.cusName = _this.cusCorp.cusName;
        // _this.d1_BillCard.formdata.tradeClass = _this.cusCorp.tradeClass;
        // _this.d1_BillCard.formdata.regiAreaCode = _this.cusCorp.regiAreaCode;
        // _this.d1_BillCard.formdata.buildDate = _this.cusCorp.buildDate;
        // _this.d1_BillCard.formdata.isNatctl = _this.cusCorp.isNatctl;
        // _this.d1_BillCard.formdata.natctlLevel = _this.cusCorp.natctlLevel;
        // _this.d1_BillCard.formdata.finaReportType = _this.cusCorp.finaReportType;
        // _this.d1_BillCard.formdata.isNewBuildCorp = _this.cusCorp.isNewBuildCorp;
        // _this.d1_BillCard.formdata.isSteelCus = _this.cusCorp.isSteelCus;
        var cusId = _this.cusCorp.cusId;
        yufp.service.request({
          method: 'POST',
          url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
          async: false,
          callback: function (code, message, response) {
            _this.$utils.clone(response.data, _this.d1_BillCard.formdata);
          }
        });
        yufp.service.request({
          method: 'GET',
          url: this.$backend.cmisCus + "/api/cuscorpmgr/",
          data: {condition: {cusIdRel: cusId}},
          callback: function (code, message, response) {
            _this.$utils.clone(response.data[0], _this.d1_BillCard.formdata);
          }
        });
      }
    }
  }
};
</script>
