
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="sales">
    <yu-panel title="纳税情况分析" panel-type="simple">
      <table cellspacing="0" cellpadding="0" border="1" height="250px">
        <colgroup class="el-table_group">
          <col width="247">
          <col width="245">
          <col width="245">
          <col width="245">
          <col width="245">
          <col width="245">
          <col width="245">
        </colgroup>
        <tr class="item__header">
          <td class="item_header" colspan="2">项目</td>
          <td class="item_header">税率</td>
          <td class="item_header">{{ lastSecond }}</td>
          <td class="item_header">{{ lastFirst }}</td>
          <td class="item_header">{{ cur }}</td>
          <td class="item_header">备注</td>
        </tr>
        <tr>
          <td rowspan="3" class="item_header">增值税</td>
          <td class="item_header">应纳增值税</td>
          <td>
            <div>
              <yu-input @blur="inputChange('payableVatRate')" v-if="editFlag === true " v-model="taxData.payableVatRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.payableVatRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearPayableVat')" v-if="editFlag === true " v-model="taxData.lastTwoYearPayableVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastTwoYearPayableVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearPayableVat')" v-if="editFlag === true " v-model="taxData.lastYearPayableVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastYearPayableVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curPayableVat')" v-if="editFlag === true " v-model="taxData.curPayableVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.curPayableVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="taxData.payableVatRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.payableVatRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">已缴增值税</td>
          <td>
            <div>
              <yu-input @blur="inputChange('paidVatRate')" v-if="editFlag === true " v-model="taxData.paidVatRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.paidVatRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearPaidVat')" v-if="editFlag === true " v-model="taxData.lastTwoYearPaidVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastTwoYearPaidVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearPaidVat')" v-if="editFlag === true " v-model="taxData.lastYearPaidVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastYearPaidVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curPaidVat')" v-if="editFlag === true " v-model="taxData.curPaidVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.curPaidVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="taxData.paidVatRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.paidVatRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">出口退税</td>
          <td>
            <div>
              <yu-input @blur="inputChange('exportTaxVatRate')" v-if="editFlag === true " v-model="taxData.exportTaxVatRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.exportTaxVatRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearExportTaxVat')" v-if="editFlag === true " v-model="taxData.lastTwoYearExportTaxVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastTwoYearExportTaxVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearExportTaxVat')" v-if="editFlag === true " v-model="taxData.lastYearExportTaxVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastYearExportTaxVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curExportTaxVat')" v-if="editFlag === true " v-model="taxData.curExportTaxVat" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.curExportTaxVat }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="taxData.exportTaxVatRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.exportTaxVatRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td rowspan="3" class="item_header">所得税</td>
          <td class="item_header">应纳所得税</td>
          <td>
            <div>
              <yu-input @blur="inputChange('payableItRate')" v-if="editFlag === true " v-model="taxData.payableItRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.payableItRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearPayableIt')" v-if="editFlag === true " v-model="taxData.lastTwoYearPayableIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastTwoYearPayableIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearPayableIt')" v-if="editFlag === true " v-model="taxData.lastYearPayableIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastYearPayableIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curPayableIt')" v-if="editFlag === true " v-model="taxData.curPayableIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.curPayableIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="taxData.payableItRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.payableItRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">已缴所得税</td>
          <td>
            <div>
              <yu-input @blur="inputChange('paidItRate')" v-if="editFlag === true " v-model="taxData.paidItRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.paidItRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearPaidIt')" v-if="editFlag === true " v-model="taxData.lastTwoYearPaidIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastTwoYearPaidIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearPaidIt')" v-if="editFlag === true " v-model="taxData.lastYearPaidIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastYearPaidIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curPaidIt')" v-if="editFlag === true " v-model="taxData.curPaidIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.curPaidIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="taxData.paidItRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.paidItRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">即征即退</td>
          <td>
            <div>
              <yu-input @blur="inputChange('exportTaxItRate')" v-if="editFlag === true " v-model="taxData.exportTaxItRate" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.exportTaxItRate }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastTwoYearExportTaxIt')" v-if="editFlag === true " v-model="taxData.lastTwoYearExportTaxIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastTwoYearExportTaxIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('lastYearExportTaxIt')" v-if="editFlag === true " v-model="taxData.lastYearExportTaxIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.lastYearExportTaxIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('curExportTaxIt')" v-if="editFlag === true " v-model="taxData.curExportTaxIt" type="num"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.curExportTaxIt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input v-if="editFlag === true " v-model="taxData.exportTaxItRemark" type="textarea"></yu-input>
              <span v-else class="item__amt_txt">{{ taxData.exportTaxItRemark }}</span>
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
      taxData: [],
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
      _this.inputYear = _this.taxData.acquisitionDate;
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
      var val = _this.taxData[arg];
      if (isNaN(val) || val.trim() == '') {
        _this.taxData[arg] = '0.00';
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
      yufp.clone(_this.taxData, _this.tmpItem);
    },
    /**
     * 报表返回
     */
    cancelFn: function () {
      var _this = this;
      if (_this.editFlag === true) {
        _this.editFlag = false;
        _this.showEditBtn = true;
        yufp.clone(_this.tmpItem, this.taxData);
      }
    },
    saveFn: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      obj.acquisitionDate = _this.inputYear;
      obj.payableVatRate = _this.taxData.payableVatRate;
      obj.lastTwoYearPayableVat = _this.taxData.lastTwoYearPayableVat;
      obj.lastYearPayableVat = _this.taxData.lastYearPayableVat;
      obj.curPayableVat = _this.taxData.curPayableVat;
      obj.payableVatRemark = _this.taxData.payableVatRemark;
      obj.paidVatRate = _this.taxData.paidVatRate;
      obj.lastTwoYearPaidVat = _this.taxData.lastTwoYearPaidVat;
      obj.lastYearPaidVat = _this.taxData.lastYearPaidVat;
      obj.curPaidVat = _this.taxData.curPaidVat;
      obj.paidVatRemark = _this.taxData.paidVatRemark;
      obj.exportTaxVatRate = _this.taxData.exportTaxVatRate;
      obj.lastTwoYearExportTaxVat = _this.taxData.lastTwoYearExportTaxVat;
      obj.lastYearExportTaxVat = _this.taxData.lastYearExportTaxVat;
      obj.curExportTaxVat = _this.taxData.curExportTaxVat;
      obj.exportTaxVatRemark = _this.taxData.exportTaxVatRemark;
      obj.payableItRate = _this.taxData.payableItRate;
      obj.lastTwoYearPayableIt = _this.taxData.lastTwoYearPayableIt;
      obj.lastYearPayableIt = _this.taxData.lastYearPayableIt;
      obj.curPayableIt = _this.taxData.curPayableIt;
      obj.payableItRemark = _this.taxData.payableItRemark;
      obj.paidItRate = _this.taxData.paidItRate;
      obj.lastTwoYearPaidIt = _this.taxData.lastTwoYearPaidIt;
      obj.lastYearPaidIt = _this.taxData.lastYearPaidIt;
      obj.curPaidIt = _this.taxData.curPaidIt;
      obj.paidItRemark = _this.taxData.paidItRemark;
      obj.exportTaxItRate = _this.taxData.exportTaxItRate;
      obj.lastTwoYearExportTaxIt = _this.taxData.lastTwoYearExportTaxIt;
      obj.lastYearExportTaxIt = _this.taxData.lastYearExportTaxIt;
      obj.curExportTaxIt = _this.taxData.curExportTaxIt;
      obj.exportTaxItRemark = _this.taxData.exportTaxItRemark;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitu/saveFncSitu',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            yufp.clone(_this.taxData, _this.tmpItem);
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
