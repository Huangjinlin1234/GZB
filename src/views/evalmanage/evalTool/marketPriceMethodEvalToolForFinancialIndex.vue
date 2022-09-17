<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>

    <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
  </div>
</template>
<script>
import d1ABillcard from "./marketPriceMethodEvalToolForFinancial_d1_A_BillCard.vue";
import d1BBillcard from "./marketPriceMethodEvalToolForFinancial_d1_B_BillCard.vue";
export default {
  components: { d1ABillcard, d1BBillcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      confirm: this.confirm,
      reset: this.reset
    };
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
    /***
     * 模板工厂暂存数据
     */
    saveStagFactoryData() {
      return {
        formdataA: yufp.clone(this.$refs.d1_A_BillCard.formdata, {}),
        formdataB: yufp.clone(this.$refs.d1_B_BillCard.formdata, {})
      };
    },
    // 市场价格法估值工具
    AfterInit() {
      const _this = this;
      // 获取暂存数据
      let tempData = this.getStagFactoryData && this.getStagFactoryData();
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      // 暂存数据恢复
      if (tempData && tempData.formdataA && Object.keys(tempData.formdataA).length) {
        yufp.clone(tempData.formdataA, _this.$refs.d1_A_BillCard.formdata);
      }
      // 暂存数据恢复
      if (tempData && tempData.formdataB && Object.keys(tempData.formdataB).length) {
        yufp.clone(tempData.formdataB, _this.$refs.d1_B_BillCard.formdata);
      }
    },

    confirm() {
      let validatedResult = false;
      this.d1_A_BillCard.$refs.refForm.validate(valid => {
        validatedResult = valid;
      });
      if (!validatedResult) {
        return;
      }

      // 响应数据
      let responseData = {};
      this.$request({
        async: false,
        url: this.$backend.cmisEval + "/api/evaluate/marketpricefin",
        method: "POST",
        data: JSON.stringify(this.d1_A_BillCard.formdata),
        success: (response, status, xhr) => {
          if (response.data != null) {
            this.d1_B_BillCard.formdata.evalResult = response.data.evalAmtFin;
          }

          // 响应是否正确标志位
          responseData["flag"] = true;
          if (response.code != "0") {
            this.$message.error("错误代码：" + response.code + ",错误信息：" + response.message);
            responseData["flag"] = false;
          }
        },
        error: (result, status, errorThrown) => {
          this.$message.error(result);
          responseData["flag"] = false;
        }
      });
    },

    // 重置
    reset() {
      this.$refs.d1_A_BillCard.$refs.refForm.resetFields();
    }
  }
};
</script>
