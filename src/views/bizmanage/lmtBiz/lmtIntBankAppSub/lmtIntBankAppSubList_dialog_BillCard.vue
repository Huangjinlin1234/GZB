<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId"></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="授信分项流水号" ctype="input" placeholder="授信分项流水号" name="subSerno"></yu-xform-item>
          <yu-xform-item label="授信分项名称" ctype="input" placeholder="授信分项名称" name="bizType"></yu-xform-item>
          <yu-xform-item label="变更标志" ctype="input" placeholder="变更标志" name="chgFlag"></yu-xform-item>
          <yu-xform-item label="原分项编号" ctype="input" placeholder="原分项编号" name="origiLmtSubSerno"></yu-xform-item>
          <yu-xform-item label="原分项授信金额" ctype="input" placeholder="原分项授信金额" name="origiLmtSubAmt"></yu-xform-item>
          <yu-xform-item label="原分项期限" ctype="input" placeholder="原分项期限" name="origiLmtSubTerm"></yu-xform-item>
          <yu-xform-item label="授信额度" ctype="input" placeholder="授信额度" name="lmtSubAmt"></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType"></yu-xform-item>
          <yu-xform-item label="是否循环" ctype="input" placeholder="是否循环" name="isRevolv"></yu-xform-item>
          <yu-xform-item label="是否涉及货币基金" ctype="input" placeholder="是否涉及货币基金" name="isIvlMf"></yu-xform-item>
          <yu-xform-item label="货币基金授信额度" ctype="input" placeholder="货币基金授信额度" name="lmtMfAmt"></yu-xform-item>
          <yu-xform-item label="单只货币基金授信额度" ctype="input" placeholder="单只货币基金授信额度" name="lmtSingleMfAmt"></yu-xform-item>
          <yu-xform-item label="授信期限" ctype="input" placeholder="授信期限" name="lmtTerm"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId"></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime"></yu-xform-item>
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
      updateUrl: this.$backend.cmisBiz + "/api/lmtintbankappsub/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtintbankappsub/",
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