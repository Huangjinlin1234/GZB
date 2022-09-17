<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="申请信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请编号" ctype="input" placeholder="申请编号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="yu-xcoop-info" name="partnerNo" rules="required" placeholder="合作方编号" @select-fn="commonSelectFn" :mapping="{'partnerNo':'partnerNo','partnerName':'partnerName','partnerType':'partnerType'}" width="880" height="680" :parms="{condition:{partnerStatus:'1'}}" ></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="申请原因" ctype="textarea" placeholder="申请原因" name="appResn" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="input" placeholder="合作方类型" name="partnerType" rules="required" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" rules="required" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最近修改日期" :colspan="12"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间" :colspan="12"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_PARTNER_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    formType: {
      type: String,
      default: 'edit'
    }
  },
  data: function () {
    return {
      addUrl: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/queryDetail',
      formdata: {},
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.apprStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>