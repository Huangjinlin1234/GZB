<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="用信期限">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="授信协议编号" ctype="yu-xcredit-proto3" name="lmtCtrNo" rules="required" placeholder="授信协议编号" @select-fn="commonSelectFn" :mapping="{'inputId':'inputId','inputBrId':'inputBrId','oneAmt':'oneAmt','lowRiskType':'lowRiskType','managerId':'managerId','managerBrName':'managerBrName','inputDate':'inputDate','inputName':'inputName','lmtCtrNo':'lmtCtrNo','inputBrName':'inputBrName','lmtTotlAmt':'lmtTotlAmt','revolvAmt':'revolvAmt','lmtStarDate':'lmtStarDate','managerBrId':'managerBrId','lmtDocIdate':'lmtDocIdate','lmtEndDate':'lmtEndDate'}" width="720" height="480" ></yu-xform-item>
            <yu-xform-item label="授信额度" ctype="yu-currency" name="lmtAmt" rules="required" placeholder="授信额度" :min="0" ></yu-xform-item>
            <yu-xform-item label="授信总额度" ctype="yu-currency" name="lmtTotlAmt" rules="required" disabled placeholder="授信总额度" :min="0" ></yu-xform-item>
            <yu-xform-item label="循环额度" ctype="yu-currency" name="revolvAmt" rules="required" disabled placeholder="循环额度" :min="0" ></yu-xform-item>
            <yu-xform-item label="一次性额度" ctype="yu-currency" name="oneAmt" rules="required" disabled placeholder="一次性额度" :min="0" ></yu-xform-item>
            <yu-xform-item label="低风险业务类型" ctype="select" name="lowRiskType" rules="required" data-code="STD_ZB_LOW_RISK_TYP" placeholder="低风险业务类型"></yu-xform-item>
            <yu-xform-item label="授信起始日期" ctype="datepicker" name="lmtStarDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="授信起始日期"></yu-xform-item>
            <yu-xform-item label="授信到期日期" ctype="datepicker" name="lmtEndDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="授信到期日期"></yu-xform-item>
            <yu-xform-item label="授信审批通知书有效期" ctype="datepicker" name="lmtDocIdate" value-format="yyyy-MM-dd" rules="required" placeholder="授信审批通知书有效期"></yu-xform-item>
            <yu-xform-item label="调整后的授信审批通知书有效期" ctype="datepicker" name="adjustIdate" value-format="yyyy-MM-dd" rules="required" placeholder="调整后的授信审批通知书有效期"></yu-xform-item>
            <yu-xform-item label="调整原因" ctype="textarea" name="adjustResn" placeholder="调整原因"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerId" rules="required" hidden placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','orgId':'managerBrId'}" width="720" height="480" ></yu-xform-item>
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerName" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xuser" name="managerBrId" rules="required" hidden placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','orgId':'managerBrId'}" width="720" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="yu-xuser" name="inputId" rules="required" disabled hidden placeholder="登记人" @select-fn="commonSelectFn" :mapping="{'loginCode':'inputId','orgId':'inputBrId'}" width="720" height="480" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="yu-xuser" name="inputBrId" rules="required" disabled hidden placeholder="登记机构" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','orgId':'managerBrId'}" width="720" height="480" ></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" disabled hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" rules="required" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('submit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqpidtadjapp/update",
      addUrl: this.$backend.cmisBiz + "/api/iqpidtadjapp/",
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