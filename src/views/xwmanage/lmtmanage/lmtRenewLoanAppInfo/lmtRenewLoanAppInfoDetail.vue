/* eslint-disable no-tabs */
<!--
  @Created by zhuly8@yusys.com.cn 2021-01-11
  @updated by
  @description 客户续贷申请列表
-->
<template>
  <div>
    <yu-xform ref="formdata" label-width="120px" v-model="formdata" disabled>
      <yu-xform-group :column="2">
        <yu-xform-item label="客户号" ctype="input" name="cusId"></yu-xform-item>
        <yu-xform-item label="申请人姓名" ctype="input" name="cusName"></yu-xform-item>
        <yu-xform-item label="申请人证件号" ctype="input" name="certCode"></yu-xform-item>
        <yu-xform-item label="原合同编号" ctype="input" name="oldContNo"></yu-xform-item>
        <yu-xform-item label="合同类型" ctype="select" name="contType" data-code="STD_CONT_TYPE"></yu-xform-item>
        <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" :min="0"></yu-xform-item>
        <yu-xform-item label="借据余额" ctype="yu-currency" name="billBalance" :min="0"></yu-xform-item>
        <yu-xform-item label="申请人手机号" ctype="input" name="appPhone"></yu-xform-item>
        <yu-xform-item label="企业名称" ctype="textarea" name="conName"></yu-xform-item>
        <yu-xform-item label="统一社会信用代码" ctype="input" name="unifyCreditCode"></yu-xform-item>
        <yu-xform-item label="名单生成日期" ctype="input" name="createTime"></yu-xform-item>
        <yu-xform-item label="续贷申请日期" ctype="input" name="appDate"></yu-xform-item>
        <yu-xform-item label="名单处理状态" ctype="select" name="status" data-code="STD_XD_LIST_STATUS"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="onConfirm">取消</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_TYPE,STD_XD_LIST_STATUS');
export default {
  data: function () {
    return {
      formdata: {}
    };
  },
  created: function () {
    var _this = this;
    _this.$request({
      method: 'GET',
      url: backend.cmisBiz + '/api/lmtrenewloanappinfo/' + _this.$route.meta.params.serno
    }).then(({code, message, data}) => {
      if (data != null) {
        yufp.clone(data, _this.formdata);
      } else {
        _this.$message({message: message, type: 'error'});
      }
    });
  },
  methods: {
    // 取消
    onConfirm: function () {
      var _this = this;
      this.$nextTick(function () {
        this.$refs.formdata.resetFields();
      });
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>
