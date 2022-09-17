<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType"  v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" name="surveySerno" hidden placeholder="调查流水号" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="贷款申请信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" placeholder="证件类型"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="phone"></yu-xform-item>
            <yu-xform-item label="工作" ctype="input" placeholder="工作" name="work"></yu-xform-item>
            <yu-xform-item label="申请金额" ctype="input" placeholder="申请金额" name="appAmt"></yu-xform-item>
            <yu-xform-item label="申请渠道" ctype="select" placeholder="申请渠道" name="appChnl" data-code="STD_APP_CHNL"></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="select" name="belgLine" hidden data-code="STD_ZB_BIZ_BELG" placeholder="所属条线"></yu-xform-item>
            <yu-xform-item label="贷款类别" ctype="input" placeholder="贷款类别" name="loanType"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="select" placeholder="贷款用途" name="loanPurp" data-code="STD_MAJOR_LOAN_PURP" ></yu-xform-item>

          </yu-xform-group>
        </yu-panel>
        <yu-panel title="分配的客户经理及所属片区信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户经理编码" ctype="input" placeholder="客户经理编码" name="managerId"></yu-xform-item>
            <yu-xform-item label="客户经理名称" ctype="input" placeholder="客户经理名称" name="managerName"></yu-xform-item>
            <yu-xform-item label="进件时间" ctype="input" placeholder="进件时间" name="intoTime" hidden></yu-xform-item>
            <yu-xform-item label="业务状态" ctype="select" name="divisStatus" hidden data-code="DIVIS_STATUS" placeholder="业务状态"></yu-xform-item>
            <yu-xform-item label="分配时间" ctype="input" placeholder="分配时间" name="divisTime" hidden></yu-xform-item>
            <yu-xform-item label="处理人" ctype="input" placeholder="处理人" name="prcId" hidden></yu-xform-item>
            <yu-xform-item label="营销人" ctype="input" placeholder="营销人" name="marId" disabled hidden></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="客户经理片区" ctype="input" placeholder="客户经理片区" name="managerArea"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP,STD_ZB_LOAN_USE,APP_CHNL,STD_APP_CHNL,STD_MAJOR_LOAN_PURP');
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveytaskdivis/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveytaskdivis/',
      formdata: {},
      // formType: 'details',
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.certType = this.$xutils.getDefaultformulaData('100');
    }
  }
};
</script>