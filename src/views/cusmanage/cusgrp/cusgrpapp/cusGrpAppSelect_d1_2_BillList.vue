<template>
  <div>
    <yu-panel title="同业客户选择弹出框">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" width="200px" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="200px"></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" ref="btn_importIntBank" @click="customClick('importIntBank')">确定</yu-button>
      <yu-button type="primary" ref="btn_onCancel" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D12BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusintbank/',
      baseParams: {}
    };
  }
};
</script>
