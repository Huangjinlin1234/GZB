<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="分配规则">
          <yu-xform-group :column="3">
            <yu-xform-item label="规则方案编号" ctype="input" placeholder="规则方案编号" name="taskpoolRuleId" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="分配方式" ctype="select" name="allotWay" rules="required" data-code="STD_ZB_TP_ALLOT_WAY" placeholder="分配方式" :colspan="10"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="分配规则配置">
          <yu-xform-group :column="3">
            <yu-xform-item label="系统分配起始时间" ctype="datepicker" name="syatemAllotStartTime" value-format="yyyy-MM-dd" rules="required" placeholder="系统分配起始时间" :colspan="10"></yu-xform-item>
            <yu-xform-item label="系统分配终止时间" ctype="datepicker" name="syatemAllotEndTime" value-format="yyyy-MM-dd" rules="required" placeholder="系统分配终止时间" :colspan="10"></yu-xform-item>
            <yu-xform-item label="管理员分配起始时间" ctype="datepicker" name="manaAllotStartTime" value-format="yyyy-MM-dd" rules="required" placeholder="管理员分配起始时间" :colspan="10"></yu-xform-item>
            <yu-xform-item label="管理员分配终止时间" ctype="datepicker" name="manaAllotEndTime" value-format="yyyy-MM-dd" rules="required" placeholder="管理员分配终止时间" :colspan="10"></yu-xform-item>
            <yu-xform-item label="关联岗位" ctype="yu-xtaskpool-rule" name="correDutyName" rules="required" placeholder="关联岗位" :colspan="10" @select-fn="commonSelectFn" :mapping="{ dutyId: 'correDuty', dutyName: 'correDutyName' }" width="800" height="480" :parms="{ dutySts: 'a' }"></yu-xform-item>
            <yu-xform-item label="关联岗位" ctype="input" placeholder="关联岗位" name="correDuty" rules="required" hidden :colspan="10"></yu-xform-item>
            <yu-xform-item label="分配方法" ctype="radio" name="allotMode" rules="required" data-code="STD_ZB_TP_ALLOT_MODE" placeholder="分配方法" :colspan="10"></yu-xform-item>
            <yu-xform-item label="是否启用" ctype="radio" name="isBegin" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否启用" :colspan="10"></yu-xform-item>
            <yu-xform-item label="有权人分配所属机构" ctype="input" placeholder="有权人分配所属机构" name="allotPrivOrg" rules="required" disabled hidden :colspan="10"></yu-xform-item>
            <yu-xform-item label="有权人所属机构" ctype="yu-xtaskpool-org" name="allotPrivOrgName" placeholder="有权人所属机构" :colspan="10" @select-fn="commonSelectFn" :mapping="{ orgName: 'allotPrivOrgName', orgId: 'allotPrivOrg' }" width="800" height="480" :parms="{ orgSts: 'a' }"></yu-xform-item>
            <yu-xform-item label="有权人所属岗位" ctype="yu-xtaskpool-post" name="allotPrivDutyName" placeholder="有权人所属岗位" :colspan="10" @select-fn="commonSelectFn" :mapping="{ dutyId: 'allotPrivDuty', dutyName: 'allotPrivDutyName' }" width="800" height="480" :parms="{ belongOrgId: '${allotPrivOrg}' }"></yu-xform-item>
            <yu-xform-item label="有权人分配所属岗位" ctype="input" placeholder="有权人分配所属岗位" name="allotPrivDuty" disabled hidden :colspan="10"></yu-xform-item>
            <yu-xform-item label="有权人分配" ctype="yu-xtaskpool-person" name="allotPrivName" placeholder="有权人分配" :colspan="10" @select-fn="commonSelectFn" :mapping="{ userName: 'allotPrivName', userId: 'allotPriv' }" width="800" height="480" :parms="{ dutyId: '${allotPrivDuty}' }" :selectionType="checkbox"></yu-xform-item>
            <yu-xform-item label="有权人分配" ctype="input" placeholder="有权人分配" name="allotPriv" disabled hidden :colspan="10"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updName" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="select" name="oprType" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型  std_zb_opr"></yu-xform-item>
            <yu-xform-item label="分配时间间隔（分钟）" ctype="yu-num" name="allotTimeInterval" hidden placeholder="分配时间间隔（分钟）" :precision="0" :min="0" :max="999"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onClose')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";

export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgtaskpoolrule/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgtaskpoolrule/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.taskpoolRuleId = this.$xutils.getDefaultformulaData("SEQ:RULE_TASK_POOL");
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName");
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData("$LoginOrgName");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updName = this.$xutils.getDefaultformulaData("$LoginOrgName");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    }
  }
};
</script>
