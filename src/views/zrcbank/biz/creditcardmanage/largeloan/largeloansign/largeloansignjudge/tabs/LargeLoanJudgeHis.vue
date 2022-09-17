
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 合同审核-大额分期申请审批信息
  -->
  <div>
    <yu-panel panel-type="simple" title="大额分期申请审批信息">
      <yu-panel panel-type="simple" title="审批一岗">
        <yu-xform ref="refForm" label-width="150px" v-model="firstJudgeFormdata" :disabled="true">
          <yu-xform-group>
            <yu-xform-item label="审批结论 " placeholder="审批结论" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
            <yu-xform-item label="审批金额" placeholder="审批金额" name="approveAmt" ctype="num"></yu-xform-item>
            <yu-xform-item label="分期期数" placeholder="分期期数（非0整数）" name="loanTerm" ctype="input"></yu-xform-item>
            <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多四位小数)" name="loanFeeRate" ctype="input"></yu-xform-item>
            <yu-xform-item label="分期折算近似年化利率"  name="yearInterestRate" ctype="input"  disabled></yu-xform-item>
            <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="退回原因" placeholder="退回原因" v-show="oneReturnReasonShow" name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
            <yu-xform-item label="拒绝原因" placeholder="拒绝原因" v-show="oneRefuseReasonShow" name="refuseReason" ctype="select" data-code="STD_CARD_ADJUSTMENT_REFUSE_REASON"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel panel-type="simple" title="审批二岗">
        <yu-xform ref="refForm" label-width="100px" v-model="secondJudgeFormdata" :disabled="true">
          <yu-xform-group>
            <yu-xform-item label="审批结论 " placeholder="审批结论" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
            <yu-xform-item label="审批金额" placeholder="审批金额" name="approveAmt" ctype="num"></yu-xform-item>
            <yu-xform-item label="分期期数" placeholder="分期期数（非0整数）" name="loanTerm" ctype="input"></yu-xform-item>
            <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多四位小数)" name="loanFeeRate" ctype="input"></yu-xform-item>
            <yu-xform-item label="分期折算近似年化利率"  name="yearInterestRate" ctype="input"  disabled></yu-xform-item>
            <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="退回原因" placeholder="退回原因" v-show="twoReturnReasonShow" name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
            <yu-xform-item label="拒绝原因" placeholder="拒绝原因" v-show="twoRefuseReasonShow" name="refuseReason" ctype="select" data-code="STD_CARD_ADJUSTMENT_REFUSE_REASON"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {lookup, clone} from '@/utils';
lookup.reg('STD_CARD_RETURN_REASON,STD_CARD_ADJUSTMENT_REFUSE_REASON');
export default {
  name: 'LargeLoanJudgeHis',
  props: {
    judgeHisParams: Object
  },
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/querymodel', // 大额分期申请审批
      firstJudgeFormdata: {},
      secondJudgeFormdata: {},
      approveConclusionOptions: lookup.lookupMgr['OP_TYPE'],
      oneReturnReasonShow: false,
      oneRefuseReasonShow: false,
      twoReturnReasonShow: false,
      twoRefuseReasonShow: false
    };
  },
  watch: {
    firstJudgeFormdata: {
      deep: true,
      handler (oldVal, newVal) {
        // O-12 表示审批结果为同意
        if (newVal.approveConclusion === 'O-12') {
          this.oneReturnReasonShow = false;
          this.oneRefuseReasonShow = false;
        }
        // O-2 表示审批结果为退回
        if (newVal.approveConclusion === 'O-2') {
          this.oneReturnReasonShow = true;
          this.oneRefuseReasonShow = false;
        }
        // O-8 表示审批结果为拒绝
        if (newVal.approveConclusion === 'O-8') {
          this.oneReturnReasonShow = false;
          this.oneRefuseReasonShow = true;
        }
      }
    },
    secondJudgeFormdata: {
      deep: true,
      handler (oldVal, newVal) {
        // O-12 表示审批结果为同意
        if (newVal.approveConclusion === 'O-12') {
          this.oneReturnReasonShow = false;
          this.oneRefuseReasonShow = false;
        }
        // O-2 表示审批结果为退回
        if (newVal.approveConclusion === 'O-2') {
          this.oneReturnReasonShow = true;
          this.oneRefuseReasonShow = false;
        }
        // O-8 表示审批结果为拒绝
        if (newVal.approveConclusion === 'O-8') {
          this.oneReturnReasonShow = false;
          this.oneRefuseReasonShow = true;
        }
      }
    }
  },
  mounted: function () {
    let _this = this;
    let queryOneParams = {
      condition: JSON.stringify({serno: _this.judgeHisParams.serno, approvePostFlag: '00'}) // 00 审批一岗
    };
    let queryTwoParams = {
      condition: JSON.stringify({serno: _this.judgeHisParams.serno, approvePostFlag: '01'}) // 01 审批二岗
    };
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: queryOneParams
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data[0], _this.firstJudgeFormdata);
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: queryTwoParams
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data[0], _this.secondJudgeFormdata);
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  },
  methods: {}
};
</script>
