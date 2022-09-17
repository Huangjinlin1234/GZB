
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会议组织</span>
      </div>
      <el-form :model="meetForm" :rules="rules" ref="refForm" label-width="100px" align="center" style="margin-left: 100px;margin-right: 100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="会议安排人" prop="userId" align="center">
              <el-input v-model="meetForm.userId" placeholder="" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议组织时间" prop="startTime" align="center">
              <el-input v-model="meetForm.startTime" placeholder="" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审批模式" prop="meetType" align="center">
              <el-select v-model="meetForm.meetType" clearable disabled>
                <el-option v-for="item in meetTypes" :key="item.key" :value="item.key" :label="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议状态" prop="mettingSts" align="center">
              <el-select v-model="meetForm.mettingSts" clearable disabled>
                <el-option v-for="item in mettingStsOptions" :key="item.key" :value="item.key" :label="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参与审批人数" prop="totalNum" align="center">
              <el-input v-model="meetForm.totalNum" placeholder="" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已投票人数" prop="doneNum" align="center">
              <el-input v-model="meetForm.doneNum" placeholder="" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item align="left">
          <el-button type="primary" @click="addUser">添加成员</el-button>
          <el-button type="primary" @click="rmUser">删除成员</el-button>
          <el-button type="primary" @click="reSet">任务重置</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="voteTable" :data="meetForm.meetUser" style="width: 100%" border highlight-current-row @row-click="selectionLineChangeHandle">
        <el-table-column align="center" prop="userName" label="审批人员" />
        <el-table-column align="center" prop="mettingSts" label="投票结果" />
        <el-table-column align="center" prop="startTime" label="任务开始时间" />
        <el-table-column align="center" prop="endTime" label="任务结束时间"></el-table-column>
        <el-table-column align="center" prop="voteSts" label="任务状态"></el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>审批历史</span>
      </div>
      <el-table ref="hisTable" :data="nodeHistory" border style="width: 100%">
        <el-table-column prop="nodeName" label="审批节点名称"> </el-table-column>
        <el-table-column prop="userName" label="办理人员名称"> </el-table-column>
        <el-table-column prop="startTime" label="审批时间"> </el-table-column>
        <el-table-column prop="userId" label="办理人员"> </el-table-column>
        <el-table-column prop="nodeId" label="审批节点编号"> </el-table-column>
        <el-table-column prop="userComment" label="审批意见"> </el-table-column>
        <el-table-column prop="ext" label="扩展意见"> </el-table-column>
        <el-table-column prop="commentSign" label="审批结果"> </el-table-column>
      </el-table>
    </el-card>
    <el-dialog-x title="选择人员" :visible.sync="userSelectDialog" @close="afterClose">
      <!--yu-xform v-model="formdata" related-table-name="reftable" form-type="search">
        <yu-xform-group :column="3">
          <yu-xform-item label="用户号" placeholder="用户号" ctype="input" name="userId"></yu-xform-item>
          <yu-xform-item label="用户名称" placeholder="用户名称" ctype="input" name="userName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform-->
      <el-table-x ref="reftable" :row-index="true" :pageable="false" :base-params="baseParams" :data-url="urls.userUrl" :table-columns="userColumns" align="center"></el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="sureAdd">确定</el-button>
        <el-button @click="userSelectDialog = false">取消</el-button>
      </div>
    </el-dialog-x>
    <el-dialog-x title="是否查看业务" :visible.sync="isCheckBizDialog" width="400px">
      <yu-xform>
        <yu-xform-group :column="1" align="center">
          <yu-xform-item label="是否查看业务" ctype="select" v-model="isCheckBiz" :options="isCheckBizs"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div slot="footer" align="center">
        <el-button type="primary" @click="sureAdd">确定</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
const data = {};
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      urls: {
        userUrl: backend.workflowService + '/api/metting/user',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        dataUrl: backend.workflowService + '/api/metting/myStart',
        vote: backend.workflowService + '/api/metting/voteAll',
        rmUser: backend.workflowService + '/api/metting/deleteVoteUser',
        refresh: backend.workflowService + '/api/metting/refreshMeet',
        addUser: backend.workflowService + '/api/metting/addVoteUser'
      },
      requestType: 'GET',
      dataParams: {},
      tableColumns: [
        {
          label: '流程实例号',
          prop: 'instanceId',
          resizable: true,
          align: 'center'
        },
        {
          label: '会议标题',
          prop: 'mettingSub',
          resizable: true,
          align: 'center'
        },
        {
          label: '会议年份',
          prop: 'mettingYear',
          resizable: true,
          align: 'center'
        },
        {
          label: '会议期号',
          prop: 'mettingNo',
          resizable: true,
          align: 'center'
        },
        {
          label: '投票人',
          prop: 'userId',
          resizable: true,
          align: 'center'
        },
        {
          label: '投票人姓名',
          prop: 'userName',
          resizable: true,
          align: 'center'
        },
        {
          label: '开始时间',
          prop: 'startTime',
          resizable: true,
          align: 'center'
        },
        {
          label: '结束时间',
          prop: 'endTime',
          resizable: true,
          align: 'center'
        },
        {
          label: '投票结果',
          prop: 'mettingSts',
          resizable: true,
          align: 'center',
          template: function () {
            return '<template slot-scope="scope">\
                <span style="color:green;" v-if="scope.row.mettingSts==\'Y\'">同意</span>\
                <span style="color:red;" v-if="scope.row.mettingSts==\'N\'">否决</span>\
                <span style="color:orange;" v-if="scope.row.mettingSts==\'G\'">再议</span>\
                <span style="color:#20A0FF;" v-if="scope.row.mettingSts==null">未投票</span>\
                </template>';
          }
        },
        {
          label: '会议意见',
          prop: 'mettingComment',
          resizable: true,
          align: 'center'
        }
      ],
      editColumns: [
        // 表头信息
        {
          prop: 'userId',
          label: '员工号',
          width: '300'
        },
        {
          prop: 'userName',
          label: '员工姓名',
          width: '150'
        },
        {
          prop: 'check',
          label: '是否查看业务',
          width: '150'
        }
      ],
      rules: {
        meetType: [
          { required: true, message: '请选择会议模式', trigger: 'blur' }
        ],
        meetUser: [
          { required: true, message: '请选择会议模式', trigger: 'blur' }
        ]
      },
      userColumns: [
        { label: '用户号', prop: 'userId', resizable: true },
        { label: '用户名称', prop: 'userName', resizable: true }
      ],
      meetForm: {
        meetType: '1',
        meetUser: [
          {
            userId: '',
            userName: '',
            check: ''
          }
        ]
      },
      queryButtons: [
        {
          label: '搜索',
          op: 'submit',
          type: 'primary',
          click: function (model, valid) {
            if (valid) {
              var params = {
                userName: model.userName ? '%' + model.userName + '%' : '',
                userId: model.userId ? model.userId : ''
              };
              var param = {
                condition: JSON.stringify(params)
              };

              this.$refs.reftable.remoteData(param);
            }
          }
        },
        {
          label: '重置',
          op: 'reset'
        }
      ],
      // meetType: '1',
      meetTypes: [
        {
          key: '05',
          value: '贷审会模式'
        },
        {
          key: '04',
          value: '三人会商模式'
        },
        {
          key: '06',
          value: '投审会模式'
        }
      ],
      mettingStsOptions: [
        {
          key: 'R',
          value: '投票中'
        },
        {
          key: 'E',
          value: '投票结束'
        },
        {
          key: 'S',
          value: '等待投票'
        }
      ],
      baseParams: {
        meetId: '',
        orgId: ''
      },
      isCheckBizs: [
        {
          key: '0',
          value: '否'
        },
        {
          key: '1',
          value: '是'
        }
      ],
      meetId: '',
      currentOrgId: '',
      currentUserId: '',
      readyUsers: [],
      voteSelection: null,
      userSelectDialog: false,
      isCheckBizDialog: false,
      isCheckBiz: '1',
      formdata: null,
      meetData: null
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
    this.baseParams.orgId = this.org.id;
  },
  mounted: function () {
    const params =
      this.bizPageData == null ? this.$route.params : this.bizPageData;
    if (params != null) {
      this.dataParams = {
        condition: JSON.stringify({
          instanceId: params.instanceId
        })
      };
      this.meetData = params;
      this.baseParams.meetId = params.meetId;
      if (params.meetType === '06') {
        this.baseParams.dutyId = 'ZHT19'; // 总行信贷审批委员会
      } else if (params.meetType === '05') {
        this.baseParams.dutyId = 'ZHT14'; // 总行投资管理委员会
      } else if (params.meetType === '04') {
        this.baseParams.dutyId = 'XDB17'; // 三人会商小组
      }

      this.meetId = params.meetId;
      this.getComment(params.instanceId);
      yufp.extend(this.meetForm, params);
      this.initData(params.meetId);
    }
  },
  methods: {
    initData: function (val) {
      var _this = this;
      var params = {
        condition: JSON.stringify({
          userId: _this.meetData.userId,
          meetType: _this.meetData.meetType
        })
      };
      _this.readyUsers = [];
      _this.meetForm.doneNum = _this.meetForm.totalNum - _this.meetForm.todoNum;
      yufp.service.request({
        method: 'GET',
        url: _this.urls.dataUrl,
        data: params,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null ? response.data.length > 0 : false) {
              _this.refreshMeetData(response.data);
              yufp.service.request({
                method: 'GET',
                url: _this.urls.vote,
                data: {condition: JSON.stringify({ meetId: _this.meetData.meetId})},
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    if (response.data != null ? response.data.length > 0 : false) {
                      var nodeHistory = response.data;
                      // 处理投票状态
                      for (var j = 0, len = nodeHistory.length; j < len; j++) {
                        if (
                          nodeHistory[j].mettingSts == null ||
                          nodeHistory[j].mettingSts == ''
                        ) {
                          nodeHistory[j].mettingSts = '未投票';
                          nodeHistory[j].voteSts = '等待投票';
                        } else {
                          switch (nodeHistory[j].mettingSts) {
                          case 'Y':
                            nodeHistory[j].mettingSts = '同意';
                            break;
                          case 'N':
                            nodeHistory[j].mettingSts = '否决';
                            break;
                          case 'G':
                            nodeHistory[j].mettingSts = '再议';
                            break;
                          default:
                            nodeHistory[j].mettingSts = '';
                          }
                          nodeHistory[j].voteSts = '投票结束';
                        }
                        _this.readyUsers.push(nodeHistory[j].userId);
                      }
                      _this.meetForm.meetUser = nodeHistory;
                    } else {
                      _this.readyUsers = [];
                      _this.meetForm.meetUser = [];
                    }
                  }
                }
              });
            }
          }
        }
      });
    },
    refreshMeetData: function (data) {
      if (!data || data.length == 0) {
        return;
      }
      for (var i in data) {
        if (data[i] && data[i].meetId === this.meetData.meetId) {
          var val = data[i];
          yufp.extend(this.meetForm, val);
          this.meetForm.doneNum = this.meetForm.totalNum - this.meetForm.todoNum;
          if (this.meetForm.totalNum != 0 && this.meetForm.totalNum == this.meetForm.doneNum) {
            this.checkMeetSts();
          }
        }
      }
    },
    getComment: function (val) {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: _this.urls.getComments,
        data: { mainInstanceId: val },
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null ? response.data.length > 0 : false) {
              var nodeHistory = response.data;
              // commentSign翻译
              for (var i = 0, length = nodeHistory.length; i < length; i++) {
                nodeHistory[i].commentSign = yufp.lookup.convertKey(
                  'OP_TYPE',
                  nodeHistory[i].commentSign
                );
              }
              _this.nodeHistory = nodeHistory;
            }
          }
        }
      });
    },
    addUser: function () {
      // if (_this.meetForm.meetType === '04' && !_this.checkUserNum('add')) {
      //   return false;
      // }
      this.userSelectDialog = true;
    },
    selectionLineChangeHandle: function (selection) {
      console.log(selection);
      this.voteSelection = selection;
    },
    sureAdd: function () {
      var _this = this;
      _this.isCheckBizDialog = false;
      _this.userSelectDialog = false;

      var row = _this.$refs.reftable.selections;
      if (row == null || row.length !== 1) {
        this.$message({ message: '请选择一条数据', type: 'warning' });
        return;
      }
      if (row[0].userId == '' || row[0].userId == null || row[0].userName == '' || row[0].userName == null) {
        this.$message({ message: '用户编号或者用户名不可为空!', type: 'warning' });
        return;
      }
      for (var i = 0; i < this.meetForm.meetUser.length; i++) {
        if (_this.readyUsers.indexOf(row[0].userId) > -1) {
          this.$message({ message: '已经选择了该人员！', type: 'warning' });
          return;
        }
      }
      var param = {};
      yufp.clone(_this.meetData, param);
      param.userId = row[0].userId;
      param.userName = row[0].userName;
      param.isCheckBiz = _this.isCheckBiz;
      yufp.service.request({
        method: 'POST',
        url: _this.urls.addUser,
        data: param,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.$message({ message: '新增用户成功', type: 'success' });
            _this.initData(_this.meetId);
          }
        }
      });
    },
    // 删除指定用户会议记录
    rmUser: function () {
      var _this = this;
      var row = _this.voteSelection;
      if (row == null) {
        _this.$message({ message: '请选择一条数据！', type: 'warning' });
        return false;
      }
      // if (_this.meetForm.meetType === '04' && !_this.checkUserNum('add')) {
      //   return false;
      // }
      var param = {
        userId: row.userId,
        voteId: row.voteId
      };
      yufp.service.request({
        method: 'POST',
        url: _this.urls.rmUser,
        data: param,
        callback: function (code, message, response) {
          if (response.code == 0 && response.data.code == '0') {
            _this.$message({ message: response.data.tip, type: 'success' });
            _this.initData(_this.meetId);
          }
        }
      });
    },
    checkMeetSts: function () {
      var _this = this;
      var param = {
        meetId: _this.meetId
      };
      _this
        .$confirm('是否要结束会议？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(function () {
          yufp.service.request({
            method: 'POST',
            url: _this.urls.refresh,
            data: param,
            callback: function (code, message, response) {
              if (response.code == 0 && response.data) {
                yufp.router.removeTab(_this.$route.path);
              }
            }
          });
        }).catch(function () {
          _this.$message({ duration: 6000, type: 'info', message: '已取消' });
        });
    },
    // 重置任务，将投票结论和意见置空
    reSet: function () {
      var _this = this;
      var row = _this.voteSelection;
      if (row == null) {
        _this.$message({ message: '请选择一条数据！', type: 'warning' });
        return false;
      }
      var param = {
        userId: row.userId,
        meetId: row.meetId,
        voteId: row.voteId
      };
      yufp.service.request({
        method: 'POST',
        url: _this.urls.addUser,
        data: param,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.$message({ message: '重置成功', type: 'success' });
            _this.initData(_this.meetId);
          }
        }
      });
    },
    checkUserNum: function (type) {
      var user = this.meetForm.meetUser;
      if (user != null && user.length == 3 && type == 'add') {
        this.$message({
          message: '三人会商模式只允许三人参会',
          type: 'warning'
        });
        return false;
      }
      if ((user == null || user.length < 3) && type == 'submit') {
        this.$message({ message: '三人会商模式需要三人参会', type: 'warning' });
        return false;
      }
      return true;
    }
  }
};
</script>
