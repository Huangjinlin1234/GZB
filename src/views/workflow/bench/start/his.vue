
<template>
  <div>
    <yu-panel title="我的已办" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="bizUserName"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="bizUserId"></yu-xform-item>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIZ_TYPES } from '@/views/workflow/bench/todo/commonbiztype';
export default {
  data: function () {
    var _this = this;

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/bench/start/his'
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
        resizable: true
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
        resizable: true
      }, {
        label: '流程发起者姓名',
        prop: 'flowStarterName',
        resizable: true
      }, {
        label: '流程发起时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '流程结束时间',
        prop: 'endTime',
        resizable: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
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
        label: '流程参数',
        prop: 'flowParam',
        resizable: true,
        hidden: true
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
        dataCode: 'FLOW_BIZ_TYPE'
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
        userId: this.userCode
      }
    };
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

      var button = {
        hungUp: '0',
        tackBack: '0',
        urged: '0',
        recall: '0',
        activate: '1'
      };
      var param = {
        instanceId: row.instanceId,
        userId: row.userId,
        type: 'HIS',
        button: button,
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name
      };
      if (BIZ_TYPES && BIZ_TYPES.indexOf(row.bizType) > -1) {
        // this.$router.replace({ name: 'instanceInfo', params: param });
        this.$router.addTab({
          name: 'workflow/instance/common/instanceInfo',
          title: row.bizId,
          key: 'flow_todo_' + row.instanceId,
          data: param,
          afterTabClose: () => {
            this.refresh();
          }
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
            flowName: model.flowName ? '%' + model.flowName + '%' : '',
            bizUserName: model.bizUserName ? '%' + model.bizUserName + '%' : '',
            instanceId: model.instanceId ? model.instanceId : '',
            bizUserId: model.bizUserId ? model.bizUserId : '',
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
