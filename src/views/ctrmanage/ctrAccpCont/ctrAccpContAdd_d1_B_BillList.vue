<template>
  <div>
    <yu-panel title="担保合同信息" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="post" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="担保合同编号 " prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState"></yu-xtable-column>
        <yu-xtable-column label="纸质合同签订日期" prop="signDate" ctype="datepicker"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_GUAR_CONT_TYPE');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarbizrstrel/querygrtguarcontbyparams',
      baseParams: {contNo: this.pageParams.contNo},
      deleteUrl: this.$backend.cmisBiz + '/api/grtguarcont/delete/'
    };
  }
};
</script>
