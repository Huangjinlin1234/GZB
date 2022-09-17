
<template>
  <div>
    <yu-panel title="秘书会办" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" form-type="search">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="会议状态" placeholder="会议状态" ctype="select" name="mettingSts" :options="mettingStsOptions"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-row-op="customRowOp"></el-table-x>
    </yu-panel>
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="startdialogVisible" width="650px" @close="cancel">
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
          <el-form-item label="会议成员" prop="userId">
            <el-select v-model="gatherModel.userId" :multiple="true" @change="memberChange" :disabled="false" @remove-tag="removeTag">
              <el-option v-for="item in Members" :key="item.userId" :label="item.userName" :value="item.userId">
                <span style="float: left">{{ item.userName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" align="center">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" v-if="cancelHidden == true" @click="nwfstartFn">开始会议</el-button>
        <el-button type="primary" v-if="cancelHidden == false" @click="nwfrerunFn">重新开始会议</el-button>
      </div>
    </el-dialog-x>
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="detaildialogVisible" width="900px">
      <el-table-x ref="gathertable" :data-url="urls.dataUrl" :pageable="false" :base-params="detailParams" :table-columns="detailColumns"></el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="detaildialogVisible = false">确定</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: function () {
    var _this = this;
    return {
      pickerOptions: {
        disabledDate: function (time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      urls: {
        index: backend.workflowService + '/api/metting/myStart',
        users: backend.workflowService + '/api/metting/user',
        start: backend.workflowService + '/api/metting/run',
        rerun: backend.workflowService + '/api/metting/rerun',
        dataUrl: backend.workflowService + '/api/metting/myOp'
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
        resizable: true
      }, {
        label: '会议秘书',
        prop: 'userId',
        resizable: true
      }, {
        label: '业务页面',
        prop: 'bizPage',
        resizable: true,
        hidden: true
      }, {
        label: '会议状态',
        prop: 'mettingSts',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
            <yu-tag type="gary" v-if="scope.row.mettingSts==\'S\'">会议未开始</yu-tag>\
            <yu-tag type="success" v-if="scope.row.mettingSts==\'R\'">正在投票中</yu-tag>\
            <yu-tag type="danger" v-if="scope.row.mettingSts==\'E\'">会议已结束</yu-tag>\
          </template>';
        }
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '操作',
        width: 200,
        fixed: 'right',
        template: function () {
          return `<template slot-scope="scope">
                    <el-button size="small" type="text" v-if="scope.row.mettingSts=='S'" @click="$emit('custom-row-op',scope,'start')">开始会议</el-button>
                    <el-button size="small" type="text" v-if="scope.row.mettingSts=='R'" @click="$emit('custom-row-op',scope,'start')">重新开始会议</el-button>
                    <el-button size="small" type="text" @click="$emit('custom-row-op',scope,'detail')">查看</el-button>
                  </template>`;
        }
      }],
      mettingStsOptions: [{
        key: 'S',
        value: '会议未开始'
      }, {
        key: 'E',
        value: '会议已结束'
      }, {
        key: 'R',
        value: '正在投票中'
      }],
      formdata: {},
      baseParams: {},
      queryButtons: [{
        label: '搜索',
        op: 'submit',
        type: 'primary',
        click: function (model, valid) {
          if (valid) {
            var param = {
              condition: JSON.stringify(model)
            };

            _this.$refs.reftable.remoteData(param);
          }
        }
      }, {
        label: '重置',
        op: 'reset'
      }],
      rules: {
        mettingYear: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        mettingSub: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        mettingNo: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }],
        userId: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }]
      },
      detailParams: {},
      detailColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true
      }, {
        label: '会议标题',
        prop: 'mettingSub',
        resizable: true
      }, {
        label: '会议年份',
        prop: 'mettingYear',
        resizable: true
      }, {
        label: '会议期号',
        prop: 'mettingNo',
        resizable: true
      }, {
        label: '投票人',
        prop: 'userId',
        resizable: true
      }, {
        label: '投票人姓名',
        prop: 'userName',
        resizable: true
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '结束时间',
        prop: 'endTime',
        resizable: true
      }, {
        label: '结论',
        prop: 'mettingSts',
        resizable: true,
        template: function () {
          return `<template slot-scope="scope">
            <yu-tag type="success" v-if="scope.row.mettingSts=='Y'">同意</yu-tag>
            <yu-tag type="danger" v-if="scope.row.mettingSts=='N'">否决</yu-tag>
            <yu-tag type="warning" v-if="scope.row.mettingSts=='G'">再议</yu-tag>
            <yu-tag type="gray" v-if="scope.row.mettingSts==null">未投票</yu-tag>
          </template>`;
        }
      }, {
        label: '会议意见',
        prop: 'mettingComment',
        resizable: true
      }],
      height: yufp.frame.size().height - 103,
      viewType: 'START',
      viewTitle: {
        START: '开始会办处理',
        EDIT: '修改会议事项',
        DETAIL: '参会人投票详情'
      },
      startdialogVisible: false,
      detaildialogVisible: false,
      gatherModel: {
        instanceId: {},
        mettingSub: '',
        mettingYear: '',
        mettingNo: '',
        userId: [],
        totalCount: 0
      },
      number: [],
      selectMembers: [],
      Members: [],
      cancelHidden: true
    };
  },
  computed: {
    ...mapGetters([
      'userCode',
      'org'
    ])
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode
      }
    };
  },
  methods: {
    customRowOp: function (scope, op) {
      // 表格操作按钮事件
      var _this = this; // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');


      if (op == 'detail') {
        _this.viewType = 'DETAIL';
        _this.detailParams = {
          condition: JSON.stringify({
            instanceId: scope.row.instanceId
          })
        };

        _this.$nextTick(function () {
          _this.detaildialogVisible = true;
        });
      } else if (op == 'start') {
        _this.startFn(scope.row);
      }
    },
    startFn: function (row) {
      var _this = this;

      _this.number = [];
      var params = {
        instanceId: '',
        orgId: _this.org.id,
        dutyId: 'D001'
      };
      _this.viewType = 'START'; // 期数选择项

      for (var i = 1; i < this.$refs.reftable.data.length + 50; i++) {
        var no = {
          key: i,
          value: i
        };

        _this.number.push(no);
      }

      var list = new Array();

      if (row != null) {
        // 选择了一条数据
        if (row.mettingSts === 'E') {
          _this.$message({
            message: '会议已经结束，不能进行修改!',
            type: 'warning'
          });

          return false;
        }

        if (row.mettingSts === 'S') {
          _this.cancelHidden = true;
        } else {
          _this.viewType = 'EDIT';
          _this.cancelHidden = false;
        }

        params.instanceId = row.instanceId;
        list.push(row.instanceId);
      } else {
        this.$message({
          message: '请选择一条数据!',
          type: 'warning'
        });
        return false;
      }
      /* else if(obj.length>1){
      for(var i=0;i<obj.length;i++){
      var row = obj[i];
      if(row.mettingSts !== 'E'){
      if(row.mettingSts !== obj[0].mettingSts){
      _this.$message({message: '部分会议已经发起，不能进行批量发起操作!', type: 'warning'});
      return false;
      }
      if(row.mettingSts === 'S'){
      _this.cancelHidden = true;
      }else{
      _this.viewType = 'EDIT';
      _this.cancelHidden = false;
      }
      list.push(row.instanceId);
      }else{
      _this.$message({message: '部分会议已经结束，不能进行批量发起操作!', type: 'warning'});
      return false;
      }
      params.instanceId = row.instanceId;
      }
      }*/


      _this.gatherModel.instanceId = list;
      yufp.service.request({
        method: 'GET',
        data: params,
        url: _this.urls.users,
        callback: function (code, message, response) {
          if (response.data != null) {
            var members = response.data;

            for (var i = 0; i < members.length; i++) {
              var option = {};
              option.userId = members[i].userId;
              option.userName = members[i].userName;

              _this.Members.push(option);
            }
          }
        }
      });
      _this.startdialogVisible = true;
    },
    nwfstartFn: function () {
      var _this = this;

      var params = {};

      _this.$refs.reform.validate(function (valid) {
        if (valid) {
          if (_this.gatherModel.userId.length == 0) {
            _this.$message({
              message: '请选择会议成员!',
              type: 'warning'
            });

            return false;
          }

          if (!_this.gatherModel.mettingNo) {
            _this.$message({
              message: '请选择期数!',
              type: 'warning'
            });

            return false;
          }

          yufp.extend(params, _this.gatherModel);
          var list = [];

          for (var i = 0; i < _this.selectMembers.length; i++) {
            list.push(_this.selectMembers[i]);
          }

          params.user = list;
          yufp.service.request({
            method: 'POST',
            data: params,
            url: _this.urls.start,
            callback: function (code, message, response) {
              if (response.data) {
                _this.$message({
                  message: '会议开启成功!',
                  type: 'success'
                });

                _this.$refs.reform.resetFields();

                _this.startdialogVisible = false;

                _this.$refs.reftable.remoteData();
              }
            }
          });
        } else {
          _this.$message({
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
        }
      });
    },
    nwfrerunFn: function () {
      var _this = this;

      var params = {};

      _this.$refs.reform.validate(function (valid) {
        if (valid) {
          if (_this.gatherModel.userId.length == 0) {
            _this.$message({
              message: '请选择会议成员!',
              type: 'warning'
            });

            return false;
          }

          if (!_this.gatherModel.mettingNo) {
            _this.$message({
              message: '请选择期数!',
              type: 'warning'
            });

            return false;
          }

          yufp.extend(params, _this.gatherModel);
          var list = [];

          for (var i = 0; i < _this.selectMembers.length; i++) {
            list.push(_this.selectMembers[i]);
          }

          params.user = list;
          yufp.service.request({
            method: 'POST',
            data: params,
            url: _this.urls.rerun,
            callback: function (code, message, response) {
              if (response.data) {
                _this.$message({
                  message: '会议重新开始!',
                  type: 'success'
                });

                _this.$refs.reform.resetFields();

                _this.startdialogVisible = false;

                _this.$refs.reftable.remoteData();
              }
            }
          });
        } else {
          _this.$message({
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
        }
      });
    },
    cancel: function () {
      this.Members = [];
      this.number = [];
      this.selectMembers = [];
      this.gatherModel.userId = [];
      this.gatherModel.mettingNo = '';
      this.gatherModel.mettingSub = '';
      this.gatherModel.mettingYear = '';
      this.startdialogVisible = false;
      this.$refs.reform.resetFields();
    },
    memberChange: function (val) {
      var _this = this;

      if (val) {
        _this.gatherModel.totalCount = val.length;
        _this.removeTag();
      } else {
        _this.gatherModel.totalCount = '0';
      }
    },
    removeTag: function () {
      var _this = this;
      _this.selectMembers = [];

      if (_this.gatherModel.userId) {
        var value = _this.gatherModel.userId;

        if (value) {
          _this.gatherModel.totalCount = value.length;

          for (var i = 0; i < value.length; i++) {
            var item = value[i];

            for (var k = 0; k < _this.Members.length; k++) {
              var option = {};
              option.userId = item;

              if (_this.Members[k].userId == item) {
                option.userName = _this.Members[k].userName;
                _this.selectMembers.push(option);
              }
            }
          }
        }
      } else {
        _this.gatherModel.totalCount = '0';
      }
    },
    getyear: function (val) {
      this.gatherModel.mettingYear = val;
    },
    getNo: function (val) {
      this.gatherModel.mettingNo = val;
    }
  }

};
</script>
