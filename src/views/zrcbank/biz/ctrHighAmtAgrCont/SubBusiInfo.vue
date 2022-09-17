<template>
  <!--
    @created by zxz
    @time  2021/5/5
    @description 项下业务信息
  -->
  <div>
    <yu-tabs v-model="tabprop">
        <yu-panel title="项下业务信息" :hideFilter="false" :collapseHide="false">

          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button icon="document" @click="infoFn">查看</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" request-type="post" condition-key="condition" :default-load="false" :base-params="dataParam">
              <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
              <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
              <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
              <yu-xtable-column label="币种" prop="contCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
              <yu-xtable-column label="起始日" prop="loanStartDate"></yu-xtable-column>
              <yu-xtable-column label="到期日" prop="loanEndDate"></yu-xtable-column>
              <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_ASSURE_MEANS,STD_ZB_CUR_TYP,STD_ACC_STATUS');

export default {
  data: function () {
    return {
      tabprop: 'base',
      dataUrl: backend.cmisBiz + '/api/accloan/selectaccloaninffobyparams',
      dataParam: {},
      dialogVisible: false,
      formDisabled: true
    };
  },
  mounted () {
    var _this = this;
    var data = {};
    var contNo = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      contNo = data.param.contNo;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      contNo = data.contNo;
    } else {
      data = _this.getFactory().contextData;
      contNo = data.contNo;
    }
    _this.dataParam = { condition: JSON.stringify({ contNo: contNo }) };
  },
  methods: {
    infoFn () {
      var _this = this;
      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      _this.$dialog.open('', 'xwmanage/iqpManage/accLoan/accLoanListIndexForXd', 1000, 1000, jsoPar);
    }
  }
};
</script>
