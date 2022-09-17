<template>
  <!--
    @created by zhuly6 2020-05-06
    @updated by 詹煜彪
    @description 客户管理组件使用示例
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false" id="baseInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="银承出账流水号" name="serno" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户号" name="cusId" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="保证金币种" name="bailCurType" rules="required" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="母户序号" name="firstAccount" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="保证金账号" name="bailAccNo" rules="required" ctype="input">
          <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="getAccBailNo">选择</yu-button>
          </yu-xform-item>
          <yu-xform-item label="保证金账户名称" name="bailAccName" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="保证金开户行号" name="acctsvcrNo" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="保证金账号子序号" name="bailAccNoSub" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="保证金金额" name="bailAmt" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="计结息方式" name="bailInterestMode" rules="required"  ctype="select" data-code="STD_BAIL_INTEREST_MODE" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="待清算账户名" name="clearAccname" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="待清算账号" name="clearAccno" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="结算账号" name="settlAccno" rules="required" ctype="input" colspan="10">
          <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="getAccSettNo">选择</yu-button>
          </yu-xform-item>
          <yu-xform-item label="结算账号户名" name="settlAccname" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="结算账号子序号" name="settlAccnoSub" rules="required" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
      <yu-form-buttons align="center">
          <yu-button type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_BAIL_INTEREST_MODE');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      activeName: 'workSche',
      searchFormdata: {},
      dataUrl: backend.pvpLoanAppService + '/api/pvploanapp/',
      formdata: {},
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
  mounted () {
    // 初始化参数
    var _this = this;
    _this.data = this.pageParams;
    // this.tableFormdata.serno = _this.data.pvpSerno;
    // this.tableFormdata.cusId = _this.data.cusId;
    yufp.clone(_this.data, this.tableFormdata);
    // this.tableFormdata.serno = _this.data.pvpSerno;
  },
  methods: {
    // 取消
    cancelFn: function () {
      var _this = this;
      this.$dialog.close(this.dialogId);
    },
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '203' || op.key === '206' || op.key === '301') {
          return true;
        }
        return false;
      });
    },
    // 保存
    saveFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var model = {};
      yufp.clone(_this.tableFormdata, model);
      // 向后台发送保存请求
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/savebailaccinfo',
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
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
      const params = model;
      _this.$dialog.close(_this.dialogId, params);
    },

    getAccBailNo () {
      let jsoPar = this.tableFormdata;

      var _this = this;
      let bailAccNo = jsoPar.bailAccNo;
      // if (bailAccNo == null || bailAccNo == '') {
      //   _this.$xutils.showMsgBox('提示', '账号不能为空!\r\n请重新操作!', 350, 150);
      //   return;
      // }

      var data = { bailCurType: jsoPar.bailCurType, bailAccNo: bailAccNo};
      // var data = {};
      this.$dialog.open('', 'zrcbank/biz/pvpAccpApp/singleBailSelectApp', 1600, 800, data, params => {
        // console.log(params);bailCurType
        this.$refs.refForm.formdata.bailCurType = params.bailCurType;
        this.$refs.refForm.formdata.bailAccName = params.bailAccName;
        this.$refs.refForm.formdata.bailAccNoSub = params.bailAccNoSub;
        this.$refs.refForm.formdata.clearAccno = params.clearAccno;
        this.$refs.refForm.formdata.clearAccname = params.clearAccname;
        this.$refs.refForm.formdata.firstAccount = params.firstAccount;
        this.$refs.refForm.formdata.acctsvcrNo = params.acctsvcrNo;
      });
    },

    getAccSettNo () {
      let jsoPar = this.tableFormdata;

      var _this = this;
      let loanPayoutAccno = jsoPar.settlAccno;
      if (loanPayoutAccno == null || loanPayoutAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { loanPayoutAccno: jsoPar.settlAccno };
      this.$dialog.open('', 'bizmanage/iqpBiz/iqpEntrustLoanApp/singleAccountSelectApp', 1600, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.settlAccname = params.zhhuzwmc;
        this.$refs.refForm.formdata.settlAccnoSub = params.zhhaoxuh;
      });
    }
  }
};
</script>
