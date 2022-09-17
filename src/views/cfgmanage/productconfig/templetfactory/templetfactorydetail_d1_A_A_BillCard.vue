<template>
  <div id="d1_A_A_BillCard">
    <div id="d1_A_A_BillCardContent">
      <yu-xform ref="refForm" label-width="130px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="模版组编号" ctype="input" placeholder="模版组编号" name="modelGroupNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="模板组名称" ctype="input" placeholder="模板组名称" name="modelGroupName" rules="required"></yu-xform-item>
          <yu-xform-item label="模板显示方式" ctype="select" name="showMode" rules="required" data-code="STD_ZB_SHOW_MODE" placeholder="模板显示方式"></yu-xform-item>
          <yu-xform-item label="业务规则编号" ctype="input" placeholder="业务规则编号" name="planId" rules="required"></yu-xform-item>
          <yu-xform-item label="是否关联作业流" ctype="select" name="isJobFlow" rules="required" data-code="STD_ZB_Y_N" placeholder="是否关联作业流"></yu-xform-item>
          <yu-xform-item label="作业流编号" ctype="yu-xflow-define" name="jobFlow" placeholder="作业流编号" @select-fn="commonSelectFn" :mapping="{ flowId: 'jobFlow' }" width="680" height="480"></yu-xform-item>
          <yu-xform-item label="版本号" ctype="input" placeholder="版本号" name="ver" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="登记信息" v-show="false">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" disabled hidden placeholder="更新日期"></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrName" rules="required" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'd1_A_A_BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgmodelgroup/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgmodelgroup/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.modelGroupNo = this.$xutils.getDefaultformulaData('SEQ:MODEL_GROUP_SEQ');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      console.log(this.formdata);
    }
  }
};
</script>
