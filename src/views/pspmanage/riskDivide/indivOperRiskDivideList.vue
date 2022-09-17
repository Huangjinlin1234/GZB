/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-个人经营客户风险分类
 */
<template>
  <div class="risk-task-list">
    <yu-panel :collapse-hide="false">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="待分类任务" name="todo"></yu-tab-pane>
        <yu-tab-pane label="历史分类任务" name="history"></yu-tab-pane>
      </yu-tabs>
      <yu-panel ref="panel"  title="输入查询条件"  class="adjust-height" :collapse-hide="false">
              <yu-xform ref="searchForm" related-table-name="riskTaskTable" form-type="search" v-model="searchFormdata" >
                <yu-xform-group>
                  <yu-xform-item  name="cusId" :colspan="9" label="客户编号" label-width="160px"></yu-xform-item>
                  <yu-xform-item  name="cusName" :colspan="7" label-width="120px" label="客户名称" fuzzy-query="both" placeholder="模糊查询"></yu-xform-item>
                  <yu-xform-item  name="checkType" :colspan="8" label="分类模型" label-width="120px" ctype="select" :options="docTypeOptions"></yu-xform-item>
                  <yu-xform-item name="taskStartDt"  label="任务生成日期 起" :colspan="5" label-width="160px" ctype="datepicker"></yu-xform-item>
                  <yu-xform-item name="taskEndDt"  label="止" :colspan="4" ctype="datepicker" label-width="20px"></yu-xform-item>
                  <yu-xform-item name="execId" :colspan="7" ctype="YuXuserForDh" @select-fn="commonSelectFn" :mapping="{'execId':'execId','execIdName':'execIdName'}" label-width="120px" label="任务执行人"></yu-xform-item>
                  <yu-xform-item name="execBrId" :colspan="8" ctype="YuXorgForDh" @select-fn="commonSelectFn" :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" label="任务执行机构" label-width="120px"></yu-xform-item>
                </yu-xform-group>

              </yu-xform>
          </yu-panel>
      <yu-panel ref="panel" :title="tableTitle" color="red" class="adjust-height" :collapse-hide="false">
          <!-- 检查、查看详情按钮 -->
          <template>
            <yu-toolBar>
              <yu-button type="primary" @click="addFn()" v-show="viewButtonHidden" v-if="checkCtrl('add')">新增</yu-button>
              <yu-button type="primary" @click="check()" v-show="viewButtonHidden" v-if="checkCtrl('check')">初分认定</yu-button>
              <yu-button type="primary" @click="deleteFn()" v-show="viewButtonHidden" v-if="checkCtrl('delete')">删除</yu-button>
              <yu-button type="primary" @click="check('view')" v-if="checkCtrl('view')">查看</yu-button>
            </yu-toolBar>
          </template>
        <!--任务主表显示列表-->
          <yu-xtable ref="riskTaskTable"  :data-url="listUrl" :base-params="searchData" selection-type="radio"  requestType="POST" condition-key="condition">
            <yu-xtable-column align="center" label="任务编号" prop="taskNo" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务类型" prop="taskType" data-code="STD_RISK_TASK_TYPE" width="80"></yu-xtable-column>
            <yu-xtable-column align="center" label="分类模型" prop="checkType" data-code="STD_RISK_CHECK_TYPE" width="80"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户类型" prop="cusCatalog" data-code="STD_RISK_CUS_CATALOG" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="手工分类" prop="manualClass" data-code="STD_FIVE_CLASS" width="80"></yu-xtable-column>
            <yu-xtable-column align="center" label="机评分类" prop="autoClass" data-code="STD_FIVE_CLASS" width="80"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务生成日期" prop="taskStartDt" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="要求完成日期" prop="taskEndDt" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务执行人" prop="execIdName" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务执行机构" prop="execBrIdName" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务状态" prop="checkStatus" data-code="STD_RISK_CHECK_STATUS" width="80"> </yu-xtable-column>
            <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_RISK_TASK_TYPE,STD_RISK_CHECK_TYPE,STD_RISK_CUS_CATALOG,STD_FIVE_CLASS,STD_RISK_CHECK_STATUS,STD_ZB_APPR_STATUS');
export default {
  data () {
    return {
      activeName: 'todo',
      applyFormdata: {},
      tableTitle: '个人客户经营性贷款风险列表',
      listUrl: this.$backend.cmisPsp + '/api/risktasklist/queryList',
      deleteUrl: this.$backend.cmisPsp + '/api/risktasklist/delete/',
      preformdata: {},
      viewType: 'DETAIL',
      dialogVisible: false,
      viewButtonHidden: true,
      docTypeOptions: [
        {key: '2', value: '个人经营性风险分类'}
        // {key:"03", value:"登记中"},
      ],
      searchData: {
        condition: {
          // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          checkType: '2',
          approveStatus: '000,111,992'
        },
        sort: 'taskStartDt desc'
      }
    };
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
        this.tableTitle = '个人经营性风险分类历史列表';
        this.docTypeOptions = [
          {key: '2', value: '个人经营性风险分类'},
          // {key:"03", value:"登记中"},
          {key: '5', value: '个人客户低风险分类'}
        ];
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '2,5',
            approveStatus: '997,998'
          },
          sort: 'taskStartDt desc'
        };
      } else {
        this.viewButtonHidden = true;
        this.tableTitle = '个人客户经营性贷款风险列表';
        this.docTypeOptions = [
          {key: '2', value: '个人经营性风险分类'}
        // {key:"03", value:"登记中"},
        ];
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '2',
            approveStatus: '000,111,992'
          },
          sort: 'taskStartDt desc'
        };
      }
      this.$refs.searchForm.resetFields()
      this.$refs.riskTaskTable.remoteData(this.searchData);
    },
    // 新增
    addFn () {
      this.$dialog.open(
        '个人经营性风险分类人工新增向导',
        'pspmanage/riskDivide/riskDivideApply',
        1300,
        700,
        {'checkType': '2'},
        () => {
          this.reloadData();
        },
        true,
        false
      );
    },

    reloadData () {
      const model = {};
      const params = { condition: JSON.stringify(model) };
      this.$refs.riskTaskTable.remoteData(params);
    },
    // 删除
    deleteFn () {
      var flag = false;
      let selections = this.$refs.riskTaskTable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      var approveStatus = selections[0].approveStatus;
      if (approveStatus !== '000' && approveStatus !== '992') {
        this.$message({
          message: '仅待发起状态或打回的的数据才可以删除',
          type: 'warning'
        });
        return;
      }
      const loginUser = this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys; // 岗位
      if (dutysList != undefined) {
        for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12
          let item = dutysList[i];
          if (item.code == 'XDB22') {
            flag = true;
          }
        }
      }
      if (!flag) {
        this.$message({ message: '您无权限删除', type: 'warning' });
        return;
      }
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: this.deleteUrl,
          data: selections[0].pkId
        }).then(({code, message, data}) => {
          if (code == '0') {
            this.$message({ message: '删除成功', type: 'success' });
            this.$refs.riskTaskTable.remoteData();
          } else {
            this.$message({ message: message || '删除失败', type: 'error' });
          }
        });
      });
    },
    // 检查
    check: function (op) {
      let selections = this.$refs.riskTaskTable.selections;
      if (selections.length != 1) {
        return this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
      if (op == undefined && selections[0].approveStatus !== '000' && selections[0].approveStatus !== '992') {
        return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
      }
      let taskStatus = '';// 子表任务生成状态1:生成中;2:已生成
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisPsp + '/api/risktasklist/getTaskStatus',
        data: selections[0].pkId,
        callback: function (code, message, response) {
          taskStatus = response.data;
        }
      });
      let opType = op;
      let title = '个人经营性风险分类详情';
      let type = 'indivOperRiskDivideList';
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: 'pspmanage/riskDivide/indivOperRiskTree',
          // 自定义唯一页签key
          key: 'operRiskCheckRst' + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { riskTask: selections[0], opType: opType, type: type }
        });
      });
    }


  }
};
</script>
<style scoped>
.risk-task-list {
  height: 100%;
}
</style>
