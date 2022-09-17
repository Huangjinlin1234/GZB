<template>
<div>
  <yu-panel panel-type="simple">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="待检查任务" name="wait">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform ref="searchForm" v-model="searchForm"   label-width="130px">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="input" name="cusId" ></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" ></yu-xform-item>
                <yu-xform-item label="报告类型" ctype="select" name="rptType" data-code="STD_ZB_RPT_TYPE" ></yu-xform-item>
                <yu-xform-item name="execId" :colspan="8" ctype="YuXuserForDh" @select-fn="commonSelectFn" :mapping="{'execId':'execId','execIdName':'execIdName'}"  label="任务执行人"></yu-xform-item>
                <yu-xform-item name="execBrId" :colspan="8" ctype="YuXorgForDh" @select-fn="commonSelectFn" :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" label="任务执行机构" ></yu-xform-item>
                <yu-xform-group :column="2">
                  <yu-xform-item label="任务生成日期起" ctype="datepicker" name="taskStartDtStart" label-width="130px"  colspan="15"></yu-xform-item>
                  <yu-xform-item label="止" ctype="datepicker" name="taskStartDtEnd" label-width="40px" colspan="9"></yu-xform-item>
                </yu-xform-group >
              </yu-xform-group>
            </yu-xform>
              <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn()" >查询</yu-button>
                    <yu-button @click="resetFn()">重置</yu-button>
                </div>
          </template>
          <yu-button-drop>
            <yu-button type="primary" @click="check1('edit')" v-if="checkCtrl('check')">检查</yu-button>
            <yu-button type="primary" @click="check1('details')" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="table" :data-url="tableUrl" :base-params="basepParams" condition-key="condition" :default-load="false" selection-type="radio"  request-type="POST" style="margin-top:10px">
            <yu-xtable-column align="center" prop="taskNo" label="任务编号" width="210"></yu-xtable-column>
            <yu-xtable-column align="center" prop="taskType" label="任务类型"  data-code="STD_ZB_TASK_TYPE" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="checkType" label="检查类型"  data-code="STD_ZB_CHECK_TYPE" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="rptType" label="报告类型"  data-code="STD_ZB_RPT_TYPE" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="cusId" label="客户编号" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" prop="cusName" label="客户名称" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" prop="taskStartDt" label="任务生成日期" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" prop="taskEndDt" label="任务要求完成日期" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" prop="execIdName" label="任务执行人" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="execBrIdName" label="任务执行机构" width="160"></yu-xtable-column>
            <yu-xtable-column align="center" prop="checkStatus" label="检查状态"  data-code="STD_ZB_CHECK_STATUS" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="approveStatus" label="审批状态"  data-code="STD_ZB_APPR_STATUS" width="100"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="历史检查任务" name="history">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform v-model="searchFormHis" ref="searchFormHis" label-width="90px" :custom-search-fn="searchTableHis">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="input" name="cusId" ></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" ></yu-xform-item>
                <yu-xform-item label="报告类型" ctype="select" name="rptType" data-code="STD_ZB_RPT_TYPE" ></yu-xform-item>
                <yu-xform-item label="任务执行人" ctype="YuXuserForDh" name="execId"  @select-fn="commonSelectFn1" :mapping="{'execId':'execId','execIdName':'execIdName'}"  ></yu-xform-item>
                <yu-xform-item label="任务执行机构" ctype="YuXorgForDh" name="execBrId" @select-fn="commonSelectFn1" :mapping="{'execBrId':'execBrId','execBrIdName':'execBrIdName'}" ></yu-xform-item>
                <yu-xform-group :column="2">
                <yu-xform-item label="任务生成日期 起" ctype="datepicker" name="taskStartDtStart"  colspan="14"></yu-xform-item>
                <yu-xform-item label="止" ctype="datepicker" name="taskStartDtEnd" label-width="30px" colspan="10"></yu-xform-item>
                </yu-xform-group >
              </yu-xform-group>
            </yu-xform>
            <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn('his')" >查询</yu-button>
                    <yu-button @click="resetFn('his')">重置</yu-button>
                </div>
          </template>
          <yu-button-drop type="button">
            <yu-button  type="primary" @click="check2('details')" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="tableHis" :data-url="tableUrl"  :default-load="false" selection-type="radio" :base-params="basepParams1" request-type="POST"  style="margin-top:10px">
            <yu-xtable-column align="center" prop="taskNo" label="任务编号" width="210"></yu-xtable-column>
            <yu-xtable-column align="center" prop="taskType" label="任务类型"  data-code="STD_ZB_TASK_TYPE" disabled width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="checkType" label="检查类型"  data-code="STD_ZB_CHECK_TYPE" disabled width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="rptType" label="报告类型"  data-code="STD_ZB_RPT_TYPE" disabled width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="cusId" label="客户编号" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" prop="cusName" label="客户名称" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" prop="taskStartDt" label="任务生成日期" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" prop="taskEndDt" label="任务要求完成日期" width="140"></yu-xtable-column>
            <yu-xtable-column align="center" prop="execIdName" label="任务执行人" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="execBrIdName" label="任务执行机构" width="160"></yu-xtable-column>
            <yu-xtable-column align="center" prop="checkStatus" label="检查状态"  data-code="STD_ZB_CHECK_STATUS" disabled width="100"></yu-xtable-column>
            <yu-xtable-column align="center" prop="approveStatus" label="审批状态"  data-code="STD_ZB_APPR_STATUS" disabled width="100"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </yu-panel>
  <!--
  <yu-xdialog :visible.sync="dialogTableVisible" width="1500px" height="800px" @close="closeDialog">
    <fblDetail :flagg="flagg" :task-no="selectedTaskNo" :form-type="formType" v-if="show && (rptType=='1'||rptType=='2')"/>
    <blDetail :task-no="selectedTaskNo" :form-type="formType" v-if="show && rptType=='3'"/>
  </yu-xdialog>
</div>-->
</div></template>

<script>

import fblDetail from '@/views/psp/pspchecktask/fblDetail.vue';
import blDetail from '@/views/psp/pspchecktask/blDetail.vue';
yufp.lookup.reg('STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_RPT_TYPE,STD_ZB_TASK_TYPE,STD_ZB_APPR_STATUS');
export default {
  components: {
    fblDetail, blDetail
  },

  data: function () {
    return {
      tableUrl: backend.cmisPsp + '/api/psptasklist/getPspTaskList',
      basepParams: {condition: {approveStatus: '000,111,992', checkType: '21'}, sort: 'taskStartDt desc'},
      basepParams1: {condition: {approveStatus: '997,998', checkType: '21'}, sort: 'taskStartDt desc'},
      searchForm: {},
      searchFormHis: {},
      dialogTableVisible: false,
      show: false,
      rptType: '', // 报告类型
      selectedTaskNo: '',
      formType: '', // 页面类型
      rolesList: '',
      flagg: false,
      tabName: 'wait' // 默认打开打一个tab页
    };
  },

  created: function () {
    this.afterInit();
    // const loginUser = this.$xutils.getLoginUserInfo();
    // this.rolesList = loginUser.roles;
    // for (var i = 0; i < this.rolesList.length; i++) {
    //   if (this.rolesList[i].code === 'R0010' || this.rolesList[i].code === 'R0020' || this.rolesList[i].code === 'R0030') { // 小微客户经理
    //     this.flagg = true;
    //     break;
    //   }
    // };

    // var condition = {};
    // var _this = this;
    // this.$nextTick(() => {
    //   _this.searchForm.approveStatus = '000,111,992';
    //   _this.searchForm.checkType = '21';

    //   _this.searchFormHis.approveStatus = '997,998';
    //   _this.searchFormHis.checkType = '21';

    //   _this.$refs.table.remoteData({ condition: JSON.stringify(_this.searchForm) });
    //   _this.$refs.tableHis.remoteData({ condition: JSON.stringify(_this.searchFormHis) });
    // });
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.afterInit();
    }
  },

  methods: {
    // 条件查询
    searchFn: function (data) {
      let _this = this;
      if (data !== undefined && data !== '' && data === 'his') {
        _this.$refs.tableHis.remoteData({ condition: JSON.stringify(_this.searchFormHis) });
      } else {
        _this.$refs.table.remoteData({ condition: JSON.stringify(_this.searchForm) });
      }
    },
    // 重置
    resetFn: function (data) {
      if (data == 'his') {
        // 清空条件
        this.$refs.searchFormHis.resetFields();
        // 重新执行查询
        this.$refs.tableHis.remoteData();
      } else {
        // 清空条件
        this.$refs.searchForm.resetFields();
        // 重新执行查询
        this.$refs.table.remoteData(this.basepParams);
      }
    },

    afterInit () {
      const loginUser = this.$xutils.getLoginUserInfo();
      this.rolesList = loginUser.roles;
      for (var i = 0; i < this.rolesList.length; i++) {
        if (this.rolesList[i].code === 'R0010' || this.rolesList[i].code === 'R0020' || this.rolesList[i].code === 'R0030') { // 小微客户经理
          this.flagg = true;
          break;
        }
      };

      var condition = {};
      var _this = this;
      this.$nextTick(() => {
        _this.searchForm.approveStatus = '000,111,992';
        _this.searchForm.checkType = '21';

        _this.searchFormHis.approveStatus = '997,998';
        _this.searchFormHis.checkType = '21';

        _this.$refs.table.remoteData({ condition: JSON.stringify(_this.searchForm) });
        _this.$refs.tableHis.remoteData({ condition: JSON.stringify(_this.searchFormHis) });
      });
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'execId') {
            this.searchForm[mapping[item]] = data.loginCode;
          } else if (item === 'execBrId') {
            this.searchForm[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'execId') {
            this.searchForm[item] = data.loginCode;
          } else if (item === 'execBrId') {
            this.searchForm[item] = data.orgCode;
          }
        }
      }
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn1: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'execId') {
            this.searchFormHis[mapping[item]] = data.loginCode;
          } else if (item === 'execBrId') {
            this.searchFormHis[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'execId') {
            this.searchFormHis[item] = data.loginCode;
          } else if (item === 'execBrId') {
            this.searchFormHis[item] = data.orgCode;
          }
        }
      }
    },
    // 检查
    check1: function (op) {
      var _this = this;
      let selections = _this.$refs.table.selections;
      let name = '';
      if (selections.length != 1) {
        return this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
      if (op == 'edit' && selections[0].approveStatus != '000' && selections[0].approveStatus != '992') {
        return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
      }
      let rptName = '';
      if (selections[0].rptType == '3') { // 报告类型 ---- 不良类
        rptName = 'corpRegularBad.cpt';
        name = 'psp/pspchecktask/blDetail';
      } else {
        name = 'psp/pspchecktask/fblDetail'; // 报告类型 ----正常类、瑕疵类
        rptName = 'corpRegular.cpt';
      }

      let taskNo = selections[0].taskNo;
      let cusId = selections[0].cusId;
      let cusName = selections[0].cusName;


      _this.formType = op; // 跳转页面类型：查看/检查
      let title = '定期贷后检查（对公）';
      let key = new Date().getTime();
      _this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: {
            pspTask: selections[0],
            rptName: rptName,
            flagg: _this.flagg,
            formType: _this.formType,
            taskNo: taskNo,
            cusId: cusId,
            cusName: cusName,
            model_type: 'postLoanManage'
          }
        });
      });
    },
    check2: function (op) {
      var _this = this;
      let selections = _this.$refs.tableHis.selections;
      let name = '';
      if (selections.length != 1) {
        return this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
      let rptName = '';
      if (selections[0].rptType == '3') { // 报告类型 ---- 不良类
        rptName = 'corpRegularBad.cpt';
        name = 'psp/pspchecktask/blDetail';
      } else {
        name = 'psp/pspchecktask/fblDetail'; // 报告类型 ----正常类、瑕疵类
        rptName = 'corpRegular.cpt';
      }

      let coopAgrSerno = selections[0].taskNo;
      let partnerNo = selections[0].cusId;
      let partnerName = selections[0].cusName;


      _this.formType = op; // 跳转页面类型：查看/检查
      let title = '定期贷后检查（对公）';
      let key = new Date().getTime();
      _this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          // data: { pspTask: selections[0], rptName: rptName, flagg: _this.flagg, formType: _this.formType}
          data: { pspTask: selections[0], rptName: rptName, flagg: _this.flagg, formType: _this.formType, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName}

        });
      });
    },
    // /* 自定义查询 */
    // searchTable: function () {
    //   this.searchForm.checkType = '21';
    //   this.searchFormHis.checkType = '21';
    //   this.$refs.table.remoteData({ condition: JSON.stringify(this.searchForm) });
    // },
    // /* 重置查询表单 */
    // resetFn () {
    //   this.searchFormHis.checkType = '21';
    //   this.searchForm.checkType = '21';
    //   this.$refs.searchForm.resetFields();
    //   this.$refs.table.remoteData({ condition: JSON.stringify({'approveStatus': '000,111,992', 'checkType': '21'}) });
    // },

    searchTableHis: function () {
      this.$refs.tableHis.remoteData({ condition: JSON.stringify(this.searchFormHis) });
    }

  }
};
</script>
