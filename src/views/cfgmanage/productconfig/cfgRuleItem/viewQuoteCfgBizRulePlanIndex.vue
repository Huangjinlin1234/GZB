<template>
  <div>
    <yu-panel title="引用该规则的业务规则方案">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_viewFn" @click="viewFn">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
        <yu-xtable-column label="业务规则方案编号" prop="planId"></yu-xtable-column>
        <yu-xtable-column label="业务规则方案名称" prop="planName"></yu-xtable-column>
        <yu-xtable-column label="方案分类" prop="planType" data-code="STD_ZB_PLAN_TYPE"></yu-xtable-column>
        <yu-xtable-column label="拦截类型" prop="notiType" data-code="STD_ZB_NOTI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      pkField: "planId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgbizruleplan/queryQuotePlan",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgbizruleplan/delete/"
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_PLAN_TYPE", "STD_ZB_NOTI_TYPE", "STD_ZB_YES_NO", "STD_ZB_OPR_TYPE");
    this.AfterInit();
  },
  methods: {
    /**
     * 业务规则方案 中该业务规则项列表页面
     */
    AfterInit() {
      let _this = this;
      let rule_item_id = _this.pageParams.ruleItemId;
      let params = { ruleItemId: rule_item_id };
      _this.dataUrl = _this.dataUrl + "/" + rule_item_id;
      _this.$refs.refTable.remoteData({ condition: JSON.stringify(params) });
    },

    // 查看
    viewFn() {
      let row = this.$refs.refTable.selections[0];

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }

      row.opType = "view";
      row.op = "VIEW";
      this.goToDetailFn(row);
    },

    // 调用模板工厂配置的详情界面
    goToDetailFn(row) {
      row.model_group_no = "CMG000002";

      this.$dialog.open("业务规则方案详情", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, row);
    }
  }
};
</script>
