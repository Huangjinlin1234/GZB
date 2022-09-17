
<template>
  <div>
    <yu-panel title="运行实例监控详情" :collapse-hide="false">
      <el-tabs value="first" type="card" @tab-click="tabClick">
        <el-tab-pane label="流程操作" name="first">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>业务信息</span>
            </div>
            <div style="height: 20px;" align="left">{{ bizPageInfo }}</div>
            <div id="nwfbiztypePage" v-if="bizPageData"><example-info :biz-page-data="bizPageData"></example-info></div>
          </el-card>
          <div style="text-align: center;margin-top: 20px;">
            <el-button @click="cancel">返回</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批历史" name="second">
          <div style="height: 20px;" align="center">{{ commentinfo }}</div>
          <el-collapse accordion>
            <el-collapse-item v-for="(node,index) in nodeHistory" :title="node.startTime+'  '+node.nodeName" :key="node.nodeId" :name="index">
              <el-card class="box-card">
                <yu-xform ref="refFormDemo" label-width="120px" form-type="details" disabled>
                  <yu-xform-group :column="3">
                    <yu-xform-item label="审批节点名称" ctype="input" name="type" :value="node.nodeName"></yu-xform-item>
                    <yu-xform-item label="办理人员名称" ctype="input" name="author" :value="node.userName"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aa7f;" :value="node.commentSign" v-if="node.commentSign == '同意'"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff0000;" :value="node.commentSign" v-if="node.commentSign == '打回'"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500;" :value="node.commentSign" v-if="node.commentSign == '退回'"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ffaa00;" :value="node.commentSign" v-if="node.commentSign == '拿回'"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff0000;" :value="node.commentSign" v-if="node.commentSign == '催办'"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff;" :value="node.commentSign" v-if="node.commentSign == '协办'"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff;" :value="node.commentSign" v-if="node.commentSign == '转办'"></yu-xform-item>
                    <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aa7f;" :value="node.commentSign" v-if="node.commentSign == '跳转'"></yu-xform-item>
                    <yu-xform-item label="审批时间" name="time" :value="node.startTime"></yu-xform-item>
                    <yu-xform-item label="办理人员" ctype="input" name="status" :value="node.userId"></yu-xform-item>
                    <yu-xform-item label="审批节点编号" ctype="input" name="nodeID" :value="node.nodeId"></yu-xform-item>
                    <yu-xform-item label="审批意见" colspan="24" name="content" ctype="textarea" :value="node.userComment"></yu-xform-item>
                    <yu-xform-item label="扩展意见" colspan="24" name="extcontent" ctype="textarea" :value="node.ext"></yu-xform-item>
                  </yu-xform-group>
                </yu-xform>
              </el-card>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </yu-panel>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import exampleInfo from '@/views/workflow/demo/bizpage/exampleInfo.vue'
let data = {}
export default {
  name: 'runInstanceInfo',
  components: { exampleInfo },
  data: function () {
    var _this = this;

    return {
      collapseValue: '1',
      urls: {
        index: backend.workflowService + '/api/bench/todo',
        instanceInfo: backend.workflowService + '/api/core/myinstanceInfo',
        endInfo: backend.workflowService + '/api/core/myinstanceInfoHis',
        getComments: backend.workflowService + '/api/core/getAllComments/'
      },
      bizPageData: null,
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
        bizPage: '',
        lastNodeId: '',
        lastNodeName: '',
        handleType: '',
        nodeId: '',
        nodeName: '',
        bizType: '',
        nodeSign: '',
        nodeState: '',
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
      flowParam: [],
      commentTableData: [],
      title: 'reset',
      nodeHistory: [],
      bizTypePage: 'nwfbiztypePage',
      commentinfo: '',
      type: '',
      bizPageInfo: '',
      bizParam: []
    };
  },
  computed: {
    ...mapGetters([
      'userCode', 'org'
    ])
  },
  created () {
    this.currentOrgId = this.org.id
    this.currentUserId = this.userCode
  },
  mounted: function () {
    data = this.$route.params
    // 进入初始化
    this.returnBackFuncId = data.returnBackFuncId;
    this.type = data.type;
    this.bizParam = data.bizParam;
    this.instanceInfoFn(data);
  },
  methods: {
    tabClick: function (tab, event) {
      var _this = this;

      var url = _this.urls.getComments;
      if (tab.name == 'second') {
        yufp.service.request({
          method: 'GET',
          url: url,
          data: {
            mainInstanceId: _this.instanceIdInfo.mainInstanceId
          },
          callback: function (code, message, response) {
            if (response.code == 0) {
              if (response.data == null ? false : response.data.length == 0) {
                _this.commentinfo = '暂未有历史审批信息!';
              }

              var nodeHistory = response.data; // commentSign翻译

              for (var i = 0, length = nodeHistory.length; i < length; i++) {
                nodeHistory[i].commentSign = yufp.lookup.convertKey('OP_TYPE', nodeHistory[i].commentSign); // 时间格式化
                // nodeHistory[i].startTime = yufp.util.dateFormat(nodeHistory[i].startTime, '{y}-{m}-{d}');
              }

              _this.nodeHistory = nodeHistory;
            } else {
              _this.$message({
                message: '获取评论意见异常:' + response.message + ';',
                type: 'error',
                duration: 6000
              });
            }
          }
        });
      }
    },
    instanceInfoFn: function (param) {
      // 初始化实例信息
      var _this = this;

      var url = '';
      var params = {
        instanceId: param.instanceId
      };

      if (param.nodeId) {
        params.nodeId = param.nodeId;
      }

      if (param.type == 'DONE') {
        url = _this.urls.instanceInfo;
      } else if (param.type == 'HIS') {
        url = _this.urls.endInfo;
      }
      yufp.service.request({
        method: 'GET',
        url: url,
        data: params,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              _this.instanceIdInfo = response.data;

              if (response.data.param != null) {
                // 流程参数初始化
                for (var key in response.data.param) {
                  var paramTT = {};
                  paramTT.key = key;
                  paramTT.value = response.data.param[key];

                  _this.flowParam.push(paramTT);
                }
              }

              if (_this.instanceIdInfo.bizPage != '') {
                _this.collapseValue = ['1', '2'];
              }

              var bizPage = _this.instanceIdInfo.bizPage;

              if (bizPage.includes('?')) {
                var str = bizPage.split('?');
                bizPage = str[0];

                _this.convertParam(str[1]);
              }

              var paramT = {
                instanceInfo: _this.instanceIdInfo,
                flowParam: _this.flowParam
              };

              _this.bizPageData = paramT
              _this.$nextTick(function () {
                try {
                  // _this.$router.replace({ name: _this.returnBackFuncId });
                } catch (e) {
                  _this.bizPageInfo = '业务页面:' + _this.instanceIdInfo.bizPage + '不存在!';

                  _this.$message({
                    message: _this.bizPageInfo,
                    type: 'warning'
                  });
                }
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取实例信息错误:' + response.message,
              type: 'error'
            });

            _this.cancel();
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
    cancel: function () {
      // 跳转到之前的页面
      // yufp.router.to(this.returnBackFuncId, null, this.returnBackRootId);
      this.$router.replace({ name: this.returnBackFuncId });
    }
  }

}
</script>
