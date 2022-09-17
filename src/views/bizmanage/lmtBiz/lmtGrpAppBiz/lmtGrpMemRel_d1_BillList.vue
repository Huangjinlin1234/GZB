<template>
  <div>
    <yu-panel title="集团成员授信明细">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType"></yu-xtable-column>
        <yu-xtable-column label="敞口额度" prop="openLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度" prop="lowRiskLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="是否可调剂" prop="isAdjustFlag" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户经理提交状态" prop="managerIdSubmitStatus"></yu-xtable-column>
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
      dataUrl: this.$backend.cmisBiz + "/api/lmtgrpmemrel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtgrpmemrel/delete/"
    }
  }
}
</script>