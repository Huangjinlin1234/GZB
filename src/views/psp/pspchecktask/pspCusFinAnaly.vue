<template>
  <div>
    <yu-panel title="融资分析" panel-type="simple">
      <yu-xform ref="refForm" label-width="160px" v-model="pspCusFinAnaly" :disabled="formType != 'edit' ? true : false">
        <yu-xform-group>
          <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
          <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>

          <yu-xform-item name="totalFinAmt" label="融资总额（万元）" ctype="yu-num" number-formatter="0,000.00" colspan="24" rules="required"/>
          <yu-xform-item name="collectSitu" label="支行催收情况" ctype="textarea" colspan="24" rules="required"/>
          <yu-xform-item name="repayWish" label="借款人还款意愿" ctype="textarea" colspan="24" rules="required"/>
          <yu-xform-item name="entireFinAnaly" label="整体融资分析" ctype="textarea" colspan="24" rules="required"/>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" :data-url="debitInfoUrl" :default-load="false" selection-type="radio" row-number>
        <yu-xtable-column prop="contNo" label="合同编号"></yu-xtable-column>
        <yu-xtable-column prop="billNo" label="借据编号"></yu-xtable-column>
        <yu-xtable-column prop="prdName" label="产品名称"></yu-xtable-column>
        <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column prop="loanStartDate" label="借据起始日"></yu-xtable-column>
        <yu-xtable-column prop="loanEndDate" label="借据到期日"></yu-xtable-column>
        <yu-xtable-column prop="loanAmt" label="借据金额（元）"></yu-xtable-column>
        <yu-xtable-column prop="loanBalance" label="借据余额（元）"></yu-xtable-column>
        <yu-xtable-column prop="debitInt" label="拖欠利息（元）"></yu-xtable-column>
        <yu-xtable-column prop="overdueDay" label="逾期天数"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY');
export default {
  props: {
    taskNo: String,
    formType: String
  },

  data: function () {
    return {
      debitInfoUrl: backend.cmisPsp + '/api/pspdebitinfo/',
      cusFinAnalyUrl: backend.cmisPsp + '/api/pspcusfinanaly/',

      pspCusFinAnaly: {}

    };
  },

  mounted: function () {
    var form = {taskNo: this.taskNo};
    this.$refs.refTable.remoteData({ condition: JSON.stringify(form) });
  },

  created: function () {
    var _this = this;
    _this.$request({
      url: _this.cusFinAnalyUrl,
      method: 'get',
      data: {condition: {taskNo: _this.taskNo}}
    }).then((response) => {
      yufp.clone(response.data[0], _this.pspCusFinAnaly);
    }
    ).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  methods: {

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      var url;
      if(this.pspCusFinAnaly.pkId) {
        url = this.cusFinAnalyUrl + 'update';
      } else {
        url = this.cusFinAnalyUrl;
        this.pspCusFinAnaly.pkId = this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ');
        this.pspCusFinAnaly.taskNo = this.taskNo
      }
      return this.$request({
        url: url,
        method: 'post',
        data: this.pspCusFinAnaly
      });
    }
  }
};
</script>