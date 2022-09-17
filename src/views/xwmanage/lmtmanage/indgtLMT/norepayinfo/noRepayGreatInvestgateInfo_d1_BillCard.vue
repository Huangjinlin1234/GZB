<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="isDetails" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="调查结论">
          <yu-row>
            <yu-col :span="12">
              <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled rules="required"></yu-xform-item>
            </yu-col>
          </yu-row>
          <yu-xform-group :column="2">
            <yu-xform-item label="贷款金额（元）" ctype="input" placeholder="贷款金额（元）" name="loanAmt" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="建议金额" ctype="input" placeholder="建议金额" name="adviceAmt"></yu-xform-item>
            <yu-xform-item label="原借据金额（元）" ctype="input" placeholder="原借据金额（元）" name="oldBillAmt" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="原借据余额（元）" ctype="input" placeholder="原借据余额（元）" name="oldBillBalance" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="原利率（年）" ctype="yu-num" sign="%" :multiple="100" placeholder="原利率（年）" name="oldBillLoanRate" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="yu-num" sign="%" :multiple="100" placeholder="建议利率" name="adviceRate" rules="required"></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="input" placeholder="参考利率" name="refRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款期限" ctype="input" placeholder="贷款期限" name="loanTerm" rules="required"></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" data-code="STD_REPAY_MODE" placeholder="还款方式"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="是否原抵押物" ctype="input" placeholder="是否原抵押物" name="isOldColl" disabled hidden></yu-xform-item>
            <yu-xform-item label="周转额度" ctype="input" placeholder="周转额度" name="turnovLmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="新增额度" ctype="input" placeholder="新增额度" name="newAddLmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否存在协办客户经理" ctype="input" placeholder="是否存在协办客户经理" name="isAssManagerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户是否实际经营人" ctype="input" placeholder="客户是否实际经营人" name="cusIsRealOperPer" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户经营是否正常" ctype="input" placeholder="客户经营是否正常" name="cusOperIsNormal" disabled hidden></yu-xform-item>
            <yu-xform-item label="拒绝类型" ctype="input" placeholder="拒绝类型" name="rfuType" disabled hidden></yu-xform-item>
            <yu-xform-item label="办理建议" ctype="input" placeholder="办理建议" name="prcAdvice" disabled hidden></yu-xform-item>
            <yu-xform-item label="情况说明" ctype="input" placeholder="情况说明" name="caseMemo" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型金额" ctype="input" placeholder="模型金额" name="modelAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型利率" ctype="input" placeholder="模型利率" name="modelRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型期限" ctype="input" placeholder="模型期限" name="modelTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="协办客户经理工号" ctype="input" placeholder="协办客户经理工号" name="assManagerIdJobNo" ></yu-xform-item>
            <yu-xform-item label="利率申请原因" ctype="textarea" name="lprReason" rules="required" placeholder="利率申请原因" colspan="24"></yu-xform-item>
            <yu-xform-item label="贷款原因" ctype="textarea" name="loanReason" rules="required" placeholder="贷款原因" colspan="24"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="textarea" name="loanWay" rules="required" placeholder="贷款用途" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户经理" ctype="input" placeholder="客户经理" name="managerIdName" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="客户经理工号" ctype="input" placeholder="客户经理工号" name="managerId" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="客户经理电话" ctype="input" placeholder="客户经理电话" name="mgrPhone" disabled></yu-xform-item>
            <yu-xform-item label="申请时间" ctype="datepicker" placeholder="申请时间" name="createTime" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="更新时间" ctype="datepicker" placeholder="更新时间" name="updateTime" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS" disabled rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')" :hidden="saveButton">保存</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/update',
      // addUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/',
      formdata: {},
      isDetails: true,
      formRules: { },
      imageUrls: {},
      File: {},
      saveButton: true
    };
  },
  mounted () {
    // 默认进来的方法  此处用来处理应该是修改还是查看
    if (this.$route.meta.params == null || this.$route.meta.params.PageType == '01') {
      // 查看逻辑
      this.isDetails = true;
      this.saveButton = true;
    } else {
      // 修改逻辑
      this.isDetails = false;
      this.saveButton = false;
    }
    // let _this = this;
    try {
      // 正常页面进入 审批
      // 走新增tab页签进来的
      this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
    } catch (e) {
      // 走审批模版工厂
      this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
    }
    let approveStatus = this.$route.meta.params.approveStatus;
    this.$request({
      url: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/selectbysurveyserno',
      method: 'POST',
      data: {surveySerno: this.surveySerno}
    }).then(({code, message, data}) => {
      if (data != null) {
        yufp.clone(data, this.formdata);
        this.formdata.approveStatus = approveStatus;
      } else {
        yufp.clone(this.$route.meta.params, this.formdata);
      }
    });
  },
  methods: {
  }
};
</script>
