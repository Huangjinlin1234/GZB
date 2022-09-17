<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="出资人性质 std_zb_inv" ctype="input" placeholder="出资人性质 std_zb_inv" name="invtTyp" disabled hidden></yu-xform-item>
          <yu-xform-item label="出资人证件类型 " ctype="input" placeholder="出资人证件类型 " name="certTyp"></yu-xform-item>
          <yu-xform-item label="出资人证件号码 " ctype="input" placeholder="出资人证件号码 " name="certCode"></yu-xform-item>
          <yu-xform-item label="出资人客户编号" ctype="input" placeholder="出资人客户编号" name="cusRelId"></yu-xform-item>
          <yu-xform-item label="出资人名称" ctype="input" placeholder="出资人名称" name="invtName"></yu-xform-item>
          <yu-xform-item label="币种 std_zb_cur_ty" ctype="input" placeholder="币种 std_zb_cur_ty" name="curType" disabled hidden></yu-xform-item>
          <yu-xform-item label="出资金额 " ctype="input" placeholder="出资金额 " name="invtAmt"></yu-xform-item>
          <yu-xform-item label="出资比例" ctype="input" placeholder="出资比例" name="invtPerc"></yu-xform-item>
          <yu-xform-item label="出资时间" ctype="input" placeholder="出资时间" name="invDate"></yu-xform-item>
          <yu-xform-item label="出资说明" ctype="input" placeholder="出资说明" name="invtDesc"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型  " ctype="input" placeholder="操作类型  " name="oprType"></yu-xform-item>
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
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "dialog_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + "/api/cuscorpapital/update",
      addUrl: this.$backend.cmisCus + "/api/cuscorpapital/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
  }
}
</script>