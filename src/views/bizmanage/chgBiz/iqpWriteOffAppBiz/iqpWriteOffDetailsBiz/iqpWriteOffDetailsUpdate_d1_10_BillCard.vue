<template>
  <div id="d1_10_BillCard">
    <div id="d1_10_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="借据编号" ctype="yu-xdebt-list" name="billNo" rules="required" placeholder="借据编号" @select-fn="commonSelectFn" :mapping="{'twelveClass':'twelveClass','prdId':'prdId','guarWay':'guarWay','curType':'curType','prdName':'prdName','endDate':'endDate','contNo':'contNo','loanAmt':'loanAmt','loanBalance':'loanBalance','cusId':'cusId','billNo':'billNo','fiveClass':'fiveClass','startDate':'startDate'}" width="800" height="480" :parms="{'cusId':'${cusId}'}" ></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled hidden></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
          <yu-xform-item label="起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="起始日期"></yu-xform-item>
          <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
          <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
          <yu-xform-item label="表内欠息" ctype="yu-currency" name="innerOweInt" disabled placeholder="表内欠息" :min="0" ></yu-xform-item>
          <yu-xform-item label="表外欠息" ctype="yu-currency" name="outOweInt" disabled placeholder="表外欠息" :min="0" ></yu-xform-item>
          <yu-xform-item label="累计欠息" ctype="yu-currency" name="totalOweInt" disabled placeholder="累计欠息" :min="0" ></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="五级分类" ctype="select" name="fiveClass" disabled data-code="STD_ZB_FIVE_SORT" placeholder="五级分类"></yu-xform-item>
          <yu-xform-item label="十二级分类" ctype="select" name="twelveClass" disabled data-code="STD_ZB_TWELVE_SORT" placeholder="十二级分类"></yu-xform-item>
          <yu-xform-item label="核销本金" ctype="yu-currency" name="writeoffCap" placeholder="核销本金" :min="0" ></yu-xform-item>
          <yu-xform-item label="核销利息" ctype="yu-currency" name="writeoffInt" placeholder="核销利息" :min="0" ></yu-xform-item>
          <yu-xform-item label="核销总金额" ctype="yu-currency" name="writeoffSum" disabled placeholder="核销总金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
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
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_10_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqpwriteoffdetl/update",
      addUrl: this.$backend.cmisBiz + "/api/iqpwriteoffdetl/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID")
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>