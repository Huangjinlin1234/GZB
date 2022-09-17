<template>
  <div>
    <yu-panel title="业务申请历史" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" placeholder="证件类型" name="certType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xproduct" placeholder="产品编号" name="prdId"  @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" placeholder="申请状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop show-length="6">
        <yu-button type="primary" ref="btn_lcgjLook" @click="customClick('lcgjLook')"  v-if="checkCtrl('lcgjLook')">流程轨迹</yu-button>
        <yu-button type="primary" ref="btn_reconsider" @click="customClick('reconsider')"  v-if="checkCtrl('reconsider')">复议</yu-button>
        <yu-button type="primary" ref="btn_cancellation" @click="customClick('cancellation')"  v-if="checkCtrl('cancellation')">作废</yu-button>
        <yu-button type="primary" ref="btn_print" @click="customClick('doPrint')"  v-if="checkCtrl('doPrint')">打印购房承诺书</yu-button>
        <yu-button type="primary" ref="btn_doView" @click="customClick('doView')"  v-if="checkCtrl('doView')">详细查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable"  :default-sort="{prop:'iqpSerno',order:'descending'}"  row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true">
        <yu-xtable-column label="申请流水号" prop="iqpSerno" sortable></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" hide-column></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
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
      searchData: {condition: {
        belgLine: '02',
        oprType: '01',
        applyExistsStatus: '993,997,998,996'

      }},
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqploanapp/selectbymodel/'
    };
  }
};
</script>