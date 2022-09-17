<template>
  <div>
    <yu-panel title="抵押物列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" >
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_imPort" @click="customClick('imPort')">引入</yu-button>
          <yu-button ref="btn_offImport" @click="customClick('offImport')">取消引入</yu-button>
          <yu-button ref="btn_checkInfo" @click="customClick('checkInfo')">查看押品信息</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" requestType="POST">
        <yu-xtable-column label="抵质押物编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column label="抵质押物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column label="权属人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="抵质押物类型" prop="grtFlag"></yu-xtable-column>
        <yu-xtable-column label="评估金额（元）" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="抵质押物状态" prop="guarState"></yu-xtable-column>
        <yu-xtable-column label="质押物类型细分" prop="guarTypeCd"></yu-xtable-column>
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