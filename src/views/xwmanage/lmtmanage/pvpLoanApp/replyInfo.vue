import {logger} from 'util';
<template>
  <!--add by hubp-->
  <div>
    <yu-panel title="批复基本信息" panel-type="normal">
      <yu-xform ref="refCtrLoanContForm" label-width="150px" v-model="formData" :form-type="formType">

        <yu-xform-group column="2">
          <yu-xform-item label="批复流水号" ctype="input" name="replySerno" disabled="true"></yu-xform-item>
          <yu-xform-item label="调查编号" ctype="input" name="surveySerno" disabled="true" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled="true"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled="true"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled="true" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled="true"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" disabled="true" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" name="certCode" disabled="true"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" disabled="true" ></yu-xform-item>
          <yu-xform-item label="批复金额" ctype="input" name="replyAmt" disabled="true" ></yu-xform-item>
          <yu-xform-item label="申请期限" ctype="input" name="appTerm" disabled="true" ></yu-xform-item>
          <yu-xform-item label="额度宽限期（月）" ctype="input" name="lmtGraper" disabled="true"></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="select" name="replyStatus" disabled="true" data-code="STD_XD_REPLY_STATUS"></yu-xform-item>
          <yu-xform-item label="批复起始日" ctype="input" name="replyStartDate" disabled="true" ></yu-xform-item>
          <yu-xform-item label="批复到期日" ctype="input" name="replyEndDate" disabled="true" ></yu-xform-item>
          <yu-xform-item label="执行年利率" ctype="input" name="execRateYear" disabled="true" ></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" name="repayMode" disabled="true" data-code="STD_SIGN_MODE"></yu-xform-item>
          <yu-xform-item label="登记人工号" ctype="input" placeholder="登记人工号" name="inputId" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="责任人工号" ctype="input" placeholder="登记人工号" name="managerId" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" placeholder="登记人" name="managerIdName" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_SIGN_MODE,STD_XD_REPLY_STATUS');

export default {

  props: {
    bizPageData: Object
  },
  data () {
    return {

      formData: {},
      buff: false,
      guarContTableData: {},
      cusFormdata: {},
      replyFormdata: {},
      formType: 'details',
      show: false
    };
  },


  mounted () {
    var _this = this;
    let replySerno = _this.$route.meta.params.replyNo;
    this.$request({
      url: _this.$backend.cmisBiz + '/api/lmtcrdreplyinfo/selectreplybypk',
      method: 'POST',
      data: {replySerno: replySerno}
    }).then(({code, message, data}) => {
      debugger;
      yufp.clone(data, _this.formData);
    });
  },
  methods: {
  }

};
</script>
