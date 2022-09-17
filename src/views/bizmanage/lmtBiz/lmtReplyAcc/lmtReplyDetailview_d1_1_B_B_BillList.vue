<template>
  <div>
    <yu-panel title="用信及其他限制条件">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="用信条件及其他限制性条件" prop="condDesc"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_1_B_B_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtreplyaccneedsub/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtreplyaccneedsub/delete/"
    }
  }
}
</script>