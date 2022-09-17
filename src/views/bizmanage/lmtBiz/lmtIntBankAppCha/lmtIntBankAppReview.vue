<template>
  <yu-panel title="变更申请表" panel-type="simple">
    <yu-xform label-width="120px" ref="refForm" :form-type="formType" v-model="formdata" :disabled="formDisabled" :rules="formRules">
      <yu-panel title="原授信情况" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="原授信情况" placeholder="原授信情况" name="origiLmtSurvey" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="本次授信申请变更内容" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="本次授信申请变更内容" placeholder="本次授信申请变更内容" name="lmtChgContent" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="授信变更理由" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="授信变更理由" placeholder="授信变更理由" name="lmtChgResn" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="saveBtnShow" type="primary" @click="onPrint">查看变更申请表报告</yu-button>
        <yu-button  type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </yu-panel>
</template>
<script>
export default {
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      formdata: {},
      formRules: {
        origiLmtSurvey: [
          {
            type: 'string',
            required: true,
            message: '原授信情况',
            trigger: 'blur'
          },
          { max: 2000, message: '原授信情况不超过2000个字符' }
        ],
        lmtChgContent: [
          {
            type: 'string',
            required: true,
            message: '本次授信申请变更内容',
            trigger: 'blur'
          },
          { max: 2000, message: '本次授信申请变更内容不超过2000个字符' }
        ],
        lmtChgResn: [
          {
            type: 'string',
            required: true,
            message: '授信变更理由',
            trigger: 'blur'
          },
          { max: 2000, message: '授信变更理由不超过2000个字符' }
        ]
      },
      dataParam: {},
      formDisabled: true,
      saveBtnShow: false
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
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
      _this.data = this.dataParam;
      _this.op = _this.data.op;
      _this.pkId = _this.data.pkId;
      _this.serno = _this.data.serno;
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtchgdetail/selectByLmtSerno',
        data: { lmtSerno: _this.serno },
        callback: function (code, message, response) {
          if (code == '0') {
            yufp.clone(response.data, _this.formdata);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        }
      });
    },

    // 打印
    onPrint: function () {
      var _this = this;
      _this.data = this.dataParam;
      const params = {};
      params.lmtSerno = _this.data.serno;
      let name = 'bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
      let key = 'report';
      params.src = _this.$backend.frptRptService + 'zjty-bgsq31.cpt&lmtSerno=' +
        params.lmtSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    saveFn: function () {
      debugger;
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
      var updateurl = backend.cmisBiz + '/api/lmtchgdetail/updateBgsqb';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        }
      });
    },

    cancelFn () {
      this.$emit('changed', false);
    }
  }
};
</script>
