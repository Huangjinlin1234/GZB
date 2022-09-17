<template>
  <div>
    <yu-panel title="授信额度调剂申请表"  :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata" :disabled="type=='VIEW'" :form-type="viewType">
        <yu-panel title="授信额度调剂申请概述"  :hideFilter="false" :collapseHide="false">
          <yu-xform-item label="pkId" ctype="input" name="pkId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="授信申请流水号" ctype="input" name="lmtSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="本次授信额度调剂内容" ctype="textarea" name="lmtAdjustContent" rules="required"></yu-xform-item>
          <yu-xform-item label="额度调剂理由" ctype="textarea" name="lmtAdjustResn" rules="required"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputId"  disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" name="inputDate"  disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="最后更新人" ctype="input" name="updId"  disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="最后更新机构" ctype="input" name="updBrId" disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="最后更新日期" ctype="input" name="inputDate"  disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="创建日期" ctype="input" name="inputDate"  disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="修改日期" ctype="input" name="inputDate"  disabled="true" hidden></yu-xform-item>
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
      dataUrl: backend.cmisBiz + '/api/lmtchgdetail/queryDetailByLmtSerno',
      baseParams: {},
      baseFormdata: {}
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
      let data = {};
      var lmtSerno = '';
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        data = _this.getFactory().contextData.instanceInfo;
        lmtSerno = data.bizId;
        _this.type = 'VIEW';
      } else {
        data = _this.$route.meta.params;
        lmtSerno = data.serno;
        _this.type = data.op;
      }
      _this.baseParams = {lmtSerno: lmtSerno};
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtadjustdetail/selectbylmtserno',
        data: {'lmtSerno': lmtSerno},
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
              url: backend.cmisBiz + '/api/lmtadjustdetail/save',
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
      obj.pageId = 'cytjsqb';
      obj.pageName = '成员调剂申请表';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    // 打印
    printFn: function () {
      var _this = this;
      var params = _this.baseFormdata;// 模板工厂中的参数传递
      if (params.lmtSerno == null || params.lmtSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemofysqbjt';
      params.src = _this.$backend.frptRptService + 'DGSX-EDTJSQS-DY.cpt&op=view&serno=' + params.lmtSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '额度调剂申请表',
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
