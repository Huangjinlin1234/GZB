<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户代码" ctype="input" placeholder="客户代码" name="cusId" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="财务报表信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="报表类型" ctype="select" data-code="STD_ZB_FNC_TYP" placeholder="报表类型" name="fncType"></yu-xform-item>
            <yu-xform-item label="报表周期类型" ctype="select" data-code="STD_ZB_FNC_STAT" placeholder="报表周期类型" name="statPrdStyle"></yu-xform-item>
            <yu-xform-item label="报表年份" ctype="input" placeholder="报表年份" name="fncYear"></yu-xform-item>
            <yu-xform-item label="报表期间" ctype="input" placeholder="报表期间" name="statPrd"></yu-xform-item>
            <yu-xform-item label="报表口径" ctype="select" rules="required" data-code="STD_ZB_FNC_STYLE" placeholder="报表口径" name="statStyle"></yu-xform-item>
            <yu-xform-item label="是否经过审计" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否经过审计" name="statIsAudit"></yu-xform-item>
            <yu-xform-item label="是否经过调整 " ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否经过调整 " name="statIsAdjt"></yu-xform-item>
            <yu-xform-item label="状态" ctype="input" placeholder="状态" name="stateFlg" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否新报表 std_zb_yes" ctype="input" placeholder="是否新报表 std_zb_yes" name="statIsNrpt" disabled hidden></yu-xform-item>
            <yu-xform-item label="资产样式编号" ctype="input" placeholder="资产样式编号" name="statBsStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="损益表编号" ctype="input" placeholder="损益表编号" name="statPlStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="现金流量表编号" ctype="input" placeholder="现金流量表编号" name="statCfStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="财务指标表编号" ctype="input" placeholder="财务指标表编号" name="statFiStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="所有者权益变动表编号" ctype="input" placeholder="所有者权益变动表编号" name="statSoeStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="财务简表编号" ctype="input" placeholder="财务简表编号" name="statSlStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="会计科目余额" ctype="input" placeholder="会计科目余额" name="statAccStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="经济合作社财务收支明细" ctype="input" placeholder="经济合作社财务收支明细" name="statDeStyleId" disabled hidden></yu-xform-item>
            <yu-xform-item label="预留1" ctype="input" placeholder="预留1" name="styleId1" disabled hidden></yu-xform-item>
            <yu-xform-item label="预留2" ctype="input" placeholder="预留2" name="styleId2" disabled hidden></yu-xform-item>
            <yu-xform-item label="审计单位" ctype="input" placeholder="审计单位" name="statAdtEntr" disabled hidden></yu-xform-item>
            <yu-xform-item label="审计结论" ctype="input" placeholder="审计结论" name="statAdtConc" disabled hidden></yu-xform-item>
            <yu-xform-item label="财务报表调整原因" ctype="input" placeholder="财务报表调整原因" name="statAdjRsn" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型 std_zb_opr_" ctype="input" placeholder="操作类型 std_zb_opr_" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="报表录入类型" ctype="select" placeholder="报表录入类型" name="reportType" data-code="STD_ZB_REPORT_TYPE" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/fncstatbase/update',
      addUrl: this.$backend.cmisCus + '/api/fncstatbase/',
      formdata: {},
      formType: 'edit',
      formRules: { fncYear: [{validator: validator.pInt, message: '不是正确的非零正整数', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>