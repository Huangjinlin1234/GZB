<template>
  <div>
    <yu-panel title="集团客户授信历史">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpCusName"></yu-xform-item>
          <yu-xform-item label="授信类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="授信类型" name="lmtType"></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpCusId"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="apprStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_viewHis" @click="customClick('viewHis')">查看</yu-button>
          <yu-button ref="btn_onReconcide" @click="customClick('onReconcide')">发起复议 </yu-button>
          <yu-button ref="btn_onRedicuss" @click="customClick('onRedicuss')">发起再议</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="POST">
        <yu-xtable-column label="集团客户名称" prop="grpCusName"></yu-xtable-column>
        <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusId"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus"></yu-xtable-column>
        <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度合计" prop="lowRiskTotalLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
let loginCode;
export default {
  name: 'D12BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpapp/queryHis',
      baseParams: { condition: JSON.stringify({ managerId: loginCode, oprType: '01' }) },
      deleteUrl: this.$backend.cmisBiz + '/api/lmtgrpapp/delete/'
    };
  },
  created () {
    loginCode = this.$xutils.getLoginUserInfo().loginCode;
  },


  methods: {
    onReconcide: function () {
      console.log('执行复议逻辑');
    }

  }


};
</script>
