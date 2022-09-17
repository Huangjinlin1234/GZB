
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
    <yu-panel title="基本信息" :collapseHide="false">
      <yu-xform ref="refBaseForm" :form-type="formDisabled?'details':''" label-width="120px" v-model="familyFormdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="当前剩余笔数" ctype="input" name="curtSurplusQnt" :hidden="cspDisabled" disabled="true" colspan="24"></yu-xform-item>
          <!--<yu-xform-item label="业务条线" placeholder="---请选择---" ctype="select" name="bizLine" :disabled="!showSaveBtn" :rules="baseFormRules[0]" data-code="STD_BIZ_LINE"></yu-xform-item> -->
          <yu-xform-item label="业务类型" placeholder="---请选择---" ctype="select" name="bizType" :disabled="!showSaveBtn" :rules="baseFormRules[1]" data-code="STD_BIZ_SUB_TYPE_JIAJI" filterable></yu-xform-item> <!--:datacode-filter="datacodeFilterFn" -->
          <yu-xform-item label="业务流水号" ctype="yu-run-instance" name="serno" :biz-type="familyFormdata.bizType"
          @select-fn="commonSelectFn" :mapping="{bizType:'bizType', instanceId: 'pwbrSerno', bizId: 'serno', bizUserName: 'cusName', bizUserId: 'cusId',orgId:'managerBrId', orgIdName:'managerBrIdName',flowStarter:'managerId',flowStarterName:'managerIdName'}"
          width="1000px" height="600px"
           rules="required" colspan="24"  ></yu-xform-item>
          <yu-xform-item label="关联流水号" ctype="input" name="pwbrSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="加急原因" ctype="textarea" name="urgentResn" :autosize="{ minRows: 3}" colspan="24" :hidden="urDisabled" :disabled="!showSaveBtn"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="登记信息" :collapseHide="false">
      <yu-xform ref="refFamilyForm" form-type="details" label-width="100px" v-model="formdata">
        <yu-xform-group>
          <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" name="inputDate" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveFn" v-if="showSaveBtn">保存</yu-button>
      <yu-button @click="back">返回</yu-button>
    </yu-form-buttons>

     <yu-xdialog title="业务信息" :visible.sync="dialogVisible" width="1000px">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both" />
            <yu-xform-item label="客户编号" name="cusId" ctype="input"  />
          </yu-xform-group>
        </yu-xform>
        <yu-toolbar>
          <yu-button @click="backToAdd">选取返回</yu-button>
          <yu-button @click="cancelFn">取消</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" selection-type="radio" :base-params="params" :default-load="false" request-type="POST" condition-key="condition" row-number :data-url="dataUrl">
          <yu-xtable-column label="业务流水" prop="serno" ></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName" ></yu-xtable-column>
        </yu-xtable>
    </yu-xdialog>
  </div>
</template>
<script>

import { mapState } from 'vuex';
yufp.lookup.reg('STD_BIZ_LINE,STD_BIZ_PHASE,STD_BIZ_SUB_TYPE_JIAJI');

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      familyFormdata: {curtSurplusQnt: ''},
      formdata: {},
      cspDisabled: true,
      urDisabled: true,
      showSaveBtn: true,
      formDisabled: false,
      dialogVisible: false,
      searchFormdata: {},
      dataUrl: '',
      params: {},
      baseFormRules: [
        [{ required: true, message: '业务条线不能为空' }],
        [{ required: true, message: '业务阶段不能为空' }]
      ]
    };
  },
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      selectedRoles: state => state.oauth.selectedRoles,
      org: state => state.oauth.org
    })
  },
  // 监察事件
  watch: {
    selectedRoles: {
      immediate: true,
      handler: function (val) {
        let flag1 = false;
        let flag2 = false;
        let _this = this;
        let roles = _this.$xutils.getLoginUserInfo().roles;
        // 是否系统管理员角色
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].code == 'R0010' || roles[i].code == 'R0020' || roles[i].code == 'R0030' || roles[i].code == 'R0040') {
            flag1 = true;
          }
          if (roles[i].code != 'R0010' && roles[i].code != 'R0020' && roles[i].code != 'R0030' && roles[i].code != 'R0040') {
            flag2 = true;
          }
        }
        _this.cspDisabled = !flag1;
        _this.urDisabled = !flag2;
      }
    }
  },
  mounted () {
    var _this = this;
    let parmas = {
      inputId: this.userCode,
      inputBrId: this.org.id,
      inputIdName: this.userInfo,
      inputBrIdName: this.org.name,
      inputDate: this.$xutils.getDefaultformulaData('$CURRTIME')
    };
    if (_this.pageParams.option != null && _this.pageParams.option == '1') {
      _this.formDisabled = true;
    } else {
      _this.formDisabled = false;
    }

    yufp.clone(parmas, this.formdata);
    // 当前剩余笔数数据初始化
    // yufp.service.request({
    //   method: 'POST',
    //   url:
    //    backend.appOcaService + '/api/taskurgentdetailinfo/queryCurtSurplusQnt/' + _this.userCode,
    //   callback: function (code, message, response) {
    //     yufp.clone({ curtSurplusQnt: response.data}, _this.familyFormdata);
    //   }
    // });

    if (_this.pageParams.option != null && _this.pageParams.option == '1') {
      _this.formDisabled = true;
      // 启用按钮
      _this.showSaveBtn = false;
      let model = {};
      model.pkId = _this.pageParams.pkId;
      yufp.service.request({
        method: 'POST',
        url: backend.appOcaService + '/api/taskurgentapp/',
        data: JSON.stringify({ condition: JSON.stringify(model) }),
        callback: function (code, message, response) {
          if (response.data) {
            yufp.clone(response.data[0], _this.familyFormdata);
          }
        }
      });
    }
  },
  methods: {
    // 返回
    back: function () {
      this.formDisabled = false;
      this.$dialog.close(this.dialogId);
    },
    // 取消
    cancelFn () {
      this.dialogVisible = false;
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.familyFormdata[mapping[item]] = row[item];
      }
      var _this = this;
      var orgId = row['orgId'];
      _this.$request({
        url: backend.appOcaService + '/api/taskurgentapp/getOrgIdName/' + orgId,
        method: 'GET'
      }).then((response) => {
        _this.familyFormdata.managerBrIdName = response.data;
      }).catch(() => {
        _this.$message({
          message: '请求失败'
        });
      });
    },
    // 业务阶段授信申请选项判断
    datacodeFilterFn: function (opts, datacode, name) {
      const newOptios = opts.filter(function (op) {
        if (op.key === '01') { return false }
        return true;
      });
      return newOptios;
    },

    /**
     * 选择
     */
    // onChange () {
    //   let _this = this;
    //   let _bizLine = _this.familyFormdata.bizLine;
    //   let _bizType = _this.familyFormdata.bizType;
    //   if ((_bizLine != null && _bizLine != '') && (_bizType != null && _bizType != '')) {
    //     if (_bizType == '01') {
    //       // 授信申请
    //       // condition: {inputId: _this.userCode }
    //       _this.params = { };
    //       _this.dataUrl = backend.cmisBiz + '/api/lmtapp/getAllLmtByInputId';
    //     } else if (_bizType == '02') {
    //       // 合同申请
    //       // condition: {inputId: _this.userCode }
    //       _this.params = { };
    //       _this.dataUrl = backend.cmisBiz + '/api/iqploanapp/getAllIqpByInputId';
    //     } else if (_bizType == '03') {
    //       // 抵押登记
    //       // condition: {inputId: _this.userCode }
    //       _this.params = {
    //         condition:
    //         {
    //           regType: '01',
    //           approveStatus: '000,992,111',
    //           oprType: '01'
    //         }
    //       };
    //       _this.dataUrl = backend.cmisBiz + '/api/guarmortgagemanageapp/queryList';
    //     } else if (_bizType == '04') {
    //       // 抵押注销
    //       // condition: {inputId: _this.userCode }
    //       _this.params = {
    //         condition:
    //         {
    //           regType: '02',
    //           approveStatus: '000,992,111',
    //           oprType: '01'
    //         }
    //       };
    //       _this.dataUrl = backend.cmisBiz + '/api/guarmortgagemanageapp/queryList';
    //     } else if (_bizType == '05') {
    //       // 放款申请
    //       // condition: {inputId: _this.userCode }
    //       _this.params = {
    //         condition:
    //         {
    //           oprType: '01'
    //         }
    //       };
    //       _this.dataUrl = backend.cmisBiz + '/api/pvpauthorize/selectbymodel';
    //     } else if (_bizType == '06') {
    //       // 押品创建
    //       // condition: {inputId: _this.userCode }
    //       _this.params = {
    //       };
    //       _this.dataUrl = backend.cmisBiz + '/api/guarbaseinfo/all';
    //     } else if (_bizType == '07') {
    //       // 合同启用
    //       // condition: {inputId: _this.userCode }
    //       _this.params = {
    //       };
    //       _this.dataUrl = backend.cmisBiz + '/api/ctrloancont/getAllContByInputId';
    //     } else if (_bizType == '08') {
    //       // 客户基础信息新增
    //       // condition: {inputId: _this.userCode }
    //       _this.params = {
    //         condition: { taskStatus: '1', bizType: 'B01,B02,A01,A02,A03,C01'}
    //       };
    //       _this.dataUrl = backend.cmisCus + '/api/cusmanatask/';
    //     } else if (_bizType == '09') {
    //       // 客户基础信息维护
    //       // condition: {inputId: _this.userCode }
    //       _this.params = {
    //         condition: { taskStatus: '1', bizType: 'B03,B04,B05,B06,B07,B08,A04,A05,A06,A07,A08,A09,A10,A11,C02'}
    //       };
    //       _this.dataUrl = backend.cmisCus + '/api/cusmanatask/';
    //     }
    //     _this.$request({
    //       method: 'POST',
    //       url: _this.dataUrl,
    //       data: JSON.stringify({ condition: JSON.stringify(_this.params) })
    //     }).then(({ code, message, data }) => {
    //       if (data) {
    //         _this.$refs.refTable.remoteData();
    //       }
    //     });
    //     _this.dialogVisible = true;
    //   } else {
    //     _this.$message({
    //       message: '请先选择业务条线和业务阶段！',
    //       type: 'warning'
    //     });
    //   }
    // },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      _this.familyFormdata.serno = obj.serno;
      _this.familyFormdata.cusId = obj.cusId;
      _this.familyFormdata.cusName = obj.cusName;
      _this.familyFormdata.managerId = obj.managerId;
      _this.familyFormdata.managerBrId = obj.managerBrId;
      _this.familyFormdata.managerIdName = obj.managerIdName;
      _this.familyFormdata.managerBrIdName = obj.managerBrIdName;
      _this.dialogVisible = false;
    },

    /**
     * 提交表单信息
     */
    saveFn: function () {
      var _this = this;
      var base = _this.$refs.refBaseForm,
        family = _this.$refs.refFamilyForm;
      var baseFlag = true;
      var familyFlag = true;
      base.validate(function (valid) {
        baseFlag = valid;
      });
      family.validate(function (valid) {
        familyFlag = valid;
      });
      if (baseFlag && familyFlag) {
        // if (_this.$refs.refBaseForm.formdata.curtSurplusQnt <= 0) {
        //   _this.$message({
        //     message: '当前剩余笔数必须大于等于1',
        //     type: 'warning'
        //   });
        //   return;
        // }

        let comitData = {};
        yufp.clone(_this.formdata, comitData);
        yufp.clone(_this.familyFormdata, comitData);
        comitData.urgentType = '1'; // 管理岗加急
        yufp.service.request({
          method: 'POST',
          url: `${backend.appOcaService}/api/taskurgentapp/create`,
          data: comitData,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message('操作成功');
              // 更新档案任务池任务的加急状态
              _this.updateCentralfileTaskUrgent(comitData);
            } else {
              _this.$message({type: 'error', message: '操作失败'});
            }
          }
        });
      }
    },
    // 更新档案任务池任务的加急状态
    updateCentralfileTaskUrgent: function (urgentData) {
      let _this = this;
      let updataData = {};
      updataData.serno = urgentData.serno;
      updataData.bizType = urgentData.bizType;
      updataData.instanceId = urgentData.pwbrSerno;
      updataData.taskUrgentFlag = urgentData.urgentType; // 管理岗加急

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
          _this.$dialog.close(_this.dialogId);
        }
      });
    }
  }
};
</script>
