<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%">
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">指数法基本公式</span>
      </div>
      <div class="el-collapse-item__content">
        <p>评估价值=最近一次外部评估价值 ×（当前评估时点对应指数 / 最近一次外部评估时点对应指数）× [ 1–（当前评估年月 - 最近一次外部评估年月）/12 × 年度房屋物理折损率 ]</p>
      </div>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">关键字说明</span>
      </div>
      <div class="el-collapse-item__content">
        <p>1. 最近一次外部评估价值：是指最近一次押品经外部评估机构评估的评估价值。</p>

        <p>2. 年度房屋物理折损率：用于衡量房屋随着使用年限推移，发生的折损程度。若采用直线折旧法，年度房屋物理折损率=1/房屋使用寿命。</p>

        <p>3. 房屋使用寿命：不同结构的房屋的耐用年限。（房屋使用寿命=MIN [ 该类房屋结构的耐用年限 ，该类土地使用权出让最高年限 ]）</p>

      </div>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">剩余收益期限中各类房屋的使用寿命参考建议(单位：年)</span>
      </div>
      <div class="el-collapse-item__content">
        <table>
          <tr>
            <th class="yuxp-col-1"></th>
            <th class="yuxp-col-1">居住用房</th>
            <th class="yuxp-col-1">商业用房</th>
            <th class="yuxp-col-1">工业用房</th>
            <th class="yuxp-col-1">其他用房</th>
          </tr>
          <tr>
            <td>钢结构</td>
            <td>70</td>
            <td>40</td>
            <td>50</td>
            <td>50</td>
          </tr>
          <tr>
            <td>钢筋混凝土结构</td>
            <td>60</td>
            <td>40</td>
            <td>50</td>
            <td>50</td>
          </tr>
          <tr>
            <td>砖混结构</td>
            <td>50</td>
            <td>40</td>
            <td>40</td>
            <td>50</td>
          </tr>
          <tr>
            <td>砖木结构</td>
            <td>40</td>
            <td>40</td>
            <td>30</td>
            <td>40</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/views/evalmanage/evalModel/evalModel.css";

  export default {
    name: "indexMethodEvalModel"
  }
</script>

<style scoped>

</style>
