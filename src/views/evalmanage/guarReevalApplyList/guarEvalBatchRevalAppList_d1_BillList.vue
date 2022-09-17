<template>
  <div>
    <yu-panel title="批量重估申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="queryData">
        <yu-xform-group :column="4">
          <yu-xform-item label="批量申请流水号" ctype="input" placeholder="批量申请流水号" name="batchSerno"></yu-xform-item>
          <yu-xform-item label="流程审批状态" ctype="select" data-code="STD_ZB_APP_ST" placeholder="流程审批状态" name="approveStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_addTask" @click="addTask">新增任务</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
          <yu-button ref="btn_submit" @click="submit">提交</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column  label="批量申请流水号" prop="batchSerno" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="经办人名称" prop="inputName"></yu-xtable-column>
        <yu-xtable-column  label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column  label="经办机构" prop="inputBrName"></yu-xtable-column>
        <yu-xtable-column  label="流程审批状态" prop="approveStatus" data-code="STD_ZB_APP_ST" min-width="120px"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillList",
  mixins: [mixinUtils],
  inject: ["addTask", "doView", "submit"],
  data: function() {
    return {
      pkField: "batchSerno",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalapp/",
      baseParams: {},
      searchFormdata: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalapp/delete/"
    };
  },
  methods: {
    queryData() {
      const _this = this;
      _this.$refs.refTable.remoteData({
        condition: Object.assign({ ..._this.searchFormdata }, _this.baseParams),
        sort: "batch_serno desc"
      });
    }
  }
};
</script>
