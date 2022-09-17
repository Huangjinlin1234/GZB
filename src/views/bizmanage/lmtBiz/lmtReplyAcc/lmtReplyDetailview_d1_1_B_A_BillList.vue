<template>
  <div>
    <yu-panel title="批复台账分项明细">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="分项台账" prop="accSubNo"></yu-xtable-column>
        <yu-xtable-column label="分项台账名称" prop="accSubName"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode"></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="授信期限" prop="lmtTerm"></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_1_B_A_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtreplyaccsub/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtreplyaccsub/delete/"
    }
  }
}
</script>