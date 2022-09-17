<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls" hidden></yu-xform-item>
          <yu-xform-item label="票据种类 " ctype="select" name="drftType" rules="required" data-code="STD_DRFT_TYPE" placeholder="票据种类" @change="confirmDiscContType"></yu-xform-item>
          <yu-xform-item label="承兑企业客户编号" ctype="yu-xcustom-ref" name="acptCrpCusId" rules="required" placeholder="承兑企业客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'acptCrpCusId','cusName':'acptCrpCusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="承兑企业客户名称" ctype="input" placeholder="承兑企业客户名称" name="acptCrpCusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-dg-prd-pop" name="prdId" rules="required" placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" disabled></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="协议类型" ctype="select" name="discContType" rules="required" data-code="STD_DISC_CONT_TYPE" placeholder="协议类型" :disabled="isDiscContTypeReadonly"></yu-xform-item>
          <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度"></yu-xform-item>
          <yu-xform-item label="申请人授信额度编号" ctype="input" name="lmtAccNo" placeholder="申请人授信额度编号" icon="search" :triger-click="false" :on-icon-click="handleIconClick" width="730" height="480"  :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }"></yu-xform-item>
          <yu-xform-item label="承兑企业授信额度编号" ctype="input" name="acptCrpLmtNo" rules="required" placeholder="承兑企业授信额度编号" icon="search" :triger-click="false" :on-icon-click="handleIconClick1" width="730" height="480" :hidden="isAcptCrpLmtNoHiden"></yu-xform-item>
          <yu-xform-item label="申请人批复编号" ctype="input" placeholder="申请人批复编号" name="replyNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="承兑企业批复编号" ctype="input" placeholder="承兑企业批复编号" name="acptCrpReplyNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保方式 " ctype="select" name="guarMode" hidden placeholder="担保方式"></yu-xform-item>
          <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否续签合同" @change="iRChange"></yu-xform-item>
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
yufp.lookup.reg('STD_DRFT_TYPE,STD_DISC_CONT_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      ocHidden: true,
      updateUrl: this.$backend.cmisBiz + '/api/iqpdiscapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpdiscapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      isDiscContTypeReadonly: false,
      isAcptCrpLmtNoHiden: false,
      File: {},
      customParams: {},
      isLmtAccNoRequired: true
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
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

    // 判断已选客户是否存在综合授信以及是否存在低风险分项(有则自动挂接低风险)
    isExistMultipleAndLowRiskLmt () {
      var _this = this;
      var cusId = _this.formdata.cusId;
      var drftType = _this.formdata.drftType;
      if (drftType == null || drftType == '') {
        return;
      }
      let isSuccess = true;
      var prdId = _this.formdata.prdId;
      if (prdId == null || prdId == '') {
        this.$xutils.showMsgBox('提示', '请先选择产品!', 350, 150);
        return;
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyacc/isexistmultipleandlowrisklmt',
        data: {cusId: cusId, prdId: prdId},
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.formdata.lmtAccNo = response.data.accSubPrdNo;
            _this.getReplySerno(response.data.accSubNo);
          } else {
            isSuccess = false;
            _this.formdata.drftType = '';
            _this.formdata.cusId = '';
            _this.formdata.cusName = '';
          }
        }
      });
      if (isSuccess == false) {
        _this.$xutils.showMsgBox('提示', '已选客户不符合做贴现协议申请的要求，请重新选择!', 350, 150);
        return;
      }
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

    // 票据类型筛选
    confirmDiscContType () {
      var drftType = this.formdata.drftType;
      if (drftType == '2') {
        this.formdata.discContType = '01';
        this.isDiscContTypeReadonly = true;
        this.formdata.prdId = '052199';
        this.formdata.prdName = '商业汇票贴现';
        this.isAcptCrpLmtNoHiden = false;
        this.formdata.lmtAccNo = '';
        this.isLmtAccNoRequired = true;
      } else {
        this.formdata.prdId = '052198';
        this.formdata.prdName = '银行承兑汇票贴现';
        this.isDiscContTypeReadonly = false;
        this.isAcptCrpLmtNoHiden = true;
        this.isLmtAccNoRequired = false;
        this.isExistMultipleAndLowRiskLmt();
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
      var data = { cusId: cusId, lmtAccNo: lmtAccNo, busiType: '03'};
      this.$dialog.open('', 'zrcbank/biz/common/commonDgContSelect', 1000, 800, data, params => {
        this.formdata.origiContNo = params.contNo;
      });
    },

    handleIconClick: function () {
      var _this = this;
      let cusId = _this.formdata.cusId;
      let isConpany = false;
      if (cusId == null || cusId == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '客户编号不能为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      let prdId = _this.formdata.prdId;
      if (prdId == null || prdId == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '产品编号不能为空!\r\n请重新操作!',
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
      var data = { cusId: cusId, instuCde: instuCde, isPreCrd: '0', prdId: prdId};
      this.$dialog.open(
        '',
        'zrcbank/lmt/singleCusQuoApp/singleCusQuoApp',
        -1,
        -1,
        data,
        (params) => {
          // this.formdata.guarMode = params.suitguarway;
          var lmtBizType = params.limitSubNo;
          if (!lmtBizType) {
            _this.$xutils.showMsgBox('提示', '请选择授信产品!', 350, 150);
            return;
          }
          // 申请人授信额度编号
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
            this.getAccSubNo(params.apprSubSerno, isConpany);
          }
        }
      );
    },

    // 商票双占
    handleIconClick1: function () {
      var _this = this;
      let acptCrpCusId = _this.formdata.acptCrpCusId;
      let isConpany = true;
      if (acptCrpCusId == null || acptCrpCusId == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '承兑企业客户编号不能为空!\r\n请重新操作!',
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
      let prdId = _this.formdata.prdId;
      if (prdId == null || prdId == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '产品编号不能为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      var data = { cusId: acptCrpCusId, instuCde: instuCde, isPreCrd: '0', prdId: prdId};
      this.$dialog.open(
        '',
        'zrcbank/lmt/singleCusQuoApp/singleCusQuoApp',
        -1,
        -1,
        data,
        (params) => {
          // this.formdata.guarMode = params.suitguarway;
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
          // 承兑企业授信额度编号
          this.formdata.acptCrpLmtNo = params.apprSubSerno;
          this.formdata.guarMode = params.suitGuarWay;
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
            this.getAccSubNo(params.apprSubSerno, isConpany);
          }
        }
      );
    },

    // 获取分项额度号
    getAccSubNo (accSubPrdNo, isConpany) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsubprd/querylmtreplyaccsubprdbyparams',
        data: { accSubPrdNo: accSubPrdNo },
        callback: function (code, message, response) {
          var accSubNo = response.data.accSubNo;
          _this.getReplySerno(accSubNo, isConpany);
        }
      });
    },

    // 获取批复流水号
    getReplySerno (accSubNo, isConpany) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsub/getlmtreplyaccsubbyaccsubno',
        data: { accSubNo: accSubNo },
        callback: function (code, message, response) {
          if (isConpany == true) {
            _this.formdata.acptCrpReplyNo = response.data.replySerno;
          } else {
            _this.formdata.replyNo = response.data.replySerno;
          }
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
          condition: {contStatus: '200', lmtAccNo: val, busiType: '03'}
        };
      }
    }
  }
};
</script>
