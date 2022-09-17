<template>
  <div class="final-approve">
    <yu-xform ref="finalForm" label-width="200px" v-model="formdata" >
      <yu-collapse v-model="activeNames">
        <yu-collapse-item title="卡产品审批信息" name="1">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请卡产品" name="applyCardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD"  disabled></yu-xform-item>
            <yu-xform-item label="是否同时申请普通信用卡" name="isApplyCommonCard" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
            <yu-xform-item label="核准额度" name="approveAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="日费率" name="dailyFeeRate" :colspan="12"  :precision="6"  ctype="yu-num" sign="‰" disabled></yu-xform-item>
            <yu-xform-item label="审批结果" name="approveResult" ctype="select" :colspan="12" data-code="STD_CARD_APPROVE_RESULT" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-collapse-item>
        <yu-collapse-item title="卡产品审批信息" name="2"  :hidden="hideflag">
          <yu-xform-group :column="2">
            <yu-xform-item label="普通信用卡申请卡产品" name="commonCardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD" disabled></yu-xform-item>
            <yu-xform-item label="核准额度" name="commonCardApproveAmt"  disabled ></yu-xform-item>
            <yu-xform-item label="审批结果" name="commonCardApproveResult"  ctype="select"  data-code="STD_CARD_APPROVE_RESULT" :colspan="12"  disabled></yu-xform-item>
          </yu-xform-group>
        </yu-collapse-item>
      </yu-collapse>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="returnFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import { moneyToUpper } from '@/utils/util';
import dict from '@/config/constant/app.data.lookup.js';
lookup.reg('STD_ZB_YES_NO,STD_CARD_APPLY_CARD_PRD,STD_CARD_APPROVE_RESULT');
lookup.reg('STD_CARD_FINAL_REFUSE_REASON,STD_APPROVE_CONCLUSION,STD_CARD_RETURN_REASON');
export default {
  props: {
    dtlParams: Object
  },
  data () {
    return {
      activeNames: ['1', '2', '3'],
      approveFormdata: {},
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/creditcardfinaljudginifo/selectbyserno'
      },
      comhideflag: false,
      hideflag: false
    };
  },
  methods: {
    // 返回
    returnFn () {
      this.$router.replace({
        name: this.node.returnBackFuncId
      });
    }

  },
  mounted () {
    var _this = this;
    yufp.service.request({
      method: 'POST',
      url: this.$backend.cmisBiz + '/api/creditcardfinaljudginifo/selectbyserno',
      data: {serno: this.dtlParams.serno, finalPostFlag: '01'},
      callback: function (code, message, response) {
        if (response.code == '0') {
          debugger;
          clone(response.data, _this.formdata);
          if (response.data.isApplyCommonCard != '1') {
            _this.hideflag = true;
          }
        } else {
          this.$message({ message: '获取审批数据异常!', type: 'warning' });
        }
      }
    });
  }
};
</script>
<style scoped>
.final-approve {
  height: 100%;
}
</style>