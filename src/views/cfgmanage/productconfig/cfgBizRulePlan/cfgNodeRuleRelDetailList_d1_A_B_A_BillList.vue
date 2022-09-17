<template>
  <div>
    <yu-panel title="流程节点列表">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="节点编号" prop="nodeId"></yu-xtable-column>
        <yu-xtable-column label="节点名称" prop="nodeName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_A_B_A_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'flowId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.appOcaService + "/api/nwfflow/",
      baseParams: {},
      deleteUrl: this.$backend.appOcaService + "/api/nwfflow/delete/"
    }
  }
}
</script>