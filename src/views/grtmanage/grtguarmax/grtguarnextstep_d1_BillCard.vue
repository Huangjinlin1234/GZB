<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="担保合同流水号" ctype="input" placeholder="担保合同流水号" name="guarPkId" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="最高额担保合同">
          <yu-xform-group :column="3">
            <yu-xform-item label="担保合同编号" ctype="input" placeholder="担保合同编号" name="guarContNo" hidden></yu-xform-item>
            <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="guarContCnNo" hidden></yu-xform-item>
            <yu-xform-item label="担保合同类型" ctype="select" name="guarContType" rules="required" disabled data-code="STD_ZB_GRT_TYP" placeholder="担保合同类型"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="担保合同状态" ctype="select" name="guarContState" hidden data-code="STD_ZB_GRT_ST" placeholder="担保合同状态"></yu-xform-item>
            <yu-xform-item label="借款人编号" ctype="yu-xcustom" name="borrowerId" rules="required" placeholder="借款人编号" @select-fn="commonSelectFn" :mapping="{'certType':'assureCertType','cusId':'borrowerId','name':'borrowerName','certCode':'assureCertCode'}" width="700" height="480" :parms="{'oprType':'01','openType':'01'}" ></yu-xform-item>
            <yu-xform-item label="借款人名称" ctype="input" placeholder="借款人名称" name="borrowerName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="担保人编号" ctype="yu-xcustom" name="guarantorId" rules="required" hidden placeholder="担保人编号" @select-fn="commonSelectFn" :mapping="{'cusId':'guarantorId','cusName':'assureName'}" width="700" height="480" ></yu-xform-item>
            <yu-xform-item label="担保人名称" ctype="input" placeholder="担保人名称" name="assureName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="担保金额" ctype="yu-currency" name="guarAmt" hidden placeholder="担保金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="保证形式" ctype="select" name="assureModal" hidden data-code="STD_ZB_ASSURE_MODAL" placeholder="保证形式"></yu-xform-item>
            <yu-xform-item label="担保人证件类型" ctype="select" name="assureCertType" hidden data-code="STD_ZB_CERT_TYP" placeholder="担保人证件类型"></yu-xform-item>
            <yu-xform-item label="担保人证件号码" ctype="input" placeholder="担保人证件号码" name="assureCertCode" hidden></yu-xform-item>
            <yu-xform-item label="贷款卡号" ctype="input" placeholder="贷款卡号" name="lnCardNo" hidden></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" hidden data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="select" name="termType" hidden data-code="STD_ZB_TERM_TYP" placeholder="期限类型"></yu-xform-item>
            <yu-xform-item label="担保期限" ctype="input" placeholder="担保期限" name="guarTerm" hidden></yu-xform-item>
            <yu-xform-item label="担保起始日" ctype="datepicker" name="guarStartDate" value-format="yyyy-MM-dd" hidden placeholder="担保起始日"></yu-xform-item>
            <yu-xform-item label="担保终止日" ctype="datepicker" name="guarEndDate" value-format="yyyy-MM-dd" hidden placeholder="担保终止日"></yu-xform-item>
            <yu-xform-item label="签订日期" ctype="datepicker" name="signDate" value-format="yyyy-MM-dd" hidden placeholder="签订日期"></yu-xform-item>
            <yu-xform-item label="质押类型" ctype="select" name="imnType" hidden data-code=" STD_ZB_IMN_TYPE" placeholder="质押类型"></yu-xform-item>
            <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" hidden></yu-xform-item>
            <yu-xform-item label="争议借据方式选项" ctype="select" name="billDispupeOpt" hidden data-code="STD_ZB_DISPUPE_OPT" placeholder="争议借据方式选项"></yu-xform-item>
            <yu-xform-item label="仲裁机构" ctype="input" placeholder="仲裁机构" name="arbitrateBch" hidden></yu-xform-item>
            <yu-xform-item label="合同份数" ctype="input" placeholder="合同份数" name="contQnt" hidden></yu-xform-item>
            <yu-xform-item label="甲方执合同份数" ctype="input" placeholder="甲方执合同份数" name="contQntOwner" hidden></yu-xform-item>
            <yu-xform-item label="乙方执合同份数" ctype="input" placeholder="乙方执合同份数" name="contQntPartyB" hidden></yu-xform-item>
            <yu-xform-item label="丙方执合同份数" ctype="input" placeholder="丙方执合同份数" name="contQntPartyC" hidden></yu-xform-item>
            <yu-xform-item label="丁方执合同份数" ctype="input" placeholder="丁方执合同份数" name="contQntPartyD" hidden></yu-xform-item>
            <yu-xform-item label="戊方执合同份数" ctype="input" placeholder="戊方执合同份数" name="contQntPartyE" hidden></yu-xform-item>
            <yu-xform-item label="其他主合同" ctype="input" placeholder="其他主合同" name="otherMainCont" hidden></yu-xform-item>
            <yu-xform-item label="确认最高债权额方式" ctype="select" name="maxClaimTp" hidden data-code="STD_ZB_MAX_CLAIM_TP" placeholder="确认最高债权额方式"></yu-xform-item>
            <yu-xform-item label="最高债权额" ctype="input" placeholder="最高债权额" name="maxClaimAmt" hidden></yu-xform-item>
            <yu-xform-item label="其他约定事项" ctype="input" placeholder="其他约定事项" name="otherAgreedEvent" hidden></yu-xform-item>
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="更新日期"></yu-xform-item>
            <yu-xform-item label="申请类型" ctype="select" name="approveType" hidden data-code="STD_ZB_GRT_APP_TYP" placeholder="申请类型"></yu-xform-item>
            <yu-xform-item label="注销日期" ctype="datepicker" name="logoutDate" value-format="yyyy-MM-dd" hidden placeholder="注销日期"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="合同打印次数" ctype="yu-num" name="contPrintNum" hidden placeholder="合同打印次数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrIdName" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updIdName" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('nextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/grtguarcont/update',
      addUrl: this.$backend.cmisBiz + '/api/grtguarcont/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.guarPkId = this.$xutils.getDefaultformulaData('SEQ:GRT_GUAR_SERNO');
      this.formdata.guarContNo = this.$xutils.getDefaultformulaData('SEQ:GRT_CONT_NO');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
    }
  }
};
</script>