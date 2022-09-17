<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
  </div>
</template>
<script>
import d1ABillcard from "./incomeRuleEvalTool_d1_A_BillCard.vue";
import d1BBillcard from "./incomeRuleEvalTool_d1_B_BillCard.vue";

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
    this.AfterInit();
  },
  methods: {
    // 收益法估值工具
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;

      if (this.pageParams && this.pageParams.isAdd) {
        this.d1_B_BillCard.ctl.addPageHandle = true;
      }
      this.d1_A_BillCard.execBillCardDefaultValueFormula();
    },

    // 估值计算
    onEval() {
      let jsoPar = this.$refs.d1_A_BillCard.formdata;
      jsoPar = Object.assign({}, jsoPar);

      let validatedResult = false;
      this.d1_A_BillCard.$refs.refForm.validate((valid) => {
        validatedResult = valid;
      });
      if(!validatedResult) { return; }
      
      this.$request({
        url: this.$backend.cmisEval + "/api/evaluate/incomeprice",
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),
        method: "POST",
        async: false,
        success: (response, status, xhr) => {
          if (response.code == 0 && response.data != null) {
            this.$refs.d1_A_BillCard.formdata.expectYearIncome = response.data.expectYearIncome;
            this.$refs.d1_B_BillCard.formdata.evalResult = response.data.evalResult;
          } else {
            // this.$alert('计算出错了', '提示');
            this.$message.error("计算出错了");
          
          }
        }
      });
    },

    // 重置
    onReset() {
      //字段重置
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.yearRent = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.avgVacancyRate = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.houseTax = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.businessSurtaxRate = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.manageRate = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.otherRate = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.incomeRate = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.surplusIncomeTerm = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.discountRate = "";
      this.$refs.d1_A_BillCard.$refs.refForm.formdata.expectYearIncome = "";
    },

    // 新增页面进入的引入借据的操作
    addPageHandle(params) {
      // 通过第一条数据获取授信协议编号
      const valueAmt = this.d1_B_BillCard.formdata.evalResult; // 估值结果
      const valueCuy = this.d1_A_BillCard.formdata.expectYearIncome;
      if (valueAmt == null || valueAmt == "") {
        // this.$alert("请先进行估值", "提示");
         this.$message.warning("请先进行估值");
        return;
      }

      // 数据回调
      this.$dialog.close(this.dialogId, {
        valueAmt: valueAmt,
        valueCuy: valueCuy
      });
    }
  }
};
</script>
