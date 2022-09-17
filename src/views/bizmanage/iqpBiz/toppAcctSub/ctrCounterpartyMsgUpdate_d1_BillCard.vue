<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="业务主键号" ctype="input" placeholder="业务主键号" name="bizSerno" rules="required" disabled hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="业务场景" ctype="input" placeholder="业务场景" name="bizSence" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="是否线上" ctype="select" name="isOnline" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否线上" :colspan="24"></yu-xform-item>
          <yu-xform-item label="是否本行账户" ctype="select" name="isBankAcct" rules="required" data-code="STD_ZB_YES_NO" @change="isBankAcctChange" placeholder="是否本行账户" :colspan="24"></yu-xform-item>
          <yu-xform-item label="交易对手账号" name="toppAcctNo" ctype="input" rules="required" icon="search" :triger-click="false" :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="交易对手名称" name="toppName" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="交易对手金额" ctype="yu-num" number-formatter="0,000.00" placeholder="交易对手金额" name="toppAmt" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="acctsvcrNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }" :hidden="isHidden" :colspan="22">
            <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get"  :colspan="2" :hidden="isHidden">
                <yu-button type="primary" @click="getAcctsvcrNo">选择</yu-button>
              </yu-xform-item>
          <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName" rules="required" :colspan="24" :hidden="isHidden"></yu-xform-item>

        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doUpdate')">确定</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/toppacctsub/update',
      addUrl: this.$backend.cmisBiz + '/api/toppacctsub/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      data: {},
      iqpSerno: '',
      isHidden: false
    };
  },
  mounted () {
    var _this = this;
    if (_this.getFactory().contextData.instanceInfo) {
      _this.data = _this.getFactory().contextData.instanceInfo;
      _this.iqpSerno = _this.data.bizId;
    } else if (_this.$route.meta.params) {
      _this.data = _this.$route.meta.params;
      _this.iqpSerno = _this.data.iqpSerno;
    } else {
      _this.data = _this.getFactory().contextData;
      _this.iqpSerno = _this.data.iqpSerno;
    }
  },
  methods: {
    isBankAcctChange () {
      var _this = this;
      var isBankAcct = _this.formdata.isBankAcct;
      if (isBankAcct == '1') {
        _this.isHidden = true;
      } else {
        _this.isHidden = false;
      }
    },

    getAcctsvcrNo () {
      var _this = this;
      var jsoPar = _this.formdata;
      // if (!jsoPar.acctsvcrNo) {
      //   _this.$message({
      //     message: '请先输入开户行行号！',
      //     type: 'warning'
      //   });
      //   return;
      // }
      var data = { aorgNo: jsoPar.acctsvcrNo };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
        // console.log(params);
        if (!params.bankNo) {
          this.formdata.acctsvcrNo = '';
          this.formdata.acctsvcrName = '';
        }
        this.$refs.refForm.formdata.acctsvcrNo = params.bankNo;
        this.$refs.refForm.formdata.acctsvcrName = params.bankName;
      });
    },
    // 选择交易对手账户
    handleIconClick: function () {
      var _this = this;
      if (!_this.formdata.isBankAcct || _this.formdata.isBankAcct == null || _this.formdata.isBankAcct == '') {
        _this.$message({ message: '请先选择是否本行账户！', type: 'warning' });
        return;
      }
      if (_this.formdata.isBankAcct == '1') {
        let toppAcctNo = _this.formdata.toppAcctNo;
        if (toppAcctNo == null || toppAcctNo == '') {
          _this.$message({ message: '交易对手账号不能为空!\r\n请重新操作!', type: 'warning' });
          // _this.$xutils.showMsgBox('提示', '交易对手账号不能为空!\r\n请重新操作!', 350, 150);
          return;
        }

        let data = { loanPayoutAccno: toppAcctNo };
        this.$dialog.open('', 'zrcbank/biz/common/commonAccountSelect.vue', 1000, 800, data, params => {
          if (params.kehuhaoo == _this.data.cusId) {
            _this.$message({ message: '交易对手客户号与借款人客户号不能相同,请重新选择！', type: 'warning' });
            // _this.$xutils.showMsgBox('提示', '交易对手客户号与借款人客户号不能,请重新选择！', 350, 150);
            this.$refs.refForm.formdata.toppAcctNo = '';
            this.$refs.refForm.formdata.toppName = '';
            return;
          } else {
            if (params.kzhuztai != '正常') {
              _this.$message({
                showClose: true,
                message: '已选账户状态不正常，请重新选择！',
                type: 'warning'
              });
              this.$refs.refForm.formdata.toppAcctNo = '';
              this.$refs.refForm.formdata.toppName = '';
              this.$refs.refForm.formdata.acctsvcrNo = '';
              return;
            }
            this.$refs.refForm.formdata.toppAcctNo = params.kehuzhao;
            this.$refs.refForm.formdata.toppName = params.zhhuzwmc;
            this.$refs.refForm.formdata.acctsvcrNo = params.kaihjigo;
          }
        });
      } else {
        let data = { oprType: '01'};
        this.$dialog.open('', 'zrcbank/biz/common/commonToppAcctSelect.vue', -1, -1, data, params => {
          this.formdata.toppAcctNo = params.toppAcctNo;
          this.formdata.toppName = params.toppName;
          this.formdata.acctsvcrNo = params.acctsvcrNo;
          this.formdata.acctsvcrName = params.acctsvcrName;
        });
      }
    }
  }
};
</script>