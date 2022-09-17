
<template>
  <div>
    <yu-panel title="我的待办" :collapse-hide="false">
      <yu-xform form-type="search" v-model="searchFormdata" ref="refForm" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="bizUserName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="发起人" placeholder="发起人" ctype="input" name="flowStarterName"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="bizUserId"></yu-xform-item>
          <yu-xform-item label="业务类型" placeholder="业务类型" ctype="select" name="bizType" data-code="FLOW_BIZ_TYPE" filterable></yu-xform-item>
          <yu-xform-item label="发起机构" placeholder="发起机构" :colspan="8" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'orgId':'orgId','managerBrIdName':'managerBrIdName'}" name="orgId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div style="margin-bottom: 20px">
        <el-button type="primary" @click="submitBatch" hidden>提交</el-button>
        <el-button type="primary" @click="changeBatch">批量移交</el-button>
        <el-button type="primary" @click="hangUpFn">挂起</el-button>
        <el-button type="primary" @click="wakeUpFn">唤醒</el-button>
      </div>
      <yu-xtable ref="refTable" row-number request-type="GET" condition-key="condition" :base-params="baseParams" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :data-url="urls.index" :default-load="true">
        <yu-xtable-column label="业务类型" prop="bizType" data-code="FLOW_BIZ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="bizId">
          <template slot-scope="scope">
              <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="rowDblclick(scope.row)">{{ scope.row.bizId }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="bizUserId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="bizUserName"></yu-xtable-column>
        <yu-xtable-column label="发起人" prop="flowStarterName"></yu-xtable-column>
        <yu-xtable-column label="发起机构" prop="orgName"></yu-xtable-column>
        <yu-xtable-column label="当前节点" prop="nodeName" ></yu-xtable-column>
        <yu-xtable-column label="当前处理人" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="上一处理节点" prop="lastNodeName"></yu-xtable-column>
        <yu-xtable-column label="流程开始时间" prop="startTime"></yu-xtable-column>
        <yu-xtable-column label="流程状态" prop="flowState">
          <template slot-scope="scope">
            <yu-tag type="success" v-if="scope.row.flowState=='E'">正常结束</yu-tag>
            <yu-tag type="danger" v-if="scope.row.flowState=='F'">否决</yu-tag>
            <yu-tag type="warning" v-if="scope.row.flowState=='H'">挂起</yu-tag>
            <yu-tag type="primary" v-if="scope.row.flowState=='P'">暂停</yu-tag>
            <yu-tag type="success" v-if="scope.row.flowState=='R'">运行中</yu-tag>
            <yu-tag type="gray" v-if="scope.row.flowState=='S'">待发起</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="是否加急" prop="urgentType">
          <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.urgentType=='9'">不加急</yu-tag>
            <yu-tag type="danger" v-if="scope.row.urgentType=='1'">管理岗加急</yu-tag>
            <yu-tag type="warning" v-if="scope.row.urgentType=='2'">客户经理加急</yu-tag>
            <yu-tag type="success" v-if="scope.row.urgentType=='3'">系统加急</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="操作" prop="operrate" width="100px">
          <template slot-scope="scope">
              <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="rowDblclick(scope.row)">审批</span>
          </template>
        </yu-xtable-column>
      </yu-xtable>
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

    <!-- 挂起原因 -->
    <yu-xdialog title="任务挂起" :visible.sync="dialogHangUpVisible" width="650px">
      <yu-xform ref="hangUpRefForm" label-width="80px" v-model="hangUpFormdata" :disabled="false">
        <yu-xform-group>
          <yu-xform-item label="挂起原因" name="optRemark" ctype="textarea" :rules="[{required:true,message:'字段不能为空',trigger:'blur'}]" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="hangUpSaveFn">挂起</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialogHangUpVisible = !dialogHangUpVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIZ_TYPES } from './commonbiztype';
import mixinList from '@/utils/mixins/mixin-list';
import { wflogdata } from '@/api/common/monitor';
yufp.lookup.reg('FLOW_BIZ_TYPE');
export default{
  mixins: [mixinList],
  data: function () {
    return {
      searchFormdata: {},
      urls: {
        change: backend.workflowService + '/api/core/changeBatch',
        getchangeUser: backend.workflowService + '/api/core/getChangeUsers',
        index: backend.workflowService + '/api/bench/todo'
      },
      // 查询当前办理人的待办
      baseParams: {},
      showUserDialog: false,
      Users: [],
      comments: [],
      currentOrgId: '',
      currentUserId: '',
      height: yufp.frame.size().height - 103,
      hangUpFormdata: {},
      dialogHangUpVisible: false
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  watch: {
    $route (to, from) {
      if (to.name === this.$route.name) {
        this.$refs.refTable.remoteData();
      }
    }
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode,
        excludeState: 'O-18'
      },
      sort: 'u.START_TIME asc'
    };
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
  },
  methods: {
    // 挂起(发起人)
    hangUpFn: function () {
      // 挂起操作
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selections[0].flowState != 'R') {
        this.$message({ message: '该流程处于非【运行中】状态，不允许挂起！', type: 'warning' });
        return;
      }
      _this.$confirm('确定要执行挂起操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        if (_this.$refs.hangUpRefForm) {
          _this.$refs.hangUpRefForm.resetFields();
        }
        _this.dialogHangUpVisible = true;
      }).catch(function () { });
    },
    // 挂起接口调用
    hangUpSaveFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      var param = {
        instanceId: selections[0].instanceId
      };
      let validate = false;
      _this.$refs.hangUpRefForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.service.request({
        method: 'GET',
        data: param,
        url: backend.workflowService + '/api/core/hangup',
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            _this.$message({
              message: response.data.tip + ';',
              type: 'success',
              duration: 6000
            });
            _this.saveNWfHpLogFn(selections[0]);
            _this.dialogHangUpVisible = false;
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({
              message: response.message + ';',
              type: 'error',
              duration: 6000
            });
          }
        }
      });
    },
    // 挂起日志记录
    saveNWfHpLogFn: function (row) {
      let _this = this;
      // 记录流程处理日志
      let logData = yufp.extend({}, row);
      logData.nodeStartTime = row.startTime;
      logData.nodeOptType = '03';
      logData.optRemark = _this.hangUpFormdata.optRemark
      wflogdata(logData);
    },
    // 唤醒日志记录
    saveNWfHxLogFn: function (row) {
      let _this = this;
      // 记录流程处理日志
      let logData = yufp.extend({}, row);
      logData.nodeStartTime = row.startTime;
      logData.nodeOptType = '04';
      wflogdata(logData);
    },
    wakeUpFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selections[0].flowState != 'H') {
        this.$message({ message: '该流程处于非【挂起】状态，不需要唤醒！', type: 'warning' });
        return;
      }
      _this.$confirm('确定要执行唤醒操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(function () {
          var param = {
            instanceId: selections[0].instanceId
          };
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.workflowService + '/api/core/wakeup',
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                _this.$message({
                  message: response.data.tip + ';',
                  type: 'success',
                  duration: 6000
                });
                _this.saveNWfHxLogFn(selections[0]);
                _this.$refs.refTable.remoteData();
              } else {
                _this.$message({
                  message: response.message + ';',
                  type: 'error',
                  duration: 6000
                });
              }
            }
          });
        }).catch(function () { });
    },
    rowDblclick: function (row) {
      // 往实例信息页面跳转
      var params = {
        instanceId: row.instanceId,
        nodeId: row.nodeId,
        userId: row.userId,
        partnerNo: row.bizId,
        serno: row.bizId,
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name
      };

      if (row.flowState == 'H') {
        this.$message({
          message: '流程实例处于挂起状态,无法进行操作!',
          type: 'warning'
        });
      } else {
        if (BIZ_TYPES && BIZ_TYPES.indexOf(row.bizType) > -1) {
          // this.$router.replace({ name: 'instanceInfo', params });
          this.$router.addTab({
            name: 'workflow/instance/common/instanceInfo',
            title: row.bizId,
            key: 'flow_todo_' + row.instanceId + new Date().getTime(),
            data: params,
            afterTabClose: () => {
              this.refresh();
            }
          });
        } else {
          // this.$router.replace({ name: 'instanceInfoOld', params });
          this.$router.addTab({
            name: 'workflow/instance/common/instanceInfoOld',
            title: row.bizId,
            key: 'flow_todo_' + row.instanceId + new Date().getTime(),
            data: params,
            afterTabClose: () => {
              this.refresh();
            }
          });
        }
        // 记录流程处理日志
        let logData = yufp.extend({}, row);
        logData.nodeStartTime = row.startTime;
        logData.nodeOptType = '02';
        wflogdata(logData);
      }
    },
    submitBatch: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length == 0) {
        _this.$message({ message: '请选择至少一项数据', type: 'error' });
      }
      if (_this.$refs.refTable.selections.length == 1) {
        _this.rowDblclick(_this.$refs.refTable.selections[0]);
      } else {
        var comments = [];
        var selections = _this.$refs.refTable.selections;
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
                _this.$refs.refTable.remoteData();
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
      if (_this.$refs.refTable.selections.length == 0) {
        _this.$message({ message: '请选择至少一项数据', type: 'error' });
      }
      var selections = _this.$refs.refTable.selections;
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
            _this.$refs.refTable.remoteData();
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
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'orgId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'orgId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    }
  }
};
</script>
