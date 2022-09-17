<template>
  <div>
    <yu-panel title="授信变更申请"  :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata" :disabled="type=='VIEW'||type=='view'" :form-type="viewType">
        <yu-xform-item label="业务流水号" ctype="input" name="lmtSerno" disabled hidden="true"></yu-xform-item>
        <yu-xform-group column="1">
          <yu-xform-item label="原授信情况" ctype="textarea" name="origiLmtSurvey"></yu-xform-item>
          <yu-xform-item label="本次授信变更内容" ctype="textarea" name="lmtChgContent"></yu-xform-item>
          <yu-xform-item label="授信变更理由" ctype="textarea" name="lmtChgResn"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'&&type!='view'" type="primary" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="printFn">打印</yu-button>
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
      if (_this.getFactory().contextData.instanceInfo) {
        serno = _this.getFactory().contextData.instanceInfo.bizId;
        op = _this.getFactory().contextData.instanceInfo.param.op;
      } else if (_this.$route.meta.params) {
        serno = _this.$route.meta.params.serno;
        op = _this.$route.meta.params.op;
      }
      _this.type = op;
      this.baseFormdata.lmtSerno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtchgdetail/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata);
          });
        }
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
      _this.$confirm('确认保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtchgdetail/save',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },

    printFn: function () {
      debugger;
      var _this = this;
      var params = _this.baseFormdata;// 模板工厂中的参数传递
      if (params.lmtSerno == null || params.lmtSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxbgsqsdy2';
      params.src = _this.$backend.frptRptService + 'DGSX-SXBGSQS-DY.cpt&op=view&serno=' + params.lmtSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '授信变更申请书（单一）',
        // 传递的业务数据，可选配置
        data: params
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
