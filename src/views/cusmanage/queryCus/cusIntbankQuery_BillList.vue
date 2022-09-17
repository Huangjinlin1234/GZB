<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="社会信用代码" ctype="input" placeholder="模糊查询" name="socialCreditCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="机构客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户状态 " ctype="select" placeholder="客户状态 " data-code="STD_CUS_STATE" name="cusState" hidden></yu-xform-item>
          <yu-xform-item label="客户经理编号" ctype="input" placeholder="模糊查询" name="managerId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrIdName" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="同业客户信息列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop show-length="7">
        <yu-button type="primary" ref="btn_$query" @click="customClick('doQuery')" v-if="checkCtrl('doQuery')">查看</yu-button>
        <yu-button type="primary" ref="btn_doView" @click="customClick('doView')" v-if="checkCtrl('doView')">360视图</yu-button>
      </yu-button-drop>
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
        <yu-xtable-column label="机构客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="社会信用代码" prop="socialCreditCode" ></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId" ></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
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
import dialogBillcard from '@/views/cusmanage/cusIntbank/cusIntbankQuery/cusIntbankQuery_dialog_BillCard';
yufp.lookup.reg('STD_CUS_STATE');
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
      dataUrl: this.$backend.cmisCus + '/api/cusintbank/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusintbank/delete/'
    };
  }
};
</script>
