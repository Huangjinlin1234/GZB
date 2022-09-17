<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="formdata" label-width="150px" :form-type="formType" v-model="formdata" :rules="formRules">
        <yu-xform-group :column="2">
          <yu-xform-item label="区域编号" ctype="input" placeholder="区域编号" name="areaNo" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="区域名称" ctype="input" placeholder="区域名称" name="areaName" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="memo"></yu-xform-item>
          <yu-xform-item label="是否启用" ctype="select" name="isBegin" rules="required" placeholder="是否启用" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="签约方式" ctype="select" name="signMode" rules="required" data-code="STD_SIGN_MODE" placeholder="签约方式"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="datepicker" placeholder="创建时间" name="createTime" value-format="yyyy-MM-dd" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" disabled hidden placeholder="修改时间"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doSave" v-show="saveBtnShow">保存</yu-button>
      <yu-button type="primary" @click="onConfirm">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_SIGN_MODE,STD_ZB_YES_NO');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      formdata: [],
      saveBtnShow: true,
      formType: 'details',
      formRules: {}
    };
  },
  mounted () {
    this.AfterInit();
    var _this = this;
    if (this.$route.meta.params.pageType == 0) {
      this.formType = 'details';
      yufp.clone(this.$route.meta.params.params, this.formdata);
    } else {
      // 1  新增 2 修改
      this.formType = 'edit';
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      // this.formdata.inputBrIdName = this.$utils.getDefaultformulaData('$LoginOrgName');
      // this.formdata.updIdName = this.$utils.getDefaultformulaData('$LoginUserName');
      if (this.$route.meta.params.pageType == 2) {
        yufp.clone(this.$route.meta.params.params, this.formdata);
      }
    };
  },

  methods: {
    AfterInit () {
    },

    doSave () {
      var _this = this;
      var validate = false;
      _this.$refs.formdata.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息补充完整！');
        return;
      }
      var jsoPar = {};
      yufp.clone(_this.formdata, jsoPar);
      this.$request({
        method: 'POST',
        url: this.$backend.cmisBiz + '/api/areamanager/save',
        data: jsoPar
      }).then(({code, message, data}) => {
        if (data != null) {
          yufp.router.removeTab(_this.$route.path);
          this.$xutils.showMsgBox('提示', '操作成功');
        } else {
          this.$xutils.showMsgBox('提示', '操作失败');
        }
      });
    },
    // 取消
    onConfirm: function () {
      var _this = this;
      this.visiable = false;
      this.$nextTick(function () {
        this.$refs.formdata.resetFields();
      });
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>
