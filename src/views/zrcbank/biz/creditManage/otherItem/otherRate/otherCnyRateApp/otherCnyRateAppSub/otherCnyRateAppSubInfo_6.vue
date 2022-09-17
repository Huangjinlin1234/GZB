<template>
<!--
    @created by qiantj
    @description 存单质押贷款
  -->
  <div>
    <div>
      <yu-panel panel-type="simple" title="存单质押贷款">
        <yu-xform ref="refForm" label-width="120px" v-model="formdata"  :disabled="type=='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="经营机构" ctype="input" name="inputBrId"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="贷款品种" ctype="select" name="rateLoanKind" data-code="STD_RATE_LOAN_KIND" exclude-key="01,02,03,04,05,06,07,08,09,10,11,12" :datacode-filter="datacodeFilterFn" rules="required" ></yu-xform-item>
            <yu-xform-item label="存单种类" ctype="select" name="depositType" data-code="STD_DEPOSIT_TYPE" @change="rateChange" rules="required" ></yu-xform-item>
            <yu-xform-item label="存单存期" ctype="select" name="depositTerm" data-code="STD_DEPOSIT_TERM" @change="rateChange" rules="required" ></yu-xform-item>
            <yu-xform-item label="本次支行申请利率" ctype="yu-interest-rate" @change="rateChange" name="bankAppRate" sign="%" :multiple="100" :precision="4" :min="0" rules="required" ></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name=""></yu-xform-item>
            <yu-xform-item label="目标利率" ctype="yu-interest-rate" name="targetRate" rules="required" sign="%" :multiple="100" :precision="4" :min="0" disabled ></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="cusId" disabled   style="margin-right:10px">
              <yu-button type="primary" disabled>自动测算</yu-button>
            </yu-xform-item>
           <!-- <yu-xform-item label="保本利率" ctype="yu-interest-rate" name="breakEvenRate" rules="required" sign="%" :multiple="100" :precision="4" :min="0" disabled></yu-xform-item> -->
            <yu-xform-item label="对应审批权限" ctype="select" name="rulingApprAuth" rules="required" data-code="STD_RULING_APPR_AUTH" disabled></yu-xform-item>
            <yu-xform-item label="测算日期" ctype="datepicker" name="evalDate" value-format="yyyy-MM-dd" disabled></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="分项流水号" ctype="input" name="subSerno" hidden></yu-xform-item>
            <yu-xform-item label="定价申请类型" ctype="select" name="rateAppType" hidden data-code="STD_RATE_APP_TYPE"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary"  @click="onSave" v-show="saveBtnShow">保存</yu-button>
          <yu-button type="primary" @click="onBack">返回</yu-button>
        </yu-form-buttons>
      </yu-panel>
    </div>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_RATE_LOAN_KIND,STD_DEPOSIT_TYPE,STD_DEPOSIT_TERM');
export default{
  data: function () {
    return {
      formdata: {},
      type: '',
      saveBtnShow: true,
      pageParams: {},
      bankAppRate:''
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    rateChange(val){
      if(val){
        this.getRate ()
      }
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === "13") {
          return true;
        }
        return false;
      });
    },
    afterInit: function () {
      var _this = this;
      _this.pageParams = _this.$route.params;
      _this.type = _this.pageParams.op;
      if (_this.pageParams.op == 'VIEW') {
        _this.saveBtnShow = false;
      }
      yufp.clone(_this.pageParams, _this.formdata);
      if (_this.pageParams.op == 'ADD') {
        _this.formdata.subSerno = new Date().getTime();
      }
      const loginUser = _this.$xutils.getLoginUserInfo();// 获取登陆人信息
      _this.formdata.inputBrId = loginUser.org.code;
      _this.formdata.cusId = _this.pageParams.cusId;
      _this.formdata.cusName = _this.pageParams.cusName;
    },
    /**
     * 新增申请信息
     */
    onSave: function () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = this.$backend.cmisBiz + '/api/othercnyrateappsub';
      if (_this.pageParams.op == 'ADD') {
        url = url + '/';
      } else if (_this.pageParams.op == 'EDIT') {
        url = url + '/update';
      }
      var data = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // _this.$message('保存成功');
            _this.onBack();
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },
    onSubmit: function () {
    },
    /**
     * 关闭当前页面
     */
    onBack: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 返回列表页面
      yufp.globalEventBus.$emit('refreshOtherCnyRateAppSubTable');
    },

    // 测算
    getRate () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      _this.$request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgratecalculation/queryModel',
        data: {
          condition: JSON.stringify({
            // 权限类型 STD_RATE_APP_TYPE 6-存单质押贷款定价
            permissionType: _this.formdata.rateAppType,
            // 存单种类+存单期限 = 测算类型
            calculationType: _this.formdata.depositType + _this.formdata.depositTerm
          })
        }
      }).then((data) => {
        _this.formdata.targetRate = data.data[0].guidanceRate; // 目标利率
        _this.formdata.breakEvenRate = data.data[0].breakEvenRate; // 保本利率
        _this.formdata.evalDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date()); // 测算日期

        debugger;
        // 对应审批权限处理
        if (parseFloat(_this.formdata.bankAppRate) >= parseFloat(_this.formdata.targetRate)) {
          // 本次支行申请利率>=目标利率   ---> 支行权限
          _this.formdata.rulingApprAuth = '1';
        } else if (parseFloat(_this.formdata.bankAppRate) < parseFloat(_this.formdata.targetRate - 0.005).toFixed(9)) {
          // 本次支行申请利率<目标利率-0.005   ---> 公司分管行长
          _this.formdata.rulingApprAuth = '2';
        } else {
          // 公司部总经理
          _this.formdata.rulingApprAuth = '3';
        }
      });
    }
  }
};
</script>
