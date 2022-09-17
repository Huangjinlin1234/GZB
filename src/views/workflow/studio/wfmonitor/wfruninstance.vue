
<template>
  <div>
    <yu-panel title="运行实例监控" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      
      <el-table-x ref="reftable" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-row-op="customRowOp"></el-table-x>
    </yu-panel>

    <yu-xdialog :title="tracktitle" :visible.sync="trackDialogVisible" @close="trackClose" height="400px">
      <div :id="nwfTrackPage">
        <work-travel :work-travel-data="workTravelData"></work-travel>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
import workTravel from '@/views/workflow/studio/wfmonitor/workTravel/workTravel.vue'
const cite = {}
export default {
  name: 'wfruninstance',
  components: { workTravel },
  data: function () {
    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/monitor/todo',
        getNodeInfo: backend.workflowService + '/api/monitor/getCurrentNodeIds',
        deleteByBizId: backend.workflowService + '/api/core/deleteByBizId'
      },
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true
      }, {
        label: '流程主实例号',
        prop: 'mainInstanceId',
        resizable: true,
        hidden: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true,
        hidden: false
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true
      }, {
        label: '流程编号',
        prop: 'flowId',
        width: 80,
        resizable: true,
        hidden: false
      }, {
        label: '发起人',
        prop: 'flowStarterName',
        width: 120,
        resizable: true,
        hidden: false
      }, {
        label: '客户编号',
        prop: 'bizUserId',
        resizable: true,
        hidden: true
      }, {
        label: '客户名称',
        prop: 'bizUserName',
        resizable: true,
        hidden: true
      }, {
        label: '流程状态',
        prop: 'flowState',
        width: 100,
        resizable: true,
        hidden: false,
        template: function () {
          return '<template slot-scope="scope">\
              <yu-tag type="success" v-if="scope.row.flowState==\'E\'">正常结束</yu-tag>\
              <yu-tag type="danger" v-if="scope.row.flowState==\'F\'">否决</yu-tag>\
              <yu-tag type="warning" v-if="scope.row.flowState==\'H\'">挂起</yu-tag>\
              <yu-tag type="primary" v-if="scope.row.flowState==\'P\'">暂停</yu-tag>\
              <yu-tag type="success" v-if="scope.row.flowState==\'R\'">运行中</yu-tag>\
              <yu-tag type="gray" v-if="scope.row.flowState==\'S\'">待发起</yu-tag>\
              </template>';
        }
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true,
        hidden: false
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        hidden: true
      }, {
        label: '流程标识',
        prop: 'flowSign',
        resizable: true,
        hidden: true
      }, {
        label: '系统编号',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '管理员机构',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '操作',
        width: 180,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
            <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'DELETE\')">删除</el-button>\
            <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'DETAIL\')">详情</el-button>\
            <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'TRACK\')">流程轨迹</el-button>\
          </template>';
        }
      }],
      height: yufp.frame.size().height - 103,
      trackDialogVisible: false,
      tracktitle: '流程轨迹',
      baseParams: {
        condition: JSON.stringify({})
      },
      workTravelData: {},
      nwfTrackPage: 'nwfTrackPage' + Date.now()
    };
  },
  methods: {
    customRowOp: function (scope, op) {
      // 表格操作按钮事件
      var _this = this; // 当前行号：scope.$index 当前行数据：scope.row 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');
      // console.log(scope.row.flowId);
      var param = {
        instanceId: scope.row.instanceId,
        mainInstanceId: scope.row.mainInstanceId,
        flowId: scope.row.flowId,
        bizParam: scope.row,
        type: 'DONE',
        returnBackFuncId: this.$route.name,
        nodeInfo: []
      };

      if (op == 'DETAIL') {
        // yufp.router.to('runInstanceInfo', param, cite.rootId);
        yufp.router.replace('runInstanceInfo', param)
      } else if (op == 'DELETE') {
        _this.deleteFn(scope.row);
      } else if (op == 'TRACK') {
        var params = {
          instanceId: scope.row.instanceId
        };
        yufp.service.request({
          method: 'GET',
          url: _this.urls.getNodeInfo,
          data: params,
          callback: function (code, message, response) {
            if (response.code == 0) {
              if (response.data != null) {
                param.nodeInfo = response.data;
                var flowId = scope.row.flowId;
                _this.workTravelData = param;
                _this.trackDialogVisible = true;
              }
            } else {
              _this.$message({
                duration: 4000,
                message: '获取数据异常:' + response.message.substring(0, 100),
                type: 'error'
              });
            }
          }
        });
      }
    },
    deleteFn: function (data) {
      var _this = this;

      var param = {
        bizId: data.bizId
      };

      _this.$confirm('确定要删除此流程实例么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        yufp.service.request({
          method: 'GET',
          url: _this.urls.deleteByBizId,
          data: param,
          callback: function (code, message, response) {
            if (response.code == 0) {
              if (response.data != null) {
                _this.$message({
                  duration: 6000,
                  message: response.data.tip,
                  type: 'success'
                });

                _this.$refs.reftable.remoteData();
              }
            } else {
              _this.$message({
                duration: 4000,
                message: '获取数据异常:' + response.message.substring(0, 100),
                type: 'error'
              });
            }
          }
        });
      }).catch(function () {
        _this.$message({
          duration: 6000,
          type: 'info',
          message: '已取消'
        });
      });
    },
    trackClose: function () {
      this.trackDialogVisible = false;
      this.workTravelData = {};
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function(valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            flowName: model.flowName ? '%' + model.flowName + '%' : "",
            instanceId: model.instanceId ? model.instanceId : "",
            bizId: model.bizId ? model.bizId : ""
          };

          var param = {
            condition: JSON.stringify(params)
          };

          _this.$refs.reftable.remoteData(param);
        }
      })
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }

}
</script>
