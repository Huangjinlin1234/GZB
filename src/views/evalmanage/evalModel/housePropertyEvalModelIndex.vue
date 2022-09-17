<template>
  <div>
    <yu-collapse>
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
      <span class="evalModel-title">（房产）市场比较法基本公式</span>
      </div>
      <div class="el-collapse-item__content">
      <p>核心在于通过将待房产与比较实例的调整因素进行对比，以估值评分卡打分的形式量化各个调整因素，从而获取比较实例的总累计调整系数</p>
      </div>
      <br/>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">比较模板</span>
      </div>
    <table width="792" border="0" cellpadding="0" cellspacing="0" style="width:594.00pt;border-collapse:collapse;table-layout:fixed;">
   <col width="72" span="11" style="width:54.00pt;"/>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="21" width="216" colspan="3" style="height:15.75pt;width:162.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>/</td>
    <td class="xl65" width="144" colspan="2" style="width:108.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>待估押品</td>
    <td class="xl65" width="144" colspan="2" style="width:108.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>对比实例一</td>
    <td class="xl65" width="144" colspan="2" style="width:108.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>对比实例二</td>
    <td class="xl65" width="144" colspan="2" style="width:108.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>对比实例三</td>
   </tr>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="21" colspan="3" style="height:15.75pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>押品名称</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B0_1</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B1_1</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B2_1</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B3_1</td>
   </tr>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="21" colspan="3" style="height:15.75pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>坐落位置</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B0_2</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B1_2</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B2_2</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B3_2</td>
   </tr>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="21" colspan="3" style="height:15.75pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>建筑面积</td>
    <td class="xl65" colspan="8" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B0_3</td>
   </tr>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="21" colspan="3" style="height:15.75pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>估值单价（元/平方米）</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>/</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B1_3</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B2_3</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>B3_3</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" height="19" style="height:14.25pt;" x:str>/</td>
    <td class="xl65" x:str>比较因素</td>
    <td class="xl65" x:str>权重</td>
    <td class="xl65" x:str>定性判断</td>
    <td class="xl65" x:str>定量打分</td>
    <td class="xl65" x:str>定性判断</td>
    <td class="xl65" x:str>定量打分</td>
    <td class="xl65" x:str>定性判断</td>
    <td class="xl65" x:str>定量打分</td>
    <td class="xl65" x:str>定性判断</td>
    <td class="xl65" x:str>定量打分</td>
   </tr>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="78" rowspan="4" style="height:58.50pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>区域状况</td>
    <td class="xl65" x:str>区域繁华</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_4</td>
    <td class="xl65" x:str>S0_4</td>
    <td class="xl65" x:str>B1_4</td>
    <td class="xl65" x:str>S1_4</td>
    <td class="xl65" x:str>B2_4</td>
    <td class="xl65" x:str>S2_4</td>
    <td class="xl65" x:str>B3_4</td>
    <td class="xl65" x:str>S3_4</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>交通便捷</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_5</td>
    <td class="xl65" x:str>S0_5</td>
    <td class="xl65" x:str>B1_5</td>
    <td class="xl65" x:str>S1_5</td>
    <td class="xl65" x:str>B2_5</td>
    <td class="xl65" x:str>S2_5</td>
    <td class="xl65" x:str>B3_5</td>
    <td class="xl65" x:str>S3_5</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>环境景观</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_6</td>
    <td class="xl65" x:str>S0_6</td>
    <td class="xl65" x:str>B1_6</td>
    <td class="xl65" x:str>S1_6</td>
    <td class="xl65" x:str>B2_6</td>
    <td class="xl65" x:str>S2_6</td>
    <td class="xl65" x:str>B3_6</td>
    <td class="xl65" x:str>S3_6</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>公共配置</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_7</td>
    <td class="xl65" x:str>S0_7</td>
    <td class="xl65" x:str>B1_7</td>
    <td class="xl65" x:str>S1_7</td>
    <td class="xl65" x:str>B2_7</td>
    <td class="xl65" x:str>S2_7</td>
    <td class="xl65" x:str>B3_7</td>
    <td class="xl65" x:str>S3_7</td>
   </tr>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="116" rowspan="6" style="height:87.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>实物状况</td>
    <td class="xl65" x:str>楼层情况</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_8</td>
    <td class="xl65" x:str>S0_8</td>
    <td class="xl65" x:str>B1_8</td>
    <td class="xl65" x:str>S1_8</td>
    <td class="xl65" x:str>B2_8</td>
    <td class="xl65" x:str>S2_8</td>
    <td class="xl65" x:str>B3_8</td>
    <td class="xl65" x:str>S3_8</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>朝向情况</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_9</td>
    <td class="xl65" x:str>S0_9</td>
    <td class="xl65" x:str>B1_9</td>
    <td class="xl65" x:str>S1_9</td>
    <td class="xl65" x:str>B2_9</td>
    <td class="xl65" x:str>S2_9</td>
    <td class="xl65" x:str>B3_9</td>
    <td class="xl65" x:str>S3_9</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>装修状况</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_10</td>
    <td class="xl65" x:str>S0_10</td>
    <td class="xl65" x:str>B1_10</td>
    <td class="xl65" x:str>S1_10</td>
    <td class="xl65" x:str>B2_10</td>
    <td class="xl65" x:str>S2_10</td>
    <td class="xl65" x:str>B3_10</td>
    <td class="xl65" x:str>S3_10</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>设施设备</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_11</td>
    <td class="xl65" x:str>S0_11</td>
    <td class="xl65" x:str>B1_11</td>
    <td class="xl65" x:str>S1_11</td>
    <td class="xl65" x:str>B2_11</td>
    <td class="xl65" x:str>S2_11</td>
    <td class="xl65" x:str>B3_11</td>
    <td class="xl65" x:str>S3_11</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>物业管理</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_12</td>
    <td class="xl65" x:str>S0_12</td>
    <td class="xl65" x:str>B1_12</td>
    <td class="xl65" x:str>S1_12</td>
    <td class="xl65" x:str>B2_12</td>
    <td class="xl65" x:str>S2_12</td>
    <td class="xl65" x:str>B3_12</td>
    <td class="xl65" x:str>S3_12</td>
   </tr>
   <tr height="19" style="height:14.25pt;">
    <td class="xl65" x:str>工程质量</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_13</td>
    <td class="xl65" x:str>S0_13</td>
    <td class="xl65" x:str>B1_13</td>
    <td class="xl65" x:str>S1_13</td>
    <td class="xl65" x:str>B2_13</td>
    <td class="xl65" x:str>S2_13</td>
    <td class="xl65" x:str>B3_13</td>
    <td class="xl65" x:str>S3_13</td>
   </tr>
   <tr height="36" style="height:27.00pt;mso-height-source:userset;mso-height-alt:540;">
    <td class="xl65" height="70" rowspan="2" style="height:52.50pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>权益状况</td>
    <td class="xl65" x:str>规划限制与容积率</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_14</td>
    <td class="xl65" x:str>S0_14</td>
    <td class="xl65" x:str>B1_14</td>
    <td class="xl65" x:str>S1_14</td>
    <td class="xl65" x:str>B2_14</td>
    <td class="xl65" x:str>S2_14</td>
    <td class="xl65" x:str>B3_14</td>
    <td class="xl65" x:str>S3_14</td>
   </tr>
   <tr height="34" style="height:25.50pt;">
    <td class="xl65" x:str>剩余使用年限</td>
    <td class="xl65" x:str>可编辑</td>
    <td class="xl65" x:str>B0_15</td>
    <td class="xl65" x:str>S0_15</td>
    <td class="xl65" x:str>B1_15</td>
    <td class="xl65" x:str>S1_15</td>
    <td class="xl65" x:str>B2_15</td>
    <td class="xl65" x:str>S2_15</td>
    <td class="xl65" x:str>B3_15</td>
    <td class="xl65" x:str>S3_15</td>
   </tr>
   <tr height="21" style="height:15.75pt;mso-height-source:userset;mso-height-alt:315;">
    <td class="xl65" height="21" colspan="2" style="height:15.75pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>总调整因素</td>
    <td class="xl65"></td>
    <td class="xl65" x:str>/</td>
    <td class="xl65"></td>
    <td class="xl65" x:str>F1</td>
    <td class="xl65"></td>
    <td class="xl65" x:str>F2</td>
    <td class="xl65"></td>
    <td class="xl65" x:str>F3</td>
    <td class="xl65"></td>
   </tr>
   <tr height="35" style="height:26.25pt;mso-height-source:userset;mso-height-alt:525;">
    <td class="xl65" height="35" colspan="2" style="height:26.25pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>对比实例调整后的市场价格</td>
    <td class="xl65"></td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>/</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>P1</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>P2</td>
    <td class="xl65" colspan="2" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>P3</td>
   </tr>
   <tr height="37" style="height:27.75pt;mso-height-source:userset;mso-height-alt:555;">
    <td class="xl65" height="37" colspan="2" style="height:27.75pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>待估押品评估价值 (元)</td>
    <td class="xl65" colspan="9" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>v</td>
   </tr>
  </table>
      <br/>
      <div class="el-collapse-item__header">
        <span class="evalModel-title">公式说明</span>
      </div>
      <p>1.总累积调整系数：</p>
      <br/>
      <p>F1=[100/ S1_4×?% + 100/ S1_5×?% + 100/ S1_6×?% + 100/ S1_7×?% + 100/ S1_8×?% + 100/ S1_9×?% + 100/ S1_10×?% + 100/ S1_11×?% + 100/ S1_12×?% + 100/ S1_13×?% + 100/ S1_14×?% + 100/ S1_15*?%]</p>
      <br/>
      <p>F2=[100/ S2_4×?% + 100/ S2_5×?% + 100/ S2_6×?% + 100/ S2_7×?% + 100/ S2_8×?% + 100/ S2_9×?% + 100/ S2_10×?% + 100/ S2_11×?% + 100/ S2_12×?% + 100/ S2_13×?% + 100/ S2_14×?% + 100/ S2_15*?%]</p>
      <br/>
      <p>F3=[100/ S3_4×?% + 100/ S3_5×?% + 100/ S3_6×?% + 100/ S3_7×?% + 100/ S3_8×?% + 100/ S3_9×?% + 100/ S3_10×?% + 100/ S3_11×?% + 100/ S3_12×?% + 100/ S3_13×?% + 100/ S3_14×?% + 100/ S3_15*?%]</p>
      <br/>
      <p>2.对比实例调整后的市场单价＝对比实例调整前的市场单价×总累积调整系数</p>
      <br/>
      <p>P1＝B1_3×F1，P2＝B2_3×F2，P3＝B3_3×F3</p>
      <br/>
      <p>3.待估对象评估价值＝对比实例平均的调整后单价×待估对象建筑面积</p>
      <br/>
      <p>V＝average（P1+P2+P3）×B0_3</p>
      </div>
    <div>
        <d1-b-a-billcard ref="d1_B_A_BillCard"></d1-b-a-billcard>
    </div>
    <div>
        <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
    </div>
    </yu-collapse>
  </div>
</template>
<script>
import d1BABillcard from './housePropertyEvalModel_d1_B_A_BillCard.vue'
import d1BBBillcard from './housePropertyEvalModel_d1_B_B_BillCard.vue'
import "@/views/evalmanage/evalModel/evalModel.css";
export default {
  components:{d1BABillcard, d1BBBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_B_A_BillCard: null,
      d1_B_B_BillCard: null
    }
  },
  provide(){
    return {
      weightConfirm:this.weightConfirm,
      scoreConfirm:this.scoreConfirm
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      // 创建卡片一
      let weightSetCard = this.d1_B_A_BillCard = this.$refs.d1_B_A_BillCard;

      weightSetCard.setItemEditable('*', false);
      weightSetCard.queryDataByCondition('pk=WT000001');

      // 创建卡片二
      let scoreSetCard = this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;

      scoreSetCard.setItemEditable('*', false);

      scoreSetCard.queryDataByCondition('ttype=01');
      // 实际提交创建
      // YuXP.commitCreate('yuxpservice');
    },

    weightConfirm() {
      this.$dialog.open('修改', 'evalmanage/evalModel/weightSetIndex', -1, -1, null, (data) => {
          this.$xutils.clone(data, this.d1_B_A_BillCard.formdata)
      });
    },

    scoreConfirm() {
      this.$dialog.open('修改', 'evalmanage/evalModel/houseScoreSetIndex', -1, -1, null, (data) => {
        this.$xutils.clone(data, this.d1_B_B_BillCard.formdata)
      });
    }
  }
};
</script>
