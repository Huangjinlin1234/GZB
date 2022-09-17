<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="名单流水号" ctype="input" placeholder="名单流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="IDENT_TYPE" placeholder="证件类型"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="导入原因" ctype="select" placeholder="导入原因" name="importResn" data-code="STD_LST_WTSX_IMPORT_REASON" ></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" hidden></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrg" hidden></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huserName"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrgName"></yu-xform-item>
          <yu-xform-item label="进入日期" ctype="input" placeholder="进入日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select"  placeholder="名单状态" name="listStatus" data-code="STD_CUS_LIST_STATUS"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
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
import { validator } from '@/utils/validate';
yufp.lookup.reg('IDENT_TYPE,STD_LST_WTSX_IMPORT_REASON,STD_ZB_STATUS');
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuswebfinwhitelist/update',
      addUrl: this.$backend.cmisCus + '/api/cuswebfinwhitelist/',
      formdata: {},
      formType: 'edit',
      formRules: {
        inputId: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}]
      },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>