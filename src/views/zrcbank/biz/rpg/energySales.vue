
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="sales">
    <yu-panel title="近年销售情况" panel-type="simple">
      <table cellspacing="0" cellpadding="0" border="1" height="250px">
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
          <td class="item_header">申报销售收入</td>
          <td>
            <div>
              <yu-input @blur="inputChange('saleIncome','nearSecondAppSaleIncome')" v-if="editFlag === true " v-model="salesData.nearSecondAppSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearSecondAppSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('saleIncome','nearFirstAppSaleIncome')" v-if="editFlag === true " v-model="salesData.nearFirstAppSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearFirstAppSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.appSaleIncomeDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('saleIncome','currAppSaleIncome')" v-if="editFlag === true " v-model="salesData.currAppSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.currAppSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.appSaleIncomeLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">不开票收入</td>
          <td>
            <div>
              <yu-input @blur="inputChange('noInvoiceIncome','nearSecondNoInvoiceIncome')" v-if="editFlag === true " v-model="salesData.nearSecondNoInvoiceIncome" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearSecondNoInvoiceIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('noInvoiceIncome','nearFirstNoInvoiceIncome')" v-if="editFlag === true " v-model="salesData.nearFirstNoInvoiceIncome" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearFirstNoInvoiceIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.noInvoiceIncomeDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('noInvoiceIncome','currNoInvoiceIncome')" v-if="editFlag === true " v-model="salesData.currNoInvoiceIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.currNoInvoiceIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.noInvoiceIncomeLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">实际销售收入合计</td>
          <td>
            <div>
              <yu-input @blur="inputChange('realSaleIncome','nearSecondRealSaleIncome')" v-if="editFlag === true " v-model="salesData.nearSecondRealSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearSecondRealSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('realSaleIncome','nearFirstRealSaleIncome')" v-if="editFlag === true " v-model="salesData.nearFirstRealSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearFirstRealSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.realSaleIncomeDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('realSaleIncome','currRealSaleIncome')" v-if="editFlag === true " v-model="salesData.currRealSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.currRealSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.realSaleIncomeLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">外销收入</td>
          <td>
            <div>
              <yu-input @blur="inputChange('outSaleIncome','nearSecondOutSaleIncome')" v-if="editFlag === true " v-model="salesData.nearSecondOutSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearSecondOutSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('outSaleIncome','nearFirstOutSaleIncome')" v-if="editFlag === true " v-model="salesData.nearFirstOutSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearFirstOutSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.outSaleIncomeDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('outSaleIncome','currOutSaleIncome')" v-if="editFlag === true " v-model="salesData.currOutSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.currOutSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.outSaleIncomeLastYearDiff }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">内销收入</td>
          <td>
            <div>
              <yu-input @blur="inputChange('inSaleIncome','nearSecondInSaleIncome')" v-if="editFlag === true " v-model="salesData.nearSecondInSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearSecondInSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('inSaleIncome','nearFirstInSaleIncome')" v-if="editFlag === true " v-model="salesData.nearFirstInSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.nearFirstInSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.inSaleIncomeDiff }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('inSaleIncome','currInSaleIncome')" v-if="editFlag === true " v-model="salesData.currInSaleIncome" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ salesData.currInSaleIncome }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ salesData.inSaleIncomeLastYearDiff }}</span>
            </div>
          </td>
        </tr>
      </table>
      <yu-xform ref="saleWaveForm" label-width="120px" v-model="saleWaveFormData" style="margin-top:20px" :disabled="op =='VIEW'">
        <yu-xform-group>
          <yu-xform-item label="近年销售波动原因" name="recentSaleWaveReason" ctype="textarea" :disabled="!editFlag"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
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
      salesData: [],
      lastSecond: '',
      lastFirst: '',
      curr: '',
      showEditBtn: true,
      editFlag: false,
      tmpItem: [],
      saleWaveFormData: {},
      inputYear: '',
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
    _this.initSalesWave();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperenergysales/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null) {
              if (response.data.inputYear != null && response.data.inputYear != '') {
                _this.inputYear = response.data.inputYear;
              }
              _this.salesData = response.data;
            } else {
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/rptoperenergysales/initSales',
                data: {
                  serno: _this.param.serno,
                  cusId: _this.param.cusId
                },
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
    initSalesWave: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperation/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.saleWaveFormData);
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
      yufp.clone(_this.salesData, _this.tmpItem);
    },
    /**
     * 报表返回
     */
    cancelFn: function () {
      var _this = this;
      if (_this.editFlag === true) {
        _this.editFlag = false;
        _this.showEditBtn = true;
        yufp.clone(_this.tmpItem, this.salesData);
      }
    },
    inputChange: function (item, arg) {
      var _this = this;
      var val = _this.salesData[arg];
      if (isNaN(val) || val.trim() == '') {
        _this.salesData[arg] = '0.00';
      }
      // 申报销售收入
      if (item == 'saleIncome') {
        _this.salesData.appSaleIncomeDiff = (
          parseFloat(_this.salesData.nearFirstAppSaleIncome) -
          parseFloat(_this.salesData.nearSecondAppSaleIncome)
        ).toFixed(2);
        _this.salesData.appSaleIncomeLastYearDiff = (
          parseFloat(_this.salesData.currAppSaleIncome) -
          parseFloat(_this.salesData.nearFirstAppSaleIncome)
        ).toFixed(2);
      }
      // 不开票收入
      if (item == 'noInvoiceIncome') {
        _this.salesData.noInvoiceIncomeDiff = (
          parseFloat(_this.salesData.nearFirstNoInvoiceIncome) -
          parseFloat(_this.salesData.nearSecondNoInvoiceIncome)
        ).toFixed(2);
        _this.salesData.noInvoiceIncomeLastYearDiff = (
          parseFloat(_this.salesData.currNoInvoiceIncome) -
          parseFloat(_this.salesData.nearFirstNoInvoiceIncome)
        ).toFixed(2);
      }
      // 实际销售收入合计
      if (item == 'realSaleIncome') {
        _this.salesData.realSaleIncomeDiff = (
          parseFloat(_this.salesData.nearFirstRealSaleIncome) -
          parseFloat(_this.salesData.nearSecondRealSaleIncome)
        ).toFixed(2);
        _this.salesData.realSaleIncomeLastYearDiff = (
          parseFloat(_this.salesData.currRealSaleIncome) -
          parseFloat(_this.salesData.nearFirstRealSaleIncome)
        ).toFixed(2);
      }
      // 外销收入
      if (item == 'outSaleIncome') {
        _this.salesData.outSaleIncomeDiff = (
          parseFloat(_this.salesData.nearSecondOutSaleIncome) -
          parseFloat(_this.salesData.nearFirstOutSaleIncome)
        ).toFixed(2);
        _this.salesData.outSaleIncomeLastYearDiff = (
          parseFloat(_this.salesData.currOutSaleIncome) -
          parseFloat(_this.salesData.nearFirstOutSaleIncome)
        ).toFixed(2);
      }
      // 内销收入
      if (item == 'inSaleIncome') {
        _this.salesData.inSaleIncomeDiff = (
          parseFloat(_this.salesData.nearFirstInSaleIncome) -
          parseFloat(_this.salesData.nearSecondInSaleIncome)
        ).toFixed(2);
        _this.salesData.inSaleIncomeLastYearDiff = (
          parseFloat(_this.salesData.currInSaleIncome) -
          parseFloat(_this.salesData.nearFirstInSaleIncome)
        ).toFixed(2);
      }
    },
    saveFn: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperenergysales/updateSales',
        data: _this.salesData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            yufp.clone(_this.salesData, _this.tmpItem);
            // 销售波动
            var obj = {};
            obj.serno = _this.param.serno;
            obj.recentSaleWaveReason =
              _this.saleWaveFormData.recentSaleWaveReason;
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz + '/api/rptoperation/updateRptOperation',
              data: obj,
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.initSalesWave();
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
.sales tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
}

.sales .item__header td {
  background-color: #feb201;
  color: #000000;
  text-align: center;
}

.sales .item__amt_txt {
  padding: 3px 10px;
}
.sales .item_header {
  text-align: center;
}
</style>
