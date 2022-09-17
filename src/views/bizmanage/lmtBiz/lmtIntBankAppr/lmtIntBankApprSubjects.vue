<template>
  <yu-panel title="主体分析" panel-type="simple">
   <yu-xform label-width="120px" ref="refForm" :form-type="formType" v-model="formdata" :disabled="formDisabled" :rules="formRules">
      <yu-xform-group :column="1">
        <yu-xform-item label="同业授信准入"  placeholder="同业授信准入" name="intbankLmtAdmit" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        <yu-xform-item label="调查结论"  placeholder="调查结论" name="indgtResult" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
        <yu-button  type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </yu-panel>
</template>
<script>
export default {
  data: function () {
    return {
      formdata: {},
      formRules: {
        intbankLmtAdmit: [
          {
            type: 'string',
            required: true,
            message: '同业机构准入',
            trigger: 'blur'
          },
          { max: 2000, message: '同业机构准入不超过2000个字符' }
        ],
        indgtResult: [
          {
            type: 'string',
            required: true,
            message: '调查结论',
            trigger: 'blur'
          },
          { max: 2000, message: '调查结论不超过2000个字符' }
        ]
      }
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.$route.meta.params;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.serno;
      _this.formDisabled = false;
      _this.saveBtnShow = true;
      if (_this.op == 'DETAIL') {
        _this.saveBtnShow = false;
        _this.formDisabled = true;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtintbankappr/selectByModel',
        data: { condition: JSON.stringify({ oprType: '01', serno: _this.serno }) },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdata);
        }
      });
    },
    saveFn: function () {
      var validate = false,
        _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }

      var model = {};
      yufp.clone(_this.formdata, model);
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var updateurl = backend.cmisBiz + '/api/lmtintbankappr/updateAppr';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          _this.$message('修改成功');
        }
      });
    },

    cancelFn () {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    }
  }
};
</script>