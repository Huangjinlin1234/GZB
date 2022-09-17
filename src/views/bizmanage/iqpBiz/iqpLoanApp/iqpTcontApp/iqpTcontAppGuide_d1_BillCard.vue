<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-dg-prd-pop" name="prdId" rules="required" :param="{prdType: '02'}" placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}">
          </yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" placeholder="产品属性类型" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_CONT_TYPE" placeholder="合同类型" :colspan="24"></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModel" rules="required" data-code="STD_LOAN_MODAL" placeholder="贷款形式" :colspan="24"></yu-xform-item>
          <yu-xform-item label="担保方式 " ctype="select" name="guarWay" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式 " :colspan="24" @change="isLowRisk"></yu-xform-item>
          <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" :colspan="24"></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" :colspan="24" icon="search" disabled:triger-click="false" :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否续签 " ctype="select" name="isRenew" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否续签" @change="iRChange"></yu-xform-item>
          <yu-xform-item label="原合同编号" ctype="input" name="origiContNo" rules="required" v-if="ocHidden" placeholder="原合同编号" icon="search" :triger-click="true" :on-icon-click="commonDgContSelect"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('nextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      ocHidden: true,
      updateUrl: this.$backend.cmisLmt + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisLmt + '/api/iqploanapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      customParams: {},
      isLmtAccNoRequired: true
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.contType = this.$xutils.getDefaultformulaData('一般合同');
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

    // 原合同选择
    commonDgContSelect () {
      let cusId = this.formdata.cusId;
      let lmtAccNo = this.formdata.lmtAccNo;
      if (!lmtAccNo || lmtAccNo == null || lmtAccNo == '') {
        this.$message({ message: '授信额度编号不能为空!\r\n请重新操作!', type: 'warning' });
        return;
      }
      var data = { cusId: cusId, lmtAccNo: lmtAccNo, busiType: '04'};
      this.$dialog.open('', 'zrcbank/biz/common/commonDgContSelect', 1000, 800, data, params => {
        this.formdata.origiContNo = params.contNo;
      });
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

    handleIconClick: function () {
      var _this = this;
      let cusId = _this.formdata.cusId;
      if (cusId == null || cusId == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '客户编号不能为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      let instuCde = loginUser.instu.code;
      if (instuCde == null || instuCde == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '客户机构不能为空!\r\n请重新操作!',
          350,
          150
        );
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
      this.$dialog.open(
        '',
        'zrcbank/lmt/singleCusQuoApp/singleCusQuoApp',
        -1,
        -1,
        data,
        (params) => {
          var status = params.status;
          if (status != '01') {
            _this.$xutils.showMsgBox('提示', '请选择生效的授信额度!', 350, 150);
            return;
          }
          var lmtBizType = params.limitSubNo;
          if (!lmtBizType) {
            _this.$xutils.showMsgBox('提示', '请选择授信产品!', 350, 150);
            return;
          }
          this.formdata.lmtAccNo = params.apprSubSerno;
          this.formdata.prdTypeProp = params.lmtBizTypeProp;
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
        }
      );
    },

    // 获取分项额度号
    getAccSubNo (accSubPrdNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          backend.cmisBiz +
          '/api/lmtreplyaccsubprd/querylmtreplyaccsubprdbyparams',
        data: { accSubPrdNo: accSubPrdNo },
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
        url:
          backend.cmisBiz + '/api/lmtreplyaccsub/getlmtreplyaccsubbyaccsubno',
        data: { accSubNo: accSubNo },
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
        _this.$xutils.showMsgBox(
          '提示',
          '客户编号不能为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      let instuCde = loginUser.org.code;
      if (instuCde == null || instuCde == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '客户机构不能为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      let lmtAccNo = _this.formdata.lmtAccNo;
      if (lmtAccNo == null || lmtAccNo == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '授信额度编号不能为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      var data = { cusId: '', instuCde: '', lmtAccNo: lmtAccNo };
      this.$dialog.open(
        '',
        'zrcbank/biz/pvpLoanApp/singleCtrSelectApp',
        1000,
        800,
        data,
        (params) => {
          // console.log(params);
          this.formdata.origiContNo = params.contNo;
        }
      );
    }
  },
  watch: {
    'formdata.lmtAccNo': function (val) {
      if (val) {
        this.customParams = {
          condition: {contStatus: '200', lmtAccNo: val, bizType: '04'}
        };
      }
    }
  }
};
</script>
