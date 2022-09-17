<template>
  <div>
    <yu-panel title="客户评级表" :hideFilter="false" :collapseHide="false">
        <yu-button-drop>
          <yu-button icon="document" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams"  request-type="post">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="信用等级" prop="finalRank" data-code="STD_ZB_GRADE_RANK"></yu-xtable-column>
        <yu-xtable-column label="评级生效日期" prop="effDt"></yu-xtable-column>
        <yu-xtable-column label="评级到期日期" prop="dueDt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GRADE_RANK');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1ABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuscomgrade/querygradeinfobycusid/',
      baseParams: {condition: JSON.stringify({'cusId': this.$route.meta.params.cusId})},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtladeval/delete/'
    };
  }
};
</script>
