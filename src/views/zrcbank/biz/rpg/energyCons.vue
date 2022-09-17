
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="cons">
    <yu-panel title="三期能源耗用量及人工统计" panel-type="simple">
      <table cellspacing="0" cellpadding="0" border="1" height="150px">
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
          <td class="item_header">{{ curr }}</td>
          <td class="item_header">去年同期</td>
          <td class="item_header">备注</td>
        </tr>
        <tr>
          <td class="item_header">用电度数(度数)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('power','nearSecondPowerNum')" v-if="editFlag === true " v-model="consData.nearSecondPowerNum" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearSecondPowerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('power','nearFirstPowerNum')" v-if="editFlag === true " v-model="consData.nearFirstPowerNum" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearFirstPowerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('power','lastYearPowerNum')" v-if="editFlag === true " v-model="consData.lastYearPowerNum" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.lastYearPowerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('power','currPowerNum')" v-if="editFlag === true " v-model="consData.currPowerNum" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.currPowerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('power','powerNumRemark')" v-if="editFlag === true " v-model="consData.powerNumRemark" type="input"></yu-input>
              <span v-else class=" item__amt_txt">{{ consData.powerNumRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">用气量(立方)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('gas','nearSecondGasAmount')" v-if="editFlag === true " v-model="consData.nearSecondGasAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearSecondGasAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('gas','nearFirstGasAmount')" v-if="editFlag === true " v-model="consData.nearFirstGasAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearFirstGasAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('gas','lastYearGasAmount')" v-if="editFlag === true " v-model="consData.lastYearGasAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.lastYearGasAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('gas','currGasAmount')" v-if="editFlag === true " v-model="consData.currGasAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.currGasAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('gas','gasAmountreMark')" v-if="editFlag === true " v-model="consData.gasAmountreMark" type="input"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.gasAmountreMark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">用水量(吨)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('water','nearSecondWaterAmount')" v-if="editFlag === true " v-model="consData.nearSecondWaterAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearSecondWaterAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('water','nearFirstWaterAmount')" v-if="editFlag === true " v-model="consData.nearFirstWaterAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearFirstWaterAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('water','lastYearWaterAmount')" v-if="editFlag === true " v-model="consData.lastYearWaterAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.lastYearWaterAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('water','currWaterAmount')" v-if="editFlag === true " v-model="consData.currWaterAmount" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.currWaterAmount }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('water','waterAmountRemark')" v-if="editFlag === true " v-model="consData.waterAmountRemark" type="input"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.waterAmountRemark }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">工人人数(人)</td>
          <td>
            <div>
              <yu-input @blur="inputChange('worker','nearSecondWorkerNum')" v-if="editFlag === true " v-model="consData.nearSecondWorkerNum" type="num" :formatter="$formatNumber('0,000',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearSecondWorkerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('worker','nearFirstWorkerNum')" v-if="editFlag === true " v-model="consData.nearFirstWorkerNum" type="num" :formatter="$formatNumber('0,000',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.nearFirstWorkerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('worker','lastYearWorkerNum')" v-if="editFlag === true " v-model="consData.lastYearWorkerNum" type="num" :formatter="$formatNumber('0,000',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.lastYearWorkerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('worker','currWorkerNum')" v-if="editFlag === true " v-model="consData.currWorkerNum" type="num" :formatter="$formatNumber('0,000',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.currWorkerNum }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('worker','workerNumRemark')" v-if="editFlag === true " v-model="consData.workerNumRemark" type="input"></yu-input>
              <span v-else class="item__amt_txt">{{ consData.workerNumRemark }}</span>
            </div>
          </td>
        </tr>
      </table>
      <yu-xform ref="otherDescForm" label-width="120px" v-model="otherDescFormData" style="margin-top:20px" :disabled="op =='VIEW'">
        <yu-xform-group>
          <yu-xform-item label="其他说明" name="otherDesc" ctype="textarea" :disabled="!editFlag"></yu-xform-item>
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
      lastSecond: '',
      lastFirst: '',
      curr: '',
      consData: [],
      showEditBtn: true,
      editFlag: false,
      tmpItem: [],
      otherDescFormData: {},
      inputYear: '',
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.init();
    _this.initDesc();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperenergycons/selectBySerno',
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
              } else {
                _this.inputYear = _this.$xutils.dateFormat(
                  'yyyy-MM',
                  new Date()
                );
                _this.consData.inputYear = _this.inputYear;
              }
              _this.consData = response.data;
            } else {
              _this.inputYear = _this.$xutils.dateFormat('yyyy-MM', new Date());
              var obj = {};
              obj.serno = _this.param.serno;
              obj.inputYear = _this.inputYear;
              yufp.service.request({
                method: 'POST',
                url:
                  _this.$backend.cmisBiz +
                  '/api/rptoperenergycons/insertCons',
                data: obj,
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
            var month = _this.inputYear.substring(5, 7);
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
    initDesc: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperation/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.otherDescFormData);
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
      yufp.clone(_this.consData, _this.tmpItem);
    },
    /**
     * 报表返回
     */
    cancelFn: function () {
      var _this = this;
      if (_this.editFlag === true) {
        _this.editFlag = false;
        _this.showEditBtn = true;
        yufp.clone(_this.tmpItem, this.consData);
      }
    },
    /**
      报表数据变更
     */
    inputChange: function (item, arg) {
      var _this = this;
      var val = _this.consData[arg];
      if (item == 'worker') {
        if (arg == 'workerNumRemark') {
          if (isNaN(val) || val.trim() == '') {
            _this.consData[arg] = '暂无';
          }
        } else if (isNaN(val) || val.trim() == '') {
          _this.consData[arg] = '0';
        }
      } else {
        if (
          arg == 'powerNumRemark' ||
          arg == 'gasAmountreMark' ||
          arg == 'waterAmountRemark'
        ) {
          if (isNaN(val) || val.trim() == '') {
            _this.consData[arg] = '暂无';
          }
        } else if (isNaN(val) || val.trim() == '') {
          _this.consData[arg] = '0.00';
        }
      }
    },
    saveFn: function () {
      var _this = this;
      // 能源统计
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperenergycons/updateCons',
        data: _this.consData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            yufp.clone(_this.consData, _this.tmpItem);
            // 其他说明
            var obj = {};
            obj.serno = _this.param.serno;
            obj.otherDesc = _this.otherDescFormData.otherDesc;
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz + '/api/rptoperation/updateRptOperation',
              data: obj,
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.initDesc();
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
.cons tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
}

.cons .item__header td {
  background-color: #feb201;
  color: #000000;
  text-align: center;
}

.cons .item__amt_txt {
  padding: 3px 10px;
}
.cons .item_header {
  text-align: center;
}
</style>
