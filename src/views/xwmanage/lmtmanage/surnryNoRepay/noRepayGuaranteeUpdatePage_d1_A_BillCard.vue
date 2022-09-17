<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="抵押信息录入">
          <yu-xform-group :column="3">
            <yu-xform-item label="抵押物类型" ctype="select" name="pawnType" rules="required" data-code="STD_XD_DYW_KIND" placeholder="抵押物类型"></yu-xform-item>
            <yu-xform-item label="云评估编号" ctype="yu-xguare-clost" name="cloudEvalNo" placeholder="云评估编号" @select-fn="commonSelectFn" :mapping="{ pkId: 'cloudEvalNo' }" width="720" height="480"></yu-xform-item>
            <yu-xform-item label="所有权人客户编号" ctype="input" placeholder="所有权人客户编号" name="ownerCusNo" disabled></yu-xform-item>
            <yu-xform-item label="所有权人" ctype="yu-xcustom" name="owner" rules="required" placeholder="所有权人" @select-fn="commonSelectFn" :mapping="{ cusName: 'owner', certCode: 'ownerCusNo' }" width="720" height="480"></yu-xform-item>
            <yu-xform-item label="所有权人证件号码" ctype="input" placeholder="所有权人证件号码" name="ownerCertNo" rules="required"></yu-xform-item>
            <yu-xform-item label="土地性质" ctype="select" name="landCha" rules="required" data-code="XD_LAND_KIND" placeholder="土地性质"></yu-xform-item>
            <yu-xform-item label="房屋性质" ctype="select" name="houseCha" rules="required" data-code="STD_ZB_OPT_OWNER" placeholder="房屋性质"></yu-xform-item>
            <yu-xform-item label="地址" ctype="yu-xdic-tree-addr" name="addrName" rules="required" placeholder="地址" @select-fn="commonSelectFn" :mapping="{ cnName: 'addrName', enName: 'addr' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="面积（m2）" ctype="yu-num" name="squ" rules="required" placeholder="面积（m2）" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="使用情况" ctype="select" name="utilCase" rules="required" data-code="STD_ZB_OPT_OWNER" placeholder="使用情况"></yu-xform-item>
            <yu-xform-item label="评估金额" ctype="" name="evalAmt" rules="required" placeholder="评估金额"></yu-xform-item>
            <yu-xform-item label="一抵金额" ctype="yu-num" name="firstPldAmt" rules="required" placeholder="一抵金额" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="一抵余额" ctype="input" placeholder="一抵余额" name="firstPldBal" rules="required"></yu-xform-item>
            <yu-xform-item label="该抵押物项下贷款总金额" ctype="" name="pawnLoanTotlAmt" rules="required" placeholder="该抵押物项下贷款总金额"></yu-xform-item>
            <yu-xform-item label="抵质押率" ctype="" name="pldimnRate" disabled placeholder="抵质押率"></yu-xform-item>
            <yu-xform-item label="是否一级学区房" ctype="select" name="isLevel1Sdr" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否一级学区房"></yu-xform-item>
            <yu-xform-item label="学区房地址" ctype="input" placeholder="学区房地址" name="sdrAddr" hidden></yu-xform-item>
            <yu-xform-item label="学区房名称" ctype="input" placeholder="学区房名称" name="sdrName"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
            <yu-xform-item label="学区房地址" ctype="input" placeholder="学区房地址" name="sdrAddrName"></yu-xform-item>
            <yu-xform-item label="地址EN" ctype="input" placeholder="地址EN" name="addr" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { ownerCertNo: [{ validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur' }], evalAmt: [{ validator: validator.number, message: '不是正确的数字', trigger: 'blur' }], firstPldAmt: [{ validator: validator.number, message: '不是正确的数字', trigger: 'blur' }], firstPldBal: [{ validator: validator.number, message: '不是正确的数字', trigger: 'blur' }], pldimnRate: [{ validator: validator.digit, message: '不是正确的小数', trigger: 'blur' }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>
