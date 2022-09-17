<template>
  <yu-panel title="复议申请表" panel-type="simple">
    <yu-xform label-width="120px" ref="refForm" :form-type="formType" v-model="formdata" :disabled="formDisabled" :rules="formRules">
      <yu-panel title="复议内容" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="上期申请授信情况及总行审批意见"  placeholder="上期申请授信情况及总行审批意见" name="intbankLmtAdmit" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
          <yu-xform-item label="本次申请复议内容"  placeholder="本次申请复议内容" name="indgtResult" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="复议理由" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="进一步陈述坚持要求发放该笔融资的原因"  placeholder="进一步陈述坚持要求发放该笔融资的原因" name="intbankLmtAdmit" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
          <yu-xform-item label="风险防范措施"  placeholder="风险防范措施" name="indgtResult" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
          <yu-xform-item label="其他理由"  placeholder="其他理由" name="indgtResult" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
          </yu-xform-group>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="saveBtnShow" type="primary">查看复议申请表报告</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
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
      _this.serno = this.data.apprSerno;
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
      var updateurl = backend.cmisBiz + '/api/lmtintbankapp/updateSelective';
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