<template>
  <div>
    <yu-panel title="优企贷-征信风险提示"  :hideFilter="false" :collapseHide="false">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number request-type="POST" :data="data" :base-params="baseParams" condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="姓名" prop="name"></yu-xtable-column>
        <yu-xtable-column label="提示项" prop="item"></yu-xtable-column>
        <yu-xtable-column label="结果" prop="result"></yu-xtable-column>
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
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditrisk/',
      baseParams: {condition: {}},
      data: [],
      deleteUrl: this.$backend.cmisBiz + '/api/creditrisk/delete/'
    };
  }
};
</script>