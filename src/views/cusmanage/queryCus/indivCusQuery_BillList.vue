<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" placeholder="客户分类" name="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xform-item>
          <yu-xform-item label="客户经理工号" ctype="input" placeholder="模糊查询" name="managerId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" placeholder="客户类型" name="cusType" data-code="STD_ZB_CUS_TYP" hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrIdName" hidden></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="模糊查询" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户状态" ctype="select" placeholder="客户状态" name="cusState" data-code="STD_CUS_STATE"></yu-xform-item>
          <!--<yu-xform-item label="管户客户经理" ctype="yu-xcusManager" placeholder="管户客户经理" name="managerIdName"  @select-fn="commonSelectFn" :mapping="{'managerId':'managerId'}" width="1200" height="600" ></yu-xform-item>-->
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="个人客户信息列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop show-length="7">
        <yu-button type="primary" ref="btn_doQuery" @click="customClick('doQuery')" v-if="checkCtrl('doQuery')">查看</yu-button>
        <yu-button type="primary" ref="btn_do360View" @click="customClick('do360View')" v-if="checkCtrl('do360View')">360视图</yu-button>
        <yu-button type="primary" ref="btn_doQuery" @click="customClick('doJQQuery')" v-if="checkCtrl('doJQQuery')">打印结清证明</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型 " prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="管户客户经理工号" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_CUS_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dicOptions: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusindiv/queryCusIndiv',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusindiv/delete/'
    };
  }
};
</script>
