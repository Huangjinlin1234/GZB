/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="保证人列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}" :pageable="true" :data-url="dataUrl" :default-load="true" @current-change="initGuarntrData">
        <yu-xtable-column label="保证编号" prop="guarantyId"></yu-xtable-column>
        <yu-xtable-column label="保证人客户编号" prop="guarCusId"></yu-xtable-column>
        <yu-xtable-column label="保证方式" prop="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xtable-column>
        <yu-xtable-column label="保证金额（元）" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="分析状态" prop="analyStatus" data-code="STD_RISK_ANALY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="保证人情况分析" v-if="!autoFlag" panel-type="simple">
      <yu-xform ref="riskGuarntrAnalyForm" v-model="guarntrData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="保证人代偿意愿" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_SUBPAY_WISH" name="subpayWish" rules="required"></yu-xform-item>
            <yu-xform-item label="代偿能力" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_SUBPAY_ABI" name="subpayAbi" rules="required"></yu-xform-item>
            <yu-xform-item label="主键" :disabled="viewFlag||approveFlag||assistFlag" name="pkId" rules="required" hidden="true"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUARANTEE_TY,STD_RISK_ANALY_STATUS,STD_RISK_SUBPAY_WISH,STD_RISK_SUBPAY_ABI');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/riskguarntrlist/queryList',
      baseParams: {},
      guarntrData: {}, // 担保基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      autoFlag: false // 是否不良
    };
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // _this.$refs.refTable.setHiddenColumns('pkId,subpayWish,subpayAbi');
      // 任务编号
      // const taskNo = data.riskTask.taskNo;
      // let params = {};
      // params.taskNo = taskNo;
      // // 通过任务编号获取贷款信息
      // _this.$xutils.request({
      //   // 异步请求
      //   async: true,
      //   url: _this.$backend.cmisPsp + '/api/riskguarntrlist/querySingle',
      //   data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       // 解析返回值
      //       const data = response.data;
      //       if (data != null) {
      //         yufp.clone(data, _this.guarntrData);
      //         _this.updateFlag = true;
      //       }
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
      //     }
      //   },
      //   error: (result, b) => {
      //     _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    },
    initGuarntrData: function (val) {
      if (val == undefined) {
        return;
      }
      this.guarntrData.subpayWish = val.subpayWish;
      this.guarntrData.subpayAbi = val.subpayAbi;
      this.guarntrData.pkId = val.pkId;
    }
  }
};
</script>
