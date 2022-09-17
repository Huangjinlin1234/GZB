<template>
  <div>
    <yu-panel title="集团客户评级及债项评级">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_qryDetail" @click="customClick('qryDetail')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST" :base-params="baseParams">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="业务品种" prop="busiType"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarType"></yu-xtable-column>
        <yu-xtable-column label="债项等级" prop="debtLevel"></yu-xtable-column>
        <yu-xtable-column label="违约风险暴露ead" prop="ead"></yu-xtable-column>
        <yu-xtable-column label="违约损失率lgd" prop="lgd"></yu-xtable-column>
        <yu-xtable-column label="评级生效日期" prop="evalInureDate"></yu-xtable-column>
        <yu-xtable-column label="评级到期日期" prop="evalEndDate"></yu-xtable-column>
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
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/getGrpLadEvalList',
      // baseParams: {condition: JSON.stringify(this.getFactory().contextData.grpCusId)},
      baseParams: {condition: {'grpCusId': this.$route.meta.params.grpCusId} },
      deleteUrl: this.$backend.cmisBiz + '/api/lmtladeval/delete/'
    };
  },
  mounted () {
  }
};
</script>
