<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgPrdOrgRelDetail_d1_BillCard.vue";
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
    /**
     * 产品配置-产品适用机构详情页面
     */
    AfterInit() {
      // 产品适用机新增信息
      this.d1_BillCard = this.$refs.d1_BillCard;
debugger
      // 执行配置的默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();

      let prdId = this.pageParams.prdId;
      this.d1_BillCard.setItemValue("prdId", prdId);
      this.d1_BillList.queryDataByCondition({ oprType: "01" });
      this.d1_BillList.setAppendSQLCondition({ oprType: "01" });
    },

    // 返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    },

    // 保存
    onSave() {
      //保存时，先进行数据校验，若存在则提醒，不能保存。
      let _this = this;
      let cfgPrdOrgRel = _this.d1_BillCard.getBillCardValue();

      let resp = _this.d1_BillCard.saveBillCardData();

      if (resp) {
        _this.$dialog.close(this.dialogId);
      }
    }
  }
};
</script>
