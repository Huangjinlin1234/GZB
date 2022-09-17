<template>
  <div>
    <yu-panel title="项目池分配规则配置模板">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="规则方案编号" ctype="input" placeholder="规则方案编号" name="taskpoolRuleId"></yu-xform-item>
          <yu-xform-item label="有权人所属岗位" ctype="yu-xtaskpool-post" placeholder="有权人所属岗位" name="allotPrivDutyName" @select-fn="commonSelectFn" :mapping="{ dutyId: 'allotPrivDuty', dutyName: 'allotPrivDutyName' }" width="800" height="480" :parms="{ belongOrgId: '${allotPrivOrg}' }"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onInsert" @click="customClick('onInsert')">新增</yu-button>
          <yu-button ref="btn_onUpdate" @click="customClick('onUpdate')">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="customClick('onDelete')">删除</yu-button>
          <yu-button ref="btn_onView" @click="customClick('onView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ condition: { oprType: '01' } }" :default-load="true">
        <yu-xtable-column label="规则方案编号" prop="taskpoolRuleId"></yu-xtable-column>
        <yu-xtable-column label="分配方式" prop="allotWay" data-code="STD_ZB_TP_ALLOT_WAY"></yu-xtable-column>
        <yu-xtable-column label="分配方法" prop="allotMode" data-code="STD_ZB_TP_ALLOT_MODE"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="isBegin" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="有权人所属岗位" prop="allotPrivDuty"></yu-xtable-column>
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
      pkField: "taskpoolRuleId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgtaskpoolrule/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgtaskpoolrule/delete/"
    };
  }
};
</script>
