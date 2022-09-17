<template>
  <div>
    <yu-panel title="办结实例监控" :collapse-hide="false">
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

    <el-dialog-x :title="tracktitle" :visible.sync="trackDialogVisible" height="400px">
      <el-row>
        <el-col>
          <div id="nwfTrackPage">
            <work-travel :work-travel-data="workTravelData"></work-travel>
            <!-- <router-view /> -->
          </div>
        </el-col>
      </el-row>
    </el-dialog-x>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import workTravel from '@/views/workflow/studio/wfmonitor/workTravel/workTravel.vue'
const cite = {}
export default {
  name: 'wfendinstance',
  components: { workTravel },
  data: function () {
    var _this = this;

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/monitor/his',
        activate: backend.workflowService + '/api/core/activate'
      },
      workTravelData: null,
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true
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
        resizable: true,
        hidden: false,
        width: 60
      }, {
        label: '发起人',
        prop: 'flowStarterName',
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
        label: '结束时间',
        prop: 'endTime',
        resizable: true,
        hidden: false
      }, {
        label: '系统编号',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        hidden: false
      }, {
        label: '管理员机构id',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '操作',
        width: 180,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'DETAIL\')">详情</el-button>\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'TRACK\')">流程轨迹</el-button>\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'ACTIVATE\')">激活</el-button>\
                </template>';
        }
      }],
      baseParams: {
        condition: JSON.stringify()
      },
      height: yufp.frame.size().height - 103,
      trackDialogVisible: false,
      tracktitle: '流程轨迹',
      nwfTrackPage: 'nwfTrackPage'
    };
  },
  computed: {
    ...mapGetters(['userCode'])
  },
  methods: {
    customRowOp: function (scope, op) {
      // 表格操作按钮事件
      var _this = this; // 当前行号：scope.$index 当前行数据：scope.row 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');
      // console.log(scope.row.flowId);


      var param = {
        instanceId: scope.row.instanceId,
        bizParam: scope.row,
        flowId: scope.row.flowId,
        type: 'HIS',
        returnBackFuncId: this.$route.name
      };
      if (op == 'DETAIL') {
        yufp.router.replace('runInstanceInfo', param)
      } else if (op == 'ACTIVATE') {
        _this.activateFn(scope.row.instanceId);
      } else if (op == 'TRACK') {
        _this.trackDialogVisible = true;
        var flowId = scope.row.flowId;
        var routeId = 'router_flow_' + flowId;
        var url = 'workflow/studio/wfmonitor/wfendinstance/workTravel'; // 判断路由是否已经存在

        _this.workTravelData = param;
        _this.$nextTick(function () {
          try {
            // this.$router.push(url)
            // yufp.router.to(routeId, param, _this.nwfTrackPage);
          } catch (e) {}
        });
      }
    },
    // 将已结束的-否决的流程激活重新办理
    activateFn: function (instanceId) {
      var _this = this;

      _this.$confirm('确定要执行激活操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        var param = {
          instanceId: instanceId,
          currentUserId: _this.userCode
        };
        yufp.service.request({
          method: 'GET',
          data: param,
          url: _this.urls.activate,
          callback: function (code, message, response) {
            if (response.code == 0) {
              // 跳转到之前的页面
              _this.$refs.reftable.remoteData();

              _this.$message({
                message: response.data.tip + ';',
                type: 'success',
                duration: 4000
              });
            } else {
              _this.$message({
                message: response.message + ';',
                type: 'error',
                duration: 4000
              });
            }
          }
        });
      }).catch(function () {});
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
