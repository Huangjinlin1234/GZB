<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata">
      <yu-panel title="信用信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="消费类融资余额" name="CONSUMPTIONBALANCE" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="消费类融资月还款额" name="CONSUMPTIONREPAYMENT" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款当前逾期金额" name="CURRENTLOANOVERDUEAMOUNT" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款单月最高逾期金额" name="MAXLOANOVERDUEAMOUNT" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款最长逾期月数" name="MAXMONTHSOFLOANOVERDUE" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷记卡当前逾期金额" name="CURRENTCREDITCARDOVERDUEAMOUNT" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷记卡单月最高逾期金额" name="MAXCREDITCARDOVERDUEAMOUNT" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷记卡最长逾期月数" name="MAXMONTHSOFCREDITCARDOVERDUE" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="两年内逾期次数（贷记卡+贷款）" name="OVERDUENUMOFTWOYEARS" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="两年外逾期次数（贷记卡+贷款）" name="OVERDUENUMOVERTWOYEARS" ctype="input" disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
export default {
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      formdata: {}};
  },
  mounted () {
    var _this = this;
    // 进入初始化
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtdebitcreditinfo/selectdebit',
      data: {surveySerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : this.node.iqpSerno},
      callback: function (code, message, response) {
        yufp.clone(response.data.r008, _this.formdata);
      }
    });
  }
};
</script>
