
<template>
  <yu-panel title="我的抄送" :collapse-hide="false">
    <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
      <yu-xform-group :column="4">
        <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
        <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
        <yu-xform-item label="节点编号" placeholder="节点编号" ctype="input" name="nodeId"></yu-xform-item>
        <div slot="custom" class="btn-group">
          <yu-button-group style="margin-left: 10px;">
            <yu-button type="primary" @click="searchFn">查询</yu-button>
            <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
          </yu-button-group>
        </div>
      </yu-xform-group>
    </yu-xform>
    <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" @custom-detail-click="rowDblclick" :data-url="urls.index" :table-columns="tableColumns"></el-table-x>
  </yu-panel>
</template>
<script>
import { mapGetters } from "vuex"
import { BIZ_TYPES } from "@/views/workflow/bench/todo/commonbiztype"
export default {
  data: function () {
    var _this = this;

    return {
      urls: {
        index: backend.workflowService + '/api/bench/copy'
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
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        hidden: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true
      }, {
        label: '客户名称',
        prop: 'bizUserName',
        resizable: true
      }, {
        label: '客户用户名',
        prop: 'bizUserId',
        resizable: true
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '节点处理人',
        prop: 'userId',
        resizable: true
      }, {
        label: '节点编号',
        prop: 'nodeId',
        resizable: true
      }, {
        label: '节点处理人',
        prop: 'userName',
        hidden: true,
        resizable: true
      }, {
        label: '上一节点审批结果',
        prop: 'nodeState',
        resizable: true,
        hidden: true,
        align: 'center',
        template: function () {
          return '<template slot-scope="scope">\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-0\'">拿回</span>\
                <span style="color:red;" v-if="scope.row.nodeState==\'O-1\'">打回</span>\
                <span style="color:orange;" v-if="scope.row.nodeState==\'O-2\'">退回</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-5\'">催办</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-6\'">转办</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-7\'">协办</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-9\'">跳转</span>\
                <span style="color:green;" v-if="scope.row.nodeState==\'O-12\'">同意</span>\
                </template>';
        }
      }, {
        label: '流程编号',
        prop: 'flowId',
        resizable: true,
        hidden: true
      }, {
        label: '流程管理员',
        prop: 'flowAdmin',
        resizable: true,
        hidden: true
      }, {
        label: '流程发起者',
        prop: 'flowStarter',
        resizable: true,
        hidden: false
      }, {
        label: '流程发起时间',
        prop: 'startTime',
        resizable: true,
        hidden: true
      }, {
        label: '系统编号',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '发起人机构',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '流程状态',
        prop: 'flowState',
        resizable: true,
        hidden: false,
        template: function () {
          return '<template slot-scope="scope">\
                <yu-tag type="success" v-if="scope.row.flowState==\'E\'">结束</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.flowState==\'F\'">否决</yu-tag>\
                <yu-tag type="success" v-if="scope.row.flowState==\'R\'">运行中</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.flowState==\'S\'">待发起</yu-tag>\
                </template>';
        }
      }, {
        label: '流程参数',
        prop: 'flowParam',
        resizable: true,
        hidden: true
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true
      }],
      formdata: {},
      baseParams: {},
      height: yufp.frame.size().height - 103
    };
  },
  computed: {
    ...mapGetters([
      "userCode"
    ])
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode
      }
    }
  },
  methods: {
    rowDblclick: function (row, event) {
      // 往实例信息页面跳转
      var _this = this;

      if (row.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var param = {
        instanceId: row.instanceId,
        userId: row.userId,
        nodeId: row.nodeId,
        isShow: 1,
        type: 'DONE',
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name
      };
      if (BIZ_TYPES && BIZ_TYPES.indexOf(row.bizType) > -1) {
        this.$router.replace({ name: 'instanceInfo', params: param });
      } else {
        this.$router.replace({ name: 'instanceInfoLite', params: param });
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function(valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            bizId: model.bizId ? '%' + model.bizId + '%' : "",
            instanceId: model.instanceId ? model.instanceId : "",
            nodeId: model.nodeId ? model.nodeId : ""
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
