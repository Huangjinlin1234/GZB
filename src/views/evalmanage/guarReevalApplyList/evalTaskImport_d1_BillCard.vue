<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType=='details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="任务id" ctype="input" placeholder="任务id" name="taskId" hidden></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="input" placeholder="押品分类名称" name="guarTypeCdCnname" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保分类代码" ctype="input" placeholder="担保分类代码" name="guarTypeCd" disabled hidden></yu-xform-item>
          <yu-xform-item label="我行确认价值" ctype="input" placeholder="我行确认价值" name="evalValue"></yu-xform-item>
          <yu-xform-item label="确认价值币种" ctype="select" name="evalCurType" data-code="STD_ZB_CUR_TYP" placeholder="确认价值币种"></yu-xform-item>
          <yu-xform-item label="所有人编号" ctype="input" placeholder="所有人编号" name="guarCusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" name="guarCusName" disabled hidden></yu-xform-item>
          <yu-xform-item label="生成来源" ctype="input" placeholder="生成来源" name="sour"></yu-xform-item>
          <yu-xform-item label="管护人名称" ctype="input" placeholder="管护人名称" name="cusManagerName"></yu-xform-item>
          <yu-xform-item label="客户经理" ctype="input" placeholder="客户经理" name="cusManagerId"></yu-xform-item>
          <yu-xform-item label="管护人所属机构" ctype="input" placeholder="管护人所属机构" name="cusManagerOrgName"></yu-xform-item>
          <yu-xform-item label="客户经理机构" ctype="input" placeholder="客户经理机构" name="cusManagerOrg"></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" name="revalTaskStatus" data-code="STD_ZB_REVAL_TASK_STATUS" placeholder="任务状态"></yu-xform-item>
          <yu-xform-item label="生成时间" ctype="datepicker" name="createDate" value-format="yyyy-MM-dd" placeholder="生成时间"></yu-xform-item>
          <yu-xform-item label="分配人" ctype="input" placeholder="分配人" name="arrangeId"></yu-xform-item>
          <yu-xform-item label="分配机构" ctype="yu-xorg" name="arrangeOrg" placeholder="分配机构" @select-fn="commonSelectFn" :mapping="{ orgCode: 'arrangeOrg' }" width="80%" height="550"></yu-xform-item>
          <yu-xform-item label="预计完成时间" ctype="input" placeholder="预计完成时间" name="foreOverDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否估值完成" ctype="input" placeholder="是否估值完成" name="isEvalFinish" disabled hidden></yu-xform-item>
          <yu-xform-item label="重估我行确认价值" ctype="input" placeholder="重估我行确认价值" name="newEvelValue" disabled hidden></yu-xform-item>
          <yu-xform-item label="估值完成时间" ctype="input" placeholder="估值完成时间" name="finishDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="处理人" ctype="input" placeholder="处理人" name="dealUserId" disabled hidden></yu-xform-item>
          <yu-xform-item label="处理机构" ctype="input" placeholder="处理机构" name="dealOrg" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
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
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalbatchreevaltask/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalbatchreevaltask/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.taskId = ""; //this.$xutils.getDefaultformulaData("UUID");
      this.formdata.createDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      this.formdata.oprType = "01";
    }
  }
};
</script>
