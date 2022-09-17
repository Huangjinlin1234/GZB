<template>
  <div>
    <yu-panel title="集团成员授信填报">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_update" @click="customClick('update')">授信填报</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="集团客户名称" prop="grpCusName"></yu-xtable-column>
        <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusId"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度合计" prop="lowRiskTotalLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtgrpapp/query",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtgrpapp/delete/"
    }
  }
}
</script>
