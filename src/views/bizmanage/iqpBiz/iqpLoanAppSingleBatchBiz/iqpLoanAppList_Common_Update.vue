<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" name="surveySerno" placeholder="业务流水号" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId"  placeholder="客户编号" icon="search" @click="selectPro" disabled @change="changeCusId"></yu-xform-item>
          <yu-xform-item label="姓名" ctype="input" name="commonDebitName" placeholder="姓名" disabled></yu-xform-item>
          <yu-xform-item label="性别" ctype="select" name="commonDebitSex" placeholder="性别" data-code="STD_ZB_SEX" disabled></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" placeholder="证件类型" name="commonDebitCertType" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" name="commonDebitCertCode"  placeholder="证件号码" disabled></yu-xform-item>
          <yu-xform-item label="婚姻状况" ctype="select" name="commonDebitMarStatus" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" disabled></yu-xform-item>
          <yu-xform-item label="工作单位" ctype="input" placeholder="工作单位" name="commonDebitCprt" disabled></yu-xform-item>
          <yu-xform-item label="手机号吗" ctype="input" placeholder="手机号吗" name="commonDebitPhone" disabled></yu-xform-item>
          <yu-xform-item label="共同借款人相关情况描述" ctype="input" name="description" required="true" placeholder="共同借款人相关情况描述" :disabled="viewflag" ></yu-xform-item>
          <yu-xform-item label="与借款人关系" ctype="select" name="commonDebitCorre" placeholder="与借款人关系" required="true" :options="commonDebitCorreOpt" :disabled="viewflag" ></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" name="inputDate" placeholder="登记时间" hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" name="updateTime" placeholder="更新时间" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doSaveMain" v-if="btnflag">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_SEX,STD_ZB_CERT_TYP,STD_ZB_MAR_ST,STD_ZB_SELFPER_REL_TYP');

import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D13ABillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpriskchkdebtcfrm/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpriskchkdebtcfrm/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      viewflag: false,
      btnflag: false,
      commonDebitCorreOpt: []

    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    // 共同借款人保存
    doSaveMain () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }
      yufp.clone(_this.formdata, model);
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/lmtcobinfo/update',
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功' + JSON.stringify(response.data), 500, 300, () => {
              this.$xutils.getParentPage(this, 'd1_A_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    selectPro () {
      this.$dialog.open(
        '',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/cusPop',
        -1,
        -1,
        null,
        params => {
          this.formdata.cusId = params.cusId;
          this.formdata.commonDebitName = params.cusName;
          this.formdata.commonDebitSex = params.sex;
          this.formdata.commonDebitCertType = params.certType;
          this.formdata.commonDebitCertCode = params.certCode;
          this.formdata.commonDebitMarStatus = params.marStatus;
        }
      );
    },
    changeCusId: function (value) {
      var _this = this;
      if (value == '' || value == null) {
        _this.formdata.commonDebitPhone = '';
        _this.formdata.commonDebitCprt = '';
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindivcontact/queryCusIndivContact',
        data: {cusId: value},
        callback: function (code, message, response) {
          if (code == '0' && response.data != null) {
            _this.formdata.commonDebitPhone = response.data.mobileNo;
          } else {
            _this.formdata.commonDebitPhone = '';
          }
        }
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindivunit/queryByCusId',
        data: {cusId: value},
        callback: function (code, message, response) {
          if (code == '0' && response.data != null) {
            _this.formdata.commonDebitCprt = response.data.unitName;
          } else {
            _this.formdata.commonDebitCprt = '';
          }
        }
      });
    }
  },
  mounted () {
    var _this = this;

    const datacode1 = _this.$lookup.find('STD_ZB_SELFPER_REL_TYP');
    _this.commonDebitCorreOpt = datacode1.filter(op => {
      return op.key === '101000' || op.key === '102000' || op.key === '103000' || op.key === '112000';
    });

    this.formdata.surveySerno = _this.$route.meta.params.iqpSerno;
    var op = this.pageParams.op;
    if (op == 'VIEW') {
      this.btnflag = false;
      this.viewflag = true;
    } else {
      this.viewflag = false;
      this.btnflag = true;
    }
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtcobinfo/queryByiqpPkId',
      data: {pkId: this.pageParams.pkId},
      callback: function (code, message, response) {
        if (code == '0') {
          yufp.clone(response.data, _this.formdata);
        } else {
          this.$message({
            message: message,
            type: 'error'
          });
        }
      }
    });
  }
};
</script>