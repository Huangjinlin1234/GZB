/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="近三期财务报表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}" :pageable="true" :data-url="dataUrl" :default-load="true">
      <yu-xtable-column label="科目名称" prop="idxName"></yu-xtable-column>
        <yu-xtable-column label="本期数据" prop="curtValue"></yu-xtable-column>
        <yu-xtable-column label="上一年数据" prop="l1yValue"></yu-xtable-column>
        <yu-xtable-column label="上两年数据" prop="l2yValue"></yu-xtable-column>
        <yu-xtable-column label="比上一年增长" prop="l1yRiseRate"></yu-xtable-column>
        <yu-xtable-column label="比上两年增长" prop="l2yRiseRate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="财务情况分析" v-if="!badFlag" panel-type="simple">
      <yu-xform ref="riskFinaAnalyForm" v-model="finaData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="客户现金流量分析" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_CASH_ANALY" name="cashAnaly" rules="required"></yu-xform-item>
            <yu-xform-item label="现金流量分析说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="cashAnalyExpl" rules="required"></yu-xform-item>
            <yu-xform-item label="客户财务状况分析" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_FINA_ANALY" name="finaAnaly" rules="required"></yu-xform-item>
            <yu-xform-item label="财务状况说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="finaAnalyExpl" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_RISK_CASH_ANALY, STD_RISK_FINA_ANALY');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      finaData:{},
      dataUrl: this.$backend.cmisPsp + '/api/riskfinreportanaly/queryList',
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
        url: _this.$backend.cmisPsp + '/api/riskfinaanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.finaData);
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
