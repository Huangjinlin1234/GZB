<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="申请基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="申请日期" ctype="datepicker" placeholder="申请日期" value-format="yyyy-MM-dd" name="appDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="busiType" rules="required" disabled :options="dicOptions.busiTypeOptions" placeholder="业务类型"></yu-xform-item>
            <yu-xform-item label="导入原因" ctype="textarea" name="importResn" rules="required" placeholder="导入原因" :colspan="24"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huserName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrgName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')" v-if="isUpdateStatus">暂存</yu-button>
      <yu-button type="primary" @click="customClick('doSubmit')" v-if="isUpdateStatus">提交</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1ABillcard',
  mixins: [mixinForm],
  props: {
    isUpdateStatus: Boolean
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstwjkhapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstwjkhapp/',
      formdata: {},
      formType: this.isUpdateStatus ? 'edit' : 'detail',
      dicOptions: {busiTypeOptions: [{key: '01', value: '网金客户白名单准入'}, {key: '02', value: '网金客户白名单停用'}] },
      formRules: {
        appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}]
      },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:MD_SERNO');
      this.formdata.busiType = '01';
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.huser = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.huserName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.handOrg = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.handOrgName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
