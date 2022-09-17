<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="模板编号" ctype="input" name="tempNo" disabled rules="required" placeholder="模板编号"></yu-xform-item>
            <yu-xform-item label="模板名称" ctype="input" name="tempName" rules="required" placeholder="模板名称"></yu-xform-item>
            <yu-xform-item label="适用合同类型" ctype="select" name="suitContType" rules="required" placeholder="适用合同类型" data-code="STD_CONT_TYPE"></yu-xform-item>
            <yu-xform-item label="适用报表全称" ctype="input" name="suitReportName" rules="required" placeholder="适用报表全称"></yu-xform-item>
            <yu-xform-item label="适用产品" ctype="yu-xlmtsub-tree" name="suitPrd" rules="required" placeholder="适用产品" colspan="24" width="720" height="480" :parms="{limitStrNo:'01'}" @select-fn="commonSelectFn" :show-text="false" :mapping="{'label':'suitPrd'}"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="合同版面标识" ctype="select" name="contPageType" rules="required" placeholder="合同版面标识" data-code="STD_CONT_PAGE_TYPE"></yu-xform-item>
            <yu-xform-item label="版本描述" ctype="input" name="verDec" rules="required" placeholder="版本描述"></yu-xform-item>
            <yu-xform-item label="发布日期" ctype="datepicker" name="releaseDate" value-format="yyyy-MM-dd" rules="required" placeholder="发布日期"></yu-xform-item>
            <yu-xform-item label="模板状态" ctype="select" name="mubanStatus"  rules="required" placeholder="模板状态" data-code="STD_MUBAN_STATUS"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="" placeholder="备注" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="登记人" name="updId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="登记机构" name="updBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="最后修改时间" ctype="datepicker" placeholder="登记日期" name="updDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    <yu-form-buttons align="center">
      <yu-button @click="save" v-show="isButtonHidden">保存</yu-button>
      <yu-button @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_TYPE,STD_ZB_YES_NO,STD_CONT_PAGE_TYPE,STD_MUBAN_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      formIsDisabled: false,
      isButtonHidden: true,
      formdata: {},
      checkValue: true,
      checkMsg: '',
      formType: 'edit'
    };
  },

  mounted () {
    var _this = this;
    let jsoPar = _this.$route.meta.params.data;
    var tempNo = jsoPar.tempNo;
    if (_this.$route.meta.params.op == 'VIEW') {
      _this.formIsDisabled = true;
      _this.isButtonHidden = false;
    }
    _this.ininForm(tempNo);
  },

  methods: {
    // 初始化表单
    ininForm: function (tempNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgctrcontprinttemp/querycfgctrcontprinttempdatabyparams',
        data: {tempNo: tempNo},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.formdata);
          } else {
            return;
          }
        }
      });
    },

    // // 校验协议到期日
    // endDateBlur (value) {
    //   var _this = this;
    //   if (_this.formdata.endDate > _this.formdata.lmtEndDate) {
    //     _this.$xutils.showMsgBox('提示', '校验协议到期日不得超过批复额度有效期', 350, 150);
    //     _this.formdata.endDate = '';
    //     _this.checkValue = false;
    //     _this.checkMsg = '校验协议到期日不得超过批复额度有效期';
    //     return;
    //   }
    //   if (_this.formdata.endDate < _this.formdata.startDate) {
    //     _this.$xutils.showMsgBox('提示', '协议到期日不得小于协议起始日', 350, 150);
    //     _this.formdata.endDate = '';
    //     _this.checkValue = false;
    //     _this.checkMsg = '协议到期日不得小于协议起始日';
    //     return;
    //   }
    //   _this.checkValue = true;
    // },

    // 保存
    save () {
      var _this = this;
      let jsoPar = _this.formdata;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.checkValue == false) {
        _this.$xutils.showMsgBox('提示', _this.checkMsg, 350, 150);
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgctrcontprinttemp/commonsavecfgctrcontprinttempinfo',
        data: JSON.stringify(jsoPar),
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$xutils.showMsgBox('提示', '保存成功', 350, 150);
            _this.back();
          } else {
            _this.$xutils.showMsgBox('提示', '保存失败', 350, 150);
            return;
          }
        }
      });
    },

    // 返回
    back: function () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>