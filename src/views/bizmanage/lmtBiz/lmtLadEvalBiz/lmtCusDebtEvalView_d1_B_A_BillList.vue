<template>
  <div>
    <yu-panel title="债项评级表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yu-button ref="btn_qryDetail" @click="customClick('qryDetail')">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams"  request-type="post">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <!--<yu-xtable-column label="业务品种" prop="busiType"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>-->
        <yu-xtable-column label="债项等级" prop="debtLevel" data-code="STD_DEBT_GRADE"></yu-xtable-column>
        <yu-xtable-column label="违约损失率LGD" prop="lgd"></yu-xtable-column>
        <yu-xtable-column label="违约风险暴露EAD" prop="ead"></yu-xtable-column>
        <yu-xtable-column label="评级生效日期" prop="evalInureDate"></yu-xtable-column>
        <yu-xtable-column label="评级到期日期" prop="evalEndDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_DEBT_GRADE,STD_ZB_GUAR_WAY');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtladeval/selectbyserno/',
      baseParams: {condition: JSON.stringify({'serno': this.$route.meta.params.serno})},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtladeval/delete/'
    };
  }
};
</script>
