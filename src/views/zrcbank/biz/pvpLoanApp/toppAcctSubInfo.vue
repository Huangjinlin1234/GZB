<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请-交易对手账户修改
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata">
      <yu-xform-group column="1">
        <yu-xform-item label="流水号" name="bizSerno" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="业务场景" name="bizSence" ctype="select" rules="required" data-code="STD_BIZ_SENCE"></yu-xform-item>
        <yu-xform-item label="是否线上" name="isOnline" ctype="select" data-code="STD_ZB_YES_NO" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="是否本行账户" name="isBankAcct" ctype="select" data-code="STD_ZB_YES_NO" rules="required" @change="isBankAcctChange"></yu-xform-item>
        <yu-xform-item label="交易对手账号" name="toppAcctNo" ctype="input" rules="required" icon="search" :triger-click="false" :on-icon-click="handleIconClick"></yu-xform-item>
        <yu-xform-item label="交易对手名称" name="toppName" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="交易对手金额" name="toppAmt" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="开户行号" ctype="input" placeholder="开户行行号" name="acctsvcrNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }" :hidden="isHidden" :colspan="22">
          <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get"  :colspan="2" :hidden="isHidden">
              <yu-button type="primary" @click="getAcctsvcrNo">选择</yu-button>
            </yu-xform-item>
        <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName" rules="required" :colspan="24" :hidden="isHidden"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-xform-item label=" " label-suffix=" " ctype="custom" name="content" :rows="6" class="custom-button" alion="center">
        <yu-button type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </yu-xform-item>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO');

export default {
  obj: {},
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      formdata: {},
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      isHidden: false
    };
  },

  mounted () {
    var _this = this;
    let data = _this.pageParams;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/toppacctsub/showdetialsub',
      data: { pkId: data.pkId },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.tableFormdata);
      }
    });
  },

  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      // this.$router.go(-1);
      this.$dialog.close(this.dialogId);
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      // model 和后台的对象pvpLoanApp对应
      yufp.clone(_this.tableFormdata, model);
      var url = backend.cmisBiz + '/api/toppacctsub/commonupdatetoppacctsub';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$dialog.close(_this.dialogId);
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

    // 是否本行用户
    isBankAcctChange () {
      var _this = this;
      var isBankAcct = _this.tableFormdata.isBankAcct;
      if (isBankAcct == '1') {
        _this.isHidden = true;
      } else {
        _this.isHidden = false;
      }
    },

    // 选择开户行
    getAcctsvcrNo () {
      var _this = this;
      var jsoPar = _this.tableFormdata;
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
          this.tableFormdata.acctsvcrNo = '';
          this.tableFormdata.acctsvcrName = '';
        }
        this.$refs.refForm.tableFormdata.acctsvcrNo = params.bankNo;
        this.$refs.refForm.tableFormdata.acctsvcrName = params.bankName;
      });
    },
    // 选择交易对手账户
    handleIconClick: function () {
      var _this = this;
      if (!_this.tableFormdata.isBankAcct || _this.tableFormdata.isBankAcct == null || _this.tableFormdata.isBankAcct == '') {
        _this.$message({ message: '请先选择是否本行账户！', type: 'warning' });
        return;
      }
      if (_this.tableFormdata.isBankAcct == '1') {
        let toppAcctNo = _this.tableFormdata.toppAcctNo;
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
            this.$refs.refForm.tableFormdata.toppAcctNo = '';
            this.$refs.refForm.tableFormdata.toppName = '';
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
            this.$refs.refForm.tableFormdata.toppAcctNo = params.kehuzhao;
            this.$refs.refForm.tableFormdata.toppName = params.zhhuzwmc;
            this.$refs.refForm.formdata.acctsvcrNo = params.kaihjigo;
          }
        });
      } else {
        let data = { oprType: '01'};
        this.$dialog.open('', 'zrcbank/biz/common/commonToppAcctSelect.vue', -1, -1, data, params => {
          this.tableFormdata.toppAcctNo = params.toppAcctNo;
          this.tableFormdata.toppName = params.toppName;
          this.tableFormdata.acctsvcrNo = params.acctsvcrNo;
          this.tableFormdata.acctsvcrName = params.acctsvcrName;
        });
      }
    }
  }
};
</script>
