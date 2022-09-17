<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="入池基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="资产池协议编号" ctype="input" name="contNo" disabled placeholder="资产池协议编号"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input"  name="cusId" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input"  name="cusName" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label="资产池授信额度" ctype="yu-num" number-formatter="0,000.00"  name="lmtAmt" disabled placeholder="资产池授信额度"></yu-xform-item>
            <yu-xform-item label="使用额度" ctype="yu-num" number-formatter="0,000.00" name="outstndAmt" disabled placeholder="使用额度"></yu-xform-item>
            <yu-xform-item label="资产池生效日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" placeholder="资产池生效日期"></yu-xform-item>
            <yu-xform-item label="资产池到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" placeholder="资产池到期日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    <yu-form-buttons align="center">
      <yu-button @click="back" type="primary">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_IR_ADJUST_TYPE,STD_LPR_RATE_INTVALdisabled');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      formIsDisabled: false,
      formdata: {},
      formType: 'edit'
    };
  },

  mounted () {
    let _this = this;
    let jsoPar = {};
    if (this.getFactory().contextData.instanceInfo) {
      jsoPar = this.getFactory().contextData.instanceInfo.param;
    } else if (_this.$route.meta.params) {
      jsoPar = _this.$route.meta.params;
    } else {
      jsoPar = this.getFactory().contextData;
    }
    let serno = jsoPar.serno;
    if (jsoPar.op == 'VIEW') {
      _this.formIsDisabled = true;
    }
    if (jsoPar.op == 'VIEW') {
      _this.formIsDisabled = true;
    }
    _this.ininForm(serno);
  },

  methods: {
    // 初始化表单
    ininForm: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/aspliopool/queryaspliopoolbyparams',
        data: {serno: serno},
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

    // 返回
    back: function () {
       yufp.router.removeTab(this.$route.path);
    },
  }
};
</script>