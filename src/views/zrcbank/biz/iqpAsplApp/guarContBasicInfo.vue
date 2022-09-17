<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="借款人客户编号" ctype="input" name="cusId" disabled placeholder="借款人客户编号"></yu-xform-item>
            <yu-xform-item label="借款人名称" ctype="input" name="cusName" disabled placeholder="借款人名称"></yu-xform-item>
            <yu-xform-item label="担保合同编号" ctype="input" name="guarContNo" disabled placeholder="担保合同编号"></yu-xform-item>
            <yu-xform-item label="担保合同类型" ctype="select" name="guarContType" disabled placeholder="担保合同类型" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="担保币种" ctype="select" name="curType" disabled placeholder="担保币种" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
            <yu-xform-item label="担保合同金额" ctype="yu-num" number-formatter="0,000.00" name="guarAmt" disabled placeholder="担保合同金额"></yu-xform-item>
            <yu-xform-item label="担保起始日" ctype="datepicker" name="guarStartDate" value-format="yyyy-MM-dd" rules="required" placeholder="担保起始日"></yu-xform-item>
            <yu-xform-item label="担保终止日" ctype="datepicker" name="guarEndDate" value-format="yyyy-MM-dd" rules="required" placeholder="担保终止日"></yu-xform-item>
            <yu-xform-item label="签订日期" ctype="datepicker" name="signDate" value-format="yyyy-MM-dd" rules="required" placeholder="签订日期"></yu-xform-item>
            <yu-xform-item label="担保合同状态" ctype="select" name="guarContState" rules="required" placeholder="担保合同状态" data-code="STD_GUAR_CONT_STATE"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人编号" ctype="input" placeholder="登记人编号" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构编号" ctype="input" placeholder="登记机构编号" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    <yu-form-buttons align="center">
      <yu-button @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_GUAR_CONT_STATE,STD_ZB_GUAR_CONT_TYPE');
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
    var _this = this;
    let jsoPar = _this.getFactory().contextData;
    var guarContNo = jsoPar.guarContNo;
    if (jsoPar.op == 'VIEW') {
      _this.formIsDisabled = true;
    }
    _this.ininForm(guarContNo);
  },

  methods: {
    // 初始化表单
    ininForm: function (guarContNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/grtguarcont/selectByGuarContNo',
        data: guarContNo,
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
      this.getFactory().back();
    }
  }
};
</script>