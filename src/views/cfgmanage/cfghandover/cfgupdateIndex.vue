<template>
  <div>
    <div style="height: 250px">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <br /><br />
    <div style="height: calc(100% - 250px)">
      <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from "./cfgupdate_d1_A_BillCard.vue";
import d1BBilllist from "./cfgupdate_d1_B_BillList.vue";

export default {
  components: { d1ABillcard, d1BBilllist },
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      pkId: "",
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_HAND_TYP", "STD_ZB_HAND_SCOP");
    this.AfterInit();
  },
  methods: {
    // var buttonStr = '';
    // if (jsoOpenPars.opeType == 'view') {
    //   buttonStr = '返回/onCancel';
    // } else if (jsoOpenPars.opeType == 'edit') {
    //   buttonStr = '保存/onSave;返回/onCancel';
    // }
    AfterInit() {
      this.pkId = this.pageParams.pkId;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;

      // 移除specification对象(setBillCardValue会报错)
      delete this.pageParams.specification;

      this.d1_B_BillList.queryDataByCondition({ pk_id: this.pkId });
      this.d1_A_BillCard.setBillCardValue(this.pageParams);

      this.d1_B_BillList.insertDefaultValues = {
        pk_id: this.pkId,
      };

      if (this.pageParams.opeType == "view") {
        this.d1_A_BillCard.setItemEditable(
          "handover_way;handover_scope;ext_class;remark",
          false
        );
        this.d1_B_BillList.setBillListButtonVisable("$delete", false);
        this.d1_B_BillList.setBillListButtonVisable("$update", false);
        this.d1_B_BillList.setBillListButtonVisable("新增", false);
      }
    },
    cancelFn() {
      this.$dialog.close(this.dialogId);
    },
    // 保存客户移交配置主表
    onSave() {
      let checkFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_A_BillCard.setItemValue("upd_id", userInfo.loginCode);
      this.d1_A_BillCard.setItemValue("upd_br_id", userInfo.orgCode);
      this.d1_A_BillCard.setItemValue(
        "upd_date",
        this.$xutils.dateFormat("yyyy-MM-dd", new Date())
      );
      let params = this.d1_A_BillCard.getBillCardValue();
      let resp = this.d1_A_BillCard.updateBillCardData(params);
      if (resp && resp.code == "0") {
        // this.$xutils.showMsgBox("提示", "保存成功！");
        this.$xutils.getParentPage(this, null, "getDialogDataFunc");
        this.cancelFn();
      } else {
        this.$xutils.showMsgBox("提示", resp.message, 350, 150, null);
        return;
      }
    },

    // 返回客户移交配置列表
    onCancel() {
      this.$dialog.close(this.dialogId);
    },

    // 新增客户移交配置信息表
    onInsert() {
      let params = this.d1_A_BillCard.getBillCardValue();

      this.$dialog.open(
        "新增页面",
        "cfgmanage/cfghandover/cfgHandoverSubInsertIndex",
        900,
        500,
        params,
        () => {
          this.getDialogDataFunc();
        }
      );
    },

    // 新增客户移交配置信息表
    getDialogDataFunc() {
      this.d1_B_BillList.queryDataByCondition({
        pk_id: this.pkId,
        oprType: "01",
      });
    },
  },
};
</script>