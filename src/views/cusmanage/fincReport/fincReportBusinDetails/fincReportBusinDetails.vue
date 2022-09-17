<template>
<div>
        <div :label="reportInfoItem.label" :name="reportInfoItem.reportIndex" v-for="(reportInfoItem, index) in reportInfo" :key="index" style="display:inline-block;width:50%;vertical-align: top;">
            <div class="report">
                <table class="title" style="width:100%">
                  <tr class="title_stat">
                    <td colspan="4" style="color:red;">{{ getStatus(reportInfoItem.reportIndex) }}</td>
                  </tr>
                  <tr class="title_desc">
                    <td colspan="4" style="font-weight:700;font-size:14px;">{{ getTitle(reportInfoItem.confStyles) }}</td>
                  </tr>
                  <tr class="title_date">
                    <td colspan="4" style="font-size:13px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ getRepDate() }}</td>
                  </tr>
                  <tr class="title_detail">
                    <td>编制单位：{{ statBase.inputBrId }}（{{ statBase.cusId }}[{{ statBase.cusName }}]）</td>
                    <td>填报日期：{{ formatterDate() }}</td>
                    <td>单位：元</td>
                  </tr>
                </table>
                <yu-row>
                  <yu-col v-for="(item, indexItem) in reportInfoItem.confStyles.fncConfCotes" :span="reportInfoItem.confStyles.fncConfCotes === 1 ? 24 : 12"
                    :key="indexItem">
                    <table style="width:100%">
                      <tr class="item__header">
                        <td v-for="(ite,idx) in reportInfoItem.header" :key="idx" :style="{'width': ite.width}" class="item_header"><span v-if="index === 1 && reportInfoItem.reportIndex === '13' && idx === 0">负债及所有者权益</span><span v-else>{{ ite.content }}</span></td>
                      </tr>
                      <template v-for="(it,ind) in reportInfoItem.items">
                        <tr :key="ind" v-if="item === it.fncConfCotes">
                          <td :class="['item__label', {'item__amt_cal': it.fncConfCalFrm}]" :style="{'width': reportInfoItem.header[0].width}"
                            v-if="reportInfoItem.header[0]"><span v-html="parseContent(it)"></span></td>
                          <!--循环产生数字数据列数-->
                          <template v-for="(amt, amtIndex) in reportInfoItem.confStyles.fncConfDataCol">
                          <td :class="['item__amt',{'item_none': it.fncItemEditTyp === '3'}]" :style="{'width': reportInfoItem.header[1 + amtIndex].width}" v-if="reportInfoItem.header[1 + amtIndex]" :key="amtIndex">
                            <div  v-if="it.fncItemEditTyp !== '3' && it.fncConfRowFlg !=='2'"><yu-input v-if="editFlag === true && !it.fncConfCalFrm" v-model="formData['formData' + reportInfoItem.reportIndex][it.itemId]['data'+(1 + amtIndex)]" type="num"
                              @blur="inputChange(arguments,reportInfoItem.reportIndex,it.itemId, 1 + amtIndex )" :formatter="$formatNumber('0,000.00',0)" maxlength="16"></yu-input>
                              <yu-input v-else-if="it.fncConfCalFrm && editFlag === true" :disabled="true" :value="cal(reportInfoItem.reportIndex,it.itemId, 1 + amtIndex )" maxlength="16"></yu-input>
                              <span v-else-if="it.fncConfCalFrm" class="item__amt_txt">{{ cal(reportInfoItem.reportIndex,it.itemId, 1 + amtIndex ) }}</span>
                              <span v-else class="item__amt_txt">{{ formatMoney(formData['formData' + reportInfoItem.reportIndex][it.itemId]['data'+(1 + amtIndex) ]) }}</span>
                              <div>
                          </div></div></td>
                          </template>
                        </tr>
                        <!--追加行数 -->
                        <tr v-for="(blankRow, indexBr) in it.fncCnfAppRow" :key="indexBr" style="height:20px"></tr>
                      </template>
                    </table>
                  </yu-col>
                </yu-row>
                <table class="footer" style="width:100%">
                  <tr>
                    <td align="right" style="padding-right: 20px;">制表人：{{ statBase.inputId }}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="yu-grpButton" v-if="showBtn">
              <yu-button icon="yx-checkmark" type="primary" v-show="!showEditBtn" @click="saveFn('1')">暂存</yu-button>
              <yu-button icon="yx-checkmark" type="primary" v-show="!showEditBtn" @click="saveFn('2')">完成</yu-button>
              <yu-button icon="yx-checkmark" type="primary" v-show="showEditBtn" @click="editFn">编辑</yu-button>
              <yu-button icon="yx-undo2" type="primary" @click="cancelFn" v-show="!showEditBtn">返回</yu-button>
            </div>
</div>
</template>
<script>
console.log(111111);
import router from '@/router';
let data = router.history.pending.params;
var reportResponse = {};
// 存储报表映射关系
var reportInfo = [];
let model = {cusId: data.cusId, statStyle: data.statStyle, statPrdStyle: data.statPrdStyle, statPrd: data.statPrd};
// 同步请求获取相关信息为将栏位的计算公式绑定，故使用mixin 混入（vue实例创建前处理好mixin数据）
yufp.service.request({
  method: 'GET',
  async: false, // 同步操作
  url: backend.cmisCus + '/api/nrcs-cms/fncstatdtl/q/fncstatdtl/detailall', // ?cusId=9540462373&statStyle=1&statPrdStyle=1&statPrd=201102',
  data: model,
  callback: function (code, message, response) {
    if (response.code === '0') {
      reportResponse = response.data;
      for (let item in reportResponse.itemsMap) {
        let num = 0, report = reportResponse.itemsMap[item];
        for (let i = 0; i < report.length; i++) {
          // 显示且不为标题项
          if (report[i].fncConfRowFlg === '1') {
            num++;
            report[i].rowOrder = num; // 自定义行次
          } else {
            report[i].rowOrder = '';
          }
        }
      }
    }
  }
});
// mixin 对象
let mixin = {computed: {
}};
/**
     *  返回报文分组映射
     * 01:资产负债表 statBsStyleId
     * 02:损益表 statPlStyleId
     * 03:现金流量表 statCfStyleId
     * 04:财务指标表 statFiStyleId
     * 05:所有者权益变动 statSoeStyleId
     * 06:财务简表 statSlStyleId
     */
let arr = [{key: 'statBssStyleId', label: '资产负债表_简表'}, {key: 'statPssStyleId', label: '利润表_简表'}, {key: 'statFasStyleId', label: '财务分析指标_简表'}];
for (let j = 0; j < arr.length; j++) {
  let element = arr[j];
  if (reportResponse.statBase[element.key]) {
    let style = null;
    for (let k = 0; k < reportResponse.confStylesList.length; k++) {
      let el = reportResponse.confStylesList[k];
      if (reportResponse.statBase[element.key] === reportResponse.confStylesList[k].styleId) {
        style = el;
        break;
      }
    }
    let reportIndex = (j + 13) + '';
    let header = parseHeader(style);
    let obj = {'reportIndex': reportIndex, 'reportTypeId': reportResponse.statBase[element.key], label: element.label, confStyles: style, items: reportResponse.itemsMap[reportResponse.statBase[element.key]], 'header': header};
    parseCal(reportIndex, obj.confStyles, obj.items);
    reportInfo.push(obj);
  }
}
/**
     * 计算公式联动
     */
function parseCal (reportIndex, confStyles, items, me) {
  for (let i = 0; i < items.length; i++) {
    let element = items[i];
    if (element.fncConfCalFrm) {
      for (let j = 0; j < Number(confStyles.fncConfDataCol); j++) {
        // 定义计算属性的名称为reportIndex + '__'element.itemId + '__' +index（从1开始）例：01__AAAAAA_1
        mixin.computed['formData' + reportIndex + '__' + element.itemId + '__data' + (j + 1)] = (function (ele, index) {
          // 正则表达式将数据替换成理想的层级
          // 跨表情况{[01].[xxxx].[1]}
          let calFrm = ele.fncConfCalFrm.replace(/\{\[(.*?)\].*?\.\[(.*?)\].*?\.\[(.*?)\].*?\}/g, function (a, b, c, d) {
            return 'Number(this.formData.formData' + b + '.' + c + '.data' + d + ')';
          });
          // console.log(calFrm, reportIndex + '__' + ele.itemId + '__data' + j);
          // 表内情况{[xxxx]}
          calFrm = calFrm.replace(/\{\[(.*?)\].*?\}/g, function (a, b) {
            return 'Number(this.formData.formData' + reportIndex + '.' + b + '.data' + (index + 1) + ')';
          });
          // 特殊的函数转换
          calFrm = calFrm.replace('MAX', 'Math.max').replace('MIN', 'Math.min').replace('INT', 'parseInt');
          return function () {
            let value = null;
            try {
              // eslint-disable-next-line no-eval
              value = eval(calFrm);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('计算公式配置错误！', ele.fncConfCalFrm, calFrm, error);
            }
            if (isNaN(value) || value === Infinity) {
              value = '';
            }
            return this.formatMoney(value);
          };
        }(element, j));
      }
    }
  }
}

function parseHeader (confStyles) {
  var header = [];
  if (confStyles.fncConfTyp === '13') {
    header.push({width: '40%', content: '资产'});
    header.push({width: '60%', content: '期末数'});
  } else if (confStyles.fncConfTyp === '14') {
    header.push({width: '40%', content: '项目'});
    header.push({width: '20%', content: '上两年累计数'});
    header.push({width: '20%', content: '上年累计数'});
    header.push({width: '20%', content: '本月累计数'});
  } else if (confStyles.fncConfTyp === '15') {
    header.push({width: '70%', content: '项目'});
    header.push({width: '30%', content: '数值'});
  }
  return header;
}
export default {
  mixins: [mixin],
  data: function () {
    return {
      // 每个报表表单的数据
      formData: {
        formData13: {},
        formData14: {},
        formData15: {}
      },
      reportInfo: reportInfo,
      statBase: reportResponse.statBase,
      showBtn: false,
      // 默认激活的tab页签
      activeName: '01',
      tmpItem: [],
      // 制表人
      userName: yufp.session.userName,
      // 统一控制 是否显示修改报表按钮
      showEditBtn: true,
      // 统一控制 是否显示修改报表可编辑状态
      editFlag: false
    };
  },
  methods: {
    getStatus: function (index) {
      //  根据所以返回状态
      var flag = this.statBase.stateFlg.substr(Number(index) - 9, 1);
      if (flag === '0') {
        return '报表状态：未存储';
      } else if (flag === '1') {
        return '报表状态：暂存';
      } else if (flag === '2') {
        return '报表状态：已完成';
      }
    },
    /**
         * 拼接报表头信息
         */
    getTitle: function (confStyles) {
      var oth = '';
      switch (Number(confStyles.fncConfDisNam)) {
      case 1:
        oth = '（月报）';
        break;
      case 2:
        oth += '（季报）';
        break;
      case 3:
        oth += '（半年报）';
        break;
      case 4:
        oth += '（年报）';
        break;
      default:
        break;
      }
      return confStyles.fncConfDisName + oth;
    },
    /**
         * 报表头部显示的日期
         */
    getRepDate: function () {
      return this.statBase && this.statBase.statPrd && this.statBase.statPrd.substring(0, 4) + ' 年　' + this.statBase.statPrd.substring(4) + '月';
    },
    formatterDate: function () {
      return this.statBase.inputDate && yufp.util.dateFormat(this.statBase.inputDate, '{y}年{m}月{d}日');
    },
    /**
         * 一行有多列公式，所以通过索引绑定对应列的公式
         */
    cal: function (reportIndex, compu, index) {
      var value = this['formData' + reportIndex + '__' + compu + '__data' + index];
      this.formData['formData' + reportIndex][compu]['data' + index] = value;
      return value;
    },
    // 解析文本（包括空格，前缀）
    parseContent: function (item) {
      var blank = '';
      for (let i = 0; i < item.fncConfIndent; i++) {
        blank += '&nbsp;&nbsp;';
      }
      // 层次(1个层级2个空格) + 前缀 + 项目名称
      return blank + (item.fncConfPrefix === null ? '' : item.fncConfPrefix) + item.itemName;
    },
    formatMoney: function (number) {
      return this.$formatNumber('0.00', 0)(number);
    },
    /**
         * 保存数据（暂存和完成）
         * @param flag 为‘1’ 暂存，为‘2’ 完成
         */
    saveFn: function (flag) {
      var _this = this;
      var datas = [];
      for (let k = 0; k < this.reportInfo.length; k++) {
        let el = this.reportInfo[k];
        // 通用信息
        let mod = {
          cusId: data.cusId,
          statPrdStyle: data.statPrdStyle,
          statPrd: data.statPrd,
          statStyle: data.statStyle,
          statConfStyleId: el.reportTypeId,
          fncConfTyp: el.reportIndex,
          items: []
        };
        // 表单对应的字段信息 this.formData.formDataxx.[data1/data2/data3/data4]
        for (let item in this.formData['formData' + el.reportIndex]) {
          let itemObj = {itemId: item};
          for (let itm in this.formData['formData' + el.reportIndex][item]) {
            itemObj[itm] = this.formData['formData' + el.reportIndex][item][itm];
            mod.items.push(itemObj);
          }
        }
        datas.push(mod);
      }

      var url = '';
      if (flag === '1') {
        url = backend.cmisCus + '/api/nrcs-cms/fncstatdtl/s/fncstatdtl/tempsavebrief';
      } else if (flag === '2') {
        url = backend.cmisCus + '/api/nrcs-cms/fncstatdtl/s/fncstatdtl/savebrief';
      }
      yufp.service.request({
        method: 'post',
        url: url,
        data: {reportInfo: datas},
        callback: function (code, message, response) {
          if (response.code === '0') {
            _this.showEditBtn = true;
            _this.editFlag = false;
            if (flag === '1') {
              _this.$message('暂存成功！');
            } else if (flag === '2') {
              _this.$message('保存成功！');
            }
          }
        }
      });
    },
    editFn: function () {
      this.editFlag = true;
      this.showEditBtn = false;
      this.tmpItem = [];
      yufp.clone(this.formData, this.tmpItem);
    },
    cancelFn: function () {
      if (this.editFlag === true) {
        this.editFlag = false;
        this.showEditBtn = true;
        // 还原所有数据
        yufp.clone(this.tmpItem.formData13, this.formData.formData13);
        yufp.clone(this.tmpItem.formData14, this.formData.formData14);
        yufp.clone(this.tmpItem.formData15, this.formData.formData15);
      }
    },
    inputChange: function (arg, reportIndex, item, index) {
      var val = this.formData['formData' + reportIndex][item]['data' + index];
      if (isNaN(val) || val.trim() === '') {
        this.formData['formData' + reportIndex][item]['data' + index] = '0.00';
      }
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
    /**
   * Formats the number according to the format string.
   * examples (123456.789):
   * 0 - (123456) show only digits, no precision<br>
   * 0.00 - (123456.78) show only digits, 2 precision<br>
   * 0.0000 - (123456.7890) show only digits, 4 precision<br>
   * 0,000 - (123,456) show comma and digits, no precision<br>
   * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
   * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
   * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
   * For example: 0.000,00/i
   * @param {Number} v The number to format.
   * @param {String} format The way you would like to format this text.
   * @return {String} The formatted number.
   */
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
        psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
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
    }
  },
  created: function () {
    for (let i = 0; i < this.reportInfo.length; i++) {
      let el = this.reportInfo[i];
      for (let j = 0; j < el.items.length; j++) {
        let element = el.items[j];
        this.$set(this.formData['formData' + el.reportIndex], element.itemId, {});
        // 循环对列(金额)元素添加get/set
        for (let k = 0; k < Number(el.confStyles.fncConfDataCol); k++) {
          let tmpVal = element['data' + (k + 1)];
          if (tmpVal === null || tmpVal === undefined || tmpVal === '') {
            tmpVal = '0.00';
          }
          this.$set(this.formData['formData' + el.reportIndex][element.itemId], 'data' + (k + 1), tmpVal);
        }
      }
    }
  },
  mounted: function () {
    // 修改页面显示报表操作按钮
    if (data.pageType === '2') {
      this.showBtn = true;
    }
  }
};
</script>
<style>
    .report tr>td,
    .report th {
      border: 1px solid #a2aebd;
      height: 20px;
    }

    .report .title td {
      border-width: 0px;
    }

    .report .item__header td {
      background-color: #336699;
      color: #000000;
    }

    .report .footer td {
      border-width: 0px;
      padding-right: 180px;
    }

    .report .title_desc,
    .title_date {
      text-align: center;
    }

    .report .item_header {
      text-align: center;
    }

    .report .item__order {
      text-align: center;
    }

    .report .el-input .el-input__inner {
      height: 20px !important;
    }

    .report .item__amt_cal {
      color: red;
    }

    .report .item__amt_txt {
      padding: 3px 10px;
    }

    .report .el-input__inner {
      border-radius: 0px;
      background: white;
      border-width: 0px;
    }
    .report .item_none{
      border: 0px;
    }
  </style>