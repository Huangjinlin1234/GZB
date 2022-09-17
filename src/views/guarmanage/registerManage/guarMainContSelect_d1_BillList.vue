<template>
  <div>
    <yu-panel title="主合同列表">
      <yu-xform v-if="false" ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4"> </yu-xform-group>
      </yu-xform>
      <template slot="right"> </template>
      <yu-xtable ref="refTable" request-type="post" row-number condition-key="condition" :base-params="baseParams"  selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick"  @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同流水号" prop="guarPkId" hidden></yu-xtable-column>
        <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="是否追加担保" prop="isAddGuar" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否阶段性担保" prop="isPerGur" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="关联关系" prop="correRel" data-code="STD_ZB_CORRE_REL"></yu-xtable-column>
      </yu-xtable>     
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_GRT_FLAG,STD_ZB_YES_NO', 'STD_ZB_CORRE_REL');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarbizrstrel/query',
      baseParams: {}
    };
  },

  methods: {
    
  }
};
</script>
