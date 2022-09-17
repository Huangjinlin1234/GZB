<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="isDetails" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="借款人贷款申请" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="身份证件号码" ctype="input" placeholder="身份证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="电话号码" ctype="input" placeholder="电话号码" name="phone" rules="required"></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="input" placeholder="婚姻状况" name="marStatus" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶证件号码" ctype="input" placeholder="配偶证件号码" name="spouseCertCode" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone" disabled hidden></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="haveChildren" disabled hidden></yu-xform-item>
            <yu-xform-item label="学历" ctype="input" placeholder="学历" name="edu" disabled hidden></yu-xform-item>
            <yu-xform-item label="居住年限" ctype="input" placeholder="居住年限" name="resiYears" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否线上抵押" ctype="input" placeholder="是否线上抵押" name="isOnlinePld" disabled hidden></yu-xform-item>
             <yu-xform-item label="居住地址" ctype="textarea" placeholder="居住地址" name="livingAddr" rules="required" :colspan="24"></yu-xform-item>
             <yu-xform-item label="产品名称" ctype="input" placeholder="电话号码" name="prdName" rules="required" disabled></yu-xform-item>
           <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled></yu-xform-item>

          </yu-xform-group>
        </yu-panel>
        <yu-panel title="办理建议" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="模型建议金额(元)" ctype="input" placeholder="模型建议金额(元)" name="modelAdviceAmt" disabled></yu-xform-item>
            <yu-xform-item label="模型建议利率" ctype="input" placeholder="模型建议利率" name="modelAdviceRate" disabled></yu-xform-item>
            <yu-xform-item label="参考利率(%)" ctype="yu-interest-rate" sign="%" multiple="100" placeholder="参考利率(%)" name="refRate" hidden disabled></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="Button1" @click="customClick('calculate')" label-width="1"  v-if="lookPage" hidden>测算</yu-xform-item>
            <yu-xform-item label="建议金额(元)" ctype="yu-num" name="adviceAmt" rules="required" placeholder="建议金额(元)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="yu-interest-rate" sign="%" multiple="100" placeholder="建议利率" name="adviceRate" rules="required"></yu-xform-item>
            <yu-xform-item label="建议期限(月)" ctype="yu-num" name="adviceTerm" placeholder="建议期限(月)" :precision="0" :min="0" ></yu-xform-item>
            <!-- 还款方式 data-code="STD_REPAY_MODE" -->
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" placeholder="还款方式" :options="options"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="input" placeholder="贷款用途" name="loanPurp" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否新员工" ctype="input" placeholder="是否新员工" name="isNewEmployee" disabled hidden></yu-xform-item>
            <yu-xform-item label="新员工名称" ctype="input" placeholder="新员工名称" name="newEmployeeName" disabled hidden></yu-xform-item>
            <yu-xform-item label="新员工电话" ctype="input" placeholder="新员工电话" name="newEmployeePhone" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="工作单位" ctype="input" placeholder="工作单位" name="workUnit" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="营销人工号" ctype="input" placeholder="营销人工号" name="marketingId" disabled hidden></yu-xform-item>
            <yu-xform-item label="cert_type" ctype="input" placeholder="cert_type" name="certType" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否农户" ctype="input" placeholder="是否农户" name="isAgri" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')"  v-if="lookPage">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      options: [
        {key: 'A001', value: '按期付息到期还本'},
        {key: 'A002', value: '等额本息'}
      ],
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/',
      formdata: {},
      isDetails: true,
      formRules: { },
      imageUrls: {},
      File: {},
      lookPage: false
    };
  },
  methods: {

  }
};
</script>