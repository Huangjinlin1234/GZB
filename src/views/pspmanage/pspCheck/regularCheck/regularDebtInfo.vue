/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="借据信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio"  :base-params="baseParams"  :data-url="dataUrl" default-load="false">
        <yu-xtable-column label="客户编号" v-if="!isOper" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" v-if="!isOper" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="担保方式" v-if="isOper" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="借据起始日" v-if="isOper" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="借据到期日" v-if="isOper" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="借据金额（元）" v-if="isOper" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="借据余额（元）" v-if="isOper" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" v-if="!isOper" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" v-if="!isOper" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="拖欠利息（元）" prop="debitInt"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" v-if="!isOper" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" v-if="!isOper" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保方式" v-if="!isOper" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="执行年利率" v-if="!isOper" prop="execRateYear"></yu-xtable-column>
        <yu-xtable-column label="五级分类" v-if="!isOper" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_FIVE_CLASS');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/pspdebitinfo/queryList',
      baseParams: {},
      // baseParams: {},
      isOper: false
      // taskNo: ''
    };
  },
  props: {
    taskNo: String
  },
  created () {
    this.baseParams = {condition: {taskNo: this.taskNo}};
  },

  methods: {
  }
};
</script>
