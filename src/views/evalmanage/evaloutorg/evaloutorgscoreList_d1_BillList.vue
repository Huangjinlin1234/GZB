<template>
  <div>
    <yu-panel title="评价外部评估机构" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="押品统一编号 " ctype="input" placeholder="押品统一编号 " name="guarNo"></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="yu-xcustom-ref" placeholder="押品分类名称" name="guarClassName" @select-fn="commonSelectFn" :mapping="{ guarTypeCdCnname: 'guarClassName', guarTypeCd: 'guarClassCode' }" width="80%" height="550" :parms="{ guarTypeState: '0' }" :selectionType="radio" pagePath="guarmanage/collateralInfo/guarRef/guarClassRefDialogIndex" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="外部评估机构" ctype="input" placeholder="外部评估机构" name="outOrgRegName"></yu-xform-item>
          <yu-xform-item label="评价状态" ctype="select" data-code="STD_ZB_EVAL_STATUS" placeholder="评价状态" name="evalStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_onEval" @click="onEval()">评分</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView()">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="评价任务ID" prop="evalTaskId" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="押品统一编号 " prop="guarNo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品分类代码" prop="guarClassCode" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品分类名称" prop="guarClassName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="外部评估机构" prop="outOrgRegName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="任务发起行" prop="evalTaskStartOrgName" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="任务发起日期" prop="taskStartDate" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="任务结束日期" prop="tastEndDate" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="任务发起人" prop="evalTaskStartName" width="100"></yu-xtable-column>
        <yu-xtable-column  label="评分" prop="evalScore"></yu-xtable-column>
        <yu-xtable-column  label="评价状态" prop="evalStatus" data-code="STD_ZB_EVAL_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%">
      <dialog-billcard ref="dialog_BillCard" style="overflow:hidden auto;height:100%"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
import dialogBillcard from "./evaloutorgscoreList_dialog_BillCard";
export default {
  name: "d1_BillList",
  components: { dialogBillcard },
  inject: ["onEval", "onBillListView"],
  mixins: [mixinUtils],
  data: function() {
    let _this = this;
    return {
      pkField: "evalTaskId",
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
