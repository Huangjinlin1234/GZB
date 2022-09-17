<template>
  <div id="d1_A_18_BillCard">
    <div id="d1_A_18_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="cbphaSerno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" rules="required" disabled placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="批量移交状态" ctype="select"  data-code="STD_CUS_BATCH_HANDO_STATUS" placeholder="批量移交状态" name="batchHandoStatus" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" placeholder="备注" name="memo" :autosize="{ minRows: 3}" colspan="24"></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('doTempSave')">暂存</yu-button>
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('doSumbit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import {parseTime} from '@/utils/util';
export default {
  name: 'D1A18BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.belgOrgName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.batchHandoStatus = this.$xutils.getDefaultformulaData('01');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.belgOrg = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.$emit('set-serno', this.formdata.cbphaSerno);
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
