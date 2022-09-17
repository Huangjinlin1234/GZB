<template>
  <yu-panel title="复议申请表" panel-type="simple">
    <yu-xform label-width="120px" ref="refForm" :form-type="formType" v-model="formdata" :disabled="formDisabled" :rules="formRules">
      <yu-panel title="复议内容" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="上期申请授信情况及总行审批意见" placeholder="上期申请授信情况及总行审批意见" name="lastLmtCondition" ctype="textarea" :disabled="!saveBtnShow" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
          <yu-xform-item label="本次申请复议内容" placeholder="本次申请复议内容" name="lmtRediContent" ctype="textarea" :disabled="!saveBtnShow" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="复议理由" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="进一步陈述坚持要求发放该笔融资的原因" placeholder="进一步陈述坚持要求发放该笔融资的原因" name="keepFinaReason" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="风险防范措施" placeholder="风险防范措施" name="riskGuardMeasu" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="其他理由" placeholder="其他理由" name="otherResn" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="lookReconsider">查看复议申请表报告</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </yu-panel>
</template>
<script>
export default {
  props: {
    children: Object
  },
  data () {
    return {
      formdata: {},
      formRules: {
        lastLmtCondition: [
          {
            required: true,
            message: '请输入上期申请授信情况及总行审批意见',
            trigger: 'blur'
          }
        ],
        lmtRediContent: [
          {
            required: true,
            message: '请输入本次申请复议内容',
            trigger: 'blur'
          }
        ],
        keepFinaReason: [
          {
            required: true,
            message: '请输入上进一步陈述坚持要求发放该笔融资的原因',
            trigger: 'blur'
          }
        ],
        riskGuardMeasu: [
          { required: true, message: '请输入风险防范措施', trigger: 'blur' }
        ],
        otherResn: [
          { required: true, message: '请输入其他理由', trigger: 'blur' }
        ]
      },
      indgtResult: '',
      saveBtnShow: false
    };
  },
  created () {},
  mounted () {
    debugger;
    this.children.op == 'EDIT'
      ? this.saveBtnShow = true
      : this.saveBtnShow = false;
    this.lmtSerno = this.children.serno;
    this.getDetails(this.children.serno);
  },
  methods: {
    lookReconsider () {
      var _this = this;
      const params = {};
      params.lmtSerno = _this.children.serno;
      let name = "bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport";
      let key = "report";
      params.src = _this.$backend.frptRptService + "zjty-fysq30.cpt&lmtSerno=" +
        params.lmtSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: "帆软打印",
        // 传递的业务数据，可选配置
        data: params,
      });

    },
    getDetails (serno) {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtreconsidedetail/selectBySerno',
          data: serno
        })
        .then((data) => {
          if (data.code == '0') {
            yufp.clone(data.data, _this.formdata);
          } else {
            _this.$message({ message: '保存失败', type: 'error' });
          }
        });
    },
    saveFn () {
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
      // _this.formdata.lmtSerno = _this.children.serno;
      // _this.formdata.pkId = _this.pkId;
      // _this.formdata.oprType = "01";
      _this.formdata.serno = this.lmtSerno;
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtreconsidedetail/updateFysqb',
          data: _this.formdata
        })
        .then((data) => {
          if (data.code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
          } else {
            _this.$message({ message: '保存失败', type: 'error' });
          }
        });
    },
    // 返回
    cancelFn () {
      this.$emit('changed', false);
    }
  }
};
</script>
