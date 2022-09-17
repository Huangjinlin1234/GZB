<template>
  <div>
    <yu-panel title="集团成员授信明细">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="成员客户编号" prop="grpCusId"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="grpCusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="grpCusType"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="是否本次变更" prop="isCurtChg" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/delete/'
    };
  }
};
</script>