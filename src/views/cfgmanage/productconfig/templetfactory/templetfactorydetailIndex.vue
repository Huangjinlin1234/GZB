<template>
  <div>
    <div>
      <div>
        <d1-a-a-billcard ref="d1_A_A_BillCard"></d1-a-a-billcard>
      </div>
      <div>
        <d1-a-b-billlist ref="d1_A_B_BillList"></d1-a-b-billlist>
      </div>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button v-if="allowWrite" type="primary" @click="update">保存</yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1AABillcard from "./templetfactorydetail_d1_A_A_BillCard.vue";
import d1ABBilllist from "./templetfactorydetail_d1_A_B_BillList.vue";
export default {
  components: { d1AABillcard, d1ABBilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_A_BillCard: null,
      d1_A_B_BillList: null,
      allowWrite: true,
      modelGroupNo: this.pageParams.modelGroupNo
    };
  },
  mounted() {
    this.allowWrite = this.pageParams.opType == "edit";
    this.AfterInit();
  },
  methods: {
    /**
     * 模板工厂详情页面
     */

    AfterInit() {
      const opType = this.pageParams.opType;
      this.d1_A_A_BillCard = this.$refs.d1_A_A_BillCard;
      this.d1_A_A_BillCard.addEditChangeAction(this.ruleItemTypeChangeFn);
      this.d1_A_B_BillList = this.$refs.d1_A_B_BillList;
      this.d1_A_B_BillList.addAfterEditInitAction(this.afterEditInitFn);
      this.d1_A_B_BillList.addAfterAddInitAction(this.afterAddInitFn);

      if (opType == "edit") {
        this.doEdit();
      } else {
        this.doView();
      }
    },

    doEdit() {
      this.d1_A_A_BillCard.queryDataByCondition({ modelGroupNo: this.modelGroupNo });
      this.d1_A_B_BillList.queryDataByCondition({ modelGroupNo: this.modelGroupNo });

      this.d1_A_B_BillList.modelGroupNo = this.pageParams.modelGroupNo;
    },

    doView() {
      this.d1_A_A_BillCard.queryDataByCondition({ modelGroupNo: this.modelGroupNo });
      this.d1_A_A_BillCard.setItemEditable("*", false);
      this.d1_A_B_BillList.queryDataByCondition({ modelGroupNo: this.modelGroupNo });

      this.d1_A_B_BillList.setBillListButtonVisable("$insert", false);
      this.d1_A_B_BillList.setBillListButtonVisable("$delete", false);
      this.d1_A_B_BillList.setBillListButtonVisable("$update", false);
    },

    update() {
      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_A_A_BillCard.setItemValue("updId", userInfo.loginCode);
      this.d1_A_A_BillCard.setItemValue("updBrId", userInfo.orgCode);
      this.d1_A_A_BillCard.setItemValue("updDate", this.$xutils.formatTime(new Date()));
      const resp = this.d1_A_A_BillCard.updateBillCardData();
      if (resp && resp.code == "ok") {
        this.$xutils.showMsgBox("提示", "保存成功");
      }
    },

    back() {
      this.$dialog.close(this.dialogId);
    },

    ruleItemTypeChangeFn(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == "isJobFlow" && newVal == "Y") {
        thisCard.setItemVisible("jobFlow", true);
        thisCard.setBillCardItemClearValue("jobFlow");
        thisCard.setBillCardItemRequired("jobFlow", true);
      } else if (itemKey == "isJobFlow" && newVal == "N") {
        thisCard.setItemVisible("jobFlow", false);
        thisCard.setBillCardItemClearValue("jobFlow");
        thisCard.setBillCardItemRequired("jobFlow", false);
      }
    },

    // 查看、修改初始化方法
    afterEditInitFn(thisCard, onlyView) {
      thisCard.addEditChangeAction(this.billCardChangeFn);
      setTimeout(() => {
        thisCard.setItemValue("mainPageJspath", this.getMainPageJsPath());
        if (thisCard.isTriggerEditEvent) {
          const strItemkey = "relType";
          const strNewValue = thisCard.getBillCardItemValue(strItemkey);
          thisCard.triggerEditChangeEvent(strItemkey, null, strNewValue);
        }
      }, 10);
    },

    // 新增初始化方法
    afterAddInitFn(thisCard, onlyView) {
      thisCard.addEditChangeAction(this.billCardChangeFn);
      thisCard.setItemValue("mainPageJspath", this.getMainPageJsPath());

      setTimeout(() => {
        if (thisCard.isTriggerEditEvent) {
          const strItemkey = "relType";
          const strNewValue = thisCard.getBillCardItemValue(strItemkey);
          thisCard.triggerEditChangeEvent(strItemkey, null, strNewValue);
        }
      }, 10);
    },

    getMainPageJsPath() {
      const allArry = this.d1_A_B_BillList.getBillListData();
      if (allArry.length > 0) {
        for (let index = 0; index < allArry.length; index++) {
          const row = allArry[index];
          if (row.isMainFunc && row.isMainFunc == "Y") {
            return row.funcUrl;
          }
        }
      }
      return null;
    },

    // 模板工厂子表卡片change事件
    billCardChangeFn(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == "relType") {
        if (newVal == "01") {
          // 页面
          thisCard.setItemVisible("funcId1;funcUrl", true);

          // thisCard.setBillCardItemClearValue('funcId1;funcName;funcUrl');

          thisCard.setItemVisible("funcId2", false);
          // thisCard.setBillCardItemClearValue('funcId2');
        } else if (newVal == "02") {
          // 模板组
          thisCard.setItemVisible("funcId2", true);
          // thisCard.setBillCardItemClearValue('funcId2;funcName');
          thisCard.setItemVisible("funcId1;funcUrl", false);
          thisCard.setBillCardItemClearValue("funcUrl");
        }
      }
      if (itemKey == "funcId1") {
        thisCard.setItemValue("funcId", newVal, newVal);
      }
      if (itemKey == "funcId2") {
        thisCard.setItemValue("funcId", newVal, newVal);
      }
    }
  }
};
</script>
