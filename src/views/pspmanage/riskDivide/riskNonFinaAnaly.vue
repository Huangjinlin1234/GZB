/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="非财务情况分析" panel-type="simple">
      <yu-xform ref="riskNonFinaAnalyForm" v-model="nfinaData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="外部宏观经济环境发生变化情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_ECONOMY_EFFECT" name="economyChangeCase" rules="required"></yu-xform-item>
            <yu-xform-item label="外部宏观经济环境说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="changeCaseExpl" rules="required"></yu-xform-item>
            <yu-xform-item label="行业风险" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_TRADE_EFFECT" name="tradeRisk" rules="required"></yu-xform-item>
            <yu-xform-item label="行业风险说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="tradeRiskExpl" rules="required"></yu-xform-item>
            <yu-xform-item label="主要股东、关联公司或母子公司发生重大变化" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_RELA_EFFECT" name="shareholderRelaChange" rules="required"></yu-xform-item>
            <yu-xform-item label="主要股东、关联公司或母子公司变化说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="relaChangeExpl" rules="required"></yu-xform-item>
            <yu-xform-item label="借款人内部管理情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_MANA_EFFECT" name="manaCase" rules="required"></yu-xform-item>
            <yu-xform-item label="借款人内部管理情况说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="manaCaseExpl" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_RISK_ECONOMY_EFFECT, STD_RISK_TRADE_EFFECT, STD_RISK_RELA_EFFECT, STD_RISK_MANA_EFFECT');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      nfinaData:{},
      dataUrl: this.$backend.cmisPsp + '/api/risknonfinaanaly/queryList',
      baseParams: {},
      guarntrData: {}, // 担保基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false // 是否不良
    };
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.init();
  },
  mounted () {

  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.badFlag = data.riskTask.rptType == '3';
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取贷款信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/risknonfinaanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.nfinaData);
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
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
