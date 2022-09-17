
<template>
  <div>
    <yu-panel title="人员待办监控" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="当前处理人" placeholder="当前处理人" ctype="input" name="userName"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      
      <el-table-x ref="reftable" :row-index="true" @custom-row-op="customRowOp" :data-url="urls.index" :table-columns="tableColumns">
      </el-table-x>
    </yu-panel>
    <el-dialog :title="UserSelect[title]" :visible.sync="UserSelect.showUserDialog" @open="submitbefore">
      <el-card class="box-card" v-show="true">
        <el-tag v-for="tag in UserSelect.SelectUsers" :key="tag.userId" type="success" closable @close="TagClose(tag)">
          {{ tag.userName }}
        </el-tag>
      </el-card>
      <el-table ref="UserTableRef" :data="UserSelect.Users" @row-dblclick="RowDbClick">
        <el-table-column prop="userId" label="用户编号" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户姓名" align="center">
        </el-table-column>
      </el-table>
      <el-pagination small layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :current-page="currentPage" :total="total" @current-change="CurrentChange" @size-change="SizeChange">
      </el-pagination>
      <div style="margin-top: 20px" align="center">
        <el-button type="primary" @click="UserDialogClose">确 定</el-button>
        <el-button type="primary" @click="UserSelect.showUserDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data: function () {
    var _this = this;

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/monitor/userTodo',
        resetNodeUser: backend.workflowService + '/api/core/resetNodeUser'
      },
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        hidden: false
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
        hidden: true
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
        label: '发起人机构编号',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '当前节点编号',
        prop: 'nodeId',
        resizable: true,
        hidden: true
      }, {
        label: '当前节点',
        prop: 'nodeName',
        resizable: true
      }, {
        label: '节点处理人',
        prop: 'userId',
        resizable: true,
        hidden: true
      }, {
        label: '当前处理人',
        prop: 'userName',
        resizable: true
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '上一节点',
        prop: 'lastNodeId',
        resizable: true,
        hidden: true
      }, {
        label: '上一节点',
        prop: 'lastNodeName',
        resizable: true
      }, {
        label: '上一节点处理人',
        prop: 'lastUserId',
        resizable: true,
        hidden: true
      }, {
        label: '上一处理人',
        prop: 'lastUserName',
        resizable: true
      }, {
        label: '上一节点审批结果',
        prop: 'nodeState',
        resizable: true,
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
                </template>';
        }
      }, {
        label: '签收状态',
        prop: 'signIn',
        resizable: true,
        hidden: true,
        template: function () {
          return '<template slot-scope="scope">\
                <span style="color:#55557f;" v-if="scope.row.signIn==0">无需签收</span>\
                <span style="color:#ff5500;" v-if="scope.row.signIn==1">未签收</span>\
                <span style="color:green;" v-if="scope.row.signIn==2">已签收</span>\
                </template>';
        }
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
        }
      }, {
        label: '流程参数',
        prop: 'flowParam',
        resizable: true,
        hidden: true
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        hidden: false
      }, {
        label: '操作',
        width: 120,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
            <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'RESET\')">重置节点处理人</el-button>\
          </template>';
        }
      }],
      height: yufp.frame.size().height - 103,
      baseParams: {
        instanceId: '',
        nodeId: ''
      },
      UserSelect: {
        reset: '选择重置后的节点办理人员',
        showUserDialog: false,
        userUrl: backend.workflowService + '/api/org/users',
        Users: [],
        SelectUsers: []
      },
      title: 'reset',
      pagesize: 10,
      currentPage: 1,
      total: 0
    };
  },
  computed: {
    ...mapGetters(['orgCode'])
  },
  methods: {
    customRowOp: function (scope, op) {
      // 表格操作按钮事件
      var _this = this; // 当前行号：scope.$index 当前行数据：scope.row 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');


      if (op == 'RESET') {
        _this.title == 'reset';
        _this.baseParams.instanceId = scope.row.instanceId;
        _this.baseParams.nodeId = scope.row.nodeId;

        _this.getUserInfo();

        _this.UserSelect.showUserDialog = true;
      }
    },
    // 重置节点办理人
    getUserInfo: function () {
      var param = {
        condition: JSON.stringify({
          orgId: this.orgCode,
          systemId: 'cmis'
        }),
        page: this.currentPage,
        size: this.pagesize
      };

      var _this = this;

      yufp.service.request({
        method: 'GET',
        data: param,
        url: _this.UserSelect.userUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            if (response.data) {
              _this.total = response.total;
              _this.UserSelect.Users = response.data;
            } else {
              _this.$message({
                message: '获取办理人员列表为空;',
                type: 'error',
                duration: 4000
              });
            }
          } else {
            _this.$message({
              message: '获取办理人员列表出错' + response.message + ';',
              type: 'error',
              duration: 6000
            });
          }
        }
      });
    },
    // 人员选择弹框
    submitbefore: function () {
      this.UserSelect.Users = [];
      this.UserSelect.SelectUsers = [];
      this.currentPage = 1;
      this.pagesize = 10;
      this.total = 0;
    },
    RowDbClick: function (row, event) {
      var user = {
        userId: row.userId,
        userName: row.userName
      };

      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }

      var userInfosT = this.UserSelect.SelectUsers;

      for (var i = 0; i < userInfosT.length; i++) {
        // 去重
        if (userInfosT[i].userId == row.userId) {
          return;
        }
      }

      userInfosT.push(user);
    },
    // 页签关闭
    TagClose: function (tag) {
      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }

      var userInfosT = this.UserSelect.SelectUsers;
      userInfosT.splice(userInfosT.indexOf(tag), 1);
    },
    UserDialogClose: function () {
      var userName = '';
      var userId = '';

      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }

      var userInfosT = this.UserSelect.SelectUsers;

      for (var i = 0; i < userInfosT.length; i++) {
        userId += userInfosT[i].userId;
        userName = userName + userInfosT[i].userName + ';';
      }

      var _this = this;

      var param = {
        instanceId: _this.baseParams.instanceId,
        nodeId: _this.baseParams.nodeId,
        userId: userId
      };

      _this.$confirm('确定要重置当前节点办理人员吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        _this.$nextTick(function () {
          _this.UserSelect.showUserDialog = false;
          yufp.service.request({
            method: 'POST',
            data: param,
            url: _this.urls.resetNodeUser,
            callback: function (code, message, response) {
              if (response.code == 0) {
                //
                _this.$message({
                  message: response.data.tip + ';',
                  type: 'success',
                  duration: 6000
                });

                _this.$refs.reftable.remoteData();
              } else {
                _this.$message({
                  message: '节点办理人重置异常:' + response.message + ';',
                  type: 'error',
                  duration: 6000
                });
              }
            }
          });
        });
      }).catch(function () {
        _this.$message({
          message: '已取消;',
          type: 'info',
          duration: 2000
        });
      });
    },
    CurrentChange: function (cpage) {
      this.currentPage = cpage;
      this.getUserInfo();
    },
    SizeChange: function (psize) {
      this.pagesize = psize;
      this.getUserInfo();
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function(valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            flowName: model.flowName ? '%' + model.flowName + '%' : "",
            userName: model.userName ? '%' + model.userName + '%' : "",
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
