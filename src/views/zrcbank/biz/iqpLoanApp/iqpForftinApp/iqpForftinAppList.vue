
<template>
  <!--
    @created by 屈文
    @description 福费廷合同申请
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="福费廷合同申请" name="messageTip">
        <yu-panel title="福费廷合同申请" :hideFilter="false" :collapseHide="false">

          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="iqpSerno"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" exclude-key="997,998,990,991" :datacode-filter="datacodeFilterFn"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>

          <yu-toolbar>
            <yu-button @click="addFn" type="primary" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button @click="updateFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="deleteFn" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST"
           selection-type="radio" :pageable="true"  :base-params="baseParams" :default-load="true">
            <yu-xtable-column label="合同编号" prop="contNo" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="iqpSerno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" data-code="NATIONALITY" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同币种(元)" prop="curType" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" width:="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="福费廷合同申请历史" name="deal">
        <yu-panel title="福费廷合同申请历史" hideFilter="false">
             <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refDealTable">
              <yu-xform-group :column="4">
                <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="iqpSerno"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" exclude-key="111,000,992,991,993" :datacode-filter="datacodeFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-button @click="infoFnHis" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="合同编号" prop="contNo" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="iqpSerno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" data-code="NATIONALITY" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同币种(元)" prop="curType" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" width:="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!--申请向导-->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group :column="1">
          <yu-xform-item label="业务类型" label-width="22%" ctype="input" name="bizType" hidden></yu-xform-item><br>
          <yu-xform-item label="所属条线" label-width="22%" ctype="input" name="belgLine" hidden></yu-xform-item><br>
          <yu-xform-item label="操作类型" label-width="22%" ctype="input" name="oprType" hidden></yu-xform-item><br>
          <yu-xform-item label="审批类型" label-width="22%" ctype="input" name="approveStatus" hidden></yu-xform-item><br>
          <yu-xform-item label="批复编号" label-width="22%" ctype="input" name="replyNo" hidden></yu-xform-item><br>
          <yu-xform-item label="客户编号" label-width="22%" ctype="yu-xcustom-ref" name="cusId" rules="required" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId" width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" label-width="22%" ctype="input" name="cusName" rules="required" disabled @change="isLowRisk"></yu-xform-item><br>
          <yu-xform-item label="客户分类" ctype="select" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" label-width="22%" ctype="input" name="prdId" rules="required" disabled ></yu-xform-item>
          <!--<yu-xform-item label="产品编号" label-width="22%" ctype="yu-xlmtsub-tree" rules="required" name="prdId"  width="480" height="480" :parms="{limitStrNo:'01'}" @select-fn="commonSelectFn" :show-text="false" :mapping="{'id':'prdId','label':'prdName'}"></yu-xform-item><br>-->
          <yu-xform-item label="产品名称" label-width="22%" ctype="input" name="prdName" rules="required" disabled ></yu-xform-item><br>
          <yu-xform-item label="合同类型" label-width="22%" ctype="select" disabled name="contType" data-code="STD_ZB_CONT_TYPE" rules="required"></yu-xform-item><br>
          <yu-xform-item label="是否使用授信额度" label-width="22%" ctype="select" disabled name="isUtilLmt" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item><br>
          <yu-xform-item label="授信额度编号" label-width="22%" ctype="input" name="lmtAccNo" placeholder="授信额度编号" icon="search" :triger-click="true" :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="是否续签合同" label-width="22%" ctype="select" name="isRenew" rules="required" data-code="STD_ZB_YES_NO" @change="iRChange"></yu-xform-item><br>
          <yu-xform-item label="原合同编号" ctype="input" name="origiContNo" rules="required" v-if="ocHidden" placeholder="原合同编号" icon="search" :triger-click="true" :on-icon-click="commonDgContSelect"></yu-xform-item>

        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn">下一步</yu-button>
          <yu-button @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_ZB_CONT_TYPE,STD_ZB_CUR_TYP');
export default {
  data: function () {
    return {
      ocHidden: true,
      dataUrl: backend.cmisBiz + '/api/iqploanapp/forftintosignlist',
      dataHisUrl: backend.cmisBiz + '/api/iqploanapp/forftindonesignlist',
      activeName: 'messageTip',
      searchFormdata: {},
      formdata: {},
      baseParams: {},
      customParams: {},
      changeCusId: '',
      time: 1,
      flag: false,
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
      //  @select-fn="commonSelectFn" :mapping="{ cusId: 'cusId', cusName: 'cusName' }" width="730" height="480"
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      cusInfoPopParms: {condition: {cusState: '2'}},
      topOutsystemCode: 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWMYRZ;GJYWBH;GJYWDCCZ;GJYWSQSQT;'
    };
  },

  mounted: function () {
    var _this = this;
    _this.formdata.contType = '1'; // 合同类型
    _this.formdata.isUtilLmt = '1'; // 是否使用授信额度
    _this.formdata.prdId = '412229'; // 产品编号
    _this.formdata.prdName = '福费廷';// 产品名称
    _this.formdata.bizType = '05';// 业务类型
    _this.formdata.belgLine = '02';// 所属条线
    _this.formdata.oprType = '01'; // 操作类型
    _this.formdata.approveStatus = '000';// 审批状态
    _this.formdata.isRenew = '0';// 是否续签合同
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


    handleClick: function (tab, event) {
      // TODO
    },

    // 原合同选择
    commonDgContSelect () {
      let cusId = this.formdata.cusId;
      let lmtAccNo = this.formdata.lmtAccNo;
      if (!lmtAccNo || lmtAccNo == null || lmtAccNo == '') {
        this.$message({ message: '授信额度编号不能为空!\r\n请重新操作!', type: 'warning' });
        return;
      }
      var data = { cusId: cusId, lmtAccNo: lmtAccNo, busiType: '05'};
      this.$dialog.open('', 'zrcbank/biz/common/commonDgContSelect', 1000, 800, data, params => {
        this.formdata.origiContNo = params.contNo;
      });
    },

    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
      if (this.formdata.cusRankCls == '02') {
        this.$xutils.showMsgBox('提示', '临时客户不支持合同申请!', 350, 150);
        this.formdata.cusId = '';
        this.formdata.cusName = '';
        this.formdata.cusRankCls = '';
        return;
      }
    },

    isLowRisk (value) {
      if (value == '' || value == null) {
        return;
      }
      this.formdata.lmtAccNo = '';
      this.isExistMultipleAndLowRiskLmt();
    },

    // 判断已选客户是否存在综合授信以及是否存在低风险分项(有则自动挂接低风险)
    isExistMultipleAndLowRiskLmt () {
      var _this = this;
      var cusId = _this.formdata.cusId;
      if (cusId == null || cusId == '') {
        this.$xutils.showMsgBox('提示', '请先选择客户!', 350, 150);
        return;
      }
      var prdId = _this.formdata.prdId;
      if (prdId == null || prdId == '') {
        this.$xutils.showMsgBox('提示', '请先选择产品!', 350, 150);
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyacc/isexistmultipleandlowrisklmt',
        data: {cusId: cusId, prdId: prdId},
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.formdata.lmtAccNo = response.data.accSubPrdNo;
            _this.getReplySerno(response.data.accSubNo);
          } else {
            _this.formdata.cusId = '';
            _this.formdata.cusName = '';
            return;
          }
        }
      });
    },

    // 选择授信额度编号
    handleIconClick: function () {
      var _this = this;
      let cusId = _this.formdata.cusId;
      if (cusId == null || cusId == '') {
        _this.$xutils.showMsgBox('提示', '客户编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      let instuCde = loginUser.instu.code;
      if (instuCde == null || instuCde == '') {
        _this.$xutils.showMsgBox('提示', '客户机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let prdId = _this.formdata.prdId;
      if (prdId == null || prdId == '') {
        _this.$xutils.showMsgBox('提示', '产品编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      var data = { cusId: cusId, instuCde: instuCde, isPreCrd: '0', prdId: prdId};
      this.$dialog.open('', 'zrcbank/lmt/singleCusQuoApp/singleCusQuoApp', -1, -1, data, params => {
        // console.log(params);
        var lmtBizType = params.limitSubNo;
        var status = params.status;
        if (status != '01') {
          _this.$xutils.showMsgBox('提示', '请选择生效的授信额度!', 350, 150);
          return;
        }
        if (!lmtBizType) {
          _this.$xutils.showMsgBox('提示', '请选择授信产品!', 350, 150);
          return;
        }
        this.formdata.lmtAccNo = params.apprSubSerno;
        var isContHighAgr = '0';
        let flag = true;
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/iqploanapp/isallowcontapp',
          data: {accSubNo: params.apprSubSerno, isHighLmt: isContHighAgr},
          callback: function (code, message, response) {
            if (response.code == 0) {
              flag = response.data;
            }
          }
        });
        if (flag == false) {
          _this.$xutils.showMsgBox('提示', '已选产品所在分项被其他最高额授信协议占用,不允许做合同申请!', 350, 150);
          this.formdata.lmtAccNo = '';
          this.formdata.replyNo = '';
          return;
        } else {
          this.getAccSubNo(params.apprSubSerno);
        }
      });
    },

    // 获取分项额度号
    getAccSubNo (accSubPrdNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsubprd/querylmtreplyaccsubprdbyparams',
        data: {accSubPrdNo: accSubPrdNo},
        callback: function (code, message, response) {
          var accSubNo = response.data.accSubNo;
          _this.getReplySerno(accSubNo);
        }
      });
    },

    // 获取批复流水号
    getReplySerno (accSubNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsub/getlmtreplyaccsubbyaccsubno',
        data: {accSubNo: accSubNo},
        callback: function (code, message, response) {
          _this.formdata.replyNo = response.data.replySerno;
        }
      });
    },

    // 是否续签为否时不展示原合同编号
    iRChange (value) {
      if (value == '0') {
        // document.getElementById('ocHidden').style.display = 'none';
        this.ocHidden = false;
      } else {
        // document.getElementById('ocHidden').style.display = 'block';
        this.ocHidden = true;
      }
    },

    initOrigiContNO: function () {
      // console.log(this.formdata.cusId);
      var _this = this;
      let cusId = _this.formdata.cusId;
      if (cusId == null || cusId == '') {
        _this.$xutils.showMsgBox('提示', '客户编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      let instuCde = loginUser.org.code;
      if (instuCde == null || instuCde == '') {
        _this.$xutils.showMsgBox('提示', '客户机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      let lmtAccNo = _this.formdata.lmtAccNo;
      if (lmtAccNo == null || lmtAccNo == '') {
        _this.$xutils.showMsgBox('提示', '授信额度编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { cusId: '', instuCde: '', lmtAccNo: lmtAccNo };
      this.$dialog.open('', 'zrcbank/biz/pvpLoanApp/singleCtrSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.formdata.origiContNo = params.contNo;
      });
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
     * 选择合同方法
     */
    selectCont: function (arr) {
      this.formdata.contNo = arr[0].contNo;
      this.formdata.cusNo = arr[0].cusId;
      this.formdata.cusName = arr[0].cusName;
    },

    // 字典项过滤
    datacodeFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key !== '000') {
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
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000007';
      params['biz_serno'] = params.iqpSerno;
      params['period'] = '02';
      params['topOutsystemCode'] = this.topOutsystemCode;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.iqpSerno,
        docid: params.iqpSerno
      };
      params['imageType'] = '2';
      // this.$dialog.open(
      //   '福费廷合同申请',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1500,
      //   800,
      //   params,
      //   // 列表刷新
      //   this.$refs.refTable.remoteData()
      // );
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: params.biz_serno + params.op,
        title: '福费廷合同申请详情',
        data: params
      });
      this.$refs.refTable.remoteData();
    },

    /**
     * 历史列表查看
     */
    infoFnHis: function () {
      let selections = this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let params = selections[0];
      params['op'] = 'VIEW';
      params['model_group_no'] = 'CMG000007';
      params['biz_serno'] = params.iqpSerno;
      params['period'] = '02';
      params['topOutsystemCode'] = this.topOutsystemCode;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.iqpSerno,
        docid: params.iqpSerno
      };
      params['imageType'] = '2';
      // this.$dialog.open(
      //   '福费廷合同申请',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1500,
      //   800,
      //   params,
      //   // 列表刷新
      //   () => {
      //     this.$refs.refTable.remoteData();
      //   },
      //   true,
      //   true
      // );
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: params.biz_serno + params.op,
        title: '福费廷合同申请详情',
        data: params
      });
      this.$refs.refTable.remoteData();
    },

    /**
     * 下一步，保存
     */
    saveFn: function () {
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
      model.inputDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      model.udpId = userInfo.loginCode;
      model.udpBrId = userInfo.orgCode;
      model.udpDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      model.createTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      model.updateTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      model.bizType = '05';
      model.guarWay = '60';
      // 向后台发送保存请求
      this.$xutils.request({
        // 同步请求
        async: false,

        // 新增
        url: this.$backend.cmisBiz + '/api/iqploanapp/insertIqpLoanApp',

        data: JSON.stringify(model),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            let iqpSerno = response.data.iqpSerno;
            model['op'] = 'EDIT';
            model['model_group_no'] = 'CMG000007';
            model['biz_serno'] = iqpSerno;
            model['period'] = '02';
            model['imageType'] = '2';
            model['topOutsystemCode'] = this.topOutsystemCode;
            model['imageParams'] = {
              contid: response.data.contNo,
              businessid: iqpSerno,
              docid: iqpSerno
            };
            // this.$dialog.open(
            //   '',
            //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
            //   1500,
            //   800,
            //   model,
            //   this.cancelFn(),
            //   true,
            //   true
            // );
            let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
            this.$router.addTab({
              name: path,
              key: model.biz_serno + model.op,
              title: '福费廷合同申请详情',
              data: model
            });
            this.cancelFn();
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
      _this.flag = true;
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
      params['op'] = 'EDIT';
      params['model_group_no'] = 'CMG000007';
      params['biz_serno'] = params.iqpSerno;
      params['period'] = '02';
      params['topOutsystemCode'] = this.topOutsystemCode;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.iqpSerno,
        docid: params.iqpSerno
      };
      params['imageType'] = '2';
      // this.$dialog.open(
      //   '福费廷合同申请',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1500,
      //   800,
      //   params,
      //   // 列表刷新
      //   () => {
      //     this.$refs.refTable.remoteData();
      //   },
      //   true,
      //   true
      // );
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: params.biz_serno + params.op,
        title: '福费廷合同申请详情',
        data: params
      });
      this.$refs.refTable.remoteData();
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
              url: backend.cmisBiz + '/api/iqploanapp/forftinlogicdelete/',
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
