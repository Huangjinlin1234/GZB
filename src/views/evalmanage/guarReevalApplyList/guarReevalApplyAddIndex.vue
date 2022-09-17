<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./guarReevalApplyAdd_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      nextStep: this.nextStep,
      bycancel: this.bycancel
    };
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_EVAL_INOUT_TYPE,STD_ZB_APP_ST,STD_ZB_OPR_TYPE,STD_ZB_EVE_DATASOUR");
    this.AfterInit();
  },
  methods: {
    // 押品估值申请
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片
      // 执行默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 新增页面
    nextStep() {
      // 获取数据
      let jsoPar = this.d1_BillCard.formdata;
      let validatedResult = false;
      this.d1_BillCard.$refs.refForm.validate(valid => {
        validatedResult = valid;
      });
      if (!validatedResult) {
        return;
      }

      // 插入数据
      jsoPar.approveStatus = "000"; //审批状态(默认)
      jsoPar.wfApprSts = "000"; //审批状态(默认)

      this.$request({
        async: true,
        method: "POST",
        url: this.$backend.cmisEval + "/api/guarevalreevalapply/insert",
        data: jsoPar
      }).then(response => {
        if (response.code == 0) {
          // this.$alert("保存成功", "提示", {
          //   confirmButtonText: "确定",
          //   callback: action => {
          //     jsoPar["evalAppSerno"] = response.data.serno;
          //     jsoPar["serno"] = response.data.serno;
          //     jsoPar["model_group_no"] = "CMG000135"; //押品价值重估
          //     jsoPar["op"] = "ADD";
          //     this.$dialog.open("押品价值重估", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar);
          //     this.$dialog.close(this.dialogId);
          //   }
          // });
          this.$message.success(" 保存成功!");
          jsoPar["evalAppSerno"] = response.data.serno;
          jsoPar["serno"] = response.data.serno;
          jsoPar["model_group_no"] = "CMG000135"; //押品价值重估
          jsoPar["op"] = "ADD";
          this.$dialog.open("押品价值重估", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar);
          this.$dialog.close(this.dialogId);
        } else {
          this.$message.error(response.message);
        }
      });
    },

    bycancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
