<template>
  <div>
    <yu-tabs>
      <yu-panel title="减免记账台账信息" :collapseHide="false" :hideFilter="false">
        <yu-xform ref="refForm" v-model="formdata">
          <yu-xform-group>
            <yu-xform-item label="借据编号" colspan="11" name="billNo" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="合同编号" colspan="11" name="contNo" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" colspan="11" name="cusId" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" colspan="11" name="cusName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="起始日期" colspan="11" name="loanStartDate" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="到期日期" colspan="11" name="loanEndDate" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="贷款金额" colspan="11" name="loanAmt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="贷款余额" colspan="11" name="loanBalance" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="拖欠总利息" colspan="11" name="totalTqlxAmt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="减免总金额" colspan="11" name="reducAmt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="减免本金" colspan="11" name="reducCapAmt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="减免欠息" colspan="11" name="reducDebitInt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="减免罚息" colspan="11" name="reducPenalInt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="减免复息" colspan="11" name="reducCompoundInt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="减免费用" colspan="11" name="reducCostAmt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="登记人" colspan="11" name="inputIdName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" colspan="11" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="记账日期" colspan="11" name="recordDate" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="记账状态" colspan="11" name="recordStatus" ctype="select" disabled data-code="STD_RECORD_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <div style="text-align: center;">
        <yu-button-drop>
          <yu-button type="primary" @click="goBack">返回</yu-button>
        </yu-button-drop>
      </div>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_RECORD_STATUS');
export default {
  data: function () {
    return {
      formdata: {},
      pdcrrbrSerno: '',
      reducAmt: ''
    };
  },
  created: function () {
    var _this = this;
    _this.pdcrrbrSerno = _this.$route.meta.params.pdcrrbrSerno;
    _this.reducAmt = _this.$route.meta.params.reducAmt;
    yufp.service.request({
      // async: false,
      method: 'POST',
      url: backend.cmisNpam + '/api/pladebtclaimreducrecordbillrel/showByPdcrrbrSerno',
      data: _this.pdcrrbrSerno,
      callback: function (code, message, response) {
        if (response.code == 0) {
          _this.formdata.reducAmt = _this.reducAmt;
          yufp.clone(response.data, _this.formdata);
        } else {
          _this.$message.error(response.message);
        }
      }
    });
    // this.$nextTick(() => {
    // this.formdata.reducAmt = Number(this.formdata.reducCapAmt) + Number(this.formdata.reducDebitInt) + Number(this.formdata.reducPenalInt) + Number(this.formdata.reducCompoundInt) + Number(this.formdata.reducCostAmt);
    // });
  },
  methods: {
    /**
    * 返回
    */
    goBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
