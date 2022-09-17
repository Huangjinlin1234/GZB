<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" rules="required" :options="dicOptions.certTypeOptions" placeholder="证件类型" name="certType" @change="certTypeChange"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="登记日期" name="regiDate"></yu-xform-item>
          <yu-xform-item label="到期日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="到期日期" name="endDate"></yu-xform-item>
          <yu-xform-item label="颁证机关" ctype="input" placeholder="颁证机关" name="issuDep"></yu-xform-item>
          <yu-xform-item label="资质名称" ctype="input" placeholder="资质名称" name="aptiName" :hidden="aptiShow" rules="required"></yu-xform-item>
          <yu-xform-item label="资质等级" ctype="input" placeholder="资质等级" name="aptiLvl" :hidden="aptiShow" rules="required"></yu-xform-item>
          <yu-xform-item label="证件说明" ctype="input" placeholder="证件说明" name="certExplain"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      aptiShow: true,
      updateUrl: this.$backend.cmisCus + '/api/cuscorpcert/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorpcert/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      dicOptions: {certTypeOptions: [{'key': 'M', 'value': '营业执照'},
        {'key': 'N', 'value': '批文'}, {'key': 'O', 'value': '开户证明'}, {'key': 'P', 'value': '对公其他'},
        {'key': 'Q', 'value': '组织机构代码'}, {'key': 'R', 'value': '统一社会信用代码'},
        {'key': '09', 'value': '中征码'}, {'key': 'U', 'value': '登记证书'}, {'key': 'V', 'value': '境外企业代码'},
        {'key': '10', 'value': '特种经营许可证'}, {'key': '11', 'value': '企业资质证书'}]}
    };
  },
  methods: {
    certTypeChange (certType) {
      if (certType == '11') {
        this.aptiShow = false;
      } else {
        this.aptiShow = true;
      }
    }
  }
};
</script>