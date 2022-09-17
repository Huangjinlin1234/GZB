<template>
  <div>
    <yu-panel title="专业贷款评级" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yu-button ref="btn_viewDetail" @click="customClick('viewDetail')">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams"  request-type="post">
        <yu-xtable-column label="授信申请流水号" prop="lmtSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="评级年度" prop="gradeYear"></yu-xtable-column>
        <yu-xtable-column label="评级发生类型" prop="gradeHappenType"></yu-xtable-column>
        <yu-xtable-column label="评级模型" prop="gradeMode"></yu-xtable-column>
        <yu-xtable-column label="专业贷款调整后等级" prop="afterGrade"></yu-xtable-column>
        <yu-xtable-column label="专业贷款最终认定等级" prop="finalGrade"></yu-xtable-column>
        <yu-xtable-column label="专业贷款预期损失率" prop="expectedLossRate"></yu-xtable-column>
        <yu-xtable-column label="风险大类" prop="bigriskclass"></yu-xtable-column>
        <yu-xtable-column label="风险种类" prop="midriskclass"></yu-xtable-column>
        <yu-xtable-column label="风险小类" prop="fewriskclass"></yu-xtable-column>
        <yu-xtable-column label="风险划分日期" prop="riskdividedate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/majorgradeinfo/selectbylmtserno/',
      baseParams: {condition: JSON.stringify({'lmtSerno': this.$route.meta.params.serno})},
      deleteUrl: this.$backend.cmisBiz + '/api/majorgradeinfo/delete/'
    };
  }
};
</script>
