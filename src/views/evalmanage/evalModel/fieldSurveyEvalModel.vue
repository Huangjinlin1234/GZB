<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%">
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">现场查勘基本公式</span>
      </div>
      <div class="el-collapse-item__content">
        <p>P = Ps</p>
        <p>即：押品评估价值 = 云估价结果。</p>
      </div>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">说明</span>
      </div>
      <div class="el-collapse-item__content">
        <p>使用现场查勘法的前提条件是对接云估价的担保信息分类。</p>

        <p>估值步骤：</p>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;步骤一： 估值发起岗在线发送估价请求；</p>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;步骤二：等待云估价获取价值后反馈。</p>

        <p>优缺点：</p>
        
        <p>&nbsp;&nbsp;&nbsp;&nbsp;优点：估值意见在一定程度上能够反映市场上的公允价值标准，具备一定的参考价值。</p>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;缺点：等待时间不定，需要一定时间。</p>

      </div>
    </div>
  </div>
</template>

<script>
  import "@/views/evalmanage/evalModel/evalModel.css";

  export default {
    name: "fieldSurveyEvalModel"
  }
</script>

<style scoped>

</style>
