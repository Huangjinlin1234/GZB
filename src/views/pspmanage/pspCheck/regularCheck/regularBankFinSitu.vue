/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="本行融资情况（低风险业务不纳入）" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="get" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="融资品种" prop="finVariet"></yu-xtable-column>
        <yu-xtable-column label="融资金额（元）" prop="finAmt" width="100px"></yu-xtable-column>
        <yu-xtable-column label="融资余额（元）" prop="finLmt"></yu-xtable-column>
        <yu-xtable-column label="逾期本金（元）" prop="overdueCapAmt" width="100px"></yu-xtable-column>
        <yu-xtable-column label="拖欠利息（元）" prop="debitInt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/pspbankfinsitu/queryList',
      baseParams: {},
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      taskNo: ''
    };
  },
  mounted () {
    this.taskNo = this.$parent.$route.params.pspTask.taskNo;
  }
};
</script>
