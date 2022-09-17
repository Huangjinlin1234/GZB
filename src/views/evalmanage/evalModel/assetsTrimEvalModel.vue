<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%;">
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">净资产调整法基本公式</span>
      </div>
      <div class="el-collapse-item__content">
          <p>评估价值 = [净资产总额 – (经审计后的账龄≥2年的应收账款-2年的应收账款对应的已计提的减值准备) –（经审计后的账龄≥2年的预付费用-2年的预付费用对应的已计提的减值准备）] × 出质股权比例</p>
      </div>
      <div class="el-collapse-item__header">
          <span class="evalModel-title">关键字说明</span>
      </div>
      <div class="el-collapse-item__content">
          <p> 由于待估资产不能从公开市场获取公允价值，估值方法主要以净资产总额作为评估依据，所以净资产调整法的使用前提为：</p>
          <p> 可获取该公司最近一年的财务报表及账龄超过两年的应收账款和预付费用；</p>
          <p> 财务报表必须经过审计。财务报表需能够真实、全面、公允的反映非上市公司股权的实际情况，任何粉饰资产规模、藏匿负债的操作都会导致净资产总额的金额偏差。</p>
      </div>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">关键字参数</span>
      </div>
      <div class="el-collapse-item__content">
        <table>
          <tr>
              <th class="yuxp-col-1">参数名称</th>
              <th class="yuxp-col-3">建议取值范围</th>
          </tr>
          <tr>
              <td>净资产总额</td>
              <td>根据押品实际情况，人工计算填写</td>
          </tr>
          <tr>
              <td>经审计后的账龄≥2年的应收账款</td>
              <td>根据企业年报中，经审计后的账龄≥2年的应收账款合计，人工填写</td>
          </tr>
          <tr>
              <td>账龄≥2年的应收账款已计提减值准备</td>
              <td>根据企业年报中，账龄≥2年的应收账款对应的已计提减值准备，人工填写</td>
          </tr>
          <tr>
              <td>经审计后的账龄≥2年的预付费用</td>
              <td>根据企业年报中，经审计后的账龄≥2年的预付费用合计，人工填写</td>
          </tr>
          <tr>
              <td>账龄≥2年的预付费用已计提的减值准备</td>
              <td>根据企业年报中，账龄≥2年的预付费用对应的已计提减值准备，人工填写</td>
          </tr>
          <tr>
              <td>折现率</td>
              <td>在初评阶段，建议参照该类业务总体偏向保守的利率水平，例如在基准利率基础上上浮20%到30%</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/views/evalmanage/evalModel/evalModel.css";

  export default {
    name: "assetsTrimEvalModel"
  }
</script>

<style scoped>

</style>
