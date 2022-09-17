<template>
<div>
    <yu-tabs v-model="activeName">
        <yu-tab-pane :label="reportInfoItem.label" :name="reportInfoItem.reportIndex" v-for="(reportInfoItem, index) in reportInfo" :key="index">
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
                  <yu-col v-for="(item,indexItem) in reportInfoItem.confStyles.fncConfCotes" :span="reportInfoItem.confStyles.fncConfCotes === 1 ? 24 : 12"
                    :key="indexItem">
                    <table style="width:100%">
                      <tr class="item__header">
                        <td v-for="(ite,idx) in reportInfoItem.header" :style="{'width': ite.width}" class="item_header" :key="idx">{{ ite.content }}</td>
                      </tr>
                      <template  v-for="(it,ind) in reportInfoItem.items">
                        <tr :key="ind" v-if="item === it.fncConfCotes">
                          <td :class="['item__label', {'item__amt_cal': it.fncConfCalFrm}]" :style="{'width': reportInfoItem.header[0].width}"
                            v-if="reportInfoItem.header[0]"><span v-html="parseContent(it)"></span></td>
                          <td :class="['item__order',{'item_none': it.fncConfRowFlg !== '1'}]" :style="{'width': reportInfoItem.header[1].width}" v-if="reportInfoItem.header[1]"><span v-if="it.fncConfRowFlg === '1'">{{ it.rowOrder }}</span></td>
                          <!--循环产生数字数据列数-->
                          <template v-for="(amt, amtIndex) in reportInfoItem.confStyles.fncConfDataCol">
                          <td :class="['item__amt',{'item_none': it.fncItemEditTyp === '3'}]" :style="{'width': reportInfoItem.header[2 + amtIndex].width}" v-if="reportInfoItem.header[2 + amtIndex]"  :key="amtIndex">
                            <div v-if="it.fncItemEditTyp !== '3' && it.fncConfRowFlg !=='2'"><yu-input v-if="reportInfoItem.editFlag === true && !it.fncConfCalFrm" v-model="formData['formData' + reportInfoItem.reportIndex][it.itemId]['data'+(1 + amtIndex)]" type="num"
                              @blur="inputChange(arguments,reportInfoItem.reportIndex,it.itemId, 1 + amtIndex )" :formatter="$formatNumber('0,000.00',0)"></yu-input>
                              <yu-input v-else-if="it.fncConfCalFrm && reportInfoItem.editFlag === true" readonly :value="cal(reportInfoItem.reportIndex,it.itemId, 1 + amtIndex )" maxlength="16"></yu-input>
                              <span v-else-if="it.fncConfCalFrm" class="item__amt_txt">{{ cal(reportInfoItem.reportIndex,it.itemId, 1 + amtIndex ) }}</span>
                              <span v-else class="item__amt_txt">{{ formatMoney(formData['formData' + reportInfoItem.reportIndex][it.itemId]['data'+(1 + amtIndex) ]) }}</span>
                          </div></td>
                          </template>
                        </tr>
                        <!--追加行数 -->
                        <tr v-for="(blankRow , indexBr) in it.fncCnfAppRow"  :key="indexBr" style="height:20px"></tr>
                      </template>
                    </table>
                  </yu-col>
                </yu-row>
                <table class="footer" style="width:100%">
                  <tr>
                    <td align="right" style="padding-right: 20px;">制表人：{{ statBase.inputId }}</td>
                  </tr>
                </table>
                <div class="yu-grpButton" v-if="showBtn">
                  <yu-button icon="yx-checkmark" type="primary" v-show="!reportInfoItem.showEditBtn" @click="saveFn(reportInfoItem, '1')">暂存</yu-button>
                  <yu-button icon="yx-checkmark" type="primary" v-show="!reportInfoItem.showEditBtn" @click="saveFn(reportInfoItem, '2')">完成</yu-button>
                  <yu-button icon="yx-checkmark" type="primary" v-show="reportInfoItem.showEditBtn" @click="editFn(reportInfoItem)">编辑</yu-button>
                  <yu-button icon="yx-checkmark" type="primary" v-show="reportInfoItem.showEditBtn" @click="getOcrFn(reportInfoItem)">ocr获取</yu-button>
                  <yu-button icon="yx-undo2" type="primary" @click="cancelFn(reportInfoItem)">返回</yu-button>
                </div>
              </div>
        </yu-tab-pane>
        <yu-tab-pane label="财务报表审核信息" name="100">
            <yu-xform ref="refForm" label-width="140px" v-model="formdata">
              <yu-xform-group>
                <yu-xform-item label="客户代码" ctype="input" name="cusId" :disabled="true"></yu-xform-item>
                <yu-xform-item label="报表周期类型" ctype="select" name="statPrdStyle" data-code="STD_ZB_FNC_STAT" rules="required"
                  :disabled="true"></yu-xform-item>
                <yu-xform-item label="报表期间" ctype="input" name="statPrd" rules="required" :disabled="true"></yu-xform-item>
                <yu-xform-item label="报表口径" placeholder="请选择报表口径" ctype="select" name="statStyle" rules="required"
                  data-code="STD_ZB_FNC_STYLE" :disabled="true"></yu-xform-item>
                <yu-xform-item label="是否新准则报表" placeholder="请选择是否新准则报表" ctype="select" name="statIsNrpt"
                  data-code="STD_ZB_YES_NO" :hidden="!showBtn"></yu-xform-item>
                <yu-xform-item label="是否经过审计" placeholder="请选择是否经过审计" ctype="select" name="statIsAudit"
                  data-code="STD_ZB_YES_NO" :disabled="!showBtn" @change="statIsAuditFn"></yu-xform-item>
                <yu-xform-item label="是否经过调整" placeholder="请选择是否经过调整" ctype="select" name="statIsAdjt"
                  data-code="STD_ZB_YES_NO" :disabled="!showBtn"  @change="statIsAdjtFn"></yu-xform-item>
                  <yu-xform-item label="是否允许修改" placeholder="请选择是否允许修改" ctype="select" name="indUpdate"
                  data-code="STD_ZB_YES_NO" :hidden="!showBtn"></yu-xform-item>
                <yu-xform-item label="审计单位" placeholder="请输入审计单位" ctype="input" name="statAdtEntr" :disabled="!showBtn" :hidden="statIsAuditHidden"></yu-xform-item>
                <yu-xform-item label="审计结论" placeholder="请输入审计结论" ctype="textarea" name="statAdtConc" row="3" colspan="24"
                  :disabled="!showBtn" :hidden="statIsAuditHidden"></yu-xform-item>
                <yu-xform-item label="财务报表调整原因" placeholder="请输入财务报表调整原因" ctype="textarea" name="statAdjRsn" row="3" colspan="24"
                  :disabled="!showBtn" :hidden="statIsAdjtHidden"></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton" v-if="showBtn">
                <yu-button icon="check" type="primary" @click="saveCheckFn">保存</yu-button>
              </div>
            </yu-xform>
          </yu-tab-pane>
      </yu-tabs>
</div>
</template>
<script>
yufp.lookup.reg('STD_ZB_FNC_STYLE,STD_ZB_YES_NO');
import router from '@/router';
let data = router.history.pending.params;
// script 执行标志（script 只有第一次能加载）
let flag = true;
var reportResponse = {};
// 存储报表映射关系
var reportInfo = [];
// mixin 对象
var mixin = {computed: {
}};
function initData () {
  var model = {cusId: data.cusId, statStyle: data.statStyle, statPrdStyle: data.statPrdStyle, statPrd: data.statPrd};
  // 同步请求获取相关信息为将栏位的计算公式绑定，故使用mixin 混入（vue实例创建前处理好mixin数据）
  yufp.service.request({
    method: 'get',
    async: false, // 同步操作
    url: backend.cmisCus + '/api/nrcs-cms/fncstatdtl/q/fncstatdtl/detailall', // ?cusId=9540462373&statStyle=1&statPrdStyle=1&statPrd=201102',
    data: model,
    callback: function (code, message, response) {
      if (response.code == '0') {
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

  /**
     *  返回报文分组映射
     * 01:资产负债表 statBsStyleId
     * 02:损益表 statPlStyleId
     * 03:现金流量表 statCfStyleId
     * 04:财务指标表 statFiStyleId
     * 05:所有者权益变动 statSoeStyleId
     * 06:财务简表 statSlStyleId
     */
  var arr = [{key: 'statBsStyleId', label: '资产负债表'}, {key: 'statPlStyleId', label: '损益表'}, {key: 'statCfStyleId', label: '现金流量表'}, {key: 'statFiStyleId', label: '财务指标表'}, {key: 'statSoeStyleId', label: '所有者权益变动'}, {key: 'statSlStyleId', label: '财务简表'}];
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
      let reportIndex = '0' + (j + 1);
      let header = parseHeader(style);
      let obj = {'reportIndex': reportIndex, 'reportTypeId': reportResponse.statBase[element.key], label: element.label, confStyles: style, items: reportResponse.itemsMap[reportResponse.statBase[element.key]], 'header': header};
      obj.editFlag = false;
      obj.showEditBtn = true;
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
        // 定义计算属性的名称为''formData' + 'reportIndex + '__'element.itemId + '__' +index（从1开始）例：formData01__AAAAAA_1
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
                console.error('【' + element.itemName + '】计算公式配置错误！', ele.fncConfCalFrm);
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
    var col = confStyles.fncConfDataCol + '';
    var header = [];
    switch (col) {
    case '1':
      header.push({width: '45%', content: '项目'});
      if (confStyles.fncConfTyp === '04') {
        header.push({width: '35%', content: '行次'});
        header.push({width: '20%', content: '指标值（比率:%）'});
      } else {
        header.push({width: '15%', content: '行次'});
        header.push({width: '40%', content: '金额'});
      }
      break;
    case '2':
      header.push({width: '45%', content: '项目'});
      header.push({width: '15%', content: '行次'});
      // 所属报表种类
      if (confStyles.fncConfTyp === '02' || confStyles.fncConfTyp === '03') {
        header.push({width: '20%', content: '本期数'});
        header.push({width: '20%', content: '本年累计数'});
      } else {
      // 周期类型
        if (reportResponse.statBase.statPrdStyle && reportResponse.statBase.statPrdStyle === '4') {
          header.push({width: '20%', content: '期初数'});
          header.push({width: '20%', content: '期末数'});
        } else {
          header.push({width: '20%', content: '年初数'});
          header.push({width: '20%', content: '本期数'});
        }
      }
      break;
    default:
      break;
    }
    return header;
  }
}
initData();
export default {
  mixins: [mixin],
  data: function () {
    return {
      // 每个报表表单的数据
      formData: {
        formData01: {},
        formData02: {},
        formData03: {},
        formData04: {},
        formData05: {},
        formData06: {}
      },
      reportInfo: reportInfo,
      statBase: reportResponse.statBase,
      showBtn: false,
      // 默认激活的tab页签
      activeName: '01',
      tmpItem: [],
      // 制表人
      userName: yufp.session.userName,
      // 审核信息
      formdata: {},
      dataUrlSave: backend.cmisCus + '/api/nrcs-cms/fncstatbase/s/fncstatbase/auditinfo/update',
      statIsAuditHidden: true,
      statIsAdjtHidden: true
    };
  },
  beforeCreate: function () {
    if (!flag) {
      reportResponse = {};
      // 存储报表映射关系
      reportInfo = [];
      // mixin 对象
      data = this.$route.meta.params;
      initData();
    }
    flag = false;
  },
  methods: {
    getStatus: function (index) {
      //  根据所以返回状态
      var flag = this.statBase.stateFlg.substr(index.substring(1, 1) - 1, 1);
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
      return this.statBase.inputDate && this.dateFormat(this.statBase.inputDate, '{y}年{m}月{d}日');
    },
    dateFormat: function (time, format) {
      if (arguments.length === 0) {
        return null;
      }
      format = format || '{y}-{m}-{d} {h}:{i}:{s}';
      var date;
      if (typeof time === 'object') {
        date = time;
      } else {
        if (typeof time === 'string' && this.isDate(time)) {
          date = new Date(time.replace(/-/g, ''));
        } else if (('' + time).length === 10) {
          time = parseInt(time) * 1000;
          date = new Date(time);
        }
        date = new Date(time);
      }
      var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      };
      var timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
        var value = formatObj[key];
        if (key === 'a') {
          return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        }
        if (result.length > 0 && value < 10) {
          value = '0' + value;
        }
        return value || 0;
      });
      return timeStr;
    },
    isDate: function (date) {
      if (date === null || date === undefined) {
        return false;
      } else {
        if (isNaN(new Date(date.replace(/-/g, '/')).getTime())) {
          return false;
        }
        return true;
      }
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
    saveFn: function (reportInfo, flag) {
      // 通用信息
      var model = {
        cusId: data.cusId,
        statPrdStyle: data.statPrdStyle,
        statPrd: data.statPrd,
        statStyle: data.statStyle,
        statConfStyleId: reportInfo.reportTypeId,
        fncConfTyp: reportInfo.reportIndex,
        items: []
      };
      // 表单对应的字段信息 this.formData.formDataxx.[data1/data2/data3/data4]
      for (let item in this.formData['formData' + reportInfo.reportIndex]) {
        let itemObj = {itemId: item};
        for (let itm in this.formData['formData' + reportInfo.reportIndex][item]) {
          itemObj[itm] = this.formData['formData' + reportInfo.reportIndex][item][itm];
          model.items.push(itemObj);
        }
      }
      let url = '';
      if (flag === '1') {
        url = backend.cmisCus + '/api/nrcs-cms/fncstatdtl/s/fncstatdtl/tempsave';
      } else if (flag === '2') {
        url = backend.cmisCus + '/api/nrcs-cms/fncstatdtl/s/fncstatdtl/save';
      }
      let _this = this;
      yufp.service.request({
        method: 'post',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            reportInfo.showEditBtn = true;
            reportInfo.editFlag = false;
            if (flag === '1') {
              _this.$message('暂存成功！');
            } else if (flag === '2') {
              _this.$message('保存成功！');
            }
          }
        }
      });
    },
    /**
         * 报表修改
         */
    editFn: function (reportInfo) {
      reportInfo.editFlag = true;
      reportInfo.showEditBtn = false;
      this.tmpItem = [];
      yufp.clone(this.formData['formData' + reportInfo.reportIndex], this.tmpItem);
    },
    /**
       * 报表返回
       */
    cancelFn: function (reportInfo) {
      if (reportInfo.editFlag === true) {
        reportInfo.editFlag = false;
        reportInfo.showEditBtn = true;
        yufp.clone(this.tmpItem, this.formData['formData' + reportInfo.reportIndex]);
      } else {
        yufp.router.removeTab(this.$route.path);
        var params = {
          instanceId: data.instanceId,
          nodeId: data.nodeId,
          userId: data.userId
        };
        if(data && data.instanceId) {
          this.$router.replace({ name: 'instanceInfo', params });
        }
      }
    },
    /**
      *获取ocr结果
     */
    getOcrFn: function() {
      let _this = this;
      let url = backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/saveOcrResult';
      let model = {cusId: data.cusId, statStyle: data.statStyle, statPrdStyle: data.statPrdStyle, statPrd: data.statPrd};
      // 向后台发送获取请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('获取ocr结果成功');
            //重新加载数据
            _this.reloadData();
          } else {
            _this.$message(response.message);
          }
        }
      });
    },
    /**
     * 重新加载数据
     */
    reloadData: function() {
      let model = {cusId: data.cusId, statStyle: data.statStyle, statPrdStyle: data.statPrdStyle, statPrd: data.statPrd};
      // 同步请求获取相关信息为将栏位的计算公式绑定，故使用mixin 混入（vue实例创建前处理好mixin数据）
      yufp.service.request({
        method: 'get',
        async: false, // 同步操作
        url: backend.cmisCus + '/api/nrcs-cms/fncstatdtl/q/fncstatdtl/detailall', // ?cusId=9540462373&statStyle=1&statPrdStyle=1&statPrd=201102',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
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
      /**
        *  返回报文分组映射
        * 01:资产负债表 statBsStyleId
        * 02:损益表 statPlStyleId
        * 03:现金流量表 statCfStyleId
        * 04:财务指标表 statFiStyleId
        * 05:所有者权益变动 statSoeStyleId
        * 06:财务简表 statSlStyleId
        */
      let arr = [{key: 'statBsStyleId', label: '资产负债表'}, {key: 'statPlStyleId', label: '损益表'}, {key: 'statCfStyleId', label: '现金流量表'}, {key: 'statFiStyleId', label: '财务指标表'}, {key: 'statSoeStyleId', label: '所有者权益变动'}, {key: 'statSlStyleId', label: '财务简表'}];
      for (let j = 0; j < arr.length; j++) {
        let element = arr[j];
        if (reportResponse.statBase[element.key]) {
          let style = null;
          //获取报表样式
          for (let k = 0; k < reportResponse.confStylesList.length; k++) {
            let el = reportResponse.confStylesList[k];
            if (reportResponse.statBase[element.key] === reportResponse.confStylesList[k].styleId) {
              style = el;
              break;
            }
          }
          let items = reportResponse.itemsMap[reportResponse.statBase[element.key]];
          let reportIndex = '0' + (j + 1);
          //填充数据
          for (let k = 0 ; k < items.length ; k++) {
            let item = items[k];
            for (let amtIndex = 0 ; amtIndex < style.fncConfCotes ; amtIndex++) {
              this.formData['formData' + reportIndex][item.itemId]['data' + (1 + amtIndex)] = item['data' + (1 + amtIndex)];
            }
          }
        }
      }
    },
    /**
         * 输入框数据格式化
         */
    inputChange: function (arg, reportIndex, item, index) {
      let val = this.formData['formData' + reportIndex][item]['data' + index];
      if (isNaN(val) || val.trim() === '') {
        this.formData['formData' + reportIndex][item]['data' + index] = '0.00';
      }
    },
    /** 审核信息**/
    saveCheckFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 是否经过审计 为否时，清除审计信息
      if (model.statIsAudit === '0') {
        model.statAdtEntr = '';
        model.statAdtConc = '';
      }
      // 是否经过调整 为否时，清除调整信息
      if (model.statIsAdjt === '0') {
        model.statAdjRsn = '';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: this.dataUrlSave,
        data: model,
        callback: function (code, message, response) {
          _this.$message('保存成功');
        }
      });
    },
    /**
         * 是否经过审计 change事件
         */
    statIsAuditFn: function (val) {
      if (val === '1') {
        this.statIsAuditHidden = false;
      } else {
        this.statIsAuditHidden = true;
      }
    },
    /**
         * 是否经过调整 change事件
         */
    statIsAdjtFn: function (val) {
      if (val === '1') {
        this.statIsAdjtHidden = false;
      } else {
        this.statIsAdjtHidden = true;
      }
    },
    cloneNew: function (obj, src, dest) {
      var result = {};
      if (typeof obj == 'object') {
        result = yufp.clone(obj, src);
      } else if (typeof obj === 'boolean') {
        result = obj === true ? this.extendMix(true, dest, src) : yufp.clone(src, dest);
      } else {
        yufp.logger.error('clone方法目前只支持对象!');
      }
      return result;
    },
    /**
   * 继承（是否深度拷贝,dest,src1,src2,src3...）
   */
    extendMix: function (flag, dest, src) {
      var args = [flag, dest, src];
      var target = args[0] || {};
      var i = 1;
      var length = args.length;
      var deep = false;
      // Handle a deep copy situation
      if (typeof target === 'boolean') {
        deep = target;
        // Skip the boolean and the target
        target = args[i] || {};
        i++;
      }
      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== 'object' && !yufp.isFunction(target)) {
        target = {};
      }
      // Extend itself if only one argument is passed
      var _this = this;
      if (i === length) {
        target = _this;
        i--;
      }
      for (; i < length; i++) {
        let options = args[i];
        // Only deal with non-null/undefined values
        if (options == null || options == undefined) {
          continue;
        }
        // Extend the base object
        for (let key in options) {
          let src = target[key];
          let copy = options[key];
          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          let copyIsArray = false;
          if (deep && copy && target.hasOwnProperty(key) && (typeof copy === 'object' || (copyIsArray = src instanceof Array))) {
            let clone = null;
            if (copyIsArray) {
              clone = src && (src instanceof Array) ? src : [];
            } else {
              clone = src && typeof src === 'object' ? src : {};
            }
            // Never move original objects, clone them
            target[key] = this.extend(deep, clone, copy);
          // Don't bring in undefined values
          } else if (copy !== undefined && target.hasOwnProperty(key)) {
            target[key] = copy;
          }
        }
      }
      // Return the modified object
      return target;
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
    // 财务报表审核信息 tab 赋值
    this.cloneNew(true, data, this.formdata);
    if (data.pageType === '2') {
      this.showBtn = true;
    }
    if (reportInfo[0]) {
      this.activeName = reportInfo[0].reportIndex;
    } else {
      this.activeName = '100';
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