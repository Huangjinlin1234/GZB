  <!--
    @created by zhuly6 2020-05-06
    @updated by 詹煜彪
    @description  贷款出账申请
  -->
<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待发起" name="workSche">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <!-- 查询条件 -->
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="放款流水号" name="pvpSerno" ctype="input"></yu-xform-item>
                <yu-xform-item label="借据编号" name="billNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
                <yu-xform-item label="是否资料补充" name="isMaterComp" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
                <yu-xform-item label="申请状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button type="primary" @click="handInvalidFn" v-if="checkCtrl('cancel')">手工作废</yu-button>
            <yu-button type="primary" @click="onPrint" v-if="checkCtrl('printbill')">打印借款借据</yu-button>
            <yu-button type="primary" @click="onPrint2" v-if="checkCtrl('printapp')">打印额度借款支用申请书</yu-button>
            <yu-button type="primary" @click="viewInfoFn" v-if="checkCtrl('view')">查看</yu-button>
            <!-- 列表中所展示的列信息 -->
            <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" style="margin-top: 10px"  selection-type="radio">
              <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
              <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
              <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
              <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
              <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
              <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP" width="120"></yu-xtable-column>
              <yu-xtable-column label="贷款担保方式" prop="guarMode" width="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
              <yu-xtable-column label="放款金额" prop="pvpAmt" width="" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
              <yu-xtable-column label="批复编号" prop="replyNo" width="" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputId" width="" hide-column></yu-xtable-column>
              <yu-xtable-column label="主管机构" prop="managerBrId" width="" hide-column></yu-xtable-column>
              <yu-xtable-column label="主管客户经理" prop="managerId" width="" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputIdName" width=""></yu-xtable-column>
              <yu-xtable-column label="主管机构" prop="managerBrIdName" width=""></yu-xtable-column>
              <yu-xtable-column label="主管客户经理" prop="managerIdName" width=""></yu-xtable-column>
              <yu-xtable-column label="是否资料补充" prop="isMaterComp" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
              <yu-xtable-column label="申请状态" prop="approveStatus" width="" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
              <yu-xtable-column label="创建时间" prop="inputDate" width="120"></yu-xtable-column>
            </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已处理" name="workScheSolved">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <!-- 查询条件 -->
            <yu-xform related-table-name="refTableSolved" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="放款流水号" name="pvpSerno" ctype="input"></yu-xform-item>
                <yu-xform-item label="借据编号" name="billNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
                <yu-xform-item label="是否资料补充" name="isMaterComp" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
                <yu-xform-item label="申请状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
             <yu-toolbar>
            <yu-button type="primary" @click="viewInfoFnSolved" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <!-- 列表中所展示的列信息 -->
          <yu-xtable ref="refTableSolved" condition-key="condition" row-number :data-url="dataUrlSolved" request-type="POST" style="margin-top: 10px">
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" width="120" data-code="STD_PRD_TYPE_PROP" ></yu-xtable-column>
            <yu-xtable-column label="贷款担保方式" prop="guarMode" width="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="放款金额" prop="pvpAmt" width="" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" width="" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" width="" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width=""></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" width=""></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" width=""></yu-xtable-column>
            <yu-xtable-column label="是否资料补充" prop="isMaterComp" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" width="" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="inputDate" width="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!-- 新增，弹出框 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group :column="1">
          <yu-xform-item label="合同编号" name="contNo" rules="required" icon="search" placeholder="合同编号" :triger-click="false" :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" :disabled="true" rules="required" placeholder="客户编号"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" :disabled="true" rules="required" placeholder="客户名称"></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" ctype="input" v-show="false"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-dg-prd-pop" name="prdId" placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName','prdTypeProp':'prdTypeProp'}" :disabled="disabledflg" :rules="{ required: disabledflg, message: '字段不能为空' }" :param="{prdType:'01'}"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input" disabled :required="disabledflg" placeholder="产品名称"></yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" placeholder="产品属性类型" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" :hiddden="isPrdTypeProp"></yu-xform-item>
          <yu-xform-item label="币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" rules="required" :disabled="isCurTypeDisabled"></yu-xform-item>
          <yu-xform-item label="出账金额" name="pvpAmt" ctype="yu-num"  number-formatter="0,000.00" rules="required"></yu-xform-item>
          <yu-xform-item label="贷款形式" name="loanModal" ctype="select" data-code="STD_LOAN_MODAL" rules="required" @change="changeRefinancingType" :disabled="isLoanModalDisabled"></yu-xform-item>
          <yu-xform-item label="借新还旧类型" name="refinancingType" ctype="select" rules="required" data-code="STD_REFINANCING_TYPE" :hidden="isRefinancingType"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="isRepayCapitalReloan">下一步</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_LOAN_MODAL,STD_ZB_YES_NO,STD_ZB_YES_NO,STD_REFINANCING_TYPE,STD_PRD_TYPE_PROP');
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/pvploanapp/tosignlist',
      dataUrlSolved: backend.cmisBiz + '/api/pvploanapp/solvedsignlist',
      activeName: 'workSche',
      formdata: {},
      isPrdTypeProp: true,
      contParms: {
        title: '选择合同',
        // queryFields为弹出框的中选择合同的查询条件
        queryFields: [
          {
            placeholder: '合同编号',
            field: 'contNo',
            type: 'input',
            fuzzyQuery: 'both'
          },
          {
            placeholder: '客户编号',
            field: 'cusId',
            type: 'input',
            fuzzyQuery: 'both'
          },
          {
            placeholder: '客户名称',
            field: 'cusName',
            type: 'input',
            fuzzyQuery: 'both'
          }
        ],
        dataUrl: backend.cmisBiz + '/api/ctrloancont/selectctrloan',
        tableColumns: [
          { label: '合同编号', prop: 'contNo' },
          { label: '客户编号', prop: 'cusId' },
          { label: '客户名称', prop: 'cusName' },
          { label: '产品编号', prop: 'prdId' },
          { label: '产品名称', prop: 'prdName' },
          {
            label: '币种',
            prop: 'curType',
            dataCode: 'STD_ZB_CUR_TYP'
          }
        ]
      },
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
      required: false,
      disabledflg: true,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      isRefinancingType: false,
      topOutsystemCode: 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;',
      topOutsystemCodeCopy: 'DKDY;',
      isCurTypeDisabled: false,
      isPvpRepay: false,
      isLoanModalDisabled: false,
      docid: ''
    };
  },

  methods: {
    // 待发起，字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },

    // 已处理，字典项过滤
    datacodeFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key !== '000' && op.key !== '111' && op.key !== '992') {
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
    // 取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: '/trade/example/save',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
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

    // 新增
    addFn: function () {
      var _this = this;
      _this.switchStatus('ADD', true);
    },

    // 修改
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus == '111') {
        // _this.$message({ message: '"审批中"状态的申请记录不能进行修改操作！', type: 'warning' });
        _this.$xutils.showMsgBox('提示', '"审批中"状态的申请记录不能进行修改操作！', 350, 150);
        return;
      }
      var op = 'EDIT';
      _this.getContInfo(jsoPar, op);
    },

    getContInfo (jsoPar, op) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/showdetial',
        data: { contNo: jsoPar.contNo },
        callback: function (code, message, response) {
          if (response.data != null) {
            jsoPar['contType'] = response.data.contType;
            jsoPar['replyNo'] = response.data.replyNo;
            _this.addTab(jsoPar, op);
          } else {
            yufp.service.request({
              async: false,
              method: 'POST',
              url: backend.cmisBiz + '/api/ctrhighamtagrcont/showdetial',
              data: { contNo: jsoPar.contNo },
              callback: function (code, message, response) {
                if (response.data != null) {
                  jsoPar['contType'] = response.data.contType;
                  jsoPar['replyNo'] = response.data.replyNo;
                  _this.addTab(jsoPar, op);
                }
              }
            });
          }
        }
      });
    },

    addTab (jsoPar, op) {
      var _this = this;
      jsoPar['model_group_no'] = 'CMG000649';
      jsoPar['op'] = op;
      jsoPar['bizId'] = jsoPar.pvpSerno;
      jsoPar['imageType'] = '2';
      // 进行权证数据获取，判断是否添加押品系统影像
      _this.getImageCode(jsoPar.contNo, jsoPar.pvpSerno);
      // 传影像目录
      jsoPar['topOutsystemCode'] = this.topOutsystemCode;// 出账影像
      jsoPar['topOutsystemCodeCopy'] = this.topOutsystemCodeCopy; // 他项权证影像
      jsoPar['imageCopyParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.pvpSerno,
        docid: _this.docid
      };
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.pvpSerno,
        docid: _this.docid
      };
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, true, true);

      delete jsoPar.iqpSerno;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.pvpSerno + jsoPar.op,
        title: '贷款出账申请修改',
        data: jsoPar
      });
    },

    // 查看
    viewInfoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.isAutoAppr == '1' && jsoPar.approveStatus == '111') {
        _this.$message({ message: '该笔无还本续贷审批仍在审批中，请耐心等待系统自动审批完成！', type: 'warning' });
        return;
      }

      var op = 'VIEW';
      // jsoPar['model_group_no'] = 'CMG000649';
      // jsoPar['op'] = 'VIEW';
      // jsoPar['imageType'] = '2';
      // jsoPar['bizId'] = jsoPar.pvpSerno;
      // // 传影像目录
      // jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      // jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像
      // // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, true, true);

      // var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      // _this.$router.addTab({
      //   name: path,
      //   key: jsoPar.pvpSerno + jsoPar.op,
      //   title: '贷款出账申请查看',
      //   data: jsoPar
      // });
      _this.getContInfo(jsoPar, op);
    },

    // 已处理的查看
    viewInfoFnSolved: function () {
      var _this = this;
      if (_this.$refs.refTableSolved.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let jsoPar = _this.$refs.refTableSolved.selections[0];
      var op = 'VIEW';
      // jsoPar['model_group_no'] = 'CMG000649';
      // jsoPar['op'] = 'VIEW';
      // jsoPar['imageType'] = '2';
      // jsoPar['bizId'] = jsoPar.pvpSerno;
      // // 传影像目录
      // jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      // jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像

      // var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      // _this.$router.addTab({
      //   name: path,
      //   key: jsoPar.pvpSerno,
      //   title: '贷款出账申请查看',
      //   data: jsoPar
      // });
      _this.getContInfo(jsoPar, op);
    },

    // 删除
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000') {
        // _this.$message({ message: '"审批中"状态的申请记录不能进行修改操作！', type: 'warning' });
        _this.$xutils.showMsgBox('提示', '只有"待发起"状态的申请记录才能进行删除操作！', 350, 150);
        return;
      }

      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/pvploanapp/delete/' + selections[0].pvpSerno,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '删除成功', type: 'success' });
                } else {
                  _this.$message({ message: '删除失败', type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    // 判断是否为小企业无还本续贷的出账
    isRepayCapitalReloan () {
      var _this = this;
      var data = _this.formdata;
      var flag = true;
      if (_this.formdata.loanModal == '8') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/pvploanapp/isrepaycapitalreloan',
          data: data,
          callback: function (code, message, response) {
            if (response.code == 0) {
              flag = response.data;
            } else {
              _this.$message({ message: '请求异常', type: 'error' });
            }
          }
        });
        if (flag == true) {
          _this.pvpRepayCapitalReloan(data);
        } else {
          _this.$message({ message: '已选合同不允许做小企业无还本续贷，请选择其他贷款形式！', type: 'warning' });
          return;
        }
      } else {
        _this.nextStep();
      }
    },

    // 小企业无还本续贷的处理
    pvpRepayCapitalReloan (data) {
      var _this = this;
      _this.$confirm('该客户的小企业无还本续贷申请需要提交对公智能风控审批，确认该模式选“确定”，审批时间约为5分钟，请耐心等待！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              async: false,
              method: 'POST',
              url: backend.cmisBiz + '/api/pvploanapp/pvprepaycapitalreloan',
              data: data,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.$message({ message: '已成功发送智能风控系统，请等待系统自动风控审批完成！', type: 'success' });
                  _this.dialogVisible = false;
                  _this.$refs.refTable.remoteData();
                  _this.$refs.refTableSolved.remoteData();
                } else {
                  _this.$message({ message: response.erortx || response.message, type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    // getResult (pvpSerno) {
    //   var _this = this;
    //   yufp.service.request({
    //     async: false,
    //     method: 'POST',
    //     url: backend.cmisBiz + '/api/pvploanapp/getresult',
    //     data: pvpSerno,
    //     callback: function (code, message, response) {
    //       if (response.code == 0) {
    //         _this.dialogVisible = false;
    //         _this.$refs.refTable.remoteData();
    //         _this.$refs.refTableSolved.remoteData();
    //       } else {
    //         _this.$message({ message: '请求异常！', type: 'error' });
    //       }
    //     }
    //   });
    // },

    // 下一步
    nextStep: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.$refs.refForm.formdata, model);
      var validate = false; // 数据校验
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var contNo = _this.formdata.contNo;
      var prdId = _this.formdata.prdId;
      let flag = '';
      // 校验选择的产品是否存在于合同申请所选分项中
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/isprdexist',
        data: {contNo: contNo, prdId: prdId},
        callback: function (code, message, response) {
          if (response.code == 0) {
            flag = response.data;
          }
        }
      });
      if (flag == false) {
        _this.$message({ message: '合同关联的授信分项中不存在已选产品，请重新操作！', type: 'warning' });
        return;
      }
      var url = '';
      if (_this.viewType == 'ADD') {
        url = backend.cmisBiz + '/api/pvploanapp/savepvploanapp';
      } else {
        url = backend.cmisBiz + '/api/pvploanapp/commonupdatepvploanapp';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.dialogVisible = false;
              // _this.$router.addTab({
              //   // 路由名称,菜单路径
              //   name: 'zrcbank/biz/pvpLoanApp/pvpLoanAppInfo',
              //   // 自定义唯一页签key,请统一使用custom_前缀开头。key值必传
              //   key: '1',
              //   // 页签名称
              //   title: '委托贷款出账申请详情',
              //   // 传递的业务数据，可选配置
              //   data: {
              //     pvpSerno: response.data.pvpSerno
              //   }
              // });
              let jsoPar = {};
              jsoPar['model_group_no'] = 'CMG000649';
              jsoPar['op'] = 'ADD';
              jsoPar['replyNo'] = response.data.replyNo;
              jsoPar['contType'] = model.contType;
              jsoPar['cusId'] = model.cusId;
              jsoPar['pvpSerno'] = response.data.pvpSerno;
              // jsoPar['iqpSerno'] = response.data.iqpSerno;
              jsoPar['contNo'] = model.contNo;
              jsoPar['period'] = '01';
              jsoPar['imageType'] = '2';
              jsoPar['loanModal'] = _this.formdata.loanModal;
              jsoPar['billNo'] = response.data.billNo;
              // 进行权证数据获取，判断是否添加押品系统影像
              _this.getImageCode(model.contNo, jsoPar.pvpSerno);
              // 传影像目录
              jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
              jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像
              jsoPar['imageCopyParams'] = {
                contid: jsoPar.contNo,
                businessid: jsoPar.pvpSerno,
                docid: _this.docid
              };
              jsoPar['imageParams'] = {
                contid: jsoPar.contNo,
                businessid: jsoPar.pvpSerno,
                docid: _this.docid
              };
              let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              _this.$router.addTab({
                name: path,
                key: jsoPar.pvpSerno + jsoPar.op,
                title: '贷款出账申请修改',
                data: jsoPar
              });
              // _this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, true, true);
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },

    // // 打印
    // onPrint () {
    //   var _this = this;
    //   var params = _this.$refs.refTable.selections;
    //   // var contPrintNum = params.cont_print_num;
    //   if (params == null || params == '') {
    //     _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
    //     return;
    //   }
    //   // let name = 'ctrmanage/ctrLoanCont/frptdemo';
    //   let name = 'zrcbank/biz/pvpLoanApp/frptdemo';
    //   let keydemo = 'frptdemo';
    //   // 本地调试 params.src = 'http://10.87.3.24:8080/dscms/frpt/decision/view/report?viewlet=pvpLoanApp.cpt&PVP_SERNO=' + params[0].pvpSerno;
    //   params.src = 'http://10.85.10.38:8080/dscms/frpt/decision/view/report?viewlet=pvpLoanApp.cpt&PVP_SERNO=' + params[0].pvpSerno;
    //   _this.$router.addTab({
    //     // 路由名称
    //     name: name,
    //     // 自定义唯一页签key,请统一使用custom_前缀开头
    //     key: keydemo, // 必传
    //     // 页签名称
    //     title: '帆软打印',
    //     // 传递的业务数据，可选配置
    //     data: params
    //   });
    //   // params['contPrintNum'] = parseInt(contPrintNum) + 1;
    //   // params['optType'] = 'onPrint';
    //   // YuXPUtil.AJAX({
    //   //   async: false, // 同步请求
    //   //   url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/ctrloancont/updateSelectiveByKey',
    //   //   data: JSON.stringify(YuXPUtil.toUpperCase(params, true)),
    //   //   success: function (response, status, xhr) {
    //   //     console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
    //   //     if (response.data > 0) {
    //   //       YuXP.showMsgBox('提示', '打印成功');
    //   //       d1_BillList.queryDataByCondition('');
    //   //     }
    //   //   },
    //   //   error: function (result, b) {
    //   //     console.log(result + '错误信息' + b);
    //   //     YuXP.showMsgBox('提示', b + '：错误信息：' + result.responseJSON.message); // 弹出提示
    //   //   }
    //   // });
    // },

    // 打印借款借据
    onPrint: function () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemojkjjptd';
      params.src = _this.$backend.frptRptService + 'JKJJ.cpt&pvpSerno=' + params.pvpSerno + '&contNo=' + params.contNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '贷款出账借款借据',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 打印额度借款支用申请书
    onPrint2: function () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var contPageType = '';// 合同版面标识
      var isESeal = '';// 是否电子用印
      var cptName = '';// 报表名
      const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      var paramList = [];
      // 根据合同号获取合同表内的电子用印标识
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/getContInfobyPvpContNo',
        data: {
          contNo: params.contNo
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            isESeal = response.data.isESeal;
            if (isESeal !== '0') {
              let managerId = params.managerId;
              let loginCode = userInfo.loginCode;
              if (managerId == loginCode) {
                contPageType = '2';
                cptName = 'EDJKZYSQS_DK_p1.cpt';
              } else {
                contPageType = '3';
                cptName = 'EDJKZYSQS_DK_p2.cpt';
              }
            } else {
              contPageType = '1';
              cptName = 'EDJKZYSQS_DK.cpt';
            }
            // 参数
            paramList = {
              cusId: params.cusId,
              serno: params.pvpSerno,
              contPageType: contPageType,
              cptName: cptName,
              tempName: '额度支用申请书'
            };
            _this.$dialog.open(
              '额度支用申请书打印',
              'printManage/indexPvpPrint',
              800,
              500,
              paramList
            );
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    // 手工作废
    handInvalidFn: function () {
      var _this = this;
      // var model = {};
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var lineObj = selections[0];
      if (lineObj.approveStatus == '000') {
        _this.$message({ message: '该笔出账申请记录状态为待发起，请点击删除进行操作！', type: 'warning' });
        return;
      }
      if (lineObj.approveStatus != '992' && lineObj.approveStatus != '998') {
        _this.$message({ message: '该笔出账申请记录状态不允许作废！', type: 'warning' });
        return;
      }
      var len = selections.length,
        arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(selections[i].serno);
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
              data: selections,
              url: backend.cmisBiz + '/api/pvploanapp/handinvaild/' + selections[0].pvpSerno,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({
                    message: '作废成功！',
                    type: 'success'
                  });
                } else {
                  _this.$message({ message: response.message, type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    handleIconClick: function () {
      // console.log(this.formdata.cusId);
      var data = { cusId: '', instuCde: '' };
      this.$dialog.open('', 'zrcbank/biz/pvpLoanApp/singleCtrSelectApp', 1600, 800, data, params => {
        // console.log(params);

        // this.formdata.contType = params.contType;
        if (params.contType == '1' || params.contType == '2') {
          this.formdata.contNo = params.contNo;
          this.formdata.cusId = params.cusId;
          this.formdata.prdId = params.prdId;
          this.formdata.cusName = params.cusName;
          this.formdata.prdName = params.prdName;
          this.formdata.curType = params.curType;
          this.formdata.contType = params.contType;
          this.formdata.prdTypeProp = params.prdTypeProp;
          this.formdata.loanModal = params.loanModal;
          if (this.formdata.contType == '1') {
            this.isCurTypeDisabled = true;
            this.isLoanModalDisabled = true;
          }
          this.disabledflg = true;
          if (params.busiType == '02' || params.busiType == '04') {
            this.formdata.prdTypeProp = params.prdTypeProp;
            this.isPrdTypeProp = false;
          }
        } else if (params.contType == '3') {
          this.disabledflg = false;
          this.formdata.contNo = params.contNo;
          this.formdata.cusId = params.cusId;
          this.formdata.cusName = params.cusName;
          this.formdata.curType = params.curType;
          this.formdata.contType = params.contType;
          this.formdata.prdTypeProp = params.prdTypeProp;
          this.formdata.prdId = '';
          this.formdata.prdName = '';
        }
      });
    },
    getImageCode: function (contNo, pvpSerno) {
      // 根据权证流水号进行目录修改
      let _this = this;
      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + contNo,
        callback: function (code, message, response) {
          let resDocid = response.data;
          if (resDocid != null && resDocid != '') {
            _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;CMSYPYX';
            _this.docid = resDocid;
          } else {
            _this.docid = pvpSerno;
          }
        }
      });
    },
    // 新增时，根据贷款形式，是否显示借新换旧类型。
    changeRefinancingType: function (value) {
      var _this = this;
      if (value == '3') {
        _this.isRefinancingType = false;
      } else {
        _this.isRefinancingType = true;
      }
    }
  },
  watch: {
    'formdata.prdId': function (val) {
      console.log(val);
    }
  }
};
</script>
