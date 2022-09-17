
<template>
  <div>
    <yu-panel title="项目池信息" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程实例id" placeholder="流程实例id" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="bizUserName"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom: 10px;">
        <el-button @click="backFn">返回</el-button>
      </yu-button-drop>
      <yu-button-drop style="margin-bottom: 10px;" :hidden="hideFlag">
        <el-button @click="divide">分配</el-button>
      </yu-button-drop>
      <yu-button-drop style="margin-bottom: 10px;" :hidden="hideFlag">
        <el-button @click="signInBatch()">签收</el-button>
      </yu-button-drop>

      <yu-xtable ref="reftable" row-number :data-url="urls.index" selection-type="checkbox" :base-params="baseParams" condition-key="condition">
        <yu-xtable-column label="流程实例号" prop="instanceId"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="bizId"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="bizUserId" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="bizUserName" ></yu-xtable-column>
        <yu-xtable-column label="当前节点" prop="nodeName"></yu-xtable-column>
        <yu-xtable-column label="当前处理人" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="开始时间" prop="startTime"></yu-xtable-column>
        <yu-xtable-column label="上一节点审批结果" prop="nodeState">
          <template slot-scope="scope">
                <span style="color:gray;" v-if="scope.row.nodeState=='O-0'">拿回</span>
                <span style="color:red;" v-if="scope.row.nodeState=='O-1'">打回</span>
                <span style="color:orange;" v-if="scope.row.nodeState=='O-2'">退回</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-3'">挂起</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-4'">唤醒</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-5'">催办</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-6'">转办</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-7'">协办</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-9'">跳转</span>
                <span style="color:green;" v-if="scope.row.nodeState=='O-12'">同意</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-15'">撤回</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-10'">委托</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-16'">发起</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-13'">自动提交</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-8'">否决</span>
                <span style="color:gray;" v-if="scope.row.nodeState=='O-14'">正常结束</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="操作" prop="stateFlgDesc">
          <template slot-scope="scope">
            <el-button size="small" @click="signIn(scope.row)">签收</el-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
      <yu-xdialog title="任务分配" :visible.sync="dialogdistributionVisible" width="650px">
        <yu-xform ref="refForm1" label-width="120px" v-model="formdata" :disabled="formDisabled">
          <yu-xform-group>
            <yu-xform-item label="接收人" name="receiverIdName" rules="required" ctype="yu-xuser3" :parms="{userSts:'A', dutyId: 'GW000077'}" @select-fn="commonSelectFnUser" :mapping="{ userName: 'receiverIdName', loginCode: 'receiverId', orgName: 'receiverOrgName', orgId: 'receiverOrg' }"></yu-xform-item>
            <yu-xform-item label="接收人工号" name="receiverId" disabled ctype="input"></yu-xform-item>
            <yu-xform-item label="接收人所属机构" name="receiverOrgName" disabled ctype="input"></yu-xform-item>
            <yu-xform-item label="接收机构" name="receiverOrg" hidden ctype="input"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button icon="check" type="primary" @click="distributionSaveFn">分配</yu-button>
            <yu-button icon="yx-undo2" type="primary" @click="dialogdistributionVisible = !dialogdistributionVisible">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
const data = {};
const cite = {};
export default {
  data: function () {
    var poolId = this.$route.params.poolId;
    return {
      urls: {
        index: backend.workflowService + '/api/bench/todo',
        signIn: backend.workflowService + '/api/core/signTaskPool',
        // signInBatch: backend.workflowService + '/api/bench/signTaskPoolBatch',
        creditBizCheck: backend.workflowService + '/api/custom/bench/biztypes/count'
      },
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true,
        align: 'center'
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        hidden: true,
        align: 'center'
      }, {
        label: '流程id',
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
        label: '系统id',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '发起人机构id',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '流程状态',
        prop: 'flowState',
        resizable: true,
        hidden: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true,
        align: 'center'
      }, {
        label: '客户id',
        prop: 'bizUserId',
        resizable: true,
        align: 'center'
      }, {
        label: '客户名称',
        prop: 'bizUserName',
        resizable: true,
        align: 'center'
      }, {
        label: '当前节点ID',
        prop: 'nodeId',
        resizable: true,
        hidden: true
      }, {
        label: '当前节点',
        prop: 'nodeName',
        resizable: true,
        align: 'center'
      }, {
        label: '节点处理人',
        prop: 'userId',
        resizable: true,
        hidden: true
      }, {
        label: '当前处理人',
        prop: 'userName',
        resizable: true,
        align: 'center'
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true,
        align: 'center'
      }, {
        label: '上一节点',
        prop: 'lastNodeId',
        resizable: true,
        hidden: true
      }, {
        label: '上一节点',
        prop: 'lastNodeName',
        resizable: true,
        align: 'center',
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
        align: 'center',
        hidden: true
      }, {
        label: '上一节点审批结果',
        prop: 'nodeState',
        resizable: true,
        align: 'center',
        template: function () {
          return '<template slot-scope="scope">\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-0\'">拿回</span>\
                <span style="color:red;" v-if="scope.row.nodeState==\'O-1\'">打回</span>\
                <span style="color:orange;" v-if="scope.row.nodeState==\'O-2\'">退回</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-3\'">挂起</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-4\'">唤醒</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-5\'">催办</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-6\'">转办</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-7\'">协办</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-9\'">跳转</span>\
                <span style="color:green;" v-if="scope.row.nodeState==\'O-12\'">同意</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-15\'">撤回</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-10\'">委托</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-16\'">发起</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-13\'">自动提交</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-8\'">否决</span>\
                <span style="color:gray;" v-if="scope.row.nodeState==\'O-14\'">正常结束</span>\
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
        align: 'center',
        hidden: true
      }, {
        label: '操作',
        align: 'center',
        width: 100,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
                <el-button size="small" @click="$emit(\'custom-row-op\',scope,\'edit\')">签收</el-button>\
                </template>';
        }
      }],
      formdata: {},
      baseParams: {
        condition: JSON.stringify({
          userId: 'T.' + poolId,
          currentUserId: 'T.' + poolId
        })
      },
      height: yufp.frame.size().height - 103,
      poolId: poolId,
      currentOrgId: '',
      currentUserId: '',
      returnBackFuncId: '',
      returnBackRootId: '',
      hideFlag: true,
      dialogdistributionVisible: false
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
    var data = this.$route.params;
    this.poolId = data.poolId;
    this.returnBackFuncId = data.returnBackFuncId;
    this.returnBackRootId = data.returnBackRootId;
    if (data.poolId == 'XYKXXC' || data.poolId == 'XYKDDG') {
      this.hideFlag = false;
    }
    // var param = this.$route.
  },
  methods: {
    customRowOp: function (scope, op) {
      var _this = this; // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');
      if (op == 'edit') {
        _this.signIn(scope.row);
      }
    },
    // 签收
    signIn: function (row) {
      // 签收
      var _this = this;
      var signAble = true;
      if (_this.poolId == 'XYKXXC' || _this.poolId == 'XYKDDG') { // 信用卡项目池、信用卡电调岗
        signAble = _this.checkUserAccess(_this.userCode);
      }
      if (!signAble) {
        _this.$message({type: 'warning', message: '您的信用卡业务领取已达上限，请优先处理已领取的待办业务！'});
        return;
      }
      _this.signSingleIn(row);
    },
    // 单个签收
    signSingleIn: function (row, userCodeParam) {
      var _this = this;
      debugger;
      var param = {
        instanceId: row.instanceId,
        nodeId: row.nodeId,
        userId: userCodeParam || _this.userCode,
        poolId: _this.poolId
      };
      // lastUserId: "80011276"
      // lastUserName: "闵丽芳"
      // 只有授信流程需要这般处理  但是经李成金确认所有流程都应适用当前处理
      if (row.lastUserId == _this.userCode) {
        _this.$message({
          message: '当前认领人与该笔业务上一节点审批人一致,请重新认领!',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.signIn,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$message(response.data.tip);
            _this.$refs.reftable.remoteData();
          } else {
            _this.$message(response.message);
          }
        }
      });
    },
    // 批量签收
    signInBatch: function (userCodeParam) {
      var _this = this;
      userCodeParam = userCodeParam || _this.userCode;
      var selections = _this.$refs.reftable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      let len = selections.length;
      var signAble = true;
      if (_this.poolId == 'XYKXXC' || _this.poolId == 'XYKDDG') { // 信用卡项目池、信用卡电调岗
        signAble = _this.checkUserAccess(userCodeParam, len - 1);
      }
      if (!signAble) {
        _this.$message({type: 'warning', message: '用户的信用卡业务领取已达上限，需优先处理已领取的待办业务！'});
        return;
      }
      for (let i = 0; i < len; i++) {
        let row = selections[i];
        _this.signSingleIn(row, userCodeParam);
      }
    },
    // 校验用户信用卡领取数量是否已到达领取上限
    checkUserAccess: function (userCodeparam, numparam) {
      numparam = numparam || 0;
      userCodeparam = userCodeparam || _this.userCode;
      let _this = this;
      let resultCheck = false;
      yufp.service.request({
        method: 'POST',
        async: false,
        data: {condition: JSON.stringify({
          userId: userCodeparam,
          bizTypes: 'XK001'
        })
        },
        url: _this.urls.creditBizCheck,
        callback: function (code, message, response) {
          if (response.code == 0) {
            let todoNum = response.data;
            yufp.service.request({
              method: 'POST',
              async: false,
              url: backend.appOcaService + '/api/adminsmprop/getpropvalue',
              data: {propName: 'CREDIT_CARD_MAX_SIGN'},
              callback: function (code, message, response) {
                if (response.code == 0) {
                  let maxNum = response.data.propValue;
                  if ((todoNum + numparam) < maxNum) {
                    resultCheck = true;
                  } else {
                    resultCheck = false;
                  }
                } else {
                  _this.$message({type: 'error', message: '获取信用卡业务领取上限失败！'});
                  resultCheck = false;
                }
                // _this.formdata.graper = response.data.propValue;
              }
            });
          } else {
            _this.$message({type: 'error', message: '获取用户信用卡业务待办数量失败！'});
            resultCheck = false;
          }
        }
      });
      return resultCheck;
    },
    backFn: function () {
      this.$router.rollback({name: this.returnBackFuncId});
    },
    rowDblclick: function (row, event) {
      // 往实例信息页面跳转
      var param = {
        instanceId: row.instanceId,
        nodeId: row.nodeId,
        // userId: row.userId,
        returnBackFuncId: cite.id,
        returnBackRootId: cite.rootId
      }; // yufp.router.to("instanceInfo",param,cite.rootId);
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            bizUserName: model.bizUserName ? '%' + model.bizUserName + '%' : '',
            instanceId: model.instanceId ? model.instanceId : ''
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
    // 分配
    divide: function () {
      var _this = this;
      var selections = _this.$refs.reftable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogdistributionVisible = true;
      this.$nextTick(function () {
        _this.$refs.refForm1.resetFields();
      });
    },
    /** 分配方法 */
    distributionSaveFn () {
      let _this = this;
      let validate = false;
      _this.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      _this.signInBatch(this.formdata.receiverId);
    },
    /** 接受人选择方法 */
    commonSelectFnUser: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    }
  }

};
</script>
