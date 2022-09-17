<template>
    <div id="d1_B_BillCard">
      <div id="d1_B_BillCardContent">
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
          <yu-panel title="同业客户维护" panel-type="simple">
            <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
              <!--<yu-xform-item label="社会信用代码" ctype="input" name="socialCreditCode" placeholder="社会信用代码" :colspan="24" icon="search" :on-icon-click="handleIconClick"></yu-xform-item>-->
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"  :colspan="24" icon="search" :on-icon-click="handleIconClick"></yu-xform-item>
              <yu-xform-item label="证件类型" ctype="select" placeholder="证件类型" name="certType" disabled :colspan="24" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
              <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled :colspan="24"></yu-xform-item>
              <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="cusName" disabled :colspan="24"></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" disabled data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="customClick('doNext')">下一步</yu-button>
        <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
      </yu-form-buttons>
    </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CUS_STATE,STD_ZB_CUS_CLS');
export default{
  name: 'D1BBillCard',
  props: {
    countdata: String
  },
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusintbank/update',
      addUrl: this.$backend.cmisCus + '/api/cusintbank/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    // "{ certType: 'certType', certCode: 'socialCreditCode', cusId:'cusId', cusName: 'cusName' }"
    //   `CERT_TYPE` varchar(5) COLLATE utf8_bin DEFAULT NULL COMMENT '证件类型',
    // `CERT_CODE` varchar(40) COLLATE utf8_bin DEFAULT NULL COMMENT '证件号码',
    // `CUS_ID` varchar(40) COLLATE utf8_bin NOT NULL COMMENT '客户编号',
    // `CUS_NAME` varchar(80) COLLATE utf8_bin DEFAULT NULL COMMENT '同业机构(行)名称',
    handleIconClick: function () {
      this.$dialog.open('', 'cusmanage/cusIntbank/cusIntbankDefend/cusIntbankSelectListPop', 1800, 600, {}, data => {
        this.setBillCardItemValue('certType', data.certType);
        this.setBillCardItemValue('certCode', data.certCode);
        this.setBillCardItemValue('socialCreditCode', data.socialCreditCode);
        this.setBillCardItemValue('cusId', data.cusId);
        this.setBillCardItemValue('cusName', data.cusName);
      });
    }
  }
};
</script>
