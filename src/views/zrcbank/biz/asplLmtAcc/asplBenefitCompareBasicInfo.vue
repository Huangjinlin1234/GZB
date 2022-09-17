
<template>
  <!--
    @created by 屈文
    @description 资产池业务总体收益情况
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="资产池业务总体收益情况" name="messageTip">
          <yu-xtable ref="refTable" condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" request-type="POST" :base-params="asplTotlIncomeParams">
            <yu-xtable-column label="资产池类型" prop="assetPoolType" data-code="STD_ASSET_POOL_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="入池资产价值" prop="inpAssetValue"></yu-xtable-column>
            <yu-xtable-column label="贡献度变化情况">
              <yu-xtable-column label="入池资产增加的客户贡献度" prop="inpAssetBeforCtbt"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="收益增加情况">
              <yu-xtable-column label="入池前资产原始收益基准" prop="inpAssetBeforGrow"></yu-xtable-column>
              <yu-xtable-column label="入池后资产收入" prop="inpAssetAfterIncome"></yu-xtable-column>
              <yu-xtable-column label="资产入池后收益增长情况（%）" prop="inpAssetAfterIncomeGrow"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="融资成本节约情况">
              <yu-xtable-column label="入池资产质押换开票据本息及费用合计" prop="inpAssetGuarChgTotalAmt"></yu-xtable-column>
              <yu-xtable-column label="预测入池资产逐笔贴现金额合计" prop="predictEveryDiscTotalAmt"></yu-xtable-column>
              <yu-xtable-column label="融资成本节约金额（元）" prop="finCostAmt"></yu-xtable-column>
              <yu-xtable-column label="融资成本节约比例（%）" prop="finCostPerc"></yu-xtable-column>
            </yu-xtable-column>
          </yu-xtable>
      </yu-tab-pane>
      <yu-form-buttons align="center">
        <yu-button @click="back">返回</yu-button>
      </yu-form-buttons>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ASSET_POOL_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      asplTotlIncomeParams: {cusId: this.$route.meta.params.data.contNo},
      dataUrl: backend.cmisBiz + '/api/aspltotlincome/queryaspltotlincomedatabyparams',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ]
    };
  },
  methods: {
    // 返回
    back: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>