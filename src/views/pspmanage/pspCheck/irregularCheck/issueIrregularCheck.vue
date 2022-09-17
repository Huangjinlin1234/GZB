/**
* @created by hanl 2021-06-15
* @updated by wangyouhong
* @description 贷后检查-定期检查-总行下发不定期检查
*/
<template>
  <div class="psp-task-list">
    <yu-panel :collapse-hide="false">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="待检查任务" name="todo"></yu-tab-pane>
        <yu-tab-pane label="历史检查任务" name="history"></yu-tab-pane>
      </yu-tabs>
      <yu-panel ref="panel" title="输入查询条件" class="adjust-height" :collapse-hide="false">
        <yu-xform ref="searchForm" related-table-name="pspTaskTable" v-model="searchFormdata">
          <yu-xform-group>
            <yu-xform-item name="cusId" :colspan="8" label="客户编号"></yu-xform-item>
            <yu-xform-item name="cusName" :colspan="8" label="客户名称"></yu-xform-item>
            <yu-xform-item name="rptType" :colspan="8" label="报告类型" ctype="select"
                           data-code="STD_ZB_RPT_TYPE">
            </yu-xform-item>
            <yu-xform-item name="taskStartDtStart" label="任务生成日期 起" :colspan="5"
                           ctype="datepicker"></yu-xform-item>
            <yu-xform-item name="taskStartDtEnd" label="止" :colspan="3" ctype="datepicker"
                           label-width="20px"></yu-xform-item>
            <yu-xform-item name="execId" :colspan="8" ctype="YuXuserForDh" @select-fn="commonSelectFn"
                           :mapping="{'execId':'execId','execIdName':'execIdName'}"
                           label="任务执行人"></yu-xform-item>
            <yu-xform-item name="execBrId" :colspan="8" ctype="YuXorgForDh" @select-fn="commonSelectFn"
                           :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" label="任务执行机构"
                           label-width="120px"></yu-xform-item>
          </yu-xform-group>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn()">查询</yu-button>
            <yu-button type="primary" @click="resetFn()">重置</yu-button>
          </div>
        </yu-xform>
      </yu-panel>
      <yu-panel ref="panel" :title="tableTitle" color="red" class="adjust-height" :collapse-hide="false">
        <!-- 检查、查看详情按钮 -->
        <template>
          <yu-toolBar>
            <yu-button type="primary" @click="addFn()" v-show="viewButtonHidden" v-if="checkCtrl('add')">任务下发</yu-button>
            <yu-button type="primary" @click="check()" v-show="viewButtonHidden" v-if="checkCtrl('check')">检查</yu-button>
            <yu-button type="primary" @click="check('view')" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolBar>
        </template>
        <!--任务主表显示列表-->
        <yu-xtable ref="pspTaskTable"  :data-url="listUrl" :base-params="searchData" selection-type="radio" request-type="POST" condition-key="condition">
          <yu-xtable-column align="center" width="150" label="任务编号" prop="taskNo"></yu-xtable-column>
          <yu-xtable-column align="center" width="120" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" width="120" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" width="120" label="任务开始日期" prop="taskStartDt"></yu-xtable-column>
          <yu-xtable-column align="center" width="120" label="任务到期日期" prop="taskEndDt"></yu-xtable-column>
          <yu-xtable-column align="center" width="110" label="任务执行人" prop="execIdName"></yu-xtable-column>
          <yu-xtable-column align="center" width="150" label="任务执行机构" prop="execBrIdName"></yu-xtable-column>
          <yu-xtable-column align="center" width="150" label="任务派发人员 " prop="issueIdName"></yu-xtable-column>
          <yu-xtable-column align="center" width="170" label="任务派发人员所属机构" prop="issueBrIdName"></yu-xtable-column>
          <yu-xtable-column align="center" width="120" label="任务下发日期 " prop="issueDate"></yu-xtable-column>
          <yu-xtable-column align="center" width="80" label="检查状态" prop="checkStatus" data-code="STD_ZB_CHECK_STATUS"></yu-xtable-column>
          <yu-xtable-column align="center" width="80" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
import {mapGetters} from 'vuex';

lookup.reg('STD_ZB_TASK_TYPE,STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_APPR_STATUS,STD_ZB_RPT_TYPE');
export default {
  data () {
    return {
      activeName: 'todo',
      applyFormdata: {},
      tableTitle: '总行下发不定期检查任务列表',
      listUrl: this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
      preformdata: {},
      dialogVisible: false,
      viewButtonHidden: true,
      searchData: {
        condition: {
          // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          checkType: '41',
          approveStatus: '000,111,992'
        },
        sort: 'issueDate desc'
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
        this.tableTitle = '总行下发不定期检查任务历史列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '41',
            approveStatus: '997,998'
          }
        };
      } else {
        this.viewButtonHidden = true;
        this.tableTitle = '总行下发不定期检查任务列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '41',
            approveStatus: '000,111,992'
          }
        };
      }
      this.$refs.searchForm.resetFields()
      this.$refs.pspTaskTable.remoteData(this.searchData);
    },
    // 新增
    addFn () {
      // let selections = this.$refs.pspTaskTable.selections;
      // if (selections.length != 1) {
      //   return this.$message({ message: '请先选择一条记录', type: 'warning' });
      // }
      this.$dialog.open(
        '总行下发不定期贷后检查任务',
        'pspmanage/pspCheck/irregularCheck/issueIrregularCheckApply',
        1300,
        700,
        {},
        () => {
          this.reloadData();
        },
        true,
        false
      );
    },
    reloadData () {
      const model = {
        checkType: '41',
        approveStatus: '000,111,992'
      };
      const params = {condition: JSON.stringify(model)};
      this.$refs.pspTaskTable.remoteData(params);
    },
    // 检查
    check: function (op) {
      const _this = this;
      let selections = _this.$refs.pspTaskTable.selections;
      if (selections.length != 1) {
        return this.$message({message: '请先选择一条记录', type: 'warning'});
      }
      // if (op == undefined && selections[0].approveStatus !== '000' && selections[0].approveStatus !== '992') {
      if (!op && selections[0].approveStatus !== '000' && selections[0].approveStatus !== '992') {
        return this.$message({message: '当前审批状态不允许检查!', type: 'warning'});
      }
      let issueFlag = false;
      let checkFlag = false;
      let viewFlag = true;
      // let issueFlag = selections[0].issueId === _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      // let checkFlag = selections[0].execId === _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      // console.log('LoginLoginCode', _this.$xutils.getDefaultformulaData('$LoginLoginCode'));
      var loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys; // 岗位
      const rolesList = loginUser.roles; // 角色
      // console.log('rolesList', rolesList);
      if (rolesList) {
        for (let i = 0; i < rolesList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
          let item = rolesList[i];
          if (item.code == 'R0010' || item.code == 'R0030' || item.code == 'R0050' || item.code == 'R0020' || item.code == 'RSG01' || item.code == 'RDH01' || item.code == 'RSG01') {
            // issueFlag = true;
            checkFlag = true;
          }
        }
      }
      let name = 'pspmanage/pspCheck/irregularCheck/issueCheckDetail';
      let title = '总行下发不定期贷后检查任务';
      let opType = op;
      let key = 'irregularPspCheckRst' + new Date().getTime();
      _this.$nextTick(function () {
        _this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: {pspTask: selections[0], opType: opType, issueFlag: issueFlag, checkFlag: checkFlag, viewFlag: viewFlag }
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
