<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会议组织</span>
      </div>
      <el-form :model="meetForm" :rules="rules" ref="refForm" label-width="100px" align="center">
        <el-form-item prop="meetType" align="center">
          <el-col :span="5">
            <span align="center">会议模式:</span>
          </el-col>
          <el-col :span="14">
            <el-select v-model="meetForm.meetType" clearable>
              <el-option v-for="item in meetTypes" :key="item.key" :value="item.key" :label="item.value"></el-option>
            </el-select></el-col>
        </el-form-item>
        <el-form-item prop="meetUser" align="center">
          <el-col :span="5">
            <span align="center">参会人员：</span>
          </el-col>
          <el-col :span="14">
            <el-table :data="meetForm.meetUser" style="width: 100%" border>
              <el-table-column label="序号" type="index" width="50px"></el-table-column>
              <el-table-column align="center" v-for="(item,index,key) in editColumns" :item="item" :key="key" :index="index" :label="item.label">
                <template slot-scope="scope">
                  <yu-input icon="search" v-model="scope.row[item.prop]" @click="selectUser(scope.$index,scope.row)" v-if="item.type ==='input'">
                  </yu-input>
                  <span v-if="item.type ==='text'">{{ scope.row[item.prop] }}</span>
                  <el-select v-model="scope.row[item.prop]" clearable v-if="item.type ==='select'">
                    <el-option v-for="item1 in isCheckBizs" :key="item1.key" :value="item1.key" :label="item1.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="removeUser(scope.$index, scope.row)" v-if="meetForm.meetUser.length > 1">删除</el-button>
                  <el-button size="mini" type="text" @click="addUser(scope.$index, scope.row)" v-if="scope.$index === meetForm.meetUser.length-1">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
        <el-form-item label="" align="center">
          <el-button type="primary" @click="onBackFlow">退回</el-button>
          <el-button type="primary" @click="sureStart">提交</el-button>
          <el-button type="primary" @click="reBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>审批历史</span>
      </div>
      <el-table :data="nodeHistory" border style="width: 100%">
        <el-table-column label="序号" type="index" width="50px"></el-table-column>
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
        <yu-xform-group :column="3">selectFn
          <yu-xform-item label="用户号" placeholder="用户号" ctype="input" name="userId"></yu-xform-item>
          <yu-xform-item label="用户名称" placeholder="用户名称" ctype="input" name="userName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform-->
      <yu-xtable ref="reftable" :data="Users" border>
          <yu-xtable-column prop="userId" label="用户号"></yu-xtable-column>
          <yu-xtable-column prop="userName" label="姓名"></yu-xtable-column>
      </yu-xtable>
      <div slot="footer" align="center">
        <el-button type="primary" @click="selectFn">确定</el-button>
        <el-button @click="userSelectDialog = false">取消</el-button>
      </div>
    </el-dialog-x>
    <el-dialog-x title="完善会议信息" :visible.sync="startdialogVisible" width="650px" @close="cancel">
      <div class="box-card" style="margin: 15px;">
        <el-form ref="reform" :model="gatherModel" label-width="80px" :rules="rules">
          <el-form-item label="会议主题" prop="mettingSub">
            <el-input type="input" v-model="gatherModel.mettingSub"></el-input>
          </el-form-item>
          <el-form-item label="会议年份" prop="mettingYear">
            <el-date-picker v-model="gatherModel.mettingYear" type="year" placeholder="选择年" value-format="yyyy" @change="getyear" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item label="会议期数" prop="mettingNo">
            <el-select v-model="gatherModel.mettingNo" placeholder="选择期数">
              <el-option v-for="index in number" :label="index.value" :value="index.key+''" :key="index.key+''">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" align="center">
        <el-button type="primary" v-if="cancelHidden == true" @click="sureStart">开始会议</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog-x>

    <el-dialog :title="callbackNodeSelect.title" :visible.sync="callbackNodeSelect.showDialog" height="300px" @open="backDialogOpen" @close="wfCallBackClose">
      <el-tabs v-model="backActiveName" type="card">
        <el-tab-pane label="打回节点" name="first" align="center">
          <el-row style="margin-top: 20px" align="center">
            <el-col>
              <el-radio-group v-model="backNodeModel" @change="radioChange" style="width: 600px" align="left">
                <el-row :gutter="10" v-for="item in backNodes" :key="item.nodeId" >
                  <el-col :span="8" font-size="14px">
                    <el-radio :label="item.nodeId" :key="item.nodeName">{{ item.nodeName }}
                    </el-radio>
                  </el-col>
                  <el-col :span="16">
                    <el-radio-group v-model="userModel" v-show="item.selected">
                      <el-radio v-for="item1 in item.usersList" :label="item1.userId" :key="item1.userName" font-size="14px">{{ item1.userName }}</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="打回后节点提交方式" name="second" align="center">
          <el-form ref="form" align="center">
            <el-form-item style="margin-bottom: 15px"></el-form-item>
            <el-form-item align="center">
              <el-radio-group v-model="backnode" align="center">
                <el-radio :label="0">直接提交到打回节点</el-radio>
                <el-radio :label="1">沿流程路径逐级提交</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" align="center">
        <el-button type="primary" @click="wfCallBack">确 定</el-button>
        <el-button type="primary" @click="wfCallBackClose">取 消</el-button>
      </div>
    </el-dialog>
    <yufp-nwf-submit ref="flow" :pagedata="pageData" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { validator } from '@/utils/validate';
export default {
  props: {
    bizPageData: {
      // 评论信息
      type: Array,
      default: function () {
        return null;
      }
    }
  },
  data: function () {
    return {
      callbackNodeSelect: {
        title: '打回节点选择',
        showDialog: false,
        nodeUrl: backend.workflowService + '/api/core/getCallBackNodes'
      },
      backNodeModel: '',
      userModel: '',
      backNodes: [], // 打回节点
      backnode: 1, // 打回方式
      backActiveName: 'first', // 退回列表页签处理
      pickerOptions: {
        disabledDate: function (time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      urls: {
        userUrl: backend.workflowService + '/api/metting/user',
        start: backend.workflowService + '/api/metting/run',
        update: backend.workflowService + '/api/metting/updateMeet',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        dataUrl: backend.workflowService + '/api/metting/voteAll'
      },
      editColumns: [
        // 表头信息
        {
          type: 'input',
          prop: 'userId',
          label: '员工号',
          width: '300'
        },
        {
          type: 'text',
          prop: 'userName',
          label: '员工姓名',
          width: '150'
        },
        {
          type: 'select',
          prop: 'isCheckBiz',
          label: '是否查看业务',
          width: '150'
        }
      ],
      rules: {
        meetType: [
          { required: true, message: '请选择会议模式', trigger: 'blur' }
        ],
        mettingYear: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ],
        mettingSub: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ],
        mettingNo: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ]
        // meetUser: [
        //   { required: true, message: "请选择会议模式", trigger: "blur" }
        // ]
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
      tableColumns: [
        { label: '用户号', prop: 'userId', resizable: true },
        { label: '用户名称', prop: 'userName', resizable: true }
      ],
      meetForm: {
        instanceId: '',
        meetId: '',
        meetType: '05',
        meetUser: [
          {
            userId: '',
            userName: '',
            isCheckBiz: '0'
          }
        ]
      },
      gatherModel: {
        // meetId: {},
        // instanceId: {},
        mettingSub: '',
        mettingYear: '',
        mettingNo: '',
        // userId: [],
        totalCount: 0
      },
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
      currentOrgId: '',
      currentUserId: '',
      number: [],
      meetInfo: {},
      nodeHistory: [],
      formdata: {
        userId: '',
        userName: ''
      },
      meetId: '',
      instanceId: '',
      baseParams: {
        meetId: '',
        orgId: ''
      },
      tableIndex: 0,
      cancelHidden: true,
      userSelectDialog: false,
      startdialogVisible: false,
      returnBackFuncId: '',
      instanceInfo: null,
      pageData: {
        flowParam: {},
        optypeOptions: {}
      },
      Users: [],
      type: 'new'
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
    this.baseParams.orgId = this.org.id;

    const params =
      this.bizPageData == null ? this.$route.params : this.bizPageData;
    this.meetId = params.meetId;
    this.meetForm.meetId = params.meetId;
    this.meetForm.instanceId = params.instanceId;
    this.meetInfo = params;
    this.instanceId = params.instanceId;
    if (params.meetType) {
      this.meetForm.meetType = params.meetType;
    }
    if (params.returnBackFuncId) {
      this.returnBackFuncId = params.returnBackFuncId;
    }
    if (params.instanceInfo) {
      this.instanceInfo = params.instanceInfo;
      this.pageData.instanceInfo = params.instanceInfo;
    }

    this.baseParams.meetId = params.meetId;
    this.getComment(params.instanceId);
    this.initData(params);

    var _this = this;
    this.$xutils.request({
      async: false,
      type: 'POST',
      url: this.$backend.cmisBiz + '/api/coopplanapp/query',
      data: {condition: JSON.stringify({serno: params.bizId})},
      success: (response, status, xhr) => {
        if (response.code == 0) {
          if (response.data[0].partnerType === '1' || response.data[0].partnerType === '2' || response.data[0].partnerType === '3' || response.data[0].partnerType === '4' || response.data[0].partnerType === '5' || response.data[0].partnerType === '8' || response.data[0].partnerType === '12' || response.data[0].partnerType === '15') {
            // 合作方类型=保险公司 会议模式，仅有贷审会模式
            _this.meetTypes = [{
              key: '05',
              value: '贷审会模式'
            }];
          }
        } else {
          this.$xutils.showMsgBox('提示', '数据异常', 400, 300);
        }
      },
      error: (result, status, errorThrown) => {
        this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
      }
    });
  },
  mounted: function () {
    for (var i = 1; i < 20; i++) {
      var no = {
        key: i,
        value: i
      };
      this.number.push(no);
    }
  },
  methods: {
    initData: function (data) {
      var _this = this;
      var param = {
        condition: JSON.stringify({
          instanceId: data.instanceId,
          meetId: data.meetId
        })
      };
      yufp.service.request({
        method: 'GET',
        data: param,
        url: _this.urls.dataUrl,
        callback: function (code, message, response) {
          if (response.data && response.data.length > 0) {
            _this.meetForm.meetUser = response.data;
            _this.type = 'edit';
            yufp.extend(_this.gatherModel, response.data[0]);
          }
        }
      });
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
    selectUser: function (index, row) {
      var _this = this;
      _this.tableIndex = index;
      this.baseParams.dutyId = 'ZHT19'; // 总行投资管理委员会
      if (_this.meetForm.meetType === '05') {
        this.baseParams.dutyId = 'ZHT14'; // 总行信贷审批委员会
      } else if (_this.meetForm.meetType === '04') {
        this.baseParams.dutyId = 'XDB17'; // 三人会商小组
      }
      yufp.service.request({
        method: 'GET',
        data: _this.baseParams,
        url: _this.urls.userUrl,
        callback: function (code, message, response) {
          if (response.data && response.data.length > 0) {
            _this.Users = response.data;
            _this.userSelectDialog = true;
          }
        }
      });
    },
    addUser: function (index, row) {
      if (this.meetForm.meetType === '04' && !this.checkUserNum('add')) {
        return false;
      }
      var form = {
        userId: '',
        userName: '',
        isCheckBiz: '0'
      };
      this.meetForm.meetUser.push(form);
    },
    removeUser: function (index, row) {
      this.meetForm.meetUser.splice(index, 1);
    },
    onSubmit: function () {
      var _this = this;
      _this.$refs.refForm.validate(function (vaild) {
        if (!vaild) {
          return;
        }
      });
      if (_this.meetForm.meetType === '04' && !_this.checkUserNum('submit')) {
        return false;
      }
      if (_this.type === 'edit') {
        _this.nwfstartFn();
        return;
      }
      // _this.startdialogVisible = true;
    },
    selectFn: function () {
      var row = this.$refs.reftable.selections;
      if (row.length !== 1) {
        this.$message({ message: '请选择一条数据', type: 'warning' });
        return;
      }
      debugger;
      if (row[0].userId == '' || row[0].userId == null || row[0].userName == '' || row[0].userName == null) {
        this.$message({ message: '用户编号或者用户名不可为空!', type: 'warning' });
        return;
      }
      for (var i = 0; i < this.meetForm.meetUser.length; i++) {
        if (this.meetForm.meetUser[i].userId === row[0].userId) {
          this.$message({ message: '已经选择了该人员！', type: 'warning' });
          return;
        }
      }
      this.meetForm.meetUser[this.tableIndex].userId = row[0].userId;
      this.meetForm.meetUser[this.tableIndex].userName = row[0].userName;
      this.userSelectDialog = false;
    },
    sureStart: function () {
      var _this = this;
      // 校验 贷审会模式 最少五个人  三人会商 三个人
      if (_this.meetForm.meetType == '05') {
         if (_this.meetForm.meetUser.length < 1) {
           _this.$message({ message: '贷审会模式下，至少选5个人！请重新选择', type: 'warning' });
           return;
        }
      } else if (_this.meetForm.meetType == '04') {
        if (_this.meetForm.meetUser.length != 3) {
          _this.$message({ message: '三人会商模式下，只可选3个人！请重新选择！', type: 'warning' });
          return;
        }
      }
      _this.nwfstartFn();
    },
    nwfstartFn: function () {
      var _this = this;
      var params = _this.meetForm;
      var list = [];
      list.push(_this.meetId);
      params.user = _this.meetForm.meetUser;
      yufp.extend(params, _this.gatherModel);
      params.meetId = list;
      var list1 = [];
      list1.push(_this.instanceId);
      params.instanceId = list1;
      yufp.service.request({
        method: 'POST',
        data: params,
        url: _this.urls.start,
        callback: function (code, message, response) {
          if (response.data) {
           //  _this.$message({
           //    message: '会议预备,请自行开启会议!',
           //    type: 'success'
           //  });
           //  _this.type = 'edit';
           //  _this.startdialogVisible = false;
            _this.submit();
          }
        }
      });
    },
    submit: function () {
      if (this.instanceInfo === null) {
        return;
      }
      var paramWF = {'key': 'value'};
      // 提交意见信息
      var commentInfo = {
        commentId: '',
        commentSign: 'O-12', // 审批结论，必输
        userComment: '发起会议后提交', // 审批意见
        ext: '无', // 扩展意见
        optType: '',
        optReasTyp: ''
      };
      commentInfo.instanceId = this.instanceInfo.instanceId; // 实例号，必输
      commentInfo.nodeId = this.instanceInfo.nodeId; // 当前审批节点，必输
      commentInfo.userId = this.currentUserId; // 审批人，必输
      var param = {
        opType: 'O-12', // 审批结论
        param: paramWF, // 需要更新的业务参数
        comment: commentInfo // 提交意见参数
      };
      // 调用公共组件的提交方法
      this.$refs.flow.submitFn(param);

      // 现发现三人会商时自动开启会议没有同步更新会议状态,现做以下处理,手动更新状态信息
      if (this.meetForm.meetType == '04') {
        yufp.service.request({
          method: 'POST',
          data: {instanceId: this.instanceInfo.instanceId, mettingSts: 'R'},
          url: backend.workflowService + '/api/bench/meetting/updatemeetstatusunderthreediscuss',
          callback: function (code, message, response) {
          // 处理结束后不做操作

          }
        });
      }
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
    },
    cancel: function () {
      this.Members = [];
      // this.number = [];
      this.selectMembers = [];
      this.gatherModel.userId = [];
      this.gatherModel.mettingNo = '';
      this.gatherModel.mettingSub = '';
      this.gatherModel.mettingYear = '';
      this.startdialogVisible = false;
      this.$refs.reform.resetFields();
    },
    reBack: function () {
      if (this.returnBackFuncId) {
        // this.update();
        // this.$router.replace({ name: this.returnBackFuncId });
      } else {
        yufp.router.removeTab(this.$route.path);
      }
    },
    update: function () {
      var _this = this;
      var params = {
        meetId: _this.meetForm.meetId,
        meetType: _this.meetForm.meetType
      };
      yufp.service.request({
        method: 'POST',
        data: params,
        url: _this.urls.update,
        callback: function (code, message, response) {
          // if (response.data) {
          //   _this.$message({
          //     message: "会议开启成功!",
          //     type: "success"
          //   });
          //   _this.type = 'edit';
          //   _this.startdialogVisible = false;
          // }
        }
      });
    },
    getyear: function (val) {
      this.gatherModel.mettingYear = val;
    },
    getNo: function (val) {
      this.gatherModel.mettingNo = val;
    },
    // 流程审批执行后的回调方法
    afterSubmit: function (data) {
      this.$router.replace({
        name: this.instanceInfo.returnBackFuncId
      });
    },
    onBackFlow: function () {
      // 打回操作
      var _this = this;
      _this.doCallBack();
    },
    doCallBack: function () {
      // var _this = this;
      // _this.backNodeModel = '';
      // _this.callbackNodeSelect.showDialog = true;
      // 提交意见信息
      var commentInfo = {
        commentId: '', // 意见主键，置空即可
        commentSign: 'O-1', // 审批结论，和表单中对应的选择下拉框的值绑定
        userComment: '打回', // 审批意见
        ext: '无' // 扩展意见
      };
      commentInfo.instanceId = this.bizPageData.instanceInfo.instanceId;
      commentInfo.nodeId = this.bizPageData.instanceInfo.nodeId;
      commentInfo.userId = this.userCode;
      var param = {
        opType: commentInfo.commentSign, // 审批结论
        param: this.bizPageData.flowParam, // 业务参数
        comment: commentInfo // 提交意见参数
      };
      // 调用公共组件的提交方法
      this.$refs.flow.submitFn(param);
    },
    backDialogOpen: function () {
    // 获取可打回节点的信息
      var _this = this;
      var param = {
        orgId: _this.instanceInfo.orgId,
        instanceId: _this.instanceInfo.instanceId,
        nodeId: _this.instanceInfo.nodeId,
        userId: _this.currentUserId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.callbackNodeSelect.nodeUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              var nodes = response.data;
              for (var i = 0; i < nodes.length; i++) {
                var node = {
                  nodeId: nodes[i].nodeId,
                  nodeName: nodes[i].nodeName,
                  selected: false,
                  usersList: []
                };
                var users = nodes[i].users;
                if (users.length != 0) {
                  for (var k = 0; k < users.length; k++) {
                    var user = {
                      userId: users[k].userId,
                      userName: users[k].userName
                    };
                    node.usersList.push(user);
                  }
                }
                _this.backNodes.push(node);
              }
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到可打回节点!',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取打回节点异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    radioChange: function (val) {
      debugger;
      // 打回节点选择
      this.userModel = '';
      for (var i = 0; i < this.backNodes.length; i++) {
        var id = this.backNodes[i].nodeId;
        this.backNodes[i].selected = false;
        if (id == val) {
          this.backNodes[i].selected = true;
        }
      }
    },
    wfCallBackClose: function () {
    // 打回界面关闭
      var _this = this;
      // _this.backActiveName = 'first';
      _this.backnode = 1;
      _this.backNodes = [];
      // _this.usersList = [];
      _this.callbackNodeSelect.showDialog = false;
    },
    wfCallBack: function () {
    // 打回接口调用
      var _this = this;
      if (!_this.backNodeModel) {
        _this.$message({
          duration: 6000,
          message: '请选择打回节点!',
          type: 'error'
        });
        return false;
      }
      if (!_this.userModel) {
        _this.$message({
          duration: 6000,
          message: '请选择打回节点的办理人!',
          type: 'error'
        });
        return false;
      }
      _this.callbackNodeSelect.showDialog = false;
      var param = {
        callbackNodeId: _this.backNodeModel,
        callbackUserId: _this.userModel,
        callbackModel: _this.backnode + '', // 打回模式 【 0-打回后提交直接给我，1-打回后提交沿流程路径（默认）】
        orgId: _this.currentOrgId
      };
      _this.commentInfo.commentSign = 'O-1';
      if (_this.commentInfo.userComment == '') {
        _this.commentInfo.userComment = '[打回]';
      }
      param.comment = _this.commentInfo;
      // 打回接口调用
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.callBack,
        callback: function (code, message, response) {
          if (response.code == 0) {
          // 跳转到之前的页面
            _this.$message({
              duration: 6000,
              message: response.data.tip,
              type: 'success'
            });
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            _this.$message({
              duration: 6000,
              message: '打回异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
      _this.wfCallBackClose();
    }
  }

};
</script>
