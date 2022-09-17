<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="额度批复编号" ctype="input" placeholder="额度批复编号" name="replyNo" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="" ctype="yu-button" name="b1" placeholder="" @click="customClick('doSelect')" label-width="1">查询</yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="批复金额" ctype="input" placeholder="批复金额" name="contHighAvlAmt" disabled></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="管护人" ctype="input" placeholder="管护人" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="管护机构" ctype="input" placeholder="管护机构" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="批复产品名称" ctype="input" placeholder="批复产品编号" name="prdId" disabled></yu-xform-item>
          <yu-xform-item label="批复额度类型" ctype="select" name="limitType" disabled data-code="STD_LIMIT_TYPE" placeholder="额度类型"></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" data-code="STD_LOAN_MODAL" placeholder="贷款形式"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" data-code="STD_CONT_TYPE" placeholder="合同类型" :disabled="disabledFlg"  :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" placeholder="担保方式" name="guarWay" data-code="STD_ZB_GUAR_WAY" rules="required" :disabled="disabledFlg"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="审批通过日期（精确到秒）" ctype="input" placeholder="审批通过日期（精确到秒）" name="approvePassDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" disabled hidden data-code=" std_zb_opr" placeholder="操作类型"></yu-xform-item>
          <yu-xform-item label="原流水号" ctype="input" placeholder="原流水号" name="oldIqpSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" disabled hidden></yu-xform-item>
          <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveySerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否复议 std_zb_yes_" ctype="input" placeholder="是否复议 std_zb_yes_" name="isReconsid" disabled hidden></yu-xform-item>
          <yu-xform-item label="所属条线" ctype="select" name="belgLine" disabled hidden data-code="BIZ_BELG" placeholder="所属条线"></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" name="repaymentType" disabled hidden data-code="STD_HX_HKFS" placeholder="还款方式"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" name="certCode" disabled hidden ></yu-xform-item>
          <yu-xform-item label="手机号" ctype="input" name="phone" disabled hidden ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')"  :loading="buttonLoading">下一步</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/xw/createIqpLoanApp',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      disabledFlg: true,
      buttonLoading: false
    };
  },
  watch: {
    'formdata.cusId': function (val, oldVal) {
      if (val) {
        this.$request({
          url: this.$backend.cmisCus + '/api/cusindivcontact/queryCusIndivContact',
          method: 'POST',
          data: {cusId: val}
        }).then(({code, message, data}) => {
          if (code == '0') {
            this.formdata.phone = data.mobileA;
          } else {
            this.$message({message: '查询客户联系信息失败！', type: 'error'});
          }
        });
      }
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.belgLine = this.$xutils.getDefaultformulaData('01');
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '1' || op.key === '2') {
          return true;
        }
        return false;
      });
    }
  }
};
</script>
