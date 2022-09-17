<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息" :hideFilter="false" :collapseHide="false">
          <div v-show="formdata.guarMode == '40'||formdata.guarMode == '21'||formdata.guarMode == '60'">
            <div id="heartMsg"><yu-col :offset="3">温馨提示：该合同金额为敞口金额!</yu-col></div>
          </div>
          <yu-xform-group :column="2">
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="合同币种"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" rules="required" placeholder="合同金额" :min="0" disabled></yu-xform-item>
            <yu-xform-item label="汇率" ctype="yu-num" name="exchgRate" rules="required" disabled placeholder="汇率" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="yu-currency" name="cvtCnyAmt" rules="required" disabled placeholder="折算人民币金额" :min="0"></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-currency" name="contHighAvlAmt" rules="required" disabled placeholder="本合同项下最高可用信金额" :min="0"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日"></yu-xform-item>
            <yu-xform-item label="贸易合同号" ctype="input" placeholder="贸易合同号" name="tcontNo" rules="required"></yu-xform-item>
            <yu-xform-item label="溢装比例" ctype="yu-num" placeholder="溢装比例" name="floodactPerc" rules="required" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="货物名称" ctype="input" placeholder="货物名称" name="goodsName"></yu-xform-item>
            <yu-xform-item label="受益人名称" ctype="input" placeholder="受益人名称" name="beneficiarName" rules="required"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" name="bailPerc" rules="required" placeholder="保证金比例" sign="%" :multiple="100" disabled></yu-xform-item>
            <yu-xform-item label="手续费率（‰）" ctype="yu-num" name="chrgRate" rules="required" placeholder="手续费率（‰）" sign="‰" :multiple="1000" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_TYPE,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP');
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
    show () {
      this.isShow = true;
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
