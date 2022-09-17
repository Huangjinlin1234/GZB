<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isDetails">
        <yu-panel title="优惠利率申请" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled v-if="show"></yu-xform-item>
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled></yu-xform-item>
            <yu-xform-item label="是否存量用户 " ctype="select" name="whetherStockUser" rules="required" data-code="STD_ZB_YES_NO" @change="wheChange" placeholder="是否存量用户 "></yu-xform-item>
            <yu-xform-item label="上期贷款方式" ctype="select" name="preLoanMode" rules="required" data-code="STD_PRE_LOAN_MODE" placeholder="上期贷款方式"  v-if="YesOrNo"></yu-xform-item>
            <yu-xform-item label="上期担保方式" ctype="input" placeholder="上期担保方式" name="preGrtMode" v-if="show"></yu-xform-item>
            <yu-xform-item label="上期贷款金额(元)" ctype="yu-num" name="preLoanAmt" rules="required" placeholder="上期贷款金额(元)" :precision="2" :min="0" v-if="YesOrNo"></yu-xform-item>
            <yu-xform-item label="上期执行年利率" ctype="yu-interest-rate" sign="%" multiple="100" name="preExeYearRate" rules="required" placeholder="上期执行年利率" :min="0"  v-if="YesOrNo"></yu-xform-item>
            <yu-xform-item label="上期贷款期限(月)" ctype="input" placeholder="上期贷款期限(月)" name="preLoanTerm" rules="required" v-if="YesOrNo"></yu-xform-item>
            <yu-xform-item label="申请利率" ctype="yu-interest-rate" sign="%" multiple="100" placeholder="申请利率" name="appRate" rules="required"></yu-xform-item>
            <!-- <yu-xform-item label="批复利率" ctype="yu-interest-rate" placeholder="批复利率" name="replyRate" disabled></yu-xform-item> -->
           <yu-xform-item label="客户经理意见" ctype="checkbox"  @change="managerChange" value-type="string" name="managerIdAdvice" rules="required" data-code="STD_MANAGER_ID_ADVICE" placeholder="客户经理意见" :colspan="24"></yu-xform-item>
             <!-- <yu-xform-item label="客户经理意见" ctype="checkbox"  @change="managerChange" value-type="string" name="managerIdAdvice" rules="required" :options="[{key:'1',value:'客户还款记录良好，经营情况良好'},{key:'2',value:'高净值客户'},{key:'4',value:'单笔单议'},{key:'5',value:'他行挖转客户'},{key:'6',value:'客户为关键人'}]" placeholder="客户经理意见" :colspan="24"></yu-xform-item>-->
            <yu-xform-item label="客户经理其他意见" ctype="input" placeholder="客户经理其他意见" name="managerIdOtherAdvice" hidden></yu-xform-item>
            <yu-xform-item label="其他原因" ctype="textarea" name="otherResn" rules="required" placeholder="其他原因" :colspan="24" v-if="otherResnY"></yu-xform-item>
            <yu-xform-item label="其他原因" ctype="textarea" name="otherResn"  placeholder="其他原因" :colspan="24" v-if="!otherResnY"></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
            <yu-xform-item label="审批节点类型" ctype="input" placeholder="审批节点类型" name="approveNodeType" hidden></yu-xform-item>
            <yu-xform-item label="当前审批节点" ctype="input" placeholder="当前审批节点" name="curtApproveNode" hidden></yu-xform-item>
            <yu-xform-item label="当前审批人工号" ctype="input" placeholder="当前审批人工号" name="curtApprIdJobNo" hidden></yu-xform-item>
            <yu-xform-item label="申请时间" ctype="input" placeholder="申请时间" name="appTime" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="saveBtn&&lookPage" @click="customClick('save')" v-norepeat.loading>保存</yu-button>
      <yu-button type="primary" v-if="comitBtn&&lookPage" @click="customClick('submit')">优惠利率提交审批</yu-button>
      <yu-button type="primary" v-if="applyBtn&&lookPage" @click="customClick('revocation')">作废优惠利率申请</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    btnFlag: Boolean
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/',
      formdata: {},
      // formType: 'details',
      formRules: { },
      imageUrls: {},
      File: {},
      saveBtn: true,
      comitBtn: false,
      applyBtn: false,
      lookPage: false,
      YesOrNo: false,
      otherResnY: false,
      isDetails: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      if (this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        this.lookPage = true;
        this.isDetails = false;
      }
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('getCurrTime()');
    },
    wheChange (whetherStockUser) {
      if (whetherStockUser == '1') {
        this.YesOrNo = true;
      } else {
        this.YesOrNo = false;
        this.formdata.preLoanMode = this.formdata.preGrtMode = this.formdata.preLoanAmt = this.formdata.preExeYearRate = this.formdata.preLoanTerm = '';
      }
    },
    managerChange (managerIdAdvice) {
      if (managerIdAdvice == null || managerIdAdvice == '') {
        return;
      }
      let other = managerIdAdvice.split(',');
      if (other.indexOf('06') >= 0) {
        // 必填
        this.otherResnY = true;
      } else {
        // 非必填
        this.otherResnY = false;
      }
    }
  }
};
</script>
