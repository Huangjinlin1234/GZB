<template>
  <!--
    @created by chenglong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 银承出账通知 待出账 出账历史列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待出账" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item placeholder="合同编号" ctype="input" name="contNo" label="合同编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="客户编号" ctype="input" name="cusId" label="客户编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="客户名称" ctype="input" name="cusName" label="客户名称" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="出账流水号" ctype="input" name="pvpSerno" label="出账流水号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="业务流水号" ctype="input" name="tranSerno" label="业务流水号" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="notifyFn" type="primary" :disabled="isSuccessSend" v-if="checkCtrl('sendpj')">发送票据系统出账</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="baseParams" request-type="POST">
            <yu-xtable-column label="出账流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="tranSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="tranAmt" width="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="出账日期" prop="tranDate"></yu-xtable-column>
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
              <yu-xform-item placeholder="合同编号" ctype="input" name="contNo" label="合同编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="客户编号" ctype="input" name="cusId" label="客户编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="客户名称" ctype="input" name="cusName" label="客户名称" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="出账流水号" ctype="input" name="pvpSerno" label="出账流水号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="业务流水号" ctype="input" name="tranSerno" label="业务流水号" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refDealTable" condition-key="condition" row-number :base-params="baseParams" :data-url="dataUrls" request-type="POST">
            <yu-xtable-column label="出账流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="tranSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="tranAmt" width="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="出账日期" prop="tranDate"></yu-xtable-column>
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
lookup.reg('STD_ZB_AUTH_ST,STD_ZB_CUR_TYP,STD_TRADE_STATUS,STD_ZB_AUTH_TYPE');
export default {
  data: function () {
    return {
      baseParams: {sort: 'tranDate desc'},
      dataUrl: backend.cmisBiz + '/api/pvpauthorize/tosignaccplist',
      dataUrls: backend.cmisBiz + '/api/pvpauthorize/donesignaccplist',
      activeName: 'messageTip',
      isSuccessSend: false
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 通知票据系统出账
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
      // 授权状态 authStatus(00-未授权 01-授权失败 02-已授权 03-授权已撤销 04-失败已重发)
      // 出账状态 tradeStatus （1-未出账 2-已出账 3-冲正申请中 4-已冲正）
      // debugger
      // if (selectionsAry[0].authStatus != '02' || selectionsAry[0].tradeStatus != '1') {
      //   _this.$message({
      //     message: '只能对出账状态=未出账，授权状态=未授权的数据通知票据出账',
      //     type: 'warning'
      //   });
      //   return;
      // }
      // 票据系统出账
      _this.isSuccessSend = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpauthorize/sendbill',
        data: selectionsAry[0],
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.rtnCode == '0000') {
              _this.$message({ message: '银票出账成功', type: 'success' });
              _this.isSuccessSend = false;
              _this.$refs.refTable.remoteData();
              _this.$refs.refDealTable.remoteData();
            } else {
              _this.$message({ message: response.data.rtnMsg, type: 'error' });
              _this.isSuccessSend = false;
            }
          } else {
            _this.$message({message: response.data.rtnMsg, type: 'error'});
            _this.isSuccessSend = false;
          }
        }
      });
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
