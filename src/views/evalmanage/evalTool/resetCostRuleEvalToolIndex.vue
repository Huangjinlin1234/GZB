<template>
  <div>
    <div style="height:60%">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 60%)">
      <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from "./resetCostRuleEvalTool_d1_A_BillCard.vue";
import d1BBillcard from "./resetCostRuleEvalTool_d1_B_BillCard.vue";

export default {
  components: { d1ABillcard, d1BBillcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      onEval: this.onEval,
      onReset: this.onReset,
      addPageHandle: this.addPageHandle
    }
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_REST_COST_GUAR_TYPE");
    this.AfterInit();
  },
  methods: {
    // 重置成本法估值工具
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      if (this.pageParams && this.pageParams.isAdd) {
        this.d1_B_BillCard.ctl.addPageHandle = true;
      }
    },

    // 估值计算
    onEval() {
      let jsoPar = this.d1_A_BillCard.formdata;
      jsoPar = Object.assign({}, jsoPar);

      // 校验必输
      let validatedResult = false;
      this.d1_A_BillCard.$refs.refForm.validate((valid) => {
        validatedResult = valid;
      });
      if(!validatedResult) { return; }

      this.$request({
        url: this.$backend.cmisEval + "/api/evaluate/repeatprice",
        data: JSON.stringify(jsoPar),
        method: "POST",
        async: false,
        success: (response, status, xhr) => {
          if (response.code == 0 && response.data != null) {
            this.$refs.d1_B_BillCard.formdata.evalResult = response.data.evalResult;
            this.$refs.d1_A_BillCard.formdata.resetCost = response.data.resetCost;
            this.$refs.d1_A_BillCard.formdata.eclDvl = response.data.eclDvl;
            this.$refs.d1_A_BillCard.formdata.prtDvl = response.data.prtDvl;
          }
        }
      });
    },

    // 重置
    onReset() {
      this.$refs.d1_A_BillCard.$refs.refForm.resetFields();
    },

    // 新增页面进入的引入借据的操作
    addPageHandle(params) {
      // 通过第一条数据获取授信协议编号
      const valueAmt = this.d1_B_BillCard.formdata.evalResult; // 估值结果
      if (valueAmt == null || valueAmt == "") {
        // this.$alert("请先进行估值", "提示");
         this.$message.warning("请先进行估值");
        return;
      }

      this.$dialog.close(this.dialogId, {
        valueAmt: valueAmt
      });
    }

  }
};
</script>
