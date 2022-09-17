<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" name="contType" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" placeholder="产品属性类型" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled></yu-xform-item>
          <yu-xform-item label="签发类型" ctype="select" name="signissueType" placeholder="签发类型" data-code="STD_SIGNISSUE_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="合同币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" disabled></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" placeholder="合同金额" :min="0" disabled></yu-xform-item>
          <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-currency" name="contHighAvlAmt" placeholder="本合同项下最高可用信金额" :min="0" disabled></yu-xform-item>
          <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="合同起始日"></yu-xform-item>
          <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="合同到期日"></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" value-format="yyyy-MM-dd" rules="required" placeholder="纸质合同签订日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_SIGNISSUE_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctraccpcont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctraccpcont/',
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
    // 展示小助手
    show () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
