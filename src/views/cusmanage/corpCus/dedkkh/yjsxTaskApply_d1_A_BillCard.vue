<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" ctype="input" placeholder="任务编号" name="taskNo" disabled></yu-xform-item>
            <yu-xform-item label="任务生成日期" ctype="input" placeholder="任务生成日期" name="taskCreateDate" disabled></yu-xform-item>
            <yu-xform-item label="任务到期日期" ctype="input" placeholder="任务到期日期" name="taskEndDate" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="压降事项">
          <yu-xform-group :column="2">
            <yu-xform-item label="压降事项" ctype="input" placeholder="压降事项" name="pressureDropItem" rules="required" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="计划压降金额（万元）" ctype="input" placeholder="计划压降金额（万元）" name="planPdoAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="压降计划完成时间" ctype="input" placeholder="压降计划完成时间" name="planPdoFinishTime" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="实际压降金额（万元）" ctype="input" placeholder="实际压降金额（万元）" name="actPdoAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="压降实际完成时间" ctype="input" placeholder="压降实际完成时间" name="actPdoFinishDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="压降落实情况说明" ctype="input" placeholder="压降落实情况说明" name="pdoActCaseMemo" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="任务终止">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务终止说明" ctype="textarea" rules="required" placeholder="任务终止说明" name="taskEndMemo" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstdedkkhyjsxtask/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstdedkkhyjsxtask/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>