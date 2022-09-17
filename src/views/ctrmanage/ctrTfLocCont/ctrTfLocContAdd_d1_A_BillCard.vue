<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="主合同信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{ cusId: 'cusId', cusName: 'cusName' }" width="730" height="480"></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled placeholder="产品编号" width="720" height="480"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="合同币种"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" disabled placeholder="合同金额" :min="0"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="yu-num" name="exchgRate" disabled placeholder="汇率" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="yu-currency" name="cvtCnyAmt" disabled placeholder="折算人民币金额" :min="0"></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-currency" name="contHighAvlAmt" disabled placeholder="本合同项下最高可用信金额" :min="0"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="合同起始日"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="合同到期日"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" value-format="yyyy-MM-dd" rules="required" placeholder="纸质合同签订日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false
    };
  },
  methods: {
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
