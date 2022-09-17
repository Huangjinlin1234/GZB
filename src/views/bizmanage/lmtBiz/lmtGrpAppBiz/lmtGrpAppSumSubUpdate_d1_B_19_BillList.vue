<template>
  <div>
    <yu-panel title="授信分项明细（YUFP中修改成展开树）">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="成员所属名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="分项流水号" prop="subSerno"></yu-xtable-column>
        <yu-xtable-column label="授信品种" prop="subName"></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolvLmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="授信期限(月)" prop="lmtTerm"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_B_19_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api//",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api//delete/"
    }
  }
}
</script>