<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 房抵e点贷面签基本信息
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="证件号码" placeholder="证件号码" ctype="input" name="certCode"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="modifyFn" class="el-icon-edit" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="viewInfoFn" class="el-icon-share" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="baseParams" request-type="POST">
            <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
            <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
            <yu-xtable-column label="客户手机号码" prop="mobileNo"></yu-xtable-column>
            <yu-xtable-column label="管户经理编号" prop="managerId"></yu-xtable-column>
            <yu-xtable-column label="管户经理名称" prop="managerName"></yu-xtable-column>
            <yu-xtable-column label="面签时间" prop="signatureTime"></yu-xtable-column>
            <yu-xtable-column label="面签地址" prop="signatureAddr"></yu-xtable-column>
            <yu-xtable-column label="企业信息流水" prop="crpSerno"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    </yu-tabs>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_CERT_TYP');

export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/visaxdrisk/queryVisaXdRiskList',
      baseParams: {condition: {}, sort: 'serno desc'}
    };
  },
  methods: {
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
    },

    handleClick: function (tab, event) {},

    // 修改
    modifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000720';
      jsoPar['op'] = 'EDIT';
      // // 模板子页面修改，主页面刷新
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, () => {
      //   _this.$refs.refTable.remoteData();
      // }
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.serno + jsoPar.op,
        title: '对私房抵e点贷面签信息',
        data: jsoPar
      });
    },
    // 查看
    viewInfoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000720';
      jsoPar['op'] = 'VIEW';
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, jsoPar, true, true);
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.serno + jsoPar.op,
        title: '对私房抵e点贷面签信息',
        data: jsoPar
      });
    }
  }
};
</script>
