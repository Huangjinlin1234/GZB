<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
          <yu-xform-item label="债券名称" ctype="input" placeholder="债券名称" name="bondName" rules="required"></yu-xform-item>
          <yu-xform-item label="债券类型" ctype="select" rules="required" data-code="STD_ZB_BOND_TYP" placeholder="债券类型" name="bondTyp"></yu-xform-item>
          <yu-xform-item label="发行时间" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="发行时间" name="bondPubDt" :colspan="12"></yu-xform-item>
          <yu-xform-item label="债券期限(月)" ctype="" rules="required" placeholder="债券期限(月)" :precision="0" name="bondTrm" :colspan="12"></yu-xform-item>
          <yu-xform-item label="债券币种" ctype="select" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="债券币种" name="bondCurTyp"></yu-xform-item>
          <yu-xform-item label="总金额(元)" ctype="" rules="required" placeholder="总金额(元)" name="bondAmt" :colspan="12"></yu-xform-item>
          <yu-xform-item label="年利率(%)" ctype="" rules="required" placeholder="年利率(%)" name="bondRate" :colspan="12"></yu-xform-item>
          <yu-xform-item label="是否上市 " ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否上市 " name="bondMrkFlg"></yu-xform-item>
          <yu-xform-item label="上市地" ctype="select" :options="dicOptions.bondMrkPlaceOptions" placeholder="上市地" name="bondMrkPlace"></yu-xform-item>
          <yu-xform-item label="交易所名称" ctype="input" placeholder="交易所名称" name="bondMrkBrs"></yu-xform-item>
          <yu-xform-item label="债券等级" ctype="input" placeholder="债券等级" name="bondCrtInfo"></yu-xform-item>
          <yu-xform-item label="评级机构" ctype="input" placeholder="评级机构" name="bondCrtOrg"></yu-xform-item>
          <yu-xform-item label="债券评估价" ctype="input" placeholder="债券评估价" name="bondEvaAmt"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
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
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorpbond/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorpbond/',
      formdata: {},
      formType: 'edit',
      dicOptions: {bondMrkPlaceOptions:[{key: '01', value: '上海'}, {key: '02', value: '深圳'}, {key: '03', value: '香港'}, {key: '04', value: '新加坡'}, {key: '05', value: '伦敦'}, {key: '06', value: '纽约'}, {key: '07', value: '东京'}, {key: '08', value: '其他'}] },
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>