<template>
    <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 特定产品业务分析：小企业——担保融（企业类） rpt_spd_anys_dbr_corp   rptSpdAnysDbrCorp
  -->
  <div class="group-form">
      <yu-panel title="小企业——担保融（企业类）" panel-type="simple" >
        <yu-xform ref="rptSpdAnysDbrPersonOperForm11" label-width="240px"  v-model="formdataRptSpdAnysDbrCorp11" :disabled="op =='VIEW'">
          <yu-panel title="1.经营场所类型（建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="流水号" name="serno" ctype="input"  hidden></yu-xform-item>
              <yu-xform-item label="主要实际控制人是否常住本地" name="isResidentLocally" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
              <yu-xform-item label="企业及实际控制人征信信用情况说明" name="cioeaac" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="本地居住年限" name="localResidYears" ctype="input"  ></yu-xform-item>
              <yu-xform-item label="主要实际控制人从业年限" name="actualMajorWorkYears" ctype="input"  ></yu-xform-item>
              <yu-xform-item label="担保公司名称" name="guarCorpName" ctype="input"  ></yu-xform-item>
              <yu-xform-item label="担保公司内部评级" name="guarCorpInnerGrade" ctype="select" data-code="STD_ZB_GRADE_RANK"  ></yu-xform-item>
              <yu-xform-item label="担保公司外部评级" name="guarCorpOuterGrade" ctype="select" data-code="STD_ZB_GRADE_RANK"  ></yu-xform-item>
              <yu-xform-item label="经营场所类型" name="busiPremiseType" ctype="input" ></yu-xform-item>
              <yu-xform-item label="备注" name="busiPremiseTypeRemark" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="2.经营场所变更次数（建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="经营场所变更次数" name="busiPremiseChgTimes" ctype="input" ></yu-xform-item>
              <yu-xform-item label="经营场所变更次数备注" name="busiPremiseChgTimesRemark" ctype="textarea"  ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="3.区域多元化(省份个数）（钢贸业、建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="区域多元化省份个数" name="rdpCount" ctype="input" ></yu-xform-item>
              <yu-xform-item label="备注" name="rdpCountRemark" ctype="textarea"  ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="4.区域多元化（城市个数）（仅建筑业需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="区域多元化城市个数" name="rdcCount" ctype="input" ></yu-xform-item>
              <yu-xform-item label="备注" name="rdcCountRemark" ctype="textarea"  ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="5.企业上年度所有供应商的总供应量（服务业、建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="企业上年度所有供应商的总供应量" name="lastYearSupSum" ctype="input" ></yu-xform-item>
              <yu-xform-item label="备注" name="lastYearSupSumRemark" ctype="textarea"  ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="6.去年企业供货总额占比前三的供应商名称（服务业无需填写）" panel-type="simple" >
            <yu-xform-group :column="3">
              <yu-xform-item label="供应商1名称" name="topsup1CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商1合作年限" name="topsup1CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商1上年供应量" name="topsup1Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="供应商2名称" name="topsup2CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商2合作年限" name="topsup2CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商2上年供应量" name="topsup2Income" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
              <yu-xform-item label="供应商3名称" name="topsup3CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商3合作年限" name="topsup3CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商3上年供应量" name="topsup3Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="备注" name="supplierDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="7.去年企业销售收入占比前三的客户名称（非钢贸批发零售业、服务业、建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="3">
              <yu-xform-item label="客户1名称" name="topsell1CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户1合作年限" name="topsell1CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户1销售收入" name="topsell1Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="客户2名称" name="topsell2CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户2合作年限" name="topsell2CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户2销售收入" name="topsell2Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="客户3名称" name="topsell3CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户3合作年限" name="topsell3CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户3销售收入" name="topsell3Income" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
              <yu-xform-item label="备注" name="sellcusDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="8.超过90天应收账款余额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="超过90天应收账款余额" name="arbo90Days" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="备注" name="arbo90DaysDesc" ctype="textarea"  ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="9.超过180天应收账款余额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="超过180天应收账款余额" name="arbo180Days" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="备注" name="arbo180DaysDesc" ctype="textarea"  ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="10.去年耗用量能耗值（钢贸业、非钢贸批发零售业、服务业、建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="3">
              <yu-xform-item label="去年电力耗值" name="lastYearElValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="去年煤炭耗值" name="lastYearColValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="去年天然气耗值" name="lastYearGasValue" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="去年水耗值" name="lastYearWaterValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="去年其他能源耗值" name="lastYearOtherValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="去年能耗说明" name="lastYearEnergyDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="11.前年耗用量能耗值（钢贸业、非钢贸批发零售业、服务业、建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="前年电力耗值" name="lastTwoYearElValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="前年煤炭耗值" name="lastTwoYearColValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="前年天然气耗值" name="lastTwoYearGasValue" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="前年水耗值" name="lastTwoYearWaterValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="前年其他能源耗值" name="lastTwoYearOtherValue"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="前年能耗说明" name="lastTwoYearEnergyDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="12.发放工资总额" panel-type="simple" >
            <yu-xform-group :column="3">
              <yu-xform-item label="发放工资当期月份" name="payWagesMonth"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="发放工资当前总额" name="payWagesCur"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="发放工资总额" name="payWagesTotal" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="备注" name="payWagesRemark" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="13.企业去年纳税总额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="企业去年纳税总额" name="lastYearTaxTotal"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="企业去年纳税总额说明" name="lastYearTaxDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="14.企业前年纳税总额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="企业前年纳税总额" name="lastTwoYearTaxTotal"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="企业前年纳税总额说明" name="lastTwoYearTaxDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="15.营业收入（可核实部分）" panel-type="simple" >
            <yu-xform-group :column="3">
              <!--营业收入当前月份   和   营业收入当前月  这两个字段的注释，应该有一个不对-->
              <yu-xform-item label="营业收入当前月份" name="businessIncomeCurMonth"  ctype="input" ></yu-xform-item>
              <yu-xform-item label="营业收入当前月" name="curMonthBusinessIncome"  ctype="input" ></yu-xform-item>
              <yu-xform-item label="营业收入去年" name="lastYearBusinessIncome"  ctype="input" ></yu-xform-item>
              <yu-xform-item label="营业收入说明" name="businessIncomeRemark" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="16.企业在我行结算账户的销售回款" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="企业在我行结算账户的销售回款" name="scosaoeiob"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="企业在我行结算账户的销售回款说明" name="scosaoeiobDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="17.企业及实际控制人征信信用情况" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="贷款本金逾期次数" name="overdueLoanPrincipalTimes"  ctype="input" ></yu-xform-item>
              <yu-xform-item label="贷款本金逾期最长天数" name="loanPrincipalLongestOverdueDays" ctype="input" ></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="1">
              <yu-xform-item label="贷款欠息记录次数" name="recordTimesOfLoanInterest"  ctype="input" ></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="信用卡累积逾期次数" name="creditCardAccumulatedOverdueTimes"  ctype="input" ></yu-xform-item>
              <yu-xform-item label="最高累积逾期次数" name="maximumCumulativeOverdueTimes" ctype="input" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="18.对外保证金额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="对外保证金额" name="extGuaranteeAmt"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="对外保证金额说明" name="extGuaranteeAmtDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="19.对外抵押金额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="对外抵押金额" name="extMortgageAmt"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="对外抵押金额说明" name="extMortgageAmtDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="20.对外质押金额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="对外质押金额" name="extPledgeAmt"  ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="对外质押金额说明" name="extPledgeAmtDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="其他重点关注调查内容"  panel-type="simple" >
            <yu-panel title="合规经营" panel-type="simple" >
              <yu-xform-group :column="1" class="focusDDrgrjyds" >
                <yu-xform-item label="1．企业是否按时交纳各项税款，有无被税务机关查处和处罚"   name="focusDdryq1" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="2．企业有无违规排污，是否切实做好环保治理工作，有无被环保部门查处和处罚"  name="focusDdryq2" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="3．企业实际控制人有无吸毒、赌博等不良嗜好，有无经常往返澳门等地，其信用卡是否经常在境外大额支付等" name="focusDdryq3" ctype="select" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                <yu-xform-item label="4．企业实际控制人是否存在炒房、炒原材料、炒股票期货等投机行为" name="focusDdryq4" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="5．企业员工人数是否稳定，有无出现明显裁员情况，员工待遇是否合理" name="focusDdryq5" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px"></yu-xform-item>
                <yu-xform-item label="6．有无异常工商股权变更情况" name="focusDdryq6" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="7．有无其他影响企业稳定经营的情况" name="focusDdryq7" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="8．其它不利情况请简述" name="focusDdryq8" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="反担保情况" panel-type="simple" >
              <yu-xform-group :column="2">
                <yu-xform-item label="反担保实物资产状态查询结果、变现能力评价" name="focusDdryq9" ctype="textarea"  ></yu-xform-item>
                <yu-xform-item label="反担保人评价（如有）" name="focusDdryq10" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="其他" panel-type="simple" >
              <yu-xform-group :column="2">
                <yu-xform-item label="担保融个人经营贷其他说明" name="focusDdryq11" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="调查结论" panel-type="simple" >
              <yu-xform-group :column="2">
                <yu-xform-item label="担保融个人经营贷调查结论" name="focusDdryq12" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-panel>
        </yu-xform>
      </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GRADE_RANK');
let obj = {};
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String,
    param: Object // 需要添加此行业代码
  },
  data: function () {
    return {
      formdataRptSpdAnysDbrCorp11: {}
    };
  },

  mounted () {
    var _this = this;
    _this.initRptSpdAnysDbrCorp();
  },

  methods: {

    initRptSpdAnysDbrCorp: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysdbrcorp/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.formdataRptSpdAnysDbrCorp11);
            // return;
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
      var obj = _this.formdataRptSpdAnysDbrCorp11;
      obj.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysdbrcorp/save',
        data: obj,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message({
              message: '保存成功!'
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
<style>
.focusDDrgrjyds
.el-form-item__label{
text-align: left;
}
</style>
