/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div class="psp-task-list">
    <yu-panel :collapse-hide="false">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="贷后检查延期申请" name="todo"></yu-tab-pane>
        <yu-tab-pane label="贷后检查延期申请历史" name="history"></yu-tab-pane>
      </yu-tabs>
      <yu-panel ref="panel"  title="输入查询条件"  class="adjust-height" :collapse-hide="false">
              <yu-xform ref="searchForm" related-table-name="pspTaskTable" form-type="search" v-model="searchFormdata" >
                <yu-xform-group>
                  <yu-xform-item name="cusId" :colspan="8" label="客户编号"></yu-xform-item>
                  <yu-xform-item name="cusName" :colspan="8" label="客户名称" placeholder="模糊查询" fuzzy-query="both"></yu-xform-item>
                  <yu-xform-item name="taskNo" :colspan="8" label="任务编号"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
          </yu-panel>
      <yu-panel ref="panel" :title="tableTitle" color="red" class="adjust-height" :collapse-hide="false">
          <!-- 检查、查看详情按钮 -->
          <template>
            <yu-toolBar>
              <yu-button type="primary" @click="addFn()" v-show="viewButtonHidden" v-if="checkCtrl('add')">新增</yu-button>
              <yu-button type="primary" @click="check()" v-show="viewButtonHidden" v-if="checkCtrl('edit')">修改</yu-button>
              <yu-button type="primary" @click="deleteFn()" v-show="viewButtonHidden" v-if="checkCtrl('delete')">删除</yu-button>
              <yu-button type="primary" @click="check('view')" v-if="checkCtrl('view')">查看</yu-button>
            </yu-toolBar>
          </template>
        <!--任务主表显示列表-->
          <yu-xtable ref="pspTaskTable"   :data-url="listUrl" :base-params="searchData" selection-type="radio" condition-key="condition" request-type="post" >
            <yu-xtable-column align="center" label="业务流水号" prop="serno" width="160"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务编号" prop="taskNo" width="160"></yu-xtable-column>
            <yu-xtable-column align="center" label="检查类型" prop="checkType" data-code="STD_ZB_CHECK_TYPE" width="110"> </yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId" width="120"> </yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName" width="100"> </yu-xtable-column>
            <yu-xtable-column align="center" label="任务开始日期" prop="taskStartDt" width="120"> </yu-xtable-column>
            <yu-xtable-column align="center" label="任务到期日期" prop="taskEndDtOld" width="120"> </yu-xtable-column>
            <yu-xtable-column align="center" label="申请延期完成日期" prop="delayDate" width="140"> </yu-xtable-column>
            <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="120"> </yu-xtable-column>
            <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" width="150"> </yu-xtable-column>
            <yu-xtable-column align="center" label="登记日期" prop="inputDate" width="120"> </yu-xtable-column>
            <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import { mapGetters } from 'vuex';
lookup.reg('STD_ZB_TASK_TYPE,STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_APPR_STATUS,STD_ZB_RPT_TYPE');
export default {
  data () {
    return {
      activeName: 'todo',
      applyFormdata: {},
      tableTitle: '贷后检查延期申请列表',
      listUrl: this.$backend.cmisPsp + '/api/psptaskdelayapp/queryList',
      deleteUrl: this.$backend.cmisPsp + '/api/psptaskdelayapp/delete',
      preformdata: {},
      dialogVisible: false,
      viewButtonHidden: true,
      searchData: {
        condition: {
          // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          applyType: '1',
          approveStatus: '000,111,992'
        },
        sort: 'serno desc'
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
        this.tableTitle = '贷后检查延期申请历史列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            applyType: '1',
            approveStatus: '997,998'
          },
          sort: 'serno desc'
        };
      } else {
        this.viewButtonHidden = true;
        this.tableTitle = '贷后检查延期申请列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            applyType: '1',
            approveStatus: '000,111,992'
          },
          sort: 'serno desc'
        };
      }
      this.$refs.searchForm.resetFields()
      this.$refs.pspTaskTable.remoteData(this.searchData);
    },
    // 新增
    addFn () {
      this.$dialog.open(
        '贷后检查延期申请向导',
        'pspmanage/pspCheck/delayCheck/checkDelayApply',
        1300,
        700,
        null,
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
      this.$refs.pspTaskTable.remoteData(params);
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
          data: {pkId: selections[0].pkId}
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
    // 检查
    check: function (op) {
      let selections = this.$refs.pspTaskTable.selections;
      if (selections.length != 1) {
        return this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
      if (op == undefined && selections[0].approveStatus !== '000' && selections[0].approveStatus !== '992') {
        return this.$message({ message: '当前审批状态不允许修改!', type: 'warning' });
      }
      selections[0].applyType = '1';
      let name = 'pspmanage/pspCheck/delayCheck/checkDeatail';
      let opType = op;
      let title = '贷后检查延期申请';
      let key = 'checkDelayApp' + new Date().getTime();
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { pspTask: selections[0], opType: opType }
        });
      });
    }
    // // 条件查询
    // searchFn: function () {
    //   this.$refs.pspTaskTable.remoteData({
    //     condition: JSON.stringify(this.searchFormdata)
    //   });
    // },
    // // 重置
    // resetFn: function () {
    //   // 清空条件
    //   this.$refs.searchForm.resetFields();
    // }

  }
};
</script>
<style scoped>
.psp-task-list {
  height: 100%;
}
</style>
