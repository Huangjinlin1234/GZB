
<template>
  <!--
    @created by 张亮
    @description 省心快贷利率修改
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="省心快贷线上合同修改申请" name="messageTip">
        <yu-panel title="省心快贷线上合同修改申请" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="合同号" placeholder="合同号" ctype="input" name="contNo"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="addFn" type="primary" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button @click="updateFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="deleteFn" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST"
           selection-type="radio" :pageable="true"  :base-params="baseParams" :default-load="true"
          >
            <yu-xtable-column label="流水号" prop="serno" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="业务申请流水号" prop="iqpSerno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同类型" prop="contType" width:="120" data-code="STD_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="产品属性" prop="prdTypeProp" width:="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="inputId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width:="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="申请历史" name="deal">
        <yu-panel title="申请历史" hideFilter="false">
             <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refDealTable">
              <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="合同号" placeholder="合同号" ctype="input" name="contNo"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
        <yu-toolbar>
          <yu-button @click="infoFnHis"  type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
        </yu-toolbar>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="流水号" prop="serno" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="业务申请流水号" prop="iqpSerno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同类型" prop="contType" width:="120" data-code="STD_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="产品属性" prop="prdTypeProp" width:="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="inputId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width:="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="执行利率" prop="execRateYear" width:="120"></yu-xtable-column>
            <yu-xtable-column label="更新时间" prop="updateTime" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!--新增向导-->
    <yu-xdialog title="合同列表" ref="contDialog" :visible.sync="dialogVisible" width="1500px" height="800px">
      <yu-xform related-table-name="contTable" form-type="search" v-model="searchFormdata1" label-width="60px">
        <yu-xform-group :column="3">
            <yu-xform-item label="合同号" placeholder="合同号" ctype="input" name="contNo"></yu-xform-item>
            <yu-xform-item label="客户号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="中文合同号" placeholder="中文合同号" ctype="input" name="contCnNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="contTable" condition-key="condition" row-number :data-url="ctrLoanContUrl" :base-params="ctrLoanContParams" :default-load="true" requestType="POST" size="full">
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="管护机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="中文合同编号" prop="contCnNo"></yu-xtable-column>
          <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP" ></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY" ></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
          <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="利率调整方式" prop="irAdjustType" data-code="STD_IR_ADJUST_TYPE" hide-column></yu-xtable-column>
          <yu-xtable-column label="执行年利率" prop="execRateYear" hide-column></yu-xtable-column>
          <yu-xtable-column label="利率区间" prop="lprRateIntval" data-code="STD_LPR_RATE_INTVAL" hide-column></yu-xtable-column>
          <yu-xtable-column label="当前LPR利率" prop="curtLprRate" hide-column></yu-xtable-column>
          <yu-xtable-column label="LPR浮动点" prop="rateFloatPoint" hide-column></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="contAmt" hide-column></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons align="center">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="back">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_TYPE,STD_PRD_TYPE_PROP,STD_ZB_APPR_STATUS,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_STATUS,STD_IR_ADJUST_TYPE');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/sxkdloanratechange/selectSxkdLoanRateChangelist',
      dataHisUrl: backend.cmisBiz + '/api/sxkdloanratechange/selectSxkdLoanRateChangeHislist',
      ctrLoanContUrl: backend.cmisBiz + '/api/ctrloancont/selectSxkdContList',
      activeName: 'messageTip',
      searchFormdata: {},
      formdata: {},
      baseParams: {},
      ctrLoanContParams: {condition: {}, sort: 'serno desc'},
      customParams: {},
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
      saveBtnShow: true,
      topOutsystemCode: 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ'
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

    /**
     * 合同信息pop返回
     */
    back: function () {
      var _this = this;
      _this.showDialog = false;
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
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000728';
      params['topOutsystemCode'] = _this.topOutsystemCode;
      params['sxkdSerno'] = this.$refs.refTable.selections[0].serno;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.contNo,
        docid: params.serno
      };
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        true,
        true
      );
      // var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      // _this.$router.addTab({
      //   name: path,
      //   key: params.serno + params.op,
      //   title: '省心快贷利率修改详细页面',
      //   data: params
      // });
    },

    /**
     * 历史列表查看
     */
    infoFnHis: function () {
      let _this = this;
      let selections = this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000728';
      params['topOutsystemCode'] = _this.topOutsystemCode;
      params['sxkdSerno'] = this.$refs.refTable.selections[0].serno;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.contNo,
        docid: params.serno
      };
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        true,
        true
      );
      // var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      // _this.$router.addTab({
      //   name: path,
      //   key: params.serno + params.op,
      //   title: '省心快贷利率修改详细页面',
      //   data: params
      // });
    },

    /**
     * 选取返回
     */
    backToAdd: function () {
      var _this = this;
      var selections = _this.$refs.contTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.showDialog = false;
      var model = selections[0];
      // 登录信息
      let userInfo = this.$xutils.getLoginUserInfo();
      model.inputId = userInfo.loginCode;
      model.inputBrId = userInfo.orgCode;
      model.managerId = userInfo.loginCode;
      model.managerBrId = userInfo.orgCode;
      // 向后台发送保存请求
      this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/sxkdloanratechange/insertSxkdLoanRateChange',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.dialogVisible = false; // 关闭下一步导向也页面
              _this.$refs.refTable.remoteData();
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
            }
          } else {
            //  rtnFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
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
      let params = selections[0];
      if (params.approveStatus == '111') {
        this.$xutils.showMsgBox('提示', '当前审批状态不可进行当前操作,请重试!');
        return;
      }
      let jsoPar = params;
      jsoPar['model_group_no'] = 'CMG000728';
      jsoPar['op'] = 'EDIT';
      jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      jsoPar['sxkdSerno'] = this.$refs.refTable.selections[0].serno;
      jsoPar['imageParams'] = {
        contid: params.contNo,
        businessid: params.contNo,
        docid: params.serno
      };
      // 模板子页面修改，主页面刷新
      this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, () => {
        _this.$refs.refTable.remoteData();
      }
      );
      // var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      // _this.$router.addTab({
      //   name: path,
      //   key: jsoPar.serno + jsoPar.op,
      //   title: '省心快贷利率修改页面',
      //   data: jsoPar
      // });
    },

    /**
      * 删除
      */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selections[0].approveStatus != '000' && selections[0].approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '只有"待发起或打回"状态的申请记录才能进行删除操作,请重试!');
        return;
      }

      _this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/sxkdloanratechange/sxkdLoanRateChangedelete',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data.rtnCode == '000000') {
                    _this.$refs.refTable.remoteData();
                    _this.$xutils.showMsgBox('提示', '删除成功!', 350, 150);
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
    }
  }
};

</script>
