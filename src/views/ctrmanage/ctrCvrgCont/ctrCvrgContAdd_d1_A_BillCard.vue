<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="主合同信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" data-code="STD_ZB_CONT_TYPE" placeholder="合同类型" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" name="cusId" placeholder="客户编号" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" :colspan="24" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" :colspan="12" disabled @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
            <yu-xform-item label="保函类型" ctype="select" placeholder="保函类型" name="guarantType"  disabled data-code="STD_ZB_LOG_TYPE" :colspan="12"></yu-xform-item>
            <yu-xform-item label="保函种类" ctype="input" placeholder="保函种类" name="guarantMode" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_ASSURE_MEANS"  disabled placeholder="担保方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="input" placeholder="合同币种" name="curType"  disabled data-code="STD_ZB_CUR_TYPE" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt"  disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="yu-num" name="exchangeRate" placeholder="汇率"  disabled :colspan="12" sign="%" :multiple="100" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="input" placeholder="折算人民币金额" name="cvtCnyAmt" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="input" placeholder="本合同项下最高可用信金额"  disabled name="contHighAvlAmt" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="input" placeholder="合同起始日" name="startDate" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="input" placeholder="合同到期日" name="endDate" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" value-format="yyyy-MM-dd" rules="required" placeholder="纸质合同签订日期" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.paperContSignDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    },
    show() {
      this.isShow = true;
    },
    hideNow() {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
