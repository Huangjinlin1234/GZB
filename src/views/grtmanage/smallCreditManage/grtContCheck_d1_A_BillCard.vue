<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主合同编号" ctype="input" placeholder="主合同编号" name="primaryContNo" disabled></yu-xform-item>
          <yu-xform-item label="担保合同类型" ctype="select" name="guarContType" disabled data-code="STD_ZB_GUAR_CONT_TYPE" placeholder="担保合同类型"></yu-xform-item>
          <yu-xform-item label="担保合同中文编号" ctype="input" placeholder="担保合同中文编号" name="guarContCnNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否追加担保" ctype="select" name="guarType" disabled data-code="STD_ZB_YES_NO" placeholder="是否追加担保"></yu-xform-item>
          <yu-xform-item label="担保人名称" ctype="input" placeholder="担保人名称" name="guarName" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同编号 " ctype="input" placeholder="担保合同编号 " name="guarContNo" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
          <yu-xform-item label="借款人客户编号" ctype="input" placeholder="借款人客户编号" name="cusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同流水号 " ctype="input" placeholder="担保合同流水号 " name="guarPkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否追加担保  std_zb_y" ctype="input" placeholder="是否追加担保  std_zb_y" name="isSuperaddGuar" disabled hidden></yu-xform-item>
          <yu-xform-item label="保证方式" ctype="input" placeholder="保证方式" name="assureWay" data-code="STD_GUARANTY_TYPE" disabled hidden></yu-xform-item>
          <yu-xform-item label="保证形式 std_zb_assu" ctype="input" placeholder="保证形式 std_zb_assu" name="assureModal" disabled hidden></yu-xform-item>
          <yu-xform-item label="纸质合同编号" ctype="input" placeholder="纸质合同编号" name="paperContNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否在线抵押" ctype="input" placeholder="是否在线抵押" name="isOnlinePld" disabled hidden></yu-xform-item>
          <yu-xform-item label="抵质押合同类型" ctype="input" placeholder="抵质押合同类型" name="pldContType" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否授信项下 std_zb_ye" ctype="input" placeholder="是否授信项下 std_zb_ye" name="isUnderLmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="抵押顺位" ctype="input" placeholder="抵押顺位" name="pldOrder" rules="required"></yu-xform-item>
          <yu-xform-item label="是否浮动抵押" ctype="select" name="isFloatPld" data-code="STD_ZB_YES_NO" placeholder="是否浮动抵押"></yu-xform-item>
          <yu-xform-item label="担保币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="担保币种"></yu-xform-item>
          <yu-xform-item label="借款人编号" ctype="input" placeholder="借款人编号" name="borrowerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="贷款卡号" ctype="input" placeholder="贷款卡号" name="lnCardNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否合格担保 std_zb_ye" ctype="input" placeholder="是否合格担保 std_zb_ye" name="isQualifiedGuar" disabled hidden></yu-xform-item>
          <yu-xform-item label="期限类型 std_zb_term" ctype="input" placeholder="期限类型 std_zb_term" name="termType" disabled hidden></yu-xform-item>
          <yu-xform-item label="签订日期" ctype="input" placeholder="签订日期" name="signDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="质押类型 std_zb_imn_" ctype="input" placeholder="质押类型 std_zb_imn_" name="imnType" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="input" placeholder="合同状态" name="guarContState" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保双录编号" ctype="input" placeholder="担保双录编号" name="guarIserchNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" disabled hidden></yu-xform-item>
          <yu-xform-item label="争议借据方式选项" ctype="input" placeholder="争议借据方式选项" name="billDispupeOpt" disabled hidden></yu-xform-item>
          <yu-xform-item label="法院所在地" ctype="input" placeholder="法院所在地" name="courtAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="仲裁委员会地点" ctype="input" placeholder="仲裁委员会地点" name="arbitrateAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="其他方式" ctype="input" placeholder="其他方式" name="otherOpt" disabled hidden></yu-xform-item>
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
          <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同金额" ctype="input" placeholder="担保合同金额" name="guarAmt" rules="required"></yu-xform-item>
          <yu-xform-item label="担保合同期限" ctype="input" placeholder="担保合同期限" name="guarTerm"></yu-xform-item>
          <yu-xform-item label="担保起始日期" ctype="datepicker" name="guarStartDate" value-format="yyyy-MM-dd" rules="required" placeholder="担保起始日期"></yu-xform-item>
          <yu-xform-item label="担保到期日期" ctype="datepicker" name="guarEndDate" value-format="yyyy-MM-dd" rules="required" placeholder="担保到期日期"></yu-xform-item>
          <yu-xform-item label="其他约定" ctype="input" placeholder="其他约定" name="otherAgreed"></yu-xform-item>
          <yu-xform-item label="业务条线" ctype="input" placeholder="业务条线" name="bizLine" data-code="STD_BIZ_LINE" disabled ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
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
      this.formdata.guarPkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.guarStartDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>