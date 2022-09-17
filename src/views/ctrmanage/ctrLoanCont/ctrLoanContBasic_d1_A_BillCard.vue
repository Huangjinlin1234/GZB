<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_ZB_CONT_TYPE1" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="合同币种"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" rules="required" placeholder="合同金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="汇率" ctype="input" name="contRate" rules="required" disabled placeholder="汇率"></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="yu-currency" name="cvtCnyAmt" rules="required" disabled placeholder="折算人民币金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-currency" name="contHighAvlAmt" rules="required" placeholder="本合同项下最高可用信金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日"></yu-xform-item>
            <yu-xform-item label="贸易合同号" ctype="input" placeholder="贸易合同号" name="tcontNo" rules="required"></yu-xform-item>
            <yu-xform-item label="溢装比例" ctype="input" placeholder="溢装比例" name="floodactPerc" rules="required"></yu-xform-item>
            <yu-xform-item label="货物名称" ctype="input" placeholder="货物名称" name="goodsName"></yu-xform-item>
            <yu-xform-item label="受益人名称" ctype="input" placeholder="受益人名称" name="beneficiarName" rules="required"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" name="bailPerc" rules="required" placeholder="保证金比例" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="手续费率（‰）" ctype="yu-num" name="chrgRate" rules="required" placeholder="手续费率（‰）" sign="‰" :multiple="1000" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>