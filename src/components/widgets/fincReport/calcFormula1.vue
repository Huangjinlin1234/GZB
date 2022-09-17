<template>
<div>
    <yu-xform ref="refForm" v-model="formulaData" :disabled="disabled">
      <yu-xform-item ctype="textarea" name="formula" @focus="showFormula"></yu-xform-item>
    </yu-xform>
    <yu-xdialog title="计算表达式" :visible.sync="formulaDialog" width="880px" style="margin-left:-120px;" v-if="formulaDialog">
      <form name="form" class="financial formula" method="post" action="">
        <table width="550" border="0" cellpadding="0" cellspacing="1" bgcolor="#9E9F9F">
          <tr>
            <td width="475" valign="top" bgcolor="#FFFFFF"><br>
              <table width="99%" border="0" align="center" cellpadding="5" cellspacing="0">
                <tr valign="top">
                  <yu-xform ref="refForm" v-model="formdata" label-width="80px" label-suffix="" label-position="right">
                    <yu-xform-item label="引用指标" placeholder="请选择" ctype="select" filterable :filter-method="debounceSearch" :options="partOptions" name="item_id">
                    </yu-xform-item>
                  </yu-xform>
                </tr>
                <tr>
                  <div align="center">
                    <yu-button :plain="true" type="info" @click="insert">插入指标</yu-button>
                  </div>
                </tr>
                <tr>
                  <textarea name="gongshi" cols="90" rows="13" id="gongshi" style="margin-top:10px;border:none;border-top:1px solid #aaa;"></textarea>
                </tr>
              </table>
            </td>
            <td width="167" valign="top" bgcolor="#FFFFFF">
              <table width="165" height="308" border="0" align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="201" height="188">
                    <table class="calc" width="160" height="120" border="1" align="center" cellpadding="0" cellspacing="1">
                      <tr align="center" bgcolor="#e9e9e9">
                        <td width="40" height="30" @click="inputStr('/')" align="center">/</td>
                        <td width="40" height="30" @click="inputStr('*')" align="center">*</td>
                        <td width="40" height="30" @click="inputStr('-')" align="center">-</td>
                        <td width="40" height="30" @click="inputStr('+')" align="center">+</td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td width="40" height="30" @click="inputStr('7')" align="center">7</td>
                        <td width="40" height="30" @click="inputStr('8')" align="center">8</td>
                        <td width="40" height="30" @click="inputStr('9')" align="center">9</td>
                        <td width="40" height="30" @click="inputStr(',')" align="center">,</td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td width="40" height="30" @click="inputStr('4')" align="center">4</td>
                        <td width="40" height="30" @click="inputStr('5')" align="center">5</td>
                        <td width="40" height="30" @click="inputStr('6')" align="center">6</td>
                        <td width="40" height="30" @click="inputStr('%')" align="center">%</td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td width="40" height="30" @click="inputStr('1')" align="center">1</td>
                        <td width="40" height="30" @click="inputStr('2')" align="center">2</td>
                        <td width="40" height="30" @click="inputStr('3')" align="center">3</td>
                        <td width="40" height="30" align="center">←</td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td width="40" height="30" @click="inputStr('0')" align="center">0</td>
                        <td width="40" height="30" @click="inputStr('.')" align="center">.</td>
                        <td width="40" height="30" @click="inputStr('(')" align="center">(</td>
                        <td width="40" height="30" @click="inputStr(')')" align="center">)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div align="center">
                      <yu-button :plain="true" type="info" @click="inputStr('MAX()')">MAX</yu-button>
                      <yu-button :plain="true" type="info" @click="inputStr('MIN()')">MIN</yu-button>
                      <yu-button :plain="true" type="info" @click="inputStr('INT()')">INT</yu-button>
                    </div>
                  </td>
                </tr>
                <tr style="display:none;">
                  <td>
                    <div align="center">
                      <yu-button :plain="true" type="info" @click="inputStr('@RANK()')">RANK</yu-button>
                      <yu-button :plain="true" type="info" @click="inputStr('@ZONE()')">ZONE</yu-button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td height="60">
                    <div align="center">
                      <yu-button :plain="true" type="info" @click="doCheck">公式校验</yu-button>
                      <yu-button :plain="true" type="info" @click="doClear">清除公式</yu-button>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div class="yu-grpButton" style="margin-top:5px;">
          <yu-button icon="yx-checkmark" type="primary" @click="sureFn">确定</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn" style="margin-left:5px;">取消</yu-button>
        </div>
      </form>
    </yu-xdialog>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
export default {
  name: 'YufpCalcformula1',
  props: {
    value: String,
    fncConfTyp: String,
    getShowFormulaVal: Function,
    disabled: Boolean
  },
  data: function () {
    return {
      url: backend.cmisCus + '/api/nrcs-cms/fncconfitems/q/fncconfitems/all/list',
      formulaData: {},
      formdata: {},
      options: [], // 所有科目选项
      partOptions: [], // 部分科目选项
      limitLength: 100, // 默认展示科目条数
      formulaDialog: false,
      debounceSearch: null // 下拉框自定义过滤方法
    };
  },
  created: function () {
    this.debounceSearch = this._debounce(this.filterMethod);
  },
  // 挂载后
  mounted: function () {
    var _this = this;
    if (_this.url) {
      yufp.service.request({
        url: _this.url,
        method: 'GET',
        data: {
          condition: JSON.stringify({
            fncConfTyp: _this.fncConfTyp
          })
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            let dataList = response.data;
            _this.options = [];
            dataList.forEach(function (item) {
              _this.options.push({
                key: '[' + item.itemId + ']' + item.itemName,
                value: '[' + item.itemId + ']' + item.itemName
              });
            });
            _this.partOptions = _this.options.slice(0, _this.limitLength);
          }
        }
      });
    }
  },
  methods: {
    // 函数防抖
    _debounce: function (fn, delay) {
      delay = delay || 600;
      var _this = this, timer;
      return function () {
        var args = [fn, delay];
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          fn.apply(_this, args);
          timer = null;
        }, delay);
      };
    },
    /**
       * 下拉框自定义过滤方法
       * @param val 输入的值
       */
    filterMethod: function (val) {
      var _this = this;
      if (val) {
        let arr = [];
        _this.options.forEach(function (item) {
          if (item.key.indexOf(val) > -1) {
            arr.push(item);
          }
        });
        _this.partOptions = arr;
      } else {
        _this.partOptions = _this.options.slice(0, _this.limitLength);
      }
    },
    /**
       * 文本框获取焦点事件
       */
    showFormula: function () {
      if (!this.getShowFormulaVal()) {
        return this.$message({message: '请选择合适的项目编辑方式!', type: 'warning'});
      }
      this.formulaDialog = true;
    },
    insert: function () {
      var string = '{' + this.formdata.item_id + '}';
      this.inputStr(string);
    },
    inputStr: function (string) {
      var textArea = document.getElementById('gongshi');
      var selection; // 声明range对象
      if (window.getSelection) { // 主流浏览器mozilla, chrome, safari
        selection = window.getSelection();
        let startPos = textArea.selectionStart;
        let endPos = textArea.selectionEnd;
        let restoreTop = textArea.scrollTop; // 保存滚动条
        textArea.value = textArea.value.substring(0, startPos) + string + textArea.value.substring(endPos, textArea.value.length);
        if (restoreTop > 0) {
          textArea.scrollTop = restoreTop;
        }
        textArea.focus();
        textArea.selectionStart = startPos + string.length;
        textArea.selectionEnd = startPos + string.length;
      } else if (document.selection) { // ie
        textArea.focus();
        selection = document.selection.createRange();
        selection.text = string;
      }
    },
    trim: function (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    check: function () {
      var formula = document.getElementById('gongshi').value;
      if (this.trim(formula) == '') {
        return '公式不能为空';
      }
      formula = this.replaceAll(formula, 'MAX', 'Math.max');
      formula = this.replaceAll(formula, 'MIN', 'Math.min');
      formula = this.replaceAll(formula, 'INT', 'Math.round');
      formula = this.replaceAll(formula, '@SUMSUB', '');
      formula = this.replaceAll(formula, '@PARENT', '');
      formula = this.replaceAll(formula, '@RANK', '');
      formula = this.replaceAll(formula, '@ZONE', '');
      formula = this.replaceAll(formula, '@SIBLINGS()', '1');
      while (!this.getParam(formula, '{', '}') == '') {
        let param = this.getParam(formula, '{', '}');
        formula = this.replaceAll(formula, '{' + param + '}', '@@');
      }
      if (formula.indexOf('@@@@') > -1) {
        return '指标间缺少运算符！';
      }
      formula = this.replaceAll(formula, '@@', '0');
      try {
        this.evil(formula);
        return '';
      } catch (exception) {
        return '公式错误：' + exception.description;
      }
    },
    replaceAll: function (str, str1, str2) {
      while (str.indexOf(str1) >= 0) {
        str = str.replace(str1, str2);
      }
      return str;
    },
    getParam: function (str, leftFlag, rightFlag) {
      var param = '';
      while (str.indexOf(rightFlag) < str.indexOf(leftFlag)) {
        if (str.indexOf(rightFlag) < 0) {
          break;
        }
        str = str.substring(str.indexOf(rightFlag) + 1);
      }
      if (str.indexOf(leftFlag) >= 0 && str.indexOf(rightFlag) >= 0) {
        let pos1 = str.indexOf(leftFlag);
        let pos2 = str.indexOf(rightFlag);
        param = str.substring(pos1 + 1, pos2);
      }
      return param;
    },
    doCheck: function () {
      var result = this.check();
      if (result == '') {
        this.$message('公式正确');
      } else {
        this.$message({message: result, type: 'error'});
      }
    },
    doClear: function () {
      document.getElementById('gongshi').value = '';
    },
    doOk: function () {
      var result = this.check();
      if (result == '') {
        window.returnValue = document.getElementById('gongshi').value;
        window.close();
      } else {
        this.$message(result);
      }
    },
    sureFn: function () {
      this.$emit('input', document.getElementById('gongshi').value);
      this.formulaDialog = false;
    },
    cancelFn: function () {
      this.formulaDialog = false;
    },
    evil: function (fn) {
      let Fn = Function;
      return new Fn('return ' + fn);
    }
  },
  watch: {
    value: function (val) {
      this.formulaData.formula = val;
    },
    formulaDialog: function (val) {
      if (!val) {
        this.doClear();
      } else {
        this.$nextTick(function () {
          document.getElementById('gongshi').value = this.formulaData.formula;
        });
      }
    },
    showCalcformla: {
      handler: function (val) {
      },
      deep: true
    }
  }

};
</script>
<style>
@import url('../../../assets/common/formula.css');
</style>