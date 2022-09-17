<template>
   <div>
        <p style="font-size:24px;text-align:center;padding:50px 0 0 0">授信变更申请书（法人）</p>
        <div>
          <yu-panel :hideFilter="false" :collapseHide="false">
              <yu-xform ref="refForm3" label-width="200px" v-model="baseFormdata" :form-type="viewType" >
                  <yu-xform-group column="1">
                    <yu-xform-item label="业务流水号" ctype="input" name="lmtSerno" hidden="true"></yu-xform-item>
                    <yu-xform-item label="一、原授信情况" ctype="textarea" rules="required" name="origiLmtSurvey"></yu-xform-item>
                    <yu-xform-item label="二、本次变更申请内容和变更理由" ctype="textarea" rules="required" name="lmtChgContent"></yu-xform-item>
                    <yu-xform-item label="三、变更授信后内容和结论" ctype="textarea" rules="required" name="lmtChgResn"></yu-xform-item>
                  </yu-xform-group>
              </yu-xform>
          </yu-panel>
          <yu-form-buttons align="center">
              <yu-button type="primary" @click="submitFormFn">保存</yu-button>
              <yu-button type="primary" @click="onPrint">打印</yu-button>
          </yu-form-buttons>
        </div>
   </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
    };
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.innitForm();
  },
  methods: {
    submitFormFn: function () {
      var _this = this;
      // 校验输入项
      var validate = false;
      _this.$refs.refForm3.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.$confirm('是否确认保存?', '提示', {
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
                if (response.code == '0') {
                  _this.doMustCheck();
                  _this.$message('保存成功!');
                } else {
                  _this.$message('保存失败!');
                }
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
      obj.pageId = 'sxbgsqs';
      obj.pageName = '授信变更申请书';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    innitForm: function () {
      var serno = '';
      var _this = this;
      if (_this.$route.meta.params) {
        // serno = this.getFactory().contextData.serno;
        serno = _this.$route.meta.params.serno;
      } else if (_this.pageParams) {
        serno = _this.pageParams.serno;
      } else if (_this.getFactory().contextData.serno) {
        serno = _this.getFactory().contextData.serno;
      }
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtchgdetail/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata);
            _this.baseFormdata.lmtSerno = serno;
          });
        }
      });
    },
    onPrint () {
      var _this = this;
      var params = _this.baseFormdata;// 模板工厂中的参数传递
      if (params.lmtSerno == null || params.lmtSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxbgsqsdy';
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
    }
  }
};
</script>
