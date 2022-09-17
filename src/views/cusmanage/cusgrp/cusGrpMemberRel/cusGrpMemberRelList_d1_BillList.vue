<template>
  <div>
    <yu-panel title="集团客户成员关系表">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="集团编号" prop="grpNo"></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="集团成员客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="集团关系类型" prop="grpCorreType" data-code="STD_ZB_GRP_CORRE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GRP_CORRE_TYPE');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusgrpmemberrel/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusgrpmemberrel/delete/'
    };
  }
};
</script>
