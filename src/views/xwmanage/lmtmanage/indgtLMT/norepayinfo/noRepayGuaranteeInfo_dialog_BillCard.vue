<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="serno"></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno"></yu-xform-item>
          <yu-xform-item label="云评估编号" ctype="input" placeholder="云评估编号" name="cloudEvalNo"></yu-xform-item>
          <yu-xform-item label="抵押物类型" ctype="select" name="pawnType" data-code="STD_XD_DYW_KIND" placeholder="抵押物类型"></yu-xform-item>
          <yu-xform-item label="所有权人" ctype="input" placeholder="所有权人" name="owner"></yu-xform-item>
          <yu-xform-item label="所有权人客户编号" ctype="input" placeholder="所有权人客户编号" name="ownerCusNo"></yu-xform-item>
          <yu-xform-item label="所有权人证件号码" ctype="input" placeholder="所有权人证件号码" name="ownerCertNo"></yu-xform-item>
          <yu-xform-item label="土地性质" ctype="select" name="landCha" data-code="XD_LAND_KIND" placeholder="土地性质"></yu-xform-item>
          <yu-xform-item label="房屋性质" ctype="select" name="houseCha" data-code="STD_ZB_OPT_OWNER" placeholder="房屋性质"></yu-xform-item>
          <yu-xform-item label="地址" ctype="input" placeholder="地址" name="addr"></yu-xform-item>
          <yu-xform-item label="面积" ctype="input" placeholder="面积" name="squ"></yu-xform-item>
          <yu-xform-item label="使用情况" ctype="select" name="utilCase" data-code="STD_ZB_OPT_OWNER" placeholder="使用情况"></yu-xform-item>
          <yu-xform-item label="评估金额" ctype="input" placeholder="评估金额" name="evalAmt"></yu-xform-item>
          <yu-xform-item label="一低金额" ctype="input" placeholder="一低金额" name="firstPldAmt"></yu-xform-item>
          <yu-xform-item label="一低余额" ctype="input" placeholder="一低余额" name="firstPldBal"></yu-xform-item>
          <yu-xform-item label="该抵押物项下贷款总金额" ctype="input" placeholder="该抵押物项下贷款总金额" name="pawnLoanTotlAmt"></yu-xform-item>
          <yu-xform-item label="抵质押率" ctype="input" placeholder="抵质押率" name="pldimnRate"></yu-xform-item>
          <yu-xform-item label="是否一级学区房" ctype="input" placeholder="是否一级学区房" name="isLevel1Sdr"></yu-xform-item>
          <yu-xform-item label="学区房地址" ctype="input" placeholder="学区房地址" name="sdrAddr"></yu-xform-item>
          <yu-xform-item label="学区房名称" ctype="input" placeholder="学区房名称" name="sdrName"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/',
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