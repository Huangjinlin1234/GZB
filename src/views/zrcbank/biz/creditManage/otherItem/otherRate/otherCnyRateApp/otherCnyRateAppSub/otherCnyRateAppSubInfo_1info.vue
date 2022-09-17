<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="type=='VIEW'">
        <yu-panel title="" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="类别" ctype="select" name="statisType" data-code="STD_STATIS_TYPE" rules="required"></yu-xform-item>
            <yu-xform-item label="计算金额" ctype="input" name="calAmt" @change="rateChange" rules=""></yu-xform-item>
            <yu-xform-item label="具体品种" ctype="input" name="concBreed" rules=""></yu-xform-item>
            <yu-xform-item label="存期对应FTP价格" ctype="input" name="maturityFtpPrice" @change="rateChange" rules=""></yu-xform-item>
            <yu-xform-item label="我行执行利率" ctype="yu-interest-rate" name="realityIr" @change="rateChange" rules=""></yu-xform-item>
            <yu-xform-item label="收益率" ctype="yu-interest-rate" name="earnRate" rules="" disabled></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" name="pkId" rules="" hidden></yu-xform-item>
            <yu-xform-item label="分项流水号" ctype="input" name="subSerno" rules="" hidden></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="input" name="serno" rules="" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="onSave" v-show="saveBtnShow">保存</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg(
  'STD_CUS_TYPE,STD_RATE_LOAN_KIND,STD_EXT_LOAN_TERM,STD_RATE_APP_TYPE'
);
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      type: this.pageParams.op,
      saveBtnShow: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    rateChange (val) {
      if (val) {
        this.getRate();
      }
    },
    afterInit: function () {
      var _this = this;
      if (_this.pageParams.op == 'VIEW') {
        _this.saveBtnShow = false;
      }
      yufp.clone(_this.pageParams, _this.formdata);
      if (_this.pageParams.op == 'ADD') {
        _this.formdata.pkId = new Date().getTime();
      }
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
      var url = this.$backend.cmisBiz + '/api/othercnyrateloanappsub';
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
            _this.$message('保存成功');
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
      this.$xutils.getParentPage(this, null, 'reloadTable');
      this.$dialog.close(this.dialogId);
    },
    // 测算
    getRate () {
      var _this = this;
      if (!(_this.formdata.calAmt && _this.formdata.maturityFtpPrice && _this.formdata.realityIr)) {
        return;
      }

      // 所有关联客户在我行贷款总金额==0
      if (_this.formdata.loanAmt == 0) {
        // 计算金额==0
        if (_this.formdata.calAmt == 0) {
          _this.formdata.earnRate = 0;
        } else {
          _this.formdata.earnRate = parseFloat(_this.formdata.maturityFtpPrice - _this.formdata.realityIr).toFixed(9);
        }
      } else {
        // (计算金额/所有关联客户在我行贷款总金额)*(存期对应FTP价格-我行执行利率)>=0
        if (parseFloat(_this.formdata.calAmt / _this.formdata.loanAmt).toFixed(4) * parseFloat(_this.formdata.maturityFtpPrice - _this.formdata.realityIr).toFixed(9) >= 0) {
          _this.formdata.earnRate = parseFloat(parseFloat(parseFloat(_this.formdata.calAmt / _this.formdata.loanAmt).toFixed(4) * parseFloat(_this.formdata.maturityFtpPrice - _this.formdata.realityIr).toFixed(9)).toFixed(13) * 0.2).toFixed(9);
        } else {
          _this.formdata.earnRate = 0;
        }
      }
    }
  }
};
</script>