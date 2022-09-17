<template>
  <div>
    <yu-panel title="复议申请表"  :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata" :disabled="type=='VIEW'" :form-type="viewType">
        <yu-panel title="集团复议申请概述"  :hideFilter="false" :collapseHide="false">
            <yu-xform-item label="集团复议申请概述" ctype="textarea" name="grpRecoAppMemo" rules="required"></yu-xform-item>
            <yu-xform-item label="授信申请流水号" ctype="input" name="lmtSerno" disabled hidden="true"></yu-xform-item>
        </yu-panel>
        <yu-panel title="各成员申请内容"  :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" :base-params="baseParams" selection-type="radio" request-type="POST">
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="上期申请情况及总行审批意见" prop="lastLmtCondition"></yu-xtable-column>
            <yu-xtable-column label="本次授信复议内容" prop="lmtRediContent"></yu-xtable-column>
            <yu-xtable-column label="进一步陈述坚持要求发放该笔融资原因" prop="keepFinaReason"></yu-xtable-column>
            <yu-xtable-column label="风险防范措施" prop="riskGuardMeasu"></yu-xtable-column>
            <yu-xtable-column label="其他理由" prop="otherResn"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" v-if="type!='VIEW'" @click="submit">保存</yu-button>
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
      majorGradeForm: null,
      dataUrl: backend.cmisBiz + '/api/lmtreconsidedetail/queryDetailByLmtSerno',
      baseParams: {}
    };
  },
  created () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      let lmtSerno = '';
      let data = {};
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        data = _this.getFactory().contextData.instanceInfo;
        lmtSerno = data.bizId;
        _this.type = 'VIEW';
      } else {
        data = _this.$route.meta.params;
        lmtSerno = data.grpSerno;
        _this.type = data.op;
      }
      _this.baseParams = {
        lmtSerno: lmtSerno
      };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreconsidedetail/selectBySerno',
        data: lmtSerno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata);
            _this.baseFormdata.lmtSerno = lmtSerno;
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
      obj.pageId = 'jtsxfysqb';
      obj.pageName = '集团授信复议申请表';
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
      var params = _this.baseFormdata;// 模板工厂中的参数传递
      if (params.lmtSerno == null || params.lmtSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemofysqbjt';
      params.src = _this.$backend.frptRptService + 'DGSX-FYSQB-JT.cpt&op=view&grpSerno=' + params.lmtSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '复议申请表(集团)',
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
