<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./templetfactoryadd_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
      data1: {}
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    /**
     * 模板工厂新增页面
     */

    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.addEditChangeAction(this.ruleItemTypeChangeFn);
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.setItemVisible("jobFlow", false);
    },

    saveFn() {
      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue("inputDate", this.$xutils.formatTime(new Date()));
      this.d1_BillCard.setItemValue("updId", userInfo.loginCode);
      this.d1_BillCard.setItemValue("updBrId", userInfo.orgCode);
      this.d1_BillCard.setItemValue("updDate", this.$xutils.formatTime(new Date()));
      const resp = this.d1_BillCard.saveBillCardData();
      if (resp && resp.code == "ok") {
        const data = this.d1_BillCard.getBillCardValue();
        data.opType = "edit";
        this.$dialog.open("", "cfgmanage/productconfig/templetfactory/templetfactorydetailIndex", 900, 650, data, null, true, false);
      }
    },

    backFn() {
      this.$dialog.close(this.dialogId);
    },

    ruleItemTypeChangeFn(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == "isJobFlow" && newVal == "Y") {
        thisCard.setItemVisible("jobFlow", true);
        thisCard.setBillCardItemClearValue("job_flow");
        thisCard.setBillCardItemRequired("jobFlow", true);
      } else if (itemKey == "isJobFlow" && newVal == "N") {
        thisCard.setItemVisible("jobFlow", false);
        thisCard.setBillCardItemClearValue("jobFlow");
        thisCard.setBillCardItemRequired("jobFlow", false);
      }
    }
  }
};
</script>
