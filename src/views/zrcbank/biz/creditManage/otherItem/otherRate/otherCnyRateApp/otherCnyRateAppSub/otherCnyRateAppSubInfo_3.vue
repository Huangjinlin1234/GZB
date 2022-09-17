<template>
  <!--
    @created by qiantj
    @description 1年期流贷或个人经营性
  -->
  <div>
    <div>
      <yu-panel panel-type="simple" title="1年期流贷或个人经营性">
        <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="type=='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户类别" ctype="select" name="cusSimType" data-code="STD_CUS_TYPE" rules="required"></yu-xform-item>
            <yu-xform-item label="支行所属区域" ctype="select" name="bankBelongArea" data-code="STD_BANK_BELONG_AREA" @change="rateChange" rules="required"></yu-xform-item>
            <yu-xform-item label="规模类型" ctype="select" name="scaleType" data-code="STD_SCALE_TYPE" @change="rateChange" rules="required"></yu-xform-item>
            <yu-xform-item label="贷款类型" ctype="select" name="rateLoanType" data-code="STD_RATE_LOAN_TYPE" @change="rateChange" rules="required"></yu-xform-item>
            <yu-xform-item label="贷款品种" ctype="select" name="rateLoanKind" data-code="STD_RATE_LOAN_KIND" exclude-key="01,02,03,04,05,06,09,10,11,12,13" :datacode-filter="datacodeFilterFn" rules="required"></yu-xform-item>
            <yu-xform-item label="担保类型" ctype="select" name="rateGuarType" data-code="STD_RATE_GUAR_TYPE" @change="rateChange" rules="required"></yu-xform-item>
            <yu-xform-item label="本次支行申请利率" ctype="yu-interest-rate" name="bankAppRate"  @change="rateChange" rules="required" sign="%" :multiple="100" :precision="4" :min="0" ></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name=""></yu-xform-item>
            <yu-xform-item label="目标利率" ctype="yu-interest-rate" name="targetRate" rules="required" disabled sign="%" :multiple="100" :precision="4" :min="0" ></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="cusId" disabled style="margin-right:10px">
              <yu-button type="primary" disabled>自动测算</yu-button>
            </yu-xform-item>
            <yu-xform-item label="保本利率" ctype="yu-interest-rate" name="breakEvenRate" rules="required" disabled sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
            <yu-xform-item label="对应审批权限" ctype="select" name="rulingApprAuth" rules="required" data-code="STD_RULING_APPR_AUTH" disabled></yu-xform-item>
            <yu-xform-item label="测算日期" ctype="datepicker" name="evalDate" value-format="yyyy-MM-dd" disabled></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="分项流水号" ctype="input" name="subSerno" hidden></yu-xform-item>
            <yu-xform-item label="定价申请类型" ctype="select" name="rateAppType" hidden data-code="STD_RATE_APP_TYPE"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="onSave" v-show="saveBtnShow">保存</yu-button>
          <yu-button type="primary" @click="onBack">返回</yu-button>
        </yu-form-buttons>
      </yu-panel>
    </div>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg(
  'STD_CUS_TYPE,STD_RATE_LOAN_KIND,STD_EXT_LOAN_TERM,STD_RATE_APP_TYPE'
);
export default {
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
  methods: {
    rateChange(val){
      if(val){
        this.getRate ()
      }
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === "07" || op.key === "08") {
          return true;
        }
        return false;
      });
    },
    afterInit: function () {
      var _this = this;
      _this.pageParams = _this.$route.params;
      _this.type = _this.pageParams.op;
      console.log('=========>>>>>', _this.pageParams);
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
    // goCustomer () {
    //   var _this = this;
    //   if (!_this.saveBtnShow) {
    //     return;
    //   }
    //   var dialogData = {};
    //   _this.$dialog.open(
    //     '',
    //     'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
    //     -1,
    //     -1,
    //     dialogData,
    //     (retVal) => {
    //       _this.formdata.cusId = retVal.cusId;
    //       _this.formdata.cusName = retVal.cusName;
    //     }
    //   );
    // },

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
    onSubmit: function () {},
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
            // 定价类型 STD_RATE_APP_TYPE
            permissionType: _this.formdata.rateAppType,
            // 支行所属区域+规模类型+贷款类型+担保类型 = 测算类型
            calculationType: _this.formdata.bankBelongArea + _this.formdata.scaleType + _this.formdata.rateLoanType + _this.formdata.rateGuarType
          })
        }
      }).then((data) => {
        _this.formdata.targetRate = data.data[0].guidanceRate; // 目标利率
        _this.formdata.breakEvenRate = data.data[0].breakEvenRate; // 保本利率
        _this.formdata.evalDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date()); // 测算日期

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
