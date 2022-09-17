
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="report">
    <yu-panel title="利润情况" panel-type="simple">
      <table cellspacing="0" cellpadding="0" border="1" height="500px">
        <colgroup class="el-table_group">
          <col width="247">
          <col width="245">
          <col width="245">
          <col width="245">
          <col width="245">
          <col width="245">
        </colgroup>
        <tr class="item__header">
          <td class="item_header">项目</td>
          <td class="item_header">{{ lastSecond }}</td>
          <td class="item_header">{{ lastFirst }}</td>
          <td class="item_header">增减值</td>
          <td class="item_header">{{ curr }}</td>
          <td class="item_header">较上年同期增减</td>
        </tr>
        <tr>
          <td class="item_header">主营业务利润</td>
          <td>
            <div>
              <yu-input @blur="inputChange('mainBusiProfit','nearSecondMainBusiProfit')" v-if="editFlag === true " v-model="profitData.nearSecondMainBusiProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondMainBusiProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('mainBusiProfit','nearFirstMainBusiProfit')" v-if="editFlag === true " v-model="profitData.nearFirstMainBusiProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstMainBusiProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.mainBusiProfitDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('mainBusiProfit','currMainBusiProfit')" v-if="editFlag === true " v-model="profitData.currMainBusiProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currMainBusiProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.mainBusiProfitLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">毛利率</td>
          <td>
            <div>
              <yu-input @blur="inputChange('grossProfit','nearSecondGrossProfit')" v-if="editFlag === true " v-model="profitData.nearSecondGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('grossProfit','nearFirstGrossProfit')" v-if="editFlag === true " v-model="profitData.nearFirstGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.grossProfitDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('grossProfit','currGrossProfit')" v-if="editFlag === true " v-model="profitData.currGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.grossProfitLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">三大费用：营业费用</td>
          <td>
            <div>
              <yu-input @blur="inputChange('businessExpenses','nearSecondBusinessExpenses')" v-if="editFlag === true " v-model="profitData.nearSecondBusinessExpenses" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondBusinessExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('businessExpenses','nearFirstBusinessExpenses')" v-if="editFlag === true " v-model="profitData.nearFirstBusinessExpenses" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstBusinessExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.businessExpensesDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('businessExpenses','currBusinessExpenses')" v-if="editFlag === true " v-model="profitData.currBusinessExpenses" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currBusinessExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.businessExpensesLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">三大费用：管理费用</td>
          <td>
            <div>
              <yu-input @blur="inputChange('managementExpenses','nearSecondManagementExpenses')" v-if="editFlag === true " v-model="profitData.nearSecondManagementExpenses" type="num"
                :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondManagementExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('managementExpenses','nearFirstManagementExpenses')" v-if="editFlag === true " v-model="profitData.nearFirstManagementExpenses" type="num"
                :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstManagementExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.managementExpensesDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('managementExpenses','currManagementExpenses')" v-if="editFlag === true " v-model="profitData.currManagementExpenses" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currManagementExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.managementExpensesLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">三大费用：财务费用</td>
          <td>
            <div>
              <yu-input @blur="inputChange('financialExpenses','nearSecondFinancialExpenses')" v-if="editFlag === true " v-model="profitData.nearSecondFinancialExpenses" type="num"
                :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondFinancialExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('financialExpenses','nearFirstFinancialExpenses')" v-if="editFlag === true " v-model="profitData.nearFirstFinancialExpenses" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstFinancialExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.financialExpensesDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('financialExpenses','currFinancialExpenses')" v-if="editFlag === true " v-model="profitData.currFinancialExpenses" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currFinancialExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.financialExpensesLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">三大费用小计</td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.nearSecondThreeExpensesSum }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.nearFirstThreeExpensesSum }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.threeExpensesSumDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.currThreeExpensesSum }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.threeExpensesSumLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">营业利润</td>
          <td>
            <div>
              <yu-input @blur="inputChange('operaExpenses','nearSecondOperaExpenses')" v-if="editFlag === true " v-model="profitData.nearSecondOperaExpenses" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondOperaExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('operaExpenses','nearFirstOperaExpenses')" v-if="editFlag === true " v-model="profitData.nearFirstOperaExpenses" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstOperaExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.operaExpensesDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('operaExpenses','currOperaExpenses')" v-if="editFlag === true " v-model="profitData.currOperaExpenses" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currOperaExpenses }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.operaExpensesLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">投资收益</td>
          <td>
            <div>
              <yu-input @blur="inputChange('investIncome','nearSecondInvestIncome')" v-if="editFlag === true " v-model="profitData.nearSecondInvestIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondInvestIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('investIncome','nearFirstInvestIncome')" v-if="editFlag === true " v-model="profitData.nearFirstInvestIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstInvestIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.investIncomeDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('investIncome','currInvestIncome')" v-if="editFlag === true " v-model="profitData.currInvestIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currInvestIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.investIncomeLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">利润总额</td>
          <td>
            <div>
              <yu-input @blur="inputChange('totalProfit','nearSecondTotalProfit')" v-if="editFlag === true " v-model="profitData.nearSecondTotalProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondTotalProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('totalProfit','nearFirstTotalProfit')" v-if="editFlag === true " v-model="profitData.nearFirstTotalProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstTotalProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.totalProfitDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('totalProfit','currTotalProfit')" v-if="editFlag === true " v-model="profitData.currTotalProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currTotalProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.totalProfitLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">所得税</td>
          <td>
            <div>
              <yu-input @blur="inputChange('incomeTax','nearSecondIncomeTax')" v-if="editFlag === true " v-model="profitData.nearSecondIncomeTax" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondIncomeTax }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('incomeTax','nearFirstIncomeTax')" v-if="editFlag === true " v-model="profitData.nearFirstIncomeTax" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstIncomeTax }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.incomeTaxDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('incomeTax','currIncomeTax')" v-if="editFlag === true " v-model="profitData.currIncomeTax" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currIncomeTax }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.incomeTaxLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">实际净利润</td>
          <td>
            <div>
              <yu-input @blur="inputChange('realGrossProfit','nearSecondRealGrossProfit')" v-if="editFlag === true " v-model="profitData.nearSecondRealGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearSecondRealGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('realGrossProfit','nearFirstRealGrossProfit')" v-if="editFlag === true " v-model="profitData.nearFirstRealGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ profitData.nearFirstRealGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.realGrossProfitDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('realGrossProfit','currRealGrossProfit')" v-if="editFlag === true " v-model="profitData.currRealGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ profitData.currRealGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ profitData.realGrossProfitLastYearDiff }}</span>
            </div>
          </td>
        </tr>
      </table>
      <div class="yu-grpButton" style="margin-top: 20px">
        <yu-button type="primary" v-show="!showEditBtn&&op!='VIEW'" @click="saveFn">保存</yu-button>
        <yu-button type="primary" v-show="showEditBtn&&op!='VIEW'" @click="editFn">编辑</yu-button>
        <yu-button type="primary" @click="cancelFn" v-show="!showEditBtn&&op!='VIEW'">返回</yu-button>
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
    param: Object
  },
  data: function () {
    return {
      profitData: [],
      lastSecond: '',
      lastFirst: '',
      curr: '',
      editFlag: false,
      showEditBtn: true,
      tmpItem: [],
      inputYear: '',
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz + '/api/rptoperprofitsituation/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null) {
              if (
                response.data.inputYear != null &&
                response.data.inputYear != ''
              ) {
                _this.inputYear = response.data.inputYear;
              }
              _this.profitData = response.data;
              _this.profitData.inputYear = _this.inputYear;
            } else {
              _this.inputYear = _this.$xutils.dateFormat('yyyy-MM', new Date());
              var obj = {};
              obj.serno = _this.param.serno;
              obj.cusId = _this.param.cusId;
              yufp.service.request({
                method: 'POST',
                url:
                  _this.$backend.cmisBiz +
                  '/api/rptoperprofitsituation/initProfitSituation',
                data: JSON.stringify({
                  serno: _this.param.serno,
                  cusId: _this.param.cusId
                }),
                callback: function (code, message, response) {
                  if (response.data > 0) {
                    _this.init();
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
            var year = _this.inputYear.substring(0, 4);
            var month = _this.inputYear.substring(4, 6);
            if (month.substring(0, 1) == '0') {
              month = month.substring(1, 2);
            }
            _this.lastSecond = parseInt(year) - 2 + '年度';
            _this.lastFirst = parseInt(year) - 1 + '年度';
            _this.curr = year + '年1月-' + month + '月';
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
    /**
      初始化参数
     */
    $formatNumber: function (format, sort) {
      let _this = this;
      sort = sort === undefined ? 2 : sort;
      return function (r, c, v) {
        var val;
        switch (sort) {
        case 0:
          val = r;
          break;
        case 1:
          val = c;
          break;
        case 2:
          val = v;
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('未找到分类');
          break;
        }

        if (val == undefined) {
          return '';
        }
        if (val != 0 && !parseFloat(val)) {
          return val;
        }
        return _this.$number(val, format);
      };
    },
    $number: function (v, format) {
      if (!format) {
        return v;
      }
      if (isNaN(v)) {
        return '';
      }
      var comma = ',',
        dec = '.',
        i18n = false,
        neg = v < 0;

      v = Math.abs(v);
      if (format.substr(format.length - 2) == '/i') {
        format = format.substr(0, format.length - 2);
        i18n = true;
        comma = '.';
        dec = ',';
      }

      var hasComma = format.indexOf(comma) != -1,
        psplit = (i18n
          ? format.replace(/[^\d,]/g, '')
          : format.replace(/[^\d.]/g, '')
        ).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error(
          'NumberFormatException: invalid format, formats should have no more than 1 period: ' +
            format
        );
      } else {
        v = v.toFixed(0);
      }

      var fnum = v.toString();

      psplit = fnum.split('.');

      if (hasComma) {
        let cnum = psplit[0],
          parr = [],
          j = cnum.length,
          // m = Math.floor(j / 3),
          n = cnum.length % 3 || 3,
          i;

        for (i = 0; i < j; i += n) {
          if (i != 0) {
            n = 3;
          }

          parr[parr.length] = cnum.substr(i, n);
          // m -= 1;
        }
        fnum = parr.join(comma);
        if (psplit[1]) {
          fnum += dec + psplit[1];
        }
      } else {
        if (psplit[1]) {
          fnum = psplit[0] + dec + psplit[1];
        }
      }

      return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
    },

    /**
     * 报表修改
     */
    editFn: function () {
      var _this = this;
      _this.editFlag = true;
      _this.showEditBtn = false;
      _this.tmpItem = [];
      yufp.clone(_this.profitData, _this.tmpItem);
    },
    /**
     * 报表返回
     */
    cancelFn: function () {
      var _this = this;
      if (_this.editFlag === true) {
        _this.editFlag = false;
        _this.showEditBtn = true;
        yufp.clone(_this.tmpItem, _this.profitData);
      }
    },
    /**
      报表数据变更
     */
    inputChange: function (item, arg) {
      var _this = this;
      var val = _this.profitData[arg];
      if (isNaN(val) || val.trim() == '') {
        _this.profitData[arg] = '0.00';
      }
      // 主营业务利润
      if (item == 'mainBusiProfit') {
        _this.profitData.mainBusiProfitDiff = (
          parseFloat(_this.profitData.nearFirstMainBusiProfit) -
          parseFloat(_this.profitData.nearSecondMainBusiProfit)
        ).toFixed(2);
        _this.profitData.mainBusiProfitLastYearDiff = (
          parseFloat(_this.profitData.currMainBusiProfit) -
          parseFloat(_this.profitData.nearFirstMainBusiProfit)
        ).toFixed(2);
      }
      // 毛利率
      if (item == 'grossProfit') {
        _this.profitData.grossProfitDiff = (
          parseFloat(_this.profitData.nearFirstGrossProfit) -
          parseFloat(_this.profitData.nearSecondGrossProfit)
        ).toFixed(2);
        _this.profitData.grossProfitLastYearDiff = (
          parseFloat(_this.profitData.currGrossProfit) -
          parseFloat(_this.profitData.nearFirstGrossProfit)
        ).toFixed(2);
      }
      // 营业费用
      if (item == 'businessExpenses') {
        _this.profitData.businessExpensesDiff = (
          parseFloat(_this.profitData.nearFirstBusinessExpenses) -
          parseFloat(_this.profitData.nearSecondBusinessExpenses)
        ).toFixed(2);
        _this.profitData.businessExpensesLastYearDiff = (
          parseFloat(_this.profitData.currBusinessExpenses) -
          parseFloat(_this.profitData.nearFirstBusinessExpenses)
        ).toFixed(2);
      }
      // 管理费用
      if (item == 'managementExpenses') {
        _this.profitData.managementExpensesDiff = (
          parseFloat(_this.profitData.nearFirstManagementExpenses) -
          parseFloat(_this.profitData.nearSecondManagementExpenses)
        ).toFixed(2);
        _this.profitData.managementExpensesLastYearDiff = (
          parseFloat(_this.profitData.currManagementExpenses) -
          parseFloat(_this.profitData.nearFirstManagementExpenses)
        ).toFixed(2);
      }
      // 财务费用
      if (item == 'financialExpenses') {
        _this.profitData.financialExpensesDiff = (
          parseFloat(_this.profitData.nearFirstFinancialExpenses) -
          parseFloat(_this.profitData.nearSecondFinancialExpenses)
        ).toFixed(2);
        _this.profitData.financialExpensesLastYearDiff = (
          parseFloat(_this.profitData.currFinancialExpenses) -
          parseFloat(_this.profitData.nearFirstFinancialExpenses)
        ).toFixed(2);
      }
      // 小计
      if (
        item == 'businessExpenses' ||
        item == 'managementExpenses' ||
        item == 'financialExpenses'
      ) {
        _this.profitData.nearSecondThreeExpensesSum = (
          parseFloat(_this.profitData.nearSecondFinancialExpenses) +
          parseFloat(_this.profitData.nearSecondManagementExpenses) +
          parseFloat(_this.profitData.nearSecondBusinessExpenses)
        ).toFixed(2);
        _this.profitData.nearFirstThreeExpensesSum = (
          parseFloat(_this.profitData.nearFirstFinancialExpenses) +
          parseFloat(_this.profitData.nearFirstManagementExpenses) +
          parseFloat(_this.profitData.nearFirstBusinessExpenses)
        ).toFixed(2);
        _this.profitData.currThreeExpensesSum = (
          parseFloat(_this.profitData.currManagementExpenses) +
          parseFloat(_this.profitData.currBusinessExpenses) +
          parseFloat(_this.profitData.currGrossProfit)
        ).toFixed(2);
        _this.profitData.threeExpensesSumDiff = (
          parseFloat(_this.profitData.nearFirstThreeExpensesSum) -
          parseFloat(_this.profitData.nearSecondThreeExpensesSum)
        ).toFixed(2);
        _this.profitData.threeExpensesSumLastYearDiff = (
          parseFloat(_this.profitData.currThreeExpensesSum) -
          parseFloat(_this.profitData.nearFirstThreeExpensesSum)
        ).toFixed(2);
      }
      // 营业利润
      if (item == 'operaExpenses') {
        _this.profitData.operaExpensesDiff = (
          parseFloat(_this.profitData.nearFirstOperaExpenses) -
          parseFloat(_this.profitData.nearSecondOperaExpenses)
        ).toFixed(2);
        _this.profitData.operaExpensesLastYearDiff = (
          parseFloat(_this.profitData.currOperaExpenses) -
          parseFloat(_this.profitData.nearFirstOperaExpenses)
        ).toFixed(2);
      }
      // 投资收益
      if (item == 'investIncome') {
        _this.profitData.investIncomeDiff = (
          parseFloat(_this.profitData.nearFirstInvestIncome) -
          parseFloat(_this.profitData.nearSecondInvestIncome)
        ).toFixed(2);
        _this.profitData.investIncomeLastYearDiff = (
          parseFloat(_this.profitData.currInvestIncome) -
          parseFloat(_this.profitData.nearFirstInvestIncome)
        ).toFixed(2);
      }
      // 利润总额
      if (item == 'totalProfit') {
        _this.profitData.totalProfitDiff = (
          parseFloat(_this.profitData.nearFirstTotalProfit) -
          parseFloat(_this.profitData.nearSecondTotalProfit)
        ).toFixed(2);
        _this.profitData.totalProfitLastYearDiff = (
          parseFloat(_this.profitData.currTotalProfit) -
          parseFloat(_this.profitData.nearFirstTotalProfit)
        ).toFixed(2);
      }
      // 所得税
      if (item == 'incomeTax') {
        _this.profitData.incomeTaxDiff = (
          parseFloat(_this.profitData.nearFirstIncomeTax) -
          parseFloat(_this.profitData.nearSecondIncomeTax)
        ).toFixed(2);
        _this.profitData.incomeTaxLastYearDiff = (
          parseFloat(_this.profitData.currIncomeTax) -
          parseFloat(_this.profitData.nearFirstIncomeTax)
        ).toFixed(2);
      }
      // 实际净利润
      if (item == 'realGrossProfit') {
        _this.profitData.realGrossProfitDiff = (
          parseFloat(_this.profitData.nearFirstRealGrossProfit) -
          parseFloat(_this.profitData.nearSecondRealGrossProfit)
        ).toFixed(2);
        _this.profitData.realGrossProfitLastYearDiff = (
          parseFloat(_this.profitData.currRealGrossProfit) -
          parseFloat(_this.profitData.nearFirstRealGrossProfit)
        ).toFixed(2);
      }
    },
    saveFn: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz + '/api/rptoperprofitsituation/updateProfit',
        data: _this.profitData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            yufp.clone(_this.profitData, _this.tmpItem);
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
<style>
.report tr > td {
  border: 1px solid #a2aebd;
  height: 20px;
}

.report .item__header td {
  background-color: #feb201;
  color: #000000;
  text-align: center;
}

.report .item__amt_txt {
  padding: 3px 10px;
}
.report .item_header {
  text-align: center;
}
</style>
