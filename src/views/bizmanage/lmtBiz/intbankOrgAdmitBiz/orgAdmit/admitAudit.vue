<template>
  <div class="container">
    <yu-xform ref="refForm" v-model="formdata" label-width="120px" :rules="rules">
      <yu-panel title="授信基本信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" name="serno" placeholder="业务流水号" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" name="appType" data-code="STD_ZB_ORG_ADMIT_TYPE" placeholder="业务类型"
                         disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" placeholder="客户编号" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" disabled></yu-xform-item>
          <yu-xform-item label="发起人" ctype="input" name="inputIdName" placeholder="发起人" disabled></yu-xform-item>
          <yu-xform-item label="投资机构" ctype="input" name="inputBrIdName" placeholder="投资机构" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="准入申请信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="准入期限" ctype="yu-num" name="term" placeholder="准入期限" precision="0"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_ORG_ADMIT_TYPE');
export default {
  name: "admitAudit",
  props: {
    pageParams: {
      type: Object,
      default: function () {
        return {};
      },
    },
    dialogId: String,
    modelGroupNo: String,
  },
  data() {
    return {
      dataUrl: backend.cmisBiz + "/api/intbankorgadmitappr/selectLastApprBySerno",
      saveUrl: backend.cmisBiz + "/api/intbankorgadmitappr/saveTerm",
      formdata: {},
      rules: {
        term: [
          {
            required: true,
            message: "准入期限",
            trigger: "blur",
          }
        ],
      }
    }
  },
  created() {
    let cusId, serno, op;
    if (this.$route.meta.params) {
      this.serno = serno = this.$route.meta.params.serno;
      this.cusId = cusId = this.$route.meta.params.cusId;
      op = this.$route.meta.params.op;
    } else {
      this.serno = serno = this.pageParams.serno;
      this.cusId = cusId = this.pageParams.cusId;
      op = this.pageParams.op;
    }
    console.log("============>>>>", this.pageParams, this.$route.meta.params)
    this.Param = {
      condition: JSON.stringify({cusId: cusId, serno: serno}),
    };
    op == "update" ? (this.saveBtnShow = true) : (this.saveBtnShow = false);
    this.getDetails(serno, cusId);
  },
  methods: {
    getDetails: function (serno, cusId) {
      let _this = this;
      yufp.service.request({
        method: "POST",
        url: this.dataUrl,
        data: {
          serno: serno,
          cusId: cusId
        },
        callback: function (code, message, response) {
          if (code == '0') {
            console.log("response===>", response.data[0]);
            yufp.clone(response.data[0], _this.formdata);
          } else {
            _this.$message({message: "请求失败", type: "error"});
          }
        }
      })
    },
    saveFn: function () {
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
      let term = this.formdata.term;
      if (term < 0 || term > 999) {
        _this.$message({
          message: "准入期限必须在（0-999）之间，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      let model = {};
      model.term = term;
      model.serno = _this.serno;

      yufp.service.request({
        method: 'POST',
        url: _this.saveUrl,
        data: model,
        callback(code, message, response) {
          if (code == '0') {
            _this.$message({message: "保存成功", type: "success"});
          } else {
            _this.$message({message: "保存失败", type: "error"});
          }
        }
      });
    },
    //关闭当前标签页，返回上个标签页
    cancelFn:function(){
      //调用全局挂载的方法
      this.$store.dispatch('tagsView/delView', this.$route);
      //返回上一步路由
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
