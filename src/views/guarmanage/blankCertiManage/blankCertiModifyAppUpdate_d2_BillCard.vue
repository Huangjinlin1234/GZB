<template>
  <div id="d2_BillCard">
    <div id="d2_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="申请类型" name="appType" ctype="select"   data-code="STD_ZB_CERTI_APP_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="凭证编号" name="certiNo" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="修改后凭证编号" name="modifiedCertiNo" ctype="input" rules="required" :hidden="formdata.appType != '01'" :disabled="certiNoDisabled"></yu-xform-item>
          <yu-xform-item :label="optReasonLabel" name="optReason" ctype="textarea" rules="required" :autosize="{ minRows: 3}" colspan="24" :disabled="certiNoDisabled"></yu-xform-item>
          <yu-xform-item label="登记人员" name="inputId" ctype="input"  rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记人员" name="inputIdName" ctype="input"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" disabled></yu-xform-item>
      </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
       <yu-button v-if="formType == 'EDIT'" icon="check" type="primary" @click="commitFn">提交</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="cancelFn" :hidden="cancelIsHidden">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_CERTI_APP_TYPE');
export default{
  components: { yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String,
    params: Object
  },
  name: 'D2BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      addUrl: this.$backend.cmisBiz + '/api/guarwarrantinapp/',
      formdata: {},
      formType: 'ADD',
      formRules: {},
      imageUrls: {},
      File: {},
      certiNoDisabled: false,
      optReasonLabel: '',
      cancelIsHidden: false
    };
  },
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  created () {
    if (typeof this.$parent.pageParams != 'undefined') {
      this.formType = this.$parent.pageParams.type;
      if (this.$parent.pageParams.type == 'EDIT') {
        this.certiNoDisabled = false;
      } else if (this.$parent.pageParams.type == 'VIEW') {
        this.certiNoDisabled = true;
      }
      if (this.$parent.pageParams.appType == '01') {
        this.optReasonLabel = '修改原因';
      } else if (this.$parent.pageParams.appType == '02') {
        this.optReasonLabel = '作废原因';
      }
    }
  },
  mounted () {
  },
  methods: {
    // 判断凭证编号是否重复已存
    checkcertinoisexist (certiNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: this.$backend.cmisBiz + '/api/blankcertiinfo/checkcertinoisexist',
        data: {
          condition: JSON.stringify({
            certiNo: certiNo
          })
        },
        callback: function (code, message, response) {
          if (response.code == '0' && (response.data == null || response.data == '')) {
            return true;
          } else {
            _this.$message({
              message: response.data,
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    // 提交
    commitFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 判断修改后凭证不能与现有凭证登记簿中重复
      _this.checkcertinoisexist(model.modifiedCertiNo);
      _this.updateBlankCertiInfo(model);
      // 调用流程
      // todo 调用流程
      // eslint-disable-next-line no-inner-declarations
      var cusId = _this.formdata.inputId;
      // eslint-disable-next-line no-inner-declarations
      var cusName = _this.formdata.inputIdName;
      let wfInitData = {};
      wfInitData.systemId = 'cmis';
      wfInitData.orgId = this.org.code;
      wfInitData.userId = this.userCode;
      wfInitData.bizId = model.serno;
      wfInitData.bizType = this.getWfNo(model.appType);
      wfInitData.bizUserName = cusName;
      wfInitData.bizUserId = cusId;
      this.$refs.yufpNwfInit.wfInit(wfInitData);
    },
    // 更新凭变更操作类型
    updateBlankCertiInfo (data) {
      yufp.service.request({
        method: 'POST',
        async: false,
        url: this.$backend.cmisBiz + '/api/blankcertimodifyapp/update',
        data: data,
        callback: function (code, message, response) {

        }
      });
    },
    // 返回
    cancelFn () {
      this.$dialog.closeAll();
    },
    // 获取流程编号
    getWfNo (appType) {
      if (appType == '01') {
        return 'XT003';
      } else if (appType == '02') {
        return 'XT004';
      }
    }
  }
};
</script>
