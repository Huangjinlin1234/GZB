<template>
  <div>
    <yu-panel title="优税贷"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="op =='VIEW'" :form-type="viewType">
                <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                <yu-panel title="企业简要情况"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="3">
                  <yu-xform-item label="去年销售前三客户一名称" ctype="input" name="lastYearTopsell1CusName" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户一合作年限" ctype="yu-num"  name="lastYearTopsell1CoopTerm"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户一上年度贡献销售收入" ctype="yu-num" name="lastYearTopsell1Income" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户二名称" ctype="input"  name="lastYearTopsell2CusName"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户二合作年限" ctype="yu-num" name="lastYearTopsell2CoopTerm" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户二上年度贡献销售收入" ctype="yu-num"  name="lastYearTopsell2Income"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户三名称" ctype="input" name="lastYearTopsell3CusName" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户三合作年限" ctype="yu-num"  name="lastYearTopsell3CoopTerm"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户三上年度贡献销售收入" ctype="yu-num" name="lastYearTopsell3Income" ></yu-xform-item>
                </yu-xform-group>
                <yu-xform-group :column="4">
                  <yu-xform-item label="最近二年企业主要经营场所性质" ctype="input"  name="lastTwoYearMainBusinessPremisesNature" ></yu-xform-item>
                  <yu-xform-item label="近两年经营场所变更次数" ctype="yu-num"  name="lastTwoYearBusinessPremisesChgTimes"></yu-xform-item>
                  <yu-xform-item label="企业去年收入占比不低于5%省份个数" ctype="yu-num"  name="tnopwtioeafnlt5ply"></yu-xform-item>
                  <yu-xform-item label="企业上年度所有供应商总供应量" ctype="yu-num"  name="tsoasitpy"></yu-xform-item>
                  <yu-xform-item label="超过90天应收账款余额" ctype="yu-num"  name="arbo90Days"></yu-xform-item>
                  <yu-xform-item label="超过180天应收账款余额" ctype="yu-num"  name="arbo180Days"></yu-xform-item>
                  <yu-xform-item label="去年耗用电量能耗值" ctype="yu-num"  name="lastYearEcvopcitpy"></yu-xform-item>
                  <yu-xform-item label="前年耗用电量能耗值" ctype="yu-num"  name="lastTwoTearEcvopcitpy"></yu-xform-item>
                  <yu-xform-item label="去年发放工资总额" ctype="yu-num"  name="totalWagesPaidLastYear"></yu-xform-item>
                  <yu-xform-item label="前年发放工资总额" ctype="yu-num"  name="totalWagesPaidLastTwoYear"></yu-xform-item>
                  <yu-xform-item label="企业去年纳税总额" ctype="yu-num" @change="measureLmtAmt"  name="lastYearTaxTotalAmt" rules="required"></yu-xform-item>
                  <yu-xform-item label="企业前年纳税总额" ctype="yu-num"  name="lastTwoYearTaxTotalAmt"></yu-xform-item>
                  <yu-xform-item label="可核实营业收入" ctype="yu-num"  name="verifiableOperatingIncome"></yu-xform-item>
                  <yu-xform-item label="借款人在我行结算账户销售回款" ctype="yu-num"  name="scotbsaiob"></yu-xform-item>
                  <yu-xform-item label="去年在我行日均存款" ctype="yu-num"  name="addiobly"></yu-xform-item>
                  <yu-xform-item label="去年在我行日均贷款" ctype="yu-num"  name="adliobly"></yu-xform-item>
                  <yu-xform-item label="客户对外负债" ctype="yu-num"  name="cusOutsideDebt"></yu-xform-item>
                  <yu-xform-item label="对外保证金额" ctype="yu-num"  name="outerGrtAmt"></yu-xform-item>
                  <yu-xform-item label="对外抵押金额" ctype="yu-num"  name="outerPldAmt"></yu-xform-item>
                  <yu-xform-item label="对外质押金额" ctype="yu-num"  name="outerImnAmt"></yu-xform-item>
                  <yu-xform-item label="风险评估得分" ctype="yu-num"  name="riskAssessGrade" disabled></yu-xform-item>
                  <yu-xform-item label="系统测算最大授信额度（元）" ctype="yu-num"  name="calMaxLmtAmt" disabled></yu-xform-item>
                  <yu-xform-item label="纳税评级" ctype="select" rules="required"  name="taxRate" data-code="STD_TAX_GRADE" :datacode-filter="datacodeFilterFn" @change="measureLmtAmt"></yu-xform-item>
                  <yu-xform-item label="授信额度（元）" ctype="yu-num"  name="lmtAmt"></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
                <yu-panel title="个体工商户销售收入交叉检验"  :hideFilter="false" :collapseHide="false">
                    <yu-xform-group :column="2" >
                        <yu-xform-item label="通过银行结算流水的分析，对借款人销售收入的交叉检验" ctype="input"  name="saleIncomeAnalysis"></yu-xform-item>
                        <yu-xform-item label="通过借款人纳税记录的分析，检验借款人销售收入的真实性" ctype="input"  name="taxIncomeAnalysis"></yu-xform-item>
                        <yu-xform-item label="通过存货、应收账款对借款人销售收入的交叉检验" ctype="input"  name="stockIncomeAnalysis"></yu-xform-item>
                        <yu-xform-item label="通过管理方直接获取的数据对借款人销售收入的交叉检验" ctype="input"  name="manageIncomeAnalysis"></yu-xform-item>
                    </yu-xform-group>
                </yu-panel>
         <yu-panel title="优税贷评分卡"  :hideFilter="false" :collapseHide="false">
         <yu-form-buttons align="right">
      <yu-button type="primary" @click="autoRecord2(managerType)" v-show="isEdit&&op!='VIEW'">自动评分</yu-button>
    </yu-form-buttons>
           <div class="card">
          <table  cellspacing="0" cellpadding="0" border="1" >
       <colgroup class="el-table_group">
          <col width="15%">
          <col width="15%">
          <col width="30%">
          <col width="5%">
          <col width="15%">
          <col width="10%">
          <col width="10%">
        </colgroup>
        <tr height="50px">
          <td colspan="2">具体项目名称</td>
          <td>项目具体情况对应分值</td>
          <td>分值</td>
          <td>简要情况描述</td>
          <td>主办客户经理评分</td>
          <td>协办客户经理确认</td>
        </tr>
         <tr>
            <td rowspan="23">一、征信及客户资产负债情况</td>
            <td rowspan="4" style="text-align:center"><font color="red">1.企业及实际控制人征信信用情况（权重14）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="ysdvalue1" id="ysdvalue1A" ref="ysdvalue1A" value="14" v-model="ysdValue1" :disabled="!isEdit" @click="clickValue($event,1)"/>
            <label for="ysdvalue1A">A．企业无逾期及欠息记录，且无法院执行纪录；且实际控制人无犯罪纪录，并在经营类贷款方面无欠息、逾期等不良信息。</label>
            </td>
            <td>14</td>
            <td rowspan="4">
            <textarea rows="5" v-model="ysd.pfkYsd1Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ ysd.pfkYsd1Grade1 }}</span></td>
            <td rowspan="4">{{ ysd.pfkYsd1Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue1" id="ysdvalue1B" ref="ysdvalue1B" v-model="ysdValue1" :disabled="!isEdit"  value="5" @click="clickValue($event,1)"/>
            <label for="ysdvalue1B">B.企业、实际控制人2年内有1次逾期或欠息记录，且企业无法院执行纪录，实际控制人无犯罪纪录。</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue1" id="ysdvalue1C" ref="ysdvalue1C" v-model="ysdValue1" :disabled="!isEdit" value="3" @click="clickValue($event,1)"/>
            <label for="ysdvalue1C">C.企业、实际控制人2年内有2次逾期或欠息记录，且企业无法院执行纪录，实际控制人无犯罪纪录。</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue1" id="ysdvalue1D" ref="ysdvalue1D" v-model="ysdValue1" :disabled="!isEdit" value="0" @click="clickValue($event,1)"/>
            <label for="ysdvalue1D">D．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">2.企业及实际控制人负债与核心资产比率（权重12）</td>
            <td>
            <input type="radio" name="ysdvalue2" id="ysdvalue2A" ref="ysdvalue2A" v-model="ysdValue2" disabled value="12" @click="clickValue($event,2)"/>
            <label for="ysdvalue2A">A．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值 （包括：厂房、商用房、个人住房、车辆、机器设备净值、现金、理财产品、国债等有价证券）的比率≤30%</label>
            </td>
            <td>12</td>
            <td rowspan="5">
            <textarea rows="5"  v-model="ysd.pfkYsd2Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ ysd.pfkYsd2Grade1 }}</span></td>
            <td rowspan="5">{{ ysd.pfkYsd2Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue2" id="ysdvalue2B" ref="ysdvalue2B" v-model="ysdValue2" disabled value="10" @click="clickValue($event,2)"/>
            <label for="ysdvalue2B">B．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值 （包括：厂房、商用房、个人住房、车辆、机器设备净值、现金、理财产品、国债等有价证券）的比率≤40%</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue2" id="ysdvalue2C" ref="ysdvalue2C" v-model="ysdValue2" disabled value="7" @click="clickValue($event,2)"/>
            <label for="ysdvalue2C">C．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值 （包括：厂房、商用房、个人住房、车辆、机器设备净值、现金、理财产品、国债等有价证券）的比率≤60%</label>
            </td>
            <td>7</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue2" id="ysdvalue2D" ref="ysdvalue2D" v-model="ysdValue2" disabled value="3" @click="clickValue($event,2)"/>
            <label for="ysdvalue2D">D．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值 （包括：厂房、商用房、个人住房、车辆、机器设备净值、现金、理财产品、国债等有价证券）的比率≤100%</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue2" id="ysdvalue2E" ref="ysdvalue2E" v-model="ysdValue2" disabled value="0" @click="clickValue($event,2)"/>
            <label for="ysdvalue2E">E．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值 （包括：厂房、商用房、个人住房、车辆、机器设备净值、现金、理财产品、国债等有价证券）的比率＞100%</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">3.企业及实际控制人负债与自有资产比率（权重12分）</td>
            <td>
            <input type="radio" name="ysdvalue3" id="ysdvalue3A" ref="ysdvalue3A" v-model="ysdValue3" disabled value="12" @click="clickValue($event,3)"/>
            <label for="ysdvalue3A">A．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤50%</label>
            </td>
            <td>12</td>
            <td rowspan="5">
            <textarea rows="5" v-model="ysd.pfkYsd3Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ ysd.pfkYsd3Grade1 }}</span></td>
            <td rowspan="5">{{ ysd.pfkYsd3Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue3" id="ysdvalue3B" ref="ysdvalue3B" v-model="ysdValue3" disabled value="8" @click="clickValue($event,3)"/>
            <label for="ysdvalue3B">B．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤80%</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue3" id="ysdvalue3C" ref="ysdvalue3C" v-model="ysdValue3" disabled value="6" @click="clickValue($event,3)"/>
            <label for="ysdvalue3C">C．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤100%</label>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue3" id="ysdvalue3D" ref="ysdvalue3D" v-model="ysdValue3" disabled value="4" @click="clickValue($event,3)"/>
            <label for="ysdvalue3D">D．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤150%</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue3" id="ysdvalue3E" ref="ysdvalue3E" v-model="ysdValue3" disabled value="0" @click="clickValue($event,3)"/>
            <label for="ysdvalue3E">E．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率＞150%</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">4.企业现有融资情况(包括银行、融资租赁、小贷)（权重5分）（已在我行融资的也算1家，法人个人的房贷不算）</td>
            <td>
            <input type="radio" name="ysdvalue4" id="ysdvalue4A" ref="ysdvalue4A" v-model="ysdValue4" disabled value="5" @click="clickValue($event,4)"/>
            <label for="ysdvalue4A">A.融资机构为0</label>
            </td>
            <td>5</td>
            <td rowspan="5">
            <textarea rows="5" v-model="ysd.pfkYsd4Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ ysd.pfkYsd4Grade1 }}</span></td>
            <td rowspan="5">{{ ysd.pfkYsd4Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue4" id="ysdvalue4B" ref="ysdvalue4B" v-model="ysdValue4" disabled value="4" @click="clickValue($event,4)"/>
            <label for="ysdvalue4B">B.融资机构为1家</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue4" id="ysdvalue4C" ref="ysdvalue4C" v-model="ysdValue4" disabled value="3" @click="clickValue($event,4)"/>
            <label for="ysdvalue4C">C.融资机构为2家</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue4" id="ysdvalue4D" ref="ysdvalue4D" v-model="ysdValue4" disabled value="1" @click="clickValue($event,4)"/>
            <label for="ysdvalue4D">D.融资机构为3家</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue4" id="ysdvalue4E" ref="ysdvalue4E" v-model="ysdValue4" disabled value="0" @click="clickValue($event,4)"/>
            <label for="ysdvalue4E">E.融资机构3家以上</label>
            </td>
            <td>0</td>
          </tr>
           <tr>
            <td rowspan="4">5.对外担保情况（权重6分）</td>
            <td>
            <input type="radio" name="ysdvalue5" id="ysdvalue5A" ref="ysdvalue5A" v-model="ysdValue5" disabled value="4" @click="clickValue($event,5)"/>
            <label for="ysdvalue5A">A.对外担保金额在"企业核心资产—企业负债"以内</label>
            </td>
            <td>4</td>
            <td rowspan="4">
            <textarea rows="5" v-model="ysd.pfkYsd5Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ ysd.pfkYsd5Grade1 }}</span></td>
            <td rowspan="4">{{ ysd.pfkYsd5Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue5" id="ysdvalue5B" ref="ysdvalue5B" v-model="ysdValue5" disabled value="3" @click="clickValue($event,5)"/>
            <label for="ysdvalue5B">B.对外担保金额为"企业核心资产—企业负债"的1-5倍以上</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue5" id="ysdvalue5C" ref="ysdvalue5C" v-model="ysdValue5" disabled value="2" @click="clickValue($event,5)"/>
            <label for="ysdvalue5C">C.对外担保金额为"企业核心资产—企业负债"的5-10倍以上</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue5" id="ysdvalue5D" ref="ysdvalue5D" v-model="ysdValue5" disabled value="0" @click="clickValue($event,5)"/>
            <label for="ysdvalue5D">D.对外担保金额为"企业核心资产—企业负债"的10倍以上</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="16">二、企业经营状况(30分)</td>
            <td rowspan="3">1.实际控制人从事本行业年限（权重6分）</td>
            <td>
            <input type="radio" name="ysdvalue6" id="ysdvalue6A" ref="ysdvalue6A" v-model="ysdValue6" disabled value="6" @click="clickValue($event,6)"/>
            <label for="ysdvalue6A">A．5年（含）以上</label>
            </td>
            <td>6</td>
            <td rowspan="3">
            <textarea rows="5" v-model="ysd.pfkYsd6Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ ysd.pfkYsd6Grade1 }}</span></td>
            <td rowspan="3">{{ ysd.pfkYsd6Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue6" id="ysdvalue6B" ref="ysdvalue6B" v-model="ysdValue6" disabled value="3" @click="clickValue($event,6)"/>
            <label for="ysdvalue6B">B．1年（含）以上，5年以下</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue6" id="ysdvalue6C" ref="ysdvalue6C" v-model="ysdValue6" disabled value="0" @click="clickValue($event,6)"/>
            <label for="ysdvalue6C">C．1年以下</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="3">2.企业所属行业(根据《2017年度公司业务信贷投向及规模投放指引)</td>
            <td>
            <input type="radio" name="ysdvalue7" id="ysdvalue7A" ref="ysdvalue7A" v-model="ysdValue7" disabled value="6" @click="clickValue($event,7)"/>
            <label for="ysdvalue7A">A．我行鼓励性行业企业，及大消费类（餐饮、医药、商业零售、旅游等）、流通类、高科技类</label>
            </td>
            <td>6</td>
            <td rowspan="3">
            <textarea rows="5" v-model="ysd.pfkYsd7Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span >{{ ysd.pfkYsd7Grade1 }}</span></td>
            <td rowspan="3"><span >{{ ysd.pfkYsd7Grade2 }}</span></td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue7" id="ysdvalue7B" ref="ysdvalue7B" v-model="ysdValue7" disabled value="3" @click="clickValue($event,7)"/>
            <label for="ysdvalue7B">B．适度介入调整性行业企业；（如机械设备制造业、有色及黑色金属冶炼业、纺织行业、建筑材料制造、化学原料及化学制品业、批发和零售业）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue7" id="ysdvalue7C" ref="ysdvalue7C" v-model="ysdValue7" disabled value="0" @click="clickValue($event,7)"/>
            <label for="ysdvalue7C">C．审慎介入控制性行业企业；（高能耗、高污染、产能过剩行业如钢贸、造船、房地产、建筑）</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="6">3.企业经营状况（权重12）（其中销售收入按照税务报表的核定）</td>
            <td>
            <input type="radio" name="ysdvalue8" id="ysdvalue8A" ref="ysdvalue8A" v-model="ysdValue8" disabled value="12" @click="clickValue($event,8)"/>
            <label for="ysdvalue8A">A．盈利水平（连续2年利润总额为正，且上年利润总额较上上年增长率≥10%，当期利润总额为正）；成长性（上年销售收入较上上年增长率≥10%）</label>
            </td>
            <td>12</td>
            <td rowspan="6">
            <textarea rows="5" v-model="ysd.pfkYsd8Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="6"><span>{{ ysd.pfkYsd8Grade1 }}</span></td>
            <td rowspan="6">{{ ysd.pfkYsd8Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue8" id="ysdvalue8B" ref="ysdvalue8B" v-model="ysdValue8" disabled value="10" @click="clickValue($event,8)"/>
            <label for="ysdvalue8B">B．盈利水平（连续2年及当期利润总额为正）；成长性（连续2年销售收入保持增长）</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue8" id="ysdvalue8C" ref="ysdvalue8C" v-model="ysdValue8" disabled value="8" @click="clickValue($event,8)"/>
            <label for="ysdvalue8C">C．盈利水平（当期利润总额为正）；成长性（当期销售收入较上年同期呈现增长）</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue8" id="ysdvalue8D" ref="ysdvalue8D" v-model="ysdValue8" disabled value="6" @click="clickValue($event,8)"/>
            <label for="ysdvalue8D">D．盈利水平（当期利润总额为正）；成长性（当期销售收入较上年同期未有增长）</label>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue8" id="ysdvalue8E" ref="ysdvalue8E" v-model="ysdValue8" disabled value="2" @click="clickValue($event,8)"/>
            <label for="ysdvalue8E">E．盈利水平（当期利润总额较上年同期下降，但降幅未超过30%）；成长性（当期销售收较上年同期下降，但降幅未超过30%）</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue8" id="ysdvalue8F" ref="ysdvalue8F" v-model="ysdValue8" disabled value="0" @click="clickValue($event,8)"/>
            <label for="ysdvalue8F">F．不符合以上情况</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="4" style="text-align:center"><font color="red">4.企业上下游合作情况（权重6分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="ysdvalue9" id="ysdvalue9A" ref="ysdvalue9A" v-model="ysdValue9" :disabled="!isEdit" value="6" @click="clickValue($event,9)"/>
            <label for="ysdvalue9A">A．与上下游企业合作关系稳定，下游至少有4家往来2年以上合作企业（知名企业、大型企业集团或重点项目配套企业不受固定往来企业户数限制）</label>
            </td>
            <td>6</td>
            <td rowspan="4">
            <textarea rows="5" v-model="ysd.pfkYsd9Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span >{{ ysd.pfkYsd9Grade1 }}</span></td>
            <td rowspan="4"><span >{{ ysd.pfkYsd9Grade2 }}</span></td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue9" id="ysdvalue9B" ref="ysdvalue9B" v-model="ysdValue9" :disabled="!isEdit" value="4" @click="clickValue($event,9)"/>
            <label for="ysdvalue9B">B．与上下游企业合作关系稳定，下游至少有3家往来2年以上合作企业</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue9" id="ysdvalue9C" ref="ysdvalue9C" v-model="ysdValue9" :disabled="!isEdit" value="3" @click="clickValue($event,9)"/>
            <label for="ysdvalue9C">C．与上下游企业合作关系稳定度一般，下游至少有2家往来2年以上合作企业</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue9" id="ysdvalue9D" ref="ysdvalue9D" v-model="ysdValue9" :disabled="!isEdit" value="1" @click="clickValue($event,9)"/>
            <label for="ysdvalue9D">D．与上下游企业合作关系较不稳定，缺乏往来2年以上合作企业</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td rowspan="5">三、关联企业经营情况（权重6分）</td>
            <td rowspan="5" style="text-align:center"><font color="red">1.法人或实际控制人其他产业经营情况（权重6分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="ysdvalue10" id="ysdvalue10A" ref="ysdvalue10A" v-model="ysdValue10" :disabled="!isEdit" value="6" @click="clickValue($event,10)"/>
            <label for="ysdvalue10A">A.法人或实际控制人无其他第二产业</label>
            </td>
            <td>6</td>
            <td rowspan="5">
            <textarea rows="5" v-model="ysd.pfkYsd10Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ ysd.pfkYsd10Grade1 }}</span></td>
            <td rowspan="5">{{ ysd.pfkYsd10Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue10" id="ysdvalue10B" ref="ysdvalue10B" v-model="ysdValue10" :disabled="!isEdit" value="5" @click="clickValue($event,10)"/>
            <label for="ysdvalue10B">B.法人或实际控制人有其他正常第二产业</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue10" id="ysdvalue10C" ref="ysdvalue10C" v-model="ysdValue10" :disabled="!isEdit" value="3" @click="clickValue($event,10)"/>
            <label for="ysdvalue10C">C.法人或实际控制人其他产业为适度介入调整性行业企业；（如机械设备制造业、有色及黑色金属冶炼业、纺织行业、建筑材料制造、化学原料及化学制品业、批发和零售业）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue10" id="ysdvalue10D" ref="ysdvalue10D" v-model="ysdValue10" :disabled="!isEdit" value="0" @click="clickValue($event,10)"/>
            <label for="ysdvalue10D">D.法人或实际控制人其他产业审慎介入控制性行业企业（高能耗、高污染、产能过剩行业如钢贸、造船、房地产、建筑）</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue10E" id="ysdvalue10E" ref="ysdvalue10E" v-model="ysdValue10" :disabled="!isEdit" value="-50" @click="clickValue($event,10)"/>
            <label for="ysdvalue10E">E.法人或实际控制人有涉及资金生意、小贷公司、担保公司及典当方面的经营</label>
            </td>
            <td>-50</td>
          </tr>
          <tr>
            <td rowspan="10">四、企业、法人、实际控制人房产与本次融资比例情况（权重10分）</td>
            <td rowspan="5" style="text-align:center"><font color="red">1.企业及实际控人名下房产抵押情况（房贷也算抵押）（权重4分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="ysdvalue11" id="ysdvalue11A" ref="ysdvalue11A" v-model="ysdValue11" :disabled="!isEdit" value="4" @click="clickValue($event,11)"/>
            <label for="ysdvalue11A">A.企业、法人或实际控制人名下均有未抵押的房产</label>
            </td>
            <td>4</td>
            <td rowspan="5">
            <textarea rows="5" v-model="ysd.pfkYsd11Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ ysd.pfkYsd11Grade1 }}</span></td>
            <td rowspan="5">{{ ysd.pfkYsd11Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue11" id="ysdvalue11B" ref="ysdvalue11B" v-model="ysdValue11" :disabled="!isEdit" value="3" @click="clickValue($event,11)"/>
            <label for="ysdvalue11B">B.企业、法人或实际控制人名下有房产，企业已经全部抵押，法人有未抵押房产</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue11" id="ysdvalue11C" ref="ysdvalue11C" v-model="ysdValue11" :disabled="!isEdit" value="2" @click="clickValue($event,11)"/>
            <label for="ysdvalue11C">C.企业名下无房产，法人或实际控制人名下有未抵押的房产</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue11" id="ysdvalue11D" ref="ysdvalue11D" v-model="ysdValue11" :disabled="!isEdit" value="1" @click="clickValue($event,11)"/>
            <label for="ysdvalue11D">D.企业及法人或实际控制人名下的房产（如有）均已经抵押</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue11" id="ysdvalue11E" ref="ysdvalue11E" v-model="ysdValue11" :disabled="!isEdit" value="0" @click="clickValue($event,11)"/>
            <label for="ysdvalue11E">E.企业及法人或实际控制人在本地无房产</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">2.申请金额与企业主名下可抵押房产净值+自有资产净值比率（权重6分）</td>
            <td>
            <input type="radio" name="ysdvalue12" id="ysdvalue12A" ref="ysdvalue12A" v-model="ysdValue12" disabled value="6" @click="clickValue($event,12)"/>
            <label for="ysdvalue12A">A．比率≤50%</label>
            </td>
            <td>6</td>
            <td rowspan="5">
            <textarea rows="5" v-model="ysd.pfkYsd12Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ ysd.pfkYsd12Grade1 }}</span></td>
            <td rowspan="5">{{ ysd.pfkYsd12Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue12" id="ysdvalue12B" ref="ysdvalue12B" v-model="ysdValue12" disabled value="5" @click="clickValue($event,12)"/>
            <label for="ysdvalue12B">B．比率≤60% </label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue12" id="ysdvalue12C" ref="ysdvalue12C" v-model="ysdValue12"  disabled value="4" @click="clickValue($event,12)"/>
            <label for="ysdvalue12C">C．比率≤70% </label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue12" id="ysdvalue12D" ref="ysdvalue12D" v-model="ysdValue12" disabled value="2" @click="clickValue($event,12)"/>
            <label for="ysdvalue12D">D．比率≤100% </label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue12" id="ysdvalue12E" ref="ysdvalue12E" v-model="ysdValue12" disabled value="0" @click="clickValue($event,12)"/>
            <label for="ysdvalue12E">E．比率>100% </label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="6">五、其他类（权重占比7分）</td>
            <td rowspan="3" style="text-align:center"><font color="red">1.法人面谈情况（权重3分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="ysdvalue13" id="ysdvalue13A" ref="ysdvalue13A" v-model="ysdValue13" :disabled="!isEdit" value="3" @click="clickValue($event,13)"/>
            <label for="ysdvalue13A">A.法人精神面貌良好</label>
            </td>
            <td>3</td>
            <td rowspan="3">
            <textarea rows="5" v-model="ysd.pfkYsd13Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ ysd.pfkYsd13Grade1 }}</span></td>
            <td rowspan="3">{{ ysd.pfkYsd13Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue13" id="ysdvalue13B" ref="ysdvalue13B" v-model="ysdValue13" :disabled="!isEdit" value="2" @click="clickValue($event,13)"/>
            <label for="ysdvalue13B">B 法人精神面貌一般</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue13" id="ysdvalue13C" ref="ysdvalue13C" v-model="ysdValue13" :disabled="!isEdit" value="0" @click="clickValue($event,13)"/>
            <label for="ysdvalue13C">C 法人精神面貌颓废</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="3" style="text-align:center"><font color="red">2.法人或实际控制人个人情况（权重4分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="ysdvalue14" id="ysdvalue14A" ref="ysdvalue14A" v-model="ysdValue14" :disabled="!isEdit" value="4" @click="clickValue($event,14)"/>
            <label for="ysdvalue14A">A法人或实际控制人已经在本地落户，且在本地拥有房产 </label>
            </td>
            <td>4</td>
            <td rowspan="3">
            <textarea rows="5" v-model="ysd.pfkYsd14Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ ysd.pfkYsd14Grade1 }}</span></td>
            <td rowspan="3">{{ ysd.pfkYsd14Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue14" id="ysdvalue14B" ref="ysdvalue14B" v-model="ysdValue14" :disabled="!isEdit" value="2" @click="clickValue($event,14)"/>
            <label for="ysdvalue14B">B 法人或实际控制人已经在本地拥有房产，尚未落户</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="ysdvalue14" id="ysdvalue14C" ref="ysdvalue14C" v-model="ysdValue14" :disabled="!isEdit" value="0" @click="clickValue($event,14)"/>
            <label for="ysdvalue14C">C 法人或实际控制人在本地无房产、未落户</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
          <td colspan="2">总分值</td>
          <td colspan="2"></td>
          <td></td>
          <td>{{ totalGrade1 }}</td>
          <td>{{ totalGrade2 }}</td>
          </tr>
        </table>
                </div></yu-panel>
               <yu-panel title="其他重点关注调查内容"  :hideFilter="false" :collapseHide="false">
               <yu-xform-group :column="1" class="focusYsd">
                  <yu-xform-item label="企业是否按时交纳各项税款，有无被税务机关查处和处罚" ctype="select"  name="focusYsd1" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="企业有无违规排污，有无被环保部门查处和处罚" ctype="select"  name="focusYsd2" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="实际控制人有无吸毒、赌博等不良嗜好，其信用卡是否经常在境外大额支付等" ctype="select" name="focusYsd3" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="实际控制人是否存在炒房、炒原材料、炒股票期货等投机行为" ctype="select" name="focusYsd4" label-width="900px" data-code="STD_ZB_YES_NO"  ></yu-xform-item>
                  <yu-xform-item label="企业员工人数是否稳定，员工待遇是否合理" ctype="select" name="focusYsd5" label-width="900px" data-code="STD_ZB_YES_NO"  ></yu-xform-item>
                  <yu-xform-item label="有无异常工商股权变更情况" ctype="select" name="focusYsd6" label-width="900px" data-code="STD_ZB_YES_NO"  ></yu-xform-item>
                  <yu-xform-item label="有无其他影响企业稳定经营的情况" ctype="select" name="focusYsd7" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="实际控制人是否参与民间融资、投资高风险行业等行为" ctype="select" name="focusYsd8" label-width="900px" data-code="STD_ZB_YES_NO"  ></yu-xform-item>
                  <yu-xform-item label="近两年是否存在工商，税务，银行不良记录" ctype="select" name="focusYsd9" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="银行家数是否超过3家或资产负债率超过75% " ctype="select" name="focusYsd10" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="企业或实际控制人夫妇是否在业务申办行本地有住宅，商铺，厂房等实物资产 " ctype="select" name="focusYsd11" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="企业及实际控制人他行信用贷款余额，我行信用贷款余额，信用卡用信额，优税贷申请额(含小贷)合计是否高于500万元 " ctype="select" name="focusYsd12" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                  <yu-xform-item label="如有其它不利情况请简述" ctype="textarea" name="focusYsd13" label-width="900px"  ></yu-xform-item>
               </yu-xform-group>
               </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="op!='VIEW'">保存</yu-button>
      <!--<yu-button type="primary" @click="print">打印</yu-button>-->
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_TAX_GRADE');
export default {
  components: {},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      ysd: [],
      totalGrade1: '',
      totalGrade2: '',
      isEdit: true,
      index: '1',
      managerType: '01',
      ysdValue1: '',
      ysdValue2: '',
      ysdValue3: '',
      ysdValue4: '',
      ysdValue5: '',
      ysdValue6: '',
      ysdValue7: '',
      ysdValue8: '',
      ysdValue9: '',
      ysdValue10: '',
      ysdValue11: '',
      ysdValue12: '',
      ysdValue13: '',
      ysdValue14: '',
      op: ''
    };
  },
  mounted () {
    this.op = this.param.op;
    if (this.getFactory().contextData.instanceInfo) {
      if (this.getFactory().contextData.instanceInfo.nodeId == '256_7' || this.getFactory().contextData.instanceInfo.nodeId == '256_280' || this.getFactory().contextData.instanceInfo.nodeSign == 'xb' ||
      this.getFactory().contextData.instanceInfo.nodeId == '261_6' || this.getFactory().contextData.instanceInfo.nodeId == '261_12') {
        this.managerType = '02';
        this.index = '2';
        this.op = 'EDIT';
        this.init();
      } else {
        this.isEdit = false;
        this.init();
      }
    } else {
      this.init();
      this.managerType = '01';
    }
  },
  methods: {
    init: function () {
      let _this = this;
      var serno = _this.param.serno;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/rptspdanysysd/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.baseFormdata1);
            _this.ysd = response.data;
            _this.$nextTick(() => {
              _this.checkRadio2(_this.ysd);
            });
          } else {
            var obj = {};
            obj.serno = _this.param.serno;
            yufp.service.request({
              method: 'POST',
              async: false,
              url: backend.cmisBiz + '/api/rptspdanysysd/initYsd',
              data: obj,
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.init();
                }
              }});
          }
        }
      });
    },
    /** 自动打分 */
    autoRecord2: function (managerType) {
      var _this = this;
      var serno = this.param.serno;
      var obj = {};
      obj = _this.ysd;
      obj.lastYearTopsell1CusName = _this.baseFormdata1.lastYearTopsell1CusName;
      obj.lastYearTopsell1CoopTerm = _this.baseFormdata1.lastYearTopsell1CoopTerm;
      obj.lastYearTopsell1Income = _this.baseFormdata1.lastYearTopsell1Income;
      obj.lastYearTopsell2CusName = _this.baseFormdata1.lastYearTopsell2CusName;
      obj.lastYearTopsell2CoopTerm = _this.baseFormdata1.lastYearTopsell2CoopTerm;
      obj.lastYearTopsell2Income = _this.baseFormdata1.lastYearTopsell2Income;
      obj.lastYearTopsell3CusName = _this.baseFormdata1.lastYearTopsell3CusName;
      obj.lastYearTopsell3CoopTerm = _this.baseFormdata1.lastYearTopsell3CoopTerm;
      obj.lastYearTopsell3Income = _this.baseFormdata1.lastYearTopsell3Income;
      obj.lastTwoYearMainBusinessPremisesNature = _this.baseFormdata1.lastTwoYearMainBusinessPremisesNature;
      obj.lastTwoYearBusinessPremisesChgTimes = _this.baseFormdata1.lastTwoYearBusinessPremisesChgTimes;
      obj.tnopwtioeafnlt5ply = _this.baseFormdata1.tnopwtioeafnlt5ply;
      obj.tsoasitpy = _this.baseFormdata1.tsoasitpy;
      obj.arbo90Days = _this.baseFormdata1.arbo90Days;
      obj.arbo180Days = _this.baseFormdata1.arbo180Days;
      obj.lastYearEcvopcitpy = _this.baseFormdata1.lastYearEcvopcitpy;
      obj.lastTwoTearEcvopcitpy = _this.baseFormdata1.lastTwoTearEcvopcitpy;
      obj.totalWagesPaidLastYear = _this.baseFormdata1.totalWagesPaidLastYear;
      obj.totalWagesPaidLastTwoYear = _this.baseFormdata1.totalWagesPaidLastTwoYear;
      obj.lastYearTaxTotalAmt = _this.baseFormdata1.lastYearTaxTotalAmt;
      obj.lastTwoYearTaxTotalAmt = _this.baseFormdata1.lastTwoYearTaxTotalAmt;
      obj.verifiableOperatingIncome = _this.baseFormdata1.verifiableOperatingIncome;
      obj.scotbsaiob = _this.baseFormdata1.scotbsaiob;
      obj.addiobly = _this.baseFormdata1.addiobly;
      obj.adliobly = _this.baseFormdata1.adliobly;
      obj.cusOutsideDebt = _this.baseFormdata1.cusOutsideDebt;
      obj.outerGrtAmt = _this.baseFormdata1.outerGrtAmt;
      obj.outerPldAmt = _this.baseFormdata1.outerPldAmt;
      obj.outerImnAmt = _this.baseFormdata1.outerImnAmt;
      obj.riskAssessGrade = _this.baseFormdata1.riskAssessGrade;
      obj.calMaxLmtAmt = _this.baseFormdata1.calMaxLmtAmt;
      obj.taxRate = _this.baseFormdata1.taxRate;
      obj.lmtAmt = _this.baseFormdata1.lmtAmt;
      obj.saleIncomeAnalysis = _this.baseFormdata1.saleIncomeAnalysis;
      obj.taxIncomeAnalysis = _this.baseFormdata1.taxIncomeAnalysis;
      obj.stockIncomeAnalysis = _this.baseFormdata1.stockIncomeAnalysis;
      obj.manageIncomeAnalysis = _this.baseFormdata1.manageIncomeAnalysis;
      obj.focusYsd1 = _this.baseFormdata1.focusYsd1;
      obj.focusYsd2 = _this.baseFormdata1.focusYsd2;
      obj.focusYsd3 = _this.baseFormdata1.focusYsd3;
      obj.focusYsd4 = _this.baseFormdata1.focusYsd4;
      obj.focusYsd5 = _this.baseFormdata1.focusYsd5;
      obj.focusYsd6 = _this.baseFormdata1.focusYsd6;
      obj.focusYsd7 = _this.baseFormdata1.focusYsd7;
      obj.focusYsd8 = _this.baseFormdata1.focusYsd8;
      obj.focusYsd9 = _this.baseFormdata1.focusYsd9;
      obj.focusYsd10 = _this.baseFormdata1.focusYsd10;
      obj.focusYsd11 = _this.baseFormdata1.focusYsd11;
      obj.focusYsd12 = _this.baseFormdata1.focusYsd12;
      obj.focusYsd13 = _this.baseFormdata1.focusYsd13;
      var rptType = this.param.rptType;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysysd/save',
        data: obj,
        callback: function (code, message, response) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/rptspdanysysd/autoValue',
            data: {serno: serno, managerType: managerType, rptType: rptType},
            callback: function (code, message, response) {
              if (response.data > 0) {
                _this.init();
              } else {
                _this.$message({
                  duration: 4000,
                  message: '自动打分失败',
                  type: 'warning'
                });
              }
            }});
        }});
    },
    clickValue: function (event, num) {
      var _this = this;
      this.ysd['pfkYsd' + num + 'Grade' + _this.index] = event.currentTarget.value;
      if (_this.index == '1') {
        _this.totalGrade1 = parseInt(_this.ysd.pfkYsd2Grade1) + parseInt(_this.ysd.pfkYsd3Grade1) +
      parseInt(_this.ysd.pfkYsd4Grade1) + parseInt(_this.ysd.pfkYsd5Grade1) + parseInt(_this.ysd.pfkYsd6Grade1) + parseInt(_this.ysd.pfkYsd7Grade1) +
      parseInt(_this.ysd.pfkYsd8Grade1) + parseInt(_this.ysd.pfkYsd12Grade1);
        if (_this.ysd.pfkYsd1Grade1) {
          _this.totalGrade1 += parseInt(_this.ysd.pfkYsd1Grade1);
        }
        if (_this.ysd.pfkYsd9Grade1) {
          _this.totalGrade1 += parseInt(_this.ysd.pfkYsd9Grade1);
        }
        if (_this.ysd.pfkYsd10Grade1) {
          _this.totalGrade1 += parseInt(_this.ysd.pfkYsd10Grade1);
        }
        if (_this.ysd.pfkYsd11Grade1) {
          _this.totalGrade1 += parseInt(_this.ysd.pfkYsd11Grade1);
        }
        if (_this.ysd.pfkYsd13Grade1) {
          _this.totalGrade1 += parseInt(_this.ysd.pfkYsd13Grade1);
        }
        if (_this.ysd.pfkYsd14Grade1) {
          _this.totalGrade1 += parseInt(_this.ysd.pfkYsd14Grade1);
        }
      } else if (_this.index == '2') {
        _this.totalGrade2 = parseInt(_this.ysd.pfkYsd2Grade2) + parseInt(_this.ysd.pfkYsd3Grade2) +
      parseInt(_this.ysd.pfkYsd4Grade2) + parseInt(_this.ysd.pfkYsd5Grade2) + parseInt(_this.ysd.pfkYsd6Grade2) + parseInt(_this.ysd.pfkYsd7Grade2) +
      parseInt(_this.ysd.pfkYsd8Grade2) + parseInt(_this.ysd.pfkYsd12Grade2);
        if (_this.ysd.pfkYsd1Grade2) {
          _this.totalGrade2 += parseInt(_this.ysd.pfkYsd1Grade2);
        }
        if (_this.ysd.pfkYsd9Grade2) {
          _this.totalGrade2 += parseInt(_this.ysd.pfkYsd9Grade2);
        }
        if (_this.ysd.pfkYsd10Grade2) {
          _this.totalGrade2 += parseInt(_this.ysd.pfkYsd10Grade2);
        }
        if (_this.ysd.pfkYsd11Grade2) {
          _this.totalGrade2 += parseInt(_this.ysd.pfkYsd11Grade2);
        }
        if (_this.ysd.pfkYsd13Grade2) {
          _this.totalGrade2 += parseInt(_this.ysd.pfkYsd13Grade2);
        }
        if (_this.ysd.pfkYsd14Grade2) {
          _this.totalGrade2 += parseInt(_this.ysd.pfkYsd14Grade2);
        }
      }
    },
    checkRadio2: function (data) {
      var _this = this;
      for (var i = 1; i < 15; i++) {
        var name = 'name' + i;
        var value = 'ysdvalue' + i;
        var pfkYsdGrade = 'pfkYsd' + i + 'Grade1';
        name = document.getElementsByName(value);
        for (var j = 0; j < name.length; j++) {
          if (data[pfkYsdGrade] != null) {
            if (Number(name[j].value) == Number(data[pfkYsdGrade])) {
              name[j].checked = true;
              break;
            }
          }
        }
      }
      _this.totalGrade1 = parseInt(data.pfkYsd2Grade1) + parseInt(data.pfkYsd3Grade1) +
      parseInt(data.pfkYsd4Grade1) + parseInt(data.pfkYsd5Grade1) + parseInt(data.pfkYsd6Grade1) + parseInt(data.pfkYsd7Grade1) +
      parseInt(data.pfkYsd8Grade1) + parseInt(data.pfkYsd12Grade1);
      if (data.pfkYsd1Grade1) {
        _this.totalGrade1 += parseInt(data.pfkYsd1Grade1);
      }
      if (data.pfkYsd9Grade1) {
        _this.totalGrade1 += parseInt(data.pfkYsd9Grade1);
      }
      if (data.pfkYsd10Grade1) {
        _this.totalGrade1 += parseInt(data.pfkYsd10Grade1);
      }
      if (data.pfkYsd11Grade1) {
        _this.totalGrade1 += parseInt(data.pfkYsd11Grade1);
      }
      if (data.pfkYsd13Grade1) {
        _this.totalGrade1 += parseInt(data.pfkYsd13Grade1);
      }
      if (data.pfkYsd14Grade1) {
        _this.totalGrade1 += parseInt(data.pfkYsd14Grade1);
      }
      _this.totalGrade2 = parseInt(data.pfkYsd2Grade2) + parseInt(data.pfkYsd3Grade2) +
      parseInt(data.pfkYsd4Grade2) + parseInt(data.pfkYsd5Grade2) + parseInt(data.pfkYsd6Grade2) + parseInt(data.pfkYsd7Grade2) +
      parseInt(data.pfkYsd8Grade2) + parseInt(data.pfkYsd12Grade2);
      if (data.pfkYsd1Grade2) {
        _this.totalGrade2 += parseInt(data.pfkYsd1Grade2);
      }
      if (data.pfkYsd9Grade2) {
        _this.totalGrade2 += parseInt(data.pfkYsd9Grade2);
      }
      if (data.pfkYsd10Grade2) {
        _this.totalGrade2 += parseInt(data.pfkYsd10Grade2);
      }
      if (data.pfkYsd11Grade2) {
        _this.totalGrade2 += parseInt(data.pfkYsd11Grade2);
      }
      if (data.pfkYsd13Grade2) {
        _this.totalGrade2 += parseInt(data.pfkYsd13Grade2);
      }
      if (data.pfkYsd14Grade2) {
        _this.totalGrade2 += parseInt(data.pfkYsd14Grade2);
      }
      _this.totalGrade1 = isNaN(_this.totalGrade1) ? 0 : _this.totalGrade1;
      _this.totalGrade2 = isNaN(_this.totalGrade2) ? 0 : _this.totalGrade2;
      _this.measureLmtAmt();
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == 'A' || op.key == 'B' || op.key == 'C') {
          return true;
        }
        return false;
      });
    },
    submit: function () {
      var _this = this;
      var obj = {};
      yufp.clone(_this.baseFormdata1, obj);
      obj.pfkYsd1Desc = _this.ysd.pfkYsd1Desc;
      obj.pfkYsd1Grade1 = _this.ysd.pfkYsd1Grade1;
      obj.pfkYsd1Grade2 = _this.ysd.pfkYsd1Grade2;
      obj.pfkYsd2Desc = _this.ysd.pfkYsd2Desc;
      obj.pfkYsd2Grade1 = _this.ysd.pfkYsd2Grade1;
      obj.pfkYsd2Grade2 = _this.ysd.pfkYsd2Grade2;
      obj.pfkYsd3Desc = _this.ysd.pfkYsd3Desc;
      obj.pfkYsd3Grade1 = _this.ysd.pfkYsd3Grade1;
      obj.pfkYsd3Grade2 = _this.ysd.pfkYsd3Grade2;
      obj.pfkYsd4Desc = _this.ysd.pfkYsd4Desc;
      obj.pfkYsd4Grade1 = _this.ysd.pfkYsd4Grade1;
      obj.pfkYsd4Grade2 = _this.ysd.pfkYsd4Grade2;
      obj.pfkYsd5Desc = _this.ysd.pfkYsd5Desc;
      obj.pfkYsd5Grade1 = _this.ysd.pfkYsd5Grade1;
      obj.pfkYsd5Grade2 = _this.ysd.pfkYsd5Grade2;
      obj.pfkYsd6Desc = _this.ysd.pfkYsd6Desc;
      obj.pfkYsd6Grade1 = _this.ysd.pfkYsd6Grade1;
      obj.pfkYsd6Grade2 = _this.ysd.pfkYsd6Grade2;
      obj.pfkYsd7Desc = _this.ysd.pfkYsd7Desc;
      obj.pfkYsd7Grade1 = _this.ysd.pfkYsd7Grade1;
      obj.pfkYsd7Grade2 = _this.ysd.pfkYsd7Grade2;
      obj.pfkYsd8Desc = _this.ysd.pfkYsd8Desc;
      obj.pfkYsd8Grade1 = _this.ysd.pfkYsd8Grade1;
      obj.pfkYsd8Grade2 = _this.ysd.pfkYsd8Grade2;
      obj.pfkYsd9Desc = _this.ysd.pfkYsd9Desc;
      obj.pfkYsd9Grade1 = _this.ysd.pfkYsd9Grade1;
      obj.pfkYsd9Grade2 = _this.ysd.pfkYsd9Grade2;
      obj.pfkYsd10Desc = _this.ysd.pfkYsd10Desc;
      obj.pfkYsd10Grade1 = _this.ysd.pfkYsd10Grade1;
      obj.pfkYsd10Grade2 = _this.ysd.pfkYsd10Grade2;
      obj.pfkYsd11Desc = _this.ysd.pfkYsd11Desc;
      obj.pfkYsd11Grade1 = _this.ysd.pfkYsd11Grade1;
      obj.pfkYsd11Grade2 = _this.ysd.pfkYsd11Grade2;
      obj.pfkYsd12Desc = _this.ysd.pfkYsd12Desc;
      obj.pfkYsd12Grade1 = _this.ysd.pfkYsd12Grade1;
      obj.pfkYsd12Grade2 = _this.ysd.pfkYsd12Grade2;
      obj.pfkYsd13Desc = _this.ysd.pfkYsd13Desc;
      obj.pfkYsd13Grade1 = _this.ysd.pfkYsd13Grade1;
      obj.pfkYsd13Grade2 = _this.ysd.pfkYsd13Grade2;
      obj.pfkYsd14Desc = _this.ysd.pfkYsd14Desc;
      obj.pfkYsd14Grade1 = _this.ysd.pfkYsd14Grade1;
      obj.pfkYsd14Grade2 = _this.ysd.pfkYsd14Grade2;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysysd/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.$message({
              message: '保存成功'
            });
          }
        }});
    },
    measureLmtAmt: function () {
      var _this = this;
      var taxRate = _this.baseFormdata1.taxRate;
      var taxRateCoefficient = 0;
      var gradeCoefficient = 0;
      _this.baseFormdata1.riskAssessGrade = _this.totalGrade1;
      var lastYearTaxTotalAmt = _this.baseFormdata1.lastYearTaxTotalAmt;
      if (taxRate == 'A') {
        taxRateCoefficient = 5;
      } else if (taxRate == 'B') {
        taxRateCoefficient = 4;
      }
      if (_this.totalGrade1 >= 80) {
        gradeCoefficient = 1;
      } else if (_this.totalGrade1 >= 70 && _this.totalGrade1 < 80) {
        gradeCoefficient = 0.8;
      } else {
        gradeCoefficient = 0;
      }
      var lmtAmt = parseFloat(parseFloat(lastYearTaxTotalAmt) * taxRateCoefficient * gradeCoefficient).toFixed(2);
      _this.baseFormdata1.calMaxLmtAmt = isNaN(lmtAmt) ? 0 : lmtAmt;
    }
  }
};
</script>
<style>
.focusYsd .el-form-item__label{
text-align: left;
}
.card tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
}
</style>
