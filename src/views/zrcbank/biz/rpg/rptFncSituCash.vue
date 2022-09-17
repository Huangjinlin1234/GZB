
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="sales">
    <yu-panel title="现金流量分析" panel-type="simple">
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
          <td class="item_header">{{ cur }}</td>
          <td class="item_header">备注</td>
        </tr>
        <tr>
          <td class="item_header">经营活动现金净流量</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearNcfo')" v-if="editFlag === true " v-model="cashData.lastTwoYearNcfo" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.lastTwoYearNcfo }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearNcfo')" v-if="editFlag === true " v-model="cashData.lastYearNcfo" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.lastYearNcfo }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearNcfo')" v-if="editFlag === true " v-model="cashData.curYearNcfo" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.curYearNcfo }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="cashData.ncfoRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.ncfoRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">投资活动现金净流量</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearNcfia')" v-if="editFlag === true " v-model="cashData.lastTwoYearNcfia" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.lastTwoYearNcfia }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearNcfia')" v-if="editFlag === true " v-model="cashData.lastYearNcfia" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.lastYearNcfia }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearNcfia')" v-if="editFlag === true " v-model="cashData.curYearNcfia" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.curYearNcfia }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="cashData.ncfiaRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.ncfiaRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">筹资活动现金净流量</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearNcffa')" v-if="editFlag === true " v-model="cashData.lastTwoYearNcffa" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.lastTwoYearNcffa }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearNcffa')" v-if="editFlag === true " v-model="cashData.lastYearNcffa" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.lastYearNcffa }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearNcffa')" v-if="editFlag === true " v-model="cashData.curYearNcffa" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.curYearNcffa }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="cashData.ncffaRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ cashData.ncffaRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">合计</td>
          <td>
            <div>
              <span class="item__amt_txt">{{ cashData.lastTwoYearTotal }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ cashData.lastYearTotal }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ cashData.curYearTotal }}</span>
            </div>
          </td>
          <td></td>
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
      cashData: [],
      lastSecond: '',
      lastFirst: '',
      cur: '',
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
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.inputYear = _this.cashData.acquisitionDate;
      var year = _this.inputYear.substring(0, 4);
      var month = _this.inputYear.substring(4, 6);
      if (month.substring(0, 1) == '0') {
        month = month.substring(1, 2);
      }
      _this.lastSecond = parseInt(year) - 2 + '年度';
      _this.lastFirst = parseInt(year) - 1 + '年度';
      _this.cur = year + '年1月-' + month + '月';
      // 合计
      _this.cashData.lastTwoYearTotal =
               parseFloat(parseFloat(_this.cashData.lastTwoYearNcfo) +
                parseFloat(_this.cashData.lastTwoYearNcfia) +
                parseFloat(_this.cashData.lastTwoYearNcffa)).toFixed(2);
      if (isNaN(_this.cashData.lastTwoYearTotal)) {
        _this.cashData.lastTwoYearTotal = '0';
      }
      _this.cashData.lastYearTotal =
                parseFloat(parseFloat(_this.cashData.lastYearNcfo) +
                parseFloat(_this.cashData.lastYearNcfia) +
                parseFloat(_this.cashData.lastYearNcffa)).toFixed(2);
      if (isNaN(_this.cashData.lastYearTotal)) {
        _this.cashData.lastYearTotal = '0';
      }
      _this.cashData.curYearTotal =
                parseFloat(parseFloat(_this.cashData.curYearNcfo) +
                parseFloat(_this.cashData.curYearNcfia) +
                parseFloat(_this.cashData.curYearNcffa)).toFixed(2);
      if (isNaN(_this.cashData.curYearTotal)) {
        _this.cashData.curYearTotal = '0';
      }
    },
    inputChange: function (arg) {
      var _this = this;
      var val = _this.cashData[arg];
      if (isNaN(val) || val.trim() == '') {
        _this.cashData[arg] = '0.00';
      }
      _this.cashData.lastTwoYearTotal =
        parseFloat(parseFloat(_this.cashData.lastTwoYearNcfo) +
        parseFloat(_this.cashData.lastTwoYearNcfia) +
        parseFloat(_this.cashData.lastTwoYearNcffa)).toFixed(2);
      _this.cashData.lastYearTotal =
        parseFloat(parseFloat(_this.cashData.lastYearNcfo) +
        parseFloat(_this.cashData.lastYearNcfia) +
        parseFloat(_this.cashData.lastYearNcffa)).toFixed(2);
      _this.cashData.curYearTotal =
        parseFloat(parseFloat(_this.cashData.curYearNcfo) +
        parseFloat(_this.cashData.curYearNcfia) +
        parseFloat(_this.cashData.curYearNcffa)).toFixed(2);
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
      yufp.clone(_this.cashData, _this.tmpItem);
    },
    /**
     * 报表返回
     */
    cancelFn: function () {
      var _this = this;
      if (_this.editFlag === true) {
        _this.editFlag = false;
        _this.showEditBtn = true;
        yufp.clone(_this.tmpItem, this.cashData);
      }
    },
    saveFn: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      obj.acquisitionDate = _this.inputYear;
      obj.lastTwoYearNcfo = _this.cashData.lastTwoYearNcfo;
      obj.lastTwoYearNcfia = _this.cashData.lastTwoYearNcfia;
      obj.lastTwoYearNcffa = _this.cashData.lastTwoYearNcffa;
      obj.lastYearNcfo = _this.cashData.lastYearNcfo;
      obj.lastYearNcfia = _this.cashData.lastYearNcfia;
      obj.lastYearNcffa = _this.cashData.lastYearNcffa;
      obj.curYearNcfo = _this.cashData.curYearNcfo;
      obj.curYearNcfia = _this.cashData.curYearNcfia;
      obj.curYearNcffa = _this.cashData.curYearNcffa;
      obj.ncfoRemark = _this.cashData.ncfoRemark;
      obj.ncfiaRemark = _this.cashData.ncfiaRemark;
      obj.ncffaRemark = _this.cashData.ncffaRemark;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitu/saveFncSitu',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            yufp.clone(_this.cashData, _this.tmpItem);
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
