
<template>
  <!--
    @created by 张亮
    @description 省心快贷押品查封审核
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待发起" name="messageTip">
        <yu-panel title="待发起" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户号" placeholder="客户号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="合同号" placeholder="合同号" ctype="input" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户经理号" placeholder="客户经理号" ctype="input" name="managerId"></yu-xform-item>
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
            <yu-xtable-column label="主键" prop="pkId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="中文合同号" prop="contNoCn" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="contStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="contEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管护机构" prop="managerBrId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="申请历史" name="deal">
        <yu-panel title="申请历史" hideFilter="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refDealTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户号" placeholder="客户号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="合同号" placeholder="合同号" ctype="input" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户经理号" placeholder="客户经理号" ctype="input" name="managerId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="infoFnHis" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="主键" prop="pkId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="中文合同号" prop="contNoCn" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="contStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="contEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管护机构" prop="managerBrId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!--新增向导-->
    <yu-xdialog title="省心快贷向导" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group column="1">
          <yu-xform-item label="合同号" rules="required" ctype="input" name="contNo" disabled colspan="20"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="contNo" colspan="2">
            <yu-button type="primary" @click="selectContNo">选择</yu-button>
          </yu-xform-item>
          <yu-xform-item label="中文合同号" ctype="input" name="contNoCn" disabled ></yu-xform-item>
          <yu-xform-item label="客户号" ctype="input" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" :min="0" disabled></yu-xform-item>
          <yu-xform-item label="合同余额" ctype="yu-currency" name="contBalance" :min="0" disabled v-if="false"></yu-xform-item>
          <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate" disabled ></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="nextFn">下一步</yu-button>
          <yu-button @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-xdialog title="省心快贷合同信息" ref="contDialog" :visible.sync="showDialog" width="1500px" height="800px">
      <yu-xform related-table-name="contTable" form-type="search" v-model="searchFormdataCont" label-width="60px">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="contTable" condition-key="condition" row-number :data-url="dataContList" :base-params="contParams" :default-load="true" requestType="POST" size="full">
        <yu-xtable-column label="合同号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="中文合同号" prop="contCnNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" prop="contEndDate" ></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons align="center">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="back">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/guargcfapp/guarGcfApplist',
      dataHisUrl: backend.cmisBiz + '/api/guargcfapp/guarGcfAppHislist',
      dataContList: backend.cmisBiz + '/api/ctrloancont/selectWorryFreeLoanContinfo',
      activeName: 'messageTip',
      searchFormdata: {},
      searchFormdataCont: {},
      showDialog: false,
      formdata: {},
      baseParams: {},
      contParams: {},
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
      saveBtnShow: true,
      topOutsystemCode: 'SXKDCF;'
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
      params['model_group_no'] = 'CMG000726';
      params['topOutsystemCode'] = _this.topOutsystemCode;
      params['serno'] = params.pkId;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.contNo,
        docid: params.serno
      };
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '省心快贷押品查封审核',
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
      params['model_group_no'] = 'CMG000726';
      params['topOutsystemCode'] = _this.topOutsystemCode;
      params['serno'] = params.pkId;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.contNo,
        docid: params.serno
      };
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '省心快贷押品查封审核',
        data: params
      });
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
     * 下一步，保存
     */
    nextFn: function () {
      var _this = this;
      var model = _this.$refs.refForm.formdata;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
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
        url: this.$backend.cmisBiz + '/api/guargcfapp/insertGuarGcfApp',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            // 20030查到未查封  20031未查到信息 20033存在查封
            if (rtnData.rtnCode == '20030') {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
              _this.dialogVisible = false;
              _this.$refs.refTable.remoteData();
              _this.$refs.refDealTable.remoteData();
            } else if (rtnData.rtnCode == '20031') {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
              this.dialogVisible = false; // 关闭下一步导向也页面
              let jsoPar = model;
              jsoPar['model_group_no'] = 'CMG000726';
              jsoPar['op'] = 'EDIT';
              jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
              jsoPar['serno'] = rtnData.pkId;
              jsoPar['imageParams'] = {
                contid: jsoPar.contNo,
                businessid: jsoPar.contNo,
                docid: jsoPar.serno
              };
              var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              _this.$router.addTab({
                name: path,
                key: jsoPar.serno + jsoPar.op,
                title: '押品查封审核详细页面',
                data: jsoPar
              });
            } else if (rtnData.rtnCode == '20033') {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
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
     * 省心快贷合同信息返回
     */
    back: function () {
      var _this = this;
      _this.showDialog = false;
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
              url: backend.cmisBiz + '/api/guargcfapp/guarGcfAppdelete',
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
    },

    /**
     * 省心快贷合同信息选择页面显现
     */
    selectContNo: function () {
      var _this = this;
      _this.showDialog = true;
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
      _this.formdata.contNoCn = selections[0].contCnNo;
      yufp.clone(selections[0], _this.formdata);
    },

    /**
     * 修改
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
      jsoPar['model_group_no'] = 'CMG000726';
      jsoPar['op'] = 'EDIT';
      jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      jsoPar['serno'] = jsoPar.pkId;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '省心快贷押品查封审核',
        data: params
      });
    }
  }
};

</script>
