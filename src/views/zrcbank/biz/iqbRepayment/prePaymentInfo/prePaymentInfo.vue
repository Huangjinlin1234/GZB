<template>
  <yu-xform ref="refForm" label-width="100px" v-model="formdata" class="yu-form-gap">
    <yu-xform-group>
      <yu-xform-item label="交易流水号" name="iqpSerno" ctype="input" rules="required"></yu-xform-item>
      <yu-xform-item label="产品编号" name="prdId" ctype="input"></yu-xform-item>
      <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
      <yu-xform-item label="借据号" ctype="custom" name="custom" colspan="10">
        <yu-input v-model="customTitle"></yu-input>
      </yu-xform-item>
      <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
        <yu-button type="primary">选择</yu-button>
      </yu-xform-item>
      <yu-xform-item label="客户编号" name="cusId" ctype="input" rules="required"></yu-xform-item>
      <yu-xform-item label="客户名称" name="cusName" ctype="input" rules="required"></yu-xform-item>
      <yu-xform-item label="合同编号" name="contNo" ctype="input" rules="required"></yu-xform-item>
      <yu-xform-item label="币种" name="curType" ctype="select" rules="typeRule" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
      <yu-xform-item label="起始日期" name="startDate" ctype="datepicker" rules="required"></yu-xform-item>
      <yu-xform-item label="到期日期" name="endDate" ctype="datepicker" rules="required"></yu-xform-item>
      <yu-xform-item label="借据余额" name="loanBalance" ctype="input" rules="required"></yu-xform-item>
    </yu-xform-group>
    <div class="yu-grpButton">
      <yu-button icon="check" type="primary" @click="saveFn">确定</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
    </div>
  </yu-xform>
</template>
<script>
export default {
  data: function () {
    return {
      formdata: {},
      customTitle: '',
      typeRule: [{ required: true, message: '请选择类型', trigger: 'blur' }]
    };
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;

      _this.dialogVisible = false;
    },
    /**
     * 保存
     */
    saveFn: function () {
      var validate = false;
      var _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      _this.$msgbox.alert(_this.formdata, '提示');
    }
  }
};
</script>
