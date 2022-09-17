<template>
  <div>
    <yu-panel title="保证担保信息" panel-type="normal">
        <yu-toolbar>
          <yu-button type="primary" @click="customClick('OnImportGuar')">引入</yu-button>
          <yu-button type="primary" @click="customClick('doUpdateGuarantee')">修改</yu-button>
          <yu-button type="primary" @click="customClick('doViewGuarantee')">查看</yu-button>
          <yu-button type="primary" @click="customClick('delete')">删除</yu-button>
        </yu-toolbar>
      <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio"  request-type="post" :base-params="searchData" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="担保编号" prop="guarantyId"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="保证人客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型" prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="担保金额(元)" prop="guarAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {
        serno: this.getFactory().contextData.subSerno
      }},
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/querguaranteerel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/deleteGuaranteefoSell/'
    };
  }
};
</script>
