/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspSmallOperCheck">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="经营情况分析" :collapse-hide="false">
        <yu-xform ref="riskOperAnalyForm" v-model="operData" label-width="360px">
          <yu-xform-group :column="1">
            <yu-xform-item label="生产经营情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_CORP_OPER_SITU" colspan="24" name="indivOperSitu" rules="required"></yu-xform-item>
            <yu-xform-item label="销售收入变化趋势" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_CHG_TREND" colspan="24" name="incomeChange" rules="required"></yu-xform-item>
            <yu-xform-item label="利润变动趋势" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_CHG_TREND" name="profitChange" rules="required"></yu-xform-item>
            <yu-xform-item label="现金流量变动趋势" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_CHG_TREND" name="cashChange" rules="required"></yu-xform-item>
            <yu-xform-item label="第一还款来源是否充足" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_INCOME_SUFFICE" name="isIncomeSuffice" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
yufp.lookup.reg('STD_RISK_CORP_OPER_SITU, STD_RISK_CHG_TREND, STD_RISK_INCOME_SUFFICE');

export default {
  name: 'PspCheckRst',
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
        url: _this.$backend.cmisPsp + '/api/riskoperanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.operData);
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
