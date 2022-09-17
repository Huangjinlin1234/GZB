<template>
  <div class="container">
    <!-- 编辑 -->
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata">
      <yu-panel :title="title" class="yu-panel-height">
        <yu-row>
          <yu-col :span="12">
            <yu-xform-item
              label="项目编号"
              ctype="select"
              placeholder="请选择"
              filterable
              :disabled="disabled"
              :options="optionStyle"
              name="itemId"
              :rules="rule[0]"
            ></yu-xform-item>
            <yu-xform-item label="栏位" ctype="custom" :rules="rule[0]">
              <yu-input-number
                v-model="fncConfCotes"
                :min="1"
                :max="max"
              ></yu-input-number>
            </yu-xform-item>
            <yu-xform-item label="层次" ctype="custom" :rules="rule[0]">
              <yu-input-number v-model="fncConfIndent"></yu-input-number>
            </yu-xform-item>
            <yu-xform-item label="追加行数" ctype="custom" :rules="rule[0]">
              <yu-input-number v-model="fncCnfAppRow"></yu-input-number>
            </yu-xform-item>
          </yu-col>
          <yu-col :span="12">
            <yu-xform-item label="顺序编号" ctype="custom" :rules="rule[0]">
              <yu-input-number v-model="fncConfOrder"></yu-input-number>
            </yu-xform-item>
            <yu-xform-item label="行次标识" ctype="custom" :rules="rule[0]">
              <yu-xradio
                size="mini"
                v-model="fncConfRowFlag"
                :options="options1"
                name="fncConfRowFlag"
                :option-button="false"
              >
              </yu-xradio>
            </yu-xform-item>
            <yu-xform-item
              label="前缀"
              ctype="input"
              placeholder="请输入前缀"
              name="fncConfPrefix"
            >
            </yu-xform-item>
            <yu-xform-item
              label="显示数值"
              ctype="input"
              placeholder="请输入显示数值"
              name="fncConfDispAmt"
            >
            </yu-xform-item>
          </yu-col>
          <yu-col :span="24">
            <yu-xform-item label="项目编辑方式" ctype="custom" :rules="rule[0]">
              <yu-xradio
                size="mini"
                v-model="fncItemEditWay"
                :options="options2"
                name="fncItemEditWay"
                :option-button="false"
              >
              </yu-xradio>
            </yu-xform-item>
            <yu-xform-item
              label="超链接"
              ctype="textarea"
              name="fncConfUrl"
              placeholder="请输入超链接"
            >
            </yu-xform-item>
            <yu-xform-item
              label="检查公式"
              @focus="preInput('1')"
              ctype="textarea"
              name="fncConfChkFrm"
              placeholder="请输入检查公式"
            >
            </yu-xform-item>
            <yu-xform-item
              label="计算公式"
              @focus="preInput('2')"
              ctype="textarea"
              name="fncConfCalFrm"
              placeholder="请输入计算公式"
            >
            </yu-xform-item>
          </yu-col>
        </yu-row>
      </yu-panel>
    </yu-xform>
    <div slot="footer" class="yu-grpButton yu-button">
      <yu-button type="primary" v-if="firstBtn" @click="addFn">新增</yu-button>
      <yu-button type="primary" v-if="addSave" @click="addSaveFn"
        >新增-保存</yu-button
      >
      <yu-button type="primary" v-if="firstBtn" @click="editFn">修改</yu-button>
      <yu-button type="primary" v-if="editSave" @click="editSaveFn"
        >修改-保存</yu-button
      >
      <yu-button type="primary" v-if="firstBtn" @click="cancelFn"
        >删除</yu-button
      >
      <yu-button type="primary" v-if="cancelBack" @click="goBakck"
        >返回</yu-button
      >
      <yu-button type="primary" @click="closeTab">关闭</yu-button>
    </div>
    <div style="display: flex">
      <div
        v-for="(item1, index1) in max"
        :key="index1"
        style="padding: 10px; width: 98%"
        :style="{
          display: fncDataCol != 8 ? 'block' : 'none',
        }"
      >
        <table
          v-if="fncDataCol == 1"
          style="width: 98%"
          class="footer-table"
          border="0"
          align="center"
          cellpadding="0"
          cellspacing="0"
        >
          <tr v-html="tableData" class="table-header"></tr>
          <div
            v-for="(item, index) in tableBody"
            :key="index"
            style="display: table-row; vertical-align: inherit"
          >
            <tr
              class="table-body table-body1"
              @click="clickShow(item)"
              v-if="index1 + 1 == item.fncConfCotes"
            >
              <td
                :style="{
                  color: item.fncItemEditWay == '2' ? '#ff4949' : '',
                  paddingLeft: (item.fncConfIndent + 3) * 6 + 'px',
                }"
              >
                {{ item.fncConfPrefix }}{{ item.itemName }}
              </td>
              <td align="center">{{ item.itemIndex }}</td>
              <td align="center">
                <yu-input
                  v-model="item.itemInput1"
                  size="small"
                  class="table-input"
                ></yu-input>
              </td>
            </tr>
          </div>
        </table>
        <table
          v-if="fncDataCol == 2"
          style="width: 98%"
          class="footer-table"
          border="0"
          align="center"
          cellpadding="0"
          cellspacing="0"
        >
          <tr v-html="tableData" class="table-header"></tr>
          <div
            v-for="(item, index) in tableBody"
            :key="index"
            style="display: table-row; vertical-align: inherit"
          >
            <tr
              class="table-body table-body2"
              v-if="index1 + 1 == item.fncConfCotes"
              @click="clickShow(item)"
            >
              <td
                :style="{
                  color: item.fncItemEditWay == '2' ? '#ff4949' : '',
                  paddingLeft: (item.fncConfIndent + 1) * 15 + 'px',
                }"
              >
                {{ item.fncConfPrefix }}{{ item.itemName }}
              </td>
              <td align="center">{{ item.itemIndex }}</td>
              <td align="center">
                <yu-input
                  v-model="item.itemInput1"
                  size="small"
                  class="table-input"
                ></yu-input>
              </td>
              <td align="center">
                <yu-input
                  v-model="item.itemInput2"
                  size="small"
                  class="table-input"
                ></yu-input>
              </td>
            </tr>
          </div>
        </table>
      </div>
      <table
        width="98%"
        v-if="fncDataCol == 8"
        class="footer-table"
        border="0"
        align="center"
        cellpadding="0"
        cellspacing="0"
      >
        <tr class="table-header">
          <th rowspan="2" width="150">项目</th>
          <th rowspan="2" width="50">行次</th>
          <th colspan="7">本年金额</th>
        </tr>
        <tr>
          <th>实收资本（股本）</th>
          <th>资本公积</th>
          <th>减：库存股</th>
          <th>盈余公积</th>
          <th>未分配利润</th>
          <th>其他</th>
          <th>所有者权益合计</th>
        </tr>
        <tr
          class="table-body"
          v-for="(item, index) in tableBody"
          :key="index"
          @click="clickShow(item)"
        >
          <td
            :style="{
              color: item.fncItemEditWay == '2' ? '#ff4949' : '',
              paddingLeft: (item.fncConfIndent + 3) * 6 + 'px',
            }"
          >
            {{ item.fncConfPrefix }}{{ item.itemName }}
          </td>
          <td>{{ item.itemIndex }}</td>
          <td>
            <yu-input
              v-model="item.itemInput1"
              size="small"
              class="table-input"
            ></yu-input>
          </td>
          <td>
            <yu-input
              v-model="item.itemInput2"
              size="small"
              class="table-input"
            ></yu-input>
          </td>
          <td>
            <yu-input
              v-model="item.fncConfUrl"
              size="small"
              class="table-input"
            ></yu-input>
          </td>
          <td>
            <yu-input
              v-model="item.itemInput3"
              size="small"
              class="table-input"
            ></yu-input>
          </td>
          <td>
            <yu-input
              v-model="item.itemInput4"
              size="small"
              class="table-input"
            ></yu-input>
          </td>
          <td>
            <yu-input
              v-model="item.itemInput5"
              size="small"
              class="table-input"
            ></yu-input>
          </td>
          <td>
            <yu-input
              v-model="item.itemInput6"
              size="small"
              class="table-input"
            ></yu-input>
          </td>
        </tr>
      </table>
    </div>
    <yu-xdialog
      :title="dialogTitle"
      class="no-body-padding xdialog-adjust"
      :visible.sync="dialogCalculateVisible"
      :middle="true"
      width="800px"
    >
      <div class="financial formula">
        <yu-panel title="公式计算器">
          <yu-row :gutter="24">
            <yu-col :span="14">
              <yu-row style="margin-bottom: 24px">
                <yu-col :span="24">
                  <yu-row :gutter="24">
                    <yu-col :span="18">
                      <check-formula
                        label="引用指标"
                        ref="formSelect"
                        placeholder="引用指标"
                        v-model="formdata.item_id"
                        :raw-value="rawValue"
                        :is-show="!checkOrCount"
                      ></check-formula>
                    </yu-col>
                    <yu-col :span="6">
                      <yu-button @click="insert">插入</yu-button>
                    </yu-col>
                    <yu-xform
                      v-if="lineShow"
                      ref="refForm"
                      label-width="70px"
                      v-model="tableFormList"
                    >
                      <yu-row class="row-space">
                        <yu-col :span="12">
                          <yu-xform-item
                            label="列数"
                            ctype="input"
                            placeholder="请输入列数"
                            name="lineNo"
                            :rules="rule[0]"
                          >
                          </yu-xform-item>
                        </yu-col>
                        <yu-col :span="12">
                          <yu-xform-item
                            label="列名"
                            ctype="input"
                            placeholder="请输入列名"
                            name="lineName"
                            :rules="rule[0]"
                          >
                          </yu-xform-item>
                        </yu-col>
                      </yu-row>
                    </yu-xform>
                  </yu-row>
                </yu-col>
              </yu-row>
              <yu-row>
                <yu-col :span="24">
                  <textarea
                    name="gongshi"
                    ref="formula"
                    rows="14"
                    id="gongshi"
                    style="width: 100%; padding: 8px"
                    v-model="textareaData"
                  ></textarea>
                </yu-col>
              </yu-row>
            </yu-col>
            <yu-col :span="10">
              <table
                width="100%"
                height="308"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td height="188">
                    <table
                      class="calc"
                      width="100%"
                      height="120"
                      border="1"
                      align="center"
                      cellpadding="0"
                      cellspacing="1"
                    >
                      <tr align="center" bgcolor="#e9e9e9">
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('/')"
                          align="center"
                        >
                          /
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('*')"
                          align="center"
                        >
                          *
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('-')"
                          align="center"
                        >
                          -
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('+')"
                          align="center"
                        >
                          +
                        </td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('7')"
                          align="center"
                        >
                          7
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('8')"
                          align="center"
                        >
                          8
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('9')"
                          align="center"
                        >
                          9
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr(',')"
                          align="center"
                        >
                          ,
                        </td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('4')"
                          align="center"
                        >
                          4
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('5')"
                          align="center"
                        >
                          5
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('6')"
                          align="center"
                        >
                          6
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('%')"
                          align="center"
                        >
                          %
                        </td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('1')"
                          align="center"
                        >
                          1
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('2')"
                          align="center"
                        >
                          2
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('3')"
                          align="center"
                        >
                          3
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="backspaceFn"
                          align="center"
                        >
                          ←
                        </td>
                      </tr>
                      <tr align="center" bgcolor="#e9e9e9">
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('0')"
                          align="center"
                        >
                          0
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('.')"
                          align="center"
                        >
                          .
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr('(')"
                          align="center"
                        >
                          (
                        </td>
                        <td
                          width="40"
                          height="30"
                          @click="inputStr(')')"
                          align="center"
                        >
                          )
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div align="center">
                      <yu-button @click="inputStr('MAX()')">MAX</yu-button>
                      <yu-button @click="inputStr('MIN()')">MIN</yu-button>
                      <yu-button @click="inputStr('INT()')">INT</yu-button>
                    </div>
                  </td>
                </tr>
                <tr v-if="checkOrCount">
                  <td height="60">
                    <div align="center">
                      <yu-button @click="inputStr('@OPER(==)')">=</yu-button>
                      <yu-button @click="inputStr('@OPER(>)')">&lt;</yu-button>
                      <yu-button @click="inputStr('@OPER(>=)')"
                        >&lt;=</yu-button
                      >
                      <yu-button @click="inputStr('@OPER(<)')">&gt;</yu-button>
                      <yu-button @click="inputStr('@OPER(<=)')"
                        >&gt;=</yu-button
                      >
                    </div>
                  </td>
                </tr>
                <tr v-if="!checkOrCount">
                  <td height="60">
                    <div align="center">
                      <yu-button @click="inputStr('@RANK()')">RANK</yu-button>
                      <yu-button @click="inputStr('@ZONE()')">ZONE</yu-button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td height="60">
                    <div align="center">
                      <yu-button @click="doCheck">公式校验</yu-button>
                      <yu-button @click="doClear">清除公式</yu-button>
                    </div>
                  </td>
                </tr>
              </table>
            </yu-col>
          </yu-row>
          <yu-row class="footer">
            <yu-col :span="14">
              <yu-button type="primary" @click="calculatorFn">确认</yu-button>
              <yu-button type="primary" @click="goBack">返回</yu-button>
            </yu-col>
          </yu-row>
        </yu-panel>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg("FNCCONFTYPE");
import xymixin from "@/utils/mixin";
import checkFormula from "./components/checkFormula";
export default {
  name: "detailDefine",
  components: { checkFormula },
  mixins: [xymixin],
  data: function () {
    return {
      aa: "",
      rule: [
        { required: true, message: "必填项" },
        { validator: yufp.validator.number, message: "数字" },
      ],
      // new
      options1: [
        {
          key: "0",
          value: "不显示",
        },
        {
          key: "1",
          value: "显示",
        },
        {
          key: "2",
          value: "空项",
        },
      ],
      options2: [
        {
          key: "0",
          value: "常量项",
        },
        {
          key: "1",
          value: "手工输入项",
        },
        {
          key: "2",
          value: "自动计算",
        },
        {
          key: "3",
          value: "标题项",
        },
      ],
      fncConfRowFlag: "1",
      fncItemEditWay: "2",
      fncConfOrder: 0, // 顺序编号
      fncConfCotes: 1, // 栏位
      fncConfIndent: 1, // 层次
      fncCnfAppRow: 1, // 追加行数
      tableFormdata: {
        fncConfRowFlag: null,
        fncItemEditWay: null,
        fncConfOrder: null, // 顺序编号
        fncConfCotes: null, // 栏位
        fncConfIndent: null, // 层次
        fncCnfAppRow: null, // 追加行数
      }, // 表单
      tableData: "",
      optionStyle: [], // 项目编号
      tableBody: [],
      cancelBack: false, // 返回
      addSave: false, // 新增-保存
      editSave: false, // 修改-保存
      firstBtn: true, // 新进来时显示的按钮
      disabled: false,
      fncDataCol: 1,
      // 计算器
      formdata: {}, // 表单数据
      tableFormList: {},
      dialogTitle: "配置检查公式",
      handSData: {},
      // key：value存储 staticData
      options: [],
      // 所有指标选项
      partOptions: [],
      // 部分指标选项
      limitLength: 100,
      // 默认展示指标条数
      result: 0,
      checkOrCount: true,
      lineShow: true,
      dialogCalculateVisible: false, //计算器
      textareaData: "",
      title: "",
      max: 1,
    };
  },
  created: function () {
    const _this = this;
    console.log(_this.$route.query);
    _this.fncDataCol = _this.$route.query.fncConfDataCol; // 数据列数
    _this.getTableHead(
      _this.$route.query.fncConfDataCol,
      _this.$route.query.fncConfTyp
    );
    _this.getTableBody(_this.$route.query.styleId);
    _this.getItemIdSelect(_this.$route.query.fncConfTyp);
    _this.title = _this.$route.query.title;
    _this.max = parseInt(_this.$route.query.fncConfCotes);
  },
  methods: {
    closeTab: function () {
      var _this = this;
      this.$store
        .dispatch("tagsView/delView", this.$router.currentRoute)
        .then(({ visitedViews }) => {
          _this.$router.go(-1);
        });
    },
    preInput: function (data) {
      const _this = this;
      switch (data) {
        case "1":
          _this.dialogTitle = "配置检查公式";
          _this.dialogCalculateVisible = true;
          _this.checkOrCount = true;
          _this.lineShow = false;
          _this.$refs.formula.value = _this.tableFormdata.fncConfChkFrm;
          break;
        case "2":
          if (_this.disabled == true && _this.tableFormdata.fncConfCalFrm) {
            _this.dialogTitle = "配置计算公式";
            _this.checkOrCount = false;
            if (
              _this.$route.params.fncConfTyp == "01" ||
              _this.$route.query.fncConfTyp == "02"
            ) {
              _this.lineShow = false;
            } else {
              _this.lineShow = true;
            }
            _this.dialogCalculateVisible = true;
            _this.$nextTick(function () {
              _this.$refs.formula.value = _this.tableFormdata.fncConfCalFrm;
            });
          }
          break;
        default:
          break;
      }
    },
    getTableHead: function (data1, data2) {
      const _this = this;
      _this
        .$request({
          method: "POST",
          url:
            this.$backend.cmisCfg +
            "/api/cbps/fncConfDefFmt/s/getHeadHtml/?fncConfDataCol=" +
            data1 +
            "&fncConfTyp=" +
            data2,
        })
        .then((res) => {
          //处理请求成功的情况
          _this.tableData = res;
        });
    },
    getTableBody: function (data) {
      const _this = this;
      _this
        .$request({
          method: "GET",
          url: this.$backend.cmisCfg + "/api/cbps/fncConfDefFmt/q/list",
          data: {
            condition: JSON.stringify({ styleId: data }),
            page: 1,
            size: 200,
          },
        })
        .then((response) => {
          //处理请求成功的情况
          if (response.code == 0) {
            var tableData = response.data;
            var stagData = [];
            tableData.forEach((item) => {
              item["itemInput1"] = null;
              item["itemInput2"] = null;
              item["itemInput3"] = null;
              item["itemInput4"] = null;
              item["itemInput5"] = null;
              item["itemInput6"] = null;
              if (item.fncConfRowFlag == "1") {
                stagData.push({ itemName: item.itemName, itemIndex: null });
              }
            });
            stagData.forEach((item, index) => {
              item.itemIndex = index + 1;
            });
            stagData.forEach((item) => {
              tableData.forEach((items) => {
                if (item.itemName == items.itemName) {
                  items["itemIndex"] = item.itemIndex;
                }
              });
            });
            _this.tableBody = tableData;
          } else {
            _this.$message({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    getItemIdSelect: function (data) {
      const _this = this;
      _this
        .$request({
          method: "GET",
          url: this.$backend.cmisCfg + "/api/cbps/fncConfDefFmt/q/query",
          data: {
            condition: JSON.stringify({ fncConfTyp: data }),
            page: 1,
            size: 200,
          },
        })
        .then((response) => {
          //处理请求成功的情况
          response.data &&
            response.data.forEach((item) => {
              _this.optionStyle.push({
                key: item.itemId,
                value: item.itemName,
              });
            });
        });
    },
    getLastFata: function () {
      const _this = this;
      _this.tableFormdata.styleId = _this.$route.query.styleId;
      _this.tableFormdata.fncConfRowFlag = _this.fncConfRowFlag;
      _this.tableFormdata.fncItemEditWay = _this.fncItemEditWay;
      _this.tableFormdata.fncConfOrder = _this.fncConfOrder;
      _this.tableFormdata.fncConfCotes = _this.fncConfCotes;
      _this.tableFormdata.fncConfIndent = _this.fncConfIndent;
      _this.tableFormdata.fncCnfAppRow = _this.fncCnfAppRow;
    },
    getUnifyData: function () {
      const _this = this;
      _this.firstBtn = true;
      _this.cancelBack = false; // 返回
      _this.addSave = false; // 新增-保存
      _this.editSave = false; // 修改-保存
      _this.getTableBody(_this.$route.query.styleId);
      // _this.$refs.refForm.resetFields();
      _this.tableFormdata.itemId = null;
      _this.tableFormdata.fncConfPrefix = null;
      _this.tableFormdata.fncConfDispAmt = null;
      _this.tableFormdata.fncConfUrl = null;
      _this.tableFormdata.fncConfChkFrm = null;
      _this.tableFormdata.fncConfCalFrm = null;
      _this.fncConfRowFlag = "1";
      _this.fncItemEditWay = "2";
      _this.fncConfOrder = 0; // 顺序编号
      _this.fncConfCotes = 1; // 栏位
      _this.fncConfIndent = 1; // 层次
      _this.fncCnfAppRow = 1; // 追加行数
      _this.disabled = false;
    },
    addFn: function () {
      const _this = this;
      _this.firstBtn = false;
      _this.cancelBack = true; // 返回
      _this.addSave = true; // 新增-保存
      _this.editSave = false; // 修改-保存
      _this.disabled = false;
    },
    addSaveFn: function () {
      const _this = this;
      _this.getLastFata();
      _this
        .$request({
          method: "POST",
          url: this.$backend.cmisCfg + "/api/cbps/fncConfDefFmt/s/insert",
          data: _this.tableFormdata,
        })
        .then((response) => {
          //处理请求成功的情况
          if (response.code == 0) {
            _this.getUnifyData();
            if (response.message) {
              _this.$message({
                message: response.message,
              });
            }
          } else {
            _this.$message({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    editFn: function () {
      const _this = this;
      if (_this.tableFormdata.itemId && _this.disabled == true) {
        _this.firstBtn = false;
        _this.cancelBack = true; // 返回
        _this.addSave = false; // 新增-保存
        _this.editSave = true; // 修改-保存
      } else {
        _this.$message({ message: "请先选择一条记录", type: "warning" });
        return;
      }
    },
    editSaveFn: function () {
      const _this = this;
      _this.getLastFata();
      _this
        .$request({
          method: "POST",
          url: this.$backend.cmisCfg + "/api/cbps/fncConfDefFmt/s/update",
          data: _this.tableFormdata,
        })
        .then((response) => {
          //处理请求成功的情况
          _this.getUnifyData();
          if (response.message) {
            _this.$message({
              message: response.message,
            });
          }
        });
    },
    cancelFn: function () {
      const _this = this;
      if (_this.tableFormdata.itemId && _this.disabled == true) {
        _this.$confirm("确定删除该数据？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          callback: function (action) {
            if (action === "confirm") {
              _this
                .$request({
                  method: "POST",
                  url:
                    _this.$backend.cmisCfg + "/api/cbps/fncConfDefFmt/s/delete",
                  data: {
                    itemId: _this.tableFormdata.itemId,
                    styleId: _this.$route.query.styleId,
                  },
                })
                .then((response) => {
                  //处理请求成功的情况
                  _this.getUnifyData();
                  if (response.message) {
                    _this.$message({
                      message: response.message,
                    });
                  }
                });
            }
          },
        });
      } else {
        _this.$message({ message: "请先选择一条记录", type: "warning" });
        return;
      }
    },
    clickShow: function (data) {
      const _this = this;
      _this
        .$request({
          method: "GET",
          url: this.$backend.cmisCfg + "/api/cbps/fncConfDefFmt/q/query/all",
          data: {
            condition: JSON.stringify({
              styleId: data.styleId,
              itemId: data.itemId,
            }),
            page: 1,
            size: 200,
          },
        })
        .then((response) => {
          //处理请求成功的情况
          if (response.code == 0) {
            yufp.extend(_this.tableFormdata, response.data[0]);
            _this.fncConfRowFlag = _this.tableFormdata.fncConfRowFlag;
            _this.fncItemEditWay = _this.tableFormdata.fncItemEditWay;
            _this.fncConfOrder = _this.tableFormdata.fncConfOrder;
            _this.fncConfCotes = _this.tableFormdata.fncConfCotes;
            _this.fncConfIndent = _this.tableFormdata.fncConfIndent;
            _this.fncCnfAppRow = _this.tableFormdata.fncCnfAppRow;
            _this.disabled = true;
          } else {
            _this.$message({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    goBakck: function () {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },

    /**
     * 选中的下拉框中指标数据，插入到下面的文本域中
     */
    insert: function () {
      if (!this.formdata.item_id) {
        return this.$message({
          message: "请选择需要插入的指标",
          type: "warning",
        });
      }
      let string = "";
      if (!this.lineShow) {
        string =
          "{[" +
          this.formdata.item_id +
          "]" +
          this.$refs.formSelect.getRawValue() +
          "}";
      } else {
        const lineNo = this.tableFormList.lineNo;
        const lineName = this.tableFormList.lineName;
        if (
          lineNo == null ||
          lineNo == "" ||
          lineName == null ||
          lineName == ""
        ) {
          return this.$message({
            message: "请确认：引用指标、列数、列名输入完整",
            type: "warning",
          });
        } else {
          const confTypeKey = this.$refs.formSelect.getConfType();
          const allArray = yufp.lookup.lookupMgr.FNCCONFTYPE;
          let confTypeName = "";
          allArray.forEach((item) => {
            if (item.key == confTypeKey) {
              confTypeName = item.value;
            }
          });
          string =
            "{[" +
            confTypeKey +
            "]" +
            confTypeName +
            ".[" +
            this.formdata.item_id +
            "]" +
            this.$refs.formSelect.getRawValue() +
            "[" +
            lineNo +
            "]" +
            lineName +
            "}";
        }
      }
      // 展示的内容根据实际和后端约定格式，此处在下拉框展示值外层增加花括号

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
    inputStr: function (string) {
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
    backspaceFn: function () {
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
    calculatorFn: function () {
      console.time("calculatorFn");
      var _this = this;
      var result = this.check();
      var param = "";

      if (result === "") {
        var formula = this.$refs.formula.value;

        formula = this.replaceAll(formula, "@OPER", "");
        const oper = this.getParam(formula, "(", ")");
        formula = this.replaceAll(formula, "(" + oper + ")", "");

        if (
          formula.indexOf("MAX") > -1 ||
          formula.indexOf("MIN") > -1 ||
          formula.indexOf("INT") > -1
        ) {
          formula = this.replaceAll(formula, "MAX", "Math.max"); // 如果公式中使用MAX，则解析为Math.max，取最大值

          formula = this.replaceAll(formula, "MIN", "Math.min"); // 如果公式中使用MIN，则解析为Math.min，取最小值

          formula = this.replaceAll(formula, "INT", "Math.round"); // 如果公式中使用INT，则解析为Math.round，四舍五入
        }
        formula = this.replaceAll(formula, "@SUMSUB", "");
        formula = this.replaceAll(formula, "@PARENT", "");
        formula = this.replaceAll(formula, "@RANK", "");
        formula = this.replaceAll(formula, "@ZONE", "");
        formula = this.replaceAll(formula, "@SIBLINGS()", "1");
        formula = this.replaceAll(formula, "@OPER", "0");
        console.log(this.getParam(formula, "{", "}"));
        // while ((param = this.getParam(formula, "{", "}")) !== "") {
        //   // 判断指标项是否为空
        //   var id = param.split("]")[0].split("[")[1];
        //   // var origData = this.staticData;
        //   // this.formdata.item_id
        //   // for (var i = 0, len = origData.length; i < len; i++) {
        //   if (this.formdata.item_id === id) {
        //     // 此处replaceAll不能用regexpFn方法替换
        //     formula = _this.replaceAll(
        //       formula,
        //       "{" + param + "}",
        //       this.$refs.formSelect.getRawValue()
        //     ); // 每次循环把一个指标项替换为对应的数据

        //     // break;
        //   }
        //   // }
        // }
        _this.dialogCalculateVisible = false;
        console.log("修改之后的数据", _this.textareaData);
        // _this.result = new Function("return " + formula)(); // eslint-disable-line
        if (_this.dialogTitle == "配置检查公式") {
          _this.tableFormdata.fncConfChkFrm = formula;
        } else {
          _this.tableFormdata.fncConfCalFrm = formula;
        }
      } else {
        this.$message({
          message: result,
          type: "error",
        });
      }
    },

    /**
     * 去除字符串两端空格
     */
    trim: function (str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },

    /**
     * 检查公式是否正确
     */
    check: function () {
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
      formula = this.replaceAll(formula, "@OPER", "");
      const oper = this.getParam(formula, "(", ")");
      formula = this.replaceAll(formula, "(" + oper + ")", "");

      if (
        formula.indexOf("MAX") > -1 ||
        formula.indexOf("MIN") > -1 ||
        formula.indexOf("INT") > -1
      ) {
        formula = this.replaceAll(formula, "MAX", "Math.max"); // 如果公式中使用MAX，则解析为Math.max，取最大值

        formula = this.replaceAll(formula, "MIN", "Math.min"); // 如果公式中使用MIN，则解析为Math.min，取最小值

        formula = this.replaceAll(formula, "INT", "Math.round"); // 如果公式中使用INT，则解析为Math.round，四舍五入
      }

      formula = this.replaceAll(formula, "@SUMSUB", "");
      formula = this.replaceAll(formula, "@PARENT", "");
      formula = this.replaceAll(formula, "@RANK", "");
      formula = this.replaceAll(formula, "@ZONE", "");
      formula = this.replaceAll(formula, "@SIBLINGS()", "1");
      formula = this.replaceAll(formula, "@OPER", "0");

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
    replaceAll: function (str, str1, str2) {
      var handleStr = this.handleEscape(str1);
      var reg = new RegExp(handleStr, "g");
      return str.replace(reg, str2);
    },

    /**
     * 转义正则字符
     * @param val 需要替换字符串
     */
    handleEscape: function (val) {
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
    regexpFn: function (val) {
      var _this = this;

      var value = val.replace(/\{\[(.*?)\].*?\}/g, function (str, id) {
        return _this.handSData[id];
      });
      return value;
    },

    /**
     * 获取花括号{}内部指标数据内容
     * @param str 计算公式值
     * @param leftFlag 左侧标识符
     * @param rightFlag 右侧标识符
     */
    getParam: function (str, leftFlag, rightFlag) {
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
    doCheck: function () {
      var result = this.check();

      if (result === "") {
        this.$message("公式正确");
      } else {
        this.$message({
          message: result,
          type: "error",
        });
      }
    },

    /**
     * 清除公式
     */
    doClear: function () {
      this.$refs.formula.value = "";
      this.result = 0;
    },
    // 返回
    goBack: function () {
      this.dialogCalculateVisible = false;
    },
  },
};
</script>
<style scoped>
.yu-button {
  padding-bottom: 20px;
}
.footer-table,
.footer-table tr th,
.footer-table tr td {
  border: 1px solid #e0e0e0;
  padding-top: 0px;
  padding-bottom: 0px;
}
.footer-table {
  margin: 0px auto;
  padding: 0px;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}
.table-header {
  height: 36px;
  background: #f2f2f2;
  font-weight: bold;
  font-size: 14px;
}
.table-body {
  text-align: left;
  padding-left: 10px;
  cursor: pointer;
}
.table-body.table-body1 {
  display: contents;
}
.table-body.table-body2 {
  display: contents;
}
.table-input {
  padding: 5px 0;
  width: 95%;
}
</style>
<style lang="scss">
.yu-panel-height > div > .yu-base-panel-content {
  margin: 0;
  padding-bottom: 0;
}
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
  margin-bottom: 20px;
}
</style>
