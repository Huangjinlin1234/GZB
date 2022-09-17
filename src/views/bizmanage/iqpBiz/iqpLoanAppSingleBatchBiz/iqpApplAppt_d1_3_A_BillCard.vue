<template>
  <div id="d1_3_A_BillCard">
    <div id="d1_3_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="业务申请流水号" ctype="input" placeholder="业务申请流水号" name="iqpSerno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="主借人-资产信息汇总">
          <yu-xform-group :column="3">
            <yu-xform-item label="月收入汇总(元)" ctype="yu-currency" name="sumMountAmt" disabled placeholder="月收入汇总(元)" :min="0" ></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="custId" hidden></yu-xform-item>
            <yu-xform-item label="资产价值汇总(元)" ctype="yu-currency" name="sumAssetsAmt" disabled placeholder="资产价值汇总(元)" :min="0" ></yu-xform-item>
            <yu-xform-item label="场景" ctype="input" placeholder="场景" name="secen" hidden></yu-xform-item>
            <yu-xform-item label="有负债金额汇总" ctype="yu-currency" name="debtAmtSum" placeholder="有负债金额汇总" :min="0" ></yu-xform-item>
            <yu-xform-item label="有负债金额汇总(折算后)" ctype="yu-currency" name="debtAmtSumz" placeholder="有负债金额汇总(折算后)" :min="0" ></yu-xform-item>
            <yu-xform-item label="已有负债月还款额汇总" ctype="yu-currency" name="mDebtAmtSum" placeholder="已有负债月还款额汇总" :min="0" ></yu-xform-item>
            <yu-xform-item label="已有负债月还款额汇总(折算后)" ctype="yu-currency" name="mDebtAmtSumz" placeholder="已有负债月还款额汇总(折算后)" :min="0" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="申请人编号" ctype="input" placeholder="申请人编号" name="apptCode" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSaveMain')">保存负债认定信息</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_3_A_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqpriskchkdebtcfrm/update",
      addUrl: this.$backend.cmisBiz + "/api/iqpriskchkdebtcfrm/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>