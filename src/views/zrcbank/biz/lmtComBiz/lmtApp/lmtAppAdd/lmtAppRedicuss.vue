<template>
  <div>
    <yu-panel title="再议申请表"  :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata" :disabled="type=='VIEW'" :form-type="viewType">
        <yu-xform-item label="业务流水号" ctype="input" name="lmtSerno" disabled hidden="true"></yu-xform-item>
        <yu-xform-group column="1">
          <yu-xform-item label="上期申请情况" ctype="textarea" rules="required" name="lastAppLmtMemo"></yu-xform-item>
          <yu-xform-item label="上期总行审批意见" ctype="textarea" rules="required" name="lastAppHeadBankAdvice"></yu-xform-item>
          <yu-xform-item label="再议理由" ctype="textarea"  rules="required" name="spplMaterDesc"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'" type="primary" @click="submit">保存</yu-button>
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
      var serno = _this.$route.meta.params.serno;
      var op = _this.$route.meta.params.op;
      _this.type = op;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata.lmtSerno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtredicussdetail/selectBySerno',
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
              url: backend.cmisBiz + '/api/lmtredicussdetail/save',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
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
      obj.pageId = 'zysqxx';
      obj.pageName = '再议申请信息';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    // 取消并返回上一页面
    printFn: function () {
      var _this = this;
      // var params = _this.baseFormdata;
      var params = _this.$route.meta.params;
      if (params.serno == null || params.serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemozysqbdy';
      params.src = _this.$backend.frptRptService + 'DGSX-ZYSQB-DY.cpt&op=view&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '再议申请表(单一)',
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
