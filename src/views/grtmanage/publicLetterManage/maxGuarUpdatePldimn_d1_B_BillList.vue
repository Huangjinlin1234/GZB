<template>
  <div>
    <yu-panel title="抵质押物列表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_OnImport" @click="customClick('imPort')">引入押品</yu-button>
          <yu-button ref="btn_offImport" @click="customClick('offImport')">取消引入</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" requestType="POST">
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
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/selectGuarBaseInfoByGuarContNo',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/delete/'
    };
  },

  created () {
    var _this = this;
    var guarContNo = '';
    if (_this.getFactory().contextData) {
      guarContNo = _this.getFactory().contextData.guarContNo;
    } else if (_this.pageParams) {
      guarContNo = _this.pageParams.guarContNo;
    }
    _this.baseParams = {
      condition: { guarContNo: guarContNo }
    };
  }
};
</script>