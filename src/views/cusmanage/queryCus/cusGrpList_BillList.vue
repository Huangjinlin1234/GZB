<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="模糊查询" name="grpNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="核心客户编号" ctype="input" placeholder="模糊查询" name="coreCusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" hidden></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="模糊查询" name="grpName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="核心客户名称" ctype="input" placeholder="模糊查询" name="coreCusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrIdName" hidden></yu-xform-item>
          <yu-xform-item label="集团客户状态" ctype="select" placeholder="集团客户状态" name="groupCusStatus" data-code="STD_GROUP_CUS_STATUS"></yu-xform-item>
          <yu-xform-item label="集团紧密程度" ctype="select" placeholder="集团紧密程度" name="grpCloselyDegree" data-code="STD_ZB_CLOSELY_DEGREE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="集团客户信息列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop show-length="7">
        <yu-button type="primary" ref="btn_doLook" @click="customClick('doLook')" v-if="checkCtrl('doLook')">查看</yu-button>
        <yu-button type="primary" ref="btn_doView" @click="customClick('doView')" v-if="checkCtrl('doView')">360视图</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition: {'oprType':'01'}}" request-type="POST" :default-load="true">
        <yu-xtable-column label="集团客户编号" prop="grpNo"></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpName"></yu-xtable-column>
        <yu-xtable-column label="核心客户编号" prop="coreCusId"></yu-xtable-column>
        <yu-xtable-column label="核心客户名称" prop="coreCusName"></yu-xtable-column>
        <yu-xtable-column label="集团紧密程度" prop="grpCloselyDegree" data-code="STD_ZB_CLOSELY_DEGREE"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="集团客户状态" prop="groupCusStatus" data-code="STD_GROUP_CUS_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
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
