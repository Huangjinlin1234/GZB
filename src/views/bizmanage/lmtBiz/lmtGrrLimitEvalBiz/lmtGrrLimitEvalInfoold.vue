 <!--
    @created by zhuly6 2020-05-06
    @updated by 詹煜彪
    @description 授信保证人担保额度测算表
  -->
<template>
  <div class="group-form">
  <div id="group-formContent">
    <yu-xform ref="refForm" label-width="200px" v-model="formdata">
      <yu-panel title="授信保证人担保额度测算表" :hideFilter="false" :collapseHide="false" id="baseInfo">
        <yu-xform-group column="2">
            <yu-xform-item label="主键" name="pkId" rules="required" ctype="input" :disabled="true" hidden></yu-xform-item>
            <yu-xform-item label="申请流水号" name="serno" rules="required" ctype="input" :disabled="true" hidden></yu-xform-item>
            <yu-xform-item label="担保人客户编号" name="guarCusId" rules="required" ctype="input" :disabled="true"></yu-xform-item>
            <yu-xform-item label="企业规模" name="corpScale" rules="required" ctype="select" data-code="STD_CORP_SCALE" :disabled="true"></yu-xform-item>
            <yu-xform-item label="操作类型" name="oprType" rules="required" ctype="select" data-code="STD_ZB_OPR_TYPE" :disabled="true"></yu-xform-item>
            <yu-xform-item label="可担保额度" name="evalGuarLmtAmt" rules="required" ctype="input" :disabled="true"></yu-xform-item>
            <yu-xform-item label="净资产值" name="pureAssetValue" rules="required" ctype="yu-currency" :precision="0" :disabled="true"></yu-xform-item>
            <yu-xform-item label="放大倍数" name="enalrgeTimes" rules="required" ctype="yu-currency" :precision="0" :disabled="true"></yu-xform-item>
            <yu-xform-item label="或有负债" name="cntgDebt" rules="required" ctype="yu-currency" :precision="0"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    </div>
    <div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onPrint">打印</yu-button>
      <yu-button type="primary" @click="onSure">确定</yu-button>
    </yu-form-buttons>
  </div>
</div></template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_CORP_SCALE,STD_ZB_OPR_TYPE');
export default {
  mixins: [mixinForm],
  data: function () {
    var checkAccNo = function (rule, value, callback) {
      setTimeout(function () {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);
    };
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
      accNoRule: [
        { required: true, message: '账号不能为空' },
        { validator: checkAccNo }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,

      numberValidateForm: {
        loanPayoutAccno: ''
      }
    };
  },

  mounted () {
    var _this = this;
    // let data = _this.$route.meta.params;
    // let obj = _this.getFactory().contextData;
    let serno = _this.$route.meta.params.serno;
    debugger;
    // let serno = _this.getFactory().contextData.biz_serno;
    _this.viewType = _this.getFactory().contextData.viewType;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrrlimiteval/showdetial',
      data: { serno: serno },
      // data: { pvpSerno: data.pvpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },

  methods: {
    // 保存
    save: function () {
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
      yufp.clone(_this.formdata, model);
      // var url = backend.cmisBiz + '/api/pvploanapp/updatesavepvploanapp';
      var url = backend.cmisBiz + '/api/lmtgrrlimiteval/updatelmtgrrlimiteval';
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