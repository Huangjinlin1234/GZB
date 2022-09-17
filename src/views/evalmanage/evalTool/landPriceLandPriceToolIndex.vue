<template>
  <div>
    <div style="height:70%">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 70%)">
      <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from "./landPriceLandPriceTool_d1_A_BillCard.vue";
import d1BBillcard from "./landPriceLandPriceTool_d1_B_BillCard.vue";

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
      d1BBillcard: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    // 基准地价系数修正法估值工具
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      if (this.pageParams && this.pageParams.isAdd) {
        this.d1_B_BillCard.ctl.addPageHandle = true;
      }
      // selections = this.d1_A_BillCard.getBillCardItemOptions("land_way");
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

      // 土地还原率应在5%到8%之间
      let landReturnRate = this.d1_A_BillCard.formdata.landReturnRate;
      if (!(landReturnRate >= 0.05 && landReturnRate <= 0.08)) {
        this.d1_A_BillCard.formdata.landReturnRate = "";
        // this.$alert("土地还原率应在5%到8%之间", "提示");
        this.$message.warning("土地还原率应在5%到8%之间");
        return;
      }

      // 估价日期修正系数须在0.8到1.2中间
      let dateUpdateRadio = this.d1_A_BillCard.formdata.dateUpdateRadio;
      if (!(dateUpdateRadio >= 0.8 && dateUpdateRadio <= 1.2)) {
        this.d1_A_BillCard.formdata.dateUpdateRadio = "";
        // this.$alert("估价日期修正系数须在0.8到1.2中间", "提示");
         this.$message.warning("估价日期修正系数须在0.8到1.2中间");
        return;
      }

      this.$request({
        url: this.$backend.cmisEval + "/api/evaluate/landPrice",
        data: JSON.stringify(jsoPar),
        method: "POST",
        async: false,
        success: (response, status, xhr) => {
          if (response.code == 0 && response.data != null) {
            this.d1_B_BillCard.formdata.evalPrice = response.data.evalPrice;
            this.d1_B_BillCard.formdata.evalCost = response.data.evalCost;
            this.d1_A_BillCard.formdata.useYearRadio = response.data.useYearRadio;
            this.d1_A_BillCard.formdata.sumUpdateRadio = response.data.sumUpdateRadio;
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
      const valueAmt = this.d1_B_BillCard.formdata.evalCost; // 估值结果
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
