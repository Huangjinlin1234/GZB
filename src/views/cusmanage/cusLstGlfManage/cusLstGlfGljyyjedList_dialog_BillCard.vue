<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="关联方名称" ctype="input" placeholder="关联方名称" name="relatedPartyName" rules="required" :colspan="12" icon="search" :on-icon-click="selectRelatedParty"></yu-xform-item>
          <yu-xform-item label="关联方客户编号" ctype="input" placeholder="关联方客户编号" name="relatedPartyCusId" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="关联方证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="关联方证件类型" name="relatedPartyCertType" :colspan="12"></yu-xform-item>
          <yu-xform-item label="关联方证件号码" ctype="input" placeholder="关联方证件号码" name="relatedPartyCertNo" rules="required" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="关联方预计额度" ctype="yu-num" number-formatter="0,000.00" placeholder="关联方预计额度" name="relatedPartyForeLmt" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="关联方类型" ctype="select" rules="required" disabled data-code="STD_ZB_RELATED_PARTY_TYPE" placeholder="关联方类型" name="relatedPartyType" :colspan="12"></yu-xform-item>
          <yu-xform-item label="归属组别" ctype="input" placeholder="归属组别" name="belongGroup" rules="required" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="组别预计总额度"  ctype="yu-num" number-formatter="0,000.00" placeholder="组别预计总额度" name="groupForeTotlAmt" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_ZB_RELATED_PARTY_TYPE');
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      // this.formdata.serno = this.$xutils.getDefaultformulaData("getSequence(TRADE_ID_SEQ)")
      this.formdata.serno = 'SQ' + this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    selectRelatedParty: function () {
      var _this = this;
      this.$dialog.open(
        '基础信息',
        'cusmanage/cusLstGlfManage/cusLstGlfSelectIndex',
        '-1',
        '-1',
        null,
        function (rtData) {
          if (rtData) {
            _this.formdata.relatedPartyName = rtData.relatedPartyName;
            _this.formdata.relatedPartyCusId = rtData.cusId;
            _this.formdata.relatedPartyCertType = rtData.certType;
            _this.formdata.relatedPartyCertNo = rtData.certCode;
            _this.formdata.relatedPartyType = rtData.relatedPartyType;
            _this.formdata.belongGroup = rtData.belongGroup;
          }
        },
        true,
        true
      );
    }
  }
};
</script>
