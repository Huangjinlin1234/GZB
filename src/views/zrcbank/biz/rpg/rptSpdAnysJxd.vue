<template>
  <div>
    <yu-panel title="结息贷"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="op =='VIEW'" :form-type="viewType">
                <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                <yu-panel title="企业结息情况"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="3">
                  <yu-xform-item label="第一季度时间" ctype="datepicker" name="fqDate" ></yu-xform-item>
                  <yu-xform-item label="第一季度本行结息金额" ctype="yu-num"  name="fqSelfBankIrsmAmt" @change="measureLmtAmt"></yu-xform-item>
                  <yu-xform-item label="第一季度他行结息金额" ctype="yu-num" name="fqOhterBankIrsmAmt" @change="measureLmtAmt" ></yu-xform-item>
                  <yu-xform-item label="第二季度时间" ctype="datepicker"  name="sqDate"></yu-xform-item>
                  <yu-xform-item label="第二季度本行结息金额" ctype="yu-num" name="sqSelfBankIrsmAmt"  @change="measureLmtAmt"></yu-xform-item>
                  <yu-xform-item label="第二季度他行结息金额" ctype="yu-num"  name="sqOhterBankIrsmAmt" @change="measureLmtAmt"></yu-xform-item>
                  <yu-xform-item label="第三季度时间" ctype="datepicker" name="tqDate" ></yu-xform-item>
                  <yu-xform-item label="第三季度本行结息金额" ctype="yu-num"  name="tqSelfBankIrsmAmt" @change="measureLmtAmt"></yu-xform-item>
                  <yu-xform-item label="第三季度他行结息金额" ctype="yu-num" name="tqOhterBankIrsmAmt" @change="measureLmtAmt" ></yu-xform-item>
                  <yu-xform-item label="第四季度时间" ctype="datepicker"  name="lqDate"></yu-xform-item>
                  <yu-xform-item label="第四季度本行结息金额" ctype="yu-num" name="lqSelfBankIrsmAmt"  @change="measureLmtAmt"></yu-xform-item>
                  <yu-xform-item label="第四季度他行结息金额" ctype="yu-num"  name="lqOhterBankIrsmAmt" @change="measureLmtAmt"></yu-xform-item>
                  <yu-xform-item label="本行最大贷款额度" ctype="yu-num" name="selfBankMaxLoanAmt" disabled ></yu-xform-item>
                  <yu-xform-item label="他行最大贷款额度" ctype="yu-num"  name="ohterBankMaxLoanAmt"></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
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
                  <yu-xform-item label="去年企业供货总额占比前三的供应商一名称" ctype="input"  name="lastYearTopsell1ProviderName"></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商一合作年限" ctype="yu-num" name="lastYearTopsell1ProviderCoopTerm" ></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商一上年度供应量" ctype="yu-num"  name="lastYearTopsell1Provider"></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商二名称" ctype="input" name="lastYearTopsell2ProviderName" ></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商二合作年限" ctype="yu-num"  name="lastYearTopsell2ProviderCoopTerm"></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商二上年度供应量" ctype="yu-num" name="lastYearTopsell2Provider" ></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商三名称" ctype="input" name="lastYearTopsell3ProviderName" ></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商三合作年限" ctype="yu-num"  name="lastYearTopsell3ProviderCoopTerm"></yu-xform-item>
                  <yu-xform-item label="去年企业供货总额占比前三的供应商三上年度供应量" ctype="yu-num" name="lastYearTopsell3Provider" ></yu-xform-item>
                  <yu-xform-item label="最近二年企业主要经营场所性质" ctype="input"  name="lastTwoYearMainBusinessPremisesNature"></yu-xform-item>
                  <yu-xform-item label="近两年经营场所变更次数" ctype="yu-num"  name="lastTwoYearBusinessPremisesChgTimes"></yu-xform-item>
                  <yu-xform-item label="企业去年收入占比不低于5%省份个数" ctype="yu-num"  name="tnopwtioeafnlt5ply"></yu-xform-item>
                  <yu-xform-item label="企业上年度所有供应商总供应量" ctype="yu-num"  name="tsoasitpy"></yu-xform-item>
                  <yu-xform-item label="超过90天应收账款余额" ctype="yu-num"  name="arbo90Days"></yu-xform-item>
                  <yu-xform-item label="超过180天应收账款余额" ctype="yu-num"  name="arbo180Days"></yu-xform-item>
                  <yu-xform-item label="去年耗用电量能耗值" ctype="yu-num"  name="lastYearElectricityConsumption"></yu-xform-item>
                  <yu-xform-item label="前年耗用电量能耗值" ctype="yu-num"  name="ecvopcitpy"></yu-xform-item>
                  <yu-xform-item label="去年发放工资总额" ctype="yu-num"  name="totalWagesPaidLastYear"></yu-xform-item>
                  <yu-xform-item label="前年发放工资总额" ctype="yu-num"  name="totalWpitpy"></yu-xform-item>
                  <yu-xform-item label="可核实营业收入" ctype="yu-num"  name="verifiableOperatingIncome"></yu-xform-item>
                  <yu-xform-item label="去年在我行日均存款" ctype="yu-num"  name="addiobly"></yu-xform-item>
                  <yu-xform-item label="借款人在我行结算账户销售回款" ctype="yu-num"  name="scotbsaiob"></yu-xform-item>
                  <yu-xform-item label="去年在我行日均贷款" ctype="yu-num"  name="adliobly"></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
    <div class="card">
    <yu-panel title="结息贷评分卡"  :hideFilter="false" :collapseHide="false">
    <yu-form-buttons align="right">
      <yu-button type="primary" @click="autoRecord(managerType)" v-show="isEdit&&op!='VIEW'">自动评分</yu-button>
    </yu-form-buttons>
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
            <td rowspan="23">征信及客户资产负债情况</td>
            <td rowspan="4" style="text-align:center"><font color="red">1.企业征信信用情况<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="jxdvalue1" id="jxdvalue1A" ref="jxdvalue1A" value="14" :disabled="!isEdit" @click="clickValue($event,1)"/>
            <label for="jxdvalue1A">A．企业无逾期及欠息记录，且无法院执行纪录；且实际控制人无犯罪纪录，并在经营类贷款方面无欠息、逾期等不良信息。</label>
            </td>
            <td>14</td>
            <td rowspan="4">
            <textarea rows="5" v-model="jxdList.pfkJxd1Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ jxdList.pfkJxd1Grade1 }}</span></td>
            <td rowspan="4">{{ jxdList.pfkJxd1Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue1" id="jxdvalue1B" ref="jxdvalue1B" :disabled="!isEdit"   value="5" @click="clickValue($event,1)"/>
            <label for="jxdvalue1B">B.企业、实际控制人2年内有1次逾期或欠息记录，且企业无法院执行纪录，实际控制人无犯罪纪录。</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue1" id="jxdvalue1C" ref="jxdvalue1C" :disabled="!isEdit"  value="3" @click="clickValue($event,1)"/>
            <label for="jxdvalue1C">C.企业、实际控制人2年内有2次逾期或欠息记录，且企业无法院执行纪录，实际控制人无犯罪纪录。</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue1" id="jxdvalue1D" ref="jxdvalue1D" :disabled="!isEdit"  value="0" @click="clickValue($event,1)"/>
            <label for="jxdvalue1D">D．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">2.企业及实际控制人负债与核心资产比率</td>
            <td>
            <input type="radio" name="jxdvalue2" id="jxdvalue2A" ref="jxdvalue2A" disabled value="12" @click="clickValue($event,2)"/>
            <label for="jxdvalue2A">A．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤30%</label>
            </td>
            <td>12</td>
            <td rowspan="5">
            <textarea rows="5"  v-model="jxdList.pfkJxd2Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ jxdList.pfkJxd2Grade1 }}</span></td>
            <td rowspan="5">{{ jxdList.pfkJxd2Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue2" id="jxdvalue2B" ref="jxdvalue2B" disabled value="10" @click="clickValue($event,2)"/>
            <label for="jxdvalue2B">B．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤40%</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue2" id="jxdvalue2C" ref="jxdvalue2C" disabled value="7" @click="clickValue($event,2)"/>
            <label for="jxdvalue2C">C．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤60%</label>
            </td>
            <td>7</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue2" id="jxdvalue2D" ref="jxdvalue2D" disabled value="3" @click="clickValue($event,2)"/>
            <label for="jxdvalue2D">D．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤100%</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue2" id="jxdvalue2E" ref="jxdvalue2E" disabled value="0" @click="clickValue($event,2)"/>
            <label for="jxdvalue2E">E．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率＞100%</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">3. 企业及实际控制人负债与自有资产比率</td>
            <td>
            <input type="radio" name="jxdvalue3" id="jxdvalue3A" ref="jxdvalue3A" disabled value="12" @click="clickValue($event,3)"/>
            <label for="jxdvalue3A">A.企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤50%</label>
            </td>
            <td>12</td>
            <td rowspan="5">
            <textarea rows="5" v-model="jxdList.pfkJxd3Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ jxdList.pfkJxd3Grade1 }}</span></td>
            <td rowspan="5">{{ jxdList.pfkJxd3Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue3" id="jxdvalue3B" ref="jxdvalue3B" disabled value="8" @click="clickValue($event,3)"/>
            <label for="jxdvalue3B">B.企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤80%</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue3" id="jxdvalue3C" ref="jxdvalue3C" disabled value="6" @click="clickValue($event,3)"/>
            <label for="jxdvalue3C">C．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤100%</label>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue3" id="jxdvalue3D" ref="jxdvalue3D" disabled value="4" @click="clickValue($event,3)"/>
            <label for="jxdvalue3D">D．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率≤150%</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue3" id="jxdvalue3E" ref="jxdvalue3E" disabled value="0" @click="clickValue($event,3)"/>
            <label for="jxdvalue3E">E．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶自有资产价值的比率＞150%</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">4.企业现有融资情况</td>
            <td>
            <input type="radio" name="jxdvalue4" id="jxdvalue4A" ref="jxdvalue4A" disabled value="5" @click="clickValue($event,4)"/>
            <label for="jxdvalue4A">A．融资机构为0</label>
            </td>
            <td>5</td>
            <td rowspan="5">
            <textarea rows="5" v-model="jxdList.pfkJxd4Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ jxdList.pfkJxd4Grade1 }}</span></td>
            <td rowspan="5">{{ jxdList.pfkJxd4Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue4" id="jxdvalue4B" ref="jxdvalue4B" disabled value="4" @click="clickValue($event,4)"/>
            <label for="jxdvalue4B">B．融资机构为1家</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue4" id="jxdvalue4C" ref="jxdvalue4C" disabled value="3" @click="clickValue($event,4)"/>
            <label for="jxdvalue4C">C．融资机构为2家</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue4" id="jxdvalue4D" ref="jxdvalue4D" disabled value="1" @click="clickValue($event,4)"/>
            <label for="jxdvalue4D">D．融资机构为3家</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue4" id="jxdvalue4E" ref="jxdvalue4E" disabled value="0" @click="clickValue($event,4)"/>
            <label for="jxdvalue4E">E．融资机构3家以上</label>
            </td>
            <td>0</td>
          </tr>
           <tr>
            <td rowspan="4">5.对外担保情况</td>
            <td>
            <input type="radio" name="jxdvalue5" id="jxdvalue5A" ref="jxdvalue5A" disabled value="4" @click="clickValue($event,5)"/>
            <label for="jxdvalue5A">A．对外担保金额在财务报表“企业核心资产-企业负债”以内</label>
            </td>
            <td>4</td>
            <td rowspan="4">
            <textarea rows="5" v-model="jxdList.pfkJxd5Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ jxdList.pfkJxd5Grade1 }}</span></td>
            <td rowspan="4">{{ jxdList.pfkJxd5Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue5" id="jxdvalue5B" ref="jxdvalue5B" disabled value="3" @click="clickValue($event,5)"/>
            <label for="jxdvalue5B">B．对外担保金额为财务报表“企业核心资产-企业负债”的1-5倍（含）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue5" id="jxdvalue5C" ref="jxdvalue5C" disabled value="2" @click="clickValue($event,5)"/>
            <label for="jxdvalue5C">C．对外担保金额为财务报表“企业核心资产-企业负债”的5-10倍（含）</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue5" id="jxdvalue5D" ref="jxdvalue5D" disabled value="0" @click="clickValue($event,5)"/>
            <label for="jxdvalue5D">D.对外担保金额为财务报表“企业核心资产-企业负债”的10倍以上</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="16">企业经营状况</td>
            <td rowspan="3">1.实际控制人从事本行业年限</td>
            <td>
            <input type="radio" name="jxdvalue6" id="jxdvalue6A" ref="jxdvalue6A" disabled value="6" @click="clickValue($event,6)"/>
            <label for="jxdvalue6A">A．5年（含）以上</label>
            </td>
            <td>6</td>
            <td rowspan="3">
            <textarea rows="5" v-model="jxdList.pfkJxd6Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ jxdList.pfkJxd6Grade1 }}</span></td>
            <td rowspan="3">{{ jxdList.pfkJxd6Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue6" id="jxdvalue6B" ref="jxdvalue6B" disabled value="3" @click="clickValue($event,6)"/>
            <label for="jxdvalue6B">B．1年（含）以上，5年以下</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue6" id="jxdvalue6C" ref="jxdvalue6C" disabled value="0" @click="clickValue($event,6)"/>
            <label for="jxdvalue6C">C．1年以下</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="3">2.企业所属行业</td>
            <td>
            <input type="radio" name="jxdvalue7" id="jxdvalue7A" ref="jxdvalue7A" disabled value="6" @click="clickValue($event,7)"/>
            <label for="jxdvalue7A">A．我行鼓励性行业企业，及大消费类（餐饮、医药、商业零售、旅游等）、流通类、高科技类</label>
            </td>
            <td>6</td>
            <td rowspan="3">
            <textarea rows="5" v-model="jxdList.pfkJxd7Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span >{{ jxdList.pfkJxd7Grade1 }}</span></td>
            <td rowspan="3"><span >{{ jxdList.pfkJxd7Grade2 }}</span></td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue7" id="jxdvalue7B" ref="jxdvalue7B" disabled value="3" @click="clickValue($event,7)"/>
            <label for="jxdvalue7B">B．适度介入调整性行业企业；（如机械设备制造业、有色及黑色金属冶炼业、纺织行业、建筑材料制造、化学原料及化学制品业、批发和零售业）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue7" id="jxdvalue7C" ref="jxdvalue7C" disabled value="0" @click="clickValue($event,7)"/>
            <label for="jxdvalue7C">C．审慎介入控制性行业企业；（高能耗、高污染、产能过剩行业如钢贸、造船、房地产、建筑）</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="6">3.企业经营状况</td>
            <td>
            <input type="radio" name="jxdvalue8" id="jxdvalue8A" ref="jxdvalue8A" disabled value="12" @click="clickValue($event,8)"/>
            <label for="jxdvalue8A">A．盈利水平（连续2年利润总额为正，且上年利润总额较上上年增长率≥10%，当期利润总额为正）；成长性（上年销售收入较上上年增长率≥10%）</label>
            </td>
            <td>12</td>
            <td rowspan="6">
            <textarea rows="5" v-model="jxdList.pfkJxd8Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="6"><span>{{ jxdList.pfkJxd8Grade1 }}</span></td>
            <td rowspan="6">{{ jxdList.pfkJxd8Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue8" id="jxdvalue8B" ref="jxdvalue8B" disabled value="10" @click="clickValue($event,8)"/>
            <label for="jxdvalue8B">B．盈利水平（连续2年及当期利润总额为正）；成长性（连续2年销售收入保持增长）</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue8" id="jxdvalue8C" ref="jxdvalue8C" disabled value="8" @click="clickValue($event,8)"/>
            <label for="jxdvalue8C">C．盈利水平（当期利润总额为正）；成长性（当期销售收入较上年同期呈现增长）</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue8" id="jxdvalue8D" ref="jxdvalue8D" disabled value="6" @click="clickValue($event,8)"/>
            <label for="jxdvalue8D">D.盈利水平（当期利润总额为正）；成长性（当期销售收入较上年同期未有增长）</label>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue8" id="jxdvalue8E" ref="jxdvalue8E" disabled value="2" @click="clickValue($event,8)"/>
            <label for="jxdvalue8E">E．盈利水平（当期利润总额较上年同期下降，但降幅未超过30%）；成长性（当期销售收较上年同期下降，但降幅未超过30%）</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue8" id="jxdvalue8F" ref="jxdvalue8F" disabled value="0" @click="clickValue($event,8)"/>
            <label for="jxdvalue8F">F．不符合以上情况</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="4" style="text-align:center"><font color="red">4.企业上下游合作情况<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="jxdvalue9" id="jxdvalue9A" ref="jxdvalue9A" :disabled="!isEdit" value="6" @click="clickValue($event,9)"/>
            <label for="jxdvalue9A">A．与上下游企业合作关系稳定，下游至少有4家往来2年以上合作企业（知名企业、大型企业集团或重点项目配套企业不受固定往来企业户数限制）</label>
            </td>
            <td>6</td>
            <td rowspan="4">
            <textarea rows="5" v-model="jxdList.pfkJxd9Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span >{{ jxdList.pfkJxd9Grade1 }}</span></td>
            <td rowspan="4"><span >{{ jxdList.pfkJxd9Grade2 }}</span></td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue9" id="jxdvalue9B" ref="jxdvalue9B" :disabled="!isEdit" value="4" @click="clickValue($event,9)"/>
            <label for="jxdvalue9B">B．与上下游企业合作关系稳定，下游至少有3家往来2年以上合作企业</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue9" id="jxdvalue9C" ref="jxdvalue9C" :disabled="!isEdit" value="3" @click="clickValue($event,9)"/>
            <label for="jxdvalue9C">C．与上下游企业合作关系稳定度一般，下游至少有2家往来2年以上合作企业</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue9" id="jxdvalue9D" ref="jxdvalue9D" :disabled="!isEdit" value="1" @click="clickValue($event,9)"/>
            <label for="jxdvalue9D">D．与上下游企业合作关系较不稳定，缺乏往来2年以上合作企业</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td rowspan="5">关联企业经营情况</td>
            <td rowspan="5" style="text-align:center"><font color="red">1.法人或实际控制人其他产业经营情况<br>（请选择相应分数） </font></td>
            <td>
            <input type="radio" name="jxdvalue10" id="jxdvalue10A" ref="jxdvalue10A" :disabled="!isEdit" value="6" @click="clickValue($event,10)"/>
            <label for="jxdvalue10A">A.法人或实际控制人无其他第二产业</label>
            </td>
            <td>6</td>
            <td rowspan="5">
            <textarea rows="5" v-model="jxdList.pfkJxd10Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ jxdList.pfkJxd10Grade1 }}</span></td>
            <td rowspan="5">{{ jxdList.pfkJxd10Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue10" id="jxdvalue10B" ref="jxdvalue10B" :disabled="!isEdit" value="5" @click="clickValue($event,10)"/>
            <label for="jxdvalue10B">B.法人或实际控制人有其他正常第二产业</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue10" id="jxdvalue10C" ref="jxdvalue10C" :disabled="!isEdit" value="3" @click="clickValue($event,10)"/>
            <label for="jxdvalue10C">C.法人或实际控制人其他产业为适度介入调整性行业企业；（如机械设备制造业、有色及黑色金属冶炼业、纺织行业、建筑材料制造、化学原料及化学制品业、批发和零售业）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue10" id="jxdvalue10D" ref="jxdvalue10D" :disabled="!isEdit" value="0" @click="clickValue($event,10)"/>
            <label for="jxdvalue10D">D.法人或实际控制人其他产业审慎介入控制性行业企业（高能耗、高污染、产能过剩行业如钢贸、造船、房地产、建筑）</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue10" id="jxdvalue10E" ref="jxdvalue10E" :disabled="!isEdit" value="-50" @click="clickValue($event,10)"/>
            <label for="jxdvalue10E">E.法人或实际控制人有涉及资金生意、小贷公司、担保公司及典当方面的经营</label>
            </td>
            <td>-50</td>
          </tr>
          <tr>
            <td rowspan="10">企业法人实际控制人房产与本次融资比例情况</td>
            <td rowspan="5" style="text-align:center"><font color="red">1.企业及实际控人名下房产抵押情况<br>(请选择相应分数)</font></td>
            <td>
            <input type="radio" name="jxdvalue11" id="jxdvalue11A" ref="jxdvalue11A" :disabled="!isEdit" value="4" @click="clickValue($event,11)"/>
            <label for="jxdvalue11A">A.企业、法人或实际控制人名下均有未抵押的房产</label>
            </td>
            <td>4</td>
            <td rowspan="5">
            <textarea rows="5" v-model="jxdList.pfkJxd11Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ jxdList.pfkJxd11Grade1 }}</span></td>
            <td rowspan="5">{{ jxdList.pfkJxd11Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue11" id="jxdvalue11B" ref="jxdvalue11B" :disabled="!isEdit" value="3" @click="clickValue($event,11)"/>
            <label for="jxdvalue11B">B.企业、法人或实际控制人名下有房产，企业已经全部抵押，法人有未抵押房产</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue11" id="jxdvalue11C" ref="jxdvalue11C" :disabled="!isEdit" value="2" @click="clickValue($event,11)"/>
            <label for="jxdvalue11C">C.企业名下无房产，法人或实际控制人名下有未抵押的房产</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue11" id="jxdvalue11D" ref="jxdvalue11D" :disabled="!isEdit" value="1" @click="clickValue($event,11)"/>
            <label for="jxdvalue11D">D.企业及法人或实际控制人名下的房产（如有）均已经抵押</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue11" id="jxdvalue11E" ref="jxdvalue11E" :disabled="!isEdit" value="0" @click="clickValue($event,11)"/>
            <label for="jxdvalue11E">E.企业及法人或实际控制人在本地无房产</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">2.申请金额与企业主名下可抵押房产比率</td>
            <td>
            <input type="radio" name="jxdvalue12" id="jxdvalue12A" ref="jxdvalue12A" disabled value="6" @click="clickValue($event,12)"/>
            <label for="jxdvalue12A">A．比率≤50%</label>
            </td>
            <td>6</td>
            <td rowspan="5">
            <textarea rows="5" v-model="jxdList.pfkJxd12Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ jxdList.pfkJxd12Grade1 }}</span></td>
            <td rowspan="5">{{ jxdList.pfkJxd12Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue12" id="jxdvalue12B" ref="jxdvalue12B" disabled value="5" @click="clickValue($event,12)"/>
            <label for="jxdvalue12B">B．比率≤60% </label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue12" id="jxdvalue12C" ref="jxdvalue12C" disabled value="4" @click="clickValue($event,12)"/>
            <label for="jxdvalue12C">C．比率≤70% </label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue12" id="jxdvalue12D" ref="jxdvalue12D" disabled value="2" @click="clickValue($event,12)"/>
            <label for="jxdvalue12D">D．比率≤100%</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue12" id="jxdvalue12E" ref="jxdvalue12E" disabled value="0" @click="clickValue($event,12)"/>
            <label for="value12E">E．比率>100%</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="6">其他类</td>
            <td rowspan="3" style="text-align:center"><font color="red">1.法人面谈情况<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="jxdvalue13" id="jxdvalue13A" ref="jxdvalue13A" :disabled="!isEdit" value="3" @click="clickValue($event,13)"/>
            <label for="jxdvalue13A">A.法人精神面貌良好</label>
            </td>
            <td>3</td>
            <td rowspan="3">
            <textarea rows="5" v-model="jxdList.pfkJxd13Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ jxdList.pfkJxd13Grade1 }}</span></td>
            <td rowspan="3">{{ jxdList.pfkJxd13Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue13" id="jxdvalue13B" ref="jxdvalue13B" :disabled="!isEdit" value="2" @click="clickValue($event,13)"/>
            <label for="jxdvalue13B">B 法人精神面貌一般</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue13" id="jxdvalue13C" ref="jxdvalue13C" :disabled="!isEdit" value="0" @click="clickValue($event,13)"/>
            <label for="jxdvalue13C">C 法人精神面貌颓废</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="3" style="text-align:center"><font color="red">2.法人或实际控制人个人情况<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="jxdvalue14" id="jxdvalue14A" ref="jxdvalue14A" :disabled="!isEdit" value="4" @click="clickValue($event,14)"/>
            <label for="jxdvalue14A">A法人或实际控制人已经在本地落户，且在本地拥有房产</label>
            </td>
            <td>4</td>
            <td rowspan="3">
            <textarea rows="5" v-model="jxdList.pfkJxd14Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ jxdList.pfkJxd14Grade1 }}</span></td>
            <td rowspan="3">{{ jxdList.pfkJxd14Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue14" id="jxdvalue14B" ref="jxdvalue14B" :disabled="!isEdit" value="2" @click="clickValue($event,14)"/>
            <label for="jxdvalue14B">B 法人或实际控制人已经在本地拥有房产，尚未落户</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="jxdvalue14" id="jxdvalue14C" ref="jxdvalue14C" :disabled="!isEdit" value="0" @click="clickValue($event,14)"/>
            <label for="jxdvalue14C">C 法人或实际控制人在本地无房产、未落户</label>
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
     </yu-panel>
    </div>
     <yu-panel title="其他重点关注调查内容"  :hideFilter="false" :collapseHide="false">
     <yu-xform-group :column="1" class="focusJxd" >
        <yu-xform-item label="企业有无违规排污，有无被环保部门查处和处罚" ctype="select"  name="focusJxd1" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        <yu-xform-item label="企业员工人数是否稳定，员工待遇是否合理" ctype="select" name="focusJxd2" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        <yu-xform-item label="企业有无被税务机关查处和处罚" ctype="select" name="focusJxd3" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        <yu-xform-item label="有无异常工商股权变更情况" ctype="select" name="focusJxd4" label-width="900px" data-code="STD_ZB_YES_NO"></yu-xform-item>
        <yu-xform-item label="企业贷款银行是否超过3家" ctype="select" name="focusJxd5" label-width="900px"  data-code="STD_ZB_YES_NO"></yu-xform-item>
        <yu-xform-item label="企业及实际控制人他行信用贷款授信额+我行信用贷款+信用卡用信额+结息贷申请额是否大于500万元" ctype="select" label-width="900px" name="focusJxd6" data-code="STD_ZB_YES_NO"  ></yu-xform-item>
        <yu-xform-item label="实际控制人有无吸毒、赌博等不良嗜好，其信用卡是否经常在境外大额支付等" label-width="900px" ctype="select" name="focusJxd8" data-code="STD_ZB_YES_NO"  ></yu-xform-item>
        <yu-xform-item label="实际控制人是否存在炒房、炒原材料、炒股票期货等投机行为" ctype="select" label-width="900px" name="focusJxd9" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        <yu-xform-item label="实际控制人是否参与民间融资、投资高风险行业等行为" ctype="select" label-width="900px" name="focusJxd10" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        <yu-xform-item label="有无其他影响企业稳定经营的情况" ctype="select" name="focusJxd11" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        <yu-xform-item label="企业自制报表资产负债率是否超过75%" ctype="select" name="focusJxd12" label-width="900px" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        <yu-xform-item label="合规经营其它不利情况请简述" ctype="textarea"  name="focusJxd7" label-width="900px" ></yu-xform-item>
     </yu-xform-group>
     </yu-panel>
     </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="isEdit&&op!='VIEW'">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  components: {},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      jxdList: [],
      isEdit: true,
      index: '1',
      managerType: '01',
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
    /**
     * 加载表单数据
     */
    init: function () {
      var _this = this;
      var serno = _this.param.serno;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/rptspdanysjxd/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.baseFormdata1);
            _this.jxdList = response.data;
            _this.checkRadio(_this.jxdList);
          } else {
            var obj = {};
            obj.serno = _this.param.serno;
            yufp.service.request({
              method: 'POST',
              async: false,
              url: backend.cmisBiz + '/api/rptspdanysjxd/initJxd',
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
    measureLmtAmt: function () {
      var _this = this;
      var fqSelfBankIrsmAmt = _this.baseFormdata1.fqSelfBankIrsmAmt;
      var fqOhterBankIrsmAmt = _this.baseFormdata1.fqOhterBankIrsmAmt;
      var sqSelfBankIrsmAmt = _this.baseFormdata1.sqSelfBankIrsmAmt;
      var sqOhterBankIrsmAmt = _this.baseFormdata1.sqOhterBankIrsmAmt;
      var tqSelfBankIrsmAmt = _this.baseFormdata1.tqSelfBankIrsmAmt;
      var tqOhterBankIrsmAmt = _this.baseFormdata1.tqOhterBankIrsmAmt;
      var lqSelfBankIrsmAmt = _this.baseFormdata1.lqSelfBankIrsmAmt;
      var lqOhterBankIrsmAmt = _this.baseFormdata1.lqOhterBankIrsmAmt;
      var selfBankIrsmAmt = parseFloat(fqSelfBankIrsmAmt) + parseFloat(sqSelfBankIrsmAmt) + parseFloat(tqSelfBankIrsmAmt) + parseFloat(lqSelfBankIrsmAmt);
      var otherBankIrsmAmt = parseFloat(fqOhterBankIrsmAmt) + parseFloat(sqOhterBankIrsmAmt) + parseFloat(tqOhterBankIrsmAmt) + parseFloat(lqOhterBankIrsmAmt);
      selfBankIrsmAmt = isNaN(selfBankIrsmAmt) ? 0 : selfBankIrsmAmt;
      otherBankIrsmAmt = isNaN(otherBankIrsmAmt) ? 0 : otherBankIrsmAmt;
      var lmtAmt = parseFloat((((parseFloat(selfBankIrsmAmt) * 1.2) + (parseFloat(otherBankIrsmAmt) * 0.8)) / 0.003) * 3).toFixed(2);
      _this.baseFormdata1.selfBankMaxLoanAmt = lmtAmt;
    },
    /** 自动打分 */
    autoRecord: function (managerType) {
      var _this = this;
      var serno = this.param.serno;
      var obj = {};
      obj = _this.jxdList;
      obj.fqDate = _this.baseFormdata1.fqDate;
      obj.fqSelfBankIrsmAmt = _this.baseFormdata1.fqSelfBankIrsmAmt;
      obj.fqOhterBankIrsmAmt = _this.baseFormdata1.fqOhterBankIrsmAmt;
      obj.sqDate = _this.baseFormdata1.sqDate;
      obj.sqSelfBankIrsmAmt = _this.baseFormdata1.sqSelfBankIrsmAmt;
      obj.sqOhterBankIrsmAmt = _this.baseFormdata1.sqOhterBankIrsmAmt;
      obj.tqDate = _this.baseFormdata1.tqDate;
      obj.tqSelfBankIrsmAmt = _this.baseFormdata1.tqSelfBankIrsmAmt;
      obj.tqOhterBankIrsmAmt = _this.baseFormdata1.tqOhterBankIrsmAmt;
      obj.lqDate = _this.baseFormdata1.lqDate;
      obj.lqSelfBankIrsmAmt = _this.baseFormdata1.lqSelfBankIrsmAmt;
      obj.lqOhterBankIrsmAmt = _this.baseFormdata1.lqOhterBankIrsmAmt;
      obj.selfBankMaxLoanAmt = _this.baseFormdata1.selfBankMaxLoanAmt;
      obj.ohterBankMaxLoanAmt = _this.baseFormdata1.ohterBankMaxLoanAmt;
      obj.lastYearTopsell1CusName = _this.baseFormdata1.lastYearTopsell1CusName;
      obj.lastYearTopsell1CoopTerm = _this.baseFormdata1.lastYearTopsell1CoopTerm;
      obj.lastYearTopsell1Income = _this.baseFormdata1.lastYearTopsell1Income;
      obj.lastYearTopsell2CusName = _this.baseFormdata1.lastYearTopsell2CusName;
      obj.lastYearTopsell2CoopTerm = _this.baseFormdata1.lastYearTopsell2CoopTerm;
      obj.lastYearTopsell2Income = _this.baseFormdata1.lastYearTopsell2Income;
      obj.lastYearTopsell3CusName = _this.baseFormdata1.lastYearTopsell3CusName;
      obj.lastYearTopsell3CoopTerm = _this.baseFormdata1.lastYearTopsell3CoopTerm;
      obj.lastYearTopsell3Income = _this.baseFormdata1.lastYearTopsell3Income;
      obj.lastYearTopsell1ProviderName = _this.baseFormdata1.lastYearTopsell1ProviderName;
      obj.lastYearTopsell1ProviderCoopTerm = _this.baseFormdata1.lastYearTopsell1ProviderCoopTerm;
      obj.lastYearTopsell1Provider = _this.baseFormdata1.lastYearTopsell1Provider;
      obj.lastYearTopsell2ProviderName = _this.baseFormdata1.lastYearTopsell2ProviderName;
      obj.lastYearTopsell2ProviderCoopTerm = _this.baseFormdata1.lastYearTopsell2ProviderCoopTerm;
      obj.lastYearTopsell2Provider = _this.baseFormdata1.lastYearTopsell2Provider;
      obj.lastYearTopsell3ProviderName = _this.baseFormdata1.lastYearTopsell3ProviderName;
      obj.lastYearTopsell3ProviderCoopTerm = _this.baseFormdata1.lastYearTopsell3ProviderCoopTerm;
      obj.lastYearTopsell3Provider = _this.baseFormdata1.lastYearTopsell3Provider;
      obj.lastTwoYearMainBusinessPremisesNature = _this.baseFormdata1.lastTwoYearMainBusinessPremisesNature;
      obj.lastTwoYearBusinessPremisesChgTimes = _this.baseFormdata1.lastTwoYearBusinessPremisesChgTimes;
      obj.tnopwtioeafnlt5ply = _this.baseFormdata1.tnopwtioeafnlt5ply;
      obj.tsoasitpy = _this.baseFormdata1.tsoasitpy;
      obj.arbo90Days = _this.baseFormdata1.arbo90Days;
      obj.arbo180Days = _this.baseFormdata1.arbo180Days;
      obj.lastYearElectricityConsumption = _this.baseFormdata1.lastYearElectricityConsumption;
      obj.ecvopcitpy = _this.baseFormdata1.ecvopcitpy;
      obj.totalWagesPaidLastYear = _this.baseFormdata1.totalWagesPaidLastYear;
      obj.totalWpitpy = _this.baseFormdata1.totalWpitpy;
      obj.verifiableOperatingIncome = _this.baseFormdata1.verifiableOperatingIncome;
      obj.addiobly = _this.baseFormdata1.addiobly;
      obj.scotbsaiob = _this.baseFormdata1.scotbsaiob;
      obj.adliobly = _this.baseFormdata1.adliobly;
      obj.focusJxd1 = _this.baseFormdata1.focusJxd1;
      obj.focusJxd2 = _this.baseFormdata1.focusJxd2;
      obj.focusJxd3 = _this.baseFormdata1.focusJxd3;
      obj.focusJxd4 = _this.baseFormdata1.focusJxd4;
      obj.focusJxd5 = _this.baseFormdata1.focusJxd5;
      obj.focusJxd6 = _this.baseFormdata1.focusJxd6;
      obj.focusJxd7 = _this.baseFormdata1.focusJxd7;
      obj.focusJxd8 = _this.baseFormdata1.focusJxd8;
      obj.focusJxd9 = _this.baseFormdata1.focusJxd9;
      obj.focusJxd10 = _this.baseFormdata1.focusJxd10;
      obj.focusJxd11 = _this.baseFormdata1.focusJxd11;
      obj.focusJxd12 = _this.baseFormdata1.focusJxd12;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysjxd/save',
        data: obj,
        callback: function (code, message, response) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/rptspdanysjxd/autoValue',
            data: {'serno': serno, 'managerType': managerType},
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
      this.jxdList['pfkJxd' + num + 'Grade' + _this.index] = event.currentTarget.value;
      if (_this.index == '1') {
        _this.totalGrade1 = parseInt(_this.jxdList.pfkJxd2Grade1) + parseInt(_this.jxdList.pfkJxd3Grade1) +
      parseInt(_this.jxdList.pfkJxd4Grade1) + parseInt(_this.jxdList.pfkJxd5Grade1) + parseInt(_this.jxdList.pfkJxd6Grade1) + parseInt(_this.jxdList.pfkJxd7Grade1) +
      parseInt(_this.jxdList.pfkJxd8Grade1) + parseInt(_this.jxdList.pfkJxd12Grade1);
        if (_this.jxdList.pfkJxd1Grade1) {
          _this.totalGrade1 += parseInt(_this.jxdList.pfkJxd1Grade1);
        }
        if (_this.jxdList.pfkJxd9Grade1) {
          _this.totalGrade1 += parseInt(_this.jxdList.pfkJxd9Grade1);
        }
        if (_this.jxdList.pfkJxd10Grade1) {
          _this.totalGrade1 += parseInt(_this.jxdList.pfkJxd10Grade1);
        }
        if (_this.jxdList.pfkJxd11Grade1) {
          _this.totalGrade1 += parseInt(_this.jxdList.pfkJxd11Grade1);
        }
        if (_this.jxdList.pfkJxd13Grade1) {
          _this.totalGrade1 += parseInt(_this.jxdList.pfkJxd13Grade1);
        }
        if (_this.jxdList.pfkJxd14Grade1) {
          _this.totalGrade1 += parseInt(_this.jxdList.pfkJxd14Grade1);
        }
      } else if (_this.index == '2') {
        _this.totalGrade2 = parseInt(_this.jxdList.pfkJxd2Grade2) + parseInt(_this.jxdList.pfkJxd3Grade2) +
      parseInt(_this.jxdList.pfkJxd4Grade2) + parseInt(_this.jxdList.pfkJxd5Grade2) + parseInt(_this.jxdList.pfkJxd6Grade2) + parseInt(_this.jxdList.pfkJxd7Grade2) +
      parseInt(_this.jxdList.pfkJxd8Grade2) + parseInt(_this.jxdList.pfkJxd12Grade2);
        if (_this.jxdList.pfkJxd1Grade2) {
          _this.totalGrade2 += parseInt(_this.jxdList.pfkJxd1Grade2);
        }
        if (_this.jxdList.pfkJxd9Grade2) {
          _this.totalGrade2 += parseInt(_this.jxdList.pfkJxd9Grade2);
        }
        if (_this.jxdList.pfkJxd10Grade2) {
          _this.totalGrade2 += parseInt(_this.jxdList.pfkJxd10Grade2);
        }
        if (_this.jxdList.pfkJxd11Grade2) {
          _this.totalGrade2 += parseInt(_this.jxdList.pfkJxd11Grade2);
        }
        if (_this.jxdList.pfkJxd13Grade2) {
          _this.totalGrade2 += parseInt(_this.jxdList.pfkJxd13Grade2);
        }
        if (_this.jxdList.pfkJxd14Grade2) {
          _this.totalGrade2 += parseInt(_this.jxdList.pfkJxd14Grade2);
        }
      }
    },
    checkRadio: function (data) {
      var _this = this;
      for (var i = 1; i < 15; i++) {
        var name = 'name' + i;
        var value = 'jxdvalue' + i;
        var pfkJxdGrade = 'pfkJxd' + i + 'Grade1';
        name = document.getElementsByName(value);
        for (var j = 0; j < name.length; j++) {
          if (data[pfkJxdGrade] != null) {
            if (Number(name[j].value) == Number(data[pfkJxdGrade])) {
              name[j].checked = true;
              break;
            }
          }
        }
      }
      _this.totalGrade1 = parseInt(data.pfkJxd2Grade1) + parseInt(data.pfkJxd3Grade1) +
      parseInt(data.pfkJxd4Grade1) + parseInt(data.pfkJxd5Grade1) + parseInt(data.pfkJxd6Grade1) + parseInt(data.pfkJxd7Grade1) +
      parseInt(data.pfkJxd8Grade1) + parseInt(data.pfkJxd12Grade1);
      if (data.pfkJxd1Grade1) {
        _this.totalGrade1 += parseInt(data.pfkJxd1Grade1);
      }
      if (data.pfkJxd9Grade1) {
        _this.totalGrade1 += parseInt(data.pfkJxd9Grade1);
      }
      if (data.pfkJxd10Grade1) {
        _this.totalGrade1 += parseInt(data.pfkJxd10Grade1);
      }
      if (data.pfkJxd11Grade1) {
        _this.totalGrade1 += parseInt(data.pfkJxd11Grade1);
      }
      if (data.pfkJxd13Grade1) {
        _this.totalGrade1 += parseInt(data.pfkJxd13Grade1);
      }
      if (data.pfkJxd14Grade1) {
        _this.totalGrade1 += parseInt(data.pfkJxd14Grade1);
      }
      _this.totalGrade2 = parseInt(data.pfkJxd2Grade2) + parseInt(data.pfkJxd3Grade2) +
      parseInt(data.pfkJxd4Grade2) + parseInt(data.pfkJxd5Grade2) + parseInt(data.pfkJxd6Grade2) + parseInt(data.pfkJxd7Grade2) +
      parseInt(data.pfkJxd8Grade2) + parseInt(data.pfkJxd12Grade2);
      if (data.pfkJxd1Grade2) {
        _this.totalGrade2 += parseInt(data.pfkJxd1Grade2);
      }
      if (data.pfkJxd9Grade2) {
        _this.totalGrade2 += parseInt(data.pfkJxd9Grade2);
      }
      if (data.pfkJxd10Grade2) {
        _this.totalGrade2 += parseInt(data.pfkJxd10Grade2);
      }
      if (data.pfkJxd11Grade2) {
        _this.totalGrade2 += parseInt(data.pfkJxd11Grade2);
      }
      if (data.pfkJxd13Grade2) {
        _this.totalGrade2 += parseInt(data.pfkJxd13Grade2);
      }
      if (data.pfkJxd14Grade2) {
        _this.totalGrade2 += parseInt(data.pfkJxd14Grade2);
      }
      _this.totalGrade1 = isNaN(_this.totalGrade1) ? 0 : _this.totalGrade1;
      _this.totalGrade2 = isNaN(_this.totalGrade2) ? 0 : _this.totalGrade2;
    },
    submit: function () {
      var _this = this;
      var obj = {};
      yufp.clone(_this.baseFormdata1, obj);
      obj.pfkJxd1Desc = _this.jxdList.pfkJxd1Desc;
      obj.pfkJxd1Grade1 = _this.jxdList.pfkJxd1Grade1;
      obj.pfkJxd1Grade2 = _this.jxdList.pfkJxd1Grade2;
      obj.pfkJxd2Desc = _this.jxdList.pfkJxd2Desc;
      obj.pfkJxd2Grade1 = _this.jxdList.pfkJxd2Grade1;
      obj.pfkJxd2Grade2 = _this.jxdList.pfkJxd2Grade2;
      obj.pfkJxd3Desc = _this.jxdList.pfkJxd3Desc;
      obj.pfkJxd3Grade1 = _this.jxdList.pfkJxd3Grade1;
      obj.pfkJxd3Grade2 = _this.jxdList.pfkJxd3Grade2;
      obj.pfkJxd4Desc = _this.jxdList.pfkJxd4Desc;
      obj.pfkJxd4Grade1 = _this.jxdList.pfkJxd4Grade1;
      obj.pfkJxd4Grade2 = _this.jxdList.pfkJxd4Grade2;
      obj.pfkJxd5Desc = _this.jxdList.pfkJxd5Desc;
      obj.pfkJxd5Grade1 = _this.jxdList.pfkJxd5Grade1;
      obj.pfkJxd5Grade2 = _this.jxdList.pfkJxd5Grade2;
      obj.pfkJxd6Desc = _this.jxdList.pfkJxd6Desc;
      obj.pfkJxd6Grade1 = _this.jxdList.pfkJxd6Grade1;
      obj.pfkJxd6Grade2 = _this.jxdList.pfkJxd6Grade2;
      obj.pfkJxd7Desc = _this.jxdList.pfkJxd7Desc;
      obj.pfkJxd7Grade1 = _this.jxdList.pfkJxd7Grade1;
      obj.pfkJxd7Grade2 = _this.jxdList.pfkJxd7Grade2;
      obj.pfkJxd8Desc = _this.jxdList.pfkJxd8Desc;
      obj.pfkJxd8Grade1 = _this.jxdList.pfkJxd8Grade1;
      obj.pfkJxd8Grade2 = _this.jxdList.pfkJxd8Grade2;
      obj.pfkJxd9Desc = _this.jxdList.pfkJxd9Desc;
      obj.pfkJxd9Grade1 = _this.jxdList.pfkJxd9Grade1;
      obj.pfkJxd9Grade2 = _this.jxdList.pfkJxd9Grade2;
      obj.pfkJxd10Desc = _this.jxdList.pfkJxd10Desc;
      obj.pfkJxd10Grade1 = _this.jxdList.pfkJxd10Grade1;
      obj.pfkJxd10Grade2 = _this.jxdList.pfkJxd10Grade2;
      obj.pfkJxd11Desc = _this.jxdList.pfkJxd11Desc;
      obj.pfkJxd11Grade1 = _this.jxdList.pfkJxd11Grade1;
      obj.pfkJxd11Grade2 = _this.jxdList.pfkJxd11Grade2;
      obj.pfkJxd12Desc = _this.jxdList.pfkJxd12Desc;
      obj.pfkJxd12Grade1 = _this.jxdList.pfkJxd12Grade1;
      obj.pfkJxd12Grade2 = _this.jxdList.pfkJxd12Grade2;
      obj.pfkJxd13Desc = _this.jxdList.pfkJxd13Desc;
      obj.pfkJxd13Grade1 = _this.jxdList.pfkJxd13Grade1;
      obj.pfkJxd13Grade2 = _this.jxdList.pfkJxd13Grade2;
      obj.pfkJxd14Desc = _this.jxdList.pfkJxd14Desc;
      obj.pfkJxd14Grade1 = _this.jxdList.pfkJxd14Grade1;
      obj.pfkJxd14Grade2 = _this.jxdList.pfkJxd14Grade2;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysjxd/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.$message({
              message: '保存成功'
            });
          }
        }});
    }
  }
};
</script>
<style>
.focusJxd .el-form-item__label{
text-align: left;
}
.card tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
}
</style>
