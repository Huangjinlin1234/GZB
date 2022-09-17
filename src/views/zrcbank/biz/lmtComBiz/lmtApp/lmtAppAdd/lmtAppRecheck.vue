<template>
  <div>
    <yu-panel title="循环授信额度复审表"  :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'" :form-type="viewType">
        <yu-xform-group :column="2">
          <yu-xform-item label="授信申请流水号" ctype="input" name="lmtSerno" disabled></yu-xform-item>
          <yu-xform-item label="授信期限(月)" ctype="input" name="lmtTerm" disabled></yu-xform-item>
          <yu-xform-item label="上期授信生效日期" ctype="input" name="oldLmtStartDate" disabled></yu-xform-item>
          <yu-xform-item label="上期授信期限" ctype="input" name="oldLmtTerm" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="一.基本情况"  :hideFilter="false" :collapseHide="false">
          <yu-panel title="授信情况"  :hideFilter="false" :collapseHide="false">
            <yu-xtable :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border
                 :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" row-number>
              <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
              <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtBizTypeName" label="授信品种" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtBizTypeProp" label="产品类型属性" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
              <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
              <yu-xtable-column prop="contAmt" label="目前用信净额" ></yu-xtable-column>
              <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            </yu-xtable>
            <yu-xform-group :column="2">
              <yu-xform-item label="授信额度合计" ctype="input" name="subSumAmt" disabled></yu-xform-item>
              <yu-xform-item label="用信净额合计" ctype="input" name="subPrdSumAmt" disabled></yu-xform-item>
            </yu-xform-group>
            <!--<yu-xtable ref="refTable" show-summary :summary-method="getSummaries"  row-number :data-url="dataUrl" condition-key="condition" :base-params="baseParams" selection-type="radio" request-type="POST">
              <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
              <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
              <yu-xtable-column label="授信净额" prop="lmtAmt"></yu-xtable-column>
              <yu-xtable-column label="目前用信净额" prop="contAmt"></yu-xtable-column>
              <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            </yu-xtable>-->
          </yu-panel>
          <yu-xform-group :column="1">
            <yu-xform-item label="授信申请流水号" ctype="input" name="lmtSerno" hidden="true"></yu-xform-item>
            <yu-xform-item label="环境情况是否达标" ctype="radio" :disabled="type=='VIEW'" rules="required" data-code="STD_ZB_YES_NO" name="enviConFlag"></yu-xform-item>
            <yu-xform-item label="是否涉农" ctype="radio" :disabled="type=='VIEW'" rules="required" data-code="STD_ZB_YES_NO" name="agriFlag"  ></yu-xform-item>
            <yu-xform-item label="是否小微" ctype="radio" :disabled="type=='VIEW'" rules="required" data-code="STD_ZB_YES_NO" name="smallInd"  ></yu-xform-item>
            <yu-xform-item label="是否制造业" ctype="radio" :disabled="type=='VIEW'" rules="required" data-code="STD_ZB_YES_NO" name="manuInd"  ></yu-xform-item>
            <yu-xform-item label="是否为九大行业" ctype="radio" :disabled="type=='VIEW'" rules="required" data-code="STD_ZB_YES_NO" name="nineInduFlag"  ></yu-xform-item>
            <yu-xform-item label="客户内部分类" ctype="radio" :disabled="type=='VIEW'" rules="required" data-code="CUS_CIFC_TYPE" name="cusInterClass"  ></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="二.企业经营及财务变化情况" :hideFilter="false" :collapseHide="false">
            <yu-panel title="1.企业股权是否发生变更"  :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="1">
                <yu-xform-item label="企业股权是否发生变更" ctype="radio" :disabled="type=='VIEW'" rules="required" data-code="STD_ZB_YES_NO" name="enterpriseEqyityHasChange"  @change="change1"></yu-xform-item>
                <yu-xform-item label="企业股权变更情况说明" ctype="textarea" name="enterpriseEqyityChangeInst"  :hidden="enterpriseEqyityChangeInstShow"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="2.企业经营变动情况"  :hideFilter="false" :collapseHide="false">
              <yu-xtable ref="refTable2" row-number :data-url="dataUrl2" :base-params="baseParam2" selection-type="radio" :pageable="false" request-type="POST">
                <yu-xtable-column label="serno" prop="serno" hide-column></yu-xtable-column>
                <yu-xtable-column label="" prop="itemName"></yu-xtable-column>
                <yu-xtable-column :label="xtableData1" prop="lastSecondValue" ctype="yu-num"></yu-xtable-column>
                <yu-xtable-column :label="xtableData2" prop="lastFirstValue" ctype="yu-num"></yu-xtable-column>
                <yu-xtable-column :label="xtableData3" prop="nowValue" ctype="yu-num"></yu-xtable-column>
                <yu-xtable-column prop="todo" label="操作" width="120">
                  <template slot-scope="scope">
                    <a class="underline" style="text-decoration:none" v-if="type!='VIEW'" @click="saveRefTable(scope.row,'refTable2')" >保存</a>
                  </template>
                </yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-xform-group :column="1">
              <yu-xform-item label="变动原因分析" ctype="textarea" rules="required" name="chageResn"  ></yu-xform-item>
              <yu-xform-item label="最新开台率情况" ctype="textarea" rules="required" name="latestOpenRateSitu"  ></yu-xform-item>
            </yu-xform-group>
            <yu-panel title="3. 近三期总融资情况"  :hideFilter="false" :collapseHide="false">
              <yu-toolBar>
                <yu-button type="primary" ref="btn_insert" v-if="type!='VIEW'" @click="addRefTable3">新增</yu-button>
                <yu-button type="primary" ref="btn_deleted" v-if="type!='VIEW'"  @click="deleteRefTable3">删除</yu-button>
              </yu-toolBar>
              <yu-xtable ref="refTable3" row-number :data-url="dataUrl2" condition-key="condition" :base-params="baseParam3" :pageable="false" selection-type="radio" request-type="POST">
                <yu-xtable-column label="pkId" prop="pkId" hide-column></yu-xtable-column>
                <yu-xtable-column label="serno" prop="serno" hide-column></yu-xtable-column>
                <yu-xtable-column label="银行/个人" prop="belongBank" ctype="input"></yu-xtable-column>
                <yu-xtable-column label="最近第二年" prop="lastTwoYearAmt" ctype="yu-num"></yu-xtable-column>
                <yu-xtable-column label="最近第一年" prop="lastYearAmt" ctype="yu-num"></yu-xtable-column>
                <yu-xtable-column label="当前年月" prop="curMonthAmt" ctype="yu-num"></yu-xtable-column>
                <yu-xtable-column label="担保方式" prop="curMonthGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                <yu-xtable-column prop="todo" label="操作" width="120">
                  <template slot-scope="scope">
                    <a class="underline" style="text-decoration:none" v-if="type!='VIEW'" @click="saveRefTable(scope.row,'refTable3')" >保存</a>
                  </template>
                </yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="4.其他重要的财务变化情况" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="授信期内是否新增大量对外投资" ctype="select" rules="required" data-code="STD_ZB_YES_NO" name="exitLargeInvestFlag"  @change="change2"></yu-xform-item>
                <yu-xform-item label="授信期内是否新增大量对外投资说明" ctype="textarea" rules="required" hidden-rule="true" name="exitLargeInvestAcc" :cols="2" :hidden="exitLargeInvestAccShow"></yu-xform-item>
                <yu-xform-item label="是否存在存货明显增加" ctype="select" data-code="STD_ZB_YES_NO" rules="required" name="increaseInventoryFlag"  @change="change3"></yu-xform-item>
                <yu-xform-item label="是否存在存货明显增加说明" ctype="textarea" rules="required" name="increaseInventoryAcc" hidden-rule="true" :hidden="increaseInventoryAccShow" :cols="2"></yu-xform-item>
                <yu-xform-item label="是否存在应收款明显增加" ctype="select" data-code="STD_ZB_YES_NO" rules="required" name="accountInventoryFlag"  @change="change4"></yu-xform-item>
                <yu-xform-item label="是否存在应收款明显增加说明" ctype="textarea" name="accountInventoryAcc" rules="required" hidden-rule="true" :hidden="accountInventoryAccShow" :cols="2"></yu-xform-item>
                <yu-xform-item label="是否与非业务单位存在大额非业务资金往来" data-code="STD_ZB_YES_NO" rules="required" ctype="select" name="nonBusinessCapTransactionsFlag"  @change="change5"></yu-xform-item>
                <yu-xform-item label="是否与非业务单位存在大额非业务资金往来说明" ctype="textarea" rules="required" name="nonBusinessCapTransactionsAcc" hidden-rule="true" :cols="2" :hidden="nonBusinessCapTransactionsAccShow"></yu-xform-item>
                <yu-xform-item label="是否存在固定资产、在建工程明显增加情况" data-code="STD_ZB_YES_NO" rules="required" ctype="select" name="fixedAssetsInventoryFlag"  @change="change6"></yu-xform-item>
                <yu-xform-item label="是否存在固定资产、在建工程明显增加情况说明" ctype="textarea" rules="required" name="fixedAssetsInventoryAcc" hidden-rule="true" :cols="2" :hidden="fixedAssetsInventoryAccShow" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-panel>
          <yu-panel title="三.非财务因素" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="是否出现过风险预警" ctype="select" rules="required" data-code="STD_ZB_YES_NO" name="riskWarningFlag"  @change="change7"></yu-xform-item>
              <yu-xform-item label="是否出现过风险预警说明" ctype="textarea" rules="required" name="riskWarningAcc" hidden-rule="true" :cols="2" :hidden="riskWarningAccShow"></yu-xform-item>
              <yu-xform-item label="公司实际控制人是否存在“涉赌、涉毒”等情况"  data-code="STD_ZB_YES_NO" rules="required" ctype="select" name="actualControllerExitHddFlag"  @change="change8"></yu-xform-item>
              <yu-xform-item label="公司实际控制人是否存在“涉赌、涉毒”等情况说明" ctype="textarea" rules="required" name="actualControllerExitHddAcc" hidden-rule="true" :cols="2" :hidden="actualControllerExitHddAccShow"></yu-xform-item>
              <yu-xform-item label="生产经营是否发生重大变化" ctype="select" data-code="STD_ZB_YES_NO" rules="required" name="majorChangeProductFlag" @change="change9"></yu-xform-item>
              <yu-xform-item label="生产经营是否发生重大变化说明" ctype="textarea" rules="required" name="majorChangeProductAcc" :cols="2" hidden-rule="true" :hidden="majorChangeProductAccShow" ></yu-xform-item>
              <yu-xform-item label="本行账户是否被查封，本行结算是否正常" ctype="select" rules="required" data-code="STD_ZB_YES_NO" name="accountSeizedFlag"  @change="change10"></yu-xform-item>
              <yu-xform-item label="本行账户是否被查封，本行结算是否正常说明" ctype="textarea" rules="required" name="accountSeizedAcc" :cols="2" hidden-rule="true" :hidden="accountSeizedAccShow"></yu-xform-item>
              <yu-xform-item label="是否存在未结案事项" ctype="select" data-code="STD_ZB_YES_NO" rules="required" name="unresolvedMattersFlag" @change="change11" ></yu-xform-item>
              <yu-xform-item label="是否存在未结案事项说明" ctype="textarea" rules="required" name="unresolvedMattersAcc" :hidden="unresolvedMattersAccShow" hidden-rule="true" :cols="2"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="四.担保情况" :hideFilter="false" :collapseHide="false">
            <div :hidden="!mainGuarWay1">
              <yu-panel title="一般公司保证担保" :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="1">
                    <yu-xform-item label="担保人名称" ctype="input" :rules="rulesMes" name="generalComAssureName"  ></yu-xform-item>
                    <yu-xform-item label="与借款人关系" ctype="select" :rules="rulesMes"  data-code="STD_ZB_RELATION" name="guarDebitRela"  ></yu-xform-item>
                    <yu-xform-item label="企业类型" ctype="radio" :disabled="type=='VIEW'" :rules="rulesMes" name="conType" data-code="STD_ZB_CORP_TYPE" ></yu-xform-item>
                </yu-xform-group>
                <yu-panel title="销售及利润情况" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable4" row-number :data-url="dataUrl2" :base-params="baseParam4" :pageable="false" selection-type="radio" request-type="POST">
                    <yu-xtable-column label="serno" prop="serno" hide-column></yu-xtable-column>
                    <yu-xtable-column label="" prop="itemName"></yu-xtable-column>
                    <yu-xtable-column :label="xtableData1" prop="lastSecondValue" ctype="yu-num"></yu-xtable-column>
                    <yu-xtable-column :label="xtableData2" prop="lastFirstValue" ctype="yu-num"></yu-xtable-column>
                    <yu-xtable-column :label="xtableData3" prop="nowValue" ctype="yu-num"></yu-xtable-column>
                    <yu-xtable-column prop="todo" label="操作" width="120">
                      <template slot-scope="scope">
                        <a class="underline" style="text-decoration:none" v-if="type!='VIEW'" @click="saveRefTable(scope.row,'refTable4')" >保存</a>
                      </template>
                    </yu-xtable-column>
                  </yu-xtable>
                </yu-panel>
                <yu-panel title="最近一期银行融资情况" :hideFilter="false" :collapseHide="false">
                  <yu-xform-group :column="4">
                    <yu-xform-item label="他行融资额度" ctype="num" :rules="rulesMes" name="otherBankLmt"  @blur="blur1"></yu-xform-item>
                    <yu-xform-item label="本行融资额度" ctype="num" :rules="rulesMes" name="ourBankLmt"  @blur="blur1"></yu-xform-item>
                    <yu-xform-item label="个人经营性贷款金额" ctype="num" :rules="rulesMes" name="limitPersonalLoansAmt"  @blur="blur1"></yu-xform-item>
                    <yu-xform-item label="合计" ctype="num" name="finaSumLmt" ></yu-xform-item>
                  </yu-xform-group>
                </yu-panel>
                <yu-panel title="对外担保情况" :hideFilter="false" :collapseHide="false">
                  <yu-xform-group :column="4">
                    <yu-xform-item label="正常" ctype="num"  :rules="rulesMes" name="normalGuarAmt" @blur="blur2"></yu-xform-item>
                    <yu-xform-item label="关注" ctype="num" :rules="rulesMes" name="focusGuarAmt" @blur="blur2"></yu-xform-item>
                    <yu-xform-item label="不良" ctype="num" :rules="rulesMes" name="badnessGuarAmt" @blur="blur2"></yu-xform-item>
                    <yu-xform-item label="合计" ctype="num" name="foreignGuarSumLmt" ></yu-xform-item>
                  </yu-xform-group>
                </yu-panel>
                <yu-xform-group :column="1">
                  <yu-xform-item label="担保能力总体评价" ctype="textarea" :rules="rulesMes" name="guarAblEval" ></yu-xform-item>
                  <yu-xform-item label="其他说明" ctype="textarea" :rules="rulesMes" name="generalComAssureAcc" ></yu-xform-item>
                </yu-xform-group>
              </yu-panel>
            </div>
            <div :hidden="!mainGuarWay2">
              <yu-panel title="抵质押担保"  :hideFilter="false" :collapseHide="false">
                <yu-xtable ref="refTable5" row-number :data-url="dataUrl2" condition-key="condition" :base-params="baseParam5" :pageable="false" selection-type="radio" request-type="POST">
                  <yu-xtable-column label="分项编号" prop="subSerno" hide-column></yu-xtable-column>
                  <yu-xtable-column label="押品编号" prop="guarNo" hide-column></yu-xtable-column>
                  <yu-xtable-column label="所有人编号" prop="guarCusId" hide-column></yu-xtable-column>
                  <yu-xtable-column label="所有人" prop="guarCusName"></yu-xtable-column>
                  <yu-xtable-column label="位置" prop="pldLocation" ></yu-xtable-column>
                  <yu-xtable-column label="押品类型" prop="guarTypeCd" :formatter="guarTypeCdFormatter"></yu-xtable-column>
                  <yu-xtable-column label="面积" prop="squ"></yu-xtable-column>
                  <yu-xtable-column label="原评估价值" prop="evalAmt"></yu-xtable-column>
                  <yu-xtable-column label="最新评估价值" prop="maxMortagageAmt"></yu-xtable-column>
                  <yu-xtable-column label="贷款金额" prop="lmtAmt" ctype="yu-num"></yu-xtable-column>
                  <yu-xtable-column label="出租/自用" prop="tenancyCirce" ctype="select" data-code="STD_TENANCY_CIRCE"></yu-xtable-column>
                  <yu-xtable-column prop="todo" label="操作" width="120">
                    <template slot-scope="scope">
                      <a class="underline" style="text-decoration:none" v-if="type!='VIEW'" @click="saveRefTable(scope.row,'refTable5')" >保存</a>
                    </template>
                  </yu-xtable-column>
                </yu-xtable>
                <yu-xform-group :column="1">
                  <yu-xform-item label="其他说明" ctype="textarea" :rules="rulesMes" name="guarAssureAcc" ></yu-xform-item>
                </yu-xform-group>
              </yu-panel>
            </div>
            <div :hidden="!mainGuarWay3">
              <yu-panel title="担保公司保证方式"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="2">
                  <yu-xform-item label="担保公司名称" ctype="input" :rules="rulesMes" name="guarComName"  ></yu-xform-item>
                  <yu-xform-item label="一类/二类" ctype="input" :rules="rulesMes" data-code="SAME_SECOND_CLASS" name="sameSecondClass"  ></yu-xform-item>
                  <yu-xform-item label="担保公司其他说明" ctype="textarea" :rules="rulesMes" name="guarComAcc"  :cols="2"></yu-xform-item>
                </yu-xform-group>
              </yu-panel>
            </div>
            <div :hidden="!mainGuarWay4">
              <yu-panel title="其它担保方式"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="1">
                  <yu-xform-item label="其它担保方式相关情况" ctype="textarea" :rules="rulesMes" name="otherGuarAcc" ></yu-xform-item>
                </yu-xform-group>
              </yu-panel>
            </div>
          </yu-panel>
        <yu-panel title="五、客户经理审核意见"  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="1、结合授信申请人财务、非财务因素作综合分析" ctype="textarea" rules="required" name="inteAnaly"  ></yu-xform-item>
            <yu-xform-item label="2、对贷款偿还存在的不利因素及相关风险控制意见" ctype="textarea" rules="required" name="controlOpinion"  ></yu-xform-item>
            <yu-xform-item label="3、结论（调查人同意的复审授信额度、业务品种、担保方式、金额、利/费率、保证金情况等）" ctype="textarea" rules="required" name="restDesc"  ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-panel>
    </yu-xform>
  </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'" type="primary" @click="tempSave">暂存</yu-button>
      <yu-button v-if="type!='VIEW'" type="primary" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="printFn">打印</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,CUS_CIFC_TYPE,STD_RENT_FLAG');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      mainGuarWay1: false, // 主担保方式
      mainGuarWay2: false,
      mainGuarWay3: false,
      mainGuarWay4: false,
      enterpriseEqyityChangeInstShow: true,
      exitLargeInvestAccShow: true,
      increaseInventoryAccShow: true,
      accountInventoryAccShow: true,
      nonBusinessCapTransactionsAccShow: true,
      fixedAssetsInventoryAccShow: true,
      riskWarningAccShow: true,
      actualControllerExitHddAccShow: true,
      majorChangeProductAccShow: true,
      accountSeizedAccShow: true,
      unresolvedMattersAccShow: true,
      xtableData1: '',
      xtableData2: '',
      xtableData3: '',
      dataUrl: backend.cmisBiz + '/api/lmtrecheckdetail/queryLmtAndLoanConditionByLmtSerno',
      baseParams: {serno: this.$route.meta.params.serno},
      dataUrl2: backend.cmisBiz + '/api/lmtrecheckdetail/queryenterprisechangedata',
      baseParam2: {serno: this.$route.meta.params.serno, refTable: 'refTable2'},
      baseParam3: {serno: this.$route.meta.params.serno, refTable: 'refTable3'},
      baseParam4: {serno: this.$route.meta.params.serno, refTable: 'refTable4'},
      baseParam5: {serno: this.$route.meta.params.serno, refTable: 'refTable5'},
      serno: '',
      replySubList: [], // 分项列表
      DZDataObject: {},
      rulesMes: [
        {
          required: false
        }
        // { validator: validator.speChar }
      ],
      lastFncReport: null
    };
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      async: false,
      data: {
        optType: 'STD_DZY_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data.data, this.DZData);
        console.log('res.data------------->', res.data);
      }
    });
  },
  mounted () {
    this.initForm();
    this.afterInit();
    this.getSubAndPrdBySerno();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.$route.meta.params.serno;
      var op = _this.$route.meta.params.op;

      _this.type = op;
      if (!op && (_this.$route.meta.params.type == 'DONE' || _this.$route.meta.params.type == 'HIS')) {
        _this.type = 'VIEW';
      }
      if (!serno || serno === '') {
        serno = _this.getFactory().contextData.instanceInfo.bizId;
        _this.type = 'VIEW';
      }
      // 表单初始化
      _this.baseFormdata1.lmtSerno = serno;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtrecheckdetail/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
            // 初始化 合计
            let otherBankLmt = this.baseFormdata1.otherBankLmt;
            let ourBankLmt = _this.baseFormdata1.ourBankLmt;
            let limitPersonalLoansAmt = _this.baseFormdata1.limitPersonalLoansAmt;
            _this.baseFormdata1.finaSumLmt = parseFloat(otherBankLmt) + parseFloat(ourBankLmt) + parseFloat(limitPersonalLoansAmt);
            let normalGuarAmt = _this.baseFormdata1.normalGuarAmt;
            let focusGuarAmt = _this.baseFormdata1.focusGuarAmt;
            let badnessGuarAmt = _this.baseFormdata1.badnessGuarAmt;
            _this.baseFormdata1.foreignGuarSumLmt = parseFloat(normalGuarAmt) + parseFloat(focusGuarAmt) + parseFloat(badnessGuarAmt);
          });
        }
      });
      // 表单个别字段
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {serno: serno},
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.baseFormdata1.lmtTerm = response.data.lmtTerm;
            _this.getLastReportInfo(response.data.cusId);
          }
        }
      });
    },

    afterInit () {
      let _this = this;
      let serno = _this.$route.meta.params.serno;
      // 查询分项 主担保信息
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappr/afterinitcontrolpanelshoworhide',
        data: {serno: serno},
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            // 控制担保情况模块
            if (response.data.mainGuarWay1) {
              _this.mainGuarWay1 = response.data.mainGuarWay1;
            }
            if (response.data.mainGuarWay2) {
              _this.mainGuarWay2 = response.data.mainGuarWay2;
            }
            if (response.data.mainGuarWay3) {
              _this.mainGuarWay3 = response.data.mainGuarWay3;
            }
            if (response.data.mainGuarWay4) {
              _this.mainGuarWay4 = response.data.mainGuarWay4;
            }
            // 上期授信信息
            if (response.data.oldLmtStartDate) {
              _this.baseFormdata1.oldLmtStartDate = response.data.oldLmtStartDate;
            }
            if (response.data.oldLmtTerm) {
              _this.baseFormdata1.oldLmtTerm = response.data.oldLmtTerm;
            }
          }
        }
      });
    },

    // 获取最近一期完成的财报
    getLastReportInfo: function (cusId) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/last',
        data: {cusId: cusId},
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.lastFncReport = response.data;
            if (_this.lastFncReport.statPrd) {
              _this.xtableData1 = _this.lastFncReport.statPrd.substring(0, 4) - 2 + '年';
              _this.xtableData2 = _this.lastFncReport.statPrd.substring(0, 4) - 1 + '年';
              _this.xtableData3 = _this.lastFncReport.statPrd.substring(0, 4) + '年' + _this.lastFncReport.statPrd.substring(4, 6) + '月';
            } else {
              _this.xtableData1 = '最近两年';
              _this.xtableData2 = '最近一年';
              _this.xtableData3 = '当年月';
            }
          } else if (!response.data) {
            // 无财报信息
          } else {
            _this.$message({message: response.message, type: 'error'});
          }
        }
      });
    },

    // 抵质押类型翻译
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    },

    getSubAndPrdBySerno: function () {
      var _this = this;
      var serno = _this.$route.meta.params.serno;
      yufp.service.request({
        method: 'POST',
        data: serno,
        url: backend.cmisBiz + '/api/lmtappsub/getsubandprdforrecheck',
        callback: function (code, message, response) {
          _this.replySubList = response.data.subList;
          _this.baseFormdata1.subSumAmt = response.data.subSumAmt;
          _this.baseFormdata1.subPrdSumAmt = response.data.subPrdSumAmt;
        }
      });
    },

    // 暂存
    tempSave: function () {
      var _this = this;
      var comitData = {};
      yufp.clone(_this.baseFormdata1, comitData);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtrecheckdetail/save',
        data: comitData,
        callback: function (code, message, response) {
          _this.$message('暂存成功');
        }
      });
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtrecheckdetail/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.doMustCheck();
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    doMustCheck: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.baseFormdata1.lmtSerno;
      obj.pageId = 'xhedfs';
      obj.pageName = '循环授信额度复审';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {

        }
      });
    },
    // 取消并返回上一页面
    printFn: function () {
      var _this = this;
      var params = _this.baseFormdata1;// 模板工厂中的参数传递
      if (params.lmtSerno == null || params.lmtSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemoxhsxedfsbdy';
      params.src = _this.$backend.frptRptService + 'DGSX-XHSXEDFSB-DY.cpt&op=view&serno=' + params.lmtSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '循环授信额度复审表（单一）',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 自定义 合计方法
    getSummaries: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) { return Number(item[column.property]) });
        if (!values.every(function (value) { return isNaN(value) })) {
          if (index === 4 || index === 5) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          }
        }
      });
      return sums;
    },

    // 表格保存
    saveRefTable (data, refTable) {
      let _this = this;
      data.refTable = refTable;
      data.serno = _this.baseFormdata1.lmtSerno;
      // 表单个别字段
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtrecheckdetail/saveRefTableData',
        data: data,
        callback: function (code, message, response) {
          if (response.data && response.data > 0) {
            _this.$message('保存成功');
          }
        }
      });
    },

    // 新增 近三期总融资情况
    addRefTable3 () {
      this.$refs.refTable3.clearValidateMessage();
      this.pushRefTable3Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable3Row: function () {
      // let userInfo = this.$xutils.getLoginUserInfo();
      let pkId = this.$xutils.getUUID();
      let row = {pkId: pkId, serno: this.baseFormdata1.lmtSerno};
      // this.currentDrawTableRow.push(row);
      this.$refs.refTable3.tabledata.push(row);
      this.$refs.refTable3.setCurrentRow(row);
    },
    // 删除 近三期总融资情况 表格数据
    deleteRefTable3 () {
      let selections = this.$refs.refTable3.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtrecheckdetail/delete/' + selections[0].pkId,
        callback: function (code, message, response) {
          if (code == 0) {
            this.$message('删除成功!');
            this.$refs.refTable3.remoteData();
          }
        }
      });
    },

    // 企业股权是否发生变更 onchang方法
    change1 (value) {
      // let enterpriseEqyityHasChange = this.baseFormdata1.enterpriseEqyityHasChange;
      if (value == '1') {
        this.enterpriseEqyityChangeInstShow = false;
      } else {
        this.enterpriseEqyityChangeInstShow = true;
      }
    },
    // 授信期内是否新增大量对外投资 onchang方法
    change2 (value) {
      // let exitLargeInvestFlag = this.baseFormdata1.exitLargeInvestFlag;
      if (value == '1') {
        this.exitLargeInvestAccShow = false;
      } else {
        this.exitLargeInvestAccShow = true;
      }
    },
    // 是否存在存货明显增加 onchang方法
    change3 (value) {
      // let increaseInventoryAcc = this.baseFormdata1.increaseInventoryAcc;
      if (value == '1') {
        this.increaseInventoryAccShow = false;
      } else {
        this.increaseInventoryAccShow = true;
      }
    },
    // 是否存在应收款明显增加 onchang方法
    change4 (value) {
      // let accountInventoryAcc = this.baseFormdata1.accountInventoryAcc;
      if (value == '1') {
        this.accountInventoryAccShow = false;
      } else {
        this.accountInventoryAccShow = true;
      }
    },
    // 是否与非业务单位存在大额非业务资金往来 onchang方法
    change5 (value) {
      // let nonBusinessCapTransactionsAcc = this.baseFormdata1.nonBusinessCapTransactionsAcc;
      if (value == '1') {
        this.nonBusinessCapTransactionsAccShow = false;
      } else {
        this.nonBusinessCapTransactionsAccShow = true;
      }
    },
    // 是否存在固定资产、在建工程明显增加情况 onchang方法
    change6 (value) {
      // let fixedAssetsInventoryAcc = this.baseFormdata1.fixedAssetsInventoryAcc;
      if (value == '1') {
        this.fixedAssetsInventoryAccShow = false;
      } else {
        this.fixedAssetsInventoryAccShow = true;
      }
    },
    // 是否出现过风险预警 onchang方法
    change7 (value) {
      if (value == '1') {
        this.riskWarningAccShow = false;
      } else {
        this.riskWarningAccShow = true;
      }
    },
    // 公司实际控制人是否存在“涉赌、涉毒”等情况 onchang方法
    change8 (value) {
      if (value == '1') {
        this.actualControllerExitHddAccShow = false;
      } else {
        this.actualControllerExitHddAccShow = true;
      }
    },
    // 生产经营是否发生重大变化 onchang方法
    change9 (value) {
      if (value == '1') {
        this.majorChangeProductAccShow = false;
      } else {
        this.majorChangeProductAccShow = true;
      }
    },
    // 本行账户是否被查封，本行结算是否正常 onchang方法
    change10 (value) {
      if (value == '1') {
        this.accountSeizedAccShow = false;
      } else {
        this.accountSeizedAccShow = true;
      }
    },
    // 是否存在未结案事项 onchang方法
    change11 (value) {
      if (value == '1') {
        this.unresolvedMattersAccShow = false;
      } else {
        this.unresolvedMattersAccShow = true;
      }
    },
    // 最近一期银行融资情况
    blur1 (value) {
      let otherBankLmt = this.baseFormdata1.otherBankLmt;
      let ourBankLmt = this.baseFormdata1.ourBankLmt;
      let limitPersonalLoansAmt = this.baseFormdata1.limitPersonalLoansAmt;
      this.baseFormdata1.finaSumLmt = parseFloat(otherBankLmt) + parseFloat(ourBankLmt) + parseFloat(limitPersonalLoansAmt);
    },
    // 对外担保情况
    blur2 (value) {
      let normalGuarAmt = this.baseFormdata1.normalGuarAmt;
      let focusGuarAmt = this.baseFormdata1.focusGuarAmt;
      let badnessGuarAmt = this.baseFormdata1.badnessGuarAmt;
      this.baseFormdata1.foreignGuarSumLmt = parseFloat(normalGuarAmt) + parseFloat(focusGuarAmt) + parseFloat(badnessGuarAmt);
    }

  }
};
</script>
