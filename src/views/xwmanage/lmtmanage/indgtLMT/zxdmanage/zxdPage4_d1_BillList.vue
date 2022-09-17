<template>
  <div>
    <yu-panel title="增享贷_ 借据信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button type="primary" ref="btn_doInsect" @click="customClick('doSelect')">详情</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number :base-params="baseParams"   :pageable="true" :data-url="dataUrl" :default-load="false" condition-key="condition"  request-type="POST">
        <yu-xtable-column label="借据号" prop="billNo" width="150">
          <template slot-scope="scope">
            <a class="underline" @click="findOne(scope.row)">{{ scope.row.billNo }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="合同号" prop="contNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="客户经理号" prop="managerId" ></yu-xtable-column>
        <yu-xtable-column label="业务品种" prop="bizType" ></yu-xtable-column>
        <yu-xtable-column label="科目号" prop="subjectNo"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" ctype="select"  data-code="STD_ZB_GUAR_WAY" ></yu-xtable-column>
        <yu-xtable-column label="币种" prop="contCurType"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="贷款金额(元)" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日期" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日期" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="执行利率(年)" prop="execRateYear"></yu-xtable-column>
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
      pkField: 'billNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodelall',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/accloan/delete/'
    };
  },
  methods: {
    findOne (data) {
      if (data == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      this.doSelectData(data);
    },
    doSelectData (data) {
      // console.log(this);
      let _this = this;
      // 贷款台账模块
      data['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
      data['op'] = 'VIEW';
      data['bill_no'] = data.billNo;

      _this.$dialog.open(
        '贷款台账',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        data
      );
    }
  }
};
</script>
