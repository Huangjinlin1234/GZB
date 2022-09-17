<template>
  <div>
    <div id="d1_A_BillCard">
      <div id="d1_A_BillCardContent">
        <yu-xform ref="refForm" label-width="140px" disabled v-model="formdata" :rules="formRules">
          <yu-xform-group :column="3">
            <yu-xform-item label="外部评估机构" ctype="input" placeholder="外部评估机构" name="outOrgRegCode" rules="required"></yu-xform-item>
            <yu-xform-item label="外部评估机构" ctype="input" placeholder="外部评估机构" name="evalOutOrgName" rules="required"></yu-xform-item>
            <!--            <yu-xform-item label="统计流水号" ctype="input" placeholder="统计流水号" name="totalSeno" hidden></yu-xform-item>-->
            <!--            <yu-xform-item label="任务发起行" ctype="input" placeholder="任务发起行" name="evalTaskStartOrgName" rules="required"></yu-xform-item>-->
            <!--            <yu-xform-item label="外部评估机构组织机构码" ctype="input" placeholder="外部评估机构组织机构码" name="outOrgRegCode" hidden></yu-xform-item>-->
            <!--            <yu-xform-item label="任务发起行" ctype="input" placeholder="任务发起行" name="evalTaskStartOrg" hidden></yu-xform-item>-->
            <yu-xform-item label="总评分" ctype="yu-num" name="avgScore" rules="required" placeholder="总评分" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="最终评分" ctype="yu-num" name="finalScore" rules="required" placeholder="最终评分" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="已完成评分押品总数" ctype="yu-num" name="needEvalGuarTotalNum" rules="required" placeholder="已完成评分押品总数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="需评分押品剩余数" ctype="yu-num" name="needEvalGuarSurplusNum" rules="required" placeholder="需评分押品剩余数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="任务发起日期" ctype="input" placeholder="任务发起日期" name="taskStartDate" rules="required"></yu-xform-item>
            <yu-xform-item label="任务结束日期" ctype="input" placeholder="任务结束日期" name="tastEndDate" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
    </div>
    <div style="height:calc(100% - 35%)">
      <yu-panel title="评价任务明细" panel-type="simple">
        <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true">
          <yu-xtable-column  label="评价任务id" prop="evalTaskId" min-width="100px"></yu-xtable-column>
          <yu-xtable-column  label="押品统一编号 " prop="guarNo" min-width="120px"></yu-xtable-column>
          <yu-xtable-column  label="押品分类代码" prop="guarClassCode" min-width="120px"></yu-xtable-column>
          <yu-xtable-column  label="押品分类名称" prop="guarClassName" min-width="120px"></yu-xtable-column>
          <yu-xtable-column  label="经办人名称" prop="evalTaskStartName" min-width="100px"></yu-xtable-column>
          <yu-xtable-column  label="任务发起日期" prop="taskStartDate" min-width="120px"></yu-xtable-column>
          <yu-xtable-column  label="经办机构" prop="evalTaskStartOrgName" width="100"></yu-xtable-column>
          <yu-xtable-column  label="评分" prop="evalScore"></yu-xtable-column>
          <yu-xtable-column  label="评价状态" prop="evalStatus" data-code="STD_ZB_EVAL_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
yufp.lookup.reg("STD_ZB_EVAL_STATUS");

export default {
  components: {},
  mixins: [mixinUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      formdata: {},
      formType: "edit",
      formRules: {},
      pkField: "rid",
      dialogTitle: "新增",
      dialogVisible: false,
      dataUrl: this.$backend.cmisEval + "/api/guarevaloutorgscore/",
      baseParams: { condition: { outOrgRegCode: this.pageParams.outOrgRegCode, evalStatus: "02" } },
      deleteUrl: this.$backend.cmisEval + "/api/guarevaloutorgscore/delete/"
    };
  },
  mounted() {
    const _this = this;
    _this.$xutils.clone(_this.pageParams, _this.formdata);
  },
  methods: {}
};
</script>
