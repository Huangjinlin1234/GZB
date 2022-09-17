<template>
  <div>
    <yu-panel title="利息减免变更申请列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="台账状态" ctype="select" data-code="STD_ZB_ACC_TYP" placeholder="台账状态" name="accStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_nextStep" @click="customClick('nextStep')">下一步</yu-button>
          <yu-button ref="btn_cancel" @click="customClick('cancel')">返回</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="借据编号" prop="billNo" width="130"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="130"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="130"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="发放日期" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="五级分类" prop="fiveClass"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ZB_ACC_TYP"></yu-xtable-column>
        <yu-xtable-column label="客户大类" prop="cusCatalog" width="100"></yu-xtable-column>
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
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/accloan/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/accloan/delete/"
    }
  }
}
</script>