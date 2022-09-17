<template>
  <div>
    <yu-panel title="优企贷-涉诉信息"  :hideFilter="false" :collapseHide="false">

      <yu-xtable ref="refTable" row-number request-type="POST" :base-params="baseParams"  selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务角色" prop="n_ssdw_ys" data-code="BUSI_ROLE"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="c_gkws_dsr"></yu-xtable-column>
        <yu-xtable-column label="案号" prop="c_ah"></yu-xtable-column>
        <yu-xtable-column label="诉讼地位" prop="n_ssdw"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1ABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtlitgatinfo/qyssxx',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/yqdriskinfo/queryLawsuit/delete/'
    };
  }
};
</script>
