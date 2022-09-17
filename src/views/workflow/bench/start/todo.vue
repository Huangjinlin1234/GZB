
<template>
  <div>
    <yu-panel title="办理中" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="bizUserName"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="bizUserId"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <div style="margin-bottom: 20px" v-if="isCustManager">
        <!-- 加急按钮仅对发起集中作业的客户经理开放 -->
        <el-button type="primary" @click="urgentFn">加急</el-button>
      </div>
      <el-table-x ref="reftable" @loaded="loadedSuccessFn" :row-index="true" :base-params="baseParams" @custom-detail-click="rowDblclick" :data-url="urls.index" :table-columns="tableColumns"></el-table-x>
    </yu-panel>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIZ_TYPES } from '@/views/workflow/bench/todo/commonbiztype';
yufp.lookup.reg('FLOW_BIZ_TYPE');
export default {
  data: function () {
    var _this = this;

    return {
      isCustManager: false,
      urls: {
        index: backend.workflowService + '/api/bench/start/doing'
      },
      formdata: {},
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
                                <span style="color:red;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">{{scope.row.instanceId}}</span>\
                            </template>';
        }
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true
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
        resizable: true
      }, {
        label: '流程发起者姓名',
        prop: 'flowStarterName',
        resizable: true
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
        label: '发起人机构',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '客户名称',
        prop: 'bizUserName',
        resizable: true
      }, {
        label: '客户编号',
        prop: 'bizUserId',
        resizable: true
      }, {
        label: '流程参数',
        prop: 'flowParam',
        resizable: true,
        hidden: true
      }, {
        label: '流程状态',
        prop: 'flowState',
        resizable: true,
        hidden: false,
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
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        dataCode: 'FLOW_BIZ_TYPE'
      }, {
        label: '当前处理节点',
        prop: 'nodeName',
        resizable: true
      }, {
        label: '当前处理人',
        prop: 'userName',
        resizable: true
      }, {
        label: '前面排队笔数',
        prop: 'todoOrder',
        resizable: true
      }, {
        label: '是否加急',
        prop: 'urgentType',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
                <yu-tag type="primary" v-if="scope.row.urgentType==\'9\'">不加急</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.urgentType==\'1\'">管理岗加急</yu-tag>\
                <yu-tag type="warning" v-if="scope.row.urgentType==\'2\'">客户经理加急</yu-tag>\
                <yu-tag type="success" v-if="scope.row.urgentType==\'3\'">系统加急</yu-tag>\
                </template>';
        }
      }],
      baseParams: {},
      height: yufp.frame.size().height - 103
    };
  },
  computed: {
    ...mapGetters([
      'userCode'
    ])
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode
      }
    };
    // 获取登入信息
    const loginUserInfo = this.$xutils.getLoginUserInfo();
    const _this = this;
    loginUserInfo.roles.every(function (_item, _index) {
      // code 角色标识 R0010-小微客户经理  R0020-公司客户经理 R0030-零售客户经理
      if ((_item.code == 'R0010' || _item.code == 'R0020' || _item.code == 'R0030' || _item.code == 'R0030' || _item.code == 'RSG01') && loginUserInfo.org.orgType !== 'A') {
        _this.isCustManager = true;
      } else {
        _this.isCustManager = false;
      }
    });
  },
  methods: {
    // 加急
    urgentFn: function () {
      let _this = this;
      let selections = _this.$refs.reftable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.appOcaService + '/api/taskurgentdetailinfo/queryCurtSurplusQnt/' + _this.userCode,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            if (response.data > 0) {
              _this.urgentRemoteFn(selections[0]);
            } else {
              _this.$message({type: 'warning', message: '用户剩余加急笔数不足！'});
            }
          } else {
            _this.$message({type: 'error', message: '用户剩余加急笔数查询失败！'});
          }
        }
      });
    },
    // 添加加急申请
    urgentRemoteFn: function (row) {
      let comitData = {
        serno: row.bizId,
        pwbrSerno: row.instanceId,
        bizType: row.bizType,
        cusId: row.bizUserId,
        cusName: row.bizUserName,
        urgentType: '2', // 1：管理岗加急   2：客户经理加急 3：系统加急 9：不加急
        urgentResn: '客户经理加急',
        managerId: this.$xutils.getLoginUserInfo().loginCode,
        managerBrId: this.$xutils.getLoginUserInfo().orgCode
      };
      this.$request({
        url: this.$backend.appOcaService + '/api/taskurgentapp/create',
        method: 'post',
        data: comitData
      }).then((response) => {
        if (response.code == '0') {
          this.$message('加急成功！');
          this.updateCentralfileTaskUrgent(comitData);
          this.$refs.reftable.remoteData();
        } else {
          this.$message({type: 'error', message: response.message});
        }
      });
    },
    // 更新档案任务池任务的加急状态
    updateCentralfileTaskUrgent: function (urgentData) {
      let _this = this;
      let updataData = {};
      updataData.serno = urgentData.serno;
      updataData.bizType = urgentData.bizType;
      updataData.instanceId = urgentData.pwbrSerno;
      updataData.taskUrgentFlag = urgentData.urgentType; // 客户经理加急

      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/centralfiletask/updatebycondition`,
        data: JSON.stringify(updataData),
        callback: function (code, message, response) {
          if (response.code == '0') {
            console.log('更新档案任务池任务加急状态成功');
          } else {
            console.error('更新档案任务池任务加急状态失败');
          }
        }
      });
    },
    loadedSuccessFn: function (data, total) {
      if (data && data.length > 0) {
        let instanceIds = [];
        for (let i = 0; i < data.length; i++) {
          instanceIds.push(data[i].instanceId);
        }
        this.$request({
          url: this.$backend.appOcaService + '/api/custom/bench/instanceOrders',
          method: 'post',
          data: {
            instanceIds: instanceIds.join(',')
          }
        }).then((response) => {
          if (response.code == '0') {
            let newTabelData = [];
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < response.data.length; j++) {
                if (data[i].instanceId == response.data[j].instanceId) {
                  let tempData = yufp.clone(data[i], {});
                  if (response.data[j].todoOrder === null) {
                    if (data[i].userId == response.data[j].userId) {
                      tempData.todoOrder = '待处理';
                    } else {
                      tempData.todoOrder = '待领取';
                    }
                  } else {
                    tempData.todoOrder = response.data[j].todoOrder - 1;
                  }
                  tempData.urgentType = response.data[j].urgentType;
                  newTabelData.push(tempData);
                  break;
                }
              }
            }
            this.$refs.reftable.data = newTabelData;
          } else {
            this.$message({type: 'error', message: response.message});
          }
        });
      }
    },
    rowDblclick: function (row, event) {
      // 往实例信息页面跳转
      var _this = this;

      if (row.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var button = {
        hungUp: '1',
        takeBack: '0',
        urged: '0',
        recall: '1',
        activate: '0'
      };
      var param = {
        instanceId: row.instanceId,
        userId: row.userId,
        type: 'DONE',
        button: button,
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name
      };
      if (BIZ_TYPES && BIZ_TYPES.indexOf(row.bizType) > -1) {
        // this.$router.replace({ name: 'instanceInfo', params: param });
        this.$router.addTab({
          name: 'workflow/instance/common/instanceInfo',
          title: row.bizId,
          key: 'flow_todo_' + row.instanceId,
          data: param,
          afterTabClose: () => {
            this.refresh();
          }
        });
      } else {
        // this.$router.replace({ name: 'instanceInfoLite', params: param });
        this.$router.addTab({
          name: 'workflow/instance/common/instanceInfoLite',
          title: row.bizId,
          key: 'flow_todo_' + row.instanceId,
          data: param,
          afterTabClose: () => {
            this.refresh();
          }
        });
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            flowName: model.flowName ? '%' + model.flowName + '%' : '',
            bizUserName: model.bizUserName ? '%' + model.bizUserName + '%' : '',
            instanceId: model.instanceId ? model.instanceId : '',
            bizUserId: model.bizUserId ? model.bizUserId : '',
            bizId: model.bizId ? model.bizId : ''
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
    }
  }

};
</script>
