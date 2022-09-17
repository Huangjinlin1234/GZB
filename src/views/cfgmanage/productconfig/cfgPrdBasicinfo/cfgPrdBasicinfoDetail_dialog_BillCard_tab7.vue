<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" width="600px" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="产品经理代码" ctype="yu-xuser" name="userId" rules="required" placeholder="产品经理代码" @select-fn="commonSelectFn" :mapping="{ loginCode: 'userId', userName: 'userName' }" width="680" height="480" :parms="{}"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" hidden></yu-xform-item>
          <yu-xform-item label="产品经理名称" ctype="input" placeholder="产品经理名称" name="userName" disabled></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          <yu-xform-item label="用户筛选条件(勿删)" ctype="input" placeholder="用户筛选条件(勿删)" name="refUserid" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'DialogBillCardTab7',
  mixins: [mixinForm],
  props: {
    prdId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgprduserrel/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgprduserrel/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getUUID();
      this.formdata.prdId = this.prdId;
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    }
  }
};
</script>
