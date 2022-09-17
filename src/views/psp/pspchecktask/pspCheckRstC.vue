<template>
  <div>
    <yu-xform ref="refForm" label-width="205px" :disabled="formType != 'edit' ? true : false" v-model="rstData" :rules="formRules" :form-change="triggerEditChangeEvent">
      <yu-panel title="检查结果及意见" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="1">
          <yu-xform-item name="pkId" label="主键" hidden></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="input" placeholder="任务编号" name="taskNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否能收回贷款" ctype="select" name="checkAdviceType" rules="required" data-code="STD_ZB_YES_NO" @change="checkAdviceType"></yu-xform-item>
          <yu-xform-item label="目前及后期拟采取的清降措施" ctype="textarea" name="checkAdviceReason" id="checkAdviceReason" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO');
export default{
  mixins: [mixinForm],

  props: {
    formData: Object,
    formType: String
  },

  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + '/api/pspcheckrst/updateSelective',
      rstData: {},
      formRules: { checkAdviceReason: [{ required: true, message: '请输入说明理由'}]
      }
    };
  },

  watch: {
    formData: function () {
      for (var item in this.rstData) {
        this.rstData[item] = this.formData[item];
      }
    }
  },

  methods: {
    checkAdviceType (value) {
      if (value == '3' || value == '4') {
        this.setBillCardItemRequired('checkAdviceReason', true);
      } else {
        this.setBillCardItemRequired('checkAdviceReason', false);
      }
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.rstData
      });
    }

  }
};
</script>
