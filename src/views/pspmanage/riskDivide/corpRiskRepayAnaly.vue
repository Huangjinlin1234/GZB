/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="riskRepayAnaly">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="影响偿还因素分析" :collapse-hide="false">
        <yu-xform ref="riskRepayAnalyForm" v-model="repayData" label-width="360px">
          <yu-xform-group :column="1">
            <yu-xform-item label="还款意愿" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_REPAY_WISH" colspan="24" name="repayWish" rules="required"></yu-xform-item>
            <yu-xform-item label="还本金能力" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_REPAY_CAP_ABI" name="repayCapAbility" rules="required"></yu-xform-item>
            <yu-xform-item label="还息能力" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_REPAY_INT_ABI" name="repayInterestAbility" rules="required"></yu-xform-item>
            <yu-xform-item label="欠息说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="debitInterestDesc" rules="required"></yu-xform-item>
            <yu-xform-item label="银行对客户贷款管理" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_LOAN_MANAGE" name="cusLoanManage" rules="required"></yu-xform-item>
            <yu-xform-item label="客户是否存在违约行为" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_CUS_DEFAULT" name="isExistsPenalty" rules="required"></yu-xform-item>
            <yu-xform-item label="授信业务本金逾期时间T"  ctype="radio" data-code="STD_RISK_CAP_OVERDAY" name="capOverdueDay"  rules="required"></yu-xform-item>
            <yu-xform-item label="授信业务利息逾期时间T"  ctype="radio" data-code="STD_RISK_INT_OVERDAY" name="intOverdueDay" rules="required"></yu-xform-item>
            <yu-xform-item label="实际控制人(法人代表)" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_INFACT_CTRL" name="infactCtrl" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_RISK_REPAY_WISH,STD_RISK_REPAY_CAP_ABI,STD_RISK_REPAY_INT_ABI,STD_RISK_LOAN_MANAGE,STD_RISK_CUS_DEFAULT,STD_RISK_CAP_OVERDAY,STD_RISK_INT_OVERDAY,STD_RISK_INFACT_CTRL');

export default {
  name: 'RiskRepayAnaly',
  data: function () {
    return {
      repayData: {},
      operData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
  },
  created () {
    this.init();
  },
  mounted () {
    // // 初始化参数
    // const _this = this;
    // _this.init();
  },
  computed: {
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务号获取借款人情况信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/riskrepayanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.repayData);
              _this.updateFlag = true;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
