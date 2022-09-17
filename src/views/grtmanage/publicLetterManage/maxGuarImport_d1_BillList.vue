<template>
  <div>
    <yu-panel title="引入最高额担保合同界面">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="担保合同编号" prop="guarContNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="借款人客户编号" prop="borrowerId" width="120"></yu-xtable-column>
        <yu-xtable-column label="借款人名称" prop="borrowerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" width="100" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="80" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="担保合同金额" prop="guarAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate" width="90"></yu-xtable-column>
        <yu-xtable-column label="担保终止日" prop="guarEndDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState" width="100" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
      </yu-xtable>
       <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
        <yu-button type="primary" @click="customClick('OnImport')">选取</yu-button>
        <yu-button type="primary" @click="customClick('OnCancel')">返回</yu-button>
      </yu-form-buttons>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup} from '@/utils';
lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_GUAR_WAY,STD_GUAR_CONT_STATE');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarcont/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/grtguarcont/delete/'
    };
  }
};
</script>