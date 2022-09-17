<template>
  <div id="d1">
    <div id="d1Content">
      <yu-xform ref="refForm" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="交易流水号" ctype="input" placeholder="交易流水号" name="pkId" disabled></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo"></yu-xform-item>
          <yu-xform-item label="" ctype="yu-button" name="b1" placeholder="" @click="doSelect">查询</yu-xform-item>
          <yu-xform-item label="核心交易日期" ctype="input" name="coreTranDate" disabled placeholder="核心交易日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep" >下一步</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/xw/createIqpLoanApp',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      disabledFlg: true,
      buttonLoading: false
    };
  },
  methods: {

    /* 选择批复编号*/
    doSelect () {
      let _this = this;
      let rtParam = _this.formdata;

      _this.$dialog.open(
        '',
        'xwmanage/demandmanage/addCorePop',
        750,
        490,
        rtParam,
        params => {
          if (!params) {
            // 取消返回
            return;
          }
          // yufp.clone(params, _this.htsqxz.formdata);
          // const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
          _this.formdata.contNo = params.contNo; // 合同编号
          _this.formdata.cusId = params.cusId; // 客户ID
          _this.formdata.cusName = params.cusName;// 客户名称
          _this.formdata.billNo = params.billNo; // 借据号
          _this.formdata.coreTranDate = params.coreTranDate; // 核心交易日期
          _this.formdata.approveStatus = '000'; // 审批状态
        }
      );
    },

    /* 下一步按钮*/
    doNextStep () {
      // 先进行校验
      const validateFlag = this.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      let data = this.addData(this.formdata);
      if (data.code == '0') {
        this.$xutils.showConfirmBox('提示', '新增成功,进入详细页面', 400, 200, _isOK => {
          if (_isOK) {
            let pvpDemandRepayAppInfo = data.data;
            pvpDemandRepayAppInfo['showFlg'] = '01';
            pvpDemandRepayAppInfo['s'] = '1';
            this.$dialog.close(this.dialogId);
            this.$router.addTab({
              name: 'xwmanage/demandmanage/demandRepayApp',
              key: new Date().getTime(),
              title: '冲正申请',
              data: pvpDemandRepayAppInfo
            });
          } else {
            this.$dialog.close(this.dialogId);
          }
        });
      } else {
        this.$message({ message: '创建失败,请重试!', type: 'warning' });
        this.$dialog.close(this.dialogId);
      }
    },
    /** 新增申请
     */
    addData (data) {
      let returnData = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpdemandrepayappinfo/addpvpdemandrepayapp',
        data: data,
        callback: function (code, message, response) {
          returnData = response;
        }
      });
      return returnData;
    },
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
