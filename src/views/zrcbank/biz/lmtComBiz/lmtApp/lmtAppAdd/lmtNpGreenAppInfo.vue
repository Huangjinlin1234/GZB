
<template>
  <div>
    <yu-panel title="内评低准入例外审批通道" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="baseForm" label-width="160px" v-model="baseFormdata" >
        <yu-xform-group column="2">
          <yu-xform-item label="业务流水号" ctype="input" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled ></yu-xform-item>
          <yu-xform-item label="申请人" ctype="input" name="inputIdName" disabled ></yu-xform-item>
          <yu-xform-item label="申请人" ctype="input" name="inputId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="申请原因" ctype="textarea" name="applyReason" :disabled="type!='EDIT'" rules="required" colspan="24"></yu-xform-item>
          <yu-xform-item label="申请时间" ctype="datepicker" name="inputDate" disabled ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" disabled data-code="STD_ZB_APPR_STATUS"  ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="tempSave">暂存</yu-button>
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="submitFormFn">保存</yu-button>
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="submit">提交</yu-button>
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  mixins: [mixinForm],
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      type: '',
      baseFormdata: {},
      apprStatus: ''
    };
  },
  mounted () {
    this.initForm();
  },
  methods: {
    initForm: function () {
      var _this = this;
      var serno = '';
      if (_this.$route.meta.params) {
        serno = _this.$route.meta.params.serno;
        _this.type = _this.$route.meta.params.type;
      } else if (_this.bizPageData.instanceInfo) {
        serno = _this.bizPageData.instanceInfo.bizId;
      } else if (_this.pageParams) {
        serno = _this.pageParams.serno;
        _this.type = _this.pageParams.type;
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtnpgreenapp/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.baseFormdata);
            _this.apprStatus = response.data.approveStatus;
          }
        }});
    },
    tempSave: function () {
      var _this = this;
      var obj = _this.baseFormdata;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtnpgreenapp/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '暂存成功'
            });
          }
        }
      });
    },
    submitFormFn: function () {
      var _this = this;
      var obj = _this.baseFormdata;
      var validate = false;
      _this.$refs.baseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtnpgreenapp/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功'
            });
          }
        }
      });
    },
    submit: function () {
      var _this = this;
      var validate = false;
      _this.$refs.baseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var obj = {};
      yufp.clone(_this.baseFormdata, obj);
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtnpgreenapp/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            // 提交流程
            let loginUser = _this.$xutils.getLoginUserInfo();
            var startdto = {};
            startdto.systemId = 'cmis';
            startdto.orgId = loginUser.org.id;
            startdto.userId = loginUser.loginCode;
            startdto.bizType = 'SX032';
            startdto.bizId = _this.baseFormdata.serno;
            startdto.bizUserName = _this.baseFormdata.cusName;
            startdto.bizUserId = _this.baseFormdata.cusId;
            startdto.param = {
              orgType: loginUser.org.orgType
            };
            _this.$refs.yufpNwfInit.wfInit(startdto);
          } else {
            _this.$message('保存失败!');
            return;
          }
        }
      });
    },
    // 返回上一页面
    back: function () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
