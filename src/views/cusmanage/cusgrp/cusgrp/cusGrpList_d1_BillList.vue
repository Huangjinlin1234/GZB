<template>
  <div>
    <yu-panel title="集团客户基本信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="核心客户编号" ctype="input" placeholder="核心客户编号" name="coreCusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="核心客户名称" ctype="input" placeholder="核心客户名称" name="coreCusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="管户客户经理工号" ctype="input" placeholder="管户客户经理工号" name="managerId" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button ref="btn_doLook" type="primary" v-if="checkCtrl('view')" @click="customClick('doLook')">查看</yu-button>
        <yu-button ref="btn_doView" type="primary" v-if="checkCtrl('360view')" @click="customClick('doView')">360视图</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition: {'oprType':'01'}}" request-type="POST" :default-load="true">
        <yu-xtable-column label="集团客户编号" prop="grpNo"></yu-xtable-column>
        <yu-xtable-column label="集团客户状态" prop="groupCusStatus" data-code="STD_GROUP_CUS_STATUS"></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpName"></yu-xtable-column>
        <yu-xtable-column label="核心客户编号" prop="coreCusId"></yu-xtable-column>
        <yu-xtable-column label="核心客户名称" prop="coreCusName"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理工号" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_GROUP_CUS_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'grpNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusgrp/selectCusGrpList',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusgrp/delete/'
    };
  }
};
</script>
