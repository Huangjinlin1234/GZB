/**
* @created by hanl 2021-06-15
* @updated by youhong
* @description 贷后检查-不定期检查-客户经理不定期自检
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
            <yu-xform-item name="cusId" :colspan="8" label="客户编号" ></yu-xform-item>
            <yu-xform-item name="cusName" :colspan="8"  label="客户名称"></yu-xform-item>
            <yu-xform-item name="rptType" :colspan="8"  label="报告类型" ctype="select" data-code="STD_ZB_RPT_TYPE"></yu-xform-item>
            <yu-xform-item name="taskStartDtStart" label="任务生成日期 起" :colspan="5"
                           ctype="datepicker"></yu-xform-item>
            <yu-xform-item name="taskStartDtEnd" label="止" :colspan="3" ctype="datepicker"
                           label-width="20px"></yu-xform-item>
            <yu-xform-item name="execId" :colspan="8" ctype="YuXuserForDh" @select-fn="commonSelectFn"
                           :mapping="{'execId':'execId','execIdName':'execIdName'}"
                           label="任务执行人"></yu-xform-item>
            <yu-xform-item name="execBrId" :colspan="8" ctype="YuXorgForDh" @select-fn="commonSelectFn"
                           :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" label="任务执行机构"
                           ></yu-xform-item>
          </yu-xform-group>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn()">查询</yu-button>
            <yu-button type="primary" @click="resetFn()">重置</yu-button>
          </div>
        </yu-xform>
      </yu-panel>
      <yu-panel ref="panel" :title="tableTitle" :collapse-hide="false">
        <!-- 检查、查看详情按钮 -->
        <template>
          <yu-toolBar>
            <yu-button type="primary" @click="addFn()" v-show="viewButtonHidden" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button type="primary" @click="check('edit')" v-show="viewButtonHidden" v-if="checkCtrl('check')">检查</yu-button>
            <yu-button type="primary" @click="deleteFn()" v-show="viewButtonHidden" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button type="primary" @click="check('view')" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolBar>
        </template>
        <!--任务主表显示列表-->
        <yu-xtable ref="pspTaskTable"  :data-url="listUrl" :base-params="searchData" selection-type="radio" request-type="POST"
                   condition-key="condition">
          <yu-xtable-column align="center" label="任务编号" prop="taskNo" width="220"></yu-xtable-column>
          <yu-xtable-column align="center" label="任务类型" prop="taskType" data-code="STD_ZB_TASK_TYPE" width="100"></yu-xtable-column>
          <yu-xtable-column align="center" label="检查类型" prop="checkType" data-code="STD_ZB_CHECK_TYPE" width="180"></yu-xtable-column>
          <yu-xtable-column align="center" label="报告类型" prop="rptType" data-code="STD_ZB_RPT_TYPE" width="80"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户编号" prop="cusId" width="140"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户名称" prop="cusName" width="120"></yu-xtable-column>
          <yu-xtable-column align="center" label="任务生成日期" prop="taskStartDt" width="120"></yu-xtable-column>
          <yu-xtable-column align="center" label="任务要求完成日期" prop="taskEndDt" width="140"></yu-xtable-column>
          <yu-xtable-column align="center" label="任务执行人" prop="execIdName" width="100"></yu-xtable-column>
          <yu-xtable-column align="center" label="任务执行机构" prop="execBrIdName" width="140"></yu-xtable-column>
          <yu-xtable-column align="center" label="检查状态" prop="checkStatus" data-code="STD_ZB_CHECK_STATUS" width="80"></yu-xtable-column>
          <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
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
      tableTitle: '客户经理不定期自检列表',
      listUrl: this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
      deleteUrl: this.$backend.cmisPsp + '/api/psptasklist/deleteByTaskNo',
      preformdata: {},
      dialogVisible: false,
      viewButtonHidden: true,
      formType: '',
      searchData: {
        condition: {
          // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          // 检查类型
          checkType: '31,32,33,34,35',
          // 审批状态
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
        this.tableTitle = '客户经理不定期自检历史列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '31,32,33,34,35',
            approveStatus: '997,998'
          }
        };
      } else {
        this.viewButtonHidden = true;
        this.tableTitle = '客户经理不定期自检列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            checkType: '31,32,33,34,35',
            approveStatus: '000,111,992'
          }
        };
      }
      this.$refs.searchForm.resetFields()
      this.$refs.pspTaskTable.remoteData(this.searchData);

    },
    // 新增
    addFn () {
      this.$dialog.open(
        '客户经理不定期自检新增向导',
        'pspmanage/pspCheck/irregularCheck/mgrIrregularCheckApply',
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
        checkType: '31,32,33,34,35',
        approveStatus: '000,111,992'
      };
      const params = {condition: JSON.stringify(model)};
      this.$refs.pspTaskTable.remoteData(params);
    },
    // 检查
    check: function (op) {
      var _this = this;
      let selections = this.$refs.pspTaskTable.selections;
      if (selections.length != 1) {
        return this.$message({message: '请先选择一条记录', type: 'warning'});
      }
      if (op == 'edit' && selections[0].approveStatus !== '000' && selections[0].approveStatus !== '992') {
        return this.$message({message: '当前审批状态不允许检查!', type: 'warning'});
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisPsp + '/api/psptasklist/selectTaskAndRst',
        data: selections[0],
        callback: function (code, message, response) {
          if (response.data) {
            // if (response.data.taskStatus != '2') {
            //   return _this.$message({message: '任务生成中!', type: 'warning'});
            // } else {
              _this.formType = op;

              // 不定期个人经营性正常瑕疵报表
              let title, name, rptName;
              if (selections[0].checkType == '32' && selections[0].rptType == '3') {
                // 不定期个人经营性不良报表
                rptName = 'indivOperRegularBad.cpt';
                name = 'pspmanage/pspCheck/regularCheck/indivOperRegularBadTree';
                title = '不定期检查（个人经营性）';
              } else if (selections[0].checkType == '32') {
                // 不定期个人消费性不良报表
                rptName = 'indivRegular.cpt';
                name = 'pspmanage/pspCheck/regularCheck/indivOperRegularTree';
                title = '不定期检查（个人经营性）';
              } else if (selections[0].checkType == '33' && selections[0].rptType == '3') {
                // 不定期个人消费性不良报表
                rptName = 'indivConsumeRegularBad.cpt';
                name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
                title = '不定期检查（个人消费性）';
              } else if (selections[0].checkType == '33') {
                // 不定期个人消费性通用报表
                rptName = 'indivConsumeRegular.cpt';
                name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularTree';
                title = '不定期检查（个人消费性）';
              } else if (selections[0].checkType == '34' && selections[0].rptType == '3') {
                // 不定期检查（小微经营性不良）
                rptName = 'smallOperRegularBL.cpt';
                name = 'pspmanage/pspCheck/regularCheck/smallOperRegularTree';
                title = '不定期检查（小微经营性）';
              } else if (selections[0].checkType == '34') {
                // 不定期检查（小微经营性正常）
                rptName = 'smallOperRegular.cpt';
                name = 'pspmanage/pspCheck/regularCheck/smallOperRegularTree';
                title = '不定期检查（小微经营性）';
              } else if (selections[0].checkType == '35' && selections[0].rptType == '3') {
                // 不定期检查（小微消费性不良）
                rptName = 'smallConsumeRegularBL.cpt';
                name = 'pspmanage/pspCheck/regularCheck/smallConsumeRegularTree';
                title = '不定期检查（小微消费性）';
              } else if (selections[0].checkType == '35') {
                rptName = 'smallConsumeRegular.cpt';
                name = 'pspmanage/pspCheck/regularCheck/smallConsumeRegularTree';
                title = '不定期检查（小微消费性）';
              } else if (selections[0].checkType == '31' && selections[0].rptType == '3') {
                // 不定期对公不良
                rptName = 'corpRegularBad.cpt';
                name = 'psp/pspchecktask/blDetail';
                title = '不定期检查（对公）';
              } else if (selections[0].checkType == '31') {
                rptName = 'corpRegular.cpt';
                name = 'psp/pspchecktask/fblDetail';
                title = '不定期检查（对公）';
              }
              let taskNo = selections[0].taskNo;
              let partnerNo = selections[0].cusId;
              let partnerName = selections[0].cusName;

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
                  data: {
                    pspTask: selections[0],
                    opType: opType,
                    rptName: rptName,
                    formType: _this.formType,
                    taskNo: taskNo,
                    partnerNo: partnerNo,
                    partnerName: partnerName,
                    model_type: 'postLoanManage' // 征信报告公共功能需要用来判断功能来源
                  }
                });
              });
            // }
          } else {
          }
        }
      });
    },
    // 删除
    deleteFn () {
      let selections = this.$refs.pspTaskTable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var approveStatus = selections[0].approveStatus;
      if (approveStatus == '111') {
        this.$message({ message: '审批中的信息无法删除', type: 'warning' });
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
          data: {pkId: selections[0].pkId, taskNo: selections[0].taskNo}
        }).then(({code, message, data}) => {
          if (code == '0') {
            this.$message({ message: '删除成功', type: 'success' });
            this.$refs.pspTaskTable.remoteData();
          } else {
            this.$message({ message: message || '删除失败', type: 'error' });
          }
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
