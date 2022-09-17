<template>
  <div>
    <yu-panel title="公司客户信息列表" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId"  @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="管户客户经理工号" ctype="input" placeholder="管户客户经理" name="managerId"></yu-xform-item>
          <yu-xform-item label="客户状态" ctype="select" data-code="STD_CUS_STATE" placeholder="客户状态" name="cusState"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_do360View" v-if="checkCtrl('360view')" @click="customClick('do360View')" hidden>360视图</yu-button>
        <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
        <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('enterFn')" @click="enterFn">分成比例录入</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="POST" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="客户编号" prop="cusId" width="160px"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbase/baseCropByManageIdForList',
      baseParams: { condition: { cusCatalog: '2' } },
      deleteUrl: this.$backend.cmisCus + '/api/cusbase/delete/'
    };
  },
  watch: {
    'searchFormdata.managerId': function (val) {
      if (val) {
        this.searchFormdata.source = '2';
      }
    }
  },
  methods: {
    enterFn () {
      var selectData = this.$refs.refTable.selections[0];
      if (!selectData) {
        return this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
      }
      var managerId = selectData.managerId;
      if (this.$store.state.oauth.loginCode != managerId) {
        this.$xutils.showMsgBox('提示', '非管户客户经理不可进入分成比例录入页面!', 350, 150);
        return;
      }
      this.$router.addTab({
        name: 'cusmanage/cusCorp/cusCorpQuery/cusCorpQueryEnteringIndex',
        key: new Date().getTime(), // 必传
        title: '公司客户查看',
        data: selectData
      });
    }
  }
};
</script>
