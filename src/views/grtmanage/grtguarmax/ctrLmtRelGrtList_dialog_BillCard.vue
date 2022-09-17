<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" hidden></yu-xform-item>
          <yu-xform-item label="授信协议编号" ctype="input" placeholder="授信协议编号" name="lmtCtrNo" hidden></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtLimitNo" hidden></yu-xform-item>
          <yu-xform-item label="额度品种名称" ctype="input" placeholder="额度品种名称" name="lmtVarietNoName" hidden></yu-xform-item>
          <yu-xform-item label="分项类型" ctype="input" placeholder="分项类型" name="subType" hidden></yu-xform-item>
          <yu-xform-item label="额度类型" ctype="input" placeholder="额度类型" name="limitType" hidden></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" placeholder="担保方式" name="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" placeholder="币种" name="curType" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="授信金额" ctype="yu-currency" name="lmtAmt" placeholder="授信金额" :min="0" hidden></yu-xform-item>
          <yu-xform-item label="授信起始日" ctype="datepicker" name="lmtStarDate" value-format="yyyy-MM-dd" placeholder="授信起始日" hidden></yu-xform-item>
          <yu-xform-item label="授信到期日期" ctype="datepicker" name="lmtEndDate" value-format="yyyy-MM-dd" placeholder="授信到期日期" hidden></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" placeholder="合同金额" :min="0" hidden></yu-xform-item>
          <yu-xform-item label="合同起始日期" ctype="datepicker" name="contStartDate" value-format="yyyy-MM-dd" placeholder="合同起始日期" hidden></yu-xform-item>
          <yu-xform-item label="合同到期日期" ctype="datepicker" name="contStartDate" value-format="yyyy-MM-dd" placeholder="合同到期日期" hidden></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="input" placeholder="合同状态" name="contStatus" hidden></yu-xform-item>

          <yu-xform-item label="担保金额" ctype="yu-currency" name="guarAmt" placeholder="担保金额" :min="0"></yu-xform-item>
          <yu-xform-item label="是否授信项下" ctype="select" placeholder="是否授信项下" name="isUnderLmt" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="担保合同状态" ctype="select" placeholder="担保合同状态" name="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xform-item>
          <yu-xform-item label="担保合同状态" ctype="select" placeholder="担保合同状态" name="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xform-item>
          <yu-xform-item label="担保起始日期" ctype="datepicker" name="guarStartDate" value-format="yyyy-MM-dd" placeholder="担保起始日期"></yu-xform-item>
          <yu-xform-item label="担保到期日期" ctype="datepicker" name="guarEndDate" value-format="yyyy-MM-dd" placeholder="担保到期日期"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName"></yu-xform-item>
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
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_GUAR_CONT_STATE,STD_ZB_GUAR_CONT_TYPE');
export default{
  name: "dialog_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api//update",
      addUrl: this.$backend.cmisBiz + "/api//",
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