<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>

    <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
  </div>
</template>
<script>
import d1ABillcard from "./bookPriceMethodEvalTool_d1_A_BillCard.vue";
import d1BBillcard from "./bookPriceMethodEvalTool_d1_B_BillCard.vue";
// 账面价值法

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

      this.$refs.d1_B_BillCard.formdata.evalResult = this.$refs.d1_A_BillCard.formdata.paperValue;
    },

    // 新增页面进入的引入估值结果的操作
    addPageHandle(params) {
      // 通过第一条数据获取授信协议编号
      let valueAmt = this.$refs.d1_B_BillCard.formdata.evalResult; // 估值结果
      if (valueAmt == null || valueAmt == "") {
        // this.$alert("请先进行估值", "提示");
         this.$message.warning("请先进行估值");
        return;
      }

      // 数据回调
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
