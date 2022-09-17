/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspCusIncomeCheck">
    <!--借款人收入情况展示-->
    <yu-panel title="借款人收入情况分析" :collapse-hide="false">
      <yu-xform ref="riskOperAnalyForm" v-model="incomeData" label-width="360px">
        <yu-xform-group :column="1">
          <yu-xform-item label="家庭年总收入" :disabled="viewFlag||approveFlag||assistFlag" ctype="yu-num" number-formatter="0,000.00" colspan="12" name="famTotalIncome" rules="required"></yu-xform-item>
          <yu-xform-item label="家庭年总支出" :disabled="viewFlag||approveFlag||assistFlag" ctype="yu-num" number-formatter="0,000.00" colspan="12" name="famTotalPay" rules="required"></yu-xform-item>
          <yu-xform-item label="家庭资产情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_INCOME_BALANCE" colspan="24" name="incomeBalance" rules="required"></yu-xform-item>
          <yu-xform-item label="家庭总资产" :disabled="viewFlag||approveFlag||assistFlag" ctype="yu-num" number-formatter="0,000.00" colspan="12" name="famTotalAsset" rules="required"></yu-xform-item>
          <yu-xform-item label="家庭总负债" :disabled="viewFlag||approveFlag||assistFlag" ctype="yu-num" number-formatter="0,000.00" colspan="12" name="famTotalDebt" rules="required"></yu-xform-item>
          <yu-xform-item label="家庭负债情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_ASSET_BALANCE" name="famAssetBalance" rules="required"></yu-xform-item>
          <yu-xform-item label="工作稳定性" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_WORK_STABLE" name="isWorkStable" rules="required"></yu-xform-item>
          <yu-xform-item label="第一还款来源是否充足" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_INCOME_SUFFICE" name="isIncomeSuffice" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_RISK_INCOME_BALANCE, STD_RISK_ASSET_BALANCE, STD_RISK_INCOME_SUFFICE');

export default {
  name: 'PspCusIncomeCheck',
  data: function () {
    return {
      operData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
  },

  created () {
    // 初始化参数
    const _this = this;
    _this.init();
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
        url: _this.$backend.cmisPsp + '/api/riskincomeanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值

            const data = response.data;
            if (data) {
              yufp.clone(data, _this.incomeData);
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
    },
    // 查看
    checkFn: function () {
      console.log('查看！');
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>

<style scoped>

</style>
