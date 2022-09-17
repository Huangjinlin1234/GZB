<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-panel ref="simplePanel2" title="操作记录" panel-type="simple">
      <yu-xtable ref="refTable" request-type="POST" :base-params="baseParams" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="操作流水号" prop="pkId"></yu-xtable-column>
        <yu-xtable-column label="档案编号" prop="fileNo"></yu-xtable-column>
        <yu-xtable-column label="操作人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="操作机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="操作时间" prop="optTime"></yu-xtable-column>
        <yu-xtable-column label="操作类型  " prop="fileOptType" data-code="STD_FILE_OPT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="原因说明" prop="optReason"></yu-xtable-column>
        <yu-xtable-column label="接收人" prop="optUsrName"></yu-xtable-column>
        <yu-xtable-column label="接收机构" prop="optOrgName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_FILE_OPT_TYPE');
export default {
  data: function () {
    return {
      dataUrl: `${backend.cmisBiz}/api/centralfileoptrecord/query`,
      taskStatus: '',
      viewType: '',
      baseParams: {}
    };
  },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  created () {
    this.baseParams = { condition: {fileNo: this.pageParams.fileNo}, sort: 'opt_time desc' };
  },
  methods: {
  }
};
</script>
<style>
.yu-base-panel-content {
  padding-bottom: 0px !important;
}
</style>
