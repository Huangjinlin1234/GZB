<template>
  <div>
    <yu-panel title="抵质押物列表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_OnImport" @click="customClick('OnImport')">引入押品</yu-button>
          <yu-button ref="btn_offImport" @click="customClick('offImport')">取消引入</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" requestType="POST">
        <yu-xtable-column label="押品编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column label="抵质押类别" prop="guarType"></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="认定价值" prop="confirmAmt" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/delete/'
    };
  }
};
</script>