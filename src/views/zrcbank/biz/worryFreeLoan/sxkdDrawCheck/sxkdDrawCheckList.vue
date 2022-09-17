
<template>
  <!--
    @created by zhangliang15
    @description 省心快贷提款审核
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="未发放" name="messageTip">
        <yu-panel title="未发放" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户号" placeholder="客户号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="放款时间" placeholder="放款时间" ctype="input" name="pvpDate"></yu-xform-item>
              <yu-xform-item label="客户经理号" placeholder="客户经理号" ctype="input" name="managerId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="updateFn" type="primary" v-if="checkCtrl('approve')">审核</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST"
           selection-type="radio" :pageable="true"  :base-params="baseParams" :default-load="true"
          >
            <yu-xtable-column label="主键" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="出账申请流水" prop="pvpSerno" width:="120" ></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="中文合同号" prop="contCnNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="借据号" prop="billNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="放款金额" prop="pvpAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="放款时间" prop="pvpDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="借据到期日" prop="billEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管护机构" prop="managerBrId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核日期" prop="auditDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核状态" prop="auditStatus" data-code="STD_ZB_AUDIT" width:="120"></yu-xtable-column>
            <yu-xtable-column label="放款状态" prop="pvpStatus" data-code="STD_ZB_LOAN_STATUS" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="申请历史" name="deal">
        <yu-panel title="申请历史" hideFilter="false">
         <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户号" placeholder="客户号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="提款时间" placeholder="提款时间" ctype="input" name="pvpDate"></yu-xform-item>
              <yu-xform-item label="客户经理号" placeholder="客户经理号" ctype="input" name="managerId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="notifyFn" type="primary" v-if="checkCtrl('setcore')">发送核心放款</yu-button>
            <yu-button @click="logoutFn" type="primary" v-if="checkCtrl('logout')">撤销出账</yu-button>
            <yu-button @click="infoFnHis" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST"
           selection-type="radio" :pageable="true"  :base-params="baseHisParams" :default-load="true"
          >
            <yu-xtable-column label="主键" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="出账申请流水" prop="pvpSerno" width:="120" ></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="中文合同号" prop="contCnNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="借据号" prop="billNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="放款金额" prop="pvpAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="放款时间" prop="pvpDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="借据到期日" prop="billEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管护机构" prop="managerBrId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核日期" prop="auditDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审核状态" prop="auditStatus" data-code="STD_ZB_AUDIT" width:="120"></yu-xtable-column>
            <yu-xtable-column label="放款状态" prop="pvpStatus" data-code="STD_ZB_LOAN_STATUS" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
</div>
</template>
<script>
yufp.lookup.reg('STD_ZB_AUDIT,STD_ZB_LOAN_STATUS,STD_ZB_APPR_STATUS');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/sxkddrawcheck/sxkdDrawChecklist',
      dataHisUrl: backend.cmisBiz + '/api/sxkddrawcheck/sxkdDrawCheckHislist',
      activeName: 'messageTip',
      searchFormdata: {},
      showDialog: false,
      formdata: {},
      baseParams: {},
      baseHisParams: {},
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
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000727';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '省心快贷提款审核',
        data: params
      });
    },

    /**
     * 历史列表查看
     */
    infoFnHis: function () {
      let _this = this;
      let selections = _this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000727';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '省心快贷申请历史提款审核',
        data: params
      });
    },

    /**
     *  撤销出账
     */
    logoutFn: function () {
      let _this = this;
      let selections = _this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      // 放款状态STD_ZB_LOAN_STATUS:2放款成功 1未放款
      if (selections[0].pvpStatus == '2') {
        this.$xutils.showMsgBox('提示', '出账成功，无法撤销出账!');
        return;
      }
      _this.$confirm('此操作将撤销该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/sxkddrawcheck/sxkdDrawCheckBackOut',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data.rtnCode == '000000') {
                    _this.$refs.refDealTable.remoteData();
                    _this.$xutils.showMsgBox('提示', '撤销成功!', 350, 150);
                  } else {
                    _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                  }
                } else {
                  _this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
                }
              }
            });
          }
        }
      });
    },

    /**
     *  发送核心出账
     */
    notifyFn: function () {
      var _this = this;
      let selections = _this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      // 审核状态STD_ZB_AUDIT 1:通过 0：不通过
      if (selections[0].auditStatus == '0') {
        this.$xutils.showMsgBox('提示', '该笔申请审核没有通过无法进行出账！');
        return;
      }
      if (selections[0].pvpDate != selections[0].auditDate) {
        this.$xutils.showMsgBox('提示', '放款日期与审核日期不一致，无法出账！');
        return;
      }
      // 放款状态STD_ZB_LOAN_STATUS: 1未放款 2放款成功
      if (selections[0].pvpStatus == '2') {
        this.$xutils.showMsgBox('提示', '该记录已放款成功不能多次放款！');
        return;
      }
      // 审批状态
      if (selections[0].approveStatus == '998') {
        this.$xutils.showMsgBox('提示', '该记录已经撤销出账成功，不能进行放款！');
        return;
      }
      _this.$confirm('此操作将发送核心放款, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/sxkddrawcheck/sxkdToHxFk',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data.rtnCode == '000000') {
                    _this.$refs.refDealTable.remoteData();
                    _this.$xutils.showMsgBox('提示', '放款成功!', 350, 150);
                  } else {
                    _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                  }
                } else {
                  _this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
                }
              }
            });
          }
        }
      });
    },
    /**
         * 取消
         */
    cancelFn: function () {
      let _this = this;
      _this.dialogVisible = false;
      _this.$refs.refTable.remoteData();
    },

    refTableData: function () {
      let _this = this;
      _this.$refs.refTable.remoteData();
    },

    /**
    * 审核
    */
    updateFn: function () {
      let _this = this;
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      if (params.approveStatus == '111') {
        this.$xutils.showMsgBox('提示', '当前审批状态不可进行当前操作,请重试!');
        return;
      }
      let jsoPar = params;
      jsoPar['model_group_no'] = 'CMG000727';
      jsoPar['op'] = 'view'; // 交易对手明细增删改按钮隐藏，且提款审核修改可编辑
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '省心快贷提款审核',
        data: params
      });
    }
  }
};

</script>
