<template>
  <div>
    <div style="height:75%">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 75%)">
      <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from "./guarEvalInEvalIndexmethodTool_d1_A_BillCard.vue";
import d1BBillcard from "./guarEvalInEvalIndexmethodTool_d1_B_BillCard.vue";
// 指数法估值

export default {
  components: { d1ABillcard, d1BBillcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      confirm: this.confirm,
      reset: this.reset,
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
  watch: {},
  methods: {
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      if (this.pageParams && this.pageParams.isAdd) {
        this.d1_B_BillCard.ctl.addPageHandle = true;
      }
    },

    confirm() {
      let validatedResult = false;
      this.d1_A_BillCard.$refs.refForm.validate((valid) => {
        validatedResult = valid;
      });
      if(!validatedResult) { return; }

      let rsPars = this.$refs.d1_A_BillCard.formdata;
      this.$request({
        async: false,
        url: this.$backend.cmisEval + "/api/evaluate/indexmethod",
        data: JSON.stringify(rsPars),
        method: "POST",
        success: (response, status, xhr) => {
          if (response.data != null) {
            this.d1_B_BillCard.formdata.evalResult = response.data.evalAmt
          }
          if (response.code != "0") {
            this.$message.error("错误代码：" + response.code + ",错误信息：" + response.message);
          }
        },
        error: (result, status, errorThrown) => {
          this.$message.error(result);
        }
      });
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
    },

    reset() {
      this.$refs.d1_A_BillCard.$refs.refForm.resetFields();
    }
  }
};
</script>
