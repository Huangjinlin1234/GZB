<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgHandoverSubInsert_d1_BillCard.vue";

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      d1_BillCard: null,
      pkId: "",
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.pkId = this.pageParams.pkId;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardItemValue("pk_id", this.pkId);
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // getDialogDataFunc() {
    //   d1_BillList.refreshCurrentRow();
    // },

    // 保存
    doSave() {
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      let params = this.d1_BillCard.getBillCardValue();
      let resp = this.d1_BillCard.insertBillCardData(params);
      if (resp) {
        // this.$xutils.getParentPage(this, null, "getDialogDataFunc");

        // this.$xutils.showMsgBox("提示", "新增成功!", 350, 150, (_rt) => {
        this.$dialog.close(this.dialogId, {
          CloseType: "OK",
        });
        // });
      } else {
        this.$xutils.showMsgBox("提示", resp.message, 350, 150, null);
        return;
      }
    },

    // 返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    },
  },
};
</script>
