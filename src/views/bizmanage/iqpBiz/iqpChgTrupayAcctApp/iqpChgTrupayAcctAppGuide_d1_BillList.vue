<template>
  <div>
    <yu-panel title="" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" relate-table-name="refBillTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button ref="btn_nextStep" @click="customClick('nextStep')">下一步</yu-button>
        <!--<yu-button ref="btn_onCancel" @click="customClick('onCancel')">返回</yu-button>-->
    </yu-button-drop>
      <yu-xtable ref="refBillTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="借据编号" prop="billNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="交易对手账号" prop="toppAcctNo"></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
        <yu-xtable-column label="交易对手金额" prop="toppAmt"></yu-xtable-column>
         <yu-xtable-column label="开户行行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" width="100"></yu-xtable-column>
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
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/accloan/selectaccdto',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/toppacctsub/delete/'
    };
  }
};
</script>
