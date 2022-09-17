
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="sales">
    <yu-panel title="财务指标分析" panel-type="simple">
      <table cellspacing="0" cellpadding="0" border="1" height="250px">
        <colgroup class="el-table_group">
          <col width="245">
          <col width="245">
          <col width="245">
          <col width="245">
          <col width="245">
        </colgroup>
        <tr class="item__header">
          <td class="item_header">项目</td>
          <td class="item_header"></td>
          <td class="item_header">{{ lastSecond }}</td>
          <td class="item_header">{{ lastFirst }}</td>
          <td class="item_header">{{ cur }}</td>
        </tr>
        <tr>
          <td class="item_header" rowspan="4">偿债能力分析</td>
          <td class="item_header">资产负债率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearDebtRate')" v-if="editFlag === true " v-model="situData.lastTwoYearDebtRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearDebtRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearDebtRate')" v-if="editFlag === true " v-model="situData.lastYearDebtRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearDebtRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearDebtRate')" v-if="editFlag === true " v-model="situData.curYearDebtRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearDebtRate }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">流动比率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearCurrentRatio')" v-if="editFlag === true " v-model="situData.lastTwoYearCurrentRatio" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearCurrentRatio }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearCurrentRatio')" v-if="editFlag === true " v-model="situData.lastYearCurrentRatio" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearCurrentRatio }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearCurrentRatio')" v-if="editFlag === true " v-model="situData.curYearCurrentRatio" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearCurrentRatio }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">速动比率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearQuickRatio')" v-if="editFlag === true " v-model="situData.lastTwoYearQuickRatio" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearQuickRatio }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearQuickRatio')" v-if="editFlag === true " v-model="situData.lastYearQuickRatio" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearQuickRatio }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearQuickRatio')" v-if="editFlag === true " v-model="situData.curYearQuickRatio" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearQuickRatio }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">营运资金</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearWorkCap')" v-if="editFlag === true " v-model="situData.lastTwoYearWorkCap" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearWorkCap }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearWorkCap')" v-if="editFlag === true " v-model="situData.lastYearWorkCap" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearWorkCap }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearWorkCap')" v-if="editFlag === true " v-model="situData.curYearWorkCap" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearWorkCap }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header" rowspan="2">运营能力分析</td>
          <td class="item_header">应收账款周转率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearArvto')" v-if="editFlag === true " v-model="situData.lastTwoYearArvto" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearArvto }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearArvto')" v-if="editFlag === true " v-model="situData.lastYearArvto" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearArvto }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearArvto')" v-if="editFlag === true " v-model="situData.curYearArvto" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearArvto }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">存货周转率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearItto')" v-if="editFlag === true " v-model="situData.lastTwoYearItto" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearItto }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearItto')" v-if="editFlag === true " v-model="situData.lastYearItto" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearItto }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearItto')" v-if="editFlag === true " v-model="situData.curYearItto" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearItto }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header" rowspan="2">获利能力分析</td>
          <td class="item_header">总资产报酬率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearRota')" v-if="editFlag === true " v-model="situData.lastTwoYearRota" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearRota }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearRota')" v-if="editFlag === true " v-model="situData.lastYearRota" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearRota }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearRota')" v-if="editFlag === true " v-model="situData.curYearRota" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearRota }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">净资产收益率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearRona')" v-if="editFlag === true " v-model="situData.lastTwoYearRona" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearRona }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearRona')" v-if="editFlag === true " v-model="situData.lastYearRona" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearRona }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearRona')" v-if="editFlag === true " v-model="situData.curYearRona" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearRona }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">发展能力分析</td>
          <td class="item_header">营业收入增长率(%)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearRevinr')" v-if="editFlag === true " v-model="situData.lastTwoYearRevinr" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastTwoYearRevinr }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearRevinr')" v-if="editFlag === true " v-model="situData.lastYearRevinr" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.lastYearRevinr }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curYearRevinr')" v-if="editFlag === true " v-model="situData.curYearRevinr" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.curYearRevinr }}</span>
            </div>
          </td>
        </tr>
        <tr>
         <td class="item_header">财务状况作总体陈述</td>
         <td colspan="4">
            <div>
              <yu-input  v-if="editFlag === true " v-model="situData.fncDeclare" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ situData.fncDeclare }}</span>
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
      situData: [],
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
      _this.inputYear = _this.situData.acquisitionDate;
      var year = _this.inputYear.substring(0, 4);
      var month = _this.inputYear.substring(4, 6);
      if (month.substring(0, 1) == '0') {
        month = month.substring(1, 2);
      }
      _this.lastSecond = parseInt(year) - 2 + '年度';
      _this.lastFirst = parseInt(year) - 1 + '年度';
      _this.cur = year + '年1月-' + month + '月';
    },
    inputChange: function (arg) {
      var _this = this;
      var val = _this.situData[arg];
      if (isNaN(val) || val.trim() == '') {
        _this.situData[arg] = '0.00';
      }
    },
    /**
     * 报表修改
     */
    editFn: function () {
      var _this = this;
      _this.editFlag = true;
      _this.showEditBtn = false;
      _this.tmpItem = [];
      yufp.clone(_this.situData, _this.tmpItem);
    },
    /**
     * 报表返回
     */
    cancelFn: function () {
      var _this = this;
      if (_this.editFlag === true) {
        _this.editFlag = false;
        _this.showEditBtn = true;
        yufp.clone(_this.tmpItem, this.situData);
      }
    },
    saveFn: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      obj.acquisitionDate = _this.inputYear;
      obj.lastTwoYearDebtRate = _this.situData.lastTwoYearDebtRate;
      obj.lastYearDebtRate = _this.situData.lastYearDebtRate;
      obj.curYearDebtRate = _this.situData.curYearDebtRate;
      obj.lastTwoYearCurrentRatio = _this.situData.lastTwoYearCurrentRatio;
      obj.lastYearCurrentRatio = _this.situData.lastYearCurrentRatio;
      obj.curYearCurrentRatio = _this.situData.curYearCurrentRatio;
      obj.lastTwoYearQuickRatio = _this.situData.lastTwoYearQuickRatio;
      obj.lastYearQuickRatio = _this.situData.lastYearQuickRatio;
      obj.curYearQuickRatio = _this.situData.curYearQuickRatio;
      obj.lastTwoYearWorkCap = _this.situData.lastTwoYearWorkCap;
      obj.lastYearWorkCap = _this.situData.lastYearWorkCap;
      obj.curYearWorkCap = _this.situData.curYearWorkCap;
      obj.lastTwoYearArvto = _this.situData.lastTwoYearArvto;
      obj.lastYearArvto = _this.situData.lastYearArvto;
      obj.curYearArvto = _this.situData.curYearArvto;
      obj.lastTwoYearItto = _this.situData.lastTwoYearItto;
      obj.lastYearItto = _this.situData.lastYearItto;
      obj.curYearItto = _this.situData.curYearItto;
      obj.lastTwoYearRota = _this.situData.lastTwoYearRota;
      obj.lastYearRota = _this.situData.lastYearRota;
      obj.curYearRota = _this.situData.curYearRota;
      obj.lastTwoYearRona = _this.situData.lastTwoYearRona;
      obj.lastYearRona = _this.situData.lastYearRona;
      obj.curYearRona = _this.situData.curYearRona;
      obj.lastTwoYearRevinr = _this.situData.lastTwoYearRevinr;
      obj.lastYearRevinr = _this.situData.lastYearRevinr;
      obj.curYearRevinr = _this.situData.curYearRevinr;
      obj.fncDeclare = _this.situData.fncDeclare;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitu/saveFncSitu',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            yufp.clone(_this.situData, _this.tmpItem);
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
