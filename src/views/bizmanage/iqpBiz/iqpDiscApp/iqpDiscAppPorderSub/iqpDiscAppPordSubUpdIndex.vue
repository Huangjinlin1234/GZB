<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./iqpDiscAppPordSubUpd_d1_BillCard.vue";
let selfPar = {};

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
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      selfPar = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 执行默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
      let param = this.pageParams;
      this.d1_BillCard.setBillCardValue(param);
    },

    // 保存操作
    doSave() {
      // 校验必输参数
      let validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();
      let iqpDiscAppPordSub = this.$xutils.toUpperCase(jsoPar, true);
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + "/api/iqpdiscapppordersub/update",
        data: JSON.stringify(iqpDiscAppPordSub),
        success: (response, status, xhr) => {
          if (response.code == "0") {
            this.$xutils.showMsgBox("提示", "保存成功");
            this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition", [{ serno: selfPar.biz_serno }]);
            this.$dialog.close(this.dialogId);
          } else {
            this.$xutils.showMsgBox("提示", "保存失败");
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        }
      });
    },
    // 返回
    doCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
