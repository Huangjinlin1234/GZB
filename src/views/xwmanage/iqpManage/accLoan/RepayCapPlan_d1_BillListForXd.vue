<template>
  <div>
    <yu-panel title="还本计划" panel-type="simple">
       <yu-xtable ref="refTable1" request-type="POST"  :base-params="baseParams" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="期数" prop="terms" ></yu-xtable-column>
        <yu-xtable-column label="还款日期" prop="repayDate"></yu-xtable-column>
        <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ACC_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  components: { YufpExcelExport, YufpExcelImport },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'billNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/repaycapplan/selectByModel',
      baseParams: {condition: {serno: this.getFactory().contextData.pvpSerno, oprType: '01'}}
    };
  }
};
</script>
