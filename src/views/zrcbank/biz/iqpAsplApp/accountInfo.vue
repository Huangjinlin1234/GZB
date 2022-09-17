
<template>
  <div style="margin-bottom: 20px;">
    <yu-panel title="账户信息" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" :data="accountInfoData" :pageable="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="保证金账号" v-if="!show" prop="bailAccNo" ctype="input" icon="search" :triger-click="initBail" :on-icon-click="initBail" :data="bailAccNoData" ></yu-xtable-column>
        <yu-xtable-column label="保证金账号" v-if="show" prop="bailAccNo"></yu-xtable-column>
        <yu-xtable-column label="保证金账号户名" prop="bailAccName" :data="bailAccNameData"></yu-xtable-column>
        <yu-xtable-column label="保证金留存比例" prop="bailRate"></yu-xtable-column>
        <yu-xtable-column label="结算账号" v-if="!show" prop="acctNo" ctype="input" icon="search" :triger-click="initEndAccount" :on-icon-click="initEndAccount" ></yu-xtable-column>
        <yu-xtable-column label="结算账号" v-if="show" prop="acctNo"></yu-xtable-column>
        <yu-xtable-column label="结算账号户名" prop="acctName"></yu-xtable-column>
        <yu-xtable-column label="手续费比例" prop="chrgRate" ></yu-xtable-column>
        <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      accountInfoData: [],
      model: {},
      show: false
    };
  },
  created () {
    let _this = this;
    let jsoPar = {};
    if (this.getFactory().contextData.instanceInfo) {
      jsoPar = this.getFactory().contextData.instanceInfo.param;
    } else if (_this.$route.meta.params) {
      jsoPar = _this.$route.meta.params;
    }
    let serno = jsoPar.serno;
    let cusId = jsoPar.cusId;
    _this.model = {
      serno: serno,
      cusId: cusId
    };
    // 初始化账户信息列表
    if (jsoPar.op == 'VIEW') {
      _this.show = true;
    } else {
      _this.show = false;
    }
    _this.initSubAndPrdList(_this.model);
  },

  methods: {
    initSubAndPrdList (model) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpappaspl/queryasplbailacctdtodatabyserno',
        data: model,
        callback: function (code, message, response) {
          _this.accountInfoData = response.data;
        }
      });
    },

    // 选取保证金
    initBail: function (value) {
      var _this = this;
      let jsoPar = _this.$refs.refTable.selections[0];
      let serno = _this.$route.meta.params.serno;
      // 开户类型437（老有测试开户不对）
      let zhshuxin = '437';
      let bailPreRate = jsoPar.bailPreRate;
      let cusId = jsoPar.cusId;
      if (!jsoPar.bailAccNo) {
        _this.$message({
          message: '请先输入保证金帐号！',
          type: 'warning'
        });
        return;
      }
      var data = { bailAccNo: jsoPar.bailAccNo, serno: serno, zhshuxin: zhshuxin, bailRate: bailPreRate, cusId: cusId};
      this.$dialog.open('', 'zrcbank/biz/common/commonBailSelect', 1000, 800, data, params => {
        if (params.errCode != '9999') {
          _this.initSubAndPrdList(_this.model);
        } else {
          _this.accountInfoData[0].bailAccNo = '';
        }
      });
    },

    // 选取结算账户
    initEndAccount: function () {
    // console.log(this.formdata.cusId);
      var _this = this;
      debugger
      let serno = _this.$route.meta.params.serno;
      let pkId = _this.$route.meta.params.pkId;
      let jsoPar = _this.$refs.refTable.selections[0];
      let cusId = jsoPar.cusId;
      if (!jsoPar.acctNo) {
        _this.$message({
          message: '请先输入结算帐号！',
          type: 'warning'
        });
        return;
      }
      var data = { acctNo: jsoPar.acctNo, serno: serno, pkId: pkId, cusId: cusId };
      this.$dialog.open('', 'zrcbank/biz/common/commonEndAccount', 1000, 800, data, params => {
        if (params.errCode != '9999') {
          _this.initSubAndPrdList(_this.model);
        } else {
          _this.accountInfoData[0].acctNo = '';
        }
      });
    }

  }
};
</script>