<template>
  <div>
    <yu-panel title="重估任务表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="queryData">
        <yu-xform-group :column="4">
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="yu-xguar-class" placeholder="担保分类名称" name="guarTypeCd" @select-fn="commonSelectFn" width="300" height="300" :parms="{ guarClassStatus: '0' }"></yu-xform-item>
          <yu-xform-item label="担保分类ID" ctype="input" name="guarTypeCd" hidden></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_ZB_REVAL_TASK_STATUS" placeholder="任务状态" name="revalTaskStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_addTask" @click="addTask">新增任务</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column  label="押品统一编号" prop="guarNo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品分类名称" prop="pldimnMemo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="我行确认价值" prop="evalValue" min-width="120px" :formatter="moneyFormat"></yu-xtable-column>
        <yu-xtable-column  label="确认价值币种" prop="evalCurType" data-code="STD_ZB_CUR_TYP" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="所有人编号" prop="guarCusId" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="所有人名称" prop="guarCusName" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="客户经理" prop="cusManagerIdName"></yu-xtable-column>
        <yu-xtable-column  label="客户经理机构" prop="cusManagerOrgName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="任务状态" prop="revalTaskStatus" data-code="STD_ZB_REVAL_TASK_STATUS"></yu-xtable-column>
        <yu-xtable-column  label="生成时间" prop="createDate" min-width="120px" :formatter="dateFormat"></yu-xtable-column>
        <yu-xtable-column  label="分配人" prop="arrangeIdName"></yu-xtable-column>
        <yu-xtable-column  label="分配机构" prop="arrangeOrgName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
yufp.lookup.reg("STD_ZB_CUR_TYP");
export default {
  name: "d1_BillList",
  mixins: [mixinUtils],
  inject: ["addTask"],
  data: function() {
    return {
      pkField: "taskId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalbatchreevaltask/listQuery",
      baseParams: {
        oprType: "01"
      },
      searchFormdata: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalbatchreevaltask/delete/"
    };
  },
  methods: {
    queryData() {
      const _this = this;
      _this.$refs.refTable.remoteData({
        condition: Object.assign({ ..._this.searchFormdata }, _this.baseParams),
        sort: "create_date desc"
      });
    },
    dateFormat(row, col, val) {
      if (val) {
        return val.substr(0, 10);
      }
      return null;
    }
  }
};
</script>
