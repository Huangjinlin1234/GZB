<template>
  <div>
    <yu-panel title="客户财报修改集中作业">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="报表类型" prop="fncType"></yu-xtable-column>
        <yu-xtable-column label="报表周期类型" prop="statPrdStyle"></yu-xtable-column>
        <yu-xtable-column label="报表期间" prop="statPrd"></yu-xtable-column>
        <yu-xtable-column label="报表年份" prop="fncYear"></yu-xtable-column>
        <yu-xtable-column label="报表口径 " prop="statStyle"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_B_B_A_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + "/api/fncstatbase/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + "/api/fncstatbase/delete/"
    }
  }
}
</script>