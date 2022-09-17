<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgRuleItemList_d1_BillList.vue";
const detailPage = "/yuxp/product/pages/cfgmanage/productconfig/cfgRuleItem/cfgRuleItemCardDetail.js";

export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_NOTI_TYPE", "STD_ZB_RULE_ITEM_TYPE", "STD_ZB_YES_NO", "STD_ZB_OPR_TYPE");
    this.AfterInit();
  },
  methods: {
    /**
     * 业务规则项目列表页面
     */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增
    addFn() {
      const params = {
        opType: "add"
      };

      this.$dialog.open("新增", "cfgmanage/productconfig/cfgRuleItem/cfgRuleItemCardDetailIndex", 900, 650, params, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 修改
    editFn() {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作！");
        return;
      }

      row.opType = "edit";

      this.$dialog.open("修改", "cfgmanage/productconfig/cfgRuleItem/cfgRuleItemCardDetailIndex", 900, 650, row, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 查看
    viewFn() {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }

      row.opType = "view";
      this.$dialog.open("", "cfgmanage/productconfig/cfgRuleItem/cfgRuleItemCardDetailIndex", 900, 650, row, null);
    },

    // 查看引用该规则项目的业务规则方案
    viewPlanFn() {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }

      this.$dialog.open("查看", "cfgmanage/productconfig/cfgRuleItem/viewQuoteCfgBizRulePlanIndex", 900, 650, row, null);
    },

    // 删除，删除前先校验该规则是否被业务规则方案引用，若已被业务规则方案引用，则不能删除
    deleteFn() {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作！");
        return;
      }

      // 获取业务规则项目编号查询条件
      let rule_item_id = row.ruleItemId;

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + "/api/cfgbizruleplan/queryQuotePlan/" + rule_item_id,
        type: "GET",

        success: (response, status, xhr) => {
          if (response.code != "0") {
            this.$xutils.showMsgBox("提示", "错误代码：" + response.code + ",错误信息：" + response.message);
          } else {
            // 返回数据条数
            let length = response.data.length;
            if (length > 0) {
              this.$xutils.showMsgBox("提示", "该规则已被“业务规方案”引用，不能删除！"); // 弹出提示
            } else {
              // 进行逻辑删除
              let returnObj = this.d1_BillList.onBillListLogicDelete();
              if (returnObj && returnObj.code === "0") {
                if (returnObj.data && returnObj.data > 0) {
                  this.d1_BillList.queryDataByCondition({ oprType: "01" });
                }
              }
            }
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        }
      });
    }
  }
};
</script>
