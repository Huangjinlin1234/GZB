
<template>
  <div>
    <yu-panel title="贷审会会办任务" :collapse-hide="false">
      <yu-xform v-model="searchFormdata"  form-type="search" ref="refForm" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="会议状态" placeholder="会议状态" ctype="select" name="mettingSts" :options="mettingStsOptions"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="bizUserId"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="bizUserName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="urls.index" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="bizId"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" data-code="FLOW_BIZ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="bizUserId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="bizUserName"></yu-xtable-column>
        <yu-xtable-column label="发起人" prop="flowStarterName"></yu-xtable-column>
        <yu-xtable-column label="发起机构" prop="appOrgName"></yu-xtable-column>
        <yu-xtable-column label="开始时间" prop="startTime"></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="meetType">
          <template slot-scope="scope">
            <yu-tag type="success" v-if="scope.row.meetType=='05'">贷审会模式</yu-tag>
            <yu-tag type="success" v-if="scope.row.meetType=='04'">三人会商模式</yu-tag>
            <yu-tag type="success" v-if="scope.row.meetType=='06'">投审会模式</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="参与投票人数" prop="totalNum"></yu-xtable-column>
        <yu-xtable-column label="待投票人数" prop="todoNum"></yu-xtable-column>
        <yu-xtable-column label="会议状态" prop="mettingSts">
          <template slot-scope="scope">
            <yu-tag type="gary" v-if="scope.row.mettingSts=='S'">尚未开始</yu-tag>
            <yu-tag type="success" v-if="scope.row.mettingSts=='R'">正在投票中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.mettingSts=='E'">会议已结束</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="会议顺序" prop="meetOrder">
          <template slot-scope="scope">
            <yu-input v-model="scope.row.meetOrder"></yu-input>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" v-if="scope.row.mettingSts !=='E'" @click="customRowOp(scope,'start')">调整参会人员</el-button>
            <el-button size="small" type="text" @click="customRowOp(scope,'detail')">查看</el-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
      <div align="center">
        <el-button type="primary" @click="updateOrder">确认调整顺序</el-button>
        <el-button type="primary" @click="startFn">开始会议</el-button>
      </div>
    </yu-panel>

    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="detaildialogVisible" width="900px">
      <el-table-x ref="gathertable" :data-url="urls.dataUrl" :pageable="false" :base-params="detailParams" :table-columns="detailColumns" selection-type="checkbox"></el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="detaildialogVisible = false">确定</el-button>
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
  </div>
</template>
<script>
yufp.lookup.reg('FLOW_BIZ_TYPE');
import { mapGetters } from 'vuex';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinList],
  data: function () {
    var _this = this;
    return {
      pickerOptions: {
        disabledDate: function (time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      urls: {
        index: backend.workflowService + '/api/bench/meetting/myStartList',
        start: backend.workflowService + '/api/bench/meetting/updateAllSubDataByMeetId',
        // start: backend.workflowService + '/api/metting/run',
        // index: backend.workflowService + '/api/metting/myStart',
        dataUrl: backend.workflowService + '/api/metting/voteAll',
        changeOrder: backend.workflowService + '/api/metting/updateMeetBatch'
      },
      mettingStsOptions: [
        {
          key: 'S',
          value: '会议未开始'
        },
        {
          key: 'E',
          value: '会议已结束'
        },
        {
          key: 'R',
          value: '正在投票中'
        }
      ],
      searchFormdata: {},
      baseParams: {},
      queryButtons: [
        {
          label: '搜索',
          op: 'submit',
          type: 'primary',
          click: function (model, valid) {
            if (valid) {
              var param = {
                condition: JSON.stringify(model)
              };

              _this.$refs.refTable.remoteData(param);
            }
          }
        },
        {
          label: '重置',
          op: 'reset'
        }
      ],

      detailParams: {},
      detailColumns: [
        {
          label: '会议号',
          prop: 'meetId',
          resizable: true,
          hidden: true,
          align: 'center'
        },
        {
          label: '流程实例号',
          prop: 'instanceId',
          resizable: true
        },
        {
          label: '会议标题',
          prop: 'mettingSub',
          resizable: true
        },
        {
          label: '会议年份',
          prop: 'mettingYear',
          resizable: true
        },
        {
          label: '会议期号',
          prop: 'mettingNo',
          resizable: true
        },
        {
          label: '投票人',
          prop: 'userId',
          resizable: true
        },
        {
          label: '投票人姓名',
          prop: 'userName',
          resizable: true
        },
        {
          label: '开始时间',
          prop: 'startTime',
          resizable: true
        },
        {
          label: '结束时间',
          prop: 'endTime',
          resizable: true
        },
        {
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
        },
        {
          label: '会议意见',
          prop: 'mettingComment',
          resizable: true
        }
      ],
      height: yufp.frame.size().height - 103,
      viewType: 'START',
      viewTitle: {
        START: '开始会办处理',
        EDIT: '修改会议事项',
        DETAIL: '参会人投票详情'
      },
      startdialogVisible: false, // 会议主题相关信息页面
      detaildialogVisible: false,
      gatherModel: {
        meetId: {},
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
      cancelHidden: true,
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
      meetForm: {
        instanceId: '',
        meetId: '',
        meetType: '05',
        meetUser: [
          {
            userId: '',
            userName: '',
            isCheckBiz: ''
          }
        ]
      }
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
      condition: JSON.stringify({
        userId: this.userCode,
        meetType: '05,06'
      })
    };
    for (var i = 1; i < 20; i++) {
      var no = {
        key: i,
        value: i
      };
      this.number.push(no);
    }
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
            meetId: scope.row.meetId
          })
        };

        _this.$nextTick(function () {
          _this.detaildialogVisible = true;
        });
      } else if (op == 'start') {
        if (scope.row != null) {
          // 选择了一条数据
          if (scope.row.mettingSts === 'E') {
            _this.$message({
              message: '会议已经结束，不能进行修改!',
              type: 'warning'
            });
            return false;
          }
          var routeId = 'router_meetedit_' + scope.row.meetId;
          var path = 'workflow/instance/metting/meetedit';
          _this.openMeetPage(scope.row, routeId, path);
        } else {
          _this.$message({
            message: '请选择一条数据!',
            type: 'warning'
          });
          return false;
        }
      }
    },
    openMeetPage: function (data, routeId, path) {
      // 重新打开节点页面
      var r = yufp.router.getRoute(path);
      if (r && r.fullPath === '/404') {
        yufp.router.addRoute(path, routeId, {});
      }

      data.title = '会办会议';
      yufp.frame.addTab({
        id: path,
        title: data.title,
        name: data.title,
        key: data.title,
        // 页签名称
        data: data // 传递的业务数据，可选配置
      });
    },
    updateOrder: function () {
      var data = this.$refs.refTable.data;
      console.log(data);
      var _this = this;
      var params = [];
      for (var i = 0; i < data.length; i++) {
        var param = {
          meetId: data[i].meetId,
          meetOrder: parseInt(data[i].meetOrder)
        };
        params.push(param);
      }
      yufp.service.request({
        method: 'POST',
        data: { meets: params },
        url: _this.urls.changeOrder,
        callback: function (code, message, response) {
          if (response.data && response.data == data.length) {
            _this.$message({
              message: '会议顺序调整成功!',
              type: 'success'
            });
            _this.$refs.refTable.remoteData();
          }
        }
      });
    },
    startFn: function () {
      var _this = this;
      var data = this.$refs.refTable.selections;
      if (data.length == 1) {
        _this.startdialogVisible = true;
      } else if (data.length > 1) {
        for (let i = 0; i < data.length; i++) {
          for (let j = i + 1; j < data.length; j++) {
            if (data[i].meetOrder == data[j].meetOrder) {
              _this.$message({
                message: '当前选中数据中,存在会议顺序相同的序号,请调整后再开始会议!',
                type: 'success'
              });
              return;
            }
          }
        }
        // 校验完成后 进入会议主题相关页面
        _this.startdialogVisible = true;
      } else {
        _this.$message({
          message: '请选择一条数据!',
          type: 'warning'
        });
        return;
      }
    },
    // 完善会议主题相关信息
    sureStart: function () {
      var _this = this;
      var data = _this.$refs.refTable.selections;
      _this.$refs.reform.validate(function (vaild) {
        if (vaild) {
          // let instanceIdList = [];
          // let meetIdList = [];
          for (let i = 0; i < data.length; i++) {
            // meetIdList.push(data.meetId);
            // instanceIdList.push(data.instanceId);
            _this.nwfstartFn(data[i]);// 更新会议主题相关
          }
          _this.startdialogVisible = false;
          _this.$refs.refTable.remoteData();
        }
      });
    },
    nwfstartFn: function (data) {
      var _this = this;
      let meetForm = {
        meetId: data.meetId,
        mettingSub: _this.gatherModel.mettingSub,
        mettingYear: _this.gatherModel.mettingYear,
        mettingNo: _this.gatherModel.mettingNo
      };
      var params = meetForm;
      yufp.service.request({
        async: false,
        method: 'POST',
        data: params,
        url: _this.urls.start,
        callback: function (code, message, response) {
          if (response.data) {
            _this.updateMeettingSts(data);
          } else {
            _this.$message({
              message: '会议开启失败!会议编号:' + data.meetId + '。报错:' + response.message,
              type: 'error'
            });
            return;
          }
        }
      });
    },

    // 查询当前 会议的投票人员
    selectVoteMemByMeetting (meetId) {
      let user = [];
      yufp.service.request({
        async: false,
        data: {meetId: meetId},
        url: backend.workflowService + '/api/bench/meetting/selectVoteMemByMeetting',
        callback: function (code, message, response) {
          if (response.code == '0') {
            user = response.data;
          } else {
            this.$message({
              message: '获取投票人失败!会议编号:' + meetId + '。报错:' + response.message,
              type: 'error'
            });
            return;
          }
        }
      });
      return user;
    },
    // 修改会议状态 正在投票中
    updateMeettingSts (data) {
      data.mettingSts = 'R';
      yufp.service.request({
        async: false,
        method: 'POST',
        data: data,
        url: backend.workflowService + '/api/metting/updateMeet',
        callback: function (code, message, response) {
          if (response.data && response.data == data.length) {

          } else {
            this.$message({
              message: '会议状态更新失败!会议编号为:' + data.meetId + '。报错：' + response.message,
              type: 'error'
            });
            return;
          }
        }
      });
    },
    // 原跳转会议详情页面
    oldMeettingDetail (data) {
      let _this = this;
      var routeId = 'router_meetedit_' + data.meetId;
      var path = 'workflow/instance/metting/meetedit';
      if (data.mettingSts === 'S') {
        var param = {};
        yufp.extend(param, data);
        param.mettingSts = 'R';
        yufp.service.request({
          method: 'POST',
          data: param,
          url: backend.workflowService + '/api/metting/updateMeet',
          callback: function (code, message, response) {
            if (response.data && response.data == data.length) {
              _this.$message({
                message: '会议开始成功!',
                type: 'success'
              });
            }
          }
        });
      }
      // 去除调转详情页面 刷新当前列表
      // _this.openMeetPage(data[0], routeId, path);
      _this.$refs.refTable.remoteData();
    },
    // 选择年
    getyear: function (val) {
      this.gatherModel.mettingYear = val;
    },
    // 取消完善信息
    cancel: function () {
      this.Members = [];
      this.selectMembers = [];
      this.gatherModel.userId = [];
      this.gatherModel.mettingNo = '';
      this.gatherModel.mettingSub = '';
      this.gatherModel.mettingYear = '';
      this.startdialogVisible = false;
      this.$refs.reform.resetFields();
    }
  }
};
</script>
