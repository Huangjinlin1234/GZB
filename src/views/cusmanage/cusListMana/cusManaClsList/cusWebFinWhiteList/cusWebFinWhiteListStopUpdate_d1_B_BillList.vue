<template>
  <div>
    <yu-panel title="停用名单明细" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" :base-params="baseParams" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstwjkhmxxx/',
      // baseParams: {condition: {'oprType': '01'}},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstwjkhmxxx/delete/'
    };
  }
};
</script>