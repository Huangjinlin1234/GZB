<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息录入" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="组织机构代码" ctype="yu-xoutorg-mrg" name="regCodeShow" rules="required" placeholder="组织机构代码" @select-fn="commonSelectFn" :mapping="{ admitBranchName: 'admitBranchName', outOrgCode: 'outOrgCode', evalOrgPldArea: 'evalOrgPldArea', outOrgEvalType: 'outOrgEvalType', regAmtw: 'regAmtw', outOrgRegCode: 'outOrgRegCode', outOrgOutBlacklistResn: 'outOrgOutBlacklistResn', outOrgRegAddr: 'outOrgRegAddr', evalOutOrgName: 'evalOutOrgName', outOtherAptiLevel: 'outOtherAptiLevel', outLandAptiLevel: 'outLandAptiLevel', outOrgAdmitStatus: 'outOrgAdmitStatus', outRealproAptiLevel: 'outRealproAptiLevel', outOrgManaStartDate: 'outOrgManaStartDate', outOrgLinkTelNo: 'outOrgLinkTelNo', outOrgAdmitOrdId: 'outOrgAdmitOrdId', outOrgLinkName: 'outOrgLinkName', outOrgInBlacklistResn: 'outOrgInBlacklistResn', outOrgStatusDesc: 'outOrgStatusDesc', aptiIndate: 'aptiIndate', aptiEnddate: 'aptiEnddate', outOrgLinkPhone: 'outOrgLinkPhone', serno: 'serno', outAssetAptiLevel: 'outAssetAptiLevel', evalOrgStaffQnt: 'evalOrgStaffQnt', outOrgOutBlacklistDate: 'outOrgOutBlacklistDate', curtStartDate: 'curtStartDate', oprType: 'oprType', outOrgInBlacklistDate: 'outOrgInBlacklistDate', curtEndDate: 'curtEndDate', evalFeePayWay: 'evalFeePayWay' }" width="680" height="680" :parms="{ outOrgAdmitStatus: '\'01\'' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="组织机构代码" ctype="input" placeholder="组织机构代码" name="outOrgCode" rules="required"></yu-xform-item>
            <yu-xform-item label="营业执照注册号" ctype="input" placeholder="营业执照注册号" name="outOrgRegCode" rules="required"></yu-xform-item>
            <yu-xform-item label="评估机构名称" ctype="input" placeholder="评估机构名称" name="evalOutOrgName" rules="required"></yu-xform-item>
            <yu-xform-item label="评估资质类型" ctype="select" name="outOrgEvalType" hidden multiple value-type="string" separator=";" data-code="OUT_ORG_ASS_TYPE" placeholder="评估资质类型"></yu-xform-item>
            <yu-xform-item label="注册资本（万元）" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="regAmtw" rules="required" placeholder="注册资本（万元）" :min="0"></yu-xform-item>
            <yu-xform-item label="评估机构员工数" ctype="yu-num" name="evalOrgStaffQnt" rules="required" placeholder="评估机构员工数" :precision="0" :min="1"></yu-xform-item>
            <yu-xform-item label="评估机构注册地址" ctype="textarea" name="outOrgRegAddr" rules="required" placeholder="评估机构注册地址" :colspan="16"></yu-xform-item>
            <yu-xform-item label="联系人名称" ctype="input" placeholder="联系人名称" name="outOrgLinkName" rules="required"></yu-xform-item>
            <yu-xform-item label="联系人移动电话" ctype="input" placeholder="联系人移动电话" name="outOrgLinkPhone" rules="required"></yu-xform-item>
            <yu-xform-item label="外部评估机构房地产资质等级" ctype="input" placeholder="外部评估机构房地产资质等级" name="outRealproAptiLevel" disabled hidden></yu-xform-item>
            <yu-xform-item label="外部评估机构土地资质等级" ctype="input" placeholder="外部评估机构土地资质等级" name="outLandAptiLevel" disabled hidden></yu-xform-item>
            <yu-xform-item label="联系人固定电话" ctype="input" placeholder="联系人固定电话" name="outOrgLinkTelNo" rules="required"></yu-xform-item>
            <yu-xform-item label="评估机构对应业务区域" ctype="select" name="evalOrgPldArea" rules="required" data-code="STD_ZB_PLD_AREA" placeholder="评估机构对应业务区域"></yu-xform-item>
            <yu-xform-item label="外部评估机构资产资质等级" ctype="input" placeholder="外部评估机构资产资质等级" name="outAssetAptiLevel" disabled hidden></yu-xform-item>
            <yu-xform-item label="准入机构" ctype="yu-xorg" name="admitBranchName" rules="required" placeholder="准入机构" @select-fn="commonSelectFn" :mapping="{ orgName: 'admitBranchName', orgCode: 'outOrgAdmitOrdId' }" width="80%" height="550"></yu-xform-item>
            <yu-xform-item label="准入机构" ctype="input" placeholder="准入机构" name="outOrgAdmitOrdId" disabled hidden></yu-xform-item>
            <yu-xform-item label="外部评估机构资质其他等级" ctype="input" placeholder="外部评估机构资质其他等级" name="outOtherAptiLevel" disabled hidden></yu-xform-item>
            <yu-xform-item label="准入状态" ctype="select" name="outOrgAdmitStatus" rules="required" data-code="STD_ZB_ADMIT_STATE" placeholder="准入状态"></yu-xform-item>
            <yu-xform-item label="外部评估机构状态退出原因" ctype="textarea" name="outOrgStatusDesc" placeholder="外部评估机构状态退出原因" :colspan="24"></yu-xform-item>
            <yu-xform-item label="外部评估机构纳入黑名单原因" ctype="textarea" name="outOrgInBlacklistResn" placeholder="外部评估机构纳入黑名单原因" :colspan="24"></yu-xform-item>
            <yu-xform-item label="本次合作起始日期" ctype="datepicker" name="curtStartDate" value-format="yyyy-MM-dd" rules="required" placeholder="本次合作起始日期"></yu-xform-item>
            <yu-xform-item label="本次合作到期日期" ctype="datepicker" name="curtEndDate" value-format="yyyy-MM-dd" rules="required" placeholder="本次合作到期日期"></yu-xform-item>
            <yu-xform-item label="评估资质有效起始日" ctype="datepicker" name="aptiIndate" value-format="yyyy-MM-dd" rules="required" placeholder="评估资质有效起始日"></yu-xform-item>
            <yu-xform-item label="评估资质有效到期日" ctype="datepicker" name="aptiEnddate" value-format="yyyy-MM-dd" rules="required" placeholder="评估资质有效到期日"></yu-xform-item>
            <yu-xform-item label="评估机构经营期限起始日期" ctype="datepicker" name="outOrgManaStartDate" value-format="yyyy-MM-dd" rules="required" placeholder="评估机构经营期限起始日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled></yu-xform-item>
            <yu-xform-item label="外部评估机构纳入黑名单日期" ctype="input" placeholder="外部评估机构纳入黑名单日期" name="outOrgInBlacklistDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="外部评估机构解除黑名单原因" ctype="input" placeholder="外部评估机构解除黑名单原因" name="outOrgOutBlacklistResn" disabled hidden></yu-xform-item>
            <yu-xform-item label="外部评估机构解除黑名单日期" ctype="input" placeholder="外部评估机构解除黑名单日期" name="outOrgOutBlacklistDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="评估费用支付方式" ctype="input" placeholder="评估费用支付方式" name="evalFeePayWay" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSave()" v-norepeat.loading>保存</yu-button>
      <yu-button type="primary" @click="onClose()">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
import { validator } from "@/utils/validate";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  inject: ["onSave", "onClose"],
  data: function() {
    let _this = this;
    return {
      updateUrl: _this.$backend.cmisEval + "/api/guarevaloutorgauapp/update",
      addUrl: _this.$backend.cmisEval + "/api/guarevaloutorgauapp/",
      formdata: {},
      formType: "edit",
      formRules: { outOrgLinkPhone: [{ validator: validator.mobile, message: "不是正确的手机号", trigger: "blur" }], outOrgLinkTelNo: [{ validator: validator.telephone, message: "不是正确的固定电话和小灵通", trigger: "blur" }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      let _this = this;
      let userInfo = _this.$store.state.oauth;
      _this.formdata.serno = userInfo.CUS_BLK_SERNO;
      _this.formdata.inputName = userInfo.updId;
      _this.formdata.inputId = userInfo.userCode;
      _this.formdata.inputBrIdName = userInfo.inputName;
      _this.formdata.inputBrId = userInfo.org.code;
      _this.formdata.updName = userInfo.updName;
      _this.formdata.updId = userInfo.updId;
      _this.formdata.updDate = _this.$xutils.formatDate(new Date());
      _this.formdata.oprType = "01";
      _this.formdata.inputDate = _this.$xutils.formatDate(new Date());
      _this.formdata.updBrId = userInfo.updBrId;
    }
  }
};
</script>
