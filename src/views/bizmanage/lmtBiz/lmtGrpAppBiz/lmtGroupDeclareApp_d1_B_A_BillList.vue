<template>
  <div>
    <yu-panel title="授信成员信息">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType"></yu-xtable-column>
        <yu-xtable-column label="敞口额度" prop="openLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度" prop="lowRiskLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="是否参与本次申报" prop="isPrtcptCurtDeclare"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operate" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_B_A_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
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