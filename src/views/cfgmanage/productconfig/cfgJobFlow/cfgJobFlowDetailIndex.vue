<template>
  <div>
    <div style="height:50%">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 50%)">
      <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from "./cfgJobFlowDetail_d1_A_BillCard.vue";
import d1BBilllist from "./cfgJobFlowDetail_d1_B_BillList.vue";
export default {
  components: { d1ABillcard, d1BBilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_YES_NO");
    this.AfterInit();
  },
  methods: {
    /**
     *作业流配置功能详情页面
     */
    AfterInit() {
      let opType = this.pageParams.opType;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_A_BillCard.setBillCardValue(this.pageParams);
      // 关联节点配置子表
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      // 增加作业流编号默认查询条件

      // 子表新增或修改时将产品编号赋默认值
      this.d1_B_BillList.isMustFkDefault = true;
      let condition = { jobFlowId: this.d1_A_BillCard.getBillCardItemValue("jobFlowId"), wfiSignId: this.d1_A_BillCard.getBillCardItemValue("wfiSignId") };
      this.getDialogDataFunc(condition);
      let values_d1_B = {
        jobFlowId: this.d1_A_BillCard.getBillCardItemValue("jobFlowId"),
        wfiSignId: this.d1_A_BillCard.getBillCardItemValue("wfiSignId"),
        planId: this.d1_A_BillCard.getBillCardItemValue("planId"),
        apprViewUrl: this.d1_A_BillCard.getBillCardItemValue("apprViewUrl"),
        apprAdjustTpl: this.d1_A_BillCard.getBillCardItemValue("apprAdjustTpl")
      };
      this.d1_B_BillList.insertDefaultValues = values_d1_B;
      if (opType == "view") {
        this.$refs.d1_B_BillList.dealEditButton(false);
        this.$refs.d1_A_BillCard.dealEditButton(false);
      }
    },
    getDialogDataFunc(condition) {
      this.d1_B_BillList.queryDataByCondition(condition);
      this.d1_B_BillList.setAppendSQLCondition(condition);
    },
    // 保存
    onSave() {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_A_BillCard.setItemValue("upd_id", userInfo.loginCode);
      this.d1_A_BillCard.setItemValue("upd_br_id", userInfo.orgCode);
      this.d1_A_BillCard.setItemValue("upd_date", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));
      let resp = this.d1_A_BillCard.updateBillCardData();
      if (resp && resp.code == "0") {
        this.$xutils.showMsgBox("提示", "保存成功", 350, 150, () => {
          this.$dialog.close(this.dialogId);
        });
      }
    },

    // 返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
