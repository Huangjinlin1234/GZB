<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./weightSet_d1_BillCard.vue";
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
  provide() {
    return {
      confirm: this.confirm,
      cancel: this.cancel
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      let weightSetCard = (this.d1_BillCard = this.$refs.d1_BillCard);
      weightSetCard.queryDataByCondition();
    },

    confirm() {
      // 校验整个表单，即执行所有字段的校验公式
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }

      // 累加
      this.d1_BillCard.formdata.pk = "WT000001";
      let areaBusy = this.d1_BillCard.getItemValue("areaBusy");

      let traffic = this.d1_BillCard.getItemValue("traffic");
      let environ = this.d1_BillCard.getItemValue("environ");
      let publics = this.d1_BillCard.getItemValue("publics");
      let buildingCase = this.d1_BillCard.getItemValue("buildingCase");
      let orientCase = this.d1_BillCard.getItemValue("orientCase");
      let fitment = this.d1_BillCard.getItemValue("fitment");
      let equip = this.d1_BillCard.getItemValue("equip");
      let property = this.d1_BillCard.getItemValue("property");
      let projects = this.d1_BillCard.getItemValue("projects");
      let remainyear = this.d1_BillCard.getItemValue("remainyear");
      let poltratio = this.d1_BillCard.getItemValue("poltratio");
      let value = parseInt(areaBusy * 100) + parseInt(traffic * 100) + parseInt(environ * 100) + parseInt(publics * 100) + parseInt(buildingCase * 100) + parseInt(orientCase * 100) + parseInt(fitment * 100) + parseInt(equip * 100) + parseInt(property * 100) + parseInt(projects * 100) + parseInt(remainyear * 100) + parseInt(poltratio * 100);
      // 判断是否等于100%
      if (value == 100) {
        // 更新
        // var responseData = updateSelective();
        let result = this.d1_BillCard.updateBillCardData();

        if (result && result.code == "0") {
          this.$dialog.close(this.dialogId, this.d1_BillCard.formdata);
          return true;
        }
      } else {
        // this.$xutils.showMsgBox("提示", "各参数权重之和应为100%！当前和为:" + value + "%");
         this.$message.warning("各参数权重之和应为100%！当前和为:" + value + "%");
      }
    },

    cancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
