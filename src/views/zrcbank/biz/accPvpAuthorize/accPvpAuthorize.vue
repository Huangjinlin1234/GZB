<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账通知
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待出账" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item placeholder="出账流水号" ctype="input" name="pvpSerno" label="出账流水号"></yu-xform-item>
              <yu-xform-item placeholder="合同编号" ctype="input" name="contNo" label="合同编号"></yu-xform-item>
              <yu-xform-item placeholder="客户编号" ctype="input" name="cusId" label="客户编号"></yu-xform-item>
              <yu-xform-item placeholder="客户名称" ctype="input" name="cusName" label="客户名称" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="notifyFn" type="primary" :disabled="isSuccessSend" v-if="checkCtrl('sendcore')">发送核心出账</yu-button>
            <yu-button @click="handInvalidFn" type="primary" :disabled="isSuccessSend" v-if="checkCtrl('cancel')">手工作废</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" selection-type="radio">
            <yu-xtable-column label="出账流水号" prop="pvpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="tranSerno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" ></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="出账金额" prop="tranAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="出账日期" prop="tranDate"></yu-xtable-column>
            <yu-xtable-column label="授权状态" prop="authStatus" data-code="STD_AUTH_STATUS"></yu-xtable-column>
            <yu-xtable-column label="出账状态" prop="tradeStatus" data-code="STD_TRADE_STATUS">
               <template slot-scope="scope">
                <yu-tag :type="scope.row.tradeStatus == '2' ? 'success':'error'"  close-transition>{{ scope.row.tradeStatus=='2' ? '已出账': '未出账' }}</yu-tag>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="出账失败原因" prop="returnDesc" :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                 <yu-button @click="showdetails(scope.row.returnDesc)" type="warning"  size="mini" >查看详情</yu-button>
              </template>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="出账历史" name="deal">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refDealTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item placeholder="出账流水号" ctype="input" name="pvpSerno" label="出账流水号"></yu-xform-item>
              <yu-xform-item placeholder="合同编号" ctype="input" name="contNo" label="合同编号"></yu-xform-item>
              <yu-xform-item placeholder="客户编号" ctype="input" name="cusId" label="客户编号"></yu-xform-item>
              <yu-xform-item placeholder="客户名称" ctype="input" name="cusName" label="客户名称" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yu-button type="primary" @click="infosFn" v-if="checkCtrl('hisview')">查看</yu-button>
            <yu-button type="primary" @click="retailCz" v-if="checkCtrl('hiscancel')">冲正</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refDealTable" row-number condition-key="condition" :data-url="dataUrls" request-type="POST" style="margin-top: 10px" selection-type="radio">
            <yu-xtable-column label="出账流水号" prop="pvpSerno"  ></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="tranSerno"  ></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"  ></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"  ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"  ></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"  ></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP" ></yu-xtable-column>
            <!--<yu-xtable-column label="担保方式" prop="guarMode"   data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>-->
            <yu-xtable-column label="出账金额" prop="tranAmt"   :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"   hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId"   hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId"   hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"  ></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"  ></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"  ></yu-xtable-column>
            <yu-xtable-column label="出账日期" prop="tranDate"></yu-xtable-column>
            <yu-xtable-column label="授权状态" prop="authStatus" data-code="STD_AUTH_STATUS"></yu-xtable-column>
            <yu-xtable-column label="出账状态" prop="tradeStatus" data-code="STD_TRADE_STATUS">
              <template slot-scope="scope">
                <yu-tag :type="scope.row.tradeStatus == '2' ? 'success':'error'"  close-transition>{{ scope.row.tradeStatus=='2' ? '已出账': '未出账' }}</yu-tag>
              </template>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import { lookup, sessionStore } from '@/utils';
lookup.reg('STD_ZB_AUTH_ST,STD_ZB_CUR_TYP,STD_TRADE_STATUS,STD_ZB_GUAR_WAY,STD_PRD_TYPE_PROP,STD_AUTH_STATUS');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/pvpauthorize/toAccPvpAuthorize',
      dataUrls: backend.cmisBiz + '/api/pvpauthorize/doneAccPvpAuthorize',
      activeName: 'messageTip',
      isSuccessSend: false,
      flag: true
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 查看
    infosFn: function () {
      var _this = this;
      var selectionsArray = _this.$refs.refDealTable.selections;
      if (selectionsArray.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        // this.$dialog.open('贷款出账通知详情', 'zrcbank/biz/pvpLoanApp/toppAcctSubView', 900, 400, {
        //   pkId: _this.$refs.refTable.selections[0].pkId
        // });
        this.$router.addTab({
          // 路由名称,菜单路径
          name: 'zrcbank/biz/accPvpAuthorize/accPvpAuthorizeView',
          // 自定义唯一页签key,必传，请统一使用custom_前缀开头
          key: 'custom_' + _this.$refs.refDealTable.selections[0].tranSerno,
          // 页签名称
          title: '贷款出账通知详情',
          // 传递的业务数据，可选配置
          data: {
            viewType: 'EDIT',
            tranSerno: _this.$refs.refDealTable.selections[0].tranSerno
          }
        });
      });
    },

    // 通知核心系统出账
    notifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      _this.isAllow(selectionsAry[0]);
      // 是否允许发送核心（冲正和作废不允许再发起）
      if (_this.flag == false) {
        _this.$message({
          message: '该笔业务状态为已作废，无法进行【发送核心出账】操作！',
          type: 'warning'
        });
        return;
      }
      if (selectionsAry[0].tradeStatus != '1') {
        _this.$message({
          message: '只能对【未发送核心出账】的数据通知核心出账！',
          type: 'warning'
        });
        return;
      }
      if (selectionsAry[0].authStatus == '9') {
        _this.$message({
          message: '该笔业务状态为已冲正，无法进行【发送核心出账】操作！',
          type: 'warning'
        });
        return;
      }
      _this.isSuccessSend = true;
      // 核心出账
      this.$request({
        url: backend.cmisBiz + '/api/pvpauthorize/sendAuthToCoreForXd',
        method: 'POST',
        data: selectionsAry[0]
      }).then(({code, message, data}) => {
        if (data != null) {
          _this.$message({
            message: message,
            type: 'success'
          });
          _this.isSuccessSend = false;
          _this.$refs.refTable.remoteData();
        } else {
          // 失败
          _this.$message({
            message: message,
            type: 'warning'
          });
          _this.isSuccessSend = false;

          _this.$refs.refTable.remoteData();
        }
      }).catch(() => {
        _this.isSuccessSend = false;
        _this.$refs.refTable.remoteData();
      });
    },

    // 判断台账状态是否为【作废】
    isAllow (data) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/accloan/selectbybill',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            let accStatus = response.data.accStatus;
            if (accStatus == '9') {
              _this.flag = false;
            } else {
              _this.flag = true;
            }
          }
        }}
      );
    },

    // 冲正处理
    retailCz () {
      var _this = this;
      var selectionsAry = _this.$refs.refDealTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      var pvpAuthorize = selectionsAry[0];
      if (pvpAuthorize.tradeStatus != '2') {
        _this.$message({
          message: '只能对【已发送核心校验成功】的记录冲正！',
          type: 'warning'
        });
        return;
      }
      _this.isAllow(selectionsAry[0]);
      if (_this.flag == false) {
        _this.$message({
          message: '该笔业务状态为已作废，无法进行【冲正】操作！',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpauthorize/retailcz',
        data: pvpAuthorize,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({
              message: response.message,
              type: 'success'
            });
            _this.$refs.refTable.remoteData();
            _this.$refs.refDealTable.remoteData();
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
            _this.$refs.refTable.remoteData();
            _this.$refs.refDealTable.remoteData();
          }
        }}
      );
    },

    // 手工作废
    handInvalidFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      var pvpAuthorize = selections[0];
      if (pvpAuthorize.tradeStatus != '1') {
        _this.$message({ message: '只能作废【未发送核心出账】的记录！', type: 'warning' });
        return;
      }
      if (pvpAuthorize.authStatus == '9') {
        _this.$message({
          message: '该笔业务状态为已冲正，无法进行【手工作废】操作！',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否需要作废?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: pvpAuthorize,
              url: backend.cmisBiz + '/api/pvpauthorize/handinvaild',
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({message: '作废成功！', type: 'success'});
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({ message: '作废失败！', type: 'error' });
                  _this.$refs.refTable.remoteData();
                }
              }
            });
          }
        }
      });
    },

    flashList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
      _this.$refs.refDealTable.remoteData();
    },
    // 显示出账详情
    showdetails: function (val) {
      this.$message({ message: val, type: 'warning' });
    },
    // 表格金额字段处理
    formatNumber: function (format, sort) {
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
        return _this.number(val, format);
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
    number: function (v, format) {
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


  }
};
</script>
