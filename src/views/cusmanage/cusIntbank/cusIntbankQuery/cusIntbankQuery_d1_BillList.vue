<template>
  <div>
    <yu-panel title="同业客户机构信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="机构客户编号" ctype="input" placeholder="机构客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId"  @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="客户状态 " ctype="select" placeholder="客户状态 " data-code="STD_CUS_STATE" name="cusState"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button ref="btn_$query" type="primary" v-if="checkCtrl('view')" @click="customClick('doQuery')">查看</yu-button>
        <yu-button ref="btn_doView" type="primary" v-if="checkCtrl('360view')" @click="customClick('doView')">360视图</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true"
        :utrace="true"
        u-pk-value="uPkValue"
        trace-server-name="/yusp-app-oca"
        ukey-field="cusId"
        :utrace-user-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType"  data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="客户状态 " prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusIntbankQuery_dialog_BillCard';
yufp.lookup.reg('STD_CUS_STATE,STD_ZB_CERT_TYP');
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    let sessionInfo = yufp.sessionStorage.get('YUFP-SESSION-USER');
    return {
      userId: sessionInfo.userId,
      orgId: sessionInfo.org.code,
      menuId: '',
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusintbank/queryall',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusintbank/delete/'
    };
  }
};
</script>
