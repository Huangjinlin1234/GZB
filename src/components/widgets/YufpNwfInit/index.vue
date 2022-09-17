<template>
  <div>
    <el-dialog :title="agreeNodeSelect.title" :visible.sync="agreeNodeSelect.showDialog" @close="agreeDialogClose">
      <el-form ref="form" label-width="20px" align="center">
        <el-radio-group v-model="agreeRadio" @change="agreeRadioChange" style="width:auto;padding-left: 20px;" v-show="agreeShowRadio">
          <el-form-item v-for="(node,idx) in agreeNextNodes" style="min-width: 380px;" align="left" :key="idx">
            <el-col :span="9">
              <el-radio :label="node.nodeId">{{ node.nodeName }}</el-radio>
            </el-col>
            <el-col :span="15">
              <el-row :gutter="2">
                <el-col :span="14">
                  <el-input v-model="node.userSelected" type="textarea" readonly autosize></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button @click="agreeSelectNodeUser(node,idx)" v-if="node.isSysUser != true && node.selected == true">选择</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" v-show="node.nodeType != 'E' && node.copyUserShow == true && node.selected == true" >
              <el-row :gutter="2">
                <el-col :span="12">
                  <el-input v-model="node.copyUser" type="input" readonly autosize></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button icon="message" @click="agreeSelectCopyUser(node, idx)">抄送</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-form-item>
        </el-radio-group>
        <el-checkbox-group v-model="agreeCheckBox" v-show="!agreeShowRadio" @change="agreeRadioChange">
          <el-form-item v-for="(node,idx) in agreeNextNodes" style="min-width: 380px;" align="left" :key="idx">
            <el-col :span="9">
              <el-checkbox :label="node.nodeId" :key="node.nodeId" :checked="node.selected == true">{{ node.nodeName }}</el-checkbox>
            </el-col>
            <el-col :span="15">
              <el-row :gutter="2">
                <el-col :span="14">
                  <el-input v-model="node.userSelected" type="input" readonly autosize></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button @click="agreeSelectNodeUser(node,idx)" v-if="node.isSysUser != true && node.selected == true">选择</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-form-item>
        </el-checkbox-group>
        <el-checkbox-group>
          <el-form-item v-if="(instanceIdInfo.handleType==5||instanceIdInfo.handleType==6)" style="min-width: 380px;" align="left">
            <el-col style="width:auto;padding-left: 125px;">
              <el-row>
                <el-radio v-model="agreeIsLastRadio" label="N">不提前提交</el-radio>
                <el-radio v-model="agreeIsLastRadio" label="Y">提前提交</el-radio>
              </el-row>
            </el-col>
          </el-form-item>
        </el-checkbox-group>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="agreeFn">提 交</el-button>
        <el-button type="primary" @click="agreeNodeSelect.showDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="agreeNodeSelect.userTitle" :visible.sync="agreeNodeSelect.showUserDialog">
      <el-card class="box-card" v-show="agreeNextNodes[agreeIndex]!=undefined">
        <el-tag v-for="tag in agreeNextNodes[agreeIndex].userInfos" :key="tag.userId" type="success" closable @close="agreeTagClose(tag)">
          {{ tag.userName }}
        </el-tag>
      </el-card>
      <el-table ref="agreeUserTableRef" :data="agreeNodeSelect.userTableData.slice((currpage-1)*pagesize,(currpage)*pagesize)" @row-dblclick="agreeRowDbClick">
        <el-table-column prop="userId" align="center" label="用户登录名">
        </el-table-column>
        <el-table-column prop="userName" align="center" label="姓名">
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" :page-size="pagesize" :total="agreeNodeSelect.userTableData.length" @current-change="currpageChange" @size-change="pagesizeChange"></el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="agreeUserClose">选取返回</el-button>
      </div>
    </el-dialog>
    <!-- 抄送开始-->
    <el-dialog :title="UserSelect[title]" :visible.sync="UserSelect.showUserDialog">
      <el-card class="box-card" v-show="true">
        <el-tag v-for="tag in UserSelect.SelectUsers" :key="tag.userId" type="success" closable @close="TagClose(tag)">
          {{ tag.userName }}
        </el-tag>
      </el-card>
      <el-table ref="UserTableRef" :data="UserSelect.Users.slice((currpage-1)*pagesize,(currpage)*pagesize)" @row-dblclick="RowDbClick">
        <el-table-column prop="userId" label="用户ID" align="center"> </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center"> </el-table-column>
      </el-table>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="UserSelect.Users.length" @current-change="currpageChange" @size-change="pagesizeChange">
      </el-pagination>
      <div style="margin-top: 20px">
        <el-button v-if="title == 'jump' || title == 'copy'" @click="UserDialogClose">选取返回</el-button>
        <el-button type="primary" v-if="title == 'change'" @click="UserDialogClose">确定转办</el-button>
        <el-button type="primary" v-if="title == 'assist'" @click="UserDialogClose">确定协办</el-button>
      </div>
    </el-dialog>
    <!--抄送结束-->
    <yu-xdialog title="风险拦截" :visible.sync="riskdialogVisible" width="850px" :before-close="cancelRiskFn">
    <yu-xtable ref="refTablerisk" :pageable="false" :data="riskData" row-number>
      <yu-xtable-column label="风险拦截项目" width="300" prop="itemName"></yu-xtable-column>
      <yu-xtable-column label="拦截结果" prop="resultDesc"></yu-xtable-column>
      <yu-xtable-column label="是否通过" width="120" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.result==1" class="el-icon-yx-checkmark" style="margin-top: 7px;font-size: 30px;color: #13ce66;"></i>
          <i v-if="scope.row.result==2" class="el-icon-loading" style="margin-top: 7px;font-size: 28px;color:#20a0ff"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==1" class="el-icon-yx-info" style="margin-top: 7px;font-size: 30px;color:#20a0ff"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==2" class="el-icon-yx-warning" style="margin-top: 7px;font-size: 30px;color:#f7ba2a"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==3" class="el-icon-yx-cancel-circle" style="margin-top: 7px;font-size: 30px;color: #ff4949"></i>
        </template>
      </yu-xtable-column>
    </yu-xtable>
    <div class="yu-grpButton" style="margin-top:8px;">
      <yu-button icon="check" type="primary" @click="checkRiskFn(true)">确定</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="cancelRiskFn">取消</yu-button>
    </div>
  </yu-xdialog>
  </div>
</template>
<script>
/* eslint no-console:0 */
/**
 * yufp-nwf-init
 * 流程发起后第一个节点的审批人是节点配置的审批人员，
 * 和发起人并不一定是同一个人，
 * 所以发起后在进行一次提交操作一般是行不通的，
 * 所以在使用该组件时需要把流程图的第一个节点的办理人员设置为流程发起人自定义类
 * 这样发起人发起过后就可以在进行一次提交；
 * @created by zhouqh 2020-7-1
 * @description 流程初始化＋提交下一步组件
 */
import { mapGetters } from 'vuex';
import lmtGrpMoneyMana_d1_BillListVue from '../../../views/bizmanage/lmtBiz/lmtGrpAppBiz/lmtGrpMoneyMana_d1_BillList.vue';
export default {
  name: 'YufpNwfInit',
  props: {
    commonParams: {
      type: Object,
      required: false
    },
    echainServerName: {
      type: String,
      default: backend.workflowService
    },
    el: String
  },
  data: function () {
    const backend = this.$backend;
    return {
      nodeRouterType: '',
      checkList: [],
      nodeId: '',
      instanceId: '',
      applType: '',
      index: '0',
      urls: {
        start: backend.workflowService + '/api/core/start',
        instanceInfo: backend.workflowService + '/api/core/instanceInfo',
        saveComment: backend.workflowService + '/api/core/saveComment/',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        getNextNodeInfos:
          backend.workflowService + '/api/core/getNextNodeInfos/',
        submit: backend.workflowService + '/api/core/submit',
        refuse: backend.workflowService + '/api/core/refuse',
        getNodeInfo: backend.workflowService + '/api/monitor/getCurrentNodeIds',
        getCopyUser: backend.workflowService + '/api/core/getCopyUsers',
        deleteByBizId: backend.workflowService + '/api/core/deleteByBizId',
        getInstanceByBiz: backend.workflowService + '/api/core/getInstanceByBiz'
      },
      agreeNodeSelect: {
        title: '同意提交',
        showDialog: false,
        nodeUrl: backend.workflowService + '/api/core/getNextNodeInfos/',
        userTitle: '办理人员选择',
        showUserDialog: false,
        userUrl: backend.workflowService + '/api/core/getNodeUsers',
        userTableData: []
      },
      agreeIndex: 0,
      agreeNextNodes: [{}],
      agreeShowRadio: false,
      agreeRadio: '',
      agreeCheckBox: [],
      agreeIsLastRadio: 'N',
      pagesize: 10,
      currpage: 1,
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
      commentInfo: {
        instanceId: '',
        nodeId: '',
        userId: '',
        commentId: '',
        commentSign: 'O-12',
        userComment: '',
        ext: '无'
      },
      bizId: '',
      flowParam: [],
      currentUserId: '',
      currentOrgId: '',
      type: 'init',
      // 风险拦截相关
      riskData: [],
      riskParam: [],
      riskdialogVisible: false,
      // 抄送
      UserSelect: {
        jump: '跳转节点办理人员选择',
        assist: '协办人员选择',
        change: '转办人员选择',
        copy: '抄送人员选择',
        showUserDialog: false,
        userUrl: backend.workflowService + '/api/core/getNodeUsers',
        Users: [],
        SelectUsers: []
      }
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  created () {
    this.currentUserId = this.userCode;
    this.currentOrgId = this.org.id;
  },
  methods: {
    beforeClose: function () {
      this.checkList = [];
      this.$emit('after-close');
      var _this = this;
      // 发起流程后取消提交 关闭弹窗时删除初始化的数据
      if (_this.type == 'init') {
        yufp.service.request({
          method: 'GET',
          url: _this.urls.deleteByBizId,
          data: { bizId: _this.bizId },
          callback: function (code, message, response) {
            _this.$emit('error-click', response);
            if (response.code == 0) {
              if (response.data != null) {
                _this.$message({ duration: 6000, message: '取消流程发起：' + response.data.tip, type: 'success' });
              }
            } else {
              _this.$message({
                duration: 4000,
                message: '实例数据取消时删除异常！',
                type: 'error'
              });
            }
          }
        });
      }
    },
    wfInit: function (wfInitData) {
      var _this = this;
      _this.bizId = wfInitData.bizId;
      yufp.service.request({
        // 初始化流程,先检查是否有关联实例存在
        url: _this.urls.getInstanceByBiz,
        data: { bizId: wfInitData.bizId },
        method: 'GET',
        callback: function (code, message, response) {
          if (response.data != null && response.data.length > 0) {
            let instance = response.data;
            _this.instanceId = instance[0].instanceId;
            _this.nodeId = instance[0].nodeId;
            let msg = '非当前节点审批人，不允许审批';
            if (_this.isContainStarter(instance)) {
              _this.currentUserId = instance[0].userId;
              let param = {
                instanceId: instance[0].instanceId,
                nodeId: instance[0].nodeId,
                userId: instance[0].userId
              };
              msg = ' 存在于当前审批人，可以继续审批';
              _this.type = 'submit';
              // _this.submitFn(param);
              _this.riskFn(param, wfInitData);
            } else {
              _this.$emit('error-click', response);
              _this.$message({ message: ' 存在在途流程：【' + instance[0].instanceId + '】' + msg, type: 'warning' });
            }
          } else {
            yufp.service.request({
              // 初始化流程
              url: _this.urls.start,
              data: wfInitData,
              method: 'POST',
              callback: function (code, message, response) {
                if (response.data != null) {
                  _this.nodeId = response.data.nodeId;
                  _this.instanceId = response.data.instanceId;
                  _this.currentUserId = response.data.currentUserId;
                  _this.type = 'init';
                  let param = {
                    instanceId: response.data.instanceId,
                    nodeId: response.data.nodeId,
                    userId: response.data.currentUserId
                  };
                  // _this.submitFn(param);
                  _this.riskFn(param, wfInitData);
                } else {
                  _this.$emit('error-click', response);
                  _this.$message({ message: '初始化流程失败', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    /** 风险拦截相关 --- 开始 */
    riskFn: function (param, wfInitData) {
      var _this = this;
      // 流程参数
      wfInitData.nodeId = param.nodeId;
      wfInitData.instanceId = param.instanceId;
      _this.riskData.splice(0, _this.riskData.length);
      let model = {condition: JSON.stringify({ 'sceneId': param.nodeId, 'bizType': wfInitData.bizType })};
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/prdpvriskscene/getRiskItem',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.data) {
            if (response.data.length == 0) {
              _this.submitFn(param);
            } else {
              _this.riskStart(response.data, param, wfInitData);
            }
          } else {
            _this.$message({ message: '初始化风险拦截失败', type: 'error' });
            _this.beforeClose();
          }
        }
      });
    },
    // 发起风险拦截
    riskStart: function (data, param, wfInitData) {
      let arr = [];
      this.riskParam = param;
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.itemName = data[i].itemName;
        obj.riskLevel = data[i].riskLevel;
        obj.result = '2';
        this.riskData.push(obj);
        arr.push(this.riskitem(data[i], wfInitData, i));
      }
      this.riskdialogVisible = true;
      Promise.all(arr).then(res => {
        console.log(res);
      });
    },
    /** 单项拦截 */
    riskitem (item, wfInitData, i) {
      return new Promise((resolve, reject) => {
        let _this = this;
        // model.inputId = _this.loginCode;
        _this.$request({
          url: this.evil(item.itemClass) + '?i=' + i,
          method: 'POST',
          data: JSON.stringify({ condition: JSON.stringify(wfInitData) })
        }).then(({ code, message, data }) => {
          if (data) {
            item.result = data.riskResultType;
            item.resultDesc = data.riskResultDesc;
            _this.$set(_this.riskData, i, item);
          } else {
            item.result = '3';
            item.resultDesc = '检查失败';
            _this.$set(_this.riskData, i, item);
          }
          resolve(data);
        }).catch(() => {
          item.result = '3';
          item.resultDesc = '系统调用异常，请确认';
          item.riskLevel = '2';
          _this.$set(_this.riskData, i, item);
        });
      });
    },
    /** 抄送开始 */
    agreeSelectCopyUser: function (node, index) {
      debugger;
      var _this = this;
      _this.agreeIndex = index;
      if (_this.agreeNextNodes[_this.agreeIndex].copyUserInfos == undefined) {
        _this.$set(_this.agreeNextNodes[_this.agreeIndex], 'copyUserInfos', []);
      }
      if (_this.agreeNextNodes[_this.agreeIndex].copyUser == undefined) {
        _this.$set(_this.agreeNextNodes[_this.agreeIndex], 'copyUser', '');
      }
      var param = {
        orgId: _this.currentOrgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        copyNodeId: node.nodeId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.getCopyUser,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            if (response.data != null) {
              _this.UserSelect.Users = response.data;
              _this.title = 'copy';
              _this.UserSelect.showUserDialog = true;
            } else {
              _this.$message({
                duration: 6000,
                message: '没有抄送人员可以选择!',
                type: 'warning'
              });
            }
          } else {
            if (response.message != null) {
              _this.$message({
                duration: 6000,
                message: response.message,
                type: 'warning'
              });
            } else {
              _this.$message({
                duration: 6000,
                message: '获取可抄送人员异常:' + response.message,
                type: 'warning'
              });
            }
          }
        }
      });
    },
    RowDbClick: function (row, event) {
      // 列表双击事件
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
    UserDialogClose: function () {
      // 弹框关闭
      this.UserSelect.showUserDialog = false;

      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }
      var userInfosT = this.UserSelect.SelectUsers;
      if (
        this.title == 'jump' ||
        this.title == 'assist' ||
        this.title == 'change'
      ) {
        if (userInfosT.length > 1) {
          this.$message({
            message: '该功能只能选择一个办理人员!',
            type: 'warning',
            duration: 6000
          });
          return false;
        }
      }
      var userName = userInfosT[0].userName;
      var userId = userInfosT[0].userId;
      if (this.title == 'jump') {
        this.jumpNodes[this.index].selectUser.userName = userName;
        this.jumpNodes[this.index].selectUser.userId = userId;
      } else if (this.title == 'assist') {
        this.assistFn(userId);
      } else if (this.title == 'change') {
        this.changeFn(userId);
      } else if (this.title == 'copy') {
        for (var i = 0; i < userInfosT.length; i++) {
          userName = '';
          userName = userName + userInfosT[i].userName + ';';
        }
        this.agreeNextNodes[this.agreeIndex].copyUser = userName;
        this.agreeNextNodes[this.agreeIndex].copyUserInfos = userInfosT;
      }
    },
    TagClose: function (tag) {
      // tag页签关闭事件
      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }
      var userInfosT = this.UserSelect.SelectUsers;
      userInfosT.splice(userInfosT.indexOf(tag), 1);
    },
    /** 抄送结束 */
    // 转义代码
    evil (fn) {
      let Fn = Function;
      return new Fn('return ' + fn)();
    },
    /** 检查拦截结果 */
    checkRiskFn (btn) {
      var _this = this;
      for (let i = 0; i < _this.riskData.length; i++) {
        let item = _this.riskData[i];
        // 检查未完成
        if (item.result == 2) {
          return;
        }
        // 检查不通过,且等级是拦截
        if (item.result == 3 && item.riskLevel == 3) {
          _this.beforeClose();
          this.riskdialogVisible = false;
          return;
        }
      }
      this.riskdialogVisible = false;
      // 检查通过,继续发起流程
      _this.submitFn(this.riskParam);
    },
    cancelRiskFn () {
      this.beforeClose();
      this.riskdialogVisible = false;
    },
    /** 风险拦截相关 --- 结束 */
    isContainStarter: function (param) {
      for (let i = 0; i < param.length; i++) {
        let p = param[i];
        if (this.currentUserId === p.userId) {
          return true;
        }
      }
      return false;
    },
    submitFn: function (param) {
      var _this = this;
      yufp.service.request({
        // 获取实例信息
        url: _this.urls.instanceInfo,
        data: param,
        method: 'GET',
        callback: function (code, message, response) {
          if (response.code == '500') {
            _this.$emit('error-click', response);
            let message = response.message == null ? '获取实例信息失败,确认发起人是否是审批人' : response.message;
            _this.$message({ message: message, type: 'warning' });
            _this.beforeClose();
          } else if (response.data != null) {
            _this.instanceIdInfo = response.data;
            _this.nodeRouterType = response.data.nodeRouterType;
            if (response.data.param != null) {
              // 流程参数初始化
              for (let key in response.data.param) {
                let paramTT = {};
                paramTT.key = key;
                paramTT.value = response.data.param[key];
                _this.flowParam.push(paramTT);
              }
            }
            if (response.data.comment != null) {
              // 设置评论反显
              _this.commentInfo = response.data.comment;
            }
            if (_this.commentInfo.commentSign !== null && _this.commentInfo.commentSign !== '') {
              _this.commentInfo.commentId = '';
            }
            _this.commentInfo.instanceId = _this.instanceIdInfo.instanceId;
            _this.commentInfo.nodeId = _this.instanceIdInfo.nodeId;
            _this.commentInfo.userId = _this.currentUserId;
            // _this.agreeNodeSelect.showDialog = true;
            _this.agreeDialogOpen();
          } else {
            _this.$emit('error-click', response);
            _this.$message({ message: '获取实例信息失败', type: 'error' });
            _this.beforeClose();
          }
        }
      });
    },
    agreeDialogOpen: function () {
      // 提交窗口打开事件
      var _this = this;
      var paramWF = {};
      for (var i = 0; i < _this.flowParam.length; i++) {
        // 流程参数提交
        paramWF[_this.flowParam[i].key] = _this.flowParam[i].value;
      }
      var param = {
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        param: paramWF
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.agreeNodeSelect.nodeUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            if (response.data != null) {
              _this.agreeNextNodes = response.data;
              var data = response.data;
              if (
                _this.instanceIdInfo.nodeType == '0' ||
                _this.instanceIdInfo.nodeType == '1' ||
                _this.instanceIdInfo.nodeType == '3'
              ) {
                _this.agreeShowRadio = true;
              } else {
                // 非单选节点
                _this.agreeShowRadio = false;
              }
              _this.agreeUserCheck(data);
            } else {
              _this.$emit('error-click', response);
              _this.$message({
                duration: 6000,
                message: '未获取到下一提交节点信息!',
                type: 'warning'
              });
            }
          } else {
            _this.$emit('error-click', response);
            _this.$message({
              duration: 6000,
              message:
                '获取下一节点信息异常:' + response.message == null
                  ? ''
                  : response.message,
              type: 'error'
            });
          }
        }
      });
    },
    agreeUserCheck: function (data) {
      // 判断节点是否是系统指定,并对其进行处理
      var _this = this;
      var isSingle = true;
      for (var i = 0; i < data.length; i++) {
        var users = data[i].users;
        _this.checkCopyUser(data[i], i);
        if (_this.agreeNextNodes[i].isSysUser == undefined) {
          _this.$set(_this.agreeNextNodes[i], 'isSysUser', '');
        }
        if (_this.agreeNextNodes[i].selected == undefined) {
          _this.$set(_this.agreeNextNodes[i], 'selected', '');
        }
        if (_this.agreeNextNodes[i].userInfos == undefined) {
          _this.$set(_this.agreeNextNodes[i], 'userInfos', []);
        }
        // 节点办理人预处理，只有一个、系统指定、打回后提交情况直接选中；
        for (var j = 0; j < users.length; j++) {
          var user = {
            userId: users[j].userId,
            userName: users[j].userName
          };
          if (users[j].userId == 'system_user') {
            _this.agreeNextNodes[i].isSysUser = true;
            _this.agreeNextNodes[i].selected = false;
            _this.agreeNextNodes[i].userInfos.push(user);
          } else if (users.length == 1) {
            _this.agreeNextNodes[i].isSysUser = false;
            _this.agreeNextNodes[i].selected = true;
            _this.agreeNextNodes[i].userInfos.push(user);
          } else {
            isSingle = false;
          }
        }
        // 只有一个节点、节点办理人只有一个的情况，不需要弹窗选择
        // if(data.length == 1 && isSingle){
        // // 提交处理，不显示弹窗处理节点参数
        // if (_this.agreeShowRadio) {
        //  _this.agreeRadio = data[i].nodeId;
        // } else {
        //  _this.agreeCheckBox.push(data[i].nodeId);
        // }
        // _this.agreeRadioChange(data[i].nodeId);
        // _this.agreeFn();
        // return;
        // }
        // 打开提交选择弹窗
        _this.agreeNodeSelect.showDialog = true;
        if (data.length == 1) {
          // 只有一个节点直接选中
          if (_this.agreeShowRadio) {
            _this.agreeRadio = data[i].nodeId;
          } else {
            _this.agreeCheckBox.push(data[i].nodeId);
          }
          _this.agreeRadioChange(data[i].nodeId);
        }
      }
    },
    // 抄送
    checkCopyUser: function (data, index) {
      var _this = this;
      if (_this.agreeNextNodes[index].copyUserShow == undefined) {
        _this.$set(_this.agreeNextNodes[index], 'copyUserShow', false);
      }
      var param = {
        orgId: _this.currentOrgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        copyNodeId: data.nodeId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.getCopyUser,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            if (response.data != null) {
              _this.agreeNextNodes[index].copyUserShow = true;
            }
          }
        }
      });
    },
    agreeRadioChange: function (val) {
      // 节点选择变化事件
      var _this = this;
      var nodeIds = [];
      var checked = false;
      if (_this.agreeShowRadio) {
        nodeIds.push(val);
      } else {
        nodeIds = val;
      }
      // 未被选择的节点处理以及选择的数据项进行处理
      for (var i = 0; i < _this.agreeNextNodes.length; i++) {
        checked = false;
        for (var k = 0; k < nodeIds.length; k++) {
          if (nodeIds[k] == _this.agreeNextNodes[i].nodeId) {
            checked = true;
            _this.agreeNextNodes[i].selected = true;
            _this.agreeIndex = i;
            _this.agreeUserClose();
          }
        }
        if (!checked) {
          _this.agreeNextNodes[i].userSelected = '';
          _this.agreeNextNodes[i].selected = false;
        }
      }
    },
    agreeSelectNodeUser: function (node, index) {
      // 选择按钮
      this.agreeIndex = index;
      this.agreeUserDialogOpen(node.nodeId);
    },
    agreeUserDialogOpen: function (nodeId) {
      // 选择节点办理人员窗口打开事件处理
      var _this = this;
      var nodeInfo = {};
      nodeInfo.instanceId = _this.instanceIdInfo.instanceId;
      nodeInfo.nodeId = nodeId;
      var param = {
        condition: JSON.stringify(nodeInfo)
      };
      yufp.service.request({
        method: 'GET',
        data: param,
        url: _this.agreeNodeSelect.userUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              _this.agreeNodeSelect.userTableData = response.data;
              _this.agreeNodeSelect.showUserDialog = true;
            } else {
              _this.$emit('error-click', response);
              _this.$message({
                duration: 6000,
                message: '未获取到办理人员信息!',
                type: 'warning'
              });
            }
          } else {
            _this.$emit('error-click', response);
            _this.$message({
              duration: 6000,
              message: '获取办理人员异常:' + response.message,
              type: 'warning'
            });
          }
        }
      });
    },
    agreeRowDbClick: function (row, event) {
      // tag双击事件
      var user = {};
      user.userId = row.userId;
      user.userName = row.userName;
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], 'userInfos', []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      for (var i = 0; i < userInfosT.length; i++) {
        // 去重
        if (userInfosT[i].userId == user.userId) {
          return;
        }
      }
      userInfosT.push(user);
    },
    agreeTagClose: function (tag) {
      // tag关闭事件
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], 'userInfos', []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      userInfosT.splice(userInfosT.indexOf(tag), 1);
    },
    agreeUserClose: function () {
      // 选取返回
      this.agreeNodeSelect.showUserDialog = false;
      var userName = '';
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], 'userInfos', []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      for (var i = 0; i < userInfosT.length; i++) {
        userName = userName + userInfosT[i].userName + ';';
      }
      this.agreeNextNodes[this.agreeIndex].userSelected = userName;
    },
    agreeDialogClose: function () {
      // 提交窗口关闭事件
      this.agreeRadio = '';
      this.agreeCheckBox = [];
      this.agreeIsLastRadio = 'N';
      this.agreeIndex = 0;
      this.agreeNextNodes = [{}];
      this.agreeShowRadio = false;
      this.beforeClose();
    },
    agreeFn: function () {
      // 节点提交操作
      // 遍历选中节点
      var nodes = [];
      if (this.agreeRadio != '' && this.agreeShowRadio) {
        nodes.push(this.agreeRadio);
      }

      if (this.agreeCheckBox.length > 0 && !this.agreeShowRadio) {
        for (var i = 0; i < this.agreeCheckBox.length; i++) {
          nodes.push(this.agreeCheckBox[i]);
        }
      }
      // 处理选中的下一节点相关信息
      var nodeInfos = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < this.agreeNextNodes.length; j++) {
          if (this.agreeNextNodes[j].nodeId == nodes[i]) {
            var nodeInfo = {};
            nodeInfo.nextNodeId = nodes[i];
            var nextUser = [];
            var nextCopyUser = [];
            if (
              this.agreeNextNodes[j].userInfos != null &&
              this.agreeNextNodes[j].userInfos != undefined
            ) {
              for (
                var k = 0;
                k < this.agreeNextNodes[j].userInfos.length;
                k++
              ) {
                // 去重
                nextUser.push(this.agreeNextNodes[j].userInfos[k].userId);
              }
            }
            if (
              this.agreeNextNodes[j].copyUserInfos != null &&
              this.agreeNextNodes[j].copyUserInfos != undefined
            ) {
              for (
                var l = 0;
                l < this.agreeNextNodes[j].copyUserInfos.length;
                l++
              ) {
                // 去重
                nextCopyUser.push(
                  this.agreeNextNodes[j].copyUserInfos[l].userId
                );
              }
            }
            nodeInfo.nextNodeUserIds = nextUser;
            nodeInfo.nextNodeCopyUserIds = nextCopyUser;
            nodeInfos.push(nodeInfo);
          }
        }
      }
      // 校验节点选择的处理人
      var _this = this;
      if (nodeInfos.length == 0) {
        _this.$message({
          duration: 6000,
          message: '选择节点'
        });
        return;
      } else {
        for (var i = 0; i < nodeInfos.length; i++) {
          if (nodeInfos[i].nextNodeUserIds.length == 0) {
            _this.$message({
              duration: 6000,
              message: '选择节点处理人'
            });
            return;
          }
        }
      }
      var param = {};
      if (_this.agreeIsLastRadio == 'Y') {
        // 是否直接提交， 一般【办理类型】是[多人顺序可结束]或[多人并行可结束]时生效，可以选择true和false;
        param.lastOne = true;
      }
      param.orgId = _this.currentOrgId;
      param.nextNodeInfos = nodeInfos;
      // 流程评论提交
      if (_this.commentInfo.userComment == '') {
        _this.commentInfo.userComment = '[同意]';
        _this.commentInfo.commentSign = 'O-12';
      }
      param.comment = _this.commentInfo;
      var paramWF = {};
      for (var i = 0; i < _this.flowParam.length; i++) {
        // 流程参数提交
        paramWF[_this.flowParam[i].key] = _this.flowParam[i].value;
      }
      param.param = paramWF;
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.submit,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            for (var i = 0; i < response.data.length; i++) {
              _this.type = 'complete';
              if (response.data[i].code === '1') {
                // 提交失败，删除掉这笔数据
                _this.type = 'init';
                _this.$message({
                  message: response.data[i].tip,
                  type: 'warning'
                });
                _this.$emit('error-click', response);
              } else if (response.data[i].code === 'E') {
                // 正常结束
                _this.$message({
                  message: response.data[i].tip,
                  type: 'success'
                });
              } else {
                var msg = response.data[i].tip + ';下一节点：' + response.data[i].nodeName + '@下一节点审批人：' + response.data[i].userNames;
                if (response.data[i].userNames.length == 0) {
                  msg = response.data[i].tip;
                }
                _this.$message({message: msg, type: 'success'});
              }
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
                duration: 4000,
                message: '提交异常!',
                type: 'error'
              });
            }

            _this.type = 'init';
            _this.$emit('error-click', response);
          }
          _this.$emit('success-click');
          _this.agreeNodeSelect.showDialog = false;
        }
      });
    },
    currpageChange: function (val) {
      this.currpage = val;
    },
    pagesizeChange: function (val) {
      this.pagesize = val;
    }
  }
};
</script>
