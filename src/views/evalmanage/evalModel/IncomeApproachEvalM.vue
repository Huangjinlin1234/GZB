<template>
  <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%;height: auto;padding : 0">
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">收益法基本公式</span>
      </div>
      <div class="el-collapse-item__content">
        <p>对于押品类型为经营或租赁型房地产的情况，公式为：</p>
        <p>评估价值=年租金 × [ 1 - 1 / ( 1 + 折现率 ) ^ 剩余收益期限 ] / 折现率</p>
        <p>年租金=实际年租金 × ( 1 - 待估押品类似物业平均空置率 ) × ( 1 - 房产税率-营业税及附加税率 - 管理费率 - 其他费率 ) × ( 1 - 所得税率 )</p>
      </div>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">关键字说明</span>
      </div>
      <div class="el-collapse-item__content">
        <p>1. 待估押品类似物业平均空置率：是基于现状和掌握的资料，预测剩余期限内平均空置率水平</p>

        <p>2. 管理费率：是指为组织和管理物业的经营活动的必要支出，包括管理人员工资及福利费、办公费、差旅费等，在估价中一般按年租金的一定比例计算</p>

        <p>3. 折现率：在初评阶段，折现率由客户经理手工填写；在重估阶段，由系统自动读取该笔业务的执行贷款利率作为折现率</p>

        <p>4. 剩余收益期限：对于经营或租赁型房地产，应取抵押时的物业剩余使用寿命年限及合同规定的剩余使用年限的孰小值，合理确定其剩余收益期限。以年为单位</p>
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
            <td>待估押品类似物业平均空置率</td>
            <td>根据押品实际情况，人工计算填写</td>
          </tr>
          <tr>
            <td>房产税率</td>
            <td>按相关法律及会计准则选取合适的值进行计算，通常为12%</td>
          </tr>
          <tr>
            <td>营业税及附加税费率</td>
            <td>按相关法律及会计准则选取合适的值进行计算，通常为5.5%</td>
          </tr>
          <tr>
            <td>管理费率</td>
            <td>默认2%</td>
          </tr>
          <tr>
            <td>其他费率</td>
            <td>若有则根据实际情况填写</td>
          </tr>
          <tr>
            <td>折现率</td>
            <td>在初评阶段，建议参照该类业务总体偏向保守的利率水平，例如在基准利率基础上上浮20%到30%</td>
          </tr>
          <tr>
            <td>所得税率</td>
            <td>根据参考建议，人工填写</td>
          </tr>
          <tr>
            <td>剩余收益年限</td>
            <td>=MIN[抵押时的剩余使用年限，合同规定的剩余使用年限]-抵押后已使用年限。其中各类房屋的使用寿命根据参考建议确定</td>
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
            <th class="yuxp-col-4">适用企业</th>
            <th class="yuxp-col-5">备注</th>
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
            <td>1.符合条件的小型微利企业</td>
            <td>对年应纳税所得额低于10万元（含10万元）的小型微利企业，其所得减按50％计入应纳税所得额，按20%的税率缴纳企业所得税</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2.在中国境内未设立机构、场所的，或者虽设立机构、场所但取得的所得与其</td>
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
          <tr>
            <td>简易结构</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/views/evalmanage/evalModel/evalModel.css";

  export default {
    name: "IncomeApproachEvalM"
  }
</script>

<style scoped>

</style>
