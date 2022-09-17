<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls"></yu-xform-item>
          <yu-xform-item label="客户经理工号" ctype="input" placeholder="模糊查询" name="managerId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" placeholder="客户类型" name="cusType" data-code="STD_ZB_CUS_TYP" hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrIdName" hidden></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="模糊查询" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户状态" ctype="select" data-code="STD_CUS_STATE" placeholder="客户状态" name="cusState"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="公司客户信息列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop show-length="7">
        <yu-button type="primary" ref="btn_doView" @click="customClick('doView')" v-if="checkCtrl('doView')">查看</yu-button>
        <yu-button type="primary" ref="btn_do360View" @click="customClick('do360View')" v-if="checkCtrl('do360View')">360视图</yu-button>
        <yu-button type="primary" ref="btn_doQuery" @click="customClick('doJQQuery')" v-if="checkCtrl('doJQQuery')">打印结清证明</yu-button>
        <yu-button type="primary"  @click="enterPay" v-if="checkCtrl('enterPay')">分成比例录入</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="POST" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="客户编号" prop="cusId" width="160px"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理工号" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
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
      dataUrl: this.$backend.cmisCus + '/api/cusbase/',
      baseParams: { condition: { cusCatalog: '2' } },
      deleteUrl: this.$backend.cmisCus + '/api/cusbase/delete/'
    };
  },
  methods: {
    enterPay () {
      var _this = this;
      if (this.$refs.refTable.selections.length == '0') {
        return this.$message.error('请选中一条数据');
      }
      const jsoPar = _this.$refs.refTable.selections[0];

      var managerId = jsoPar.managerId;
      console.log('managerId', managerId);
      if (this.$store.state.oauth.loginCode != managerId) {
        this.$xutils.showMsgBox('提示', '非管户客户经理不可进入分成比例录入页面!', 350, 150);
        return;
      }

      // yufp.service.request({
      //   method: 'POST',
      //   url: this.$backend.cmisCus + '/api/cusmgrdivideperc/orgAccessCheck',
      //   callback: function (code, message, response) {
      //     if(code == '0') {
      //       console.log('right', response)
      //       if(response.data.flag) {
      //         _this.$router.addTab({
      //         name: 'cusmanage/cusCorp/cusCorpQuery/cusCorpQueryEnteringIndex',
      //         key: new Date().getTime(),
      //         title: '客户经理分成比例录入',
      //         data: _this.$refs.refTable.selections[0]
      //         });
      //       } else {
      //         _this.$message.error('该机构暂无权限操作')
      //       }
      //     } else {
      //       _this.$message.error(response.message)
      //        console.log('cuowu', response)
      //     }
      //   }
      // })
      this.$router.addTab({
        name: 'cusmanage/cusCorp/cusCorpQuery/cusCorpQueryEnteringIndex',
        key: new Date().getTime(),
        title: '客户经理分成比例录入',
        data: this.$refs.refTable.selections[0]
      });
    }
  }
};
</script>
