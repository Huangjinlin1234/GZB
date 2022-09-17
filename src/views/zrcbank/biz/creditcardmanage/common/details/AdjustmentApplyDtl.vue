
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 额度审批-审批意见二
  -->
  <div>
    <yu-panel panel-type="simple" title="审批意见">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata" disabled>
        <yu-xform-group>
          <yu-xform-item label="审批结论 " placeholder="审批结论"  name="approveConclusion" ctype="input" ></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额"  name="approveAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="退回原因" placeholder="退回原因"   name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
          <yu-xform-item label="拒绝原因" placeholder="拒绝原因"  name="refuseReason" ctype="select" data-code="STD_CARD_ADJUSTMENT_REFUSE_REASON"></yu-xform-item>
          <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// STD_APPROVE_CONCLUSION 审批结论
// STD_CARD_RETURN_REASON 退回原因
// STD_CARD_ADJUSTMENT_REFUSE_REASON 拒绝原因
import {lookup, clone} from '@/utils';
lookup.reg('STD_APPROVE_CONCLUSION,STD_CARD_RETURN_REASON,STD_CARD_ADJUSTMENT_REFUSE_REASON');
export default {
  name: 'JudgeStepTwo',
  props: {
    dtlParams: Object
  },
  components: {},
  data: function () {
    return {
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentjudginifo/selectbyserno'
      },
      opDict: []
    };
  },

  mounted () {
    let _this = this;
    // 第一步获取本级（额度审批二岗）保存数据回显
    this.$request({
      url: _this.urls.queryUrl,
      method: 'POST',
      data: {serno: this.dtlParams.serno}
    }).then(({code, message, data}) => {
      debugger;
      if (code == '0') {
        if (data.approveConclusion == 'O-12') {
          data.approveConclusion = '通过';
        } else if (data.approveConclusion == 'O-1') {
          data.approveConclusion = '打回';
        } else {
          data.approveConclusion = '否决';
        }
        clone(data, _this.formdata);
      } else {
        this.$message({message: message || '查询失败', type: 'error'});
      }
    });
  }
};
</script>
