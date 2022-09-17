<template>
  <yu-panel title="总体调查结论" panel-type="simple">
    <yu-xform :rules="rules" ref="refForm" v-model="formdata">
      <yu-xform-group :column="1">
        <yu-xform-item label="调查结论" placeholder="调查结论" name="indgtResult" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" maxlength="4000" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <div class="yu-grpButton">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </yu-panel>
</template>
<script>
export default {
  props: {
    children: Object,
  },
  data() {
    return {
      formdata: {},
      rules: {
        indgtResult: [
          { required: true, message: "请输入调查结论", trigger: "blur" },
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
      this.getDetails(this.children.serno)
  },
  methods: {
    getDetails(serno) {
      var _this = this
      _this
        .$request({
          method: "POST",
          url: backend.cmisBiz + "/api/lmtsiginvestapp/selectBySerno",
          data: {
            serno: serno,
          },
        })
        .then((data) => {
          if (data.code == "0") {
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
          url: backend.cmisBiz + "/api/lmtsiginvestapp/updateZtdcjl",
          data: {
            serno: this.children.serno,
            indgtResult: _this.formdata.indgtResult,
          },
        })
        .then((data) => {
          if (data.code == "0") {
            _this.$message({ message: "保存成功", type: "success" });
          } else {
            _this.$message({ message: "保存失败", type: "error" });
          }
        });
    },
    // 返回
    cancelFn() {
      this.$emit("changed", false);
    },
  },
};
</script>
