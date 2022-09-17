<template>
  <div>
    <yu-panel title="业务权分配申请信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="分配状态" ctype="select" data-code="STD_CUS_DIVIS_STATE" :clearable="true" placeholder="分配状态" name="divisState" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_onAssign" v-if="checkCtrl('add')" @click="customClick('onAssign')">分配发起</yu-button>
        <yu-button type="primary" ref="btn_update" v-if="checkCtrl('edit')" @click="customClick('update')">修改</yu-button>
        <yu-button type="primary" ref="btn_deleteBtn" v-if="checkCtrl('delete')" @click="customClick('deleteBtn')">删除</yu-button>
        <yu-button type="primary" ref="btn_view" v-if="checkCtrl('view')" @click="customClick('view')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="assignAppSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"  ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"  ></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType"   data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"  ></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"  ></yu-xtable-column>
        <yu-xtable-column label="分配状态" prop="divisState" data-code="STD_CUS_DIVIS_STATE" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_CUS_DIVIS_STATE,STD_ZB_CERT_TYP');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'assignAppSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbizassignapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusbizassignapp/delete/'
    };
  }
};
</script>