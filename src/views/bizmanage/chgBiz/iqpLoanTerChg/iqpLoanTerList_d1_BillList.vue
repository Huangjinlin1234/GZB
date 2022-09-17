<template>
  <div>
    <yu-panel title="贷款投向调整列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_editFn" @click="customClick('editFn')">修改</yu-button>
          <yu-button ref="btn_doDel" @click="customClick('doDel')">删除</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="70"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="70.00"></yu-xtable-column>
        <yu-xtable-column label="中文合同编号" prop="cnContNo" width="70"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="70.00"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="70.00"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="70.00"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="70.00"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" width="70" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" width="70"></yu-xtable-column>
        <yu-xtable-column label="合同起始日期" prop="contStartDate" width="70"></yu-xtable-column>
        <yu-xtable-column label="合同到期日期" prop="contEndDate" width="70"></yu-xtable-column>
        <yu-xtable-column label="原贷款投向" prop="oldLoanTerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="原战略新兴产业类型名称" prop="oldStrategyNewTypeName" width="100"></yu-xtable-column>
        <yu-xtable-column label="行业投向" prop="loanTerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="工业转型升级标识" prop="comUpIndtify" width="70" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="战略新兴产业类型" prop="strategyNewTypeName" width="100"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="updName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="最后修改机构" prop="updBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" width="70.00" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqploanterchg/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqploanterchg/delete/"
    }
  }
}
</script>
