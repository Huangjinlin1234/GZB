<template>
  <div>
    <yu-panel title="业务权申领" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务权申领人" ctype="input" placeholder="业务权申领人" name="bizRightsAarBrId"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerIdName"  @select-fn="commonSelectFn" :mapping="{'userName':'managerIdName','loginCode':'managerId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_onAppStart" v-if="checkCtrl('add')" @click="customClick('onAppStart')">申请发起</yu-button>
        <yu-button type="primary" ref="btn_update" v-if="checkCtrl('edit')" @click="customClick('update')">修改</yu-button>
        <yu-button type="primary" ref="btn_onDelete" v-if="checkCtrl('delete')" @click="customClick('onDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_view" v-if="checkCtrl('view')" @click="customClick('view')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition"  request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="aarAppSerno"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrgName"></yu-xtable-column>
        <yu-xtable-column label="业务权申领人" prop="bizRightsAarBrIdName"></yu-xtable-column>
        <yu-xtable-column label="业务权申领人机构" prop="bizRightsAarBrIdOrgName"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'aarAppSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbizaarapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusbizaarapp/delete/'
    };
  }
};
</script>