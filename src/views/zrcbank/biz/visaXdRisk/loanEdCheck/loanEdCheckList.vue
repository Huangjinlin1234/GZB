
<template>
  <!--
    @created by 张亮
    @description 房抵e点贷受托信息审核
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待审核" name="messageTip">
        <yu-panel title="待审核" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户号" placeholder="客户号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="合同号" placeholder="合同号" ctype="input" name="contNo"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="updateFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST"
           selection-type="radio" :pageable="true"  :base-params="baseParams" :default-load="true"
          >
            <yu-xtable-column label="流水号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户姓名" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="中文合同编号" prop="contCnNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理编号" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理名" prop="managerName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核时间" prop="auditDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核结果" prop="auditRst" width:="120" data-code="STD_ZB_AUDIT"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="审核历史" name="deal">
        <yu-panel title="审核历史" hideFilter="false">
             <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refDealTable">
              <yu-xform-group :column="4">
                <yu-xform-item label="抵押品编号" placeholder="抵押品编号" ctype="input" name="dyNo"></yu-xform-item>
                <yu-xform-item label="不动产证号" placeholder="不动产证号" ctype="input" name="bdcNo"></yu-xform-item>
                <yu-xform-item label="借款人名称" placeholder="借款人名称" ctype="input" name="jkCusName"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button @click="infoFnHis" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="流水号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户姓名" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="中文合同编号" prop="contCnNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理编号" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理名" prop="managerName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核时间" prop="auditDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核结果" prop="auditRst" width:="120" data-code="STD_ZB_AUDIT"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
</div>
</template>
<script>
yufp.lookup.reg('STD_ZB_AUDIT');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/loanedcheck/loanEdChecklist',
      dataHisUrl: backend.cmisBiz + '/api/loanedcheck/loanEdCheckHislist',
      activeName: 'messageTip',
      searchFormdata: {},
      showDialog: false,
      formdata: {},
      baseParams: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      saveBtnShow: true
    };
  },

  mounted: function () {
  },

  methods: {
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

    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000725';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '房抵e点贷受托支付信息审核',
        data: params
      });
      // this.$dialog.open(
      //   '房抵e点贷受托支付信息审核',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1500,
      //   800,
      //   params,
      //   // 列表刷新
      //   this.$refs.refTable.remoteData()
      // );
    },

    /**
     * 历史列表查看
     */
    infoFnHis: function () {
      let _this = this;
      let selections = _this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000725';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '房抵e点贷受托支付信息审核',
        data: params
      });
    },

    /**
         * 取消
         */
    cancelFn: function () {
      let _this = this;
      _this.dialogVisible = false;
      _this.$refs.refTable.remoteData();
      _this.$refs.refDealTable.remoteData();
    },

    /**
    * 修改
    */
    updateFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let jsoPar = selections[0];
      jsoPar['model_group_no'] = 'CMG000725';
      jsoPar['op'] = 'EDIT';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.serno + jsoPar.op,
        title: '房抵e点贷受托支付信息审核',
        data: jsoPar
      });
      // // 模板子页面修改，主页面刷新
      // this.$dialog.open('房抵e点贷受托支付信息审核', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, () => {
      //   this.$refs.refTable.remoteData();
      //   this.$refs.refDealTable.remoteData();
      // }
      // );
    }
  },
  watch: {
  }
};

</script>
