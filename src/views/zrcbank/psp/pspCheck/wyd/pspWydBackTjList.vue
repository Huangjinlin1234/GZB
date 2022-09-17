
<template>
  <div>
    <yu-panel title="微业贷退回统计列表" panel-type="simple">
      <yu-xform ref="refForm" label-width="120px" v-model="formData" :form-type="formType">
        <yu-xtable ref="refTable" selection-type="radio" :data-url="dataUrl"  :default-load="true" :pageable="false">
          <yu-xtable-column label="支行名称" prop="relBrIdName"></yu-xtable-column>
          <yu-xtable-column label="退回总计数量" prop="backNum"></yu-xtable-column>
          <yu-xtable-column label="退回原因1的数量" prop="backOneNum"></yu-xtable-column>
          <yu-xtable-column label="退回原因2的数量" prop="backTwoNum"></yu-xtable-column>
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
      dataUrl: this.$backend.cmisPsp + '/api/pspwydtaskback/pspWydBackTjList'
    };
  }

};
</script>