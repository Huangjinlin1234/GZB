
<template>
  <!--
    @created by 张亮
    @description 房抵e点贷授信押品关联
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="messageTip">
        <yu-panel title="申请信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="addFn" type="primary" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button @click="updateFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST"
                     selection-type="radio" :pageable="true"  :base-params="baseParams" :default-load="true"
          >
            <yu-xtable-column label="分项额度号" prop="accSubNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="分项流水号" prop="subSerno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY" width:="120"></yu-xtable-column>
            <yu-xtable-column label="授信额度（元）" prop="lmtAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="授信期限（月）" prop="lmtTerm" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width:="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="主键" prop="pkId" width:="120" hidden></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已审批" name="deal">
        <yu-panel title="已审批" hideFilter="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refDealTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="infoFnHis" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="分项额度号" prop="accSubNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="分项流水号" prop="subSerno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY" width:="120"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="lmtAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="授信期限（月）" prop="lmtTerm" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width:="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="主键" prop="pkId" width:="120" hidden></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!--新增向导-->
    <yu-xdialog title="授信分项明细表列表" ref="LmtReplyAccSubDialog" :visible.sync="dialogVisible" width="1500px" height="800px">
      <yu-xform related-table-name="LmtReplyAccSubTable" form-type="search" v-model="searchFormdata1" label-width="60px">
        <yu-xform-group :column="2">
            <yu-xform-item label="客户号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="LmtReplyAccSubTable" condition-key="condition" row-number :data-url="LmtReplyAccSubUrl" :base-params="LmtReplyAccSubParams" :default-load="true" requestType="POST" size="full">
          <yu-xtable-column label="分项额度号" prop="accSubNo"></yu-xtable-column>
          <yu-xtable-column label="分项流水号" prop="subSerno"></yu-xtable-column>
          <yu-xtable-column label="业务流水号" prop="serno" width:="120"></yu-xtable-column>
          <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
          <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
          <yu-xtable-column label="授信额度（元）" prop="lmtAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="授信期限（月）" prop="lmtTerm" ></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons align="center">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="back">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_GUAR_WAY,STD_ZB_YES_NO');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/fdyddlmtsubguar/fdyddLmtSubGuarlist',
      dataHisUrl: backend.cmisBiz + '/api/fdyddlmtsubguar/fdyddLmtSubGuarHislist',
      LmtReplyAccSubUrl: backend.cmisBiz + '/api/lmtreplyaccsub/getfdyddLmtReplyAccSubByAccSubNo',
      activeName: 'messageTip',
      searchFormdata: {},
      lmtType: '',
      formdata: {},
      baseParams: {},
      LmtReplyAccSubParams: {condition: { inputId: yufp.session.userId }},
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
    /**
     * 选取返回
     */
    backToAdd: function () {
      var _this = this;
      var selections = _this.$refs.LmtReplyAccSubTable.selections;
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
        url: this.$backend.cmisBiz + '/api/fdyddlmtsubguar/insertFdyddLmtSubGuar',
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

    infoFn: function () {
      let _this = this;
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000729';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '房抵e点贷授信押品详情',
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
      params['model_group_no'] = 'CMG000729';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: params.serno + params.op,
        title: '房抵e点贷授信押品历史详情',
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
      jsoPar['model_group_no'] = 'CMG000729';
      jsoPar['op'] = 'EDIT';
      jsoPar['fddSerno'] = 'jsoPar.pkId';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.fddSerno + jsoPar.op,
        title: '房抵e点贷授信押品修改',
        data: jsoPar
      });
    }
  }
};
</script>
