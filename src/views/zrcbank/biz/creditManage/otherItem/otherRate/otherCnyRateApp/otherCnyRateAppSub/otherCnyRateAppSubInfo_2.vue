<template>
<!--
    @created by qiantj
    @description 展期利率定价权限表
  -->
  <div>
    <div>
     <yu-panel panel-type="simple" title="展期利率定价权限表">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata"  :disabled="type=='VIEW'">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" name="cusId"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户类别" ctype="select" name="cusSimType" data-code="STD_CUS_TYPE" rules="required" ></yu-xform-item>
          <yu-xform-item label="贷款品种" ctype="select" name="rateLoanKind" data-code="STD_RATE_LOAN_KIND" exclude-key="07,08,09,10,11,12,13" :datacode-filter="datacodeFilterFn" rules="required" ></yu-xform-item>
          <yu-xform-item label="担保类型" ctype="select" name="rateGuarType" data-code="STD_RATE_GUAR_TYPE" rules="required" ></yu-xform-item>
          <yu-xform-item label="原贷款期限" ctype="select" name="origiLoanTerm" data-code="STD_RATE_LOAN_TERM" @change="rateChange" rules="required" exclude-key="04,05,06,07" :datacode-filter="datacodeFilterFn1"></yu-xform-item>
          <yu-xform-item label="本次申请展期期限" ctype="select" name="extLoanTerm" data-code="STD_EXT_LOAN_TERM" rules="required" ></yu-xform-item>
          <yu-xform-item label="原贷款期限与展期期限合计" ctype="select" name="totalTerm" data-code="STD_TOTAL_TERM" @change="rateChange" rules="required" ></yu-xform-item>
          <yu-xform-item label="原贷款利率" ctype="yu-interest-rate" name="origiLoanRate" rules="required" @change="rateChange" sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
          <yu-xform-item label="本次支行申请展期利率" ctype="yu-interest-rate" name="bankAppRate" rules="required" @change="rateChange" sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
          <yu-xform-item label="利率展期要求" ctype="yu-interest-rate" name="extAppRateNeed" rules="required" disabled sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="cusId" disabled   style="margin-right:10px">
            <yu-button type="primary" disabled>自动测算</yu-button>
          </yu-xform-item>
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
lookup.reg('STD_CUS_TYPE,STD_RATE_LOAN_KIND,STD_EXT_LOAN_TERM,STD_RATE_APP_TYPE,STD_RATE_GUAR_TYPE');
export default{
  data: function () {
    return {
      formdata: {},
      type: '',
      saveBtnShow: true,
      pageParams: {}
    };
  },
  mounted () {
    this.afterInit();
  },
  destroyed () {
    var _this = this;
    _this.saveBtnShow = true;
    _this.formdata = {};
    _this.pageParams = {};
    _this.type = null;
  },
  methods: {
    rateChange (val) {
      if (val) {
        this.getRate();
      }
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '01' || op.key === '02' || op.key === '03' || op.key === '04' || op.key === '05' || op.key === '06') {
          return true;
        }
        return false;
      });
    },
    datacodeFilterFn1: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '01' || op.key === '02' || op.key === '03') {
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
      _this.formdata.cusId = _this.pageParams.cusId;
      _this.formdata.cusName = _this.pageParams.cusName;
    },

    // 客户选取
    goCustomer () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;
        }
      );
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
      _this.formdata.evalDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      if (_this.formdata.origiLoanRate) {
        if (_this.formdata.origiLoanTerm == '01' && _this.formdata.totalTerm == '01') {
          _this.formdata.extAppRateNeed = parseFloat(parseFloat(_this.formdata.origiLoanRate + 0.004).toFixed(9));
        } else if (_this.formdata.origiLoanTerm == '01' && _this.formdata.totalTerm == '02') {
          _this.formdata.extAppRateNeed = 1;
        } else if (_this.formdata.origiLoanTerm == '02' && _this.formdata.totalTerm == '01') {
          _this.formdata.extAppRateNeed = _this.formdata.origiLoanRate;
        } else if (_this.formdata.origiLoanTerm == '02' && _this.formdata.totalTerm == '02') {
          _this.formdata.extAppRateNeed = parseFloat(parseFloat(_this.formdata.origiLoanRate + 0.0015).toFixed(9));
        } else if (_this.formdata.origiLoanTerm == '03' && _this.formdata.totalTerm == '02') {
          _this.formdata.extAppRateNeed = _this.formdata.origiLoanRate;
        } else if (_this.formdata.origiLoanTerm == '03' && _this.formdata.totalTerm == '01') {
          _this.formdata.extAppRateNeed = 1;
        }
      }
      if (_this.formdata.bankAppRate) {
        // 对应审批权限处理
        if (parseFloat(_this.formdata.bankAppRate) >= parseFloat(_this.formdata.extAppRateNeed)) {
          // 本次支行申请利率>=目标利率   ---> 支行权限
          _this.formdata.rulingApprAuth = '1';
        } else {
          // 公司分管行长
          _this.formdata.rulingApprAuth = '2';
        }
      }
    }
  }
};
</script>