
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 特定产品业务分析：外贸贷 rpt_spd_anys_wmd   rptSpdAnysWmd
  -->
  <div>
    <yu-panel title="外贸贷" panel-type="simple">
       <yu-xform ref="wmdForm1" label-width="240px" v-model="formdatawmd1" :disabled="op =='VIEW'">
             <yu-xform-group :column="2">
            <yu-xform-item label="申请流水号" ctype="input" name="serno"  hidden="true"></yu-xform-item>
            <yu-xform-item label="纳税评级（A/B/C/D/M）" ctype="select" name="taxRate" rules="required" data-code="STD_TAX_GRADE" @change="measureLmtAmt"></yu-xform-item>
            <yu-xform-item label="外管货物贸易评级（A/B/C）" ctype="select" name="foreignGoodTradeGrade" rules="required" data-code="STD_TAX_GRADE" :datacode-filter="datacodeFilterFn" ></yu-xform-item>
            <yu-xform-item label="上年度免抵退增值税" ctype="yu-num" rules="required" name="lastYearVat" ></yu-xform-item>
            <yu-xform-item label="上年度出口总量(万美元)" ctype="yu-num" :multiple="0.0001" rules="required"  name="lastYearTotalExports" @change="measureLmtAmt" ></yu-xform-item>
            <yu-xform-item label="本年度最新出口总量(万美元)" ctype="yu-num" :multiple="0.0001" name="lastYearInternationalVolume" ></yu-xform-item>
            <yu-xform-item label="上一年我行国际结算量(万美元)" ctype="yu-num" :multiple="0.0001" name="ownVolume" ></yu-xform-item>
            <yu-xform-item label="测算授信额度" ctype="yu-num"  name="lmtAmt" disabled ></yu-xform-item>
             </yu-xform-group>
       </yu-xform>
<!--rpt_spd_anys_wmd_slm_detail 表-->
      <yu-panel title="企业结算情况（交易对手、金额等）（应包括主要结算银行的结算情况，存量客户则提供在本行的结算情况，如有他行结算情况请附带）" panel-type="simple">
      <yu-form-buttons class="yubfp-button-group" style="align:margin-left">
        <yu-button type="primary" @click="addWmd3" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editWmd3" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteWmd3" v-show="op!='VIEW'">删除</yu-button>
      </yu-form-buttons>
        <yu-xtable ref="wmdSlmDetailTable3" row-number :data-url="wmdSlmDetaildataUrl3" condition-key="condition" :pageable="false" :base-params="wmdSlmDetailParam3" request-type="POST">
          <yu-xtable-column prop="topp" label="交易对手" data-code="STD_RPT_TOPP_TYPE"></yu-xtable-column>
          <yu-xtable-column prop="toppName" label="交易对手名称"></yu-xtable-column>
          <yu-xtable-column prop="lastYearBusiRate" label="上年所占业务比例">
          <template slot-scope="scope">
        {{ isNaN(formatterNum(scope.row.lastYearBusiRate))? '':formatterNum(scope.row.lastYearBusiRate *100)+'%' }}
      </template>
          </yu-xtable-column>
          <yu-xtable-column prop="toppGoods" label="交易商品"></yu-xtable-column>
          <yu-xtable-column prop="settType" label="结算方式"></yu-xtable-column>
          <yu-xtable-column prop="acctPeriod" label="帐期"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog title="企业结算情况（交易对手、金额等）（应包括主要结算银行的结算情况，存量客户则提供在本行的结算情况，如有他行结算情况请附带）" :visible.sync="dialogWmd3" width="1000px">
        <yu-xform ref="wmdDialog3" label-width="160px" v-model="dialogFormWmd3">
          <yu-xform-group :column="2">
            <yu-xform-item label="交易对手" name="topp" ctype="select" data-code="STD_RPT_TOPP_TYPE"></yu-xform-item>
            <yu-xform-item label="交易对手名称" name="toppName" ctype="input"></yu-xform-item>
            <yu-xform-item label="上年所占业务比例" name="lastYearBusiRate" ctype="yu-num" :multiple="100" sign="%"></yu-xform-item>
            <yu-xform-item label="交易商品" name="toppGoods" ctype="input"></yu-xform-item>
            <yu-xform-item label="结算方式" name="settType" ctype="input" ></yu-xform-item>
            <yu-xform-item label="帐期" name="acctPeriod" ctype="input" ></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveWmd3">保存</yu-button>
            <yu-button type="primary" @click="backWmd3">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
<!--rpt_spd_anys_wmd 表-->
      <yu-panel title="4.企业整体经营及投资状况（包括资产、负债、利润总额，资产负债率、销售利润率，对外投资情况）" panel-type="simple" >
        <yu-xform ref="wmdForm4" label-width="240px" v-model="formdatawmd4" :disabled="op =='VIEW'">
          <yu-xform-group :column="1">
            <yu-xform-item label="企业整体经营及投资状况1" name="overOperInveSitu1" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="企业整体经营及投资状况2" name="overOperInveSitu2" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="企业整体经营及投资状况3" name="overOperInveSitu3" ctype="textarea"></yu-xform-item>
  <!--rpt_spd_anys_wmd 表中  没有与"对外投资"这个字段-->
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    <div class="card">
      <yu-panel title="评分卡打分（系统根据调查报告内容自动判断打分，如无法判断，则客户经理手工打分）" panel-type="simple" >
      <yu-form-buttons align="right">
      <yu-button type="primary" @click="autoRecord1(managerType)" v-show="isEdit&&op!='VIEW'">自动评分</yu-button>
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
            <td rowspan="22">一、征信及客户资产负债情况（36分）</td>
            <td rowspan="4">1.企业实际控制人或法定代表人个人征信信用情况（权重10分）</td>
            <td>
            <input type="radio" name="wmdvalue1" id="wmdvalue1A" ref="wmdvalue1A" v-model="wmdValue1" disabled value="10" @click="clickValue($event,1)"/>
            <label for="wmdvalue1A">A．实际控制人或法定代表人近三年无逾期记录</label>
            </td>
            <td>10</td>
            <td rowspan="4">
            <textarea rows="5"  v-model="wmdList.pfkWmd1Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ wmdList.pfkWmd1Grade1 }}</span></td>
            <td rowspan="4">{{ wmdList.pfkWmd1Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue1" id="wmdvalue1B" ref="wmdvalue1B" v-model="wmdValue1" disabled value="7" @click="clickValue($event,1)"/>
            <label for="wmdvalue1B">B．实际控制人或法定代表人个人贷款三年内逾期≤1次或信用卡三年内逾期≤3次，并及时还款的（由贷款银行出具证明，非企业原因造成逾期的，不纳入逾期记录）</label>
            </td>
            <td>7</td>
          </tr>
          <tr>
            <td>
             <input type="radio" name="wmdvalue1" id="wmdvalue1C" ref="wmdvalue1C" v-model="wmdValue1" disabled  value="5" @click="clickValue($event,1)"/>
            <label for="wmdvalue1C">C．实际控制人或法定代表人个人贷款三年内逾期1-2次（含）或信用卡三年内逾期3-5次（含），并及时还款的（由贷款银行出具证明，非企业原因造成逾期的，不纳入逾期记录）</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue1" id="wmdvalue1D" ref="wmdvalue1D" v-model="wmdValue1" disabled value="0" @click="clickValue($event,1)"/>
            <label for="wmdvalue1D">D．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">2. 企业及实际控制人负债与核心资产的比率（权重5分）</td>
            <td>
            <input type="radio" name="wmdvalue2" id="wmdvalue2A" ref="wmdvalue2A" v-model="wmdValue2" value="5" disabled @click="clickValue($event,2)"/>
            <label for="wmdvalue2A">A．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤50%</label>
            </td>
            <td>5</td>
            <td rowspan="5">
            <textarea rows="5" v-model="wmdList.pfkWmd2Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5">{{ wmdList.pfkWmd2Grade1 }}</td>
            <td rowspan="5">{{ wmdList.pfkWmd2Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue2" id="wmdvalue2B" ref="wmdvalue2B" v-model="wmdValue2" value="4" disabled @click="clickValue($event,2)"/>
            <label for="wmdvalue2B">B．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤80%</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue2" id="wmdvalue2C" ref="wmdvalue2C" v-model="wmdValue2" value="3" disabled @click="clickValue($event,2)"/>
            <label for="wmdvalue2C">C．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤100%</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue2" id="wmdvalue2D" ref="wmdvalue2D" v-model="wmdValue2" value="2" disabled @click="clickValue($event,2)"/>
            <label for="wmdvalue2D">D．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤150%</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue2" id="wmdvalue2E" ref="wmdvalue2E" v-model="wmdValue2" value="1" disabled @click="clickValue($event,2)"/>
            <label for="wmdvalue2E">E．企业人行征信显示的授信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率＞150%</label>
            </td>
            <td>1</td>
          </tr>
           <tr>
            <td rowspan="5">3.企业现有融资情况(包括银行、融资租赁、小贷)（权重6分）（已在我行融资的也算1家，法人个人的房贷不算）</td>
            <td>
            <input type="radio" name="wmdvalue3" id="wmdvalue3A" ref="wmdvalue3A" v-model="wmdValue3" value="6" disabled @click="clickValue($event,3)"/>
            <label for="wmdvalue3A">A.融资机构为0</label>
            </td>
            <td>6</td>
            <td rowspan="5">
            <textarea rows="5" v-model="wmdList.pfkWmd3Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5">{{ wmdList.pfkWmd3Grade1 }}</td>
            <td rowspan="5">{{ wmdList.pfkWmd3Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue3" id="wmdvalue3B" ref="wmdvalue3B" v-model="wmdValue3" value="5" disabled @click="clickValue($event,3)"/>
            <label for="wmdvalue3B">B.融资机构为1家</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue3" id="wmdvalue3C" ref="wmdvalue3C" v-model="wmdValue3" value="4" disabled @click="clickValue($event,3)"/>
            <label for="wmdvalue3C">C.融资机构为2家</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue3" id="wmdvalue3D" ref="wmdvalue3D" v-model="wmdValue3" value="3" disabled @click="clickValue($event,3)"/>
            <label for="wmdvalue3D">D.融资机构3家</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue3" id="wmdvalue3E" ref="wmdvalue3E" v-model="wmdValue3" value="2" disabled @click="clickValue($event,3)"/>
            <label for="wmdvalue3E">E.融资机构3家以上</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td rowspan="4">4.对外担保情况（权重10分）</td>
            <td>
            <input type="radio" name="wmdvalue4" id="wmdvalue4A" ref="wmdvalue4A" v-model="wmdValue4" value="10" disabled @click="clickValue($event,4)"/>
            <label for="wmdvalue4A">A.对外担保金额在财务报表“所有者权益“以内</label>
            </td>
            <td>10</td>
            <td rowspan="4">
            <textarea rows="5" v-model="wmdList.pfkWmd4Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4">{{ wmdList.pfkWmd4Grade1 }}</td>
            <td rowspan="4">{{ wmdList.pfkWmd4Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue4" id="wmdvalue4B" ref="wmdvalue4B" v-model="wmdValue4" value="8" disabled @click="clickValue($event,4)"/>
            <label for="wmdvalue4B">B.对外担保金额为财务报表“所有者权益“的1-5倍（含）</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue4" id="wmdvalue4C" ref="wmdvalue4C" v-model="wmdValue4" value="4" disabled @click="clickValue($event,4)"/>
            <label for="wmdvalue4C">C.对外担保金额为财务报表“'所有者权益”的5-10倍（含）</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue4" id="wmdvalue4D" ref="wmdvalue4D" v-model="wmdValue4" value="0" disabled @click="clickValue($event,4)"/>
            <label for="wmdvalue4D">D.对外担保金额为财务报表“'所有者权益”的10倍以上</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="4">5.企业征信信用情况（权重5分）</td>
            <td>
            <input type="radio" name="wmdvalue5" id="wmdvalue5A" ref="wmdvalue5A" v-model="wmdValue5" value="5" disabled  @click="clickValue($event,5)"/>
            <label for="wmdvalue5A">A．企业近三年无逾期及欠息记录</label>
            </td>
            <td>5</td>
            <td rowspan="4">
            <textarea rows="5" v-model="wmdList.pfkWmd5Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4">{{ wmdList.pfkWmd5Grade1 }}</td>
            <td rowspan="4">{{ wmdList.pfkWmd5Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue5" id="wmdvalue5B" ref="wmdvalue5B" v-model="wmdValue5" value="3" disabled @click="clickValue($event,5)"/>
            <label for="wmdvalue5B">B．企业信贷三年内逾期及欠息一次，并及时还款的。（由贷款银行出具证明，非企业原因造成逾期的，不纳入逾期记录）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue5" id="wmdvalue5C" ref="wmdvalue5C" v-model="wmdValue5" value="2" disabled @click="clickValue($event,5)"/>
            <label for="wmdvalue5C">C．企业信贷三年内逾期及欠息二次，并及时还款的。（由贷款银行出具证明，非企业原因造成逾期的，不纳入逾期记录）</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue5" id="wmdvalue5D" ref="wmdvalue5D" v-model="wmdValue5" value="0" disabled @click="clickValue($event,5)"/>
            <label for="wmdvalue5D">D．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="26">二、企业经营状况(39分)</td>
            <td rowspan="3">1.实际控制人从事本行业年限（权重5分）</td>
            <td>
            <input type="radio" name="wmdvalue6" id="wmdvalue6A" ref="wmdvalue6A" v-model="wmdValue6" value="5" disabled @click="clickValue($event,6)"/>
            <label for="wmdvalue6A">A．5年（含）以上</label>
            </td>
            <td>5</td>
            <td rowspan="3">
            <textarea rows="5" v-model="wmdList.pfkWmd6Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ wmdList.pfkWmd6Grade1 }}</span></td>
            <td rowspan="3">{{ wmdList.pfkWmd6Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue6" id="wmdvalue6B" ref="wmdvalue6B" v-model="wmdValue6" value="2" disabled @click="clickValue($event,6)"/>
            <label for="wmdvalue6B">B．1年（含）以上，5年以下</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue6" id="wmdvalue6C" ref="wmdvalue6C" v-model="wmdValue6" value="0" disabled @click="clickValue($event,6)"/>
            <label for="wmdvalue6C">C．1年以下</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">2.企业在我行国际结算量占总国际结算的比例（权重5分）</td>
            <td>
            <input type="radio" name="wmdvalue7" id="wmdvalue7A" ref="wmdvalue7A" v-model="wmdValue7" value="5" disabled @click="clickValue($event,7)"/>
            <label for="wmdvalue7A">A. 我行结算量占比超80%（含）</label>
            </td>
            <td>5</td>
            <td rowspan="5">
            <textarea rows="5" v-model="wmdList.pfkWmd7Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ wmdList.pfkWmd7Grade1 }}</span></td>
            <td rowspan="5">{{ wmdList.pfkWmd7Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue7" id="wmdvalue7B" ref="wmdvalue7B" v-model="wmdValue7" value="4" disabled @click="clickValue($event,7)"/>
            <label for="wmdvalue7B">B. 我行结算量占比超60%（含）</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue7" id="wmdvalue7C" ref="wmdvalue7C" v-model="wmdValue7" value="3" disabled @click="clickValue($event,7)"/>
            <label for="wmdvalue7C">C. 我行结算量占比超40%（含）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue7" id="wmdvalue7D" ref="wmdvalue7D" v-model="wmdValue7" value="2" disabled @click="clickValue($event,7)"/>
            <label for="wmdvalue7D">D.我行结算量占比超20% （含）</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue7" id="wmdvalue7E" ref="wmdvalue7E" v-model="wmdValue7" value="1" disabled @click="clickValue($event,7)"/>
            <label for="wmdvalue7E">E. 我行结算量占比低于20%</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td rowspan="5">3.上一年国际结算量 （权重12分）</td>
            <td>
            <input type="radio" name="wmdvalue8" id="wmdvalue8A" ref="wmdvalue8A" v-model="wmdValue8" value="12" disabled @click="clickValue($event,8)"/>
            <label for="wmdvalue8A">A.1000万美元（含）以上</label>
            </td>
            <td>12</td>
            <td rowspan="5">
            <textarea rows="5" v-model="wmdList.pfkWmd8Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ wmdList.pfkWmd8Grade1 }}</span></td>
            <td rowspan="5">{{ wmdList.pfkWmd8Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue8" id="wmdvalue8B" ref="wmdvalue8B" v-model="wmdValue8"  value="10" disabled @click="clickValue($event,8)"/>
            <label for="wmdvalue8B">500万美元（含）以上，1000万美元以下</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue8" id="wmdvalue8C" ref="wmdvalue8C" v-model="wmdValue8" value="8" disabled @click="clickValue($event,8)"/>
            <label for="wmdvalue8C">C.300万美元（含）以上，500万美元以下</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue8" id="wmdvalue8D" ref="wmdvalue8D" v-model="wmdValue8" value="4" disabled @click="clickValue($event,8)"/>
            <label for="wmdvalue8D">D.100万美元（含）以上，300万美元以下</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue8" id="wmdvalue8E" ref="wmdvalue8E" v-model="wmdValue8" value="0" disabled @click="clickValue($event,8)"/>
            <label for="wmdvalue8E">E.100万美元以下</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">4.应收账款周转率（权重6分）</td>
            <td>
            <input type="radio" name="wmdvalue9" id="wmdvalue9A" ref="wmdvalue9A" v-model="wmdValue9" value="6" disabled @click="clickValue($event,9)"/>
            <label for="wmdvalue9A">A．上年底应收账款周转率≥6</label>
            </td>
            <td>6</td>
            <td rowspan="5">
           <textarea rows="5" v-model="wmdList.pfkWmd9Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ wmdList.pfkWmd9Grade1 }}</span></td>
            <td rowspan="5">{{ wmdList.pfkWmd9Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue9" id="wmdvalue9B" ref="wmdvalue9B" v-model="wmdValue9" value="5" disabled @click="clickValue($event,9)"/>
            <label for="wmdvalue9B">B．上年底应收账款周转率≥5，周转率＜6</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue9" id="wmdvalue9C" ref="wmdvalue9C" v-model="wmdValue9" value="4" disabled @click="clickValue($event,9)"/>
            <label for="wmdvalue9C">C．上年底应收账款周转率≥3，周转率＜5</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue9" id="wmdvalue9D" ref="wmdvalue9D" v-model="wmdValue9" value="3" disabled @click="clickValue($event,9)"/>
            <label for="wmdvalue9D">D．上年底应收账款周转率≥2，周转率＜3</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue9" id="wmdvalue9E" ref="wmdvalue9E" v-model="wmdValue9" value="2" disabled @click="clickValue($event,9)"/>
            <label for="wmdvalue9E">E．上年底应收账款周转率＜2</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td rowspan="4" style="text-align:center"><font color="red">5.企业上下游合作情况（权重6分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="wmdvalue10" id="wmdvalue10A" ref="wmdvalue10A" v-model="wmdValue10" value="6" :disabled="!isEdit" @click="clickValue($event,10)"/>
            <label for="wmdvalue10A">A．与上下游企业合作关系稳定，下游至少有4家往来2年以上合作企业（知名企业、大型企业集团或重点项目配套企业不受固定往来企业户数限制）</label>
            </td>
            <td>6</td>
            <td rowspan="4">
            <textarea rows="5" v-model="wmdList.pfkWmd10Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ wmdList.pfkWmd10Grade1 }}</span></td>
            <td rowspan="4">{{ wmdList.pfkWmd10Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue10" id="wmdvalue10B" ref="wmdvalue10B" v-model="wmdValue10" value="4" :disabled="!isEdit" @click="clickValue($event,10)"/>
            <label for="wmdvalue10B">B．与上下游企业合作关系稳定，下游至少有3家往来2年以上合作企业</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue10" id="wmdvalue10C" ref="wmdvalue10C" v-model="wmdValue10" value="3" :disabled="!isEdit" @click="clickValue($event,10)"/>
            <label for="wmdvalue10C">C．与上下游企业合作关系稳定度一般，下游至少有2家往来2年以上合作企业</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue10" id="wmdvalue10D" ref="wmdvalue10D" v-model="wmdValue10" value="1" :disabled="!isEdit" @click="clickValue($event,10)"/>
            <label for="wmdvalue10D">D．与上下游企业合作关系较不稳定，缺乏往来2年以上合作企业</label>
            </td>
            <td>1</td>
          </tr>
           <tr>
            <td rowspan="4" style="text-align:center"><font color="red">6.下游单客户占比情况（权重5分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="wmdvalue11" id="wmdvalue11A" ref="wmdvalue11A" v-model="wmdValue11" value="5" :disabled="!isEdit" @click="clickValue($event,11)"/>
            <label for="wmdvalue11A">A.上年结算中，出口收汇排名第一的客户在总收汇的占比≤30%</label>
            </td>
            <td>5</td>
            <td rowspan="4">
            <textarea rows="5" v-model="wmdList.pfkWmd11Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ wmdList.pfkWmd11Grade1 }}</span></td>
            <td rowspan="4">{{ wmdList.pfkWmd11Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue11" id="wmdvalue11B" ref="wmdvalue11B" v-model="wmdValue11" value="3" :disabled="!isEdit" @click="clickValue($event,11)"/>
            <label for="wmdvalue11B">B.上年结算中，出口收汇排名第一的客户在总收汇的占比≤50%，占比＞30%</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue11" id="wmdvalue11C" ref="wmdvalue11C" v-model="wmdValue11" value="2" :disabled="!isEdit" @click="clickValue($event,11)"/>
            <label for="wmdvalue11C">C.上年结算中，出口收汇排名第一的客户在总收汇的占比≤80%，占比＞50%</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue11" id="wmdvalue11D" ref="wmdvalue11D" v-model="wmdValue11" value="1" :disabled="!isEdit" @click="clickValue($event,11)"/>
            <label for="wmdvalue11D">D.上年结算中，出口收汇排名第一的客户在总收汇的占比>80%</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td rowspan="5">三、关联企业经营情况（权重6分）</td>
            <td rowspan="5" style="text-align:center"><font color="red">1.法人或实际控制人其他产业经营情况（权重6分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="wmdvalue12" id="wmdvalue12A" ref="wmdvalue12A" v-model="wmdValue12" value="6"  @click="clickValue($event,12)"/>
            <label for="wmdvalue12A">A.法人或实际控制人无其他第二产业</label>
            </td>
            <td>6</td>
            <td rowspan="5">
           <textarea rows="5" v-model="wmdList.pfkWmd12Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ wmdList.pfkWmd12Grade1 }}</span></td>
            <td rowspan="5">{{ wmdList.pfkWmd12Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue12" id="wmdvalue12B" ref="wmdvalue12B" v-model="wmdValue12" value="5"  @click="clickValue($event,12)"/>
            <label for="wmdvalue12B">B.法人或实际控制人有其他正常第二产业</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue12" id="wmdvalue12C" ref="wmdvalue12C" v-model="wmdValue12" value="3"  @click="clickValue($event,12)"/>
            <label for="wmdvalue12C">C.法人或实际控制人其他产业为适度介入调整性行业企业；（如机械设备制造业、有色及黑色金属冶炼业、纺织行业、建筑材料制造、化学原料及化学制品业、批发和零售业）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue12" id="wmdvalue12D" ref="wmdvalue12D" v-model="wmdValue12" value="0"  @click="clickValue($event,12)"/>
            <label for="wmdvalue12D">D.法人或实际控制人其他产业审慎介入控制性行业企业（高能耗、高污染、产能过剩行业如钢贸、造船、房地产、建筑）</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue12" id="wmdvalue12E" ref="wmdvalue12E" v-model="wmdValue12" value="-50"  @click="clickValue($event,12)"/>
            <label for="wmdvalue12E">E.法人或实际控制人有涉及资金生意(包括民间借贷)、小贷公司、担保公司及典当方面的经营；对于“不涉及”的定义为：近三年无参与上述经营、或者近二年法人或实际控制人已变更且不再参与上述经营</label>
            </td>
            <td>-50</td>
          </tr>
          <tr>
            <td rowspan="9">四、企业、法人、实际控制人房产与本次融资比例情况（权重12分）</td>
            <td rowspan="5" style="text-align:center"><font color="red">1.企业及实际控人名下房产抵押情况（房贷也算抵押）（权重4分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="wmdvalue13" id="wmdvalue13A" ref="wmdvalue13A" v-model="wmdValue13" value="4" :disabled="!isEdit" @click="clickValue($event,13)"/>
            <label for="wmdvalue13A">A.企业、法人或实际控制人名下均有未抵押的房产</label>
            </td>
            <td>4</td>
            <td rowspan="5">
            <textarea rows="5" v-model="wmdList.pfkWmd13Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ wmdList.pfkWmd13Grade1 }}</span></td>
            <td rowspan="5">{{ wmdList.pfkWmd13Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue13" id="wmdvalue13B" ref="wmdvalue13B" v-model="wmdValue13" value="3" :disabled="!isEdit" @click="clickValue($event,13)"/>
            <label for="wmdvalue13B">B.企业、法人或实际控制人名下有房产，企业已经全部抵押，法人有未抵押房产</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue13" id="wmdvalue13C" ref="wmdvalue13C" v-model="wmdValue13" value="2" :disabled="!isEdit" @click="clickValue($event,13)"/>
            <label for="wmdvalue13C">C.企业名下无房产，法人或实际控制人名下有未抵押的房产</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue13" id="wmdvalue13D" ref="wmdvalue13D" v-model="wmdValue13" value="1" :disabled="!isEdit" @click="clickValue($event,13)"/>
            <label for="wmdvalue13D">D.企业及法人或实际控制人名下的房产（如有）均已经抵押</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue13" id="wmdvalue13E" ref="wmdvalue13E" v-model="wmdValue13" value="0" :disabled="!isEdit" @click="clickValue($event,13)"/>
            <label for="wmdvalue13E">E.企业及法人或实际控制人在本地无房产</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="4">2.申请金额与企业主名下可抵押房产净值+自有资产净值比率（权重8分）</td>
            <td>
            <input type="radio" name="wmdvalue14" id="wmdvalue14A" ref="wmdvalue14A" v-model="wmdValue14" value="8" disabled @click="clickValue($event,14)"/>
            <label for="wmdvalue14A">A．比率≤50%</label>
            </td>
            <td>8</td>
            <td rowspan="4">
            <textarea rows="5" v-model="wmdList.pfkWmd14Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ wmdList.pfkWmd14Grade1 }}</span></td>
            <td rowspan="4">{{ wmdList.pfkWmd14Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue14" id="wmdvalue14B" ref="wmdvalue14B" v-model="wmdValue14" value="7" disabled @click="clickValue($event,14)"/>
            <label for="wmdvalue14B">B．比率≤60%</label>
            </td>
            <td>7</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue14" id="wmdvalue14C" ref="wmdvalue14C" v-model="wmdValue14" value="6" disabled @click="clickValue($event,14)"/>
            <label for="wmdvalue14C">C．比率≤70%</label>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue14" id="wmdvalue14D" ref="wmdvalue14D" v-model="wmdValue14" value="4" disabled @click="clickValue($event,14)"/>
            <label for="wmdvalue14D">D．比率＜100%</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td rowspan="6">五、其他类（权重占比7分）</td>
            <td rowspan="3" style="text-align:center"><font color="red">1.法人面谈情况（权重3分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="wmdvalue15" id="wmdvalue15A" ref="wmdvalue15A" v-model="wmdValue15" value="3" :disabled="!isEdit" @click="clickValue($event,15)"/>
            <label for="wmdvalue15A">A.法人精神面貌良好</label>
            </td>
            <td>3</td>
            <td rowspan="3">
            <textarea rows="5" v-model="wmdList.pfkWmd15Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ wmdList.pfkWmd15Grade1 }}</span></td>
            <td rowspan="3">{{ wmdList.pfkWmd15Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue15" id="wmdvalue15B" ref="wmdvalue15B" v-model="wmdValue15" value="2" :disabled="!isEdit" @click="clickValue($event,15)"/>
            <label for="wmdvalue15B">B 法人精神面貌一般</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue15" id="wmdvalue15C" ref="wmdvalue15C" v-model="wmdValue15" value="0" :disabled="!isEdit" @click="clickValue($event,15)"/>
            <label for="wmdvalue15C">C 法人精神面貌颓废</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="3" style="text-align:center"><font color="red">2.法人或实际控制人个人情况（权重4分）<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="wmdvalue16" id="wmdvalue16A" ref="wmdvalue16A" v-model="wmdValue16" value="4" :disabled="!isEdit" @click="clickValue($event,16)"/>
            <label for="wmdvalue16A">A法人或实际控制人已经在本地落户，且在本地拥有房产</label>
            </td>
            <td>4</td>
            <td rowspan="3">
            <textarea rows="5" v-model="wmdList.pfkWmd16Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ wmdList.pfkWmd16Grade1 }}</span></td>
            <td rowspan="3">{{ wmdList.pfkWmd16Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue16" id="wmdvalue16B" ref="wmdvalue16B" v-model="wmdValue16" value="2" :disabled="!isEdit" @click="clickValue($event,16)"/>
            <label for="wmdvalue16B">B 法人或实际控制人已经在本地拥有房产，尚未落户</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="wmdvalue16" id="wmdvalue16C" ref="wmdvalue16C" v-model="wmdValue16" value="0" :disabled="!isEdit" @click="clickValue($event,16)"/>
            <label for="wmdvalue16C">C 法人或实际控制人在本地无房产、未落户</label>
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
      <yu-panel title="其他重点关注调查内容" panel-type="simple" >
        <yu-xform ref="wmdForm5" label-width="240px" v-model="formdatawmd5" :disabled="op =='VIEW'">
            <yu-panel title="合规经营" panel-type="simple" >
              <yu-xform-group :column="1" class="focusWmds" >
                <yu-xform-item label="1．企业是否按时交纳各项税款，有无被税务机关查处和处罚"   name="focusWmd1" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
                <yu-xform-item label="2．企业有无违规排污，是否切实做好环保治理工作，有无被环保部门查处和处罚" name="focusWmd2" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
                <yu-xform-item label="3．企业实际控制人有无吸毒、赌博等不良嗜好，有无经常往返澳门等地，其信用卡是否经常在境外大额支付等" name="focusWmd3" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
                <yu-xform-item label="4．企业实际控制人是否存在炒房、炒原材料、炒股票期货等投机行为" name="focusWmd4" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
                <yu-xform-item label="5．企业员工人数是否稳定，有无出现明显裁员情况，员工待遇是否合理" name="focusWmd5" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
                <yu-xform-item label="6．有无异常工商股权变更情况" name="focusWmd6" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
                <yu-xform-item label="7．有无被外管局处罚情况" name="focusWmd7" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required"></yu-xform-item>
                <yu-xform-item label="8．有无其他影响企业稳定经营的情况" name="focusWmd8" ctype="select" data-code="STD_ZB_YES_NO" label-width="900px" rules="required"></yu-xform-item>
                <yu-xform-item label="9．其它不利情况请简述" name="focusWmd9" ctype="textarea" ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
        </yu-xform>
      </yu-panel>
    </div>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="isEdit&&op!='VIEW'">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_LAND_CHA,STD_TAX_GRADE,STD_RPT_TOPP_TYPE');
export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      wmdList: [],
      totalGrade1: '',
      totalGrade2: '',
      isEdit: true,
      index: '1',
      managerType: '01',
      wmdSlmDetaildataUrl3: this.$backend.cmisBiz + '/api/rptspdanyswmdslmdetail/selectByModel',
      wmdSlmDetailParam3: {condition: JSON.stringify({serno: this.param.serno})},
      dialogWmd3: false,
      wmdValue1: '',
      wmdValue2: '',
      wmdValue3: '',
      wmdValue4: '',
      wmdValue5: '',
      wmdValue6: '',
      wmdValue7: '',
      wmdValue8: '',
      wmdValue9: '',
      wmdValue10: '',
      wmdValue11: '',
      wmdValue12: '',
      wmdValue13: '',
      wmdValue14: '',
      wmdValue15: '',
      wmdValue16: '',
      op: ''

    };
  },
  mounted: function () {
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
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanyswmd/selectBySerno',
        data: _this.param.serno,
        callback: function (code, message, response) {
          if (response.data != null) {
            _this.wmdList = response.data;
            yufp.clone(response.data, _this.formdatawmd5);
            yufp.clone(response.data, _this.formdatawmd1);
            yufp.clone(response.data, _this.formdatawmd4);
            _this.$nextTick(() => {
              _this.checkRadio1(_this.wmdList);
            });
          } else {
            _this.initWmd();
          }
        }
      });
    },
    initWmd: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanyswmd/initWmd',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.init();
          }
        }});
    },
    clickValue: function (event, num) {
      var _this = this;
      this.wmdList['pfkWmd' + num + 'Grade' + _this.index] = event.currentTarget.value;
      if (_this.index == '1') {
        _this.totalGrade1 = parseInt(_this.wmdList.pfkWmd1Grade1) + parseInt(_this.wmdList.pfkWmd2Grade1) + parseInt(_this.wmdList.pfkWmd3Grade1) +
      parseInt(_this.wmdList.pfkWmd4Grade1) + parseInt(_this.wmdList.pfkWmd5Grade1) + parseInt(_this.wmdList.pfkWmd6Grade1) + parseInt(_this.wmdList.pfkWmd7Grade1) +
      parseInt(_this.wmdList.pfkWmd8Grade1) + parseInt(_this.wmdList.pfkWmd9Grade1) + parseInt(_this.wmdList.pfkWmd14Grade1);
        if (_this.wmdList.pfkWmd10Grade1) {
          _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd10Grade1);
        }
        if (_this.wmdList.pfkWmd11Grade1) {
          _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd11Grade1);
        }
        if (_this.wmdList.pfkWmd12Grade1) {
          _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd12Grade1);
        }
        if (_this.wmdList.pfkWmd13Grade1) {
          _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd13Grade1);
        }
        if (_this.wmdList.pfkWmd15Grade1) {
          _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd15Grade1);
        }
        if (_this.wmdList.pfkWmd16Grade1) {
          _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd16Grade1);
        }
      } else if (_this.index == '2') {
        _this.totalGrade2 = parseInt(_this.wmdList.pfkWmd1Grade2) + parseInt(_this.wmdList.pfkWmd2Grade2) + parseInt(_this.wmdList.pfkWmd3Grade2) +
      parseInt(_this.wmdList.pfkWmd4Grade2) + parseInt(_this.wmdList.pfkWmd5Grade2) + parseInt(_this.wmdList.pfkWmd6Grade2) + parseInt(_this.wmdList.pfkWmd7Grade2) +
      parseInt(_this.wmdList.pfkWmd8Grade2) + parseInt(_this.wmdList.pfkWmd9Grade2) + parseInt(_this.wmdList.pfkWmd14Grade2);
        if (_this.wmdList.pfkWmd10Grade2) {
          _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd10Grade2);
        }
        if (_this.wmdList.pfkWmd11Grade2) {
          _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd11Grade2);
        }
        if (_this.wmdList.pfkWmd12Grade2) {
          _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd12Grade2);
        }
        if (_this.wmdList.pfkWmd13Grade2) {
          _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd13Grade2);
        }
        if (_this.wmdList.pfkWmd15Grade2) {
          _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd15Grade2);
        }
        if (_this.wmdList.pfkWmd16Grade2) {
          _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd16Grade2);
        }
      }
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == 'A' || op.key == 'B' || op.key == 'C') {
          return true;
        }
        return false;
      });
    },
    /** 自动打分 */
    autoRecord1: function (managerType) {
      var _this = this;
      var serno = this.param.serno;
      var obj = {};
      obj = _this.wmdList;
      obj.taxRate = _this.formdatawmd1.taxRate;
      obj.foreignGoodTradeGrade = _this.formdatawmd1.foreignGoodTradeGrade;
      obj.lastYearVat = _this.formdatawmd1.lastYearVat;
      obj.lastYearTotalExports = _this.formdatawmd1.lastYearTotalExports;
      obj.lastYearInternationalVolume = _this.formdatawmd1.lastYearInternationalVolume;
      obj.ownVolume = _this.formdatawmd1.ownVolume;
      obj.lmtAmt = _this.formdatawmd1.lmtAmt;
      obj.overOperInveSitu1 = _this.formdatawmd4.overOperInveSitu1;
      obj.overOperInveSitu2 = _this.formdatawmd4.overOperInveSitu2;
      obj.overOperInveSitu3 = _this.formdatawmd4.overOperInveSitu3;
      obj.focusWmd1 = _this.formdatawmd5.focusWmd1;
      obj.focusWmd2 = _this.formdatawmd5.focusWmd2;
      obj.focusWmd3 = _this.formdatawmd5.focusWmd3;
      obj.focusWmd4 = _this.formdatawmd5.focusWmd4;
      obj.focusWmd5 = _this.formdatawmd5.focusWmd5;
      obj.focusWmd6 = _this.formdatawmd5.focusWmd6;
      obj.focusWmd7 = _this.formdatawmd5.focusWmd7;
      obj.focusWmd8 = _this.formdatawmd5.focusWmd8;
      obj.focusWmd9 = _this.formdatawmd5.focusWmd9;
      obj.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanyswmd/save',
        data: obj,
        callback: function (code, message, response) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/rptspdanyswmd/autoValue',
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
    submit: function () {
      var _this = this;
      var validate = false;
      _this.$refs.wmdForm5.validate(function (valid) {
        validate = valid;
      });
      var validate1 = false;
      _this.$refs.wmdForm1.validate(function (valid) {
        validate1 = valid;
      });
      if (!validate || !validate1) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var obj = {};
      obj = _this.wmdList;
      obj.taxRate = _this.formdatawmd1.taxRate;
      obj.foreignGoodTradeGrade = _this.formdatawmd1.foreignGoodTradeGrade;
      obj.lastYearVat = _this.formdatawmd1.lastYearVat;
      obj.lastYearTotalExports = _this.formdatawmd1.lastYearTotalExports;
      obj.ownVolume = _this.formdatawmd1.ownVolume;
      obj.lastYearInternationalVolume = _this.formdatawmd1.lastYearInternationalVolume;
      obj.lmtAmt = _this.formdatawmd1.lmtAmt;
      obj.overOperInveSitu1 = _this.formdatawmd4.overOperInveSitu1;
      obj.overOperInveSitu2 = _this.formdatawmd4.overOperInveSitu2;
      obj.overOperInveSitu3 = _this.formdatawmd4.overOperInveSitu3;
      obj.focusWmd1 = _this.formdatawmd5.focusWmd1;
      obj.focusWmd2 = _this.formdatawmd5.focusWmd2;
      obj.focusWmd3 = _this.formdatawmd5.focusWmd3;
      obj.focusWmd4 = _this.formdatawmd5.focusWmd4;
      obj.focusWmd5 = _this.formdatawmd5.focusWmd5;
      obj.focusWmd6 = _this.formdatawmd5.focusWmd6;
      obj.focusWmd7 = _this.formdatawmd5.focusWmd7;
      obj.focusWmd8 = _this.formdatawmd5.focusWmd8;
      obj.focusWmd9 = _this.formdatawmd5.focusWmd9;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanyswmd/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功'
            });
          }
        }});
    },
    checkRadio1: function (data) {
      var _this = this;
      for (var i = 1; i < 17; i++) {
        var name = 'name' + i;
        var value = 'wmdvalue' + i;
        var pfkWmdGrade = 'pfkWmd' + i + 'Grade1';
        name = document.getElementsByName(value);
        for (var j = 0; j < name.length; j++) {
          if (data[pfkWmdGrade] != null) {
            if (Number(name[j].value) == Number(data[pfkWmdGrade])) {
              name[j].checked = true;
              break;
            }
          }
        }
      }
      // _this.wmdValue1 = data.pfkWmd1Grade1;
      // _this.wmdValue2 = data.pfkWmd2Grade1;
      // _this.wmdValue3 = data.pfkWmd3Grade1;
      // _this.wmdValue4 = data.pfkWmd4Grade1;
      // _this.wmdValue5 = data.pfkWmd5Grade1;
      // _this.wmdValue6 = data.pfkWmd6Grade1;
      // _this.wmdValue7 = data.pfkWmd7Grade1;
      // _this.wmdValue8 = data.pfkWmd8Grade1;
      // _this.wmdValue9 = data.pfkWmd9Grade1;
      // _this.wmdValue10 = data.pfkWmd10Grade1;
      // _this.wmdValue11 = data.pfkWmd11Grade1;
      // _this.wmdValue12 = data.pfkWmd12Grade1;
      // _this.wmdValue13 = data.pfkWmd13Grade1;
      // _this.wmdValue14 = data.pfkWmd14Grade1;
      // _this.wmdValue15 = data.pfkWmd15Grade1;
      // _this.wmdValue16 = data.pfkWmd16Grade1;
      _this.totalGrade1 = parseInt(_this.wmdList.pfkWmd1Grade1) + parseInt(_this.wmdList.pfkWmd2Grade1) + parseInt(_this.wmdList.pfkWmd3Grade1) +
      parseInt(_this.wmdList.pfkWmd4Grade1) + parseInt(_this.wmdList.pfkWmd5Grade1) + parseInt(_this.wmdList.pfkWmd6Grade1) + parseInt(_this.wmdList.pfkWmd7Grade1) +
      parseInt(_this.wmdList.pfkWmd8Grade1) + parseInt(_this.wmdList.pfkWmd9Grade1) + parseInt(_this.wmdList.pfkWmd14Grade1);
      if (_this.wmdList.pfkWmd10Grade1) {
        _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd10Grade1);
      }
      if (_this.wmdList.pfkWmd11Grade1) {
        _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd11Grade1);
      }
      if (_this.wmdList.pfkWmd12Grade1) {
        _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd12Grade1);
      }
      if (_this.wmdList.pfkWmd13Grade1) {
        _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd13Grade1);
      }
      if (_this.wmdList.pfkWmd15Grade1) {
        _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd15Grade1);
      }
      if (_this.wmdList.pfkWmd16Grade1) {
        _this.totalGrade1 += parseInt(_this.wmdList.pfkWmd16Grade1);
      }
      _this.totalGrade2 = parseInt(_this.wmdList.pfkWmd1Grade2) + parseInt(_this.wmdList.pfkWmd2Grade2) + parseInt(_this.wmdList.pfkWmd3Grade2) +
      parseInt(_this.wmdList.pfkWmd4Grade2) + parseInt(_this.wmdList.pfkWmd5Grade2) + parseInt(_this.wmdList.pfkWmd6Grade2) + parseInt(_this.wmdList.pfkWmd7Grade2) +
      parseInt(_this.wmdList.pfkWmd8Grade2) + parseInt(_this.wmdList.pfkWmd9Grade2) + parseInt(_this.wmdList.pfkWmd14Grade2);
      if (_this.wmdList.pfkWmd10Grade2) {
        _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd10Grade2);
      }
      if (_this.wmdList.pfkWmd11Grade2) {
        _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd11Grade2);
      }
      if (_this.wmdList.pfkWmd12Grade2) {
        _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd12Grade2);
      }
      if (_this.wmdList.pfkWmd13Grade2) {
        _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd13Grade2);
      }
      if (_this.wmdList.pfkWmd15Grade2) {
        _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd15Grade2);
      }
      if (_this.wmdList.pfkWmd16Grade2) {
        _this.totalGrade2 += parseInt(_this.wmdList.pfkWmd16Grade2);
      }
      _this.totalGrade1 = isNaN(_this.totalGrade1) ? 0 : _this.totalGrade1;
      _this.totalGrade2 = isNaN(_this.totalGrade2) ? 0 : _this.totalGrade2;
      _this.measureLmtAmt();
    },
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed(2));
    },
    addWmd3: function () {
      var _this = this;
      _this.dialogWmd3 = true;
    },
    backWmd3: function () {
      var _this = this;
      _this.dialogWmd3 = false;
      _this.$refs.wmdDialog3.resetFields();
    },
    editWmd3: function () {
      var _this = this;
      var selectionAry = _this.$refs.wmdSlmDetailTable3.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogWmd3 = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormWmd3);
      });
      _this.corpType = 'edit';
    },
    deleteWmd3: function () {
      var _this = this;
      var selectionAry = _this.$refs.wmdSlmDetailTable3.selections;
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
              url: backend.cmisBiz + '/api/rptspdanyswmdslmdetail/deleteWmdDetail',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.wmdSlmDetailTable3.remoteData();
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
    saveWmd3: function () {
      var _this = this;
      var validate = false;
      _this.$refs.wmdDialog3.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.dialogFormWmd3.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanyswmdslmdetail/save',
        data: _this.dialogFormWmd3,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.dialogWmd3 = false;
            _this.$refs.wmdDialog3.resetFields();
            _this.$refs.wmdSlmDetailTable3.remoteData();
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
    },
    measureLmtAmt: function () {
      var _this = this;
      var lastYearTotalExports = _this.formdatawmd1.lastYearTotalExports;
      var gradeCoefficient = 0;
      if (_this.totalGrade1) {
        if (parseInt(_this.totalGrade1) >= 80) {
          gradeCoefficient = 1;
        } else if (parseInt(_this.totalGrade1) >= 70 && parseInt(_this.totalGrade1) < 80) {
          gradeCoefficient = 0.8;
        } else if (parseInt(_this.totalGrade1) < 70) {
          gradeCoefficient = 0;
        }
      }
      var lmtAmt = parseFloat((parseFloat(lastYearTotalExports) * 1.125 - 625000) * parseFloat(gradeCoefficient)).toFixed(2);
      _this.formdatawmd1.lmtAmt = isNaN(lmtAmt) ? 0 : lmtAmt;
    }
  }
};
</script>
<style>
.focusWmds .el-form-item__label{
text-align: left;
}
.card tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
}

</style>
