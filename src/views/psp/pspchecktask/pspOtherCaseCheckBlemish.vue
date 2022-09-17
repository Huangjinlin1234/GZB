<template>
  <div>
    <yu-xform ref="refForm" label-width="205px" :disabled="formType != 'edit' ? true : false" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
      <yu-panel title="其他情况检查(瑕疵类)" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="input" name="taskNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="瑕疵贷款的形成原因" ctype="textarea" name="blemishReason" rules="required"></yu-xform-item>
          <yu-xform-item label="是否会形成不良" ctype="radio" name="isNotFine" rules="required" data-code="STD_ZB_YES_NO" @change="isNotFine"></yu-xform-item>
          <yu-xform-item label="情况说明" ctype="textarea" name="notFineRemark" placeholder="如选择是，客户经理说明"></yu-xform-item>
          <yu-xform-item label="借款合同、保证合同、抵（质）押合同等重要法律文本是否合法、有效" ctype="radio" name="isVld" rules="required" data-code="STD_ZB_YES_NO" @change="isVld"></yu-xform-item>
          <yu-xform-item label="情况说明" ctype="textarea" name="vldRemark" placeholder="如选择否，客户经理说明"></yu-xform-item>
          <yu-xform-item label="主从合同能否衔接，无法律瑕疵" ctype="radio" name="isLnk" rules="required" data-code="STD_ZB_YES_NO" @change="isLnk"></yu-xform-item>
          <yu-xform-item label="情况说明" ctype="textarea" name="lnkRemark" placeholder="如选择否，客户经理说明"></yu-xform-item>
          <yu-xform-item label="本次检查后拟采取的措施等情况说明" ctype="textarea" name="caseRemark" placeholder="客户经理填写" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg("STD_ZB_YES_NO");
export default{
  mixins: [mixinForm],

  props: {
      taskNo: String,
      formType: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + '/api/pspothercasecheckblemish/update',
      queryUrl: this.$backend.cmisPsp + "/api/pspothercasecheckblemish/",
      formdata: {},
      formRules: {
        notFineRemark: [{ required: true, message: "请输入情况说明"}],
        vldRemark: [{ required: true, message: "请输入情况说明"}],
        lnkRemark: [{ required: true, message: "请输入情况说明"}]
      }
    };
  },

  created: function () {
    var _this = this;
    yufp.service.request({
      method: "GET",
      url: this.queryUrl,
      data: {condition: {taskNo: this.taskNo}},
      callback: function(code, message, response) {
        if (response.code == '0') {
          yufp.clone(response.data[0], _this.formdata);
        }
      }
    });
  },

  methods: {
   isNotFine (value) {
      if (value == '1') {
        this.setBillCardItemRequired('notFineRemark', true);
      } else {
        this.setBillCardItemRequired('notFineRemark', false);
      }
    },
    isVld (value) {
      if (value == '0') {
        this.setBillCardItemRequired('vldRemark', true);
      } else {
        this.setBillCardItemRequired('vldRemark', false);
      }
    },
    isLnk (value) {
      if (value == '0') {
        this.setBillCardItemRequired('lnkRemark', true);
      } else {
        this.setBillCardItemRequired('lnkRemark', false);
      }
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate
    },

    save: function () {

      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.formdata,
      })
      
    },
  }
};
</script>