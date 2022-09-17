<template>
  <!--
    @created by dongan
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="任务池操作记录" class="adjust-height" show-search-input placeholder="关键字" @search="fuzzyQuery">
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="110px">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" name="serno" ctype="input"></yu-xform-item>
            <yu-xform-item label="业务环节" name="bizType" ctype="select" data-code=""></yu-xform-item>
            <yu-xform-item label="操作类型" name="optType" ctype="select" data-code=""></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" reserve-selection request-type="POST" :base-params="baseParams" selection-type="checkbox" @row-click="refTableSelect" row-key="taskNo" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="操作流水" prop="taskNo"></yu-xtable-column>
        <yu-xtable-column label="业务流水" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="optType" data-code=""></yu-xtable-column>
        <yu-xtable-column label="业务环节" prop="bizType" data-code=""></yu-xtable-column>
        <yu-xtable-column label="操作人"   prop="optUsrName"></yu-xtable-column>
        <yu-xtable-column label="操作机构" prop="optOrgName"></yu-xtable-column>
        <yu-xtable-column label="操作人"   prop="optUsr"></yu-xtable-column>
        <yu-xtable-column label="操作机构" prop="optOrg"></yu-xtable-column>
        <yu-xtable-column label="操作时间" prop="optTime"></yu-xtable-column>
        <yu-xtable-column label="操作原因" prop="optReason"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('STD_ZB_YES_NO,STD_TASK_TYPE,STD_BIZ_SUB_TYPE,STD_OPT_TYPE,STD_FILE_TASK_STATUS');
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: `${backend.cmisBiz}/api/taskpooloptrecord/`,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseParams: { }
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  methods: {
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refTable.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    },
    refTableSelect: function (row, event, column, index) {
      var _this = this;
      var _data = _this.$refs.refTable.selections;
      var len = _data.length;
      var arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(_data[i].itemId);
      }
      if (arr.indexOf(row.itemId) > -1) {
        _this.$refs.refTable.toggleRowSelection(row, false);
      } else {
        _this.$refs.refTable.toggleRowSelection(row, true);
      }
    }
  }
};
</script>
