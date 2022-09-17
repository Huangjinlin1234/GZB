<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard" :showSaveFlag="showSaveFlag"></d1-a-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from "./cfgRuleItemCardDetail_d1_A_BillCard.vue";
export default {
  components: { d1ABillcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      showSaveFlag: false
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_NOTI_TYPE", "STD_ZB_RULE_ITEM_TYPE", "STD_ZB_YES_NO", "STD_ZB_OPR_TYPE");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_A_BillCard.addEditChangeAction(this.ruleItemTypeChangeFn);
      const opType = this.pageParams.opType;

      if (opType == "add") {
        this.doAdd();
      } else if (opType == "edit") {
        this.doEdit();
      } else {
        this.doView();
      }

      // 初始化时手动调用onchange事件
      this.ruleItemTypeChangeFn(null, "ruleItemType", null, this.d1_A_BillCard.getItemValue("ruleItemType"));
    },

    // CHANGE事件,根据 业务规则类型动态展示字段
    ruleItemTypeChangeFn(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == "ruleItemType" && newVal == "01") {
        // 业务规则类型=自由规则时，展示规则编号、规则描述；否则隐藏非必输；
        this.d1_A_BillCard.setItemVisible("ruleId", true);

        this.d1_A_BillCard.setBillCardItemRequired("ruleId", true);
        this.d1_A_BillCard.setItemVisible("ruleName", true);
        this.d1_A_BillCard.setBillCardItemRequired("ruleName", true);
        this.d1_A_BillCard.setItemVisible("itemClass", false);
        this.d1_A_BillCard.setBillCardItemRequired("itemClass", false);
      } else if (itemKey == "ruleItemType" && newVal == "02") {
        // 业务规则类型=扩展类时，展示扩展类路径，否则隐藏非必输
        this.d1_A_BillCard.setItemVisible("itemClass", true);

        this.d1_A_BillCard.setBillCardItemRequired("itemClass", true);
        this.d1_A_BillCard.setItemVisible("ruleId", false);
        this.d1_A_BillCard.setBillCardItemRequired("ruleId", false);
        this.d1_A_BillCard.setItemVisible("ruleName", false);
        this.d1_A_BillCard.setBillCardItemRequired("ruleName", false);
      }
    },

    // 新增
    doAdd() {
      let _this = this;
      _this.showSaveFlag = true;
      _this.d1_A_BillCard.execBillCardDefaultValueFormula();
    },

    // 修改
    doEdit() {
      let _this = this;
      _this.showSaveFlag = true;
      this.d1_A_BillCard.setBillCardValue(this.pageParams);
      // CHANGE事件,根据 是否启用变更为否时，展示动态提醒
      this.d1_A_BillCard.addEditChangeAction(this.usedIndChangeFn);
    },

    // CHANGE事件,根据 是否启用变更为否时， 动态提醒
    usedIndChangeFn(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == "usedInd" && newVal == "N") {
        this.$xutils.showMsgBox("提示", "[是否启用]字段修改为“否”保存后，【业务规则方案管理】中引用的该规则将同步修改为“否”!");
      }
    },

    // 查看
    doView() {
      let _this = this;
      _this.showSaveFlag = false;
      this.d1_A_BillCard.setBillCardValue(this.pageParams);
      this.d1_A_BillCard.setItemEditable("*", false);
    },

    // 新增保存
    onSave() {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_A_BillCard.setItemValue("updId", userInfo.loginCode);
      this.d1_A_BillCard.setItemValue("updBrId", userInfo.orgCode);
      this.d1_A_BillCard.setItemValue("updDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));
      let resp = this.d1_A_BillCard.updateBillCardData();

      if (resp && resp.code == "0") {
        this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, _rt => {
          this.$dialog.close(this.dialogId, {
            CloseType: "OK"
          });
        });
      }
    },

    // 修改保存
    onUpdate() {
      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_A_BillCard.setItemValue("updId", userInfo.loginCode);
      this.d1_A_BillCard.setItemValue("updBrId", userInfo.orgCode);
      this.d1_A_BillCard.setItemValue("updDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));

      // var resp = d1_A_BillCard.updateBillCardData();
      const cardData = this.d1_A_BillCard.getBillCardValue();

      const resp = this.updateSaveFn(cardData);

      if (resp) {
        this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, _rt => {
          this.$dialog.close(this.dialogId, {
            CloseType: "OK"
          });
        });
      }
    },

    // 返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    },

    // 调用后台java逻辑修改保存逻辑：若“是否启用”修改为否，则联动将业务规则方案中引用该规则的“是否启用”同步修改为“否”
    updateSaveFn(cfgRuleItem) {
      let rtdata = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + "/api/cfgruleitem/update/",
        data: JSON.stringify(this.$xutils.toUpperCase(cfgRuleItem, true)),

        success: (response, status, xhr) => {
          if (response.code != "0") {
            this.$xutils.showMsgBox("提示", "错误代码：" + response.code + ",错误信息：" + response.message);
          } else {
            rtdata = true;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        }
      });

      return rtdata;
    }
  }
};
</script>
