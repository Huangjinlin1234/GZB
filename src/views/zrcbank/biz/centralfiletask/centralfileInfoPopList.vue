<template>
  <!--
    @created by creazyCder 2021-07-07 19:31:02
    @updated by 2021-07-07 19:31:02
    @updated by 2021-07-07 19:31:02
    @description 集中作业档案台账-POP列表
  -->
  <div>
    <yu-panel title="集中作业档案台账列表" panel-type="simple">
      <yu-xform related-table-name="refTablePop" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
         <!-- <yu-xform-item placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="全局流水号" name="traceId" ctype="input"></yu-xform-item>-->
          <yu-xform-item placeholder="资料类型" name="bizType" data-code="STD_BIZ_SUB_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input" fuzzyQuery="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTablePop" selection-type="radio" :baseParams="baseParams" condition-key="condition" row-number request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="档案编号" prop="fileNo"></yu-xtable-column>
        <yu-xtable-column label="临时库位号" prop="tempLocationNo"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="全局流水号" prop="traceId"></yu-xtable-column>
        <yu-xtable-column label="资料类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="接收人" prop="receiverIdName"></yu-xtable-column>
        <yu-xtable-column label="接收机构" prop="receiverOrgName"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_FILE_ACC_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="selectFn">选取</yu-button>
      <yu-button @click="onCancel">取消</yu-button>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_FILE_TASK_TYPE,STD_BIZ_SUB_TYPE,STD_OPT_TYPE,STD_FILE_ACC_STATUS');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/centralfileinfo/query',
      updateUrl: this.$backend.cmisBiz + '/api/centralfileinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/centralfileinfo/',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/centralfileinfo/batchdelete/',
      baseParams: {}
    };
  },
  created () {
    if (this.pageParams) {
      var modal = {};
      yufp.clone(this.pageParams, modal);
      //modal.accStatus = '01';
      this.baseParams = {
        condition: JSON.stringify(modal)
      };
    }
  },
  methods: {
    selectFn () {
      var _this = this;
      var selections = _this.$refs.refTablePop.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.$dialog.close(this.dialogId, yufp.clone(selections[0], {}));
    },
    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
