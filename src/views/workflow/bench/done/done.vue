
<template>
  <div>
    <yu-panel title="我的已办" :collapse-hide="false">
      <yu-xform form-type="search" v-model="formdata" related-table-name="reftable" ref="searchForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="bizUserName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="发起人" placeholder="发起人" ctype="input" name="flowStarterName"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="bizUserId"></yu-xform-item>
          <yu-xform-item label="业务类型" placeholder="业务类型" ctype="select" name="bizType" data-code="FLOW_BIZ_TYPE" filterable></yu-xform-item>
          <yu-xform-item label="发起机构" placeholder="发起机构" :colspan="8" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'orgId':'orgId','managerBrIdName':'managerBrIdName'}" name="orgId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-detail-click="rowDblclick"></el-table-x>
    </yu-panel>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIZ_TYPES } from '@/views/workflow/bench/todo/commonbiztype';
export default {
  data: function () {
    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/bench/done'
      },
      tableColumns: [
      // {
      //   label: '流程实例号',
      //   prop: 'instanceId',
      //   resizable: true,
      //   template: function () {
      //     return '<template slot-scope="scope">\
      //                           <span style="color:red;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">{{scope.row.instanceId}}</span>\
      //                       </template>';
      //   }
      // },
        {
          label: '业务类型',
          prop: 'bizType',
          resizable: true,
          dataCode: 'FLOW_BIZ_TYPE'
        }, {
          label: '业务流水号',
          prop: 'bizId',
          resizable: true,
          template: function () {
            return '<template slot-scope="scope">\
                              <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">{{scope.row.bizId}}</span>\
                          </template>';
          }
        }, {
          label: '客户编号',
          prop: 'bizUserId',
          resizable: true
        }, {
          label: '客户名称',
          prop: 'bizUserName',
          resizable: true
        }, {
          label: '流程名称',
          prop: 'flowName',
          resizable: true,
          hidden: true
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
          label: '发起人',
          prop: 'flowStarterName',
          resizable: true
        }, {
          label: '系统编号',
          prop: 'systemId',
          resizable: true,
          hidden: true
        }, {
          label: '发起机构',
          prop: 'orgName',
          resizable: true
        }, {
          label: '节点编号',
          prop: 'nodeId',
          resizable: true,
          hidden: true
        }, {
          label: '审批节点',
          prop: 'nodeName',
          resizable: true,
          hidden: true
        }, {
          label: '处理人编号',
          prop: 'userId',
          resizable: true,
          hidden: true
        }, {
          label: '流程开始时间',
          prop: 'startTime',
          resizable: true
        }, {
          label: '当前节点',
          prop: 'nodeName',
          resizable: true
        }, {
          label: '当前处理人',
          prop: 'userName',
          resizable: true
        }, {
          label: '上一节点编号',
          prop: 'lastNodeId',
          resizable: true,
          hidden: true
        }, {
          label: '上一节点',
          prop: 'lastNodeName',
          resizable: true,
          hidden: true
        }, {
          label: '上一节点处理人',
          prop: 'lastUserId',
          resizable: true,
          hidden: true
        }, {
          label: '上一处理人',
          prop: 'lastUserName',
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
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-18\'">再议</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-14\'">正常结束</yu-tag>\
                </template>';
          },
          hidden: true
        }, {
          label: '流程参数',
          prop: 'flowParam',
          resizable: true,
          hidden: true
        }, {
          label: '流程状态',
          prop: 'flowState',
          resizable: true,
          template: function () {
            return '<template slot-scope="scope">\
                <yu-tag type="success" v-if="scope.row.flowState==\'E\'">正常结束</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.flowState==\'F\'">否决</yu-tag>\
                <yu-tag type="warning" v-if="scope.row.flowState==\'H\'">挂起</yu-tag>\
                <yu-tag type="primary" v-if="scope.row.flowState==\'P\'">暂停</yu-tag>\
                <yu-tag type="success" v-if="scope.row.flowState==\'R\'">运行中</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.flowState==\'S\'">待发起</yu-tag>\
                </template>';
          },
          hidden: true
        }, {
          label: '操作',
          resizable: true,
          width: 60,
          template: function () {
            return '<template slot-scope="scope">\
                              <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">查看</span>\
                          </template>';
          }
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
        takeBack: '1',
        urged: '1',
        recall: '0',
        activate: '0'
      };
      var param = {
        serno: row.bizId, // 实例详情页面新增传值 业务主键
        instanceId: row.instanceId,
        userId: row.userId,
        nodeId: row.nodeId,
        type: 'DONE',
        button: button,
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name
      };

      if (row.flowState == 'H') {
        _this.$message({
          message: '流程实例处于挂起状态,无法进行操作!',
          type: 'warning'
        });
      } else {
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
      }
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.formdata[mapping[item]] = data.loginCode;
          } else if (item === 'orgId') {
            this.formdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.formdata[item] = data.loginCode;
          } else if (item === 'orgId') {
            this.formdata[item] = data.orgCode;
          }
        }
      }
    }
  }

};
</script>
