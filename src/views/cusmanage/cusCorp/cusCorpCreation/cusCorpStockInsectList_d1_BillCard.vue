<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
          <yu-xform-item label="股票代码" ctype="input" placeholder="股票代码" name="stkCode" rules="required"></yu-xform-item>
          <yu-xform-item label="股票名称" ctype="input" placeholder="股票名称" name="stkName" rules="required"></yu-xform-item>
          <yu-xform-item label="上市日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="上市日期" name="stkMrkDt"></yu-xform-item>
          <yu-xform-item label="上市公司标志" ctype="select" data-code="STD_STOCK_CPRT_FLAG" placeholder="上市公司标志" name="stockCprtFlag"></yu-xform-item>
          <yu-xform-item label="上市地" ctype="select" :options="dicOptions.stkMrkPlaceOptions" placeholder="上市地" name="stkMrkPlace"></yu-xform-item>
          <yu-xform-item label="上市地国别" ctype="select" data-code="STD_ZB_COUNTRY" placeholder="上市地国别" name="stockAreaCountry"></yu-xform-item>
          <yu-xform-item label="交易所名称" ctype="input" placeholder="交易所名称" name="stkMrkBrs"></yu-xform-item>
          <yu-xform-item label="是否质押" ctype="input" placeholder="是否质押" name="comIsornoGage" hidden></yu-xform-item>
          <yu-xform-item label="质押股数" ctype="input" placeholder="质押股数" name="comGageStk" hidden></yu-xform-item>
          <yu-xform-item label="首次发行价（元）" ctype="input" placeholder="首次发行价（元）" name="stkInitAmt" rules="required"></yu-xform-item>
          <yu-xform-item label="股票当前价（元）" ctype="input" placeholder="股票当前价（元）" name="stkCurAmt"></yu-xform-item>
          <yu-xform-item label="股票评估价（元）" ctype="input" placeholder="股票评估价（元）" name="stkEvaAmt"></yu-xform-item>
          <yu-xform-item label="当前股本总量（万股）" ctype="input" placeholder="当前股本总量（万股）" name="stkCapQnt" rules="required"></yu-xform-item>
          <yu-xform-item label="当前流通股量（万股）" ctype="input" placeholder="当前流通股量（万股）" name="stkCurQnt" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark"></yu-xform-item>
          <yu-xform-item label="出资类型" ctype="select" hidden data-code="STD_ZB_INVT_TYPE" placeholder="出资类型" name="invtType"></yu-xform-item>
          <yu-xform-item label="国别 " ctype="select" hidden data-code="STD_ZB_COUNTRY" placeholder="国别 " name="country"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="操作类型std_zb_opr_t" ctype="input" placeholder="操作类型std_zb_opr_t" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorpstock/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorpstock/',
      formdata: {},
      formType: 'edit',
      dicOptions: {stkMrkPlaceOptions: [{key: '01', value: '上海'}, {key: '02', value: '深圳'}, {key: '03', value: '香港'}, {key: '04', value: '新加坡'}, {key: '05', value: '伦敦'}, {key: '06', value: '纽约'}, {key: '07', value: '东京'}, {key: '08', value: '其他'}] },
      formRules: {stkCode: [{validator: validator.numberAndLetter, message: '只能输入数字或字母', trigger: 'blur'}]},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>
