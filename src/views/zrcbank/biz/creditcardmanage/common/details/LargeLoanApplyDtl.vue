
<template>
  <!--
    @created by creazyCder 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @description 大额分期申请信息-详情
  -->
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="true">
      <yu-xform-group>
         <yu-xform-item label="审批结论 " placeholder="审批结论"  :rules="required" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额" :rules="approveAmtRules" :hidden="amtHideFlag" name="approveAmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="分期期数" placeholder="分期期数" name="loanTerm" ctype="select" data-code="STD_LARGE_LOAN_TERM" rules="required" :hidden="amtHideFlag" ></yu-xform-item>
          <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多六位小数)" :hidden="amtHideFlag" name="loanFeeRate" ctype="input" :rules="loanFeeRateRules"></yu-xform-item>
          <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" :rules="required" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="退回原因" placeholder="退回原因" v-model="formdata.returnReason" :rules="required" v-if="returnReasonShow"  name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
          <yu-xform-item label="拒绝原因" placeholder="拒绝原因" v-model="formdata.refuseReason" :rules="required" v-if="refuseReasonShow" name="refuseReason" ctype="select" data-code="STD_CARD_ADJUSTMENT_REFUSE_REASON"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
    </yu-xform>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
// STD_ZB_CERT_TYP 证件类型，STD_CARD_LOANR_PLAN 分期计划,STD_CARD_SEND_MODE 放款方式
// STD_CARD_LOAN_FEE_METHOD 分期手续费收取方式, STD_CARD_LOAN_PRIN_DIST_METHOD 分期本金分配方式,STD_CARD_LOAN_FEE_CALC_METHOD 分期手续费计算方式
// STD_CARD_LOANR_TARGET 分期放款账户对公/对私标识 ,STD_CARD_PAYMENT_PURPOSE 资金用途 , STD_ZB_GUAR_WAY 担保方式
lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,STD_CARD_LOANR_PLAN,STD_CARD_SEND_MODE,STD_CARD_LOAN_FEE_METHOD,STD_CARD_LOAN_PRIN_DIST_METHOD,STD_CARD_LOAN_FEE_CALC_METHOD,STD_CARD_LOANR_TARGET,STD_CARD_PAYMENT_PURPOSE,STD_ZB_GUAR_WAY');
export default {
  name: 'LargeLoanApplyDtl',
  props: {
    dtlParams: Object
  },
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcradlargeloanapp/query',
      updateUrl: this.$backend.cmisBiz + '/api/creditcradlargeloanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcradlargeloanapp/',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcradlargeloanapp/batchdelete/',
      tryCalUrl: this.$backend.cmisBiz + '/api/creditcradlargeloanapp/shisuan',
      formdata: {},
      bankAcount: '314305670002',
      bankName: '张家港农商行'
    };
  },

  mounted () {
    var _this = this;
    yufp.service.request({
      method: 'POST',
      url: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/selectfinalinfo',
      data: {serno: this.dtlParams.serno},
      callback: function (code, message, response) {
        if (response.code == '0') {
          if (response.data.approveConclusion == 'O-12') {
            response.data.approveConclusion = '通过';
          } else if (response.data.approveConclusion == 'O-1') {
            response.data.approveConclusion = '打回';
          } else {
            response.data.approveConclusion = '否决';
          }
          clone(response.data, _this.formdata);
        } else {
          this.$message({ message: '获取审批数据异常!', type: 'warning' });
        }
      }
    });
  },
  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      this.$emit('close');
    }
  }
};
</script>
