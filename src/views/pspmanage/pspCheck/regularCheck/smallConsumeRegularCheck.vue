/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-定期检查-小微消费性定期检查
 */
<template>
  <div class="psp-task-list">
    <yu-panel :collapse-hide="false">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="待检查任务" name="todo"></yu-tab-pane>
        <yu-tab-pane label="历史检查任务" name="history"></yu-tab-pane>
      </yu-tabs>
      <yu-panel title="查询条件" :hideFilter="false" class="adjust-height" :collapseHide="false">
        <yu-xform related-table-name="pspTaskTable" form-type="search"  ref="searchForm" v-model="searchFormdata">
          <yu-xform-group :column="3">
            <yu-xform-item  name="cusId"   label="客户编号" label-width="120px"></yu-xform-item>
            <yu-xform-item  name="cusName"   label-width="120px" label="客户名称" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item name="rptType"  label="报告类型" ctype="select" data-code="STD_ZB_RPT_TYPE" label-width="120px"></yu-xform-item>
            <yu-xform-item label="任务生成日期"  ctype="custom" name="taskStartDt" label-width="120px">
                <yu-col :sm="11" :xs="24">
            <yu-xform-item name="overdueDayStart" ctype="datepicker"  placeholder="请输入起始值" show-word-limit></yu-xform-item>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
            <yu-xform-item name="overdueDayEnd" ctype="datepicker"  placeholder="请输入截止值" show-word-limit></yu-xform-item>
                </yu-col>
            </yu-xform-item>
            <yu-xform-item name="execId"  ctype="YuXuserForDh" @select-fn="commonSelectFn" :mapping="{'execId':'execId','execIdName':'execIdName'}" label-width="120px" label="任务执行人"></yu-xform-item>
            <yu-xform-item name="execBrId"  ctype="YuXorgForDh" @select-fn="commonSelectFn" :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" v-if="brId" label="任务执行机构" label-width="120px"></yu-xform-item>
         </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel ref="panel" :title="tableTitle" color="red" class="adjust-height" :collapse-hide="false">
          <!-- 检查、查看详情按钮 -->
          <template>
            <yu-toolBar>
              <yu-button type="primary" @click="check()" v-show="viewButtonHidden" v-if="checkCtrl('check')">检查</yu-button>
              <yu-button type="primary" @click="check('view')" v-if="checkCtrl('view')">查看</yu-button>
            </yu-toolBar>
          </template>
        <!--任务主表显示列表-->
          <yu-xtable ref="pspTaskTable"   :data-url="listUrl" :base-params="searchData" selection-type="radio" condition-key="condition" request-type="POST">
            <yu-xtable-column align="center" label="任务编号" prop="taskNo" width="200"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务类型" prop="taskType" data-code="STD_ZB_TASK_TYPE" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="检查类型" prop="checkType" data-code="STD_ZB_CHECK_TYPE" width="180"> </yu-xtable-column>
            <yu-xtable-column align="center" label="报告类型" prop="rptType" data-code="STD_ZB_RPT_TYPE" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId" width="140"> </yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName" width="100"> </yu-xtable-column>
            <yu-xtable-column align="center" label="任务生成日期" prop="taskStartDt" width="120"> </yu-xtable-column>
            <yu-xtable-column align="center" label="任务要求完成日期" prop="taskEndDt" width="140"> </yu-xtable-column>
            <yu-xtable-column align="center" label="任务执行人" prop="execIdName" width="100"> </yu-xtable-column>
            <yu-xtable-column align="center" label="任务执行机构" prop="execBrIdName" width="140"> </yu-xtable-column>
            <yu-xtable-column align="center" label="检查状态" prop="checkStatus" data-code="STD_ZB_CHECK_STATUS" width="80"> </yu-xtable-column>
            <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_TASK_TYPE,STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_APPR_STATUS,STD_ZB_RPT_TYPE');
export default {
  data () {
    return {
      activeName: 'todo',
      applyFormdata: {},
      tableTitle: '贷后定期检查任务列表（小微消费性）',
      listUrl: this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
      preformdata: {},
      dialogVisible: false,
      viewButtonHidden: true,
      overdueDayStart: '',
      overdueDayEnd: '',
      brId: true, // 隐藏任务机构
      searchData: {
        condition: {
          // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          taskType: '1',
          checkType: '25',
          approveStatus: '000,111,992'
        },
        sort: 'taskStartDt desc'
      }
    };
  },
  created () {
    // 岗位角色

    var _this = this;
    const loginUser = _this.$xutils.getLoginUserInfo();
    const rolesList = loginUser.roles; // 角色
    if (rolesList != undefined) {
      for (let i = 0; i < rolesList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
        let item = rolesList[i];
        if (item.code === 'R0010') {
          _this.brId = false;
        }
      }
    }
  },
  methods: {
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'execId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'execBrId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'execId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'execBrId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    },
    // 标签页切换
    handleClick (e) {
      if (e.name === 'history') {
        this.viewButtonHidden = false;
        this.tableTitle = '贷后定期检查历史列表（小微消费性）';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '25',
            approveStatus: '997,998'
          }
        };
      } else {
        this.viewButtonHidden = true;
        this.tableTitle = '贷后定期检查任务列表（小微消费性）';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '25',
            approveStatus: '000,111,992'
          }
        };
      }
      this.$refs.searchForm.resetFields();
      this.$refs.pspTaskTable.remoteData(this.searchData);
    },
    // 检查
    check: function (op) {
      let selections = this.$refs.pspTaskTable.selections;
      if (selections.length != 1) {
        return this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
      if (op == undefined && selections[0].approveStatus !== '000' && selections[0].approveStatus !== '992') {
        return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
      }
      let coopAgrSerno = selections[0].taskNo;
      let partnerNo = selections[0].cusId;
      let partnerName = selections[0].cusName;

      let rptName = '';
      let name = 'pspmanage/pspCheck/regularCheck/smallConsumeRegularTree';
      if (selections[0].taskType == '1') {
        if (selections[0].rptType == '1') { // 正常
          rptName = 'smallConsumeRegular.cpt';
        } else if (selections[0].rptType == '2') { // 瑕疵
          rptName = 'smallConsumeRegularXC.cpt';
        } else if (selections[0].rptType == '3') { // 不良
          rptName = 'smallConsumeRegularBL.cpt';
        }
      } else if (selections[0].taskType == '2') {
        rptName = 'smallZdjcCheck.cpt';
      }


      let opType = op;
      let title = '定期贷后检查（小微消费性）';
      let key = 'smallConsumePspCheckRst' + new Date().getTime();
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { pspTask: selections[0], opType: opType, rptName: rptName, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName }
        });
      });
    },
    // 条件查询
    searchFn: function () {
      this.$refs.pspTaskTable.remoteData({
        condition: JSON.stringify(this.searchFormdata)
      });
    },
    // 重置
    resetFn: function () {
      // 清空条件
      this.$refs.searchForm.resetFields();
    }

  }
};
</script>
<style scoped>
.psp-task-list {
  height: 100%;
}
</style>
