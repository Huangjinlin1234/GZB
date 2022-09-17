<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%">
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">基准地价系数修正法基本公式</span>
      </div>
      <div class="el-collapse-item__content">
        <p>待估押品的评估价值=待估押品评估单价×土地面积</p>
        <p>待估押品评估单价=估价对象所在区域基准地价 ×总累积调整系数</p>
        <p>总累积调整系数=容积率修正系数×使用年期修正系数×估价日期修正系数×（1+其他因素修正系数）</p>
        <p>使用年期修正系数= [ 1-1 / (1+土地还原利率) ^ 待估宗地剩余使用年限 ] / [ 1 – 1 / ( 1 +土地还原利率 ) ^ 法定最高出让年限 ]</p>
      </div>
      <div class="el-collapse-item__header">
          <span class="evalModel-title">关键字说明</span>
      </div>
      <div class="el-collapse-item__content">
          <p>1. 容积率修正系数：按照当地基准地价修正体系，查找相应的当地基准地价容积率修正系数表，结合待估宗地的容积率，确定容积率修正系数。</p>
          <p>2. 使用年期修正系数：土地使用年限修正是将基准地价对应的法定最高出让年限修正到待估宗地使用年限。</p>
          <p>3. 其他因素修正系数：参照当地基准地价修正体系中因素修正系数说明表，根据待估宗地的各种因素情况确定每种因素的修正系数Ki。待估宗地因素修正系数K＝1+∑Ki其中Ki指第i种因素的修正系数。</p>
          <p>4. 土地还原利率：即将土地产生的未来纯收益还原为某一期日的土地价格的比率。</p>
          <p>5. 待估宗地剩余使用年限：需要将时间长度单位换算为年进行计算，如“1年6个月”需换算为“1.5年”进行计算。</p>
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
              <td>估价对象所在区域基准地价</td>
              <td>通过待估押品当地公布的基准地价体系进行人工查询获得</td>
          </tr>
          <tr>
              <td>其他因素修正系数</td>
              <td>其他修正因素根据当地基准地价修正体系确定</td>
          </tr>
          <tr>
              <td>估价日期修正系数</td>
              <td>根据待估宗地的估价日期与基准地价的发布日期的差异情况填写</td>
          </tr>
          <tr>
              <td>土地还原率</td>
              <td>5%-8%</td>
          </tr>
          <tr>
              <td>法定最高出让年限</td>
              <td>由系统根据押品分类及土地用途自动判断</td>
          </tr>
        </table>
      </div>
      <div class="el-collapse-item__header">
          <span class="evalModel-title">所得税率填写参考建议</span>
        </div>
        <div class="el-collapse-item__content">
          <table>
            <tr>
                <th class="yuxp-col-1">待估宗地的估价日期与基准地价的发布日期的差距</th>
                <th class="yuxp-col-1">估价日期修正系数建议（0.8~1.2范围）</th>
            </tr>
            <tr>
                <td>≤1年</td>
                <td>1</td>
            </tr>
            <tr>
                <td>>1年且基准地价发布后，地价普遍上升</td>
                <td>大于1</td>
            </tr>
            <tr>
                <td>>1年且基准地价发布后，地价普遍下降</td>
                <td>小于1</td>
            </tr>
          </table>
        </div>
        <div class="el-collapse-item__header">
            <span class="evalModel-title">法定最高出让年限参数</span>
          </div>
          <div class="el-collapse-item__content">
            <table>
              <tr>
                  <th class="yuxp-col-1">押品三级分类</th>
                  <th class="yuxp-col-1">土地用途</th>
                  <th class="yuxp-col-1">土地使用权法定最高出让年限</th>
              </tr>
              <tr>
                  <td>住用地土地使用权</td>
                  <td>居住用地</td>
                  <td>70</td>
              </tr>
              <tr>
                  <td>>商业用地土地使用权</td>
                  <td>商业用地</td>
                  <td>40</td>
              </tr>
              <tr>
                  <td>>工业用地土地使用权</td>
                  <td>工业用地</td>
                  <td>50</td>
              </tr>
              <tr>
                  <td>>综合用地土地使用权</td>
                  <td>综合用地</td>
                  <td>50</td>
              </tr>
              <tr>
                  <td>>其他用地土地使用权</td>
                  <td>教育、科技、文化、卫生、体育用地</td>
                  <td>50</td>
              </tr>
              <tr>
                  <td>>其他用地土地使用权</td>
                  <td>旅游、娱乐用地</td>
                  <td>40</td>
              </tr>
              <tr>
                  <td>>其他用地土地使用权</td>
                  <td>其他用地</td>
                  <td>50</td>
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
