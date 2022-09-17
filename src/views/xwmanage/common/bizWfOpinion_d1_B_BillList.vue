<template>
  <div>
    <yu-panel title="审批意见">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="处理节点名称" prop="nodeName"></yu-xtable-column>
        <yu-xtable-column label="处理时间" prop="startTime"></yu-xtable-column>
        <yu-xtable-column label="审批人员" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="处理标志" prop="commentSign" data-code="STD_ZB_WF_OPR_FLAG"></yu-xtable-column>
        <yu-xtable-column label="审批意见" prop="userComment"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_B_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'instanceId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.appOcaService + "/api//",
      baseParams: {},
      deleteUrl: this.$backend.appOcaService + "/api//delete/"
    }
  }
}
</script>