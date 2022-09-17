<!--
 * @Author: liut
 * @Date: 2021-06-10 20:22:43
 * @LastEditTime: 2021-06-17 15:27:35
 * @LastEditors: Please set LastEditors
 * @Description: 小微消费性首次检查
 * @FilePath: \dscms-web\src\views\zrcbank\psp\pspCheck\dhjc\firstCheck\xwxfFirstCheck.vue
-->
<template>
      <yu-tabs v-model="tabName" type="border-card" @tab-click="tabClick">
        <yu-tab-pane label="待检查任务" name="wait">
          <yu-panel ref="panel"  title="输入查询条件"  class="adjust-height" :collapse-hide="false">
              <yu-xform ref="searchForm" related-table-name="pspTaskTable" v-model="searchFormdata" >
                <yu-xform-group>
                  <yu-xform-item  name="cusId" :colspan="9" label="客户编号" label-width="160px"></yu-xform-item>
                  <yu-xform-item  name="cusName" :colspan="7" label-width="120px" label="客户名称"></yu-xform-item>
                  <yu-xform-item  name="billNo" :colspan="8" label="借据编号" label-width="120px"></yu-xform-item>
                  <yu-xform-item name="taskStartDtStart" :picker-options="startOptions" label="任务生成日期 起" :colspan="6" label-width="160px" ctype="datepicker"></yu-xform-item>
                  <yu-xform-item name="taskStartDtEnd" :picker-options="endOptions" label="止" :colspan="3" ctype="datepicker" label-width="20px"></yu-xform-item>
                  <yu-xform-item name="execId" :colspan="7" ctype="YuXuserForDh" @select-fn="commonSelectFn" :mapping="{'execId':'execId','execIdName':'execIdName'}" label-width="120px" label="任务执行人"></yu-xform-item>
                  <yu-xform-item name="execBrId" :colspan="8" ctype="YuXorgForDh" @select-fn="commonSelectFn" :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" v-if="brId" label="任务执行机构" label-width="120px"></yu-xform-item>
                </yu-xform-group>
                <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn()" >查询</yu-button>
                    <yu-button @click="resetFn()">重置</yu-button>
                </div>
              </yu-xform>
          </yu-panel>
          <yu-panel ref="panel"  title="首次贷后检查任务列表（小微消费性）" color="red" class="adjust-height" :collapse-hide="false">
              <!-- 查看详情按钮 -->
              <template>
                <yu-toolBar>
                  <yu-button type="primary" @click="check()" v-if="checkCtrl('check')">检查</yu-button>
                  <yu-button type="primary" @click="detail()" v-if="checkCtrl('view')">查看</yu-button>
                </yu-toolBar>
              </template>
            <!--任务主表显示列表  审批状态：待发起、退回、审批中，显示在该列表-->
              <yu-xtable ref="pspTaskTable"   :data-url="tableUrl"  :base-params="baseParams" selection-type="radio" requestType="POST" condition-key="condition" >
                <yu-xtable-column label="任务编号" align="center" prop="taskNo" width="160px"></yu-xtable-column>
                <yu-xtable-column label="任务类型" align="center" prop="taskType" data-code="STD_ZB_TASK_TYPE"></yu-xtable-column>
                <yu-xtable-column label="检查类型" align="center" prop="checkType" data-code="STD_ZB_CHECK_TYPE" width="120px"> </yu-xtable-column>
                <yu-xtable-column label="客户编号" align="center" prop="cusId" width="100px"> </yu-xtable-column>
                <yu-xtable-column label="客户名称" align="center" prop="cusName" width="100px"> </yu-xtable-column>
                <yu-xtable-column label="借据编号" align="center" prop="billNo" width="140px"> </yu-xtable-column>
                <yu-xtable-column label="合同编号" align="center" prop="contNo" width="140px"> </yu-xtable-column>
                <yu-xtable-column label="产品名称" align="center" prop="prdName" width="100px"></yu-xtable-column>
                <yu-xtable-column label="任务生成日期" align="center" prop="taskStartDt" width="120px"> </yu-xtable-column>
                <yu-xtable-column label="任务要求完成日期" align="center" prop="taskEndDt" width="150px"> </yu-xtable-column>
                <yu-xtable-column label="任务执行人" align="center" prop="execIdName"  width="110px"> </yu-xtable-column>
                <yu-xtable-column label="任务执行机构" align="center" prop="execBrIdName"  width="120px"> </yu-xtable-column>
                <yu-xtable-column label="检查状态" align="center" prop="checkStatus" data-code="STD_ZB_CHECK_STATUS" width="80px"> </yu-xtable-column>
                <yu-xtable-column label="审批状态" align="center" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80px"></yu-xtable-column>
              </yu-xtable>
          </yu-panel>
        </yu-tab-pane>

        <yu-tab-pane label="历史检查任务" name="history">
          <yu-panel ref="panel"  title="输入查询条件"  class="adjust-height" :collapse-hide="false">
              <yu-xform ref="hisSearchForm" related-table-name="pspTaskHisTable"  v-model="hisSearchFormdata" label-width="150px">
                <yu-xform-group>
                  <yu-xform-item  name="cusId" :colspan="9" label="客户编号" label-width="160px"></yu-xform-item>
                  <yu-xform-item  name="cusName" :colspan="7" label-width="120px" label="客户名称"></yu-xform-item>
                  <yu-xform-item  name="billNo" :colspan="8" label="借据编号" label-width="120px"></yu-xform-item>
                  <yu-xform-item name="taskStartDtStart" :picker-options="startHisOptions" label="任务生成日期 起" :colspan="6" label-width="160px" ctype="datepicker"></yu-xform-item>
                  <yu-xform-item name="taskStartDtEnd" :picker-options="endHisOptions" label="止" :colspan="3" ctype="datepicker" label-width="20px"></yu-xform-item>
                  <yu-xform-item  name="execId" ctype="YuXuserForDh" :colspan="7" @select-fn="commonSelectFn1" :mapping="{'execId':'execId','execIdName':'execIdName'}" label-width="120px" label="任务执行人"></yu-xform-item>
                  <yu-xform-item  name="execBrId" ctype="YuXorgForDh" :colspan="8" @select-fn="commonSelectFn1" :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" v-if="brId" label="任务执行机构" label-width="120px"></yu-xform-item>
                  <yu-xform-item name="rptType" :colspan="8" label="任务类型" ctype="select"  data-code="STD_ZB_TASK_TYPE">
                  </yu-xform-item>
                </yu-xform-group>
                <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn('his')" >查询</yu-button>
                    <yu-button @click="resetFn('his')">重置</yu-button>
                </div>
              </yu-xform>
          </yu-panel>
          <yu-panel ref="panel"  title="首次贷后检查历史列表（小微消费性）" color="red" class="adjust-height" :collapse-hide="false">
              <!-- 查看详情按钮 -->
              <template>
                <yu-toolBar>
                  <yu-button @click="detail('his')" type="primary" v-if="checkCtrl('view')">查看</yu-button>
                </yu-toolBar>
              </template>
            <!--任务主表显示列表  审批状态：审批通过，显示在该列表-->
              <yu-xtable ref="pspTaskHisTable"  :data-url="tableUrl" :base-params="hisBaseParams"  selection-type="radio" requestType="POST" condition-key="condition" >
                <yu-xtable-column label="任务编号" align="center" prop="taskNo" width="160px"></yu-xtable-column>
                <yu-xtable-column label="任务类型" align="center" prop="taskType" data-code="STD_ZB_TASK_TYPE"></yu-xtable-column>
                <yu-xtable-column label="检查类型" align="center" prop="checkType" data-code="STD_ZB_CHECK_TYPE" width="120px"> </yu-xtable-column>
                <yu-xtable-column label="客户编号" align="center" prop="cusId" width="100px"> </yu-xtable-column>
                <yu-xtable-column label="客户名称" align="center" prop="cusName" width="100px"> </yu-xtable-column>
                <yu-xtable-column label="借据编号" align="center" prop="billNo" width="140px"> </yu-xtable-column>
                <yu-xtable-column label="合同编号" align="center" prop="contNo" width="140px"> </yu-xtable-column>
                <yu-xtable-column label="产品名称" align="center" prop="prdName" width="100px"></yu-xtable-column>
                <yu-xtable-column label="任务生成日期" align="center" prop="taskStartDt" width="120px"> </yu-xtable-column>
                <yu-xtable-column label="任务要求完成日期" align="center" prop="taskEndDt" width="150px"> </yu-xtable-column>
                <yu-xtable-column label="任务执行人" align="center" prop="execIdName"  width="110px"> </yu-xtable-column>
                <yu-xtable-column label="任务执行机构" align="center" prop="execBrIdName"  width="120px"> </yu-xtable-column>
                <yu-xtable-column label="检查状态" align="center" prop="checkStatus" data-code="STD_ZB_CHECK_STATUS" width="80px"> </yu-xtable-column>
                <yu-xtable-column label="审批状态" align="center" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80px"></yu-xtable-column>
              </yu-xtable>
          </yu-panel>
        </yu-tab-pane>
      </yu-tabs>
</template>

<script>
import { clone, lookup } from '@/utils';
import { mapGetters } from 'vuex';
lookup.reg('STD_ZB_TASK_TYPE,STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_APPR_STATUS');
export default {
  data: function () {
    let _this = this;
    return {
      baseParams: {condition: JSON.stringify({checkType: '15', approveStatus: '000,111,992'}), sort: 'taskStartDt desc'},
      hisBaseParams: {condition: JSON.stringify({checkType: '15', approveStatus: '997,998'}), sort: 'taskStartDt desc'},
      tableUrl: backend.cmisPsp + '/api/psptasklist/getPspTaskList', // 任务列表查询地址
      dialogVisible: false, // 弹出框是否展示
      searchFormdata: {cusId: '', cusName: '', billNo: '', taskStartDtStart: '', taskStartDtEnd: '', execId: '', execBrId: ''}, // 查询表单数据
      hisSearchFormdata: {cusId: '', cusName: '', billNo: '', taskStartDtStart: '', taskStartDtEnd: '', execId: '', execBrId: ''}, // 历史查询表单数据
      tabName: 'wait', // 默认打开打一个tab页
      brId: true, // 隐藏任务机构
      startOptions: {
        disabledDate (time) {
          if (_this.searchFormdata.taskStartDtEnd) {
            return time.getTime() > new Date(_this.searchFormdata.taskStartDtEnd).getTime();
          }
        }
      },
      endOptions: {
        disabledDate (time) {
          if (_this.searchFormdata.taskStartDtStart) {
            return time.getTime() < new Date(_this.searchFormdata.taskStartDtStart).getTime();
          }
        }
      },
      startHisOptions: {
        disabledDate (time) {
          if (_this.hisSearchFormdata.taskStartDtEnd) {
            return time.getTime() > new Date(_this.hisSearchFormdata.taskStartDtEnd).getTime();
          }
        }
      },
      endHisOptions: {
        disabledDate (time) {
          if (_this.hisSearchFormdata.taskStartDtStart) {
            return time.getTime() < new Date(_this.hisSearchFormdata.taskStartDtStart).getTime();
          }
        }
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
  computed: {
    ...mapGetters([
      'userCode', 'userName', 'org', 'instu'
    ])
  },
  mounted: function () {
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
    commonSelectFn1: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'execId') {
            this.hisSearchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'execBrId') {
            this.hisSearchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'execId') {
            this.hisSearchFormdata[item] = data.loginCode;
          } else if (item === 'execBrId') {
            this.hisSearchFormdata[item] = data.orgCode;
          }
        }
      }
    },
    headerRowStyle: function () {
      return {background: '#2877ff', color: '#fffffb'};
    },
    // 检查
    check: function () {
      let _this = this;
      let selections = _this.$refs.pspTaskTable.selections;
      if (selections.length != 1) {
        _this.$message({ message: '请选择一条数据进行操作！', type: 'warning' });
        return;
      }
      if (selections[0].checkStatus === '3') {
        _this.$message({ message: '检查状态为已提交不能进行检查！', type: 'warning' });
        return;
      }
      if (selections[0].approveStatus === '111') {
        _this.$message({ message: '审批状态为审批中不能进行检查！', type: 'warning' });
        return;
      }
      let pspTask = {};
      clone(selections[0], pspTask);
      let status = 'check';
      let pageName = 'xwxf';
      let rptName = 'indivConsumeFirst.cpt';
      // _this.$router.push({path: '/pspCheckRst', query: {pspTask: pspTask, status: status, pageName: pageName }});
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst',
          key: new Date().getTime(),
          // 页签名称
          title: '首次贷后检查',
          // 传递的业务数据，可选配置
          data: {pspTask: pspTask, status: status, pageName: pageName, rptName: rptName}
        });
      });
    },
    // 查看
    detail: function (flag) {
      let _this = this;
      let selections = [];
      if (flag !== undefined && flag !== '' && flag === 'his') {
        selections = _this.$refs.pspTaskHisTable.selections;
        if (selections.length != 1) {
          _this.$message({ message: '请选择一条数据进行操作！', type: 'warning' });
          return;
        }
      } else {
        selections = _this.$refs.pspTaskTable.selections;
        if (selections.length != 1) {
          _this.$message({ message: '请选择一条数据进行操作！', type: 'warning' });
          return;
        }
      }
      let pspTask = {};
      clone(selections[0], pspTask);
      let status = 'detail';
      let pageName = 'xwxf';
      let rptName = 'indivConsumeFirst.cpt';
      // _this.$router.push({path: '/pspCheckRst', query: {pspTask: pspTask, status: status, pageName: pageName }});
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst',
          key: new Date().getTime(),
          // 页签名称
          title: '首次贷后检查',
          // 传递的业务数据，可选配置
          data: {pspTask: pspTask, status: status, pageName: pageName, rptName: rptName }
        });
      });
    },
    /**
      * 关闭弹出框
      */
    cancelFn: function () {
      this.dialogVisible = false;
    },
    // 条件查询
    searchFn: function (data) {
      if (data !== undefined && data !== '' && data === 'his') {
        this.$refs.pspTaskHisTable.remoteData({ condition: JSON.stringify(this.hisSearchFormdata) });
      } else {
        this.$refs.pspTaskTable.remoteData({ condition: JSON.stringify(this.searchFormdata) });
      }
    },
    // 重置
    resetFn: function (data) {
      if (data !== undefined && data !== '' && data === 'his') {
        // 清空条件
        this.$refs.hisSearchForm.resetFields();
        // 重新执行查询
        this.$refs.pspTaskHisTable.remoteData({ condition: '' });
      } else {
        // 清空条件
        this.$refs.searchForm.resetFields();
        // 重新执行查询
        this.$refs.pspTaskTable.remoteData({ condition: '' });
      }
    }
  }
};
</script>
