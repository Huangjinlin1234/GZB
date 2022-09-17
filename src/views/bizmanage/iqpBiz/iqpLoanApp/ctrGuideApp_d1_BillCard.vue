<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="125px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls','cusCatalog':'cusCatalog'}" idField="cusId" width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls" hidden></yu-xform-item>
          <yu-xform-item label="客户大类" ctype="select" data-code="STD_ZB_CUS_CATALOG" placeholder="客户大类" name="cusCatalog" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" name="prdId" rules="required" placeholder="产品编号" icon="search" :triger-click="true" :on-icon-click="commonDgPrdSelect"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="24" ></yu-xform-item>
          <yu-xform-item label="产品适用担保方式" ctype="input" name="suitGuarMode" @change="getGuarWay" hidden></yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" placeholder="产品属性类型" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" data-code="STD_CONT_TYPE" placeholder="合同类型" :colspan="24" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModal" data-code="STD_LOAN_MODAL" placeholder="贷款形式" :colspan="24" :datacode-filter="datacodeFilterFn1" rules="required"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay"  rules="required" :options="guarWayOpt"  placeholder="担保方式" :colspan="24" @change="isLowRisk"></yu-xform-item>
          <yu-xform-item label="是否使用授信额度" ctype="select" placeholder="是否使用授信额度" data-code="STD_ZB_YES_NO" name="isUtilLmt" rules="required" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" placeholder="授信额度编号" icon="search" :triger-click="true" :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :colspan="12" hidden></yu-xform-item>
          <yu-xform-item label="执行年利率" ctype="yu-num" sign="%" :multiple="100" placeholder="执行年利率" name="execRateYear" hidden></yu-xform-item>
          <yu-xform-item label="结息方式" ctype="select" name="eiMode" rules="required" data-code="STD_EI_MODE" placeholder="结息方式" hidden></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" data-code="STD_REPAY_MODE" placeholder="还款方式" hidden></yu-xform-item>
          <yu-xform-item label="是否续签" ctype="select" name="isRenew" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否续签" :colspan="24" @change="iRChange"></yu-xform-item>
          <yu-xform-item label="原合同编号" ctype="input" name="origiContNo" rules="required" v-if="ocHidden" placeholder="原合同编号" icon="search" :triger-click="true" :on-icon-click="commonDgContSelect"></yu-xform-item>
          <yu-xform-item label="所属条线" ctype="select" data-code="BIZ_BELG" placeholder="所属条线" name="belgLine" hidden :value="belgLineValue"></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" :value="bizTypeValue" name="bizType" data-code="STD_ZB_BUSI_TYPE" placeholder="业务类型" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_TYPE,STD_PRD_TYPE_PROP,STD_ZB_CUS_CLS,STD_ZB_CUS_CATALOG');
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  props: {
    pageData: Object,
    dialogId: String
  },
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      ocHidden: true,
      bizTypeValue: '02',
      belgLineValue: '02',
      customParams: {},
      isLmtAccNoRequired: true,
      parms: {root: '020000'},
      prdType: '',
      guarMode: '',
      guarWayOpt: [],
      param: {}
    };
  },
  created: function () {
    this.prdType = this.pageData.prdType;
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
    },
    iRChange (value) {
      if (value == '0') {
        // document.getElementById('ocHidden').style.display = 'none';
        this.ocHidden = false;
      } else {
        // document.getElementById('ocHidden').style.display = 'block';
        this.ocHidden = true;
      }
    },
    // 产品选取框传参
    setPrdParams (value) {
      var _this = this;
      _this.param = {prdType: _this.prdType, cusCatalog: _this.formdata.cusCatalog};
    },
    // 根据选择产品获取对应担保方式字典项
    getGuarWay: function () {
      let _this = this;
      // 获取产品适用的担保方式
      let suitGuarMode = _this.formdata.suitGuarMode;
      var list = suitGuarMode.split(',');
      // 获取担保方式字典项
      const datacode1 = _this.$lookup.find('STD_ZB_GUAR_WAY');
      // 定义array
      var array = [];
      // 将符合产品适用的担保方式加入array
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < datacode1.length; j++) {
          if (datacode1[j].key == list[i]) {
            array[i] = datacode1[j];
            break;
          }
        }
      }
      _this.guarWayOpt = array;
    },

    isLowRisk (value) {
      if (value == '40' || value == '21' || value == '60') {
        this.isLmtAccNoRequired = false;
        this.formdata.lmtAccNo = '';
        this.isExistMultipleAndLowRiskLmt();
      } else {
        this.formdata.lmtAccNo = '';
        this.isLmtAccNoRequired = true;
      }
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

    // 合同类型字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '1' || op.key === '2') {
          return true;
        }
        return false;
      });
    },
    // 贷款形式字典项过滤
    datacodeFilterFn1: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '1' || op.key === '3' || op.key === '4' || op.key === '6' || op.key === '9') {
          return true;
        }
        return false;
      });
    },

    /**
     * 参照公共的确认事件
     */
    commonCusSelectFn: function (data, mapping) {
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

    // 产品选择
    commonDgPrdSelect () {
      let prdType = this.prdType;
      let cusCatalog = this.formdata.cusCatalog;
      var data = { prdType: prdType, cusCatalog: cusCatalog};
      this.$dialog.open('', 'zrcbank/biz/common/commonDgPrdSelect', 1000, 600, data, params => {
        this.formdata.prdId = params.prdId;
        this.formdata.prdName = params.prdName;
        this.formdata.suitGuarMode = params.suitGuarMode;
      });
    },

    // 原合同选择
    commonDgContSelect () {
      let cusId = this.formdata.cusId;
      let lmtAccNo = this.formdata.lmtAccNo;
      if (!lmtAccNo || lmtAccNo == null || lmtAccNo == '') {
        this.$message({ message: '授信额度编号不能为空!\r\n请重新操作!', type: 'warning' });
        return;
      }
      var data = { cusId: cusId, lmtAccNo: lmtAccNo, busiType: '02'};
      this.$dialog.open('', 'zrcbank/biz/common/commonDgContSelect', 1000, 800, data, params => {
        this.formdata.origiContNo = params.contNo;
      });
    },

    handleIconClick: function () {
      let _this = this;
      let cusId = this.formdata.cusId;
      if (cusId == null || cusId == '') {
        this.$xutils.showMsgBox('提示', '客户编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      let instuCde = loginUser.instu.code;
      if (instuCde == null || instuCde == '') {
        this.$xutils.showMsgBox('提示', '客户机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let guarWay = this.formdata.guarWay;
      if (guarWay == null || guarWay == '') {
        this.$xutils.showMsgBox('提示', '担保方式不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let prdId = _this.formdata.prdId;
      if (prdId == null || prdId == '') {
        _this.$xutils.showMsgBox('提示', '产品编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      var data = { cusId: cusId, instuCde: instuCde, isPreCrd: '0', suitGuarWay: guarWay, prdId: prdId};
      this.$dialog.open('', 'zrcbank/lmt/singleCusQuoApp/singleCusQuoApp', -1, -1, data, params => {
        // console.log(params);
        var contType = this.formdata.contType;
        var lmtBizType = params.limitSubNo;
        var status = params.status;
        if (status != '01') {
          _this.$xutils.showMsgBox('提示', '请选择生效的授信额度!', 350, 150);
          return;
        }
        if (contType == '1' || contType == '2') {
          if (!lmtBizType) {
            _this.$xutils.showMsgBox('提示', '请选择授信产品!', 350, 150);
            return;
          }
        } else if (contType == '3') {
          if (lmtBizType || !params.apprSubSerno) {
            _this.$xutils.showMsgBox('提示', '请选择授信分项!', 350, 150);
            return;
          }
        } else {
          _this.$xutils.showMsgBox('提示', '请先选择合同类型!', 350, 150);
          return;
        }
        this.formdata.lmtAccNo = params.apprSubSerno;
        this.formdata.prdTypeProp = params.lmtBizTypeProp;
        this.guarMode = params.suitGuarWay;
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

    // 获取分项额度号、还款方式、结息方式和执行年利率
    getAccSubNo (accSubPrdNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsubprd/querylmtreplyaccsubprdbyparams',
        data: {accSubPrdNo: accSubPrdNo},
        callback: function (code, message, response) {
          var accSubNo = response.data.accSubNo;
          // 还款方式
          _this.formdata.repayMode = response.data.repayMode;
          // 结息方式
          _this.formdata.eiMode = response.data.eiMode;
          // 执行年利率
          _this.formdata.execRateYear = response.data.rateYear;
          _this.getReplySerno(accSubNo);
        }
      });
    },

    // 获取批复流水号、结息方式和执行年利率
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
    }

  },
  watch: {
    'formdata.lmtAccNo': function (val) {
      if (val) {
        this.customParams = {
          condition: {contStatus: '200', lmtAccNo: val, bizType: '02'}
        };
      }
    }
  }
};
</script>
