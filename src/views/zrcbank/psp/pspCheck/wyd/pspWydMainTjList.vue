
<template>
  <div>
    <yu-panel title="微业贷正常统计列表" :hideFilter="false" :collapseHide="false" >
      <yu-xform ref="refForm" label-width="120px" v-model="formData" :form-type="formType">
        <yu-xtable ref="refTable" selection-type="radio" :data-url="dataUrl"  :default-load="true" :pageable="false">
          <yu-xtable-column label="支行名称" prop="relBrIdName"></yu-xtable-column>
          <yu-xtable-column label="累计分配数量（退回的剔除）" prop="distributeNum"></yu-xtable-column>
          <yu-xtable-column label="累计完成数量（过程营销平台操作完成）" prop="completeNum"></yu-xtable-column>
          <yu-xtable-column label="未完成贷后任务数量" prop="incompleteNum"></yu-xtable-column>
          <yu-xtable-column label="正常时间处理贷后数量" prop="normalNum"></yu-xtable-column>
          <yu-xtable-column label="逾期时间处理贷后数量" prop="abnormalNum"></yu-xtable-column>
        </yu-xtable>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>

export default {

  data: function () {
    return {
      formData: {},
      tableData: [],
      dataUrl: this.$backend.cmisPsp + '/api/pspwydtasklist/pspWydTackTjList'
    };
  }

};
</script>