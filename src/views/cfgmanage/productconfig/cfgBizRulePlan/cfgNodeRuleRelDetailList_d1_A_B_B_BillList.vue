<template>
  <div>
    <yu-panel title="业务规则方案流程节点-拦截方案选项">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="规则项编号" prop="ruleItemId" width="100"></yu-xtable-column>
        <yu-xtable-column label="规则项名称" prop="ruleItemName"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="拦截类型" prop="notiType" data-code="STD_ZB_NOTI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="是否选中" prop="selectInd" width="200.00" data-code="STD_ZB_SELECT_IND"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_A_B_B_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + "/api/cfgnoderulerel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgnoderulerel/delete/"
    }
  }
}
</script>