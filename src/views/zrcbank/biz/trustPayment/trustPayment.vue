<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账通知
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="待出账" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable1" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item placeholder="模糊查询" ctype="input"  name="contNo" label="合同编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="模糊查询" ctype="input"  name="cusId" label="客户编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="模糊查询" ctype="input"  name="cusName" label="客户名称" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
           <yu-button @click="infosFn(1)">查看</yu-button>
           <!--<yu-button @click="notifyFn">查询二代受托支付结果</yu-button>-->
           <yu-button @click="notifyFn(1)" type="primary" >查询二代受托支付结果</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable1" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" selection-type="radio">
            <yu-xtable-column label="业务流水号" prop="serno" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易对手账户" prop="toppAccno" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易对手名称" prop="toppName" width="120"></yu-xtable-column>
            <yu-xtable-column label="开户行行号" prop="toppBankNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="开户行名称" prop="toppBankName" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易对手金额" prop="toppAmt" width="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="开户行行号" prop="toppBankNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="状态" prop="status" width="120" data-code="TOPP_ACC_STATUS"></yu-xtable-column>
            <yu-xtable-column label="原因一" prop="reasonFirst" width="120"></yu-xtable-column>
            <yu-xtable-column label="原因二" prop="reasonSecond" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" width="120"></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" width="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="出账历史" name="deal">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable2" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item placeholder="模糊查询" ctype="input" name="contNo" label="合同编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="模糊查询" ctype="input" name="cusId" label="客户编号" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="模糊查询" ctype="input" name="cusName" label="客户名称" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yu-button @click="infosFn(2)">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable2" row-number condition-key="condition" :data-url="dataHisUrl" request-type="POST" style="margin-top: 10px" selection-type="radio">
            <yu-xtable-column label="业务流水号" prop="serno" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易对手账户" prop="toppAccno" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易对手名称" prop="toppName" width="120"></yu-xtable-column>
            <yu-xtable-column label="开户行行号" prop="toppBankNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="开户行名称" prop="toppBankName" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易对手金额" prop="toppAmt" width="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="开户行行号" prop="toppBankNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="状态" prop="status" width="120" data-code="TOPP_ACC_STATUS"></yu-xtable-column>
            <yu-xtable-column label="原因一" prop="reasonFirst" width="120"></yu-xtable-column>
            <yu-xtable-column label="原因二" prop="reasonSecond" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" width="120"></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" width="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import { lookup } from '@/utils';
yufp.lookup.reg('TOPP_ACC_STATUS');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/toppaccpaydetail/toppDetailList',
      dataHisUrl: backend.cmisBiz + '/api/toppaccpaydetail/toppDetailHisList',
      activeName: 'messageTip'
    };
  },
  methods: {

    // 查看
    infosFn: function (index) {
      var _this = this;
      var selectionsArray = _this.$refs['refTable' + index].selections;
      if (selectionsArray.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称,菜单路径
          name: 'zrcbank/biz/trustPayment/trustPaymentDetail',
          // 自定义唯一页签key,必传，请统一使用custom_前缀开头
          key: 'custom_' + selectionsArray[0].serno,
          // 页签名称
          title: '受托支付模块详情',
          // 传递的业务数据，可选配置
          data: {
            viewType: 'EDIT',
            serno: selectionsArray[0].serno
          }
        });
      });
    },
    // 查询二代受托支付结果
    notifyFn: function (index) {
      var _this = this;
      var selectionsAry = _this.$refs['refTable' + index].selections;
      if (selectionsAry.length !== 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      //  状态 （0-待处理 1-处理中 2-成功 3-失败）
      if (selectionsAry[0].status !== '1' && selectionsAry[0].status !== '3') {
        _this.$message({
          message: '只能对状态是处理中或者失败的件的进行操作',
          type: 'warning'
        });
        return;
      }
      // 查询二代受托支付结果
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/toppaccpaydetail/selectToppAccPayResult',
        data: selectionsAry[0].serno,
        callback: function (code, message, response) {
          if (code === 200) {
            _this.$refs.refTable1.remoteData();
            _this.$message({
              message: response.message,
              type: 'success'
            });
          } else {
            _this.$refs.refTable1.remoteData();
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
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
