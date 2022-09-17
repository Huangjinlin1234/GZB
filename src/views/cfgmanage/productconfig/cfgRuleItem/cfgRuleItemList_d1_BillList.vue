<template>
  <div>
    <yu-panel title="业务规则项目">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="规则项目编号" ctype="input" placeholder="规则项目编号" name="ruleItemId"></yu-xform-item>
          <yu-xform-item label="规则项目名称" ctype="input" placeholder="规则项目名称" name="ruleItemName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_editFn" @click="customClick('editFn')">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_viewFn" @click="customClick('viewFn')">查看</yu-button>
          <yu-button ref="btn_viewPlanFn" @click="customClick('viewPlanFn')">查看引用的业务规则方案</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="规则项目编号" prop="ruleItemId" width="150"></yu-xtable-column>
        <yu-xtable-column label="规则项目名称" prop="ruleItemName" width="150.00"></yu-xtable-column>
        <yu-xtable-column label="拦截类型" prop="notiType" data-code="STD_ZB_NOTI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="业务规则类型" prop="ruleItemType" data-code="STD_ZB_RULE_ITEM_TYPE"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrName" width="150"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="150"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_BillList",
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "ruleItemId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgruleitem/",
      baseParams: { condition: JSON.stringify({ oprType: "01" }) },
      logicDeleteUrl: this.$backend.cmisCfg + "/api/cfgruleitem/delete/"
    };
  }
};
</script>
