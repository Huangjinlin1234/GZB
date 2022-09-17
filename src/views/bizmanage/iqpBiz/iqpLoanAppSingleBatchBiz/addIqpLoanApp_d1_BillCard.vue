<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="yu-retail" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','certType':'certType','certCode':'certCode'}" width="900" height="900" :parms="{'cusState':'2','managerId':this.$xutils.getLoginUserInfo().loginCode}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" disabled data-code="STD_ZB_CERT_TYP" ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" name="certCode" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-retail-product" name="prdId" rules="required"   placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" name="prdName" rules="required" disabled  @change="prdChange" ></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" disabled data-code="STD_ZB_LOAN_MODAL" placeholder="贷款形式" v-if="false"></yu-xform-item>
          <yu-xform-item label="贷款类型" ctype="select" name="contType" rules="required" disabled data-code="STD_ZB_LOAN_MODAL" placeholder="贷款类型" v-if="false"></yu-xform-item>
          <yu-xform-item label="送达地址" ctype="input" name="deliveryAddr" rules="required"   placeholder="送达地址" v-if="false"></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" name="phone" rules="required"   placeholder="手机号码" v-if="false"></yu-xform-item>
          <yu-xform-item v-show="false" label="申请渠道" ctype="input" name="appChnl"  value="02" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.formdata.loanModal = '1';
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:YPSEQ');
      this.formdata.iqpSerno = this.$xutils.getDefaultformulaData('SEQ:IQP_SERNO');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    },
    // 公积金控制
    prdChange () {
      var value = this.formdata.prdId;
      // 白领易贷通
      if (value == '022028') {
        this.formdata.contType = this.$xutils.getDefaultformulaData('2');
        // 按揭
      } else {
        this.formdata.contType = this.$xutils.getDefaultformulaData('1');
      }
    }
  }
};
</script>