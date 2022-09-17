
<template>
  <!--
    @created by lijh11 on 2020-2-10 10:49:26
    @updated by
    @description 公式计算器
  -->
  <div class="financial formula">
    <yu-panel title="公式计算器">
      <el-row :gutter="24">
        <el-col :span="14">
          <el-row style="margin-bottom: 24px;">
            <el-col :span="24">
              <el-row :gutter="24">
                <el-col :span="18">
                  <check-formula ref="demoSelector" label="引用指标" placeholder="引用指标" v-model="yourVal" :raw-value="rawValue" :is-show="!checkOrCount"></check-formula>
                </el-col>
                <el-col :span="6">
                  <yu-button plain @click="insert">插入</yu-button>
                </el-col>
                <yu-xform v-if="!checkOrCount" ref="refForm" label-width="70px" v-model="tableFormdata">
                  <yu-row class="row-space">
                    <yu-col :span="12">
                      <yu-xform-item label="列数" ctype="input" placeholder="请输入列数" name="account" :rules="rule[0]">
                      </yu-xform-item>
                    </yu-col>
                    <yu-col :span="12">
                      <yu-xform-item label="列名" ctype="input" placeholder="请输入列名" name="account" :rules="rule[0]">
                      </yu-xform-item>
                    </yu-col>
                  </yu-row>
                </yu-xform>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <textarea name="gongshi" ref="formula" rows="14" id="gongshi" style="width:100%;padding: 8px;"></textarea>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <table width="100%" height="308" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td height="188">
                <table class="calc" width="100%" height="120" border="1" align="center" cellpadding="0" cellspacing="1">
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
                    <td width="40" height="30" @click="backspaceFn" align="center">←</td>
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
                  <yu-button plain @click="inputStr('MAX()')">MAX</yu-button>
                  <yu-button plain @click="inputStr('MIN()')">MIN</yu-button>
                  <yu-button plain @click="inputStr('INT()')">INT</yu-button>
                </div>
              </td>
            </tr>
            <tr v-if="checkOrCount">
              <td height="60">
                <div align="center">
                  <yu-button plain @click="inputStr('@OPER(==)')">=</yu-button>
                  <yu-button plain @click="inputStr('@OPER(>)')">&lt;</yu-button>
                  <yu-button plain @click="inputStr('@OPER(>=)')">&lt;=</yu-button>
                  <yu-button plain @click="inputStr('@OPER(<)')">&gt;</yu-button>
                  <yu-button plain @click="inputStr('@OPER(<=)')">&gt;=</yu-button>
                </div>
              </td>
            </tr>
            <tr v-if="!checkOrCount">
              <td height="60">
                <div align="center">
                  <yu-button plain @click="inputStr('@RANK()')">RANK</yu-button>
                  <yu-button plain @click="inputStr('@ZONE()')">ZONE</yu-button>
                </div>
              </td>
            </tr>
            <tr>
              <td height="60">
                <div align="center">
                  <yu-button plain @click="doCheck">公式校验</yu-button>
                  <yu-button plain @click="doClear">清除公式</yu-button>
                </div>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <el-row class="footer">
        <el-col :span="14">
          <yu-button type="primary" @click="calculatorFn">确认</yu-button>
          <yu-button type="primary" @click="goBack">返回</yu-button>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="14">
          <yu-button type="primary" @click="calculatorFn">计算(方式1)</yu-button>
          <yu-button type="primary" @click="check2">计算(方式2)</yu-button>
          <p class="calc-result">计算结果： <span v-show="result">{{ result }}</span></p>
        </el-col>
      </el-row> -->
      <!-- <div style="padding: 10px">
        <h3>说明：</h3>
        <div>
          <p>1、引用指标的格式：[id]+数据内容 如[1]企业当期未分配利润总额</p>
          <p>2、插入指标：选择需要参与计算的指标项插入到公式文本域中,外面使用{}包裹 如{[1]企业当期未分配利润总额}</p>
          <p>3、MAX、MIN、INT分别对指标项的值取最大值Math.max()、最小值Math.min()、四舍五入Math.round()
            <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其中，Math.max()和Math.min()中数值用 ',' 隔开
          </p>
          <p>4、公式校验：对用户输入计算公式进行格式校验，防止忘记输入运算符等语法错误</p>
          <p>5、清除公式：一个清空重新输入计算公式功能</p>
          <p>
            6、计算：解析计算公式中每个指标项对应的数据或进行最大值、最小值、四舍五入后的数据，按照用户输入的运算方式进行计算
            <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如：{[1]企业当期未分配利润总额}/{[2]总股本}点击计算输出3000（45000/15）.
            <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计算方式1采用string的replace()方法来匹配解析指标项，计算方式2采用RegExp正则表达式来匹配解析指标项。
          </p>
        </div>
      </div> -->
    </yu-panel>
  </div>
</template>
<script>
/* eslint no-eval:0 */
/* eslint prefer-rest-params:0 */
import checkFormula from "./components/checkFormula";
export default {
  components: { checkFormula },
  data: function() {
    return {
      name: "calculatorDefine",
      url: this.$backend.cmisCfg + "/example/calculator/list",
      // 获取指标数据url
      formdata: {},
      staticData: [
        {
          id: 1,
          content: "企业当期未分配利润总额",
          data: 45000
        },
        {
          id: 2,
          content: "总股本",
          data: 15
        },
        {
          id: 3,
          content: "资产总额",
          data: 150
        }
      ],
      handSData: {},
      // key：value存储 staticData
      options: [],
      // 所有指标选项
      partOptions: [],
      // 部分指标选项
      limitLength: 100,
      // 默认展示指标条数
      result: 0,
      debounceSearch: null, // 下拉框自定义过滤方法
      // new
      rule: [
        { required: true, message: "必填项" },
        { validator: yufp.validator.number, message: "数字" }
      ],
      checkOrCount: true
    };
  },
  created: function() {
    this.debounceSearch = this._debounce(this.filterMethod); // 得到一个防抖函数，提高性能
  },
  // 挂载后
  mounted: function() {
    var _this = this;
    _this.staticData.forEach(function(item) {
      _this.handSData[item.id] = item.data;
      _this.options.push({
        // 此示例下拉框展示数据由id和内容组成 例如 [2]总股本
        key: "[" + item.id + "]" + item.content,
        value: "[" + item.id + "]" + item.content
      });
    });
    _this.partOptions = _this.options.slice(0, _this.limitLength); // 默认截取100条，防止数据很多时页面卡顿
    // this.getData(); // 根据url获取所有下拉框所需指标数据

    this.$nextTick(function() {
      if (_this.$route.params.type == "1") {
        _this.checkOrCount = true;
      } else {
        _this.checkOrCount = false;
      }
    });
  },
  methods: {
    /**
     * 获取所有下拉框所需指标数据，根据前后端约定好的格式构造数据
     */
    getData: function() {
      var _this = this;

      if (_this.url) {
        this.$request({
          url: _this.url,
          method: "GET"
        }).then((code, message, response) => {
          //处理请求成功的情况
          var dataList = response.data;
          _this.options = [];
          dataList.forEach(function(item) {
            _this.options.push({
              // 此示例下拉框展示数据由id和内容组成 例如 [12]扣款专项
              key: "[" + item.id + "]" + item.title,
              value: "[" + item.id + "]" + item.title
            });
          });
          _this.partOptions = _this.options.slice(0, _this.limitLength); // 默认截取100条，防止数据很多时页面卡顿
        });
      }
    },

    /**
     * 防抖函数核心
     * @param fn 最终延迟后要执行的函数
     * @param delay 需要延迟的时间
     */
    _debounce: function(fn, delay) {
      delay = delay || 600; // 可以自定义传递延迟时间，如果不传则延迟600ms

      var _this = this,
        timer;
      return function() {
        var args = arguments;

        if (timer) {
          // 如果延时器存在则直接清除掉，进入下一个延迟函数
          clearTimeout(timer);
        }

        timer = setTimeout(function() {
          fn.apply(_this, args); // apply接受参数为数组

          timer = null;
        }, delay);
      };
    },

    /**
     * 下拉框自定义过滤方法
     * @param val 输入的值
     */
    filterMethod: function(val) {
      var _this = this;

      if (val) {
        var arr = [];
        _this.options.forEach(function(item) {
          if (item.key.indexOf(val) > -1) {
            arr.push(item); // 如果搜索到用户输入内容则放入数组存储
          }
        });
        _this.partOptions = arr;
      } else {
        _this.partOptions = _this.options.slice(0, _this.limitLength); // 用户清除搜索数据后显示默认截取的所有数据
      }
    },

    /**
     * 下拉框显示/隐藏时触发，显示时展示截取长度内所有结果
     * @param val true为显示，false为隐藏
     */
    visibleChangeFn: function(val) {
      // 如果没有此函数，用户点击选中搜索出来的数据后，再次点击下拉框时只展示上次选中的一条数据
      if (val) {
        this.partOptions = this.options.slice(0, this.limitLength);
      }
    },

    /**
     * 选中的下拉框中指标数据，插入到下面的文本域中
     */
    insert: function() {
      if (!this.formdata.item_id) {
        return this.$message({
          message: "请选择需要插入的指标",
          type: "warning"
        });
      }

      var string = "{" + this.formdata.item_id + "}"; // 展示的内容根据实际和后端约定格式，此处在下拉框展示值外层增加花括号

      this.inputStr(string);
    },

    /**
     * 把所需内容插入到光标所在位置
     * @param string 需要插入的数据内容
     * 在html5中，可输入性表单元素都存在selectionStart、selectionEnd属性。不支持IE6/7。基于vue开发（ie8及以上）不存在IE兼容问题
     * 若使用其他浏览器时出现兼容问题可尝试增加以下代码
     * if (document.selection) {
          textArea.focus();
          selection = document.selection.createRange();
          selection.text = string;
        }
     */
    inputStr: function(string) {
      var textArea = this.$refs.formula;
      var startPos = textArea.selectionStart; // 选区或光标起点位置

      var endPos = textArea.selectionEnd; // 选区或光标终点位置

      var restoreTop = textArea.scrollTop; // 保存滚动条

      var val = textArea.value;
      textArea.value =
        val.substring(0, startPos) + string + val.substring(endPos, val.length); // 重新赋值

      if (restoreTop > 0) {
        textArea.scrollTop = restoreTop; // 若有滚动条，保持原位置
      }

      textArea.focus(); // 获取焦点，如果没有下面两处赋值，则光标显示在文本末尾

      textArea.selectionStart = startPos + string.length; // 设置光标位置为插入的文本后面

      textArea.selectionEnd = startPos + string.length; // 设置光标位置为插入的文本后面
    },

    /**
     * 删除（退格键）
     */
    backspaceFn: function() {
      var textArea = this.$refs.formula;
      var startPos = textArea.selectionStart; // 选区或光标起点位置

      var endPos = textArea.selectionEnd; // 选区或光标终点位置

      if (startPos === 0) {
        // 光标位置前面没有字符串时直接return
        return;
      }

      var val = textArea.value;
      textArea.value =
        val.substring(0, startPos - 1) + val.substring(endPos, val.length); // 重新赋值

      textArea.focus(); // 获取焦点，如果没有下面两处赋值，则光标显示在文本末尾

      textArea.selectionStart = startPos - 1; // 设置光标位置为删除的文本处

      textArea.selectionEnd = startPos - 1; // 设置光标位置为删除的文本处
    },
    calculatorFn: function() {
      console.time("calculatorFn");
      var _this = this;
      var result = this.check();
      var param = "";

      if (result === "") {
        var formula = this.$refs.formula.value;

        if (
          formula.indexOf("MAX") > -1 ||
          formula.indexOf("MIN") > -1 ||
          formula.indexOf("INT") > -1
        ) {
          formula = this.replaceAll(formula, "MAX", "Math.max"); // 如果公式中使用MAX，则解析为Math.max，取最大值

          formula = this.replaceAll(formula, "MIN", "Math.min"); // 如果公式中使用MIN，则解析为Math.min，取最小值

          formula = this.replaceAll(formula, "INT", "Math.round"); // 如果公式中使用INT，则解析为Math.round，四舍五入
        }

        while ((param = this.getParam(formula, "{", "}")) !== "") {
          // 判断指标项是否为空
          var id = param.split("]")[0].split("[")[1];
          var origData = this.staticData;

          for (var i = 0, len = origData.length; i < len; i++) {
            if (origData[i].id === id) {
              // 此处replaceAll不能用regexpFn方法替换
              formula = _this.replaceAll(
                formula,
                "{" + param + "}",
                origData[i].data
              ); // 每次循环把一个指标项替换为对应的数据

              break;
            }
          }
        }
        _this.result = new Function("return " + formula)(); // eslint-disable-line
      } else {
        this.$message({
          message: result,
          type: "error"
        });
      }
    },

    /**
     * 去除字符串两端空格
     */
    trim: function(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },

    /**
     * 检查公式是否正确
     */
    check: function() {
      var formula = this.$refs.formula.value; // 获取文本域处公式的值

      var param = ""; // 循环检测把带花括号的指标替换为@@

      if (this.trim(formula) === "") {
        return "公式不能为空";
      }

      if (
        formula.indexOf("MAX()") >= 0 ||
        formula.indexOf("MIN()") >= 0 ||
        formula.indexOf("INT()") >= 0
      ) {
        return "Math相关函数缺少参数";
      }

      if (
        formula.indexOf("MAX") > -1 ||
        formula.indexOf("MIN") > -1 ||
        formula.indexOf("INT") > -1
      ) {
        formula = this.replaceAll(formula, "MAX", "Math.max"); // 如果公式中使用MAX，则解析为Math.max，取最大值

        formula = this.replaceAll(formula, "MIN", "Math.min"); // 如果公式中使用MIN，则解析为Math.min，取最小值

        formula = this.replaceAll(formula, "INT", "Math.round"); // 如果公式中使用INT，则解析为Math.round，四舍五入
      }

      while ((param = this.getParam(formula, "{", "}")) !== "") {
        // 判断指标项是否为空
        formula = this.replaceAll(formula, "{" + param + "}", "@@"); // 每次循环把一个指标项替换为@@
      }

      if (formula.indexOf("@@@@") > -1) {
        // 如果替换后的结果包含@@@@表明至少存在一处两个指标间没有任何运算符
        return "指标间缺少运算符！";
      }

      formula = this.replaceAll(formula, "@@", "0"); // 防止eval('@@')报错 Invalid or unexpected token

      try {
        new Function("return " + formula)(); // eslint-disable-line
        return "";
      } catch (exception) {
        return "公式错误：请输入合法的计算表达式！";
      }
    },

    /**
     * replace方法替换字符串中某些字符，也可使用下面regexpFn方法
     * @param str 原始字符串
     * @param str1 需要替换的字符串
     * @param str2 替换的内容
     */
    replaceAll: function(str, str1, str2) {
      var handleStr = this.handleEscape(str1);
      var reg = new RegExp(handleStr, "g");
      return str.replace(reg, str2);
    },

    /**
     * 转义正则字符
     * @param val 需要替换字符串
     */
    handleEscape: function(val) {
      return val
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");
    },

    /**
     * 正则方法替换字符串中某些字符
     */
    regexpFn: function(val) {
      var _this = this;

      var value = val.replace(/\{\[(.*?)\].*?\}/g, function(str, id) {
        return _this.handSData[id];
      });
      return value;
    },

    /**
     * 计算方式2
     */
    check2: function() {
      var formula = this.$refs.formula.value; // 获取文本域处公式的值

      if (this.trim(formula) === "") {
        return this.$message({
          message: "公式不能为空",
          type: "error"
        });
      }

      if (
        formula.indexOf("MAX()") >= 0 ||
        formula.indexOf("MIN()") >= 0 ||
        formula.indexOf("INT()") >= 0
      ) {
        return this.$message({
          message: "Math相关函数缺少参数",
          type: "error"
        });
      }

      if (
        formula.indexOf("MAX") > -1 ||
        formula.indexOf("MIN") > -1 ||
        formula.indexOf("INT") > -1
      ) {
        formula = this.replaceAll(formula, "MAX", "Math.max"); // 如果公式中使用MAX，则解析为Math.max，取最大值

        formula = this.replaceAll(formula, "MIN", "Math.min"); // 如果公式中使用MIN，则解析为Math.min，取最小值

        formula = this.replaceAll(formula, "INT", "Math.round"); // 如果公式中使用INT，则解析为Math.round，四舍五入
      }

      formula = this.regexpFn(formula);

      if (formula.indexOf("@@@@") > -1) {
        // 如果替换后的结果包含@@@@表明至少存在一处两个指标间没有任何运算符
        return this.$message({
          message: "指标间缺少运算符！",
          type: "error"
        });
      }

      formula = this.replaceAll(formula, "@@", "0"); // 防止eval('@@')报错 Invalid or unexpected token

      try {
        this.result = new Function("return " + formula)(); // eslint-disable-line
        return "";
      } catch (exception) {
        return this.$message({
          message: "公式错误：请输入合法的计算表达式！",
          type: "error"
        });
      }
    },

    /**
     * 获取花括号{}内部指标数据内容
     * @param str 计算公式值
     * @param leftFlag 左侧标识符
     * @param rightFlag 右侧标识符
     */
    getParam: function(str, leftFlag, rightFlag) {
      var param = "";

      while (str.indexOf(rightFlag) < str.indexOf(leftFlag)) {
        // 右标识符的索引小于左标识符索引
        if (str.indexOf(rightFlag) < 0) {
          // 是否右标识符不存在
          break;
        }

        str = str.substring(str.indexOf(rightFlag) + 1); // 截取右标识符（含）及之后的内容
      }

      if (str.indexOf(leftFlag) >= 0 && str.indexOf(rightFlag) >= 0) {
        // 左右标识符均存在
        var pos1 = str.indexOf(leftFlag); // 左标识符索引

        var pos2 = str.indexOf(rightFlag); // 右标识符索引

        param = str.substring(pos1 + 1, pos2); // 取出完整的指标数据
      }

      return param;
    },

    /**
     * 检查公式是否正确
     */
    doCheck: function() {
      var result = this.check();

      if (result === "") {
        this.$message("公式正确");
      } else {
        this.$message({
          message: result,
          type: "error"
        });
      }
    },

    /**
     * 清除公式
     */
    doClear: function() {
      this.$refs.formula.value = "";
      this.result = 0;
    },
    // 返回
    goBack: function() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
.financial.formula .el-button + .el-button {
  margin-left: 0;
}

.financial.formula .calc tr td {
  color: #444444;
  cursor: pointer;
}
.financial.formula .calc tr td:hover {
  color: #20a0ff;
  font-weight: bold;
}
.calc-result {
  font-size: 16px;
  padding: 10px 0 20px;
  color: red;
}
.row-space {
  top: 20px;
}
.footer {
  margin-top: 20px;
}
</style>
