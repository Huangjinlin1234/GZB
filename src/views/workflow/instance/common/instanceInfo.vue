<template>
  <div>
    <div :id="nwfbiztypePage" v-show="isGatherShow == false">
      <component :is="bizPage" :biz-page-data="bizPageData"></component>
    </div>
    <el-tabs v-model="tabValue" tab-position="top" v-show="isGatherShow == true">
      <el-tab-pane label="业务信息" name="first">
        <div :id="nwfbiztypePage">
          <component :is="bizPage" :biz-page-data="bizPageData"></component>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发起会议" name="meet">
        <div :id="nwfmeetPage">
          <component :is="meetPage" :biz-page-data="gatherPageData"></component>
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
  name: 'InstanceInfo',
  data: function () {
    var _this = this;
    return {
      urls: {
        index: backend.workflowService + '/api/bench/todo',
        instanceInfo: backend.workflowService + '/api/core/instanceInfo',
        saveComment: backend.workflowService + '/api/core/saveComment/',
        signIn: backend.workflowService + '/api/core/signIn/',
        runInsInfo: backend.workflowService + '/api/core/myinstanceInfo',
        endInsInfo: backend.workflowService + '/api/core/myinstanceInfoHis',
        unSignIn: backend.workflowService + '/api/core/unSignIn/'
      },
      height: yufp.frame.size().height - 103,
      currentOrgId: '',
      currentOrgName: '',
      currentUserId: '',
      returnBackFuncId: '',
      returnBackRootId: '',
      instanceIdInfo: {
        instanceId: '',
        mainInstanceId: '',
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
        bizType: '',
        lastNodeId: '',
        lastNodeName: '',
        nodeId: '',
        nodeSign: '',
        nodeName: '',
        nodeState: '',
        nodeStateName: '',
        nodeType: '',
        handleType: '',
        opType: {}
      },
      flowParam: [],
      opNames: {
        // 操作权限常量列表
        submit: {
          label: '同意',
          value: 'O-12'
        },
        takeBack: {
          key: 'takeBack',
          label: '拿回',
          value: 'O-0'
        },
        callBack: {
          key: 'callBack',
          label: '打回',
          value: 'O-1'
        },
        returnBack: {
          key: 'returnBack',
          label: '退回',
          value: 'O-2'
        },
        hangUp: {
          key: 'hangUp',
          label: '挂起',
          value: 'O-3'
        },
        wakeUp: {
          key: 'wakeUp',
          label: '唤醒',
          value: 'O-4'
        },
        urge: {
          key: 'urge',
          label: '催办',
          value: 'O-5'
        },
        change: {
          key: 'change',
          label: '转办',
          value: 'O-6'
        },
        assist: {
          key: 'assist',
          label: '协办',
          value: 'O-7'
        },
        refuse: {
          key: 'refuse',
          label: '否决',
          value: 'O-8'
        },
        jump: {
          key: 'jump',
          label: '跳转',
          value: 'O-9'
        },
        entrust: {
          key: 'entrust',
          label: '委托',
          value: 'O-10'
        },
        copy: {
          key: 'copy',
          label: '抄送',
          value: 'O-11'
        },
        auto: {
          key: 'auto',
          label: '自动提交',
          value: 'O-13'
        },
        end: {
          key: 'end',
          label: '正常结束',
          value: 'O-14'
        },
        takeBackFirst: {
          key: 'takeBackFirst',
          label: '撤回',
          value: 'O-15'
        },
        start: {
          key: 'start',
          label: '待发起',
          value: 'O-16'
        },
        reStart: {
          key: 'reStart',
          label: '再议',
          value: 'O-18'
        }
      },
      button: {
        // 按钮权限控制
        submit: '1',
        gather: '0',
        callBack: '0',
        entrust: '0',
        copy: '0',
        jump: '0',
        returnBack: '0',
        change: '0',
        unSignIn: '0',
        signIn: '0',
        assist: '0',
        refuse: '0',
        taskPoolId: '0',
        subFlowId: '0',
        subFlow: '',
        reStart: '0'
      },
      optypeOptions: [],
      nwfbiztypePage: 'nwfbiztypePage' + Date.now(),
      bizPage: '',
      bizPageData: null,
      nwfmeetPage: 'nwfmeetPage' + Date.now(),
      meetPage: '',
      gatherPageData: null,
      endNodeId: '',
      showbizTypeDialog: false,
      bizTypeTitle: '业务类型选取',
      bizTypeParam: {},
      meetData: null,
      isGatherShow: false
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
    this.currentOrgName = this.org.name;

    // 路由参数处理
    data = this.$route.params;
    // 进入初始化
    this.instanceInfoFn(data);
    this.returnBackFuncId = data.returnBackFuncId;
    this.returnBackRootId = data.returnBackRootId;
    this.currentUserId = data.userId;
  },
  mounted: function () {
  },
  methods: {
    instanceInfoFn: function (param) {
      // 初始化实例信息
      var _this = this;
      var url = _this.urls.instanceInfo;
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
            // 按钮权限
            if (response.data.opType != null) {
              for (var key in _this.button) {
                var value = response.data.opType[key];
                if (value != null && value != '') {
                  _this.button[key] = value;
                }
              }
            }
            _this.getOptions();
            if (response.data.param != null) {
              // 流程参数初始化
              for (var key in response.data.param) {
                var paramTT = {};
                paramTT.key = key;
                paramTT.value = response.data.param[key];
                _this.flowParam.push(paramTT);
              }
            }

            var bizPage = _this.instanceIdInfo.bizPage;
            if (bizPage == null ? false : bizPage.includes('?')) {
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
            _this.instanceIdInfo.flowEdit = param.flowEdit;
            var paramT = {
              instanceInfo: _this.instanceIdInfo,
              flowParam: tempParam,
              optypeOptions: _this.optypeOptions
            };
            _this.$nextTick(function () {
              try {
                _this.bizPage = () => Promise.resolve(require('@/views/' + bizPage).default);
                _this.bizPageData = paramT;
                // 此节点有会办权限
                if (_this.button['gather'] !== '0' && _this.instanceIdInfo.pageType == 'TODO') {
                  _this.tabValue = 'meet';
                  _this.isGatherShow = true;
                  _this.checkGatherData();
                }
              } catch (e) {}
            });
          } else {
            _this.$message({
              duration: 6000,
              message: '获取实例信息异常:' + response.message.substring(0, 100),
              type: 'error'
            });
          }
        }
      });
    },
    checkGatherData: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: { instanceId: _this.instanceIdInfo.instanceId },
        url: backend.workflowService + '/api/metting/checkMeet',
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              // 已发起会办
              _this.$nextTick(function () {
                try {
                  _this.meetData = response.data;
                  _this.meetPage = function () {
                    return Promise.resolve(
                      require('@/views/workflow/instance/metting/meetstart.vue')
                        .default
                    );
                  };
                  _this.meetData.instanceInfo = _this.instanceIdInfo;
                  _this.gatherPageData = _this.meetData;
                } catch (e) {}
              });
            } else {
              _this.gatherStartFn();
            }
          }
        }
      });
    },
    reStartFn: function () {
      var _this = this;
      _this
        .$confirm('确定再议此流程？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {};
          param.orgId = _this.currentOrgId;
          _this.commentInfo.commentSign = 'O-18';
          param.comment = _this.commentInfo;
          yufp.service.request({
            method: 'POST',
            data: param,
            url: backend.workflowService + '/api/core/reStart',
            callback: function (code, message, response) {
              if (response.code == 0 && response.data) {
                // 跳转到之前的页面
                _this.$message(response.data.tip + ';');
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: '再议异常:' + response.message,
                  type: 'error'
                });
              }
            }
          });
        })
        .catch(function () {
          _this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    gatherStartFn: function () {
      var _this = this;
      var param = {
        instanceId: _this.instanceIdInfo.instanceId,
        userId: _this.currentUserId,
        nodeId: _this.instanceIdInfo.nodeId,
        orgId: _this.currentOrgId,
        orgName: _this.currentOrgName
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: backend.workflowService + '/api/metting/start',
        callback: function (code, message, response) {
          if (response.data !== null) {
            _this.$message({
              duration: 6000,
              message: '初始化会办会议成功!',
              type: 'success'
            });
            _this.$nextTick(function () {
              try {
                _this.meetData = response.data;
                _this.meetData.instanceInfo = _this.instanceIdInfo;
                _this.gatherPageData = _this.meetData;
                _this.meetPage = function () {
                  return Promise.resolve(
                    require('@/views/workflow/instance/metting/meetstart.vue')
                      .default
                  );
                };
              } catch (e) {}
            });
          } else {
            _this.$message({
              duration: 6000,
              message: '该流程已经进行过会办!',
              type: 'warning'
            });
          }
        }
      });
    },
    getOptions: function () {
      if (this.button['submit'] == '1') {
        this.optypeOptions.push(this.opNames['submit']);
      }
      if (this.button['callBack'] !== '0') {
        this.optypeOptions.push(this.opNames['callBack']);
      }
      if (this.button['returnBack'] !== '0') {
        this.optypeOptions.push(this.opNames['returnBack']);
      }
      if (this.button['refuse'] !== '0') {
        this.optypeOptions.push(this.opNames['refuse']);
      }
      if (this.button['reStart'] !== '0') {
        this.optypeOptions.push(this.opNames['reStart']);
      }
    },
    convertParam: function (params) {
      if (params == null) {
        return;
      }
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
    cancel: function () {
      // 跳转到之前的页面
      this.$router.replace({
        name: this.returnBackFuncId
      });
    },
    afterSubmit: function (param) {
      this.cancel();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./instanceInfo.css";
</style>
