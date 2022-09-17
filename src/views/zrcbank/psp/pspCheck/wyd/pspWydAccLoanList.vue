
<template>
  <div>
    <yu-panel title="微业贷借据列表" :hideFilter="false" :collapseHide="false" >
      <yu-xform ref="refForm" label-width="120px" v-model="formData" :form-type="formType">
        <yu-button-drop>
          <yu-button type="primary" @click="doView">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" selection-type="radio" :data-url="dataUrl"  request-type="POST" :base-params="baseParams" condition-key="condition"   :default-load="true" >
          <yu-xtable-column label="台账编号" prop="pvpSerno" hide-column></yu-xtable-column>
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="产品类型属性" prop="prdTypeProp" width="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
          <yu-xtable-column label="科目号" prop="subjectNo" width="100"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="contCurType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="贷款标识" prop="loanFlag" width="100" data-code="STD_LOAN_FLAG"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance" width="100"></yu-xtable-column>
          <yu-xtable-column label="贷款起始日期" prop="loanStartDate" width="120"></yu-xtable-column>
          <yu-xtable-column label="贷款到期日期" prop="loanEndDate" width="120"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerId" hide-column></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName" ></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName" ></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formData: {},
      baseParams: {condition: {cusId:this.pageParams.cusId}, sort: 'loanStartDate desc'},
      tableData: [],
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodelByCondition'
    };
  },
  mounted() {   
  },
  methods: {
    // 查看
    doView () {
      const params = this.$refs.refTable.selections[0];
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 贷款台账模块
      params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
      params['op'] = 'VIEW';
      params['bill_no'] = params.billNo;
      params['accLoan'] = true;
      params['prd_type_prop'] = params.prdTypeProp;
      this.$dialog.open(
        '贷款台账',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
    }


  }
};
</script>