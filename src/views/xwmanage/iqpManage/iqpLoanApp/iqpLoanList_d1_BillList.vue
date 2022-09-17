<template>
  <div>
    <yu-panel title="合同申请列表" panel-type="normal" >
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" >
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" data-code="STD_LOAN_MODAL" placeholder="贷款形式" name="loanModal" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="customClick('doAdd')" v-if="checkCtrl('doAdd')" type="primary">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')" v-if="checkCtrl('doUpdate')" type="primary">修改</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')" v-if="checkCtrl('doDelete')" type="primary">删除</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')" v-if="checkCtrl('doView')" type="primary">查看</yu-button>
        </yu-button-drop>

      <yu-xtable ref="refTable" row-number condition-key="condition"  :baseParams="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="申请流水号" width="180" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" width="105" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="证件号码" width="175" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <!-- <yu-xtable-column label="所属团队" prop="teamType" data-code="STD_TEAM_TYPE"></yu-xtable-column> -->
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="管户经理" prop="managerIdName" hidden-column></yu-xtable-column>
        <yu-xtable-column label="管户机构" prop="managerBrIdName"  hidden-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_TEAM_TYPE');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqploanapp/select',
      baseParams: {condition: {oprType: '01',
        belgLine: '01'},
      sort: 'inputDate desc,iqpSerno desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/iqploanapp/delete/'
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
