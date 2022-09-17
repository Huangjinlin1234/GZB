<template>
  <div>
    <yu-panel title="还款计划表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onAdd" @click="customClick('onAdd')">新增</yu-button>
          <yu-button ref="btn_onDelete" @click="customClick('onDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="期数" prop="terms"></yu-xtable-column>
        <yu-xtable-column label="还款时间" prop="repayDate"></yu-xtable-column>
        <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: "d1_B_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/repaycapplan/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/repaycapplan/delete/'
    };
  }
};
</script>
