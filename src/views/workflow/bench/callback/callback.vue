
<template>
  <div>
    <yu-panel title="我的退回" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="bizUserName"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="bizUserId"></yu-xform-item>
          <yu-xform-item label="业务类型" placeholder="业务类型" ctype="select" name="bizType" data-code="FLOW_BIZ_TYPE"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px; margin-bottom: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <!--<div style="margin-bottom: 20px">
        <el-button type="primary" @click="submitBatch" hidden>提交</el-button>
        <el-button type="primary" @click="changeBatch">批量移交</el-button>
      </div>-->
      <el-table-x ref="reftable" :row-index="true" request-type="POST" checkbox :base-params="baseParams" @custom-detail-click="rowDblclick" :data-url="urls.index" :table-columns="tableColumns"></el-table-x>
    </yu-panel>
    <el-dialog title="转办人员选择" :visible.sync="showUserDialog">
        <yu-xtable ref="UserTableRef" :data="Users" border>
            <yu-xtable-column prop="userId" label="用户ID"></yu-xtable-column>
            <yu-xtable-column prop="userName" label="姓名"></yu-xtable-column>
        </yu-xtable>
        <div style="margin-top: 20px" align="center">
            <el-button type="primary" @click="changeFn">确定转办</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIZ_TYPES } from '../todo/commonbiztype';
export default {
  data: function () {
    return {
      formdata: {},
      urls: {
        change: backend.workflowService + '/api/core/changeBatch',
        getchangeUser: backend.workflowService + '/api/core/getChangeUsers',
        index: backend.workflowService + '/api/custom/bench/callback'
      },
      tableColumns: [
        // {
        //   label: '流程实例号',
        //   prop: 'instanceId',
        //   resizable: true,
        //   template: function () {
        //     return '<template slot-scope="scope">\
        //                         <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">{{scope.row.instanceId}}</span>\
        //                     </template>';
        //   }
        // },
        {
          label: '业务类型',
          prop: 'bizType',
          resizable: true,
          dataCode: 'FLOW_BIZ_TYPE'
        },
        {
          label: '业务流水号',
          prop: 'bizId',
          resizable: true,
          template: function () {
            return '<template slot-scope="scope">\
                                <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">{{scope.row.bizId}}</span>\
                            </template>';
          }
        },
        {
          label: '流程名称',
          prop: 'flowName',
          resizable: true,
          hidden: true
        },
        {
          label: '流程编号',
          prop: 'flowId',
          resizable: true,
          hidden: true
        },
        {
          label: '流程管理员',
          prop: 'flowAdmin',
          resizable: true,
          hidden: true
        },
        {
          label: '发起人',
          prop: 'flowStarter',
          resizable: true
        },
        {
          label: '流程发起时间',
          prop: 'startTime',
          resizable: true,
          hidden: true
        },
        {
          label: '系统编号',
          prop: 'systemId',
          resizable: true,
          hidden: true
        },
        {
          label: '发起人机构编号',
          prop: 'orgId',
          resizable: true,
          hidden: true
        },
        {
          label: '客户编号',
          prop: 'bizUserId',
          resizable: true
        },
        {
          label: '客户名称',
          prop: 'bizUserName',
          resizable: true
        },
        {
          label: '当前节点编号',
          prop: 'nodeId',
          resizable: true,
          hidden: true
        },
        {
          label: '当前节点',
          prop: 'nodeName',
          resizable: true
        },
        {
          label: '节点处理人',
          prop: 'userId',
          resizable: true,
          hidden: true
        },
        {
          label: '当前处理人',
          prop: 'userName',
          resizable: true
        },
        {
          label: '流程开始时间',
          prop: 'startTime',
          resizable: true
        },
        {
          label: '上一节点',
          prop: 'lastNodeId',
          resizable: true,
          hidden: true
        },
        {
          label: '上一节点',
          prop: 'lastNodeName',
          resizable: true
        },
        {
          label: '上一节点处理人',
          prop: 'lastUserId',
          resizable: true,
          hidden: true
        },
        {
          label: '上一节点处理人',
          prop: 'lastUserName',
          resizable: true
        },
        {
          label: '上一节点审批结果',
          prop: 'nodeState',
          resizable: true,
          align: 'center',
          template: function () {
            return '<template slot-scope="scope">\
            <yu-tag type="gray" v-if="scope.row.nodeState==\'O-0\'">拿回</yu-tag>\
            <yu-tag type="danger" v-if="scope.row.nodeState==\'O-1\'">打回</yu-tag>\
            <yu-tag type="warning" v-if="scope.row.nodeState==\'O-2\'">退回</yu-tag>\
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
          }
        },
        {
          label: '签收状态',
          prop: 'signIn',
          resizable: true,
          align: 'center',
          width: 100,
          template: function () {
            return '<template slot-scope="scope">\
                <yu-tag type="gray" v-if="scope.row.signIn==0">无需签收</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.signIn==1">未签收</yu-tag>\
                <yu-tag type="success" v-if="scope.row.signIn==2">已签收</yu-tag>\
                </template>';
          },
          hidden: true
        },
        {
          label: '流程状态',
          prop: 'flowState',
          resizable: true,
          align: 'center',
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
        },
        {
          label: '流程参数',
          prop: 'flowParam',
          resizable: true,
          hidden: true
        }
      ],
      opNames: [
        {
          // 操作权限常量列表
          label: '同意',
          value: 'O-12'
        },
        {
          label: '拿回',
          value: 'O-0'
        },
        {
          label: '打回',
          value: 'O-1'
        },
        {
          label: '退回',
          value: 'O-2'
        },
        {
          label: '催办',
          value: 'O-5'
        },
        {
          label: '转办',
          value: 'O-6'
        },
        {
          label: '协办',
          value: 'O-7'
        },
        {
          label: '否决',
          value: 'O-8'
        },
        {
          label: '跳转',
          value: 'O-9'
        },
        {
          label: '挂起',
          value: 'O-10'
        },
        {
          label: '唤醒',
          value: 'O-11'
        }
      ],
      // 查询当前办理人的待办
      baseParams: {},
      showUserDialog: false,
      Users: [],
      comments: [],
      currentOrgId: '',
      currentUserId: '',
      height: yufp.frame.size().height - 103
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  watch: {
    $route (to, from) {
      if (to.name === this.$route.name) {
        this.$refs.reftable.remoteData();
      }
    }
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode,
        nodeState: 'O-1,O-2'
      },
      sort: 'u.START_TIME DESC'
    };
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
  },
  methods: {
    rowDblclick: function (row, event) {
      // 往实例信息页面跳转
      var params = {
        instanceId: row.instanceId,
        nodeId: row.nodeId,
        userId: row.userId,
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name,
        flowEdit: true
      };

      if (row.flowState == 'H') {
        this.$message({
          message: '流程实例处于挂起状态,无法进行操作!',
          type: 'warning'
        });
      } else {
        if (BIZ_TYPES && BIZ_TYPES.indexOf(row.bizType) > -1) {
          this.$router.replace({ name: 'instanceInfo', params });
        } else {
          this.$router.replace({ name: 'instanceInfoCallback', params });
        }
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            flowName: model.flowName ? '%' + model.flowName + '%' : '',
            instanceId: model.instanceId ? model.instanceId : '',
            bizId: model.bizId ? model.bizId : '',
            bizUserName: model.bizUserName ? '%' + model.bizUserName + '%' : '',
            bizUserId: model.bizUserId ? model.bizUserId : '',
            bizType: model.bizType ? model.bizType : ''
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
    },
    submitBatch: function () {
      var _this = this;
      if (_this.$refs.reftable.selections.length == 0) {
        _this.$message({ message: '请选择至少一项数据', type: 'error' });
      }
      if (_this.$refs.reftable.selections.length == 1) {
        _this.rowDblclick(_this.$refs.reftable.selections[0]);
      } else {
        var comments = [];
        var selections = _this.$refs.reftable.selections;
        var nodeId = selections[0].nodeId;
        var bizType = selections[0].bizType;
        for (var i = 0; i < selections.length; i++) {
          if (nodeId != selections[i].nodeId) {
            _this.$message({
              message: '请选择相同审批节点的数据',
              type: 'error'
            });
            return false;
          }
          if (bizType != selections[i].bizType) {
            _this.$message({
              message: '请选择相同业务类型的数据',
              type: 'error'
            });
            return false;
          }
          var commentInfo = {
            instanceId: selections[i].instanceId,
            nodeId: selections[i].nodeId,
            userId: _this.currentUserId,
            commentId: '',
            commentSign: 'O-12',
            userComment: '【同意】',
            ext: '无'
          };
          comments.push(commentInfo);
        }
        var param = {
          orgId: yufp.session.org.id,
          comments: comments
        };
        yufp.service.request({
          method: 'POST',
          data: param,
          url: backend.workflowService + '/api/core/submitBatch',
          callback: function (code, message, response) {
            if (
              response.code == '0' &&
              response.data &&
              response.data.length > 0
            ) {
              for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].code === '1') {
                  // 提交失败
                  _this.$message({
                    message: response.data[i].tip,
                    type: 'error'
                  });
                } else if (response.data[i].code === 'E') {
                  // 正常结束
                  _this.$message({
                    message: response.data[i].tip,
                    type: 'success'
                  });
                } else {
                  var msg =
                    response.data[i].tip +
                    ';下一节点：' +
                    response.data[i].nodeName +
                    '@办理人员：' +
                    response.data[i].userNames;
                  _this.$message({ message: msg, type: 'success' });
                }
                _this.$refs.reftable.remoteData();
              }
            } else {
              if (response.message != null) {
                _this.$message({
                  duration: 6000,
                  message: '提交异常:' + response.message,
                  type: 'error'
                });
              } else {
                _this.$message({
                  duration: 6000,
                  message: '提交异常!',
                  type: 'error'
                });
              }
            }
          }
        });
      }
    },
    getChangeUser: function (param) {
      // 获取转办可选的办理人员
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.getchangeUser,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              // 跳转到之前的页面
              _this.Users = response.data;
              _this.showUserDialog = true;
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到可转办人员',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取转办人员异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    changeBatch: function () {
      var _this = this;
      if (_this.$refs.reftable.selections.length == 0) {
        _this.$message({ message: '请选择至少一项数据', type: 'error' });
      }
      var selections = _this.$refs.reftable.selections;
      var nodeId = selections[0].nodeId;
      var bizType = selections[0].bizType;
      for (var i = 0; i < selections.length; i++) {
        if (nodeId != selections[i].nodeId) {
          _this.$message({
            message: '请选择相同审批节点的数据',
            type: 'error'
          });
          return false;
        }
        if (bizType != selections[i].bizType) {
          _this.$message({
            message: '请选择相同业务类型的数据',
            type: 'error'
          });
          return false;
        }
        var commentInfo = {
          instanceId: selections[i].instanceId,
          nodeId: selections[i].nodeId,
          userId: _this.currentUserId,
          commentId: '',
          commentSign: 'O-6',
          userComment: '【转办】',
          ext: '无'
        };
        _this.comments.push(commentInfo);
      }
      var param = {
        orgId: _this.currentOrgId,
        instanceId: selections[0].instanceId,
        nodeId: selections[0].nodeId,
        userId: _this.currentUserId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: backend.workflowService + '/api/core/getNodeAction',
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              // 跳转到之前的页面
              var nodeAction = response.data;
              if (nodeAction.change == '0') {
                _this.$message({ message: '没有转办权限', type: 'error' });
              } else {
                _this.getChangeUser(param);
              }
            }
          }
        }
      });
    },
    changeFn: function () {
      var _this = this;
      if (_this.$refs.UserTableRef.selections.length == 0) {
        _this.$message({ message: '请选择至少一项数据', type: 'error' });
        return;
      }
      var selection = _this.$refs.UserTableRef.selections[0];
      var params = {
        orgId: yufp.session.org.id,
        comment: _this.comments,
        changeUserId: selection.userId
      };
      yufp.service.request({
        method: 'POST',
        data: params,
        url: _this.urls.change,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            if (response.data.code === '1') {
              // 失败
              _this.$message({ message: response.data.tip, type: 'error' });
            } else {
              var msg =
                response.data.tip;
              _this.$message({ message: msg, type: 'success' });
            }
            _this.showUserDialog = false;
            _this.comments = [];
            _this.$refs.reftable.remoteData();
          } else {
            if (response.message != null) {
              _this.$message({
                duration: 6000,
                message: '提交异常:' + response.message,
                type: 'error'
              });
            } else {
              _this.$message({
                duration: 6000,
                message: '提交异常!',
                type: 'error'
              });
            }
          }
        }
      });
    }
  }
};
</script>
