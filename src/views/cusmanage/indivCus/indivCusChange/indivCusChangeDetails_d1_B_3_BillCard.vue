<template>
  <div id="d1_B_3_BillCard">
    <div id="d1_B_3_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="工作信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="雇佣状态" ctype="select" name="employeeStatus" rules="required" :options="dicOptions.employeeStatusOptions" placeholder="雇佣状态"></yu-xform-item>
            <yu-xform-item label="是否当前单位 std_zb_ye" ctype="input" placeholder="是否当前单位 std_zb_ye" name="isCurtUnit" hidden></yu-xform-item>
            <yu-xform-item label="职业 " ctype="select" name="occ" rules="required" data-code="STD_ZB_OCC" placeholder="职业 "></yu-xform-item>
            <yu-xform-item label="自由职业说明" ctype="input" placeholder="自由职业说明" name="occDesc"></yu-xform-item>
            <yu-xform-item label="营业执照号码" ctype="input" placeholder="营业执照号码" name="blicNo" rules="required"></yu-xform-item>
            <yu-xform-item label="经营状况" ctype="select" name="operStatus" rules="required" data-code="STD_OPER_STATUS" placeholder="经营状况"></yu-xform-item>
            <yu-xform-item label="所在部门" ctype="input" placeholder="所在部门" name="ubietyDept" hidden></yu-xform-item>
            <yu-xform-item label="经营企业名称/工作单位" ctype="input" placeholder="经营企业名称/工作单位" name="unitName" rules="required"></yu-xform-item>
            <yu-xform-item label="经营企业统一社会信用代码" ctype="input" placeholder="经营企业统一社会信用代码" name="unifyCreditCode" rules="required"></yu-xform-item>
            <yu-xform-item label="单位性质" ctype="select" name="indivComTyp" rules="required" data-code="STD_ZB_COM_TYP" placeholder="单位性质"></yu-xform-item>
            <yu-xform-item label="单位电话" ctype="input" placeholder="单位电话" name="unitPhn"></yu-xform-item>
            <yu-xform-item label="单位所属行业" ctype="yu-xtree-dic" name="indivComName" rules="required" placeholder="单位所属行业" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'indivComName', enName: 'indivComTrade' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="单位所属行业" ctype="input" placeholder="单位所属行业" name="indivComTrade" hidden></yu-xform-item>
            <yu-xform-item label="单位地址" ctype="input" placeholder="单位地址" name="unitAddr" rules="required"></yu-xform-item>
            <yu-xform-item label="职务" ctype="select" name="jobTtl" rules="required" data-code="STD_ZB_JOB_TTL" placeholder="职务"></yu-xform-item>
            <yu-xform-item label="职称" ctype="select" name="indivCrtfctn" rules="required" data-code="STD_ZB_TITLE" placeholder="职称"></yu-xform-item>
            <yu-xform-item label="年收入(元)" ctype="input" placeholder="年收入(元)" name="yScore" hidden></yu-xform-item>
            <yu-xform-item label="单位地址街道/路" ctype="input" placeholder="单位地址街道/路" name="unitStreet" hidden></yu-xform-item>
            <yu-xform-item label="单位邮政编码" ctype="input" placeholder="单位邮政编码" name="unitZipCode" hidden></yu-xform-item>
            <yu-xform-item label="单位传真" ctype="input" placeholder="单位传真" name="unitFax" hidden></yu-xform-item>
            <yu-xform-item label="单位联系人" ctype="input" placeholder="单位联系人" name="unitCntName" hidden></yu-xform-item>
            <yu-xform-item label="参加工作年份" ctype="" name="workDate" rules="required" placeholder="参加工作年份"></yu-xform-item>
            <yu-xform-item label="本单位参加工作日期" ctype="input" placeholder="本单位参加工作日期" name="unitDate" hidden></yu-xform-item>
            <yu-xform-item label="本单位工作结束日期" ctype="input" placeholder="本单位工作结束日期" name="unitEndDate" hidden></yu-xform-item>
            <yu-xform-item label="本行业参加工作日期 " ctype="input" placeholder="本行业参加工作日期 " name="tradeDate" hidden></yu-xform-item>
            <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" hidden></yu-xform-item>
            <yu-xform-item label="个人工作履历标识" ctype="input" placeholder="个人工作履历标识" name="prsnWorkId" hidden></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="收入币种" ctype="select" name="earningCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="收入币种"></yu-xform-item>
            <yu-xform-item label="家庭年收入(元)" ctype="" name="familyYScore" rules="required" placeholder="家庭年收入(元)"></yu-xform-item>
            <yu-xform-item label="个人年收入" ctype="" name="indivYearn" rules="required" placeholder="个人年收入"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建日期" ctype="input" placeholder="创建日期" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">暂存</yu-button>
      <yu-button type="primary" @click="customClick('commit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
import { validator } from "@/utils/validate";
export default {
  name: "d1_B_3_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCus + "/api/cusindivunit/update",
      addUrl: this.$backend.cmisCus + "/api/cusindivunit/",
      formdata: {},
      formType: "edit",
      dicOptions: { employeeStatusOptions: [{ key: "01", value: "受雇" }, { key: "02", value: "自雇" }, { key: "03", value: "挂靠" }, { key: "04", value: "自由职业" }] },
      formRules: { familyYScore: [{ validator: validator.number, message: "不是正确的数字", trigger: "blur" }], indivYearn: [{ validator: validator.number, message: "不是正确的数字", trigger: "blur" }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID");
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgId");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      this.formdata.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
    }
  }
};
</script>
