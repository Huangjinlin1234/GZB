<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%">
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">工程进度法基本公式</span>
      </div>
      <div class="el-collapse-item__content">
          <p>评估价值=预计完工后工程价值 * 工程完成进度 *（1-价值折扣率）*（1-营业税金及附加税率 - 土地增值税税率 - 销售费率 - 管理费率 - 其他费率）*（1-所得税率）</p>
      </div>
      <div class="el-collapse-item__header">
          <span class="evalModel-title">关键字说明</span>
      </div>
      <div class="el-collapse-item__content">
        <p>1. 预计完工后工程价值：应在参照预计完工时点市场上同类用途、性质和结构的房地产的市场交易价格的基础上进行调整、修正</p>
        <p>2. 价值折扣率：体现所有发生的折扣因素，如成本上升（建筑材料涨价）、工程延误、工程停滞等对工程总价值造成的影响。折扣因素越多，价值折扣率越高。需根据在建工程进展情况设置不同值</p>
        <p>3. 销售费用：指预售未来开发完成的房地产或销售已经开发完成的房地产的必要支出，包括广告费、销售资料制作费、样板房制作费、售楼处建设费、销售人员工资或者销售代理费等</p>
        <p>4. 管理费用：指房地产开发商为组织和管理房地产开发经营活动的必要支出，包括管理人员工资及福利费、办公费、差旅费等，在估价中一般按开发成本的一定比例计算。</p>
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
              <td>预计完工后工程价值</td>
              <td>完工后的建筑面积×预计售价</td>
          </tr>
          <tr>
              <td>价值折扣率</td>
              <td>若工程正常进展，选择为0；若工程延误，在0.1-0.5之间选择；若工程停滞，在0.6-0.9之间选择</td>
          </tr>
          <tr>
              <td>工程完成进度</td>
              <td>0~1</td>
          </tr>
          <tr>
              <td>营业税及附加税费率</td>
              <td>按相关法律及会计准则选取合适的值进行计算，通常为5.5%</td>
          </tr>
          <tr>
              <td>土地增值税税率</td>
              <td>按相关法律及会计准则选取合适的值进行计算，通常为6%</td>
          </tr>
          <tr>
              <td>销售费率</td>
              <td>销售费用/完工后房地产价值，默认3%</td>
          </tr>
          <tr>
              <td>管理费率</td>
              <td>管理费用/完工后房地产价值，默认2%</td>
          </tr>
          <tr>
              <td>其他费率</td>
              <td>若有则根据实际情况填写</td>
          </tr>
          <tr>
              <td>所得税率</td>
              <td>系统默认为25%,可修改:针对“在建工程”类押品，借款人为房地产开发企业，所得税率为25%； 针对“交通运输工具—在建运输工具”类押品，按所得税率参考填写</td>
          </tr>
        </table>
      </div>
      <div class="el-collapse-item__header">
          <span class="evalModel-title">所得税率填写参考建议</span>
        </div>
        <div class="el-collapse-item__content">
          <table>
            <tr>
                <th class="yuxp-col-1">档次</th>
                <th class="yuxp-col-1">税率</th>
                <th class="yuxp-col-3">适用企业</th>
                <th class="yuxp-col-3">备注</th>
            </tr>
            <tr>
                <td>1</td>
                <td>25%</td>
                <td>居民企业，在中国境内设立机构场所的非居民企业</td>
                <td></td>
            </tr>
            <tr>
                <td>2</td>
                <td rowspan="3">20%</td>
                <td>1.符合条件的小型微利企业     </td>
                <td>对年应纳税所得额低于10万元（含10万元）的小型微利企业，其所得减按50％计入应纳税所得额，按20%的税率缴纳企业所得税</td>
            </tr>
            <tr>
                <td>3</td>
                <td>2.在中国境内未设立机构、场所的，或者虽设立机构、场所但取得的所得与其     </td>
                <td rowspan="2">非居民企业所得税率减按10%</td>
            </tr>
            <tr>
                <td>4</td>
                <td>所设机构、场所没有实际联系的非居民企业</td>
            </tr>
            <tr>
                <td>5</td>
                <td>15%</td>
                <td>国家需要重点扶持的高新技术企业</td>
                <td></td>
            </tr>
          </table>
        </div>
    </div>
  </div>
</template>

<script>
  import "@/views/evalmanage/evalModel/evalModel.css";

  export default {
    name: "projectProgressEvalModel"
  }
</script>

<style scoped>

</style>
