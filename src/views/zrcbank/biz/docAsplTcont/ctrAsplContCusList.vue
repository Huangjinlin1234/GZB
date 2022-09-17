<template>
  <yu-panel title="">
        <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
            <yu-xform-group :column="2">
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition: {'cusCatalog':'2','cusState':'2'}}" :default-load="false" request-type="POST">
            <yu-xtable-column label="客户编号" prop="cusId" width="150px"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="150px"></yu-xtable-column>
            <yu-xtable-column label="资产池协议" prop="cusRankCls" width="100px"></yu-xtable-column>
            <yu-xtable-column label="客户大类" prop="cusCatalog" width="100px" data-code="STD_ZB_CUS_CATALOG"></yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusType" width="100px" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="证件类型" prop="certType" width="200px" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
            <yu-xtable-column label="证件号码" prop="certCode" width="200px"></yu-xtable-column>
            <yu-xtable-column label="企业性质" prop="corpQlty" width="100px" data-code="STD_ZB_CORP_QLTY"></yu-xtable-column>
            <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
            <yu-xtable-column label="客户管户经理" prop="managerId" width="100px"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" width="100px"></yu-xtable-column>
        </yu-xtable>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" ref="btn_importIndiv" @click="importUser">确定</yu-button>
            <yu-button type="primary" ref="btn_onCancel" @click="onCancel">返回</yu-button>
        </yu-form-buttons>
    </yu-panel>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CORP_QLTY,STD_ZB_CUS_CLS,STD_ZB_CUS_CATALOG,STD_ZB_CERT_TYP,STD_CUS_STATE,STD_ZB_CUS_TYP');
export default{
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbase/baseCrop',
      baseParams: {}
    };
  }
};
</script>
