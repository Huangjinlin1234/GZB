<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="申请信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="合作方案编号" ctype="yu-xcoop-acct" name="coopPlanNo" placeholder="合作方案编号" :colspan="12" :param="{condition: {partnerTypes: '3,4,8'}}" @select-fn="commonSelectFn" rules="required" :mapping="{'partnerNo':'partnerNo','coopPlanNo':'coopPlanNo','partnerName':'partnerName'}" width="1200" height="680" ></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" disabled></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" placeholder="客户编号" title="选择客户" rules="required" :colspan="12" @select-fn="commonSelectFn" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode','cusCatalog':'partnerType'}" width="1200" height="600" pagePath="cusmanage/nameListManage/cus_selectIndex"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" rules="required" placeholder="证件类型" disabled></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" name="partnerType" data-code="STD_ZB_CUS_CATALOG"  rules="required" placeholder="客户类型" disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" rules="required" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="操作时间" ctype="datepicker" name="oprTime" value-format="yyyy-MM-dd" placeholder="操作时间" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" hidden :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记日期" ctype="input" placeholder="经办日期" name="inputDate" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="经办人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="经办人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="经办机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="经办机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
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
yufp.lookup.reg('STD_ZB_RELATED_PARTY_TYPE,STD_ZB_CERT_TYP,STD_ZB_OPR_TYPE');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopcolonywhitelst/update',
      addUrl: this.$backend.cmisBiz + '/api/coopcolonywhitelst/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = '01';
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    }
  }
};
</script>
