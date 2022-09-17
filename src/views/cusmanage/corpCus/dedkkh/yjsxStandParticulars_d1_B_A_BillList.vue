<template>
  <div>
    <yu-panel title="压降事项说明及落实情况" panel-type="simple">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="压降事项" prop="pressureDropItem" width="200"></yu-xtable-column>
        <yu-xtable-column label="计划压降金额（万元）" prop="pressureDropAmt"></yu-xtable-column>
        <yu-xtable-column label="压降计划完成时间" prop="pressureDropFinishTime"></yu-xtable-column>
        <yu-xtable-column label="压降实际完成时间" prop="actPdoFinshDate"></yu-xtable-column>
        <yu-xtable-column label="压降落实情况说明" prop="pdoActCaseMemo" width="200"></yu-xtable-column>
        <yu-xtable-column label="实际压降金额（万元）" prop="actPdoAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstdedkkhyjsx/querylistdatabylistserno',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstdedkkhyjsx/delete/'
    };
  }
};
</script>