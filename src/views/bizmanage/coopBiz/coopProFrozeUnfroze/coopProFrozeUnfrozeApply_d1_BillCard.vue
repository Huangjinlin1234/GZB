<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请编号" ctype="input" placeholder="申请编号" name="serno" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="申请类型" ctype="select" name="appType" rules="required" data-code="STD_COOP_PRO_APP_TYPE" placeholder="申请类型" :colspan="12"></yu-xform-item>
            <yu-xform-item label="项目编号" ctype="yu-xprj-acct" name="proNo" rules="required" placeholder="项目编号" :colspan="12" @select-fn="commonSelectFn" :mapping="{'proNo':'proNo','coopEndDate':'coopEndDate','partnerStatus':'partnerStatus','proStatus':'proStatus','coopPlanNo':'coopPlanNo','partnerName':'partnerName','deliverDate':'deliverDate','proName':'proName','proStartDate':'proStartDate','proEndDate':'proEndDate','proLmt':'proLmt','coopStartDate':'coopStartDate'}" width="800" height="600" ></yu-xform-item>
            <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" name="partnerType" disabled hidden data-code="STD_PARTNER_TYPE" placeholder="合作方类型"></yu-xform-item>
            <yu-xform-item label="项目额度(元)" ctype="yu-currency" name="proLmt" disabled placeholder="项目额度(元)" :colspan="12"></yu-xform-item>
            <yu-xform-item label="项目状态" ctype="select" name="proStatus" disabled data-code="STD_COOP_PRO_STATUS" placeholder="项目状态" :colspan="12"></yu-xform-item>
            <yu-xform-item label="项目开工时间" ctype="input" placeholder="项目开工时间" name="proStartDate" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="项目竣工时间" ctype="input" placeholder="项目竣工时间" name="proEndDate" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="交付日期" ctype="input" placeholder="交付日期" name="deliverDate" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合作方状态" ctype="select" name="partnerStatus" disabled data-code="STD_PARTNER_STATUS" placeholder="合作方状态" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合作起始日" ctype="datepicker" name="coopStartDate" value-format="yyyy-MM-dd" disabled placeholder="合作起始日" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合作到期日" ctype="datepicker" name="coopEndDate" value-format="yyyy-MM-dd" disabled placeholder="合作到期日" :colspan="12"></yu-xform-item>
            <yu-xform-item label="申请说明" ctype="textarea" name="appDesc" rules="required" placeholder="申请说明" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" :colspan="12"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId" :colspan="12"></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId" :colspan="12"></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" placeholder="经办日期" name="inputDate" :colspan="12"></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('save')">保存</yu-button>
      <yu-button type="" @click="customClick('back')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopprofrozeunfrozeapp/update',
      addUrl: this.$backend.cmisBiz + '/api/coopprofrozeunfrozeapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:FROZE_UNFROZE_SERNO');
      this.formdata.apprStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>