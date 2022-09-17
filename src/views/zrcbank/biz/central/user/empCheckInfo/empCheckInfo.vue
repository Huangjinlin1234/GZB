
<template>
  <!--
    @created by  zhoumw
    @updated by
    @updated by
    @description 集中作业员工签到签退
  -->
  <div>
    <yu-panel title="员工签到" placeholder="请输入" :hideFilter="false" :collapseHide="false" @search="fuzzyQuery">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="3">
            <yu-xform-item placeholder="员工号" name="userCode" ctype="input" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item placeholder="员工姓名" name="userName" ctype="input" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item placeholder="操作日期" name="optDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item placeholder="业务类型" name="checkOptType" ctype="select" data-code="STD_CHECK_OPT_TYPE"></yu-xform-item>
            <yu-xform-item placeholder="操作方式" name="dataSource" ctype="select" data-code="STD_CHECK_DATA_SOURCE"></yu-xform-item>
            <yu-xform-item placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <template>
        <div style="margin-bottom:10px;">
          <yu-button type="primary" @click="signFn">签到</yu-button>
          <yu-button type="primary" @click="signOutFn">签退</yu-button>
          <yu-button type="primary" @click="commitFn" hidden>提前签退审批提交</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="checkOptType" data-code="STD_CHECK_OPT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="员工号" prop="userCode"></yu-xtable-column>
        <yu-xtable-column label="员工姓名" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="操作日期" prop="optDate"></yu-xtable-column>
        <yu-xtable-column label="操作时间" prop="optTime"></yu-xtable-column>
        <yu-xtable-column label="操作方式" prop="dataSource" data-code="STD_CHECK_DATA_SOURCE"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yufpNwfInit ref="yufpNwfInit" @success-click="forceUpdate"></yufpNwfInit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import {genUUID } from '@/utils';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CHECK_OPT_TYPE,STD_OPR_TYPE,STD_CHECK_DATA_SOURCE');

export default {
  components: { YufpDemoSelector, yufpNwfInit },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: `${backend.appOcaService}/api/empcheckinfo/`,
      formdata: {},
      baseForm: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      closingStatus: '', //0代表正常下班，1代表员工今天没有排班，2代表提前签退
      openTime: '', //上班时间
      signOutParam: {}, //签退信息
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  mounted: function () {
    var _this = this;
    // 员工号
    _this.baseForm.userCode = _this.loginCode;
    // 员工名称
    _this.baseForm.userName = _this.userName;
    // 操作方式 人工01
    _this.baseForm.dataSource = '01';

    _this.getClosingTime();
  },
  methods: {
    // 查询搜索
    fuzzyQuery: function (e) {
      var param = {keyWord: e.value};


      this.$refs.refTable.remoteData(param);
    },

    /**
     * 签到
     */
    signFn: function () {
      var _this = this;
      var model = {};
      // 业务类型
      _this.baseForm.checkOptType = '01';
      model.approveStatus = '997';
      yufp.clone(_this.baseForm, model);

      var curDate = new Date().getHours().toString() + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes().toString() : new Date().getMinutes().toString()) + (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds().toString() : new Date().getSeconds().toString());
      if (_this.openTime) {
        _this.openTime = _this.openTime.replace(/:/g, '');
      }
      if(_this.openTime > curDate) {
        _this.$confirm('还未到上班时间，确认签到？', '确认', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              // 向后台发送保存请求
              yufp.service.request({
                method: 'POST',
                url: `${backend.appOcaService}/api/empcheckinfo/`,
                data: model,
                callback: function (code, message, response) {
                  _this.$refs.refTable.remoteData();
                  _this.$message('签到成功');
                  _this.dialogVisible = false;
                }
              });
            }
          }
        })
      } else {
        // 向后台发送保存请求
        yufp.service.request({
          method: 'POST',
          url: `${backend.appOcaService}/api/empcheckinfo/`,
          data: model,
          callback: function (code, message, response) {
            _this.$refs.refTable.remoteData();

            _this.$message('签到成功');

            _this.dialogVisible = false;
          }
        });
      }
    },
    // 签退
    signOutFn: function () {
      var _this = this;
      var model = {};
      // 业务类型 02签退
      _this.baseForm.checkOptType = '02';
      model.approveStatus = '997';
      yufp.clone(_this.baseForm, model);
      model.dataSource = '02';
      model.serno = genUUID(16, 16) + Date.parse(new Date());
      // 签退前判断是否提前签退 提前签退走流程审批
      // 在工作时间 都算提前签退
      if (_this.closingStatus && _this.closingStatus === '2') {
        _this.$confirm('还未到下班时间，确认签退？', '确认', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              model.dataSource = '';
              model.checkOptType = '03'; //提前签退
              model.approveStatus = '111'; //审批中
              _this.signOutParam = model
              _this.wfInitFn(model);
            }
          }
        });
      } else {
        // 向后台发送保存请求
        _this.$confirm('确认签退？', '确认', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              _this.toSignOutFn(model)
            }
          }
        });
      }
    },
    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
      获取下班时间
     */
    getClosingTime: function () {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: `${backend.appOcaService}/api/cfgscheduleinfo/checkusertime/` + this.loginCode,
        callback: function (code, message, response) {
          if(response.data) {
            _this.closingStatus = response.data.status
          }
        }
      });
    },

    // 提交
    commitFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录！',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      if (obj.dataSource != '' || obj.approveStatus != '000') {
        _this.$message({
          message: '请选择待发起记录提交审批！',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否发起提前签退审批？', '确认', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 流程发起
            _this.wfInitFn(obj);
          }
        }
      });
    },
    // 流程回调
    forceUpdate () {
      this.toSignOutFn(this.signOutParam);
    },
    // 流程发起
    wfInitFn(param) {
      let wfInitData = {};
      wfInitData.systemId = 'cmis';
      wfInitData.orgId = this.org.code;
      wfInitData.userId = this.loginCode;
      wfInitData.bizId = param.serno;
      wfInitData.bizType = 'XT002';
      wfInitData.bizUserName = '';
      wfInitData.bizUserId = '';
      wfInitData.param = {'orgId': this.org.code};
      this.$refs.yufpNwfInit.wfInit(wfInitData);
    },
    // 调用签退接口
    toSignOutFn (params) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/empcheckinfo/`,
        data: params,
        callback: function (code, message, response) {
          if (response.code == '999999') { // 已存在对应签退记录
            return;
          }
          if(params.approveStatus === '997') {
            _this.$message('签退成功');
          }
          _this.$refs.refTable.remoteData();
          _this.dialogVisible = false;
        }
      });
    }
  }
};
</script>
