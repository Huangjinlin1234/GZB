<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './creditQryBizRealListInsectIndex_d2_BillCard.vue';
import { isOrgCode, isZZM } from '@/utils/validate';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillCard: null,
      crqlSerno: ''
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillCard = this.$refs.d1_BillCard;
      this.d1BillCard.setItemValue('qryCls', '苏州地方', '3');
      this.d1BillCard.execBillCardDefaultValueFormula();
      this.crqlSerno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
      // const crql_serno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
      // this.d1BillCard.setBillCardItemValue('bizSerno', crql_serno);
      this.d1BillCard.setBillCardItemValue('scene', '01');
    },

    onSave () {
      // 添加权限校验得代码
      const saveFlag = this.d1BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      var certType = this.d1BillCard.getBillCardItemValue('certType');
      if (certType === 'Q' || certType === 'R') {
        if (!isOrgCode(this.d1BillCard.getBillCardItemValue('certCode'), certType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }
      if(certType == 'P2') {
        if (!isZZM(this.d1BillCard.getBillCardItemValue('certCode'))) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }

      var _this = this;
      var model = {};
      yufp.clone(_this.d1BillCard.$refs.refForm.formdata, model);
      model.crqlSerno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
      model.bizSerno = this.pageParams.bizSerno; // 其他业务传入值
      model['qryFlag'] = '02';
      if (model.qryCls == '3') {
        model['borrowRel'] = '';
      }

      // 保存数据
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/createCreditAndRel',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '保存成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    },

    saveCreditQryBiz (model) {
      if (model.qryCls == '3') {
        model['borrowRel'] = '';
      }
      var _this = this;
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditqrybizreal/createBySerno',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '保存成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    }
  }
};
</script>
