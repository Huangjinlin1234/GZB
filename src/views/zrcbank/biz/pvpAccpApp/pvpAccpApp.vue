<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 银承出账待发起申请列表   银承出账已处理申请列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待发起" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="pvpSerno"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="资料全否" placeholder="资料全否" ctype="select" name="fileSufFlag" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="是否电子票据" placeholder="是否电子票据" ctype="select" name="isEDrft" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFn"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="handInvalidFn" v-if="checkCtrl('cancel')">手工作废</yu-button>
            <yu-button type="primary" @click="viewInfoFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="printFn" v-if="checkCtrl('print')">单次承兑签发合同书打印</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="pvpSerno" width="110"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="110"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="110"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="110"></yu-xtable-column>
            <yu-xtable-column label="合同类型" prop="contType" width="110" hide-column></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="appAmt" width="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="申请汇票数" prop="applyPorder" width="120"></yu-xtable-column>
            <yu-xtable-column label="是否电子票据" prop="isEDrft" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="资料全否" prop="fileSufFlag" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="影像流水号" prop="wyImageSerno" width="120" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已处理" name="deal">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refDealTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="pvpSerno"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="资料全否" placeholder="资料全否" ctype="select" name="fileSufFlag" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="是否电子票据" placeholder="是否电子票据" ctype="select" name="isEDrft" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFn"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="viewDealInfoFn" class="el-icon-share" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" condition-key="condition" row-number :data-url="dataHisUrl" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="pvpSerno" width="110"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" sortable></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="110"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="110"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" width="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="appAmt" width="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="申请汇票数" prop="applyPorder" width="120"></yu-xtable-column>
            <yu-xtable-column label="是否电子票据" prop="isEDrft" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="资料全否" prop="fileSufFlag" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="影像流水号" prop="wyImageSerno" width="120" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_APPR_STATUS,STD_ZB_GUAR_WAY,STD_PRD_TYPE_PROP');

export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/pvpaccpapp/tosignlist',
      dataHisUrl: backend.cmisBiz + '/api/pvpaccpapp/donesignlist',
      activeName: 'messageTip',
      topOutsystemCode: 'CDHPDY',
      topOutsystemCodeCopy: 'CDHPCZJB;CDHPDY;CDHPZY;CDHPBZDB;CDHPDCCZ'
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == '000') {
          return true;
        }
        return false;
      });
    },

    // 字典项过滤
    datacodeFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key != '000') {
          return true;
        }
        return false;
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
    },


    handleClick: function (tab, event) {},

    // 手工作废
    handInvalidFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selections[0].approveStatus == '111') {
        _this.$message({ message: '审批中的数据无法作废！', type: 'warning' });
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
              data: selections[0].pvpSerno,
              url: backend.cmisBiz + '/api/pvpaccpapp/handinvaild',
              callback: function (code, message, response) {
                if (code == '0') {
                  _this.$message({
                    message: '作废成功！',
                    type: 'success'
                  });
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({ message: '作废失败！', type: 'error' });
                }
              }
            });
          }
        }
      });
    },

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
      if (jsoPar.approveStatus == '111') {
        _this.$message({
          message: '【审批中】的数据不可修改！',
          type: 'warning'
        });
        return;
      }
      jsoPar['model_group_no'] = 'CMG000608';
      jsoPar['op'] = 'EDIT';
      jsoPar.imageType = '2';
      jsoPar['imageCopyParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.wyImageSerno,
        docid: jsoPar.pvpSerno
      };
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.pvpSerno,
        docid: jsoPar.pvpSerno
      };
      jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy;
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, jsoPar, true, true);
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.pvpSerno + jsoPar.op,
        title: '银承出账详情',
        data: jsoPar
      });
    },

    // 银承待发起查看
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
      jsoPar['model_group_no'] = 'CMG000608';
      jsoPar['op'] = 'VIEW';
      jsoPar.imageType = '2';
      jsoPar['imageCopyParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.wyImageSerno,
        docid: jsoPar.pvpSerno
      };
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.pvpSerno,
        docid: jsoPar.pvpSerno
      };
      jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy;
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, jsoPar, true, true);
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.pvpSerno + jsoPar.op,
        title: '银承出账详情',
        data: jsoPar
      });
    },

    // 银承已处理查看
    viewDealInfoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refDealTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let jsoPar = _this.$refs.refDealTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000608';
      jsoPar['op'] = 'VIEW';
      jsoPar['imageCopyParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.wyImageSerno,
        docid: jsoPar.pvpSerno
      };
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.pvpSerno,
        docid: jsoPar.pvpSerno
      };
      jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy;
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, jsoPar, true, true);
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.pvpSerno + jsoPar.op,
        title: '银承出账详情',
        data: jsoPar
      });
    },
    // 单次承兑签发合同书打印
    printFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var params = _this.$refs.refTable.selections[0];
      // if (params.contType != '3') {
      //   _this.$message({ message: '该出账申请不是基于最高授信协议下出账！', type: 'warning' });
      //   return;
      // }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemodccdqfht';
      let cptName = '';
      if (params.contType == '1') {
        cptName = 'ybqfyhcdhp.cpt' + '&contNo=' + params.contNo;
      } else {
        cptName = 'qfyhcdhpht.cpt' + '&pvpSerno=' + params.pvpSerno;
      }
      params.src = _this.$backend.frptRptService + cptName;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '单次承兑签发合同书',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
