<template>
  <div>
  <yu-panel title="客户日常任务历史" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" :exclude-key="unLoadKey"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_TASK_STATUS" placeholder="任务状态" name="taskStatus"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <!--<yu-button ref="btn_doview" hidden @click="customClick('doview')">查看</yu-button>-->
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_CUS_BIZ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_TASK_STATUS"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="100px"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100px"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
  </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CUS_BIZ_TYPE,STD_ZB_CERT_TYP,STD_TASK_STATUS,STD_ZB_APPR_STATUS');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusmanatask/',
      baseParams: { taskStatusList: '3,4', bizType: 'A01,A02,A03', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")},
      deleteUrl: this.$backend.cmisCus + '/api/cusmanatask/delete/',
      unLoadKey: 'B01,B02,B03,B04,B05,B06,B07,B08,B09,C01,C02'
    };
  },
  created () {
    let data = this.$route.meta.params;
    let inType = data.inType;
    if (inType == 'CREATE') {
      this.baseParams = { condition: { taskStatusList: '3,4', bizType: 'A01,A02,A03', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")}};
    } else if (inType == 'DEFEND') {
      this.baseParams = { condition: { taskStatusList: '3,4', bizType: 'A04,A05,A06,A07,A08,A09,A10,A11', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
    } else {
      this.baseParams = { condition: { taskStatusList: '3,4', bizType: 'A12,A13', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
    }
  },
  methods: {
    bizTypeDicFilterFn (opts, datacode, name) {
      let _this = this;
      let data = _this.$route.meta.params;
      let inType = data.inType;
      if (inType == 'CREATE') {
        return opts.filter(function (op) {
          if (op.key === 'A01' || op.key === 'A02' || op.key === 'A03') {
            return true;
          }
          return false;
        });
      } else if (inType == 'DEFEND') {
        return opts.filter(function (op) {
          if (op.key === 'A04' || op.key === 'A05' || op.key === 'A06' || op.key === 'A07' || op.key === 'A08' || op.key === 'A09' || op.key === 'A10' || op.key === 'A11') {
            return true;
          }
          return false;
        });
      } else {
        return opts.filter(function (op) {
          if (op.key === 'A12' || op.key === 'A13') {
            return true;
          }
          return false;
        });
      }
    }
  }
};
</script>
