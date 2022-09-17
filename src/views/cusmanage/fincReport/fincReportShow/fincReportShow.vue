<template>
<div class="report">
  <table class="title" style="width:100%">
    <tr class="title_stat">
      <td colspan="4" style="color:red;">{{ statFlagText }}</td>
    </tr>
    <tr class="title_desc">
      <td colspan="4" style="font-weight:700;font-size:14px;">{{ getTitle() }}</td>
    </tr>
    <tr class="title_date">
      <td colspan="4" style="font-size:13px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ getRepDate() }}</td>
    </tr>
    <tr class="title_detail">
      <td>编制单位：{{ statBase.inputBrId }}（{{ statBase.cusId }}）</td>
      <td>填报日期：{{ formatterDate() }}</td>
      <td>单位：元</td>
    </tr>
  </table>
  <yu-row>
    <yu-col v-for="(item,index) in confStyles.fncConfCotes" :span="confStyles.fncConfCotes === 1 ? 24 : 12"
      :key="index">
      <table style="width:100%">
        <tr class="item__header">
          <td v-for="(ite,idx) in header" :style="{'width': ite.width}" class="item_header" :key="idx">{{ ite.content }}</td>
        </tr>
        <template v-for="(it,ind) in items">
        <tr :key="ind" v-if="item === it.fncConfCotes">
          <td :class="['item__label', {'item__amt_cal': it.fncConfCalFrm}]" :style="{'width': header[0].width}"
            v-if="header[0]"><span v-html="parseContent(it)"></span></td>
          <td class="item__order" :style="{'width': header[1].width}" v-if="header[1]">{{ it.fncConfOrder }}</td>
          <td class="item__amt" :style="{'width': header[2].width}" v-if="header[2]">
            <yu-input v-if="editFlag === true && !it.fncConfCalFrm" v-model="formData[it.itemId]['data1']" type="num"
              @blur="inputChange(arguments,it.itemId, 1)" placeholder="0.00"></yu-input><span
              v-else-if="it.fncConfCalFrm" class="item__amt_txt">{{ cal(it.itemId, 1) }}</span><span v-else
              class="item__amt_txt">{{ formatMoney(formData[it.itemId]['data1']) }}</span>
          </td>
          <td class="item__amt" :style="{'width': header[3].width}" v-if="header[3]">
            <yu-input v-if="editFlag === true && !it.fncConfCalFrm" v-model="formData[it.itemId]['data2']" type="num"
              @blur="inputChange(arguments,it.itemId, 2)" placeholder="0.00"></yu-input><span
              v-else-if="it.fncConfCalFrm" class="item__amt_txt">{{ cal(it.itemId, 2) }}</span><span v-else
              class="item__amt_txt">{{ formatMoney(formData[it.itemId]['data2']) }}</span>
          </td>
          <td class="item__amt" :style="{'width': header[4].width}" v-if="header[4]">
            <yu-input v-if="editFlag === true && !it.fncConfCalFrm" v-model="formData[it.itemId]['data3']" type="num"
              @blur="inputChange(arguments,it.itemId, 3)" placeholder="0.00"></yu-input><span
              v-else-if="it.fncConfCalFrm" class="item__amt_txt">{{ cal(it.itemId, 3) }}</span><span v-else
              class="item__amt_txt">{{ formatMoney(formData[it.itemId]['data3']) }}</span>
          </td>
        </tr>
        <!--追加行数 -->
        <tr v-for="(blankRow , indexBr)  in it.fncCnfAppRow" style="height:20px" :key="indexBr"></tr>
      </template>
      </table>
    </yu-col>
  </yu-row>
  <table class="footer" style="width:100%">
    <tr>
      <td align="right">制表人：</td>
    </tr>
  </table>
  <div class="yu-grpButton" v-if="showBtn">
    <yu-button icon="yx-checkmark" type="primary" v-show="!showEditBtn" @click="saveFn">保存</yu-button>
    <yu-button icon="yx-checkmark" type="primary" v-show="showEditBtn" @click="editFn">编辑</yu-button>
    <yu-button icon="yx-undo2" type="primary" @click="cancelFn" v-show="!showEditBtn">返回</yu-button>
  </div>
</div>
</template>
<script>
let data = this.$route.meta.params;
let response = {};
// 同步请求获取相关信息为将栏位的计算公式绑定，故使用mixin 混入（vue实例创建前处理好mixin数据）
yufp.service.request({
  method: 'GET',
  async: false, // 同步操作
  url: backend.cmisCus + '/api/nrcs-cms/fncstatdtl/q/fncstatdtl/detail',
  data: data,
  callback: function (code, message, response) {
    yufp.util.responseStatus(code, message, response, function () {
      window.response = response.data;
    });
  }
});
response.confStyles.fncConfDataCol = window.response.confStyles.fncConfDataCol ? window.response.confStyles.fncConfDataCol : '2';
// mixin 对象
var mixin = {computed: {
}};
for (var i = 0; i < window.response.items.length; i++) {
  let element = response.items[i];
  if (element.fncConfCalFrm) {
    for (let j = 0; j < Number(window.response.confStyles.fncConfDataCol); j++) {
      // 定义计算属性的名称为element.itemId + '__' +index（从1开始）
      mixin.computed[element.itemId + '__' + (j + 1)] = (function (ele, index) {
        return function () {
          /**
             * 1.将[]内的替换为Number(this.formData[\'$1\'][data1、data2\data3]
             * 2.将]XXX} 替换为])
             * 3.去掉{
             */
          let calFrm = ele.fncConfCalFrm.replace(/\[(.*?)\]/g, '[Number(this.formData[\'$1\'][\'data' + (index + 1) + '\'])]').replace(/\)\].*?\}/g, ')').replace(/\{\[/g, '');
          // 特殊公式替换max，min int
          calFrm = calFrm.replace('MAX', 'Math.max').replace('MIN', 'Math.min').replace('INT', 'parseInt');
          return this.formatMoney(evil(calFrm));
        };
      }(element, j));
    }
  }
}
function evil (fn) {
  let Fn = Function;
  return new Fn('return ' + fn);
}
export default {
  mixins: [mixin],
  data: function () {
    return {
      // 返回报文的三个模块
      statBase: {},
      confStyles: {},
      items: {},
      editFlag: false,
      // 是否显示编辑button
      showEditBtn: true,
      // 整个表单数据
      formData: {},
      // 报表头部区域
      header: [],
      // 报表状态
      statFlagText: '报表状态：',
      // 报表title
      repTitle: '',
      tmpItem: [],
      // 显示button组
      showBtn: false
    };
  },
  methods: {
    saveFn: function () {
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
        yufp.clone(this.tmpItem, this.formData);
      }
    },
    /**
         * 一行有多列公式，所以通过索引绑定对应列的公式
         */
    cal: function (compu, index) {
      return this[compu + '__' + index];
    },
    /**
         * 根据类型和列数获取表格的表头列数
         */
    parseHeader: function () {
      var col = this.confStyles.fncConfDataCol ? '2' : '2';
      switch (col) {
      case '1':
        this.header.push({width: '45%', content: '项目'});
        if (this.confStyles.fncConfTyp === '04') {
          this.header.push({width: '35%', content: '行次'});
          this.header.push({width: '20%', content: '指标值（比率:%）'});
        } else {
          this.header.push({width: '15%', content: '行次'});
          this.header.push({width: '40%', content: '金额'});
        }
        break;
      case '2':
        this.header.push({width: '45%', content: '项目'});
        this.header.push({width: '15%', content: '行次'});
        if (this.confStyles.fncConfTyp === '02' || this.confStyles.fncConfTyp === '03') {
          this.header.push({width: '20%', content: '本期数'});
          this.header.push({width: '20%', content: '本年累计数'});
        } else {
          // 周期类型
          if (this.statBase.statPrdStyle && this.statBase.statPrdStyle === '4') {
            this.header.push({width: '20%', content: '期初数'});
            this.header.push({width: '20%', content: '期末数'});
          } else {
            this.header.push({width: '20%', content: '年初数'});
            this.header.push({width: '20%', content: '本期数'});
          }
        }
        break;
      default:
        break;
      }
    },
    /**
         * 获取行状态，如果是计算公式，返回true表示需要readonly显示
         */
    getStatus: function (val) {
      if (val && val.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    inputChange: function (arg, item, index) {
      var val = this.formatMoney(this.formData[item]['data' + index]);
      this.formData[item]['data' + index] = val === '0.00' ? '' : val;
    },
    formatMoney: function (number) {
      return this.$formatNumber('0.00', 0)(number);
    },
    /**
         * 拼接报表头信息
         */
    getTitle: function () {
      var oth = '';
      switch (Number(this.confStyles.fncConfDisNam)) {
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
      return this.confStyles.fncConfDisName + oth;
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
    // 解析文本（包括空格，前缀）
    parseContent: function (item) {
      var blank = '';
      for (let i = 0; i < item.fncConfIndent; i++) {
        blank += '&nbsp;&nbsp;';
      }
      // 层次(1个层级2个空格) + 前缀 + 项目名称
      return blank + item.fncConfPrefix + item.itemName;
    }
  },
  mounted: function () {
    var _this = this;
    if (data.pageType === '2') {
      this.showBtn = true;
    }
    // 全局数据赋值到vue内部对象上
    _this.statBase = window.response.statBase;
    _this.confStyles = window.response.confStyles;
    _this.items = window.response.items;
    _this.repTitle = this.confStyles.fncConfDisNam;
    this.parseHeader();
    if (data.stateFlg && data.stateFlg.length >= 9) {
      let flag = data.stateFlg.substring(data.fncConfTyp.substring(1, 1) - 1, 1);
      if (flag === '0') {
        this.statFlagText += '未存储';
      } else if (flag === '1') {
        this.statFlagText += '暂存';
      } else if (flag === '2') {
        this.statFlagText += '已完成';
      }
    }
    for (let i = 0; i < _this.items.length; i++) {
      let element = _this.items[i];
      _this.$set(_this.formData, element.itemId, {});
      // 循环对列(金额)元素添加get/set
      for (let j = 0; j < Number(this.confStyles.fncConfDataCol); j++) {
        _this.$set(_this.formData[element.itemId], 'data' + (j + 1), element['data' + (j + 1)]);
      }
    }
    // 测试
    _this.confStyles.fncConfCotes = 2;
  }
};
</script>
<style>
  .report tr>td,
  .report th {
    border: 1px solid black;
    height: 20px;
  }

  .report .title td {
    border-width: 0px;
  }

  .report .item__header td {
    background-color: #336699;
    color: black;
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
    border: 1px solid red;
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
</style>