<template>
  <div>
    <yu-panel title="优企贷-历史信贷表现（灰名单）"  :hideFilter="false" :collapseHide="false">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number request-type="POST" :data="data" :base-params="baseParams" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户经理" prop="managerName"></yu-xtable-column>
        <yu-xtable-column label="证件号" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="name" width="250"></yu-xtable-column>
        <yu-xtable-column label="金额" prop="amt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_ZB_ASSURE_MEANS"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="busType"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="productName"></yu-xtable-column>
        <yu-xtable-column label="风险分类 " prop="riks"></yu-xtable-column>
        <yu-xtable-column label="原因" prop="reason" width="300"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/hiscredit/',
      baseParams: {condition: {}},
      data: [],
      deleteUrl: this.$backend.cmisBiz + '/api/hiscredit/delete/'
    };
  }
};
</script>