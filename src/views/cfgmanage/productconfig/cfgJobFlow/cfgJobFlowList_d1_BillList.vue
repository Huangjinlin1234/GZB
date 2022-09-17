<template>
  <div>
    <yu-panel title="作业流配置管理">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="作业流编号" ctype="input" placeholder="作业流编号" name="jobFlowId"></yu-xform-item>
          <yu-xform-item label="工作流编号" ctype="yu-xflow-define" placeholder="工作流编号" name="wfiSignId" @select-fn="commonSelectFn" :mapping="{ flowId: 'wfiSignId', flowName: 'wfiSignName' }" width="480" height="480"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_editFn" @click="customClick('editFn')">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_viewFn" @click="customClick('viewFn')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="作业流编号" prop="jobFlowId"></yu-xtable-column>
        <yu-xtable-column label="工作流编号" prop="wfiSignId"></yu-xtable-column>
        <yu-xtable-column label="工作流名称" prop="wfiSignName"></yu-xtable-column>
        <yu-xtable-column label="审批查看模板组" prop="apprViewUrl"></yu-xtable-column>
        <yu-xtable-column label="审批调整模板组" prop="apprAdjustTpl"></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
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
      pkField: "jobFlowId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgjobflow/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgjobflow/delete/"
    };
  }
};
</script>
