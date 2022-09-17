<template>
  <div>
    <el-tabs value="first" type="card" @tab-click="tabClick" tab-position="top">
      <el-tab-pane label="业务信息" name="first">
        <div :id="nwfbiztypeLitePage">
          <component :is="bizPage" :biz-page-data="bizPageData"></component>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程审批" name="second">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>审批操作</span>
          </div>
          <el-form ref="commentForm" label-width="160px" :model="commentInfo" :rules="commentRules">
            <el-form-item label="意见" prop="userComment" v-show="isShow == 0">
              <el-input type="textarea" v-model="commentInfo.userComment" :disabled="button.signIn == 1"></el-input>
            </el-form-item>
            <el-form-item v-show="isShow == 0">
              <el-button @click="cancel">返回</el-button>
              <el-button type="primary" @click="submitFn('O-0')" :disabled="button.tackBack == 0" v-if="button.recall == '0'">拿回</el-button>
              <el-button type="primary" @click="submitFn('O-15')" :disabled="button.recall == 0" v-if="button.recall == '1'">撤回</el-button>
              <el-button type="primary" @click="submitFn('O-5')" :disabled="button.urged == 0">催办</el-button>
              <el-button type="primary" @click="submitFn('O-3')" :disabled="button.hungUp == 0" v-if="instanceIdInfo.flowState == 'R'">挂起</el-button>
              <el-button type="primary" @click="submitFn('O-4')" :disabled="button.hungUp == 0" v-if="instanceIdInfo.flowState == 'H'">唤醒</el-button>
              <el-button type="primary" @click="activateFn" :disabled="button.activate == 0" v-show="button.activate == '1'">激活</el-button>
            </el-form-item>
            <el-form-item v-show="isShow == 1">
              <el-button @click="cancel">返回</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>流程审批历史信息</span>
          </div>
          <div style="height: 20px" align="center">{{ commentinfo }}</div>
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
      </el-tab-pane>
      <!--审查报告-->
      <el-tab-pane label="审查报告" name="lmtReplyAppro" v-if="islmtReplyApproShow">
        <div :id="nwflmtReplyApproPage">
          <component :is="lmtReplyApproPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
      <!--批复报告-->
      <el-tab-pane label="批复报告" name="lmtReplyApproMeeting" v-if="islmtReplyApproMeetingShow">
        <div :id="nwflmtReplyApproMeetingPage">
          <component :is="lmtReplyApproMeetingPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { validator } from '@/utils/validate';
let data = {};
export default {
  name: 'InstanceInfoLite',
  data: function () {
    var _this = this;
    return {
      bizPage: null,
      collapseValue: ['1', '4'],
      collapse2FormDisable: true,
      bizPageData: null,
      nwflmtReplyApproPage: 'nwflmtReplyApproPage' + Date.now(), // 审查报告
      islmtReplyApproShow: false,
      nwflmtReplyApproMeetingPage: 'nwflmtReplyApproMeetingPage' + Date.now(), // 批复报告
      islmtReplyApproMeetingShow: false,
      gatherPageData: null, // 页面传参
      urls: {
        index: backend.workflowService + '/api/bench/done',
        runInsInfo: backend.workflowService + '/api/core/myinstanceInfo',
        endInsInfo: backend.workflowService + '/api/core/myinstanceInfoHis',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        hang: backend.workflowService + '/api/core/hangup',
        wake: backend.workflowService + '/api/core/wakeup',
        tackBack: backend.workflowService + '/api/core/tackback',
        urge: backend.workflowService + '/api/core/urge',
        resetNodeUser: backend.workflowService + 'api/core/resetNodeUser',
        tackbackToFirst: backend.workflowService + '/api/core/tackbackToFirst',
        activate: backend.workflowService + 'api/core/activate'
      },
      height: yufp.frame.size().height - 103,
      currentOrgId: '',
      currentUserId: '',
      returnBackFuncId: '',
      returnBackRootId: '',
      instanceIdInfo: {
        instanceId: '',
        flowName: '',
        flowId: '',
        flowStarter: '',
        flowStarterName: '',
        startTime: '',
        systemId: '',
        orgId: '',
        flowState: '',
        bizId: '',
        bizUserName: '',
        bizUserId: '',
        lastNodeId: '',
        lastNodeName: '',
        nodeId: '',
        nodeSign: '',
        nodeName: '',
        nodeState: '',
        nodeType: '',
        handleType: '',
        bizPage: '',
        opType: {}
      },
      commentInfo: {
        instanceId: '',
        nodeId: '',
        userId: '',
        commentId: '',
        commentSign: 'O-12',
        userComment: '',
        ext: ''
      },
      commentRules: {
        userComment: [
          { required: true, message: '请填写意见', trigger: 'blur' },
          { max: 30, message: '长度不能超过30个字符' },
          { validator: validator.speChar }
        ]
      },
      flowParam: [],
      button: {
        // 按钮权限控制
        hungUp: '0',
        tackBack: '0',
        urged: '0',
        recall: '0',
        activate: '0'
      },
      UserSelect: {
        reset: '重置节点办理人员选择',
        showUserDialog: false,
        userUrl: backend.workflowService + '/api/org/users',
        Users: [],
        SelectUsers: []
      },
      queryFields: [
        { placeholder: '办理人员id', field: 'userId', type: 'input' },
        { placeholder: '办理人员名称', field: 'userName', type: 'input' }
      ],
      queryButtons: [
        {
          label: '搜索',
          op: 'submit',
          type: 'primary',
          icon: 'search',
          click: function (model, valid) {
            if (valid) {
              var param = { condition: JSON.stringify(model) };
              _this.$refs.reftable.remoteData(param);
            }
          }
        },
        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
      ],
      nwfbiztypeLitePage: 'nwfbiztypeLitePage' + Date.now(),
      title: 'reset',
      type: '',
      nodeHistory: [],
      commentinfo: '',
      isShow: 0,
      pagesize: 10,
      currentPage: 1,
      total: 0
    };
  },
  computed: {
    ...mapGetters([
      'userCode', 'org'
    ])
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
  },
  mounted: function () {
    // 进入初始化
    data = this.$route.params;
    this.instanceInfoFn(data);
    this.type = data.type;
    this.instanceIdInfo.instanceId = data.instanceId;
    this.returnBackFuncId = data.returnBackFuncId;
    this.returnBackRootId = data.returnBackRootId;
    if (data.isShow != null) {
      this.isShow = data.isShow;
    }
    if (data.type === 'DONE' || data.type === 'HIS') {
      this.isShow = '1';
    }
  },
  methods: {
    tabClick: function (tab, event) {
      var _this = this;
      var url = _this.urls.getComments;
      if (tab.name == 'second') {
        yufp.service.request({
          method: 'GET',
          url: url,
          data: { mainInstanceId: _this.instanceIdInfo.mainInstanceId },
          callback: function (code, message, response) {
            if (response.code == 0) {
              if (response.data != null ? response.data.length > 0 : false) {
                _this.commentinfo = '';
                var nodeHistory = response.data;
                // commentSign翻译
                for (var i = 0, length = nodeHistory.length; i < length; i++) {
                  nodeHistory[i].commentSign = yufp.lookup.convertKey(
                    'OP_TYPE',
                    nodeHistory[i].commentSign
                  );
                  // 时间格式化
                  // nodeHistory[i].startTime = yufp.util.dateFormat(nodeHistory[i].startTime, '{y}-{m}-{d}');
                }
                _this.nodeHistory = nodeHistory;
              } else {
                _this.commentinfo = '暂无审批历史数据';
              }
            }
          }
        });
      }
    },
    instanceInfoFn: function (param) {
      // 初始化实例信息
      var _this = this;
      var url = '';
      var params = { instanceId: param.instanceId };
      if (param.nodeId != null) {
        params.nodeId = param.nodeId;
      }
      if (param.type == 'DONE') {
        url = _this.urls.runInsInfo;
      } else if (param.type == 'HIS') {
        url = _this.urls.endInsInfo;
      }
      yufp.service.request({
        method: 'GET',
        url: url,
        data: params,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.instanceIdInfo = response.data;
            _this.instanceIdInfo.returnBackFuncId = _this.$route.params.returnBackFuncId;
            _this.instanceIdInfo.pageType = 'TODO';
            if (param.type) {
              _this.instanceIdInfo.pageType = param.type;
            }
            _this.instanceIdInfo.nodeId = param.nodeId;
            if (response.data.param != null) {
              // 流程参数初始化
              for (var key in response.data.param) {
                var paramTT = {};
                paramTT.key = key;
                paramTT.value = response.data.param[key];
                _this.flowParam.push(paramTT);
              }
            }
            if (response.data.comment != null && response.data.comment.commentSign != null) {
              // 设置评论反显
              _this.commentInfo = response.data.comment;
            }
            _this.commentInfo.instanceId = _this.instanceIdInfo.instanceId;
            _this.commentInfo.userId = _this.currentUserId;
            _this.commentInfo.nodeId = _this.instanceIdInfo.nodeId;
            // 按钮权限
            var button = _this.instanceIdInfo.opType;
            if (button != null) {
              if (param.button != null) {
                for (var key in _this.button) {
                  var value = button[key];
                  if (value != null) {
                    if (value != '0' && param.button[key] != '0') {
                      _this.button[key] = value;
                    }
                  }
                  if (key == 'recall') {
                    _this.button[key] = param.button[key];
                  }
                }
              }
            }
            var bizPage = _this.instanceIdInfo.bizPage;
            if (bizPage.includes('?')) {
              var str = bizPage.split('?');
              bizPage = str[0];
              _this.convertParam(str[1]);
            }
            let tempParam = {};
            if (_this.flowParam && _this.flowParam.length > 0) {
              for (var i = 0; i < _this.flowParam.length; i++) {
                tempParam[_this.flowParam[i].key] = _this.flowParam[i].value;
              }
            }
            var paramT = {
              instanceInfo: _this.instanceIdInfo,
              flowParam: tempParam
            };
            _this.$nextTick(function () {
              try {
                // yufp.router.to(bizPage, paramT, _this.nwfbiztypeLitePage);
                _this.bizPage = () => Promise.resolve(require('@/views/' + bizPage).default).catch((e) => { console.log(e) });
                _this.bizPageData = paramT;
              } catch (e) { }
            });
          } else {
            _this.$message({
              duration: 6000,
              message: '获取实例信息出错:' + response.message,
              type: 'error'
            });
            _this.cancel();
          }
          var bizType = paramT.instanceInfo.bizType;
          // 审查报告 批复报告
          if (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007') {
            // 单一审查
            _this.islmtReplyApproShow = true;
            try {
              _this.lmtReplyApproPage = function () {
                return Promise.resolve(
                  require('@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/reviewReport.vue')
                    .default
                );
              };
              _this.lmtReplyApproPage.instanceInfo = _this.instanceIdInfo;
              _this.gatherPageData = _this.lmtReplyApproPage;
              _this.gatherPageData.showDGReport = _this.instanceIdInfo.showDGReport;
            } catch (e) {}
            // 单一批复
            _this.islmtReplyApproMeetingShow = true;
            try {
              _this.lmtReplyApproMeetingPage = function () {
                return Promise.resolve(
                  require('@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtReplyApproMeeting.vue')
                    .default
                );
              };
              _this.lmtReplyApproMeetingPage.instanceInfo = _this.instanceIdInfo;
              _this.gatherPageData = _this.lmtReplyApproMeetingPage;
            } catch (e) {}
          }
        }
      });
    },
    convertParam: function (params) {
      if (params.includes(',')) {
        params = params.split(',');
        for (var k = 0; k < params.length; k++) {
          var paramf = {};
          var item = params[k];
          paramf.key = item.split('=')[0];
          paramf.value = item.split('=')[1];
          var isHave = false;
          for (var i = 0; i < this.flowParam.length; i++) {
            if (this.flowParam[i].key === paramf.key) {
              this.flowParam[i].value = paramf.value;
              isHave = true;
            }
          }
          if (!isHave) {
            this.flowParam.push(paramf);
          }
        }
      } else {
        var paramf = {};
        paramf.key = params.split('=')[0];
        paramf.value = params.split('=')[1];
        var isHave = false;
        for (var i = 0; i < this.flowParam.length; i++) {
          if (this.flowParam[i].key === paramf.key) {
            this.flowParam[i].value = paramf.value;
            isHave = true;
          }
        }
        if (!isHave) {
          this.flowParam.push(paramf);
        }
      }
    },
    submitFn: function (opType) {
      // 功能方法实现接口
      var _this = this;
      // _this.submitbefore();
      if (opType == 'O-0') {
        // 拿回
        _this.$refs.commentForm.validate(function (vaild) {
          // 规则校验
          if (vaild) {
            _this.takeBackFn();
          } else {
            _this.$message({
              duration: 6000,
              message: '请检查输入项是否合法!',
              type: 'warning'
            });
          }
        });
      } else if (opType == 'O-5') {
        // 催办
        _this.urgeFn();
      } else if (opType == 'O-3') {
        // 挂起
        _this.Hang();
      } else if (opType == 'O-4') {
        // 唤醒
        _this.Awake();
      } else if (opType == 'O-15') {
        // 撤回
        _this.$refs.commentForm.validate(function (vaild) {
          // 规则校验
          if (vaild) {
            _this.takeBackToFirstFn();
          } else {
            _this.$message({
              duration: 6000,
              message: '请检查输入项是否合法!',
              type: 'warning'
            });
          }
        });
      }
    },
    cancel: function () {
      if (this.$route.params && this.$route.params._form) {
        this.$router.rollback(this.$route.params._form);
      } else {
        this.$router.go(-1);
      }
      // 跳转到之前的页面
      // yufp.router.to(this.returnBackFuncId, null, this.returnBackRootId);
    },
    // 挂起(发起人)
    Hang: function () {
      // 挂起操作
      var _this = this;
      _this
        .$confirm('确定要执行挂起操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {
            instanceId: _this.instanceIdInfo.instanceId
          };
          yufp.service.request({
            method: 'GET',
            data: param,
            url: _this.urls.hang,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                _this.$message({
                  message: response.data.tip + ';',
                  type: 'success',
                  duration: 6000
                });
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: response.message + ';',
                  type: 'error',
                  duration: 6000
                });
              }
            }
          });
        })
        .catch(function () { });
    },
    Awake: function () {
      var _this = this;
      _this
        .$confirm('确定要执行唤醒操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {
            instanceId: _this.instanceIdInfo.instanceId
          };
          yufp.service.request({
            method: 'GET',
            data: param,
            url: _this.urls.wake,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                _this.$message({
                  message: response.data.tip + ';',
                  type: 'success',
                  duration: 6000
                });
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: response.message + ';',
                  type: 'error',
                  duration: 6000
                });
              }
            }
          });
        })
        .catch(function () { });
    },
    // 拿回(已办)
    takeBackFn: function () {
      var _this = this;
      _this
        .$confirm('确定要拿回本条流程吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {};
          _this.commentInfo.commentSign = 'O-0';
          if (_this.commentInfo.userComment == '') {
            _this.commentInfo.userComment = '[拿回]';
          }
          param.comment = _this.commentInfo;
          param.orgId = _this.currentOrgId;
          yufp.service.request({
            method: 'POST',
            data: param,
            url: _this.urls.tackBack,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                if (response.data.code == '1') {
                  _this.$message({
                    message: response.data.tip + ';',
                    type: 'error',
                    duration: 6000
                  });
                } else {
                  _this.$message({
                    message: response.data.tip + ';',
                    type: 'success',
                    duration: 6000
                  });
                }
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: response.message + ';',
                  type: 'error',
                  duration: 6000
                });
              }
            }
          });
        })
        .catch(function () { });
    },
    // 撤回(我的发起-已办)
    takeBackToFirstFn: function () {
      var _this = this;
      _this
        .$confirm('确定要将本条流程撤回到起始节点吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {};
          _this.commentInfo.commentSign = 'O-15';
          if (_this.commentInfo.userComment == '') {
            _this.commentInfo.userComment = '[撤回]';
          }
          param.comment = _this.commentInfo;
          param.orgId = _this.currentOrgId;
          yufp.service.request({
            method: 'POST',
            data: param,
            url: _this.urls.tackbackToFirst,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                _this.$message({
                  message: response.data.tip + ';',
                  type: 'success',
                  duration: 6000
                });
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: response.message + ';',
                  type: 'error',
                  duration: 6000
                });
              }
            }
          });
        })
        .catch(function () { });
    },
    // 催办(发起人)
    urgeFn: function () {
      var _this = this;
      _this
        .$confirm('确定要催促本条流程的办理进度吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {
            instanceId: _this.instanceIdInfo.instanceId,
            nodeId: _this.instanceIdInfo.nodeId
          };
          yufp.service.request({
            method: 'GET',
            data: param,
            url: _this.urls.urge,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                _this.$message({
                  message: response.data.tip + ';',
                  type: 'success',
                  duration: 6000
                });
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: response.message + ';',
                  type: 'error',
                  duration: 6000
                });
              }
            }
          });
        })
        .catch(function () { });
    },
    // 激活-我的发起-已办结
    activateFn: function () {
      var _this = this;
      _this
        .$confirm('确定要执行激活操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {
            instanceId: _this.instanceIdInfo.instanceId,
            currentUserId: _this.userCode
          };
          yufp.service.request({
            method: 'GET',
            data: param,
            url: _this.urls.activate,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                _this.$message({
                  message: response.data.tip + ';',
                  type: 'success',
                  duration: 4000
                });
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: response.message + ';',
                  type: 'error',
                  duration: 4000
                });
              }
            }
          });
        })
        .catch(function () { });
    }
  }
};
</script>