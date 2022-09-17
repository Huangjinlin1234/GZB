<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" :colspan="8" name="serno" disabled></yu-xform-item>

          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" :colspan="6" name="guarNo" disabled></yu-xform-item>
          <yu-button :colspan="2" size="small" @click="viewGuar">查看</yu-button>

          <yu-xform-item label="评估方式" ctype="select" name="evalWay" rules="required" :colspan="8" data-code="STD_ZB_EVAL_INOUT_TYPE" placeholder="评估方式"></yu-xform-item>
          <yu-xform-item label="经办人名称" ctype="input" placeholder="经办人名称" :colspan="8" name="inputIdName" disabled></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="input" name="inputDate" :colspan="8" disabled placeholder="经办日期"></yu-xform-item>
          <!-- <yu-xform-item label="经办日期" ctype="datepicker" name="inputDate" :colspan="8" value-format="yyyy-MM-dd" disabled placeholder="经办日期"></yu-xform-item> -->
          <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" :colspan="8" name="guarCusName" disabled></yu-xform-item>
          <yu-xform-item label="所有人编号" ctype="input" placeholder="所有人编号" :colspan="8" name="guarCusId" disabled></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" :colspan="8" name="inputBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="经办人编码" ctype="input" placeholder="经办人编码" :colspan="8" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" :colspan="8" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="wfApprStatus" :colspan="8" disabled hidden data-code="STD_ZB_APP_ST" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" :colspan="8" disabled hidden data-code="STD_ZB_APP_ST" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="重估类型" ctype="input" placeholder="重估类型" :colspan="8" name="reevalType" disabled hidden></yu-xform-item>
          <yu-xform-item label="发起岗确认价值" ctype="input" placeholder="发起岗确认价值" :colspan="8" name="evalValue" disabled hidden></yu-xform-item>
          <yu-xform-item label="价值确认日期" ctype="input" placeholder="价值确认日期" :colspan="8" name="evalDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="认定岗确认价值" ctype="input" placeholder="认定岗确认价值" :colspan="8" name="finalEvalValue" disabled hidden></yu-xform-item>
          <yu-xform-item label="确认价值币种" ctype="input" placeholder="确认价值币种" :colspan="8" name="evalCurType" disabled hidden></yu-xform-item>
          <yu-xform-item label="折算人民币价值" ctype="input" placeholder="折算人民币价值" :colspan="8" name="evalValueCny" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否延期" ctype="input" placeholder="是否延期" :colspan="8" name="isStartReeval" disabled hidden></yu-xform-item>
          <yu-xform-item label="延期重估原因" ctype="input" placeholder="延期重估原因" :colspan="8" name="delayReevalResn" disabled hidden></yu-xform-item>
          <yu-xform-item label="延期到期日" ctype="input" placeholder="延期到期日" :colspan="8" name="delayReevalDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否特殊流程审批" ctype="input" placeholder="是否特殊流程审批" :colspan="8" name="isSpecial" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否超阈值" ctype="input" placeholder="是否超阈值" :colspan="8" name="beyond" disabled hidden></yu-xform-item>
          <yu-xform-item label="价值重估岗认定价值" ctype="input" placeholder="价值重估岗认定价值" :colspan="8" name="assertValue" disabled hidden></yu-xform-item>
          <yu-xform-item label="浮动比例/差额比率" ctype="input" placeholder="浮动比例/差额比率" :colspan="8" name="rate" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品重复抵押类型" ctype="input" placeholder="押品重复抵押类型" :colspan="8" name="agaginType" disabled hidden></yu-xform-item>
          <yu-xform-item label="评估方法" ctype="input" placeholder="评估方法" :colspan="8" name="evalMethod" disabled hidden></yu-xform-item>
          <yu-xform-item label="评估类型" ctype="input" placeholder="评估类型" :colspan="8" name="evalType" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" :colspan="8" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" :colspan="8" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" :colspan="8" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" :colspan="8" name="updDate" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  watch: {
    "formdata.evalWay": function(newVal) {
      this.getFactory().triggerAction({
        evalWay: newVal
      });
    }
  },
  inject: ["viewGuar"],
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/",
      getUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/listQuery",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    /***
     * 模板工厂暂存数据
     */
    saveStagFactoryData() {
      return {
        formdata: yufp.clone(this.formdata, {})
      };
    },
    execBillCardDefaultValueFormula: function() {
      this.formdata.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      this.formdata.inputBrName = this.$xutils.getLoginUserInfo().org.name;
      this.formdata.approveStatus = "000";
    }
  }
};
</script>
