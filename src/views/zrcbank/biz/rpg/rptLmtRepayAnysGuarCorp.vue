
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 调查报告授信可行性及还款能力分析担保为公司 rpt_lmt_repay_anys_guar_corp rptLmtRepayAnysGuarCorp
  -->
  <div>
      <yu-panel title="担保人为公司" panel-type="simple">
        <yu-xform ref="rptLmtRepayAnysGuarCorpForm"  v-model="formdata" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="本次拟担保额度" name="guarAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="担保测算额度" name="guarLmtAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="担保人名称" name="guarName" ctype="input" ></yu-xform-item>
            <yu-xform-item label="担保人与借款人关系" name="guarDebitRela" ctype="input" ></yu-xform-item>
            <yu-xform-item label="法人代表" name="legal" ctype="input"></yu-xform-item>
            <yu-xform-item label="实际控制人" name="realOperCusId" ctype="input"></yu-xform-item>
            <yu-xform-item label="成立日期" name="buildDate" ctype="input"></yu-xform-item>
            <yu-xform-item label="实收资本" name="paidCapAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="企业地址" name="companyAddr" ctype="input"></yu-xform-item>
            <yu-xform-item label="是否上市企业" name="isStockCorp" ctype="input"></yu-xform-item>
            <yu-xform-item label="主营业务及主要产品" name="mainBusi" ctype="input" ></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="销售及利润情况" panel-type="simple">
            <table  cellspacing="0" cellpadding="0" border="1" width="100%">
             <colgroup class="el-table_group">
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tr height="50px">
                <td></td>
                <td>最近第二年</td>
                <td>最近第一年</td>
                <td>当前年月</td>
              </tr>
              <tr>
                <td>开票销售</td>
                <td><yu-input v-model="formdata.lastTwoYearInvoiceSalesRevenue" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.lastYearInvoiceSalesRevenue" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curYmInvoiceSalesRevenue" type="num" :formatter="formatter"></yu-input></td>
              </tr>
              <tr>
                <td>税务报表净利润</td>
                <td><yu-input v-model="formdata.lastTwoYearNetProfitInTaxStatements" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.lastYearNetProfitInTaxStatements" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curYmNetProfitInTaxStatements" type="num" :formatter="formatter"></yu-input></td>
              </tr>
              <tr>
                <td>自制报表销售</td>
                <td><yu-input v-model="formdata.lastTwoYearSelfMadeReportSales" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.lastYearSelfMadeReportSales" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curYmSelfMadeReportSales" type="num" :formatter="formatter"></yu-input></td>
              </tr>
              <tr>
                <td>自制报表净利润</td>
                <td><yu-input v-model="formdata.lastTwoYearSelfMadeReportNetProfit" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.lastYearSelfMadeReportNetProfit" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curYmSelfMadeReportNetProfit" type="num" :formatter="formatter"></yu-input></td>
              </tr>
            </table>
          </yu-panel>
          <yu-panel title="最近一期资产负债情况" panel-type="simple">
            <table  cellspacing="0" cellpadding="0" border="1" width="100%">
             <colgroup class="el-table_group">
                <col width="20%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
              </colgroup>
              <tr height="50px">
                <td></td>
                <td colspan="2">总资产</td>
                <td colspan="2">其中：固定资产</td>
                <td colspan="2">负债</td>
                <td colspan="2">净资产</td>
              </tr>
              <tr>
                <td>税务报表</td>
                <td colspan="2"><yu-input v-model="formdata.depTsTotalRessetAmt" type="num" :formatter="formatter"></yu-input></td>
                <td colspan="2"><yu-input v-model="formdata.depTsFixedAssets" type="num" :formatter="formatter"></yu-input></td>
                <td colspan="2"><yu-input v-model="formdata.depTsLiabilities" type="num" :formatter="formatter"></yu-input></td>
                <td colspan="2"><yu-input v-model="formdata.depTsPureAsset" type="num" :formatter="formatter"></yu-input></td>
              </tr>
              <tr>
                <td>自制报表</td>
                <td colspan="2"><yu-input v-model="formdata.selfRepTotalRessetAmt" type="num" :formatter="formatter"></yu-input></td>
                <td colspan="2"><yu-input v-model="formdata.selfRepFixedAssets" type="num" :formatter="formatter"></yu-input></td>
                <td colspan="2"><yu-input v-model="formdata.selfRepLiabilities" type="num" :formatter="formatter"></yu-input></td>
                <td colspan="2"><yu-input v-model="formdata.selfRepPureAsset" type="num" :formatter="formatter"></yu-input></td>
              </tr>
              <tr>
                <td rowspan="10">资产负债详情</td>
                <td>资产</td>
                <td>金额</td>
                <td>结构占比</td>
                <td>简要说明或分析</td>
                <td>负债和所有者权益</td>
                <td>金额</td>
                <td>结构占比</td>
                <td>简要说明或分析</td>
              </tr>
              <tr>
                <td>流动资产</td>
                <td><yu-input v-model="formdata.curfundAssetAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curfundAssetPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curfundAssetDesc" type="text" ></yu-input></td>
                <td>流动负债</td>
                <td><yu-input v-model="formdata.currentLiabilitiesAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.currentLiabilitiesPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.currentLiabilitiesDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>货币资金</td>
                <td><yu-input v-model="formdata.curfundPaymentAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curfundPaymentPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curfundPaymentDesc" type="text" ></yu-input></td>
                <td>短期借款</td>
                <td><yu-input v-model="formdata.shortLoanAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.shortLoanPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.shortLoanDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>应收账款</td>
                <td><yu-input v-model="formdata.debtReceivableAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.debtReceivablePerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.curfundPaymentDesc" type="text" ></yu-input></td>
                <td>应付票据</td>
                <td><yu-input v-model="formdata.billPayableAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.billPayablePerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.billPayableDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>其他应收款</td>
                <td><yu-input v-model="formdata.otherDebtReceivableAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.otherDebtReceivablePerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.otherDebtReceivableDesc" type="text" ></yu-input></td>
                <td>应付账款</td>
                <td><yu-input v-model="formdata.accountsPayableAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.accountsPayablePerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.accountsPayableDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>预付账款</td>
                <td><yu-input v-model="formdata.prepaymentsAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.prepaymentsPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.prepaymentsDesc" type="text" ></yu-input></td>
                <td>预收帐款</td>
                <td><yu-input v-model="formdata.depositReceivedAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.depositReceivedPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.depositReceivedDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>存货</td>
                <td><yu-input v-model="formdata.stockAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.stockPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.stockDesc" type="text" ></yu-input></td>
                <td>其他应付款</td>
                <td><yu-input v-model="formdata.otherPayableAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.otherPayablePerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.otherPayableDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>固定资产</td>
                <td><yu-input v-model="formdata.fixedAssetsAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.fixedAssetsPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.fixedAssetsDesc" type="text" ></yu-input></td>
                <td>长期负债</td>
                <td><yu-input v-model="formdata.longLiabilitiesAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.longLiabilitiesPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.longLiabilitiesDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>无形资产</td>
                <td><yu-input v-model="formdata.intangibleAssetsAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.intangibleAssetsPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.intangibleAssetsDesc" type="text" ></yu-input></td>
                <td>负债总额</td>
                <td><yu-input v-model="formdata.totalLiabilitiesAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.totalLiabilitiesPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.totalLiabilitiesDesc" type="text" ></yu-input></td>
              </tr>
              <tr>
                <td>其他资产</td>
                <td><yu-input v-model="formdata.otherAssetsAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.otherAssetsPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.otherAssetsDesc" type="text" ></yu-input></td>
                <td>所有者权益</td>
                <td><yu-input v-model="formdata.ownerEquityAmt" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.ownerEquityPerc" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.ownerEquityDesc" type="text" ></yu-input></td>
              </tr>
            </table>
            <yu-xform-group :column="2" style="margin-top:20px">
              <yu-xform-item label="资产负债详情其他需说明事项" name="assetDebtRateDesc" ctype="textarea" number-formatter="0,000.00" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
            <yu-panel title="最近一期银行融资情况" panel-type="simple">
            <table  cellspacing="0" cellpadding="0" border="1" width="100%">
             <colgroup class="el-table_group">
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tr height="50px">
                <td>他行</td>
                <td>本行</td>
                <td>个人经营性贷款</td>
                <td>合计</td>
              </tr>
              <tr>
                <td><yu-input v-model="formdata.otherBankCptlSitu" type="num" :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.selfBankCptlSitu" type="num" :formatter="formatter" ></yu-input></td>
                <td><yu-input v-model="formdata.operatingNetCptlSitu" type="num" :formatter="formatter" ></yu-input></td>
                <td><yu-input v-model="formdata.cptlSituSum" type="num" :formatter="formatter" ></yu-input></td>
              </tr>
            </table>
            </yu-panel>
            <yu-panel title="对外担保情况" panel-type="simple">
            <table  cellspacing="0" cellpadding="0" border="1" width="100%">
             <colgroup class="el-table_group">
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tr height="50px">
                <td>正常</td>
                <td>关注</td>
                <td>不良</td>
                <td>合计</td>
              </tr>
              <tr>
                <td><yu-input v-model="formdata.nrmlOutguarSituDesc" type="num" :formatter="formatter" ></yu-input></td>
                <td><yu-input v-model="formdata.attOutguarSituDesc" type="num"  :formatter="formatter"></yu-input></td>
                <td><yu-input v-model="formdata.badOutguarSituDesc" type="num" :formatter="formatter" ></yu-input></td>
                <td><yu-input v-model="formdata.guarSituSum" type="num" :formatter="formatter" ></yu-input></td>
              </tr>
            </table>
            </yu-panel>
              <yu-panel title="不动产描述" panel-type="simple">
                <yu-xform-group :column="2">
                  <yu-xform-item label="租用土地面积" name="rentLandSqu" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
                  <yu-xform-item label="租用厂房面积" name="rentWorkshopSqu" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>

                  <yu-xform-item label="自有土地面积" name="selfLandSqu" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
                  <yu-xform-item label="自有有证土地面积" name="selfCertLandSqu" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
                  <yu-xform-item label="自有有证土地性质" name="selfCertLandCha" ctype="input"></yu-xform-item>

                  <yu-xform-item label="房产面积" name="houseSqu" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
                  <yu-xform-item label="房产有证面积" name="certHouseSqu" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
                  <yu-xform-item label="抵押情况" name="guarSitu" ctype="textarea" :colspan="24"></yu-xform-item>
                </yu-xform-group>
              </yu-panel>
              <yu-xform-group :column="1">
                <yu-xform-item label="担保人及实际控制人信用情况" name="guarRealOperCdtExpl" ctype="textarea" ></yu-xform-item>
                <yu-xform-item label="担保能力总体评价" name="guarAblEval" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="其他说明" name="otherDesc" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
        </yu-xform>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
        </div>
      </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object,
    guarCorp: String
  },
  data: function () {
    return {
      list: [],
      formdata: [],
      op: '',
      formatter: function (money, num) {
        var num = num && num > 0 && num <= 20 ? num : 2;
        var money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        var l = money.split('.')[0].split('').reverse();
        var r = money.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      }
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.initRptLmtRepayAnysGuarCorp();
  },
  methods: {
    initRptLmtRepayAnysGuarCorp: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarcorp/selectByPkId',
        data: _this.guarCorp,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null) {
              yufp.clone(response.data, _this.formdata);
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    saveBtn: function () {
      var _this = this;
      _this.formdata.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarcorp/saveGuarCorp',
        data: _this.formdata,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功'
            });
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }
  }
};
</script>
