<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
  </div>
</template>
<script>
import d1ABillcard from "./marketPriceMethodEvalToolForEstateTwo_d1_A_BillCard.vue";
import d1BBillcard from "./marketPriceMethodEvalToolForEstateTwo_d1_B_BillCard.vue";
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
    // 市场价格法估值计算
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;

      if (this.pageParams && this.pageParams.isAdd) {
        this.d1_B_BillCard.ctl.addPageHandle = true;
      }

      // 预创建
      // YuXP.beginCreate();
      // 布局
      // YuXP.createSplit('d1', '上下', '50%');

      // 实际提交创建
      // YuXP.commitCreate('yuxpservice');
    },

    confirm() {
      let validatedResult = false;
      this.d1_A_BillCard.$refs.refForm.validate((valid) => {
          validatedResult = valid;
      });
      if(!validatedResult) { return; }

      this.$request({
        async: true,
        url: this.$backend.cmisEval + "/api/evaluate/marketpriceprop",
        method: "POST",
        data: JSON.stringify(this.$xutils.toUpperCase(this.d1_A_BillCard.formdata, true))
      }).then((response) => {
        if (response.code != "0") {
          this.$message.error("错误代码：" + response.code + ",错误信息：" + response.message);
        }
        if (response.data != null) {
          this.d1_B_BillCard.formdata.evalResult = response.data.evalAmtProp;
        }
      });
    },

    // 新增页面进入的引入借据的操作
    addPageHandle(params) {
      // 通过第一条数据获取授信协议编号
      const valueAmt = this.d1_B_BillCard.formdata.evalResult;
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
