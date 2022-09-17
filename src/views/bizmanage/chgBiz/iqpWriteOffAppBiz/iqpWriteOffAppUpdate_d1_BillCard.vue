<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="核销客户信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户主管客户经理" ctype="input" placeholder="客户主管客户经理" name="accManagerId" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="accManagerName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" rules="required" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" :parms="{'belgLine':'bl300','cusState':'20','oprType':'01'}" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="呆账核销申请信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="核销笔数" ctype="yu-num" name="writeoffQnt" rules="required" disabled placeholder="核销笔数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="借据总金额(元)" ctype="yu-currency" name="totalAmt" rules="required" disabled placeholder="借据总金额(元)" :min="0" ></yu-xform-item>
            <yu-xform-item label="借据总余额" ctype="yu-currency" name="totalBal" rules="required" disabled placeholder="借据总余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="总表内欠息" ctype="yu-currency" name="totalInnerInt" rules="required" disabled placeholder="总表内欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="总表外欠息" ctype="yu-currency" name="totalOutInt" rules="required" disabled placeholder="总表外欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="总累计欠息" ctype="yu-currency" name="totalSumInt" rules="required" disabled placeholder="总累计欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销本金" ctype="yu-currency" name="totalWriteoffCap" rules="required" disabled placeholder="核销本金" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销利息" ctype="yu-currency" name="totalWriteoffInt" rules="required" disabled placeholder="核销利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销总金额" ctype="yu-currency" name="totalWriteoffSum" rules="required" disabled placeholder="核销总金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销理由" ctype="textarea" name="writeoffResn" rules="required" placeholder="核销理由"></yu-xform-item>
            <yu-xform-item label="是否保留追诉权" ctype="select" name="isSaveRgtRes" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否保留追诉权"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="memo" placeholder="备注"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerIdName" rules="required" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrIdName','loginCode':'managerId','userName':'managerIdName','orgId':'managerBrId'}" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrIdName" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrIdName','orgId':'managerBrId'}" ></yu-xform-item>
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code=" STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqpwriteoffapp/update",
      addUrl: this.$backend.cmisBiz + "/api/iqpwriteoffapp/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.updBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
    }
  }
}
</script>