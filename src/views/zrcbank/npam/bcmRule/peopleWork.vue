
<template>
  <!--
    @created by wangyouhong
    @updated by youhong 2018-8-16 修改代码规范
    @updated by youhong 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="任务分配状态" placeholder="——请选择——" name="taskStatus" ctype="select" data-code="STD_TASK_ASSIGN_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="催收任务人工指派列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
        <yu-button type="primary" @click="allocateFn" v-if="checkCtrl('allocate')">分配</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" width="190" label="任务编号" prop="taskNo"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="任务生成日期" prop="createDate"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="任务要求完成日期" prop="finishDate"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="催收责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column align="center" width="200" label="催收责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="任务分配状态" prop="taskStatus" data-code="STD_TASK_ASSIGN_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>

// 注册字典项
yufp.lookup.reg('STD_TASK_ASSIGN_STATUS');
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisNpam + '/api/plabcmassigntask/queryPlaBcmAssignTaskList',
      baseParams:{sort:'createDate desc'},
      viewType: 'DETAIL'
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },

  methods: {

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmAssignTask',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '催收任务人工指派新增',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'ADD',
          taskNo: _this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ')
        }
      });
    },
    /*
     修改按钮
    */
    modifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selectionsAry[0].taskStatus == '01') {
        _this.$message({
          message: '该任务已经分配，无法修改',
          type: 'warning'
        });
        return;
      }
      var taskNo = selectionsAry[0].taskNo;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmAssignTask',
        // 自定义唯一页签key
        key: taskNo + new Date().getTime(), // 必传
        // 页签名称
        title: '催收任务人工指派修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          taskNo: taskNo
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var taskNo = selectionsAry[0].taskNo;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmAssignTask',
        // 自定义唯一页签key
        key: taskNo + 1, // 必传
        // 页签名称
        title: '催收任务人工指派查看',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          taskNo: taskNo
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabcmassigntask/selectByBcmStatus',
              data: selectionsAry[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('操作成功');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },
    /*
     分配按钮
     */
    allocateFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selectionsAry[0].taskStatus == '01') {
        _this.$message({
          message: '该任务已经分配，请勿重复分配',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作为分配操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.$request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plabcmassigntask/doAllocation',
          data: selectionsAry[0]
        }).then(res => {
          if (res.code == '0') {
            _this.$message.success('操作成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message.error(res.message);
          }
        });
      }).catch(res => {
        this.$message.error('操作取消');
      });
    }

  }
};
</script>
