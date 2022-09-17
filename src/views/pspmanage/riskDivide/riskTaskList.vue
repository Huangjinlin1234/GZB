/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-风险分类任务选取
 */
<template>
  <div class="risk-task-list">
    <yu-panel :collapse-hide="false">
      <yu-panel ref="panel"  title="输入查询条件"  class="adjust-height" :collapse-hide="false">
              <yu-xform ref="searchForm" related-table-name="riskTaskTable" v-model="searchFormdata" >
                <yu-xform-group>
                  <yu-xform-item  name="cusId" :colspan="8" label="客户编号" label-width="160px"></yu-xform-item>
                  <yu-xform-item  name="cusName" :colspan="8" label-width="120px" label="客户名称"></yu-xform-item>
                  <yu-xform-item  name="checkType" :colspan="8" label="分类模型" label-width="120px" ctype="select" data-code="STD_RISK_CHECK_TYPE"></yu-xform-item>
                </yu-xform-group>
                <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn()" >查询</yu-button>
                    <yu-button type="primary" @click="resetFn()">重置</yu-button>
                </div>
              </yu-xform>
          </yu-panel>
      <yu-panel ref="panel" title="风险分类任务列表" color="red" class="adjust-height" :collapse-hide="false">
        <!--任务主表显示列表-->
          <yu-xtable ref="riskTaskTable"  row-number :data-url="listUrl" requestType="POST" :base-params="searchData" selection-type="radio" condition-key="condition">
            <yu-xtable-column label="任务编号" prop="taskNo" ></yu-xtable-column>
            <yu-xtable-column label="任务类型" prop="taskType" data-code="STD_RISK_TASK_TYPE"></yu-xtable-column>
            <yu-xtable-column label="分类模型" prop="checkType" data-code="STD_RISK_CHECK_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusCatalog" data-code="STD_RISK_CUS_CATALOG"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
            <yu-xtable-column label="手工分类" prop="manualClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
            <yu-xtable-column label="机评分类" prop="autoClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
            <yu-xtable-column label="任务生成日期" prop="taskStartDt" ></yu-xtable-column>
            <yu-xtable-column label="要求完成日期" prop="taskEndDt" ></yu-xtable-column>
            <yu-xtable-column label="任务执行人" prop="execId" ></yu-xtable-column>
            <yu-xtable-column label="任务执行机构" prop="execBrId" ></yu-xtable-column>
            <yu-xtable-column label="任务状态" prop="checkStatus" data-code="STD_RISK_CHECK_STATUS"> </yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        <div style="text-align:center;">
        <yu-toolBar>
          <yu-button type="primary" @click="confirmFn">确认</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import { mapGetters } from 'vuex';
lookup.reg('STD_RISK_TASK_TYPE,STD_RISK_CHECK_TYPE,STD_RISK_CUS_CATALOG,STD_FIVE_CLASS,STD_RISK_CHECK_STATUS,STD_ZB_APPR_STATUS');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      activeName: 'todo',
      applyFormdata: {},
      tableTitle: '分类任务列表',
      listUrl: this.$backend.cmisPsp + '/api/risktasklist/queryList',
      preformdata: {},
      viewType: 'DETAIL',
      dialogVisible: false,
      viewButtonHidden: true,
      searchData: {
        condition: {
          // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          // taskType: '3',
          approveStatus: '997'
        }
      }
    };
  },
  methods: {
    confirmFn: function () {
      let selections = this.$refs.riskTaskTable.selections;
      if (selections.length != 1) {
        return this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
      var _this = this;
      _this.$route.params.selectedTask = selections[0];
      this.$xutils.getParentPage(
        this
      );
      _this.$dialog.close(this.dialogId);
      // this.$parent.applyData.selectedTask = selections[0];
    },
    // 条件查询
    searchFn: function () {
      this.$refs.riskTaskTable.remoteData({
        condition: JSON.stringify(this.searchFormdata)
      });
    },
    // 重置
    resetFn: function () {
      // 清空条件
      this.$refs.searchForm.resetFields();
    },
    // 返回
    returnFn: function () {
      this.$dialog.close(this.dialogId);
    }

  }
};
</script>
<style scoped>
.risk-task-list {
  height: 100%;
}
</style>
