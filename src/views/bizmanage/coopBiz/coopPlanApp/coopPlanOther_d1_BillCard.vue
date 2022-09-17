<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" name="partnerType" rules="required" disabled data-code="STD_PARTNER_TYPE" placeholder="合作方类型" :colspan="10"></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" :colspan="10"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="统一社会信用代码" ctype="input" placeholder="统一社会信用代码" name="unifyCreditCode" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="企业性质" ctype="select" name="corpCha" rules="required" data-code="STD_ZB_CORP_QLTY" placeholder="企业性质" :colspan="10"></yu-xform-item>
            <yu-xform-item label="成立日期" ctype="datepicker" name="buildDate" value-format="yyyy-MM-dd" rules="required" placeholder="成立日期" :colspan="10"></yu-xform-item>
            <yu-xform-item label="注册资本(元)" ctype="yu-num" number-formatter="0,000.00" name="regiCapAmt" rules="required" placeholder="注册资本" :colspan="10"></yu-xform-item>
            <yu-xform-item label="营业期限（月）" ctype="yu-num" name="bsinsTerm" rules="required" placeholder="营业期限（月）" :colspan="10" :precision="0" :min="1" ></yu-xform-item>
            <yu-xform-item label="经营范围" ctype="input" placeholder="经营范围" name="operRange" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="企业规模" ctype="input" placeholder="企业规模" name="corpScale" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="行业分类" ctype="input" placeholder="行业分类" name="tradeClass" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="法人代表" ctype="input" placeholder="法人代表" name="legal" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="是否集团型客户" ctype="select" name="isGrpCus" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否集团型客户" :colspan="10"></yu-xform-item>
            <yu-xform-item label="负责人" ctype="input" placeholder="负责人" name="chief" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="办公地址" ctype="input" placeholder="办公地址" name="officeAddr" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="input" placeholder="注册地址" name="regiAddr" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="住所" ctype="input" placeholder="住所" name="livingAddr" rules="required" :colspan="10"></yu-xform-item>
            <yu-xform-item label="是否我行关联方" ctype="select" name="isBankCorre" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否我行关联方" :colspan="10"></yu-xform-item>
            <yu-xform-item label="是否我行风险预警客户" ctype="select" name="isBankRiskAltCus" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否我行风险预警客户" :colspan="10"></yu-xform-item>
            <yu-xform-item label="合作类型" ctype="select" name="coopType" rules="required" data-code="STD_COOP_TYPE" placeholder="合作类型" :colspan="10"></yu-xform-item>
            <yu-xform-item label="合作说明" ctype="textarea" name="coopDesc" rules="required" placeholder="合作说明" :colspan="20"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" rules="required" disabled data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" :colspan="10"></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" placeholder="经办日期" name="inputDate" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId" rules="required" disabled :colspan="10"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('saveData')">保存</yu-button>
      <yu-button type="primary" @click="customClick('back')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      formatter: function (money, num) {
        num = num && num > 0 && num <= 20 ? num : 2;
        money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        let l = money.split('.')[0].split('').reverse();
        let r = money.split('.')[1];
        let t = '';
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      }
    };
  },
  methods: {
  }
};
</script>