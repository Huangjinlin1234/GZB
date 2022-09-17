<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" disabled="true">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>            <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="签发类型" ctype="select" name="signissueType" rules="required" disabled placeholder="签发类型" data-code="STD_SIGNISSUE_TYPE"></yu-xform-item>
            <yu-xform-item label="是否电子票据" ctype="select" name="isEDraft" data-code="STD_ZB_YES_NO" placeholder="是否电子票据" rules="required"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息" :hideFilter="false" :collapseHide="false">
          <div v-show="formdata.guarMode == '40'||formdata.guarMode == '21'||formdata.guarMode == '60'">
            <div id="heartMsg"><yu-col :offset="3">温馨提示：该合同金额为敞口金额!</yu-col></div>
          </div>
          <yu-xform-group :column="2">
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" disabled placeholder="合同币种" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="" name="contAmt" rules="required" placeholder="合同金额"></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="" name="contHighAvlAmt" rules="required" placeholder="本合同项下最高可用信金额"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" value-format="yyyy-MM-dd" placeholder="纸质合同签订日期"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" sign="%" :multiple="100" placeholder="保证金比例" name="bailPerc" rules="required"></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="yu-num" number-formatter="0,000.00" placeholder="保证金金额" name="bailAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="手续费率（‰）" ctype="yu-num" sign="‰" :multiple="1000" placeholder="手续费率（‰）" name="chrgRate" rules="required"></yu-xform-item>
            <yu-xform-item label="手续费金额" ctype="yu-num" number-formatter="0,000.00" placeholder="手续费金额" name="chrgAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_SIGNISSUE_TYPE,STD_ZB_YES_NO,STD_PRD_TYPE_PROP');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
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
      formRules: { },
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false
    };
  },
  methods: {
    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.prdCode = this.formdata.prdId;
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
