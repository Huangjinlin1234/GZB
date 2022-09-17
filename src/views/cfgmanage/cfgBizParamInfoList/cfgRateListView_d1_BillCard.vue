<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" request-type="GET" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务品种" ctype="select" name="bizType" rules="required" data-code="STD_ZB_OPRD_TYP" placeholder="业务品种"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="基准利率项目类型" ctype="select" name="baseRemitType" data-code="STD_ZB_BIZ_TYP" placeholder="基准利率项目类型"></yu-xform-item>
          <yu-xform-item label="基准年利率" ctype="yu-interest-rate" name="baseRateY" rules="required" placeholder="基准年利率"></yu-xform-item>
          <yu-xform-item label="基准月利率" ctype="yu-num" name="baseRateM" rules="required" placeholder="基准月利率" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
          <yu-xform-item label="利率浮动上限" ctype="yu-interest-rate" name="rateFloatMax" rules="required" placeholder="利率浮动上限"></yu-xform-item>
          <yu-xform-item label="利率浮动下限" ctype="yu-interest-rate" name="rateFloatMin" rules="required" placeholder="利率浮动下限"></yu-xform-item>
          <yu-xform-item label="期限上限（月）" ctype="yu-num" name="termMax" rules="required" placeholder="期限上限（月）" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="期限下限（月）" ctype="yu-num" name="termMin" rules="required" placeholder="期限下限（月）" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="期限说明" ctype="input" placeholder="期限说明" name="termDesc"></yu-xform-item>
          <yu-xform-item label="责任人"  name="managerId" rules="required" placeholder="责任人"></yu-xform-item>
          <yu-xform-item label="生效日期" ctype="datepicker" name="inureDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" placeholder="生效日期"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="regiDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" placeholder="登记日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('bycancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgrate/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgrate/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.curType = this.$xutils.getDefaultformulaData('CNY');
      this.formdata.inureDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.regiDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>