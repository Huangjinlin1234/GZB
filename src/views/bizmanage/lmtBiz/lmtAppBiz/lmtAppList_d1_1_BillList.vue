<template>
  <div>
    <yu-panel title="单一客户授信申报">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="授信类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="授信类型" name="lmtTypes" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_add" @click="customClick('add')">新增</yu-button>
          <yu-button ref="btn_update" @click="customClick('update')">修改</yu-button>
          <yu-button ref="btn_deleteLmtApp" @click="customClick('deleteLmtApp')">删除</yu-button>
          <yu-button ref="btn_view" @click="customClick('view')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" requestType="POST">
        <yu-xtable-column label="客户类型" prop="cusType" width="100" data-code="STD_ZB_CUS_TYPE"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度合计" prop="lowRiskTotalLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtapp/getlmtapp',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtapp/deletelmtapp/'
    };
  }
};
</script>