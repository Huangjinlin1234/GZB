<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './creditQryBizRealListUpdateIndex_d2_BillCard.vue';
import { isOrgCode, isZZM } from '@/utils/validate';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillCard = this.$refs.d1_BillCard;
      this.d1BillCard.queryDataByCondition({'crqlSerno': this.pageParams.crqlSerno}, 'post');
      // this.d1BillCard.setItemEditable('cusId', false);
    },

    onContinue () {
      // 检验必输项
      const saveFlag = this.d1BillCard.validateBillCardValue();
      var _this = this;

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

      // 保存
      var model = {};
      model = _this.pageParams;
      yufp.clone(_this.d1BillCard.$refs.refForm.formdata, model);
      model['qryFlag'] = '02';
      if (model.qryCls == '3') {
        model['borrowRel'] = '';
      }

      // 保存数据
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/updateCreditAndRel',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '修改成功!', 500, 300, function () {
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

    updateCreditQryBiz (model) {
      if (model.qryCls == '3') {
        model['borrowRel'] = '';
      }
      var _this = this;
      // 保存数据
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditqrybizreal/update',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '修改成功!', 500, 300, function () {
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
