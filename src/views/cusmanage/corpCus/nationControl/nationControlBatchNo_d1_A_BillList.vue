<template>
  <div>
    <yu-panel title="国控类批量转否">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition"  @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId" width="140"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="200"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="200"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" width="170" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="是否国控" prop="isNatctl" width="100" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1ABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuscorp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuscorp/delete/'
    };
  }
};
</script>