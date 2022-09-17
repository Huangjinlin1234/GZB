<template>
  <div>
    <yu-panel title="评价任务明细" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4"> </yu-xform-group>
      </yu-xform>
      <template> </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="评价任务id" prop="evalTaskId" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="押品统一编号 " prop="guarNo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品分类代码" prop="guarClassCode" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品分类名称" prop="guarClassName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="经办人名称" prop="evalTaskStartName" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="任务发起日期" prop="taskStartDate" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="经办机构" prop="evalTaskStartOrgName" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="评分" prop="evalScore"></yu-xtable-column>
        <yu-xtable-column  label="评价状态" prop="evalStatus" data-code="STD_ZB_EVAL_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillList",
  mixins: [mixinUtils],
  data: function() {
    let _this = this;
    return {
      pkField: "rid",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: _this.$backend.cmisEval + "/api/guarevaloutorgscore/",
      baseParams: {},
      deleteUrl: _this.$backend.cmisEval + "/api/guarevaloutorgscore/delete/"
    };
  }
};
</script>
