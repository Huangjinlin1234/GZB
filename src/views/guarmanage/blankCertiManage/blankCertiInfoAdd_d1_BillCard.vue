<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="serno" ctype="input" v-if="formType == 'EDIT'"  disabled></yu-xform-item>
          <yu-xform-item label="申请类型" name="appType" ctype="select"   data-code="STD_ZB_CERTI_APP_TYPE" v-if="formType == 'EDIT'" disabled></yu-xform-item>
          <yu-xform-item label="凭证编号" name="certiNo" ctype="input" rules="required" :disabled="certiNoDisabled"></yu-xform-item>
          <yu-xform-item label="修改后凭证编号" name="modifiedCertiNo" ctype="input" rules="required" v-if="(formType == 'EDIT')&& formdata.appType == '01'"></yu-xform-item>
          <yu-xform-item :label="optReasonLabel" name="optReason" ctype="textarea" rules="required" :autosize="{ minRows: 3}" colspan="24" v-if="formType == 'EDIT'"></yu-xform-item>
          <yu-xform-item label="凭证状态" name="certiStatus" ctype="select" rules="required" data-code="STD_ZB_CERTI_STATUS" disabled></yu-xform-item>
          <yu-xform-item label="登记人员" name="inputId" ctype="input"  rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记人员" name="inputIdName" ctype="input"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
       <yu-button v-if="formType == 'ADD'" icon="check" type="primary"   @click="saveFn">保存</yu-button>
       <yu-button v-if="formType == 'EDIT'" icon="check" type="primary" @click="commitFn">提交</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
   <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_CERTI_APP_TYPE,STD_ZB_CERTI_STATUS');
export default{
  components: { yufpNwfInit },
  name: 'D1BillCard',
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
      optReasonLabel: ''
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
    this.formType = this.$parent.pageParams.type;
    if (this.formType == 'EDIT' || this.formType == 'VIEW') {
      this.certiNoDisabled = true;
      if (this.$parent.pageParams.appType == '01') {
        this.optReasonLabel = '修改原因';
      } else if (this.$parent.pageParams.appType == '02') {
        this.optReasonLabel = '作废原因';
      }
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      if (this.formType == 'ADD') {
        this.formdata.certiStatus = '01';// 未使用
        this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
        this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
        this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      } else if (this.formType == 'EDIT') {
        if (!(this.formdata.hasOwnProperty('serno') && this.formdata.serno != '' && this.formdata.serno != null)) {
          this.formdata.serno = this.$xutils.getSEQWithParamFromServer('SERNO');
        }
        this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      }
    },
    /**
     * 保存
     */
    saveFn: function () {
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
      var certiNo = model.certiNo;
      // 判断凭证编号是否重复已存在
      const checkcertinoisexist = _this.checkcertinoisexist(certiNo);
      if (checkcertinoisexist) {
        _this.saveInfo(model);
      }
    },
    // 判断凭证编号是否重复已存
    checkcertinoisexist (certiNo) {
      var _this = this;
      let returnData = false;
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
            returnData = true;
          } else {
            _this.$message({
              message: response.data,
              type: 'warning'
            });
          }
        }
      });
      return returnData;
    },

    // 校验该凭证编号是否被在途的权证入库所引用
    checkcertinoisused (certiNo) {
      var _this = this;
      let returnData = false;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: this.$backend.cmisBiz + '/api/blankcertiinfo/checkcertinoisused',
        data: {
          condition: JSON.stringify({
            certiNo: certiNo
          })
        },
        callback: function (code, message, response) {
          if (response.code == '0' && (response.data == null || response.data == '')) {
            returnData = true;
          } else {
            _this.$message({
              message: response.data,
              type: 'warning'
            });
          }
        }
      });
      return returnData;
    },


    // 保存
    saveInfo (data) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: this.$backend.cmisBiz + '/api/blankcertiinfo/',
        data: data,
        callback: function (code, message, response) {
          _this.$message('操作成功！');
          _this.$dialog.closeAll();
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
      const checkcertinoisexist = _this.checkcertinoisexist(model.modifiedCertiNo);
      // 校验该凭证编号是否被在途的权证入库所引用
      const checkcertinoisused = _this.checkcertinoisused(model.modifiedCertiNo);
      if (checkcertinoisexist && checkcertinoisused) {
        // 更新空白登记信息
        model.updId = _this.userId;
        model.updBrId = _this.orgCode;
        _this.updateBlankCertiInfo(model);
        _this.saveBlankCertiModifyApp(model);
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
      }
    },
    // 更新空白凭证登记操作类型
    updateBlankCertiInfo (data) {
      yufp.service.request({
        method: 'POST',
        async: false,
        url: this.$backend.cmisBiz + '/api/blankcertiinfo/update',
        data: data,
        callback: function (code, message, response) {
        }
      });
    },
    // 新增空白凭证变更申请
    saveBlankCertiModifyApp (data) {
      data.approveStatus = '000';
      yufp.service.request({
        method: 'POST',
        async: false,
        url: this.$backend.cmisBiz + '/api/blankcertimodifyapp/tempsave',
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
    },
    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.$dialog.closeAll();
    }
  }
};
</script>
