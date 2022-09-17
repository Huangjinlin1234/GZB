<template>
  <div>
    <yu-panel title="省心快贷"  :hideFilter="false" :collapseHide="false">
    <div class="card">
      <yu-panel title="省心快贷评分卡"  :hideFilter="false" :collapseHide="false">
        <div class="card">
      <yu-panel title="评分卡打分（系统根据调查报告内容自动判断打分，如无法判断，则客户经理手工打分）" panel-type="simple" >
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
            <td rowspan="18">征信及客户资产负债情况</td>
            <td rowspan="5">1.企业征信信用情况</td>
            <td>
            <input type="radio" name="sxkdvalue1" id="sxkdvalue1A" ref="sxkdvalue1A" v-model="sxkdValue1" value="9" disabled @click="clickValue($event,1)"/>
            <label for="sxkdvalue1A">A．过去3年内，企业无逾期及欠息记录</label>
            </td>
            <td>9</td>
            <td rowspan="5">
            <textarea rows="5" v-model="sxkdList.pfkKsxd1Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ sxkdList.pfkKsxd1Grade1 }}</span></td>
            <td rowspan="5">{{ sxkdList.pfkKsxd1Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue1" id="sxkdvalue1B" ref="sxkdvalue1B" disabled v-model="sxkdValue1"  value="7" @click="clickValue($event,1)"/>
            <label for="sxkdvalue1B">B．过去3年内，企业无逾期记录，有3次（含）以内欠息记录</label>
            </td>
            <td>7</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue1" id="sxkdvalue1C" ref="sxkdvalue1C" disabled  v-model="sxkdValue1"  value="5" @click="clickValue($event,1)"/>
            <label for="sxkdvalue1C">C．过去3年内，企业无逾期记录，有3次以上6次（含）以内欠息记录</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue1" id="sxkdvalue1D" ref="sxkdvalue1D" disabled v-model="sxkdValue1" value="3" @click="clickValue($event,1)"/>
            <label for="sxkdvalue1D">D．过去3年内，企业累计有2次（含）以内的逾期记录，有3次以上6次（含）以内欠息记录</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue1" id="sxkdvalue1E" ref="sxkdvalue1E" disabled v-model="sxkdValue1" value="0" @click="clickValue($event,1)"/>
            <label for="sxkdvalue1E">E．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">2.实际控制人征信信用情况</td>
            <td>
            <input type="radio" name="sxkdvalue2" id="sxkdvalue2A" ref="sxkdvalue2A" v-model="sxkdValue2" disabled value="9" @click="clickValue($event,2)"/>
            <label for="sxkdvalue2A">A．过去3年内，实际控制人无贷款、贷记卡、准贷记卡逾期记录</label>
            </td>
            <td>9</td>
            <td rowspan="5">
            <textarea rows="5"  v-model="sxkdList.pfkKsxd2Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ sxkdList.pfkKsxd2Grade1 }}</span></td>
            <td rowspan="5">{{ sxkdList.pfkKsxd2Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue2" id="sxkdvalue2B" ref="sxkdvalue2B" v-model="sxkdValue2" disabled value="7" @click="clickValue($event,2)"/>
            <label for="sxkdvalue2B">B．过去3年内，实际控制人贷款逾期≤2次，贷款、贷记卡、准贷记卡逾期总次数≤5次</label>
            </td>
            <td>7</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue2" id="sxkdvalue2C" ref="sxkdvalue2C" v-model="sxkdValue2" disabled value="5" @click="clickValue($event,2)"/>
            <label for="sxkdvalue2C">C．过去3年内，实际控制人贷款逾期≤2次，贷款、贷记卡、准贷记卡逾期总次数≤7次</label>
            </td>
            <td>5</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue2" id="sxkdvalue2D" ref="sxkdvalue2D" v-model="sxkdValue2" disabled value="3" @click="clickValue($event,2)"/>
            <label for="sxkdvalue2D">D．过去3年内，实际控制人贷款逾期≤3次，贷款、贷记卡、准贷记卡逾期总次数≤9次</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue2" id="sxkdvalue2E" ref="sxkdvalue2E" v-model="sxkdValue2" disabled value="0" @click="clickValue($event,2)"/>
            <label for="sxkdvalue2E">E．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="5">3.企业及实际控制人负债与资产比例</td>
            <td>
            <input type="radio" name="sxkdvalue3" id="sxkdvalue3A" ref="sxkdvalue3A" v-model="sxkdValue3" disabled value="12" @click="clickValue($event,3)"/>
            <label for="sxkdvalue3A">A.企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤30%</label>
            </td>
            <td>12</td>
            <td rowspan="5">
            <textarea rows="5" v-model="sxkdList.pfkKsxd3Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ sxkdList.pfkKsxd3Grade1 }}</span></td>
            <td rowspan="5">{{ sxkdList.pfkKsxd3Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue3" id="sxkdvalue3B" ref="sxkdvalue3B" v-model="sxkdValue3" disabled value="10" @click="clickValue($event,3)"/>
            <label for="sxkdvalue3B">B.企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤50%</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue3" id="sxkdvalue3C" ref="sxkdvalue3C" v-model="sxkdValue3" disabled value="7" @click="clickValue($event,3)"/>
            <label for="sxkdvalue3C">C．企业人行征信显示的用信余额余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤70%</label>
            </td>
            <td>7</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue3" id="sxkdvalue3D" ref="sxkdvalue3D" v-model="sxkdValue3" disabled value="3" @click="clickValue($event,3)"/>
            <label for="sxkdvalue3D">D．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率≤100%</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue3" id="sxkdvalue3E" ref="sxkdvalue3E" v-model="sxkdValue3" disabled value="0" @click="clickValue($event,3)"/>
            <label for="sxkdvalue3E">E．企业人行征信显示的用信余额加上实际控制人及其配偶名下的个人贷款（含信用卡透支）与企业、实际控制人及配偶核心资产价值的比率＞100%</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="3">4.实际控制人从事本行业年限</td>
            <td>
            <input type="radio" name="sxkdvalue4" id="sxkdvalue4A" ref="sxkdvalue4A" v-model="sxkdValue4" disabled value="6" @click="clickValue($event,4)"/>
            <label for="sxkdvalue4A">A．5年（含）以上</label>
            </td>
            <td>6</td>
            <td rowspan="3">
            <textarea rows="5" v-model="sxkdList.pfkKsxd4Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ sxkdList.pfkKsxd4Grade1 }}</span></td>
            <td rowspan="3">{{ sxkdList.pfkKsxd4Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue4" id="sxkdvalue4B" ref="sxkdvalue4B" v-model="sxkdValue4" disabled value="3" @click="clickValue($event,4)"/>
            <label for="sxkdvalue4B">B．1年（含）以上，5年以下</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue4" id="sxkdvalue4C" ref="sxkdvalue4C" v-model="sxkdValue4" disabled value="0" @click="clickValue($event,4)"/>
            <label for="sxkdvalue4C">C．1年以下</label>
            </td>
            <td>0</td>
          </tr>
           <tr>
            <td rowspan="13">企业经营状况</td>
            <td rowspan="3">5.企业所属行业</td>
            <td>
            <input type="radio" name="sxkdvalue5" id="sxkdvalue5A" ref="sxkdvalue5A" v-model="sxkdValue5" disabled value="6" @click="clickValue($event,5)"/>
            <label for="sxkdvalue5A">A．我行鼓励性行业企业，及大消费类（餐饮、医药、商业零售、旅游等）、流通类、高科技类</label>
            </td>
            <td>6</td>
            <td rowspan="3">
            <textarea rows="5" v-model="sxkdList.pfkKsxd5Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="3"><span>{{ sxkdList.pfkKsxd5Grade1 }}</span></td>
            <td rowspan="3">{{ sxkdList.pfkKsxd5Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue5" id="sxkdvalue5B" ref="sxkdvalue5B" v-model="sxkdValue5" disabled value="3" @click="clickValue($event,5)"/>
            <label for="sxkdvalue5B">B．适度介入调整性行业企业；（如机械设备制造业、有色及黑色金属冶炼业、纺织行业、建筑材料制造、化学原料及化学制品业、批发和零售业）</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue5" id="sxkdvalue5C" ref="sxkdvalue5C" v-model="sxkdValue5" disabled value="1" @click="clickValue($event,5)"/>
            <label for="sxkdvalue5C">C．审慎介入控制性行业企业；（高能耗、高污染、产能过剩行业如钢贸、造船、房地产、建筑）</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td rowspan="6">6.企业经营状况</td>
            <td>
            <input type="radio" name="sxkdvalue6" id="sxkdvalue6A" ref="sxkdvalue6A" v-model="sxkdValue6" disabled value="12" @click="clickValue($event,6)"/>
            <label for="sxkdvalue6A">A．盈利水平（连续2年利润总额为正，且上年利润总额较上上年增长率≥10%，当期利润总额为正，且当期利润总额较上年增长率≥10%）；成长性（上年销售收入较上上年增长率≥10%，当期销售收入较上年增长率≥10%）</label>
            </td>
            <td>12</td>
            <td rowspan="6">
            <textarea rows="5" v-model="sxkdList.pfkKsxd6Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="6"><span>{{ sxkdList.pfkKsxd6Grade1 }}</span></td>
            <td rowspan="6">{{ sxkdList.pfkKsxd6Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue6" id="sxkdvalue6B" ref="sxkdvalue6B" v-model="sxkdValue6" disabled value="10" @click="clickValue($event,6)"/>
            <label for="sxkdvalue6B">B．盈利水平（连续2年及当期利润总额为正）；成长性（连续2年销售收入保持增长）</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue6" id="sxkdvalue6C" ref="sxkdvalue6C" v-model="sxkdValue6" disabled value="8" @click="clickValue($event,6)"/>
            <label for="sxkdvalue6C">C．盈利水平（当期利润总额为正）；成长性（当期销售收入较上年同期呈现增长）</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue6" id="sxkdvalue6D" ref="sxkdvalue6D" v-model="sxkdValue6" disabled value="6" @click="clickValue($event,6)"/>
            <label for="sxkdvalue6D">D．盈利水平（当期利润总额为正）；成长性（当期销售收入较上年同期未有增长）</label>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue6" id="sxkdvalue6E" ref="sxkdvalue6E" v-model="sxkdValue6" disabled value="2" @click="clickValue($event,6)"/>
            <label for="sxkdvalue6E">E．盈利水平（当期利润总额较上年同期下降未超过30%）；成长性（当期销售收入较上年同期下降未超过30%）</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue6" id="sxkdvalue6F" ref="sxkdvalue6F" v-model="sxkdValue6" disabled value="0" @click="clickValue($event,6)"/>
            <label for="sxkdvalue6F">F．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="4" style="text-align:center" ><font color="red" >7.企业上下游合作情况（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="sxkdvalue7" id="sxkdvalue7A" ref="sxkdvalue7A" v-model="sxkdValue7" :disabled="!isEdit" value="6" @click="clickValue($event,7)"/>
            <label for="sxkdvalue7A">A．与上下游合作关系稳定，下游至少有4家往来2年以上合作企业（知名企业、大型企业集团或重点项目配套企业不受固定往来企业户数限制）</label>
            </td>
            <td>6</td>
            <td rowspan="4">
            <textarea rows="5" v-model="sxkdList.pfkKsxd7Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span >{{ sxkdList.pfkKsxd7Grade1 }}</span></td>
            <td rowspan="4"><span >{{ sxkdList.pfkKsxd7Grade2 }}</span></td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue7" id="sxkdvalue7B" ref="sxkdvalue7B" v-model="sxkdValue7" :disabled="!isEdit" value="4" @click="clickValue($event,7)"/>
            <label for="sxkdvalue7B">B．与上下游企业合作关系稳定，下游至少有3家长期固定往来企业</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue7" id="sxkdvalue7C" ref="sxkdvalue7C" v-model="sxkdValue7" :disabled="!isEdit" value="3" @click="clickValue($event,7)"/>
            <label for="sxkdvalue7C">C．与上下游企业合作关系稳定度一般，下游至少有2家长期固定往来企业</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue7" id="sxkdvalue7D" ref="sxkdvalue7D" v-model="sxkdValue7" :disabled="!isEdit" value="1" @click="clickValue($event,7)"/>
            <label for="sxkdvalue7D">D．与上下游企业合作关系较不稳定，缺乏长期固定往来下游企业</label>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td rowspan="5"></td>
            <td rowspan="5">8.申请金额与抵押物价值的比率</td>
            <td>
            <input type="radio" name="sxkdvalue8" id="sxkdvalue8A" ref="sxkdvalue8A" v-model="sxkdValue8" disabled value="12" @click="clickValue($event,8)"/>
            <label for="sxkdvalue8A">A．业务申请金额与抵押物评估价值的比率≤50%，其中，业务申请金额与抵押物（商用房）评估价值的比率≤30%</label>
            </td>
            <td>12</td>
            <td rowspan="5">
            <textarea rows="5" v-model="sxkdList.pfkKsxd8Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="5"><span>{{ sxkdList.pfkKsxd8Grade1 }}</span></td>
            <td rowspan="5">{{ sxkdList.pfkKsxd8Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue8" id="sxkdvalue8B" ref="sxkdvalue8B" v-model="sxkdValue8" disabled value="10" @click="clickValue($event,8)"/>
            <label for="sxkdvalue8B">B．业务申请金额与抵押物评估价值的比率≤60%，其中，业务申请金额与抵押物（商用房）评估价值的比率≤40%</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue8" id="sxkdvalue8C" ref="sxkdvalue8C" v-model="sxkdValue8" disabled value="8" @click="clickValue($event,8)"/>
            <label for="sxkdvalue8C">C．业务申请金额与抵押物评估价值的比率≤70%，其中，业务申请金额与抵押物（商用房）评估价值的比率≤50%</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue8" id="sxkdvalue8D" ref="sxkdvalue8D" v-model="sxkdValue8" disabled value="3" @click="clickValue($event,8)"/>
            <label for="sxkdvalue8D">D．业务申请金额与抵押物评估价值的比率＜100%，其中，业务申请金额与抵押物（商用房）评估价值的比率≤70%</label>
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue8" id="sxkdvalue8E" ref="sxkdvalue8E" v-model="sxkdValue8" disabled value="0" @click="clickValue($event,8)"/>
            <label for="sxkdvalue8E">E．不符合以上要求</label>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td rowspan="6"></td>
            <td rowspan="6" style="text-align:center"><font color="red">9.抵押物分类<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="sxkdvalue9" id="sxkdvalue9A" ref="sxkdvalue9A" v-model="sxkdValue9" :disabled="!isEdit" value="12" @click="clickValue($event,9)"/>
            <label for="sxkdvalue9A">A．①商业房：租金回报率≥6%（公式=（月租金－每月物业管理费）×12／购买房屋总价），或15年内租金能够覆盖商用房购买价；（自用物业参照周边同类型商业房租金回报率）<br>
                                  ②个人住房：位于市中心，或紧邻公园、地铁、学区等资源型小区楼盘，且产权所有者拥有2套以上住房<br>
                                  ③工业用房：国家级、省级经济开发区，市区内厂房，使用中不存在产值、就业、税收和行业等特殊限制</label>
            </td>
            <td>12</td>
            <td rowspan="6">
            <textarea rows="5" v-model="sxkdList.pfkKsxd9Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="6"><span >{{ sxkdList.pfkKsxd9Grade1 }}</span></td>
            <td rowspan="6"><span >{{ sxkdList.pfkKsxd9Grade2 }}</span></td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue9" id="sxkdvalue9B" ref="sxkdvalue9B" v-model="sxkdValue9" :disabled="!isEdit" value="10" @click="clickValue($event,9)"/>
            <label for="sxkdvalue9B">B．①商业房：租金回报率≥5%，或20年内租金能够覆盖商用房购买价<br>
                                    ②个人住房：位于市中心，或紧邻公园、地铁、学区等资源型单体楼（无小区），且产权所有者拥有2套以上住房<br>
                                    ③工业用房：城市近郊厂房，工业园区厂房，使用中不存在产值、就业、税收和行业等特殊限制</label>
            </td>
            <td>10</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue9" id="sxkdvalue9C" ref="sxkdvalue9C" v-model="sxkdValue9" :disabled="!isEdit" value="8" @click="clickValue($event,9)"/>
            <label for="sxkdvalue9C">C．①商业房：租金回报率≥4%<br>
                                    ②个人住房：市区范围内（非城郊），配套相对齐全的小区楼盘，且产权所有者拥有2套住房<br>
                                    ③工业用房：远郊厂房，使用中不存在产值、就业、税收和行业等特殊限制</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue9" id="sxkdvalue9D" ref="sxkdvalue9D" v-model="sxkdValue9" :disabled="!isEdit" value="6" @click="clickValue($event,9)"/>
            <label for="sxkdvalue9D">D．①商业房：租金回报率＜4%<br>
                                    ②个人住房：市区范围内（非城郊），配套相对齐全的单体楼盘，且产权所有者拥有2套住房<br>
                                    ③工业用房：市内及近郊厂房，使用中存在产值、就业、税收和行业等特殊限制</label>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue9" id="sxkdvalue9E" ref="sxkdvalue9E" v-model="sxkdValue9" :disabled="!isEdit" value="4" @click="clickValue($event,9)"/>
            <label for="sxkdvalue9E">E．①个人住房：市郊普通住宅，且产权所有者拥有2套住房<br>
                                    ②工业用房：远郊厂房，使用中存在产值、就业、税收和行业等特殊限制</label>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue9" id="sxkdvalue9F" ref="sxkdvalue9F" v-model="sxkdValue9" :disabled="!isEdit" value="2" @click="clickValue($event,9)"/>
            <label for="sxkdvalue9F">F．①个人住房：产权所有者仅拥有1套住房、或产权所有者不满18岁<br>
                                    ②其它本行认可的抵押物</label>
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td rowspan="4"></td>
            <td rowspan="4" style="text-align:center"><font color="red">10.抵押物处置能力<br>（请选择相应分数）</font></td>
            <td>
            <input type="radio" name="sxkdvalue10" id="sxkdvalue10A" ref="sxkdvalue10A" v-model="sxkdValue10" :disabled="!isEdit" value="16" @click="clickValue($event,10)"/>
            <label for="sxkdvalue10A">A．易处置（证件齐全、产权清晰、申请人自有资产、升值空间大）</label>
            </td>
            <td>16</td>
            <td rowspan="4">
            <textarea rows="5" v-model="sxkdList.pfkKsxd10Desc" :disabled="!isEdit" />
            </td>
            <td rowspan="4"><span>{{ sxkdList.pfkKsxd10Grade1 }}</span></td>
            <td rowspan="4">{{ sxkdList.pfkKsxd10Grade2 }}</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue10" id="sxkdvalue10B" ref="sxkdvalue10B" v-model="sxkdValue10" :disabled="!isEdit" value="12" @click="clickValue($event,10)"/>
            <label for="sxkdvalue10B">B．较易处置（证件齐全、产权清晰、第三方持有、升值空间大）</label>
            </td>
            <td>12</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue10" id="sxkdvalue10C" ref="sxkdvalue10C" v-model="sxkdValue10" :disabled="!isEdit" value="8" @click="clickValue($event,10)"/>
            <label for="sxkdvalue10C">C．处置能力一般（证件齐全、申请人自有资产、工业厂房用地无税收贡献等附加要求）</label>
            </td>
            <td>8</td>
          </tr>
          <tr>
            <td>
            <input type="radio" name="sxkdvalue10" id="sxkdvalue10D" ref="sxkdvalue10D" v-model="sxkdValue10" :disabled="!isEdit" value="4" @click="clickValue($event,10)"/>
            <label for="sxkdvalue10D">D．处置能力偏弱（证件齐全、第三方持有、商业物业非热点楼层、工业厂房用地无税收贡献等附加要求）</label>
            </td>
            <td>4</td>
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
        <yu-xform ref="lmtBaseForm1" label-width="240px" v-model="baseFormdata1" :disabled="op =='VIEW'" >
          <yu-xform-group :column="1" class="focusSxkd">
            <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
            <yu-xform-item label="企业有无违规排污，有无被环保部门查处和处罚" ctype="select"  name="focusSxkd1" :disabled="!isEdit" data-code="STD_ZB_YES_NO" label-width="900px" rules="required"  ></yu-xform-item>
            <yu-xform-item label="企业员工人数是否稳定，员工待遇是否合理" ctype="select" name="focusSxkd2" :disabled="!isEdit" data-code="STD_ZB_YES_NO" label-width="900px" rules="required"  ></yu-xform-item>
            <yu-xform-item label="企业有无被税务机关查处和处罚" ctype="select" name="focusSxkd3" :disabled="!isEdit" data-code="STD_ZB_YES_NO" label-width="900px" rules="required"></yu-xform-item>
            <yu-xform-item label="有无异常工商股权变更情况" ctype="select" name="focusSxkd4" :disabled="!isEdit" data-code="STD_ZB_YES_NO" label-width="900px" rules="required"></yu-xform-item>
            <yu-xform-item label="实际控制人有无吸毒、赌博等不良嗜好，其信用卡是否经常在境外大额支付等" :disabled="!isEdit" ctype="select" name="focusSxkd6" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
            <yu-xform-item label="实际控制人是否存在炒房、炒原材料、炒股票期货等投机行为" ctype="select" :disabled="!isEdit" name="focusSxkd7" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
            <yu-xform-item label="实际控制人是否参与民间融资、投资高风险行业等行为" ctype="select" :disabled="!isEdit" name="focusSxkd8" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
            <yu-xform-item label="有无其他影响企业稳定经营的情况" ctype="select" name="focusSxkd9" :disabled="!isEdit" data-code="STD_ZB_YES_NO" label-width="900px" rules="required" ></yu-xform-item>
            <yu-xform-item label="合规经营其它不利情况请简述" ctype="textarea" name="focusSxkd5" :disabled="!isEdit"  label-width="900px" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
     </yu-panel>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="isEdit&&op!='VIEW'">保存</yu-button>
    </yu-form-buttons>
  </div>
</yu-panel>
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
      sxkdList: [],
      totalGrade1: '',
      totalGrade2: '',
      isEdit: true,
      index: '1',
      managerType: '01',
      sxkdValue1: '',
      sxkdValue2: '',
      sxkdValue3: '',
      sxkdValue4: '',
      sxkdValue5: '',
      sxkdValue6: '',
      sxkdValue7: '',
      sxkdValue8: '',
      sxkdValue9: '',
      sxkdValue10: '',
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
      let _this = this;
      var serno = _this.param.serno;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/rptspdanyssxkd/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.baseFormdata1);
            _this.sxkdList = response.data;
            _this.$nextTick(() => {
              _this.checkRadio(_this.sxkdList);
            });
          } else {
            var obj = {};
            obj.serno = _this.param.serno;
            yufp.service.request({
              method: 'POST',
              async: false,
              url: backend.cmisBiz + '/api/rptspdanyssxkd/initSxkd',
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
    submit: function () {
      var _this = this;
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
      var obj = {};
      obj = _this.sxkdList;
      obj.focusSxkd1 = _this.baseFormdata1.focusSxkd1;
      obj.focusSxkd2 = _this.baseFormdata1.focusSxkd2;
      obj.focusSxkd3 = _this.baseFormdata1.focusSxkd3;
      obj.focusSxkd4 = _this.baseFormdata1.focusSxkd4;
      obj.focusSxkd5 = _this.baseFormdata1.focusSxkd5;
      obj.focusSxkd6 = _this.baseFormdata1.focusSxkd6;
      obj.focusSxkd7 = _this.baseFormdata1.focusSxkd7;
      obj.focusSxkd8 = _this.baseFormdata1.focusSxkd8;
      obj.focusSxkd9 = _this.baseFormdata1.focusSxkd9;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanyssxkd/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data) {
            _this.$message({
              message: '保存成功'
            });
          }
        }});
    },
    clickValue: function (event, num) {
      var _this = this;
      this.sxkdList['pfkKsxd' + num + 'Grade' + _this.index] = event.currentTarget.value;
      if (_this.index == '1') {
        _this.totalGrade1 = parseInt(_this.sxkdList.pfkKsxd1Grade1) + parseInt(_this.sxkdList.pfkKsxd2Grade1) + parseInt(_this.sxkdList.pfkKsxd3Grade1) +
      parseInt(_this.sxkdList.pfkKsxd4Grade1) + parseInt(_this.sxkdList.pfkKsxd5Grade1) + parseInt(_this.sxkdList.pfkKsxd6Grade1) +
      parseInt(_this.sxkdList.pfkKsxd8Grade1);
        if (_this.sxkdList.pfkKsxd7Grade1) {
          _this.totalGrade1 += parseInt(_this.sxkdList.pfkKsxd7Grade1);
        }
        if (_this.sxkdList.pfkKsxd9Grade1) {
          _this.totalGrade1 += parseInt(_this.sxkdList.pfkKsxd9Grade1);
        }
        if (_this.sxkdList.pfkKsxd10Grade1) {
          _this.totalGrade1 += parseInt(_this.sxkdList.pfkKsxd10Grade1);
        }
      } else if (_this.index == '2') {
        _this.totalGrade2 = parseInt(_this.sxkdList.pfkKsxd1Grade2) + parseInt(_this.sxkdList.pfkKsxd2Grade2) + parseInt(_this.sxkdList.pfkKsxd3Grade2) +
      parseInt(_this.sxkdList.pfkKsxd4Grade2) + parseInt(_this.sxkdList.pfkKsxd5Grade2) + parseInt(_this.sxkdList.pfkKsxd6Grade2) +
      parseInt(_this.sxkdList.pfkKsxd8Grade2);
        if (_this.sxkdList.pfkKsxd7Grade2) {
          _this.totalGrade2 += parseInt(_this.sxkdList.pfkKsxd7Grade2);
        }
        if (_this.sxkdList.pfkKsxd9Grade2) {
          _this.totalGrade2 += parseInt(_this.sxkdList.pfkKsxd9Grade2);
        }
        if (_this.sxkdList.pfkKsxd20Grade2) {
          _this.totalGrade2 += parseInt(_this.sxkdList.pfkKsxd20Grade2);
        }
      }
    },
    /** 自动打分 */
    autoRecord: function (managerType) {
      var _this = this;
      var serno = this.param.serno;
      var obj = {};
      obj = _this.sxkdList;
      var rptType = this.param.rptType;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/rptspdanyssxkd/save',
        data: obj,
        callback: function (code, message, response) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/rptspdanyssxkd/autoValue',
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
    checkRadio: function (data) {
      for (var i = 1; i < 11; i++) {
        var name = 'name' + i;
        var value = 'sxkdvalue' + i;
        var pfkKsxdGrade = 'pfkKsxd' + i + 'Grade1';
        name = document.getElementsByName(value);
        for (var j = 0; j < name.length; j++) {
          if (data[pfkKsxdGrade] != null) {
            if (Number(name[j].value) == Number(data[pfkKsxdGrade])) {
              name[j].checked = true;
              break;
            }
          }
        }
      }
      var _this = this;
      // _this.sxkdValue1 = data.pfkKsxd1Grade1;
      // _this.sxkdValue2 = data.pfkKsxd2Grade1;
      // _this.sxkdValue3 = data.pfkKsxd3Grade1;
      // _this.sxkdValue4 = data.pfkKsxd4Grade1;
      // _this.sxkdValue5 = data.pfkKsxd5Grade1;
      // _this.sxkdValue6 = data.pfkKsxd6Grade1;
      // _this.sxkdValue7 = data.pfkKsxd7Grade1;
      // _this.sxkdValue8 = data.pfkKsxd8Grade1;
      // _this.sxkdValue9 = data.pfkKsxd9Grade1;
      // _this.sxkdValue10 = data.pfkKsxd10Grade1;

      _this.totalGrade1 = parseInt(data.pfkKsxd1Grade1) + parseInt(data.pfkKsxd2Grade1) + parseInt(data.pfkKsxd3Grade1) +
      parseInt(data.pfkKsxd4Grade1) + parseInt(data.pfkKsxd5Grade1) + parseInt(data.pfkKsxd6Grade1) +
      parseInt(data.pfkKsxd8Grade1);
      if (data.pfkKsxd7Grade1) {
        _this.totalGrade1 += parseInt(data.pfkKsxd7Grade1);
      }
      if (data.pfkKsxd9Grade1) {
        _this.totalGrade1 += parseInt(data.pfkKsxd9Grade1);
      }
      if (data.pfkKsxd10Grade1) {
        _this.totalGrade1 += parseInt(data.pfkKsxd10Grade1);
      }
      _this.totalGrade2 = parseInt(data.pfkKsxd1Grade2) + parseInt(data.pfkKsxd2Grade2) + parseInt(data.pfkKsxd3Grade2) +
      parseInt(data.pfkKsxd4Grade2) + parseInt(data.pfkKsxd5Grade2) + parseInt(data.pfkKsxd6Grade2) +
      parseInt(data.pfkKsxd8Grade2);
      if (data.pfkKsxd7Grade2) {
        _this.totalGrade2 += parseInt(data.pfkKsxd7Grade2);
      }
      if (data.pfkKsxd9Grade2) {
        _this.totalGrade2 += parseInt(data.pfkKsxd9Grade2);
      }
      if (data.pfkKsxd10Grade2) {
        _this.totalGrade2 += parseInt(data.pfkKsxd10Grade2);
      }
      _this.totalGrade1 = isNaN(_this.totalGrade1) ? 0 : _this.totalGrade1;
      _this.totalGrade2 = isNaN(_this.totalGrade2) ? 0 : _this.totalGrade2;
    }
  }
};
</script>
<style>
.focusSxkd .el-form-item__label{
text-align: left;
}
.card tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
}
</style>
