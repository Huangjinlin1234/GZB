<template>
  <div>
    <yu-panel title="复议申请表"  :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata" :disabled="type=='VIEW'" :form-type="viewType">
        <yu-panel title="复议内容"  :hideFilter="false" :collapseHide="false">
        <yu-xform-item label="业务流水号" ctype="input" name="lmtSerno" disabled hidden="true"></yu-xform-item>
        <yu-xform-group column="1">
          <yu-xform-item label="上期申请情况及总行审批意见" rules="required" ctype="textarea" name="lastLmtCondition"></yu-xform-item>
          <yu-xform-item label="本次授信复议内容" ctype="textarea" rules="required" name="lmtRediContent"></yu-xform-item>
        <yu-panel title="复议理由"  :hideFilter="false" :collapseHide="false">
          <yu-xform-item label="进一步陈述坚持要求发放该笔融资原因" rules="required" ctype="textarea" name="keepFinaReason"></yu-xform-item>
          <yu-xform-item label="风险防范措施" ctype="textarea" rules="required" name="riskGuardMeasu"></yu-xform-item>
          <yu-xform-item label="其他理由" ctype="textarea" rules="required" name="otherResn"></yu-xform-item>
        </yu-panel>
        </yu-xform-group>
      </yu-panel></yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'" type="primary" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="print">打印</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null
    };
  },
  mounted () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = '';
      var op = '';
      if (this.$route.meta.params) {
        serno = _this.$route.meta.params.serno;
        op = _this.$route.meta.params.op;
      }
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      _this.type = op;
      if (!_this.type || _this.type === '') {
        _this.type = 'VIEW';
      }
      this.baseFormdata.lmtSerno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreconsidedetail/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata);
          });
        }
      });
    },

    // 取消并返回上一页面
    print: function () {
      debugger;
      var _this = this;
      // var params = _this.baseFormdata;// 模板工厂中的参数传递
      var params = _this.$route.meta.params;
      if (params.serno == null || params.serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemofysqbdy';
      params.src = _this.$backend.frptRptService + 'DGSX-FYSQB-DY.cpt&op=view&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '复议申请表(单一)',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.$confirm('本人保证对该笔融资可能出现的风险和问题负完全责任，并承诺按期收回该笔融资信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtreconsidedetail/save',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                _this.doMustCheck();
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    doMustCheck: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.baseFormdata.lmtSerno;
      obj.pageId = 'fysqxx';
      obj.pageName = '复议申请信息';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.$router.go(-1);
    }

  }
};
</script>
