<template>
  <div>
    <yu-collapse>
      <div class="evalModel-content">
        <div class="el-collapse-item__header">
          <span class="evalModel-title">（土地）市场比较法基本公式</span>
        </div>
        <div class="el-collapse-item__content">
          <p>核心在于通过将待估土地使用权与比较样本的调整因素进行对比，以估值评分卡打分的形式量化各个调整因素，从而获取比较样本的总累计调整系数</p>
        </div>
        <br />
        <div class="el-collapse-item__header">
          <span class="evalModel-title">比较模板一</span>
        </div>
        <table>
          <tr>
            <th class="yuxp-col-2">比较原因</th>
            <th class="yuxp-col-1">待估押品</th>
            <th class="yuxp-col-1">对比实例一</th>
            <th class="yuxp-col-1">对比实例二</th>
            <th class="yuxp-col-1">对比实例三</th>
          </tr>
          <tr>
            <td>押品名称</td>
            <td>B0_1</td>
            <td>B1_1</td>
            <td>B2_1</td>
            <td>B3_1</td>
          </tr>
          <tr>
            <td>坐落位置</td>
            <td>B0_2</td>
            <td>B1_2</td>
            <td>B2_2</td>
            <td>B3_2</td>
          </tr>
          <tr>
            <td>土地使用权面积</td>
            <td>B0_3</td>
            <td>/</td>
            <td>/</td>
            <td>/</td>
          </tr>
          <tr>
            <td>估值单价（元/平方米）</td>
            <td>/</td>
            <td>B1_4</td>
            <td>B2_4</td>
            <td>B3_4</td>
          </tr>
          <tr>
            <td>土地还原利率</td>
            <td colspan="4">r</td>
          </tr>
          <tr>
            <td>估值日期（年月日）</td>
            <td>B0_5</td>
            <td>B1_5</td>
            <td>B2_5</td>
            <td>B3_5</td>
          </tr>
          <tr>
            <td>土地使用权到期日（年月日）</td>
            <td>B0_6</td>
            <td>B1_6</td>
            <td>B2_6</td>
            <td>B3_6</td>
          </tr>
          <tr>
            <td>年限调整系数</td>
            <td>/</td>
            <td>f1</td>
            <td>f2</td>
            <td>f3</td>
          </tr>
        </table>

        <br />
        <div class="el-collapse-item__header">
          <span class="evalModel-title">比较模板二</span>
        </div>
        <table>
          <tr>
            <th class="yuxp-col-2">定性比较因素</th>
            <th class="yuxp-col-1">定性判断</th>
            <th class="yuxp-col-1">定量打分</th>
            <th class="yuxp-col-1">定性判断</th>
            <th class="yuxp-col-1">定量打分</th>
            <th class="yuxp-col-1">定性判断</th>
            <th class="yuxp-col-1">定量打分</th>
            <th class="yuxp-col-1">定性判断</th>
            <th class="yuxp-col-1">定量打分</th>
          </tr>
          <tr>
            <td>待估押品评估价值</td>
            <td>V</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>待估押品评估单价</td>
            <td>P0</td>
            <td></td>
            <td>/</td>
            <td></td>
            <td>/</td>
            <td></td>
            <td>/</td>
            <td></td>
          </tr>
          <tr>
            <td>比较样本调整后的市场价格</td>
            <td>/</td>
            <td></td>
            <td>P1</td>
            <td></td>
            <td>P2</td>
            <td></td>
            <td>P3</td>
            <td></td>
          </tr>
          <tr>
            <td>总累计调整因素</td>
            <td>/</td>
            <td></td>
            <td>F1</td>
            <td></td>
            <td>F2</td>
            <td></td>
            <td>F3</td>
            <td></td>
          </tr>
          <tr>
            <td>区域因素</td>
            <td>B0_9</td>
            <td>S0_9</td>
            <td>B1_9</td>
            <td>S1_9</td>
            <td>B2_9</td>
            <td>S2_9</td>
            <td>B3_9</td>
            <td>S3_9</td>
          </tr>
          <tr>
            <td>估值日期因素</td>
            <td>B0_8</td>
            <td>S0_8</td>
            <td>B1_8</td>
            <td>S1_8</td>
            <td>B2_8</td>
            <td>S2_8</td>
            <td>B3_8</td>
            <td>S3_8</td>
          </tr>
          <tr>
            <td>区域因素</td>
            <td>B0_7</td>
            <td>S0_7</td>
            <td>B1_7</td>
            <td>S1_7</td>
            <td>B2_7</td>
            <td>S2_7</td>
            <td>B3_7</td>
            <td>S3_7</td>
          </tr>
        </table>

        <br />
        <div class="el-collapse-item__header">
          <span class="evalModel-title">关键字段参数取值建议</span>
        </div>
        <table>
          <tr>
            <th class="yuxp-col-1">参数名称</th>
            <th class="yuxp-col-3">建议取值范围</th>
          </tr>
          <tr>
            <td>土地还原利率</td>
            <td>5%-8%</td>
          </tr>
          <tr>
            <td>交易情况因素</td>
            <td>根据修正的定性判断与定量打分规则人工选择</td>
          </tr>
          <tr>
            <td>估值日期因素</td>
            <td>根据修正的定性判断与定量打分规则人工选择</td>
          </tr>
          <tr>
            <td>区域因素</td>
            <td>根据修正的定性判断与定量打分规则人工选择</td>
          </tr>
        </table>

        <br />
        <div class="el-collapse-item__header">
          <span class="evalModel-title">公式说明</span>
        </div>
        <p>年限调整系数计算公式如下：</p>
        <br />
        <p>f1=[1-1/(1+r)^(B0_6-B0_5)]/[1-1/(1+r)^(B1_6-B1_5)]</p>
        <br />
        <p>f2=[1-1/(1+r)^(B0_6-B0_5)]/[1-1/(1+r)^(B2_6-B2_5)]</p>
        <br />
        <p>f3=[1-1/(1+r)^(B0_6-B0_5)]/[1-1/(1+r)^(B3_6-B3_5)]</p>
        <br />
        <p>其中r为土地还原利率，即将土地产生的未来纯收益还原为某一期日的土地价格的比率。</p>
        <br />
        <p>F3=[100/ S3_4×?% + 100/ S3_5×?% + 100/ S3_6×?% + 100/ S3_7×?% + 100/ S3_8×?% + 100/ S3_9×?% + 100/ S3_10×?% + 100/ S3_11×?% + 100/ S3_12×?% + 100/ S3_13×?%</p>
        <br />
        <p>总累积调整系数：</p>
        <br />
        <p>总累计调整系数=交易情况调整系数×估值日期调整系数×区域因素调整系数×年限调整系数，即</p>
        <br />
        <p>F1=(100/ S1_7)×(100/ S1_8)×(100/ S1_9)×f1</p>
        <br />
        <p>F2=(100/ S2_7)×(100/ S2_8)×(100/ S2_9)×f2</p>
        <br />
        <p>F3=(100/ S3_7)×(100/ S3_8)×(100/ S3_9)×f3</p>
        <br />
        <p>比较样本调整后的市场单价＝比较样本调整前的市场单价×总累积调整系数</p>
        <br />
        <p>P1＝B1_4×F1，P2＝B4_3×F2，P3＝B4_3×F3</p>
        <br />
        <p>待估押品评估单价＝average(比较样本调整后单价)</p>
        <br />
        <p>P0＝average (P1+P2+P3)</p>
        <br />
        <p>待估押品评估价值＝待估押品评估单价×土地使用权面积</p>
        <br />
        <p>V＝P0×B0_3</p>
      </div>
      <div>
        <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
      </div>
    </yu-collapse>
  </div>
</template>
<script>
import d1BBillcard from "./landEvalModel_d1_B_BillCard.vue";
import "@/views/evalmanage/evalModel/evalModel.css";
export default {
  components: { d1BBillcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_B_BillCard: null
    };
  },
  provide() {
    return {
      confirm: this.confirm
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      // 创建卡片一
      let scoreSetCard = (this.d1_B_BillCard = this.$refs.d1_B_BillCard);

      scoreSetCard.setItemEditable("*", false);
      scoreSetCard.queryDataByCondition("ttype=02");
    },

    confirm() {
      this.$dialog.open("修改", "evalmanage/evalModel/landScoreSetIndex", -1, -1, null);
    }
  }
};
</script>
