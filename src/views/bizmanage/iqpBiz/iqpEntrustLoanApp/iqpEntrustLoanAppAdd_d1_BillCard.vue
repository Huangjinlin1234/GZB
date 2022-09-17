<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="合同申请业务号" ctype="input" placeholder="合同申请业务号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId" width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-dg-prd-pop" name="prdId" rules="required" placeholder="产品编号" disabled @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="input" placeholder="业务类型" name="busiType" hidden></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" data-code="STD_LOAN_MODAL" placeholder="贷款形式" disabled></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" name="contType" data-code="STD_CONT_TYPE" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" disabled></yu-xform-item>
          <!--<yu-xform-item label="授信额度编号" ctype="yu-xcusquo" name="lmtAccNo" rules="required" :params="params" placeholder="授信额度编号" @select-fn="commonSelectFn" :mapping="{ apprsubserno: 'lmtAccNo' }" width="730" height="480"></yu-xform-item>-->
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" hidden></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input" name="lmtAccNo" rules="required" placeholder="授信额度编号" icon="search" disabled:triger-click="false" :on-icon-click="handleIconClick" :readonly="true" @focus="focusFn"></yu-xform-item>
          <yu-xform-item label="是否续签 " ctype="select" name="isRenew" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否续签" @change="iRChange"></yu-xform-item>
          <yu-xform-item label="原合同编号" ctype="input" name="origiContNo" rules="required" v-if="ocHidden" placeholder="原合同编号" icon="search" :triger-click="true" :on-icon-click="commonDgContSelect"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('nextStep1')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY, STD_LOAN_MODAL,STD_CONT_TYPE, STD_ZB_YES_NO,STD_ZB_CUS_CLS');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpentrustloanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpentrustloanapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      params: {},
      ocHidden: true,
      customParams: {}
    };
  },
  methods: {
    iRChange (value) {
      if (value == '0') {
        // document.getElementById('ocHidden').style.display = 'none';
        this.ocHidden = false;
      } else {
        // document.getElementById('ocHidden').style.display = 'block';
        this.ocHidden = true;
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

    // 原合同选择
    commonDgContSelect () {
      let cusId = this.formdata.cusId;
      let lmtAccNo = this.formdata.lmtAccNo;
      if (!lmtAccNo || lmtAccNo == null || lmtAccNo == '') {
        this.$message({ message: '授信额度编号不能为空!\r\n请重新操作!', type: 'warning' });
        return;
      }
      var data = { cusId: cusId, lmtAccNo: lmtAccNo, busiType: '09'};
      this.$dialog.open('', 'zrcbank/biz/common/commonDgContSelect', 1000, 800, data, params => {
        this.formdata.origiContNo = params.contNo;
      });
    },


    handleIconClick: function () {
      // console.log(this.formdata.cusId);
      var _this = this;
      let cusId = _this.formdata.cusId;
      if (cusId == null || cusId == '') {
        _this.$xutils.showMsgBox('提示', '客户编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let prdId = _this.formdata.prdId;
      if (prdId == null || prdId == '') {
        _this.$xutils.showMsgBox('提示', '产品编号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      let instuCde = loginUser.instu.code;
      if (instuCde == null || instuCde == '') {
        _this.$xutils.showMsgBox('提示', '客户机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      var data = { cusId: cusId, instuCde: instuCde, isPreCrd: '0', prdId: prdId};
      this.$dialog.open('', 'zrcbank/lmt/singleCusQuoApp/singleCusQuoApp', -1, -1, data, params => {
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

    focusFn: function () {
      this.handleIconClick();
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
      let busiType = '09';
      var data = { cusId: '', instuCde: '', lmtAccNo: lmtAccNo, busiType: busiType };
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
          condition: {contStatus: '200', lmtAccNo: val, busiType: '09'}
        };
      }
    }
  }
};
</script>
