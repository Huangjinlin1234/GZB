<template>
    <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 特定产品业务分析：小企业——担保融（个人经营性）rpt_spd_anys_dbr_person_oper   rptSpdAnysDbrPersonOper
  -->
  <div class="group-form">
      <yu-panel title="小企业——担保融（个人经营性）" panel-type="simple" >
        <yu-xform ref="rptSpdAnysDbrPersonOperForm10" label-width="240px"  v-model="formdataRptSpdAnysDbrPersonOper10"  :disabled="op =='VIEW'">
          <yu-xform-group :column="3">
              <yu-xform-item label="担保公司名称" name="guarCorpName" ctype="input"  ></yu-xform-item>
              <yu-xform-item label="担保公司内部评级" name="guarCorpInnerGrade" ctype="select" data-code="STD_ZB_GRADE_RANK" ></yu-xform-item>
              <yu-xform-item label="担保公司外部评级" name="guarCorpOuterGrade" ctype="select" data-code="STD_ZB_GRADE_RANK" ></yu-xform-item>
            </yu-xform-group>
          <yu-panel title="经营场所类型（建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="流水号" name="serno" ctype="input"  hidden></yu-xform-item>
              <yu-xform-item label="经营场所类型" name="busiPremiseType" ctype="input" ></yu-xform-item>
              <yu-xform-item label="经营场所类型备注" name="busiPremiseTypeRemark" ctype="textarea"  label-width="400px"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营场所变更次数（建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="经营场所变更次数" name="busiPremiseChgTimes" ctype="input" ></yu-xform-item>
              <yu-xform-item label="经营场所变更次数备注" name="busiPremiseChgTimesRemark" ctype="textarea"  label-width="400px"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营企业上年度所有供应商的总供应量（服务业、建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="企业上年度所有供应商的总供应量" name="lastYearSupSum" ctype="input" ></yu-xform-item>
              <yu-xform-item label="企业上年度所有供应商的总供应量备注" name="lastYearSupSumRemark" ctype="textarea"  label-width="400px"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营企业去年供货总额占比前三的供应商名称（服务业无需填写）" panel-type="simple" >
            <yu-xform-group :column="3">
              <yu-xform-item label="供应商1名称" name="topsup1CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商1合作年限" name="topsup1CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商1上年供应量" name="topsup1Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="供应商2名称" name="topsup2CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商2合作年限" name="topsup2CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商2上年供应量" name="topsup2Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="供应商3名称" name="topsup3CusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="供应商3合作年限" name="topsup3CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="供应商3上年供应量" name="topsup3Income" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
              <yu-xform-item label="备注" name="supplierDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营企业去年销售收入占比前三的客户名称（非钢贸批发零售业、服务业、建筑业无需填写）" panel-type="simple" >
            <yu-xform-group :column="3">
              <yu-xform-item label="客户1名称" name="topsell1CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户1合作年限" name="topsell1CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户1销售收入" name="topsell1Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="客户2名称" name="topsell2CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户2合作年限" name="topsell2CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户2销售收入" name="topsell2Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="客户3名称" name="topsell3CusName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户3合作年限" name="topsell3CoopTerm" ctype="input" ></yu-xform-item>
              <yu-xform-item label="客户3销售收入" name="topsell3Income" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="备注" name="sellcusDesc" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营企业发放工资总额" panel-type="simple" >
            <yu-xform-group :column="3">
              <yu-xform-item label="去年发放工资当期月份" name="lastYearPayWagesMonth" ctype="input" ></yu-xform-item>
              <yu-xform-item label="去年发放工资当前总额" name="lastYearPayWagesCur" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="去年发放工资去年总额" name="lastYearPayWagesTotal" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="备注" name="lastYearPayWagesRemark" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="借款人及经营企业征信信用情况" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="贷款本金逾期次数" name="overdueLoanPrincipalTimes" ctype="input" ></yu-xform-item>
              <yu-xform-item label="贷款本金逾期最长天数" name="loanPrincipalLongestOverdueDays" ctype="input" ></yu-xform-item>
              <yu-xform-item label="贷款欠息记录次数" name="recordTimesOfLoanInterest" ctype="input" ></yu-xform-item>
              <yu-xform-item label="信用卡累积逾期次数" name="creditCardAccumulatedOverdueTimes" ctype="input" ></yu-xform-item>
              <yu-xform-item label="最高累积逾期次数" name="maximumCumulativeOverdueTimes" ctype="input" ></yu-xform-item>
              <yu-xform-item label="企业及实际控制人征信信用情况说明" name="cioeaac" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营企业对外保证金额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="对外保证金额" name="extGuaranteeAmt" ctype="yu-num" number-formatter="0,000.00"  ></yu-xform-item>
              <yu-xform-item label="对外保证金额说明" name="extGuaranteeAmtDesc" ctype="textarea"  label-width="400px"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营企业对外抵押金额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="对外抵押金额" name="extMortgageAmt" ctype="yu-num" number-formatter="0,000.00"  ></yu-xform-item>
              <yu-xform-item label="对外抵押金额说明" name="extMortgageAmtDesc" ctype="textarea"  label-width="400px"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营企业对外质押金额" panel-type="simple" >
            <yu-xform-group :column="2">
              <yu-xform-item label="对外质押金额" name="extPledgeAmt" ctype="yu-num" number-formatter="0,000.00"  ></yu-xform-item>
              <yu-xform-item label="对外质押金额说明" name="extPledgeAmtDesc" ctype="textarea" label-width="400px"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="其他重点关注调查内容"  panel-type="simple" >
            <yu-panel title="合规经营" panel-type="simple" >
              <yu-xform-group :column="1" class="focusDDrgrjyds" >
                <yu-xform-item label="1．企业是否按时交纳各项税款，有无被税务机关查处和处罚"   name="focusDdrgrjyd1" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="2．企业有无违规排污，是否切实做好环保治理工作，有无被环保部门查处和处罚"  name="focusDdrgrjyd2" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="3．企业实际控制人有无吸毒、赌博等不良嗜好，有无经常往返澳门等地，其信用卡是否经常在境外大额支付等" name="focusDdrgrjyd3" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="4．企业实际控制人是否存在炒房、炒原材料、炒股票期货等投机行为" name="focusDdrgrjyd4" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="5．企业员工人数是否稳定，有无出现明显裁员情况，员工待遇是否合理" name="focusDdrgrjyd5" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="6．有无异常工商股权变更情况" name="focusDdrgrjyd6" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="7．有无其他影响企业稳定经营的情况" name="focusDdrgrjyd7" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" ></yu-xform-item>
                <yu-xform-item label="8．其它不利情况请简述" name="focusDdrgrjyd8" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="反担保情况" panel-type="simple" >
              <yu-xform-group :column="2">
                <yu-xform-item label="反担保实物资产状态查询结果、变现能力评价" name="focusDdrgrjyd9" ctype="textarea"  ></yu-xform-item>
                <yu-xform-item label="反担保人评价（如有）" name="focusDdrgrjyd10" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="其他" panel-type="simple" >
              <yu-xform-group :column="2">
                <yu-xform-item label="担保融个人经营贷其他说明" name="focusDdrgrjyd11" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="调查结论" panel-type="simple" >
              <yu-xform-group :column="2">
                <yu-xform-item label="担保融个人经营贷调查结论" name="focusDdrgrjyd12" ctype="textarea" ></yu-xform-item>
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
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String,
    param: Object

  },
  data: function () {
    return {
      formdataRptSpdAnysDbrPersonOper10: {}
    };
  },

  mounted () {
    var _this = this;
    _this.initRptSpdAnysDbrPersonOper();
  },

  methods: {
    initRptSpdAnysDbrPersonOper: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysdbrpersonoper/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.formdataRptSpdAnysDbrPersonOper10);
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
      var obj = _this.formdataRptSpdAnysDbrPersonOper10;
      obj.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysdbrpersonoper/save',
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
.focusDDrgrjyds .el-form-item__label{
text-align: left;
}
</style>
