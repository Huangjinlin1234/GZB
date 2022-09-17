<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="担保合同编号 " ctype="input" placeholder="担保合同编号 " name="guarContNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="担保合同类型" ctype="select" name="guarContType" rules="required" disabled data-code="STD_ZB_GUAR_CONT_TYPE" placeholder="担保合同类型"></yu-xform-item>
          <yu-xform-item label="借款人客户编号" ctype="input" placeholder="借款人客户编号" name="cusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="借款人编号" ctype="input" placeholder="借款人编号" name="borrowerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="借款人名称" ctype="input" placeholder="借款人名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="是否授信项下" ctype="select" name="isUnderLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否授信项下"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
          <yu-xform-item label="纸质合同编号" ctype="input" placeholder="纸质合同编号" name="paperContNo"></yu-xform-item>
          <yu-xform-item label="是否追加担保" ctype="select" name="isSuperaddGuar" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否追加担保"></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtNo" disabled></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="approvalNo" disabled></yu-xform-item>
          <yu-xform-item label="抵押顺位" ctype="input" placeholder="抵押顺位" name="pldOrder"></yu-xform-item>
          <yu-xform-item label="担保人名称" ctype="input" placeholder="担保人名称" name="guarName" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否浮动抵押" ctype="select" name="isFloatPld" data-code="STD_ZB_YES_NO" placeholder="是否浮动抵押"></yu-xform-item>
          <yu-xform-item label="质押合同类型" ctype="select" name="pldContType" data-code="STD_ZB_IMN_TYPE" placeholder="质押合同类型"></yu-xform-item>
          <yu-xform-item label="担保币种" ctype="select" name="guarCurType" disabled data-code="STD_ZB_CUR_TYP" placeholder="担保币种"></yu-xform-item>
          <yu-xform-item label="是否将存量债务纳入担保范围：" ctype="select" name="isDebt" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否将存量债务纳入担保范围："></yu-xform-item>
          <yu-xform-item label="担保合同金额" ctype="input" placeholder="担保合同金额" name="guarAmt" rules="required"></yu-xform-item>
          <yu-xform-item label="担保起始日" ctype="datepicker" name="guarStartDate" value-format="yyyy-MM-dd" rules="required" placeholder="担保起始日"></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" disabled hidden></yu-xform-item>
          <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="guarContCnNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同流水号 " ctype="input" placeholder="担保合同流水号 " name="guarPkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="保证方式" ctype="input" placeholder="保证方式" name="assureWay" disabled hidden></yu-xform-item>
          <yu-xform-item label="保证形式 std_zb_assu" ctype="input" placeholder="保证形式 std_zb_assu" name="assureModal" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保到期日" ctype="datepicker" name="guarEndDate" value-format="yyyy-MM-dd" rules="required" placeholder="担保到期日"></yu-xform-item>
          <yu-xform-item label="是否在线抵押" ctype="input" placeholder="是否在线抵押" name="isOnlinePld" disabled hidden></yu-xform-item>
          <yu-xform-item label="贷款卡号" ctype="input" placeholder="贷款卡号" name="lnCardNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否合格担保 std_zb_ye" ctype="input" placeholder="是否合格担保 std_zb_ye" name="isQualifiedGuar" disabled hidden></yu-xform-item>
          <yu-xform-item label="期限类型 std_zb_term" ctype="input" placeholder="期限类型 std_zb_term" name="termType" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保期限" ctype="input" placeholder="担保期限" name="guarTerm" disabled hidden></yu-xform-item>
          <yu-xform-item label="签订日期" ctype="input" placeholder="签订日期" name="signDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="质押类型 std_zb_imn_" ctype="input" placeholder="质押类型 std_zb_imn_" name="imnType" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同状态" ctype="input" placeholder="担保合同状态" name="guarContState" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保双录编号" ctype="input" placeholder="担保双录编号" name="guarIserchNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" disabled hidden></yu-xform-item>
          <yu-xform-item label="争议借据方式选项" ctype="input" placeholder="争议借据方式选项" name="billDispupeOpt" disabled hidden></yu-xform-item>
          <yu-xform-item label="法院所在地" ctype="input" placeholder="法院所在地" name="courtAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="仲裁委员会地点" ctype="input" placeholder="仲裁委员会地点" name="arbitrateAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="其他约定" ctype="input" placeholder="其他约定" name="otherOpt"></yu-xform-item>
          <yu-xform-item label="仲裁机构" ctype="input" placeholder="仲裁机构" name="arbitrateBch" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同份数" ctype="input" placeholder="合同份数" name="contQnt" disabled hidden></yu-xform-item>
          <yu-xform-item label="甲方执合同份数" ctype="input" placeholder="甲方执合同份数" name="contQntOwner" disabled hidden></yu-xform-item>
          <yu-xform-item label="乙方执合同份数" ctype="input" placeholder="乙方执合同份数" name="contQntPartyB" disabled hidden></yu-xform-item>
          <yu-xform-item label="丙方执合同份数" ctype="input" placeholder="丙方执合同份数" name="contQntPartyC" disabled hidden></yu-xform-item>
          <yu-xform-item label="丁方执合同份数" ctype="input" placeholder="丁方执合同份数" name="contQntPartyD" disabled hidden></yu-xform-item>
          <yu-xform-item label="戊方执合同份数" ctype="input" placeholder="戊方执合同份数" name="contQntPartyE" disabled hidden></yu-xform-item>
          <yu-xform-item label="其他主合同" ctype="input" placeholder="其他主合同" name="otherMainCont" disabled hidden></yu-xform-item>
          <yu-xform-item label="确认最高债权额方式 std_zb" ctype="input" placeholder="确认最高债权额方式 std_zb" name="maxClaimTp" disabled hidden></yu-xform-item>
          <yu-xform-item label="最高债权额" ctype="input" placeholder="最高债权额" name="maxClaimAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="其他约定事项" ctype="input" placeholder="其他约定事项" name="otherAgreedEvent" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同打印次数" ctype="input" placeholder="合同打印次数" name="contPrintNum" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请类型 std_zb_grt_" ctype="input" placeholder="申请类型 std_zb_grt_" name="approveType" disabled hidden></yu-xform-item>
          <yu-xform-item label="注销日期" ctype="input" placeholder="注销日期" name="logoutDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">暂存</yu-button>
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('OnCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
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
      this.formdata.guarContNo = this.$xutils.getSEQWithParamFromServer('GRT_GUAR_SERNO');
      this.formdata.guarCurType = 'CNY';
      this.formdata.oprType = '01';
      this.formdata.guarContState = '100';

      this.formdata.guarPkId = this.$xutils.getUUID();
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>
