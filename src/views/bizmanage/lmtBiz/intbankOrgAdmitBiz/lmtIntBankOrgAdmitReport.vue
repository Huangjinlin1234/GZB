<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="120px" v-model="formReport" :rules="rules">
      <yu-panel title="授信基本信息" panel-type="simple">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="准入申报信息" panel-type="simple">
        <yu-xform-group>
          <yu-xform-item label="金融市场总部风险合规部信评岗出具综合分析" name="inteAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!disabledInteAnaly"></yu-xform-item>
          <yu-xform-item label="信贷管理部风险派驻岗出具综合分析" name="inteAnalyZh" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!disabledInteAnalyZH"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <div class="yu-grpButton">
      <yu-button v-if="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="doPrint">查看审查报告</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="goBackFn">返回</yu-button>
    </div>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";
yufp.lookup.reg("STD_ZB_ORG_ADMIT_TYPE,STD_SX_LMT_TYPE,STD_ZB_APPR_STATUS");
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
  },
  data: function () {
    return {
      formReport: {},
      rules: {
        inteAnaly: [
          { required: false, message: "请填写出具综合分析", trigger: "blur" },
        ],
        inteAnalyZh: [
          { required: false, message: "请填写出具综合分析", trigger: "blur" },
        ],
      },
      saveBtnShow: true,
      disabledInteAnaly: false,
      disabledInteAnalyZH: false,
    };
  },
  created(){
    debugger;
    let op = this.pageParams.op;
    if(op == 'EDIT'){
      this.saveBtnShow = true;
      // 控制 输入框是否只读
      if(this.pageParams.disabledInteAnaly){
        this.disabledInteAnaly = true;
        this.rules.inteAnaly[0].required = true;
      }
      if(this.pageParams.disabledInteAnalyZH){
        this.disabledInteAnalyZH = true;
        this.rules.inteAnalyZh[0].required = true;
      }
    }else{
      this.saveBtnShow = false;
      this.disabledInteAnaly = false;
      this.disabledInteAnalyZH = false;
    }
    this.init();
  },
  mounted() {

  },
  methods: {
    // changeTerm(val) {
    //   let term = Number(val);
    //   let date = new Date();
    //   date.setMonth(date.getMonth() + term);
    //   date = date.toLocaleString("chinese", { hour12: false });
    //   date = date.replace(new RegExp("/", "gm"), "-");
    //   this.formReport.endDate = date;
    // },
    init: function () {
      var _this = this;
      yufp.service.request({
        method: "POST",
        url:
          _this.$backend.cmisBiz +
          "/api/intbankorgadmitappr/selectByModel",
        data: {
          condition: JSON.stringify({
            serno: _this.pageParams.serno,
            oprType: "01",
            issueReportType: "01",
            cusId: "",
          }),
          sort: "createTime desc",
        },
        callback: function (code, message, response) {
          if (code == 0) {
            // 默认为12
            response.data[0].term = 12;
            // 反显字段
            yufp.clone(response.data[0], _this.formReport);
            let date = new Date();
            date.setMonth(date.getMonth() + 12);
            date = date.toLocaleString("chinese", { hour12: false });
            date = date.replace(new RegExp("/", "gm"), "-");
            _this.formReport.endDate = date;
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    // 打印
    onPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.formReport.serno;
      params.cusId = _this.formReport.cusId;
      let name = "bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport";
      let key = "report";
      params.src =
        _this.$backend.frptRptService +
        "zjty-zrscbg21.cpt&serno=" +
        params.serno;
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
    // 打印
    doPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.formReport.serno;
      params.cusId = _this.formReport.cusId;
      params.src =
        _this.$backend.frptRptService +
        "zjty-zrscbg21.cpt&serno=" +
        params.serno;
      this.$emit("doPrint", params);
    },
    // 保存按钮
    saveFn: function () {
      var _this = this;
      var validate = false;
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
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/intbankorgadmitappr/updateAppr",
        data: _this.formReport,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message("操作成功");
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    // 返回按钮
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
  },
};
</script>
