
<template>
  <div>
    <yu-panel title="我的否決" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="发起人" placeholder="发起人" ctype="input" name="flowStarterName"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-detail-click="rowDblclick"></el-table-x>
    </yu-panel>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: function () {
    var _this = this;

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/bench/his'
      },
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
                                <span style="color:red;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">{{scope.row.instanceId}}</span>\
                            </template>';
        }
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true
      }, {
        label: '发起人',
        prop: 'flowStarterName',
        resizable: true
      }, {
        label: '客户名称',
        prop: 'bizUserName',
        resizable: true
      }, {
        label: '客户编号',
        prop: 'bizUserId',
        resizable: true
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '结束时间',
        prop: 'endTime',
        resizable: true
      }, // { label: '耗时', prop: 'countTime', resizable: true ,align:'center'},
      {
        label: '审批节点编号',
        prop: 'nodeId',
        resizable: true
      }, {
        label: '审批节点名称',
        prop: 'nodeName',
        resizable: true
      }, {
        label: '系统编号',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '发起人机构编号',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '节点审批结果',
        prop: 'nodeState',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-0\'">拿回</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.nodeState==\'O-1\'">打回</yu-tag>\
                <yu-tag type="warning" v-if="scope.row.nodeState==\'O-2\'">退回</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-3\'">挂起</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-4\'">唤醒</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-5\'">催办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-6\'">转办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-7\'">协办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-9\'">跳转</yu-tag>\
                <yu-tag type="success" v-if="scope.row.nodeState==\'O-12\'">同意</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-15\'">撤回</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-10\'">委托</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-16\'">发起</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-13\'">自动提交</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-8\'">否决</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-14\'">正常结束</yu-tag>\
                </template>';
        }
      }, {
        label: '流程状态',
        prop: 'flowState',
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
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        hidden: true
      }],
      baseParams: {},
      height: yufp.frame.size().height - 103
    };
  },
  computed: {
    ...mapGetters([
      'userCode'
    ])
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode,
        nodeState: 'O-8'
      }
    };
  },
  methods: {
    rowDblclick: function (row, event) {
      // 往实例信息页面跳转
      var button = {
        hungUp: '0',
        takeBack: '0',
        urged: '0',
        activate: '0'
      };
      var param = {
        instanceId: row.instanceId,
        userId: row.userId,
        type: 'HIS',
        isShow: 1,
        button: button,
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name
      };

      if (row.flowState == 'H') {
        this.$message({
          message: '流程实例处于挂起状态,无法进行操作!',
          type: 'warning'
        });
      } else {
        // this.$router.replace({ name: 'instanceInfoLite', params: param });
        this.$router.addTab({
          name: 'workflow/instance/common/instanceInfoLite',
          title: row.bizId,
          key: 'flow_todo_' + row.instanceId,
          data: param,
          afterTabClose: () => {
            this.refresh();
          }
        });
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            flowStarterName: model.flowStarterName ? '%' + model.flowStarterName + '%' : '',
            instanceId: model.instanceId ? model.instanceId : '',
            bizId: model.bizId ? model.bizId : ''
          };

          var param = {
            condition: JSON.stringify(params)
          };

          _this.$refs.reftable.remoteData(param);
        }
      });
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }

};
</script>
