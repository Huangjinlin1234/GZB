approveStatus<template>
  <div>
    <yu-panel title="修改受托账号申请历史列表" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop>
          <yu-button @click="doCore">通知核心</yu-button>
          <yu-button ref="btn_doViewHis" @click="customClick('doViewHis')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'approveStatus':'997 or approveStatus'}" :default-load="true" request-type="POST">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="交易对手账户" prop="toppAccno"></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
        <yu-xtable-column label="交易对手金额" prop="toppAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="授权状态" prop="authStatus" width="100" data-code="STD_AUTH_STATUS"></yu-xtable-column>
        <yu-xtable-column label="审批状态 " prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_AUTH_STATUS');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D12BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/donesignlist',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/delete/'
    };
  },
  methods: {
    // 通知核心
    doCore: function () {
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
      if (selectionsAry[0].authStatus != '00') {
        _this.$message({
          message: '只能对未授权的数据通知核心',
          type: 'warning'
        });
        return;
      }
      // 核心出账
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpchgtrupayacctapp/sendcore',
        data: selectionsAry[0],
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message({ message: '通知成功', type: 'success' });
          } else {
            _this.$message({
              message: response.data.rtnMsg,
              type: 'error'
            });
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