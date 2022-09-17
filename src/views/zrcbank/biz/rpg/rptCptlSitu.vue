
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
  <div v-if="!lowRisk">
    <yu-panel title="公司名下融资情况" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addCorpFn" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editCorpFn" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteCorpFn" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="corpTable" :data-url="corpUrl" show-summary :summary-method="getSummaries" :pageable="false" :base-params="corpParam" request-type="POST"  style="width: 100%">
        <yu-xtable-column prop="belongBank" label="所属行"></yu-xtable-column>
        <yu-xtable-column prop="creditType" label="信贷品种"></yu-xtable-column>
        <yu-xtable-column label="最近两年末" width="200px" >
          <yu-xtable-column prop="lastTwoYearAmt" label="金额"></yu-xtable-column>
          <yu-xtable-column prop="lastTwoYearGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="最近一年末" width="200px" >
          <yu-xtable-column prop="lastYearAmt" label="金额"></yu-xtable-column>
          <yu-xtable-column prop="lastYearGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="当前月末"  >
          <yu-xtable-column prop="curMonthAmt" label="金额"></yu-xtable-column>
          <yu-xtable-column prop="curMonthGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="curMonthFiveClass" width="100px" label="五级分类" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column prop="overdueTimes" width="100px" label="逾期次数"></yu-xtable-column>
          <yu-xtable-column prop="debtTimes" width="100px" label="欠息次数"></yu-xtable-column>
          <yu-xtable-column prop="curMonthRemark" width="120px"  label="备注"></yu-xtable-column>
        </yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="公司名下融资情况" :visible.sync="dialogCorp" width="1000px">
        <yu-xform ref="corpDialogForm" label-width="160px" v-model="dialogFormDataCorp">
          <yu-xform-group :column="2">
            <yu-xform-item label="所属行" name="belongBank" ctype="input"></yu-xform-item>
            <yu-xform-item label="信贷品种" name="creditType" ctype="input"></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="最近两年末" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="金额" name="lastTwoYearAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="担保方式" name="lastTwoYearGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="最近一年末" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="金额" name="lastYearAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="担保方式" name="lastYearGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="当前月末" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="金额" name="curMonthAmt" rules="required" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="担保方式" name="curMonthGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
              <yu-xform-item label="五级分类" name="curMonthFiveClass" ctype="select" data-code="STD_FIVE_CLASS"></yu-xform-item>
              <yu-xform-item label="逾期次数" name="overdueTimes" rules="required" ctype="yu-num" ></yu-xform-item>
              <yu-xform-item label="欠息次数" name="debtTimes" rules="required" ctype="yu-num" ></yu-xform-item>
              <yu-xform-item label="备注" name="curMonthRemark" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveCorp">保存</yu-button>
            <yu-button type="primary" @click="backCorp">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      <yu-xform ref="otherDescForm" label-width="160px" v-model="otherDescData">
        <yu-xform-group :column="2">
          <yu-xform-item label="详细描述融资波动原因" name="cptlFlucResn" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="其他说明" name="cptlSituOtherMemo" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="法人代表或实际控制人个人融资情况、信用情况" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addRepreLoanFn" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editRepreLoanFn" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteRepreLoanFn" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="repreLoanTable" row-number show-summary :summary-method="getSummaries1" :data-url="repreLoanUrl" :pageable="false" :base-params="repreLoanParam" request-type="POST">
        <yu-xtable-column prop="legalRepreCusName" label="姓名"></yu-xtable-column>
        <yu-xtable-column prop="cptlBankName" label="融资银行"></yu-xtable-column>
        <yu-xtable-column prop="cptlAmt" label="融资金额"></yu-xtable-column>
        <yu-xtable-column prop="cptlBalance" label="融资余额"></yu-xtable-column>
        <yu-xtable-column prop="overdueTimes" label="逾期次数"></yu-xtable-column>
        <yu-xtable-column prop="cptlType" label="融资品种" data-code="STD_CPTL_TYPE"></yu-xtable-column>
        <yu-xtable-column prop="enterprisesRelation" label="与企业关系" data-code="STD_ASSO_RELATION"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="法人代表或实际控制人个人融资情况、信用情况" :visible.sync="dialogRepreLoan" width="1000px">
        <yu-xform ref="repreLoanDialogForm" label-width="160px" v-model="dialogFormDataRepreLoan">
          <yu-xform-group :column="2">
            <yu-xform-item label="姓名" name="legalRepreCusName" ctype="input" rules="required"></yu-xform-item>
            <yu-xform-item label="融资银行" name="cptlBankName" ctype="input" rules="required"></yu-xform-item>
            <yu-xform-item label="融资金额" name="cptlAmt" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="融资余额" name="cptlBalance" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="逾期次数" name="overdueTimes" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="融资品种" name="cptlType" ctype="select" rules="required" data-code="STD_CPTL_TYPE"></yu-xform-item>
            <yu-xform-item label="与企业关系" name="enterprisesRelation" rules="required" ctype="select" data-code="STD_ASSO_RELATION" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveRepreLoan">保存</yu-button>
            <yu-button type="primary" @click="backRepreLoan">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
    <div v-if="situ">
      <yu-panel title="对外担保情况" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addExtGuarFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editExtGuarFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="deleteExtGuarFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="extGuarTable" row-number :data-url="extGuarUrl" show-summary :summary-method="getSummaries2" :pageable="false" :base-params="extGuarParam" request-type="POST">
          <yu-xtable-column prop="guarCha" label="性质" data-code="STD_ZB_GUAR_CHA"></yu-xtable-column>
          <yu-xtable-column prop="beGuarCorpName" label="被担保企业名称"></yu-xtable-column>
          <yu-xtable-column prop="balance" label="余额"></yu-xtable-column>
          <yu-xtable-column prop="fiveClass" label="五级分类" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column prop="beGuarCorpCurOperation" label="被担保企业目前经营情况"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="对外担保情况" :visible.sync="dialogExtGuar" width="1000px">
          <yu-xform ref="extGuarDialogForm" label-width="160px" v-model="dialogFormDataExtGuar">
            <yu-xform-group :column="2">
              <yu-xform-item label="性质" name="guarCha" ctype="select" data-code="STD_ZB_GUAR_CHA"></yu-xform-item>
              <yu-xform-item label="被担保企业名称" name="beGuarCorpName" ctype="input"></yu-xform-item>
              <yu-xform-item label="余额" name="balance" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="五级分类" name="fiveClass" ctype="select" data-code="STD_FIVE_CLASS"></yu-xform-item>
              <yu-xform-item label="被担保企业目前经营情况" name="beGuarCorpCurOperation" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveExtGuar">保存</yu-button>
              <yu-button type="primary" @click="backExtGuar">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
      <yu-panel title="或有负债情况" panel-type="simple">
        <yu-xform ref="situForm" label-width="160px" v-model="situData" :disabled="op =='VIEW'">
          <yu-panel title="行政处罚" panel-type="simple" v-if="administrativePenalty">
            <yu-xform-group :column="2" v-if="administrativePenalty">
              <yu-xform-item label="数量" name="administrativePenalty" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="administrativePenaltyDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="经营异常" panel-type="simple" v-if="abnormalOperation">
            <yu-xform-group :column="2" v-if="abnormalOperation">
              <yu-xform-item label="数量" name="abnormalOperation" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="abnormalOperationDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="环保处罚" panel-type="simple" v-if="environmentalPunishment">
            <yu-xform-group :column="2" v-if="environmentalPunishment">
              <yu-xform-item label="数量" name="environmentalPunishment" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="environmentalPunishmentDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="欠税公告" panel-type="simple" v-if="taxArrearsNotice">
            <yu-xform-group :column="2" v-if="taxArrearsNotice">
              <yu-xform-item label="数量" name="taxArrearsNotice" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="taxArrearsNoticeDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="税收违法" panel-type="simple" v-if="illegalTaxation">
            <yu-xform-group :column="2" v-if="illegalTaxation">
              <yu-xform-item label="数量" name="illegalTaxation" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="illegalTaxationDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="股权出质" panel-type="simple" v-if="equityOutPledge">
            <yu-xform-group :column="2" v-if="equityOutPledge">
              <yu-xform-item label="数量" name="equityOutPledge" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="equityOutPledgeDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="股权质押" panel-type="simple" v-if="equityPledge">
            <yu-xform-group :column="2" v-if="equityPledge">
              <yu-xform-item label="数量" name="equityPledge" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="equityPledgeDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="股权冻结" panel-type="simple" v-if="equityFreeze">
            <yu-xform-group :column="2" v-if="equityFreeze">
              <yu-xform-item label="数量" name="equityFreeze" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="equityFreezeDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="动产抵押" panel-type="simple" v-if="chattelMortgage">
            <yu-xform-group :column="2" v-if="chattelMortgage">
              <yu-xform-item label="数量" name="chattelMortgage" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="chattelMortgageDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="知识产权出质" panel-type="simple" v-if="intellectualPropertyPledge">
            <yu-xform-group :column="2" v-if="intellectualPropertyPledge">
              <yu-xform-item label="数量" name="intellectualPropertyPledge" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="intellectualPropertyPledgeDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="失信被执行人" panel-type="simple" v-if="dishonestExecutedPerson">
            <yu-xform-group :column="2" v-if="dishonestExecutedPerson">
              <yu-xform-item label="数量" name="dishonestExecutedPerson" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="异常情况说明" name="dishonestExecutedPersonDesc" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-xform-group :column="2">
            <yu-xform-item label="其他说明" name="otherDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </div>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="tempSave" v-show="op!='VIEW'">暂存</yu-button>
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
  </div>
  <div v-if="lowRisk">
      <yu-panel title="低风险版" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addLowRiskFn" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editLowRiskFn" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteLowRiskFn" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="lowRiskTable" :data="lowRiskData" :pageable="false" request-type="POST" style="width:100%">
        <yu-xtable-column prop="cusName" label="企业或个人" ></yu-xtable-column>
        <yu-xtable-column label="融资情况" style="align:center" >
          <yu-xtable-column prop="cptlSituAmt" label="总额"></yu-xtable-column>
          <yu-xtable-column prop="cptlSituSelfBankAmt" label="其中：我行"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column  >
        <yu-xtable-column prop="creditSituation" label="信用情况"></yu-xtable-column>
        </yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="低风险版" :visible.sync="dialogLowRisk" width="1000px">
        <yu-xform ref="lowRiskDialogForm" label-width="160px" v-model="dialogFormDataLowRisk">
          <yu-xform-group :column="2">
            <yu-xform-item label="企业或个人" name="cusName" rules="required" ctype="input"></yu-xform-item>
            <yu-xform-item label="融资总额" name="cptlSituAmt" rules="required" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="我行融资金额" name="cptlSituSelfBankAmt" rules="required" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="信用情况" name="creditSituation" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveLowRisk">保存</yu-button>
            <yu-button type="primary" @click="backLowRisk">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
  </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_FIVE_CLASS,STD_ZB_GUAR_CHA,STD_CPTL_TYPE,STD_ASSO_RELATION');

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      corpUrl: this.$backend.cmisBiz + '/api/rptcptlsitucorp/selectByModel',
      corpParam: { condition: JSON.stringify({ serno: this.param.serno }) },
      repreLoanUrl:
        this.$backend.cmisBiz + '/api/rptcptlsitulegalrepreloan/selectByModel',
      repreLoanParam: {
        condition: JSON.stringify({ serno: this.param.serno })
      },
      otherDescData: {},
      extGuarUrl:
        this.$backend.cmisBiz + '/api/rptcptlsituextguar/selectByModel',
      extGuarParam: { condition: JSON.stringify({ serno: this.param.serno }) },
      administrativePenalty: true,
      abnormalOperation: true,
      environmentalPunishment: true,
      taxArrearsNotice: true,
      illegalTaxation: true,
      equityOutPledge: true,
      equityPledge: true,
      equityFreeze: true,
      chattelMortgage: true,
      intellectualPropertyPledge: true,
      dishonestExecutedPerson: true,
      situData: {},
      dialogCorp: false,
      dialogFormDataCorp: {},
      corpType: '',
      dialogExtGuar: false,
      extGuarType: '',
      dialogFormDataExtGuar: {},
      dialogRepreLoan: false,
      repreLoanType: '',
      dialogFormDataRepreLoan: {},
      situ: true,
      lowRisk: false,
      dialogLowRisk: false,
      lowRiskData: [],
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    if (_this.param.situ) {
      _this.situ = _this.param.situ;
    }
    _this.lowRisk = _this.param.lowRisk;
    if (_this.lowRisk) {
      _this.initLowRisk();
    }
  },
  methods: {
    init: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      obj.cusId = _this.param.cusId;
      obj.cusName = _this.param.cusName;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitu/initCptlSitu',
        data: obj,
        callback: function (code, message, response) {
          if (code == 0) {
            if (typeof response.data.administrativePenalty == 'number') {
              _this.administrativePenalty = true;
            } else {
              _this.administrativePenalty = false;
            }
            if (typeof response.data.abnormalOperation == 'number') {
              _this.abnormalOperation = true;
            } else {
              _this.abnormalOperation = false;
            }
            if (typeof response.data.environmentalPunishment == 'number') {
              _this.environmentalPunishment = true;
            } else {
              _this.environmentalPunishment = false;
            }
            if (typeof response.data.taxArrearsNotice == 'number') {
              _this.taxArrearsNotice = true;
            } else {
              _this.taxArrearsNotice = false;
            }
            if (typeof response.data.illegalTaxation == 'number') {
              _this.illegalTaxation = true;
            } else {
              _this.illegalTaxation = false;
            }
            if (typeof response.data.equityOutPledge == 'number') {
              _this.equityOutPledge = true;
            } else {
              _this.equityOutPledge = false;
            }
            if (typeof response.data.equityPledge == 'number') {
              _this.equityPledge = true;
            } else {
              _this.equityPledge = false;
            }
            if (typeof response.data.equityFreeze == 'number') {
              _this.equityFreeze = true;
            } else {
              _this.equityFreeze = false;
            }
            if (typeof response.data.chattelMortgage == 'number') {
              _this.chattelMortgage = true;
            } else {
              _this.chattelMortgage = false;
            }
            if (
              typeof response.data.intellectualPropertyPledge == 'number'
            ) {
              _this.intellectualPropertyPledge = true;
            } else {
              _this.intellectualPropertyPledge = false;
            }
            if (typeof response.data.dishonestExecutedPerson == 'number') {
              _this.dishonestExecutedPerson = true;
            } else {
              _this.dishonestExecutedPerson = false;
            }
            yufp.clone(response.data, _this.otherDescData);
            yufp.clone(response.data, _this.situData);
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
    initLowRisk: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitulowrisk/selectByModel',
        data: {condition: JSON.stringify({serno: _this.param.serno})},
        callback: function (code, message, response) {
          _this.lowRiskData = response.data;
        }});
    },
    addLowRiskFn: function () {
      var _this = this;
      _this.dialogLowRisk = true;
    },
    backLowRisk: function () {
      var _this = this;
      _this.dialogLowRisk = false;
      _this.$refs.lowRiskDialogForm.resetFields();
    },
    editLowRiskFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.lowRiskTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogLowRisk = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataLowRisk);
      });
    },
    deleteLowRiskFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.lowRiskTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptcptlsitulowrisk/deleteLowRisk',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.initLowRisk();
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
      });
    },
    saveLowRisk: function () {
      var _this = this;
      var validate = false;
      _this.$refs.lowRiskDialogForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.dialogFormDataLowRisk.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitulowrisk/save',
        data: _this.dialogFormDataLowRisk,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogLowRisk = false;
            _this.$refs.lowRiskDialogForm.resetFields();
            _this.initLowRisk();
            return;
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
    /** 暂存 */
    tempSave: function () {
      var _this = this;
      _this.situData.cptlFlucResn = _this.otherDescData.cptlFlucResn;
      _this.situData.cptlSituOtherMemo = _this.otherDescData.cptlSituOtherMemo;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitu/updateSitu',
        data: _this.situData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '暂存成功！'
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
    },
    saveBtn: function () {
      var _this = this;
      _this.situData.cptlFlucResn = _this.otherDescData.cptlFlucResn;
      _this.situData.cptlSituOtherMemo = _this.otherDescData.cptlSituOtherMemo;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitu/updateSitu',
        data: _this.situData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
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
    },
    addCorpFn: function () {
      var _this = this;
      _this.dialogCorp = true;
      _this.corpType = 'add';
    },
    backCorp: function () {
      var _this = this;
      _this.dialogCorp = false;
      _this.$refs.corpDialogForm.resetFields();
    },
    editCorpFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.corpTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogCorp = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataCorp);
      });
      _this.corpType = 'edit';
    },
    deleteCorpFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.corpTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptcptlsitucorp/deleteCorp',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.corpTable.remoteData();
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
      });
    },
    saveCorp: function () {
      var _this = this;
      var validate = false;
      _this.$refs.corpDialogForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      if (_this.corpType == 'add') {
        _this.dialogFormDataCorp.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsitucorp/insertCorp',
          data: _this.dialogFormDataCorp,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogCorp = false;
              _this.$refs.corpDialogForm.resetFields();
              _this.$refs.corpTable.remoteData();

              return;
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
      } else if (_this.corpType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsitucorp/updateCorp',
          data: _this.dialogFormDataCorp,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogCorp = false;
              _this.$refs.corpDialogForm.resetFields();
              _this.$refs.corpTable.remoteData();
              _this.$message({
                message: '操作成功！'
              });
              return;
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
    },
    addExtGuarFn: function () {
      var _this = this;
      _this.dialogExtGuar = true;
      _this.extGuarType = 'add';
    },
    backExtGuar: function () {
      var _this = this;
      _this.dialogExtGuar = false;
      _this.$refs.extGuarDialogForm.resetFields();
    },
    editExtGuarFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.extGuarTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogExtGuar = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataExtGuar);
      });
      _this.extGuarType = 'edit';
    },
    deleteExtGuarFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.extGuarTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptcptlsituextguar/deleteExtGuar',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.extGuarTable.remoteData();
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
      });
    },
    saveExtGuar: function () {
      var _this = this;
      if (_this.extGuarType == 'add') {
        _this.dialogFormDataExtGuar.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsituextguar/insertExtGuar',
          data: _this.dialogFormDataExtGuar,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogExtGuar = false;
              _this.$refs.extGuarDialogForm.resetFields();
              _this.$refs.extGuarTable.remoteData();

              return;
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
      } else if (_this.extGuarType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsituextguar/updateExtGuar',
          data: _this.dialogFormDataExtGuar,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogExtGuar = false;
              _this.$refs.extGuarDialogForm.resetFields();
              _this.$refs.extGuarTable.remoteData();
              _this.$message({
                message: '操作成功！'
              });
              return;
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
    },
    //
    addRepreLoanFn: function () {
      var _this = this;
      _this.dialogRepreLoan = true;
      _this.repreLoanType = 'add';
    },
    backRepreLoan: function () {
      var _this = this;
      _this.dialogRepreLoan = false;
      _this.$refs.repreLoanDialogForm.resetFields();
    },
    editRepreLoanFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.repreLoanTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogRepreLoan = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataRepreLoan);
      });
      _this.repreLoanType = 'edit';
    },
    deleteRepreLoanFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.repreLoanTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/rptcptlsitulegalrepreloan/deleteRepreLoan',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.repreLoanTable.remoteData();
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
      });
    },
    saveRepreLoan: function () {
      var _this = this;
      var validate = false;
      _this.$refs.repreLoanDialogForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      if (_this.repreLoanType == 'add') {
        _this.dialogFormDataRepreLoan.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptcptlsitulegalrepreloan/insertRepreLoan',
          data: _this.dialogFormDataRepreLoan,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogRepreLoan = false;
              _this.$refs.repreLoanDialogForm.resetFields();
              _this.$refs.repreLoanTable.remoteData();

              return;
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
      } else if (_this.repreLoanType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptcptlsitulegalrepreloan/updateRepreLoan',
          data: _this.dialogFormDataRepreLoan,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogRepreLoan = false;
              _this.$refs.repreLoanDialogForm.resetFields();
              _this.$refs.repreLoanTable.remoteData();
              _this.$message({
                message: '操作成功！'
              });
              return;
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
    },
    datacodeFilterFn (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == '01' || op.key == '02' || op.key == '03' || op.key == '04') {
          return true;
        }
        return false;
      });
    },
    getSummaries: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          return Number(item[column.property]);
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 2 || index === 4 || index === 6 || index === 9 || index === 10) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        }
      });
      return sums;
    },
    getSummaries1: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          return Number(item[column.property]);
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 3 || index === 4 || index === 5) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        }
      });
      return sums;
    },
    getSummaries2: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          return Number(item[column.property]);
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 3) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        }
      });
      return sums;
    }
  }
};
</script>
