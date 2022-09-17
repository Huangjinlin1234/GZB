
<template>
  <div>
    <yu-panel title="经营性物业贷款检查" panel-type="simple">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formType != 'edit' ? true : false">
        <yu-xform-group>
          <yu-xform-item label="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="任务编号" name="taskNo" hidden></yu-xform-item>
          <yu-xform-item label="贷款金额" name="loanAmt" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="出租率" name="loanBalance" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款余额" name="rentRate" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="年租金" name="rentAmtYear" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款期限" name="loanTerm" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="我行账户当年回笼租金" name="rentAmtBack" ctype="input"  rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="租金归集账户是否为我行账户" name="isAcct" ctype="radio" rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="租金归集账户是否为我行账户说明" name="acctExpl" ctype="textarea" placeholder="租金归集账户是否为我行账户说明" :rules="rulesValue"></yu-xform-item>
          <yu-xform-item label="账号" name="acctNo" :disabled="formType != 'edit' ? true : false" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="getAccNo(1)">获取</yu-button>
            </yu-xform-item>
          <yu-xform-item label="账户名称" name="acctName" colspan="12"></yu-xform-item>
          <yu-xform-item label="账户序号" name="acctSeqNo" ></yu-xform-item>
          <yu-xform-item label="开户行" name="acctb" ></yu-xform-item>
          <yu-xform-item label="截至本次检查日，是否按我行还款计划按时足额还款" name="isRepay" ctype="radio" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" name="repayExpl" ctype="textarea" :rules="{required: isOverstockedProducts, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="是否收集全部承租户签订的《放弃租赁优先权的承诺书》" name="isSign" ctype="radio" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" name="signExpl" ctype="textarea" :rules="{required: isOrderDowen, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="绝大部分租户的租金是否按时支付" name="isDefrayOntime" ctype="radio" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" name="defrayExpl" ctype="textarea" :rules="{required: isOutputDowen, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="租金是否能覆盖我行贷款本息" name="isCover" ctype="radio" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" name="coverExpl" ctype="textarea" :rules="{required: isAddInvest, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="租金来源是否与租户一致" name="isIdentical" ctype="radio" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" name="identicalExpl" ctype="textarea" :rules="{required: isFinMatching, message: '必输项不允许为空'}"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  mixins: [mixinForm],

  data: function () {
    return {
      expandCollapseName: ['base'],
      formdata: { isAcct: '' },
      cusData: {},
      rulesValue: {required: false}
    };
  },

  props: {
    taskNo: String,
    cusId: String,
    formType: String
  },

  computed: {

    isOverstockedProducts: function () {
      return this.formdata.isRepay == '0';
    },
    isOrderDowen: function () {
      return this.formdata.isSign == '0';
    },
    isOutputDowen: function () {
      return this.formdata.isDefrayOntime == '0';
    },
    isAddInvest: function () {
      return this.formdata.isCover == '0';
    },
    isFinMatching: function () {
      return this.formdata.isIdentical == '0';
    }
  },

  watch: {

    'formdata.isAcct': function (val) {
      var _this = this;

      if (_this.cusId != '') {
        if (val == '1') {
          _this.$request({
            url: _this.$backend.cmisCus + '/api/cuscorp/queryCusCropDtoByCusId',
            method: 'post',
            data: _this.cusId
          }).then((response) => {
            if (response.code == '0') {
              yufp.clone(response.data, _this.cusData);
              // 账号
              _this.formdata.acctNo = _this.cusData.basicDepAccNo;
              // 开户行
              _this.formdata.acctb = _this.cusData.basicDepAccob;

              _this.$refs.refForm.setItemDisabled('acctNo', true);
              _this.$refs.refForm.setItemDisabled('acctb', true);
              _this.rulesValue = {required: false};
            }
          }).catch(() => {
            _this.$message({
              message: '请求失败'
            });
          });
        } else {
          _this.formdata.acctNo = '';
          _this.formdata.acctb = '';
          _this.$refs.refForm.setItemDisabled('acctNo', false);
          _this.$refs.refForm.setItemDisabled('acctb', false);
          _this.rulesValue = {required: true, message: '字段不能为空'};
        }
      }
    }
  },

  methods: {

    /**
    *根据账号回显名称
     */
    getAccNo (a) {
      let jsoPar = this.formdata;
      let acctNo = '';
      if (a == 1) {
        acctNo = jsoPar.acctNo;
      };

      yufp.service.request({
        method: 'post',
        url: this.$backend.cmisPsp + '/api/pspoperstatuscheckproperty/sendToIb1253',
        data: { acctNo: acctNo },
        callback: function (code, message, response) {
        // 处理请求成功的情况
          if (response.code == '0') {
            if (a == 1) {
              this.formdata.acctName = response.data.zhhuzwmc;
              this.formdata.acctSeqNo = response.data.zhaoxhao;
            }
          } else {
            this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.$backend.cmisPsp + '/api/pspoperstatuscheckproperty/update',
        method: 'post',
        data: this.formdata
      });
    }

  },

  created: function () {
    var _this = this;
    yufp.service.request({
      method: 'GET',
      url: _this.$backend.cmisPsp + '/api/pspoperstatuscheckproperty/',
      data: {condition: {taskNo: _this.taskNo}},
      callback: function (code, message, response) {
        if (response.code == '0') {
          yufp.clone(response.data[0], _this.formdata);
        }
      }
    });
  }


};
</script>
