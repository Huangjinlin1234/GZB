 <!--
    @created by wangqing 2021-08-04
    @description 贷款出账申请信保贷信息页签
  -->
<template>
  <div class="group-form">
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="信保贷基本信息" :hideFilter="false" :collapseHide="false" id="baseInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="放款流水号" name="pvpSerno" rules="required" ctype="input" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="保单号" name="bdNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保合同号" name="guarContNo" ctype="input" rules="required" ></yu-xform-item>
          <yu-xform-item label="确认函编号" name="qrhNo" rules="required" ctype="input" ></yu-xform-item>
          <yu-xform-item label="投保人" name="cusName" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="保险人" name="insuranceName" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="被保险人" name="insuredName" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="承保借款本金" name="cbLoanAmt" ctype="yu-num" rules="required"></yu-xform-item>
          <yu-xform-item label="保险起始日期" name="bxStartDate" ctype="datepicker" rules="required" @change="loanTermChange"></yu-xform-item>
          <yu-xform-item label="保险截止日期" name="bxEndDate" ctype="datepicker" rules="required" @change="loanTermChange"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="save" v-if="isButShow">保存</yu-button>
      <yu-button type="primary"  @click="cancelFn" v-if="isButShow">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      isDisabled: false,
      isButShow: false,
      activeName: 'workSche',
      searchFormdata: {},
      checkValue: true,
      checkMsg: '',
      isRefinancingTypeShow: true,
      dataUrl: backend.pvpLoanAppService + '/api/pvploanapp/',
      formdata: {}
    };
  },
  mounted () {
    var _this = this;
    let obj = '';
    let pvpSerno = '';
    let bdNo = '';
    let op = '';
    // if (_this.getFactory().contextData.pvpSerno) {
    //   obj = _this.getFactory().contextData;
    //   pvpSerno = obj.pvpSerno;
    //   op = obj.op;
    // }
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      obj = _this.getFactory().contextData.instanceInfo;
      pvpSerno = obj.bizId;
      op = obj.op;
    } else {
      obj = _this.$route.meta.params;
      pvpSerno = obj.bizId;
      op = obj.op;
    };
    // 进入初始化
    if (op == 'VIEW' || op == 'view') {
      this.isDisabled = true;
      this.isButShow = false;
    } else {
      this.isDisabled = false;
      this.isButShow = true;
    }

    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/xbdinfo/showxbdddetails',
      data: { pvpSerno: pvpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
        bdNo = _this.formdata.bdNo;
      }
    });
    if (bdNo === '' || bdNo === null) {
      _this.viewType = obj.viewType;
      _this.saveBtnShow = obj.saveBtnShow;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/showdetial',
        data: { pvpSerno: pvpSerno },
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.formdata);
          _this.formdata.insuredName = '江苏张家港农村商业银行股份有限公司';
        }
      });
    }
  },


  methods: {
    // 保存
    save: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      console.log('=======', _this.formdata);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.checkValue == false) {
        _this.$xutils.showMsgBox('提示', _this.checkMsg, 350, 150);
        return;
      }
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/xbdinfo/create';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
      return true;
    },
    // 返回
    cancelFn: function () {
      this.$router.go(-1);
    },
    loanTermChange (value) { // 校验贷款期限
      let bxStartDate = this.getTime(this.formdata.bxStartDate);
      let bxEndDate = this.getTime(this.formdata.bxEndDate);
      if (bxStartDate == 'undefined' || bxStartDate == null || bxStartDate == '') {
        return;
      }
      if (bxEndDate == 'undefined' || bxEndDate == null || bxEndDate == '') {
        return;
      }
      if (bxEndDate < bxStartDate) {
        this.$xutils.showMsgBox('提示', '保险截止日需大于等于保险起始日'); // 弹出提示
        this.formdata.bxEndDate = '';
        return;
      }
    },
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
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
    }
  }
};
</script>
<style>
#heartMsg{
  color:#FF4949;
  text-align:center;
}
</style>
