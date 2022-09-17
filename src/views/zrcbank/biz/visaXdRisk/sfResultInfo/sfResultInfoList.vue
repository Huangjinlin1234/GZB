
<template>
  <!--
    @created by 张亮
    @description 房抵e点贷尽调结果录入
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="未审批" name="messageTip">
        <yu-panel title="未审批" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="serno"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
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
            <yu-xtable-column label="业务流水号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="核心客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="身份证号" prop="certCode" width:="120"></yu-xtable-column>
            <yu-xtable-column label="手机银行录入信息是否准确" prop="isMobileBankInfo" width:="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="信息修改状态" prop="crpStatus" width:="120" data-code="STD_OUT_STATUS"></yu-xtable-column>
            <yu-xtable-column label="是否予以业务准入" prop="isAdmit" width:="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="提交时间" prop="submitDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="流程状态" prop="approveStatus" width:="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已审批" name="deal">
        <yu-panel title="已审批" hideFilter="false">
             <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refDealTable">
              <yu-xform-group :column="4">
              <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="serno"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-button @click="infoFnHis" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="核心客户号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="身份证号" prop="certCode" width:="120"></yu-xtable-column>
            <yu-xtable-column label="手机银行录入信息是否准确" prop="isMobileBankInfo" width:="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="信息修改状态" prop="crpStatus" width:="120" data-code="STD_OUT_STATUS"></yu-xtable-column>
            <yu-xtable-column label="是否予以业务准入" prop="isAdmit" width:="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="提交时间" prop="submitDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="流程状态" prop="approveStatus" width:="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!--新增向导-->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group column="1">
          <yu-xform-item label="业务流水" rules="required" ctype="input" name="serno" disabled colspan="20"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="serno" colspan="2">
            <yu-button type="primary" @click="selectRisk">选择</yu-button>
          </yu-xform-item>
          <yu-xform-item label="核心客户号" ctype="input" name="cusId" disabled colspan="22"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" colspan="22" hidden ></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" colspan="22" hidden></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" name="certCode" disabled colspan="22"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="nextFn">下一步</yu-button>
          <yu-button @click="cancelFn">返回</yu-button>
        </div>
     </yu-xform>
    </yu-xdialog>
    <yu-xdialog title="房抵e点贷面签信息列表" ref="refRiskDialog" :visible.sync="showDialog" width="1500px" height="800px">
      <yu-xform related-table-name="refRiskTable" form-type="search" v-model="searchFormdata1" label-width="60px">
        <yu-xform-group :column="3">
            <yu-xform-item label="客户号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件号码" placeholder="证件号码" ctype="input" name="certCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refRiskTable" condition-key="condition" row-number :data-url="dataVisaXdRiskList" :base-params="riskParams" :default-load="true" requestType="POST" size="full">
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
      <yu-form-buttons align="center">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="back">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_OUT_STATUS,STD_ZB_APPR_STATUS,STD_ZB_CERT_TYP');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/sfresultinfo/sfResultInfolist',
      dataHisUrl: backend.cmisBiz + '/api/sfresultinfo/sfResultInfoHislist',
      dataVisaXdRiskList: backend.cmisBiz + '/api/visaxdrisk/querySfVisaList',
      activeName: 'messageTip',
      searchFormdata: {},
      showDialog: false,
      formdata: {},
      baseParams: {},
      riskParams: {condition: {managerId: this.$xutils.getLoginUserInfo().loginCode}, sort: 'serno desc'},
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
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
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
    back: function () {
      var _this = this;
      _this.showDialog = false;
    },
    /**
     * 面签信息选择页面显现
     */
    selectRisk: function () {
      var _this = this;
      _this.showDialog = true;
    },
    /**
     * 选取返回
     */
    backToAdd: function () {
      var _this = this;
      var selections = _this.$refs.refRiskTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.showDialog = false;
      yufp.clone(selections[0], _this.formdata);
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
      params['model_group_no'] = 'CMG000721';
      params['biz_serno'] = params.serno;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '尽调结果详细页面',
        data: params
      });
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
      params['model_group_no'] = 'CMG000721';
      params['biz_serno'] = params.serno;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '尽调结果详细页面',
        data: params
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
      model.submitDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      model.approveStatus = '000';
      model.isMobileBankInfo = '1'; // 手机银行录入信息是否准确初始为是
      // 向后台发送保存请求
      this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/sfresultinfo/insertSfResultInfo',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.dialogVisible = false; // 关闭下一步导向也页面
              let jsoPar = model;
              jsoPar['model_group_no'] = 'CMG000721';
              jsoPar['op'] = 'UPDATE';
              jsoPar['biz_serno'] = model.serno;
              var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              _this.$router.addTab({
                name: path,
                key: jsoPar.serno + jsoPar.op,
                title: '尽调结果详细页面',
                data: jsoPar
              });
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

    refTableData: function () {
      let _this = this;
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
      jsoPar['model_group_no'] = 'CMG000721';
      jsoPar['op'] = 'UPDATE';
      jsoPar['biz_serno'] = params.serno;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.serno + jsoPar.op,
        title: '尽调结果详细页面',
        data: jsoPar
      });
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
              url: backend.cmisBiz + '/api/sfresultinfo/sfResultInfodelete',
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
  },
  watch: {
    'formdata.lmtAccNo': function (val) {
      if (val) {
        this.customParams = {
          condition: {contStatus: '200', lmtAccNo: val, bizType: '05'}
        };
      }
    }
  }
};

</script>
