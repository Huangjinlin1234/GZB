<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%">
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">账面价值法基本公式</span>
      </div>
      <div class="el-collapse-item__content">
        <p>押品评估价值 = 押品当前账面价值。</p>
        <p>其中，非本币计价的保证金、存单类押品计算公式：</p>
        <p>评估价值 =当日固定时点汇率中间价×数量（需每日批量按当日信贷系统汇率中间价更新押品价值）</p>
      </div>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">说明</span>
      </div>
      <div class="el-collapse-item__content">
        <p>账面价值法以押品的账面价值作为评估依据的使用前提为：</p>

        <p>押品账面价值可以从出质人处获取真实准确的账面价值金额；</p>

        <p>押品账面价值在相当长一段时间内维持不变。</p>

      </div>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">关键字说明</span>
      </div>
      <div class="el-collapse-item__content">
        <p>1. 当日固定时点汇率中间价：是当天我行的汇价中间价报价；</p>

        <p>2. 数量：指以外币计价的抵质押品总数。以外币存单为例，“数量”是指质押在我行的外币金额</p>

      </div>
    </div>
  </div>
</template>

<script>
  import "@/views/evalmanage/evalModel/evalModel.css";

  export default {
    name: "bookPriceEvalModel"
  }
</script>

<style scoped>

</style>
