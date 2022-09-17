<template>
  <!--
    @created by zhuly6 2020-05-06
    @updated by 詹煜彪
    @description 客户管理组件使用示例
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false" id="baseInfo">
        <yu-xform-group column="1">
          <yu-xform-item label="合同编号" name="contNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" colspan="24"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合贷款发放币种" name="contCurType" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="本次出账金额" name="curtPvpAmt" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款形式" name="loanModal" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="借新还旧类型" name="refinancingType" rules="required" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-form-buttons class="buttons">
        <yu-row>
          <yu-col :span="14">
            <yu-xform-item label=" " label-suffix=" " ctype="custom" name="content" :rows="6" class="custom-button" alion="center">
              <yu-button type="primary" @click="nextStep">下一步</yu-button>
            </yu-xform-item>
          </yu-col>
        </yu-row>
      </yu-form-buttons>
    </yu-xform>
  </div>
</template>
<script>
yufp.lookup.reg('USER_STATUS,COMPANY_TYPE,DEPARTMENT,GENDER,IDENT_TYPE,BRANCH,EDUCATION_TYPE,JOB_TYPE,NATION,SUBRANCH');
export default {
  data: function () {
    return {
      activeName: 'workSche',
      searchFormdata: {},
      dataUrl: backend.pvpLoanAppService + '/api/pvploanapp/',
      formdata: {},
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
      saveBtnShow: true
    };
  },

  methods: {
    // 取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: '/trade/example/save',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },

    // 下一步
    nextStep () {
      let _this = this;
      // let validate = false;
      // this.$refs.refForm.validate(function (valid) {
      //   validate = valid;
      // });
      // if (!validate) {
      //   return;
      // }
      _this.saveFn();

      // 先往库里面插值。插值成功之后再跳转页面
      _this.$router.addTab({
        name: 'zrcbank/biz/pvpLoanApp/pvpLoanAppInfo',
        key: '1',
        title: '向导2',
        data: _this.tableFormdata
      });
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
