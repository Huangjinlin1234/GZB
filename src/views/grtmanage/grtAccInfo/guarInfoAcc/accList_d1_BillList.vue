<template>
  <div>
    <yu-panel title="押品信息台账" panel-type="simple">
       <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" related-table-name="refTable" label-width="140px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="抵质押标识" ctype="select" data-code="STD_GRT_FLAG" placeholder="押品类型" name="grtFlag" ></yu-xform-item>
          <yu-xform-item label="抵押人" ctype="yu-XcusBase" placeholder="抵押人" name="guarCusName" @select-fn="commonSelectFn" :mapping="{ cusId: 'guarCusId', cusName: 'guarCusName',certCode: 'certCode' }" width="730" height="480"></yu-xform-item>
          <yu-xform-item label="担保分类名称" ctype="yu-xdic-tree" placeholder="担保分类名称" name="guarTypeCd" @select-fn="commonSelectFn" :mapping="{}" width="480" height="480" :parms="{ optType: 'STD_DZY_TYPE', root: ''}" :selectionType="radio"></yu-xform-item>
          <yu-xform-item label="押品名称" ctype="input" placeholder="押品名称" name="pldimnMemo" fuzzy-query="both"></yu-xform-item>
       </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_check" v-if="checkCtrl('view')" @click="customClick('check')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true" request-type="POST">
        <yu-xtable-column label="押品统一编号" prop="guarNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="抵质押标识" prop="grtFlag" width="100" data-code="STD_GRT_FLAG" ></yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="newlabel"></yu-xtable-column>
        <yu-xtable-column label="押品所有权人名称" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="pldimnMemo" width="140"></yu-xtable-column>
        <yu-xtable-column label="押品评估价值" prop="evalAmt" width="150"></yu-xtable-column>
        <!-- <yu-xtable-column label="审批状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>-->
        <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate" width="100">
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
import { dateFormat } from '@/utils';
yufp.lookup.reg('STD_ZB_CERTI_STATE');
export default{
  name: 'D1BillList',
  mixins: [mixinList, mixin],
  data: function () {
    return {
      searchData: {condition: {
        // managerBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode'),
        // approveStatus: '000,992',
        oprType: '01'
      }},
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/querybymanagerid',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/delete/',
      dateFormat: dateFormat
    };
  }
};
</script>