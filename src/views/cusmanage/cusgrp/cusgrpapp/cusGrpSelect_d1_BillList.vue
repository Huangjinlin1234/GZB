<template>
  <div>
    <yu-panel title="集团客户弹出框">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpNo"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="集团客户编号" prop="grpNo"></yu-xtable-column>
        <yu-xtable-column label="集团客户状态" prop="groupCusStatus" data-code="STD_GROUP_CUS_STATUS"></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpName"></yu-xtable-column>
        <yu-xtable-column label="核心客户编号" prop="coreCusId"></yu-xtable-column>
        <yu-xtable-column label="核心客户名称" prop="coreCusName"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" ref="btn_importIndiv" @click="customClick('importCusGrp')">确定</yu-button>
      <yu-button type="primary" ref="btn_onCancel" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_GROUP_CUS_STATUS');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'grpNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusgrp/',
      baseParams: {condition: {'managerId': this.$xutils.getDefaultformulaData('$LoginLoginCode')}},
      deleteUrl: this.$backend.cmisCus + '/api/cusgrp/delete/'
    };
  }
};
</script>
