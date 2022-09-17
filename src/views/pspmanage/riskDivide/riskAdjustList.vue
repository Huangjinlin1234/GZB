/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-风险分类调整信息
 */
<template>
  <div class="psp-task-list">
    <yu-panel :collapse-hide="false">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="调整分类任务" name="todo"></yu-tab-pane>
        <yu-tab-pane label="历史分类任务" name="history"></yu-tab-pane>
      </yu-tabs>
      <yu-panel ref="panel"  title="输入查询条件"  class="adjust-height" :collapse-hide="false">
              <yu-xform ref="searchForm" related-table-name="riskTaskTable" form-type="search" v-model="searchFormdata" >
                <yu-xform-group>
                  <yu-xform-item  name="cusId" :colspan="9" label="客户编号" label-width="160px"></yu-xform-item>
                  <yu-xform-item  name="cusName" :colspan="7" label-width="120px" label="客户名称" fuzzy-query="both" placeholder="模糊查询"></yu-xform-item>
                  <yu-xform-item  name="checkType" :colspan="8" label="分类模型" label-width="120px" ctype="select" data-code="STD_RISK_CHECK_TYPE"></yu-xform-item>
                  <yu-xform-item name="taskStartDt"  label="任务生成日期 起" :colspan="5" label-width="160px" ctype="datepicker"></yu-xform-item>
                  <yu-xform-item name="taskEndDt"  label="止" :colspan="4" ctype="datepicker" label-width="20px"></yu-xform-item>
                  <yu-xform-item name="inputId" :colspan="7" ctype="YuXuserForDh" @select-fn="commonSelectFn" :mapping="{'inputId':'inputId','execIdName':'execIdName'}" label-width="120px" label="登记人"></yu-xform-item>
                  <yu-xform-item name="inputBrId" :colspan="8" ctype="YuXorgForDh" @select-fn="commonSelectFn" :mapping="{'inputBrId':'inputBrId','execBrIdName':'execBrIdName'}" label="登记机构" label-width="120px"></yu-xform-item>
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
          <yu-xtable ref="riskTaskTable"   :data-url="listUrl" :base-params="searchData" selection-type="radio" requestType="POST" condition-key="condition">
            <yu-xtable-column align="center" label="任务编号" prop="taskNo" width="220"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务类型" prop="taskType" data-code="STD_RISK_TASK_TYPE" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="分类模型" prop="checkType" data-code="STD_RISK_CHECK_TYPE" width="160"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName" width="160"></yu-xtable-column>
            <yu-xtable-column align="center" label="任务生成日期" prop="taskStartDt" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" label="要求完成日期" prop="taskEndDt" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_RISK_TASK_TYPE,STD_RISK_CHECK_TYPE,STD_ZB_APPR_STATUS');
export default {
  data () {
    return {
      activeName: 'todo',
      searchFormdata: {},
      tableTitle: '风险分类调整列表',
      listUrl: this.$backend.cmisPsp + '/api/riskclasschgapp/queryList',
      deleteUrl: this.$backend.cmisPsp + '/api/riskclasschgapp/delete/',
      preformdata: {},
      viewType: 'DETAIL',
      dialogVisible: false,
      viewButtonHidden: true,
      searchData: {
        condition: {
          // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          approveStatus: '000,111,992'
        },
        sort: 'taskStartDt desc'
      }
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.riskTaskTable.remoteData();
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
          if (item === 'inputId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'inputBrId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'execId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'inputBrId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    },
    // 标签页切换
    handleClick (e) {
      if (e.name === 'history') {
        this.viewButtonHidden = false;
        this.tableTitle = '风险分类调整历史列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            approveStatus: '997,998'
          }
        };
      } else {
        this.viewButtonHidden = true;
        this.tableTitle = '风险分类调整列表';
        this.searchData = {
          condition: {
            // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            approveStatus: '000,111,992'
          }
        };
      }
      this.$refs.searchForm.resetFields()
      this.$refs.riskTaskTable.remoteData(this.searchData);
    },
    // 新增
    addFn () {
      this.$dialog.open(
        '风险分类调整申请向导',
        'pspmanage/riskDivide/riskAdjustApply',
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
      this.$refs.riskTaskTable.remoteData(params);
    },
    // 删除
    deleteFn () {
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

      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: this.deleteUrl + selections[0].pkId
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
        return this.$message({ message: '当前审批状态不允许修改!', type: 'warning' });
      }
      let opType = op;
      let title = ' 风险分类调整申请';
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: 'pspmanage/riskDivide/riskAdjustDetail',
          // 自定义唯一页签key
          key: 'riskAdjustPage' + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { riskTask: selections[0], opType: opType }
        });
      });
    }


  }
};
</script>
<style scoped>
.psp-task-list {
  height: 100%;
}
</style>
