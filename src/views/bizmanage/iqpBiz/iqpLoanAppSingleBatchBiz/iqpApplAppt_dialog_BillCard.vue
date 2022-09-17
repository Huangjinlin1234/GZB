<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="非金融资产表主键" ctype="input" placeholder="非金融资产表主键" name="nfinanPk" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="业务申请流水号" ctype="input" placeholder="业务申请流水号" name="iqpSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="贷款申请人主键" ctype="input" placeholder="贷款申请人主键" name="apptCode" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="所属人类型" ctype="select" name="relType" rules="required" data-code="STD_ZB_PRMSBORR_TYPE" placeholder="所属人类型"></yu-xform-item>
          <yu-xform-item label="资产折算大类" ctype="select" name="assetType" rules="required" hidden data-code="STD_ZB_ASSET_TYPE" placeholder="资产折算大类"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="非金融资产类型" ctype="select" name="nFinAssetType" rules="required" data-code="STD_ZB_N_FIN_ASSET_TYPE" placeholder="非金融资产类型"></yu-xform-item>
          <yu-xform-item label="房屋属性" ctype="select" name="houseType" data-code="STD_ZB_HOUSE_TYP" placeholder="房屋属性"></yu-xform-item>
          <yu-xform-item label="房屋价值" ctype="yu-currency" name="houseValue" rules="required" placeholder="房屋价值" :min="0" ></yu-xform-item>
          <yu-xform-item label="抵押余额" ctype="yu-currency" name="mortgageBal" placeholder="抵押余额" :min="0" ></yu-xform-item>
          <yu-xform-item label="其他非金融资产（折算后）金额" ctype="yu-currency" name="otherFinanAsset" rules="required" placeholder="其他非金融资产（折算后）金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="客户经理认定收入金额(元)" ctype="yu-currency" name="managerIncome" rules="required" placeholder="客户经理认定收入金额(元)" :min="0" ></yu-xform-item>
          <yu-xform-item label="分行审查认定收入金额" ctype="yu-currency" name="branchExIncome" rules="required" placeholder="分行审查认定收入金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="总行审查认定收入金额" ctype="yu-currency" name="headExIncome" rules="required" hidden placeholder="总行审查认定收入金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
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
      updateUrl: this.$backend.cmisBiz + "/api/iqpdisassetnfinan/update",
      addUrl: this.$backend.cmisBiz + "/api/iqpdisassetnfinan/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.nfinanPk = this.$xutils.getDefaultformulaData("SEQ:YPSEQ")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01")
    }
  }
}
</script>