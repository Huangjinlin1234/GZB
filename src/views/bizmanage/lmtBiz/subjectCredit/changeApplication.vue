<template>
  <div>
    <yu-panel title="" panel-type="simple">
    <yu-xform ref="refForm" v-model="formdata" label-width="170px" :rules="rules">
      <yu-xform-group :column="1">
        <yu-xform-item label="原授信情况" placeholder="原授信情况" name="origiLmtSurvey" ctype="textarea" maxlength="4000" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="本次授信申请变更内容" placeholder="本次授信申请变更内容" name="lmtChgContent" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" maxlength="4000" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="授信变更理由" placeholder="授信变更理由" name="lmtChgResn" ctype="textarea" maxlength="4000" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <div class="yu-grpButton">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="onPrint">查看变更申请报告</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
    </yu-panel>
  </div>
</template>
<script>
export default {
  props: {
    children: Object,
  },
  data() {
    return {
      rules: {
        origiLmtSurvey: [
          { required: true, message: "请输入原授信情况", trigger: "blur" },
        ],
        lmtChgContent: [
          { required: true, message: "请输入本次授信申请变更内容", trigger: "blur" },
        ],
        lmtChgResn: [
          { required: true, message: "请输入授信变更理由", trigger: "blur" },
        ],
      },
      saveBtnShow: false,
    };
  },
  created() {},
  mounted() {
    console.log("==============================", this.children);
    this.children.op == "EDIT"
      ? (this.saveBtnShow = true)
      : (this.saveBtnShow = false);
    this.getDetails(this.children.serno);
  },
  methods: {
    getDetails(serno) {
      var _this = this;
      _this
        .$request({
          method: "POST",
          url: backend.cmisBiz + "/api/lmtchgdetail/selectByLmtSerno",
          data: {
            lmtSerno: serno,
          },
        })
        .then((data) => {
          if (data.code == "0") {
            console.log("===========>>", data)
            yufp.clone(data.data, _this.formdata);
          } else {
            _this.$message({ message: "保存失败", type: "error" });
          }
        });
    },
    saveFn() {
      var validate = false,
        _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      _this
        .$request({
          method: "POST",
          url: backend.cmisBiz + "/api/lmtchgdetail/saveBgsqb",
          data: _this.formdata,
        })
        .then((data) => {
          if (data.code == "0") {
            _this.$message({ message: "保存成功", type: "success" });
          } else {
            _this.$message({ message: "保存失败", type: "error" });
          }
        });
    },
    onPrint(){
      var _this = this;
      const params = {};
      let name = 'bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
      let key = 'report';
      params.src = _this.$backend.frptRptService + 'zjty-bgsq31.cpt&lmtSerno=' + _this.children.serno;
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
    // 返回
    cancelFn() {
      this.$emit("changed", false);
    },
  },
};
</script>
