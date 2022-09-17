<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="disabledflg">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden disabled></yu-xform-item>
          <yu-xform-item label="被投资企业证件类型" ctype="select" placeholder="被投资企业证件类型" data-code="STD_ZB_CERT_TYP" name="certType" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="被投资企业证件号码" ctype="input" placeholder="被投资企业证件号码" name="certCode" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="被投资企业名称" ctype="input" placeholder="被投资企业名称" name="cusNameRel" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="被投资企业客户编号" ctype="input" placeholder="被投资企业客户编号" name="cusIdRel" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="投资性质 " ctype="select" rules="required" data-code="STD_ZB_COM_INV_TYP" placeholder="投资性质 " name="comInvTyp"></yu-xform-item>
          <yu-xform-item label="投资金额(万元)" ctype="" rules="required" placeholder="投资金额(万元)" name="invAmt"></yu-xform-item>
          <yu-xform-item label="出资方式 " ctype="select" rules="required" data-code="STD_ZB_INVT_TYP" placeholder="出资方式" name="invApp"></yu-xform-item>
          <yu-xform-item label="所占比例" ctype="yu-interest-rate" :rules="invPercRules" placeholder="所占比例" name="invPerc" :format-rate="true" sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="投资时间" ctype="datepicker" value-format="yyyy-MM-dd" :rules="invDtRules" placeholder="投资时间" name="invDt"></yu-xform-item>
          <yu-xform-item label="投资说明" ctype="textarea" placeholder="投资说明" name="invDesc"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" placeholder="备注" name="remark"></yu-xform-item>
          <yu-xform-item label="注册登记号" ctype="input" placeholder="注册登记号" name="regiNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="贷款卡号" ctype="input" placeholder="贷款卡号" name="lnCardNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="币种 " ctype="select" disabled hidden data-code="std_zb_cur_ty" placeholder="币种 " name="curType"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
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
      updateUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/update',
      addUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      disabledflg: true,
      File: {},
      invDtRules: [
        {
          validator: this.checkDate,
          required: true,
          trigger: 'blur'
        }
      ],
      invPercRules: [
        { required: true, message: '必输不能为空' },
        { validator: this.checkInvPerc, trigger: 'blur' }
      ]
    };
  },
  methods: {
    checkDate: function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请选择投资时间'));
      } else {
        var startTime = new Date(value);
        var endTime = new Date();
        if (endTime > startTime) {
          callback();
        } else {
          callback(new Error('投资时间不能晚于当前时间'));
        }
      }
    },
    checkInvPerc: function (rule, value, callback) {
      if (!isNaN(value) && (value > 1 || value <= 0)) {
        callback(new Error('所占比例必须大于0%且小于等于100%'));
      } else {
        callback();
      }
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>