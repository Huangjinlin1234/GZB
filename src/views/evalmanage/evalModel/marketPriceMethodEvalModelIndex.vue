<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%;">
    <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="有公开市场价值的金融质押品">
      <div class="evalModel-content">
        <div class="el-collapse-item__header">
          <span class="evalModel-title">基本公式</span>
        </div>
        <div class="el-collapse-item__content">
          <p>评估价值 = 当天市场价格×资产数量</p>
        </div>
        <div class="el-collapse-item__header">
          <span class="evalModel-title">说明</span>
        </div>
        <div class="el-collapse-item__content">
          <p>市场价格法的使用前提为押品在资本市场或现货市场上具有流通性，可获得公开、准确、及时的市场价值。</p>

          <p>其中，市场价值定义为：自愿买方和自愿卖方在评估基准日经正常的市场营销后所达成的公平交易中，某项资产应当进行交易的价值估计数额，当事人双方应各自理性、谨慎行事，不受任何强迫压制。</p>

          <p>适用于有统一市场价格并可从公开渠道获取资产价格的金融质押品，即现金、现货及其他在资本市场和现货市场上具有一定市面流通性的抵质押品。</p>
          <p>具体包括以下押品大类：</p>
          <p>1. 贵金属</p>
          <p>2. 债券：包括国债、地方政府债券、金融债券、公司或企业债券、可转换债券及其他债券等</p>
          <p>3. 其他：包括上市公司股权、基金类押品。其中股权为上市公司主权，基金为可转让基金份额</p>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="有公开市场价值的动产">
      <div class="evalModel-content">
        <div class="el-collapse-item__header">
          <span class="evalModel-title">基本公式</span>
        </div>
        <div class="el-collapse-item__content">
          <p>押品评估价值 = 本次获取的市场价格×待估押品数量</p>
        </div>
        <div class="el-collapse-item__header">
          <span class="evalModel-title">说明</span>
        </div>
        <div class="el-collapse-item__content">
          <p>市场价格法的使用前提为押品在资本市场或现货市场上具有流通性，可获得公开、准确、及时的市场价值。</p>
          <p>其中，市场价值定义为：自愿买方和自愿卖方在评估基准日经正常的市场营销后所达成的公平交易中，某项资产应当进行交易的价值估计数额，当事人双方应各自理性、谨慎行事，不受任何强迫压制。</p>
          <p>适用于具有相对集中的市场，如工业存货、商品、钢材等流动性较低但仍可从公开市场获得公开或参照价格的现货资产，以及营运车牌，</p>
          <p>具体包括以下押品类别：</p>
          <p>1. 存货，包括黑色金属及其合金、有色金属及其合金、化工、纺织原料及纺织制品、矿产品、粮油及农副产品、未上牌车辆以及纸浆、纸、纸板及其制品。</p>
          <p>2. 仓单：标准仓单、非标准仓单。</p>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
  import "@/views/evalmanage/evalModel/evalModel.css";

  export default {
    name: "marketPriceMethodEvalIndex",
    data() {
      return {
        tabPosition: 'top'
      };
    }
  }
</script>

<style scoped>

</style>
