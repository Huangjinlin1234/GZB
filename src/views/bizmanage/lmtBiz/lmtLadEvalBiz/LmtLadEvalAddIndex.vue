<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './LmtLadEvalAdd_d1_BillCard.vue';
/**
 * title 客户限额及债项评级测算
 * author zhangming12
 * date 2021-04-13
 * */
var rtnData;

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var serno = '';
      this.d1_BillCard = this.$refs.d1_BillCard;
      // this.d1_BillCard.setBillCardItemValue('cur_other_bank_debt', '888');
      if (this.$route.meta.params) {
        this.d1_BillCard.setBillCardItemValue('serno', this.$route.meta.params.serno);
        this.d1_BillCard.setBillCardItemValue('cus_id', this.$route.meta.params.cus_id);
        serno = this.$route.meta.params.grpSerno || this.$route.meta.params.serno;
      }
      if (!serno) {
        serno = this.getFactory().contextData.instanceInfo.bizId;
        this.d1_BillCard.setBillCardItemValue('serno', this.getFactory().contextData.instanceInfo.bizId);
        this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.instanceInfo.bizUserId);
      }

      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/lmtladeval/selectsinglebyserno',
        data: serno
      })
        .then(response => {
          // 重置表单数据
          // 给表单数据赋值
          this.$utils.clone(response.data, this.d1_BillCard.formdata);
          // this.d1_BillCard.setBillCardItemValue('cur_other_bank_debt', '888');
          this.d1_BillCard.setBillCardItemValue('serno', this.getFactory().contextData.serno);
          this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.cus_id);
        });

      // this.d1_BillCard.queryDataByCondition({iqp_serno: this.getFactory().contextData.iqpSerno});
    },

    // 单一客户限额测算
    calSingleLmt () {
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }
      var _this = this;
      const param = _this.d1_BillCard.getBillCardValue();
      param['cusId'] = _this.$route.meta.params.borrowerCusId;
      param['cusName'] = _this.$route.meta.params.borrowerCusName;
      param['serno'] = _this.$route.meta.params.serno;
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(this.$xutils.toUpperCase(param, true)),
        url: this.$backend.cmisBiz + '/api/lmtladeval/calSingleLmt',
        callback: function (code, message, response) {
          if (response.code == '0') {
            rtnData = _this.$xutils.toUpperCase(response.data, false);
            _this.d1_BillCard.setBillCardValue(rtnData);
            _this.$xutils.showMsgBox('单一客户限额测算成功！');
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息 ：' + response.message);
          }
        }
      });
    },

    // 债项评级测算
    loanRating () {
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }
      this.d1_BillCard.setItemValue('ead', '0.25');
      this.d1_BillCard.setItemValue('lgd', '0.3');
      this.d1_BillCard.setItemValue('debtLevel', '中等');
      this.$xutils.showMsgBox('债项评级测算成功！');
      // var op = this.$route.meta.params.op;
      // var lmtLadEval = this.d1_BillCard.getBillCardValue();
      // lmtLadEval.serno = this.$route.meta.params.serno;
      // var reqUrl = this.$backend.cmisBiz + '/api/lmtladeval/loanRating';
      // if (op == 'VIEW') {
      // } else if (op == 'EDIT') {
      // }
      // this.$xutils.request({
      //   // 同步请求
      //   async: false,
      //   type: 'POST',
      //   url: reqUrl,
      //   data: JSON.stringify(this.$xutils.toUpperCase(lmtLadEval, true)),
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       if (response.data.rtnCode == '0000') {
      //         this.d1_BillCard.setItemValue('ead', response.data.lmtLadEval.ead);
      //         this.d1_BillCard.setItemValue('lgd', response.data.lmtLadEval.lgd);
      //         this.d1_BillCard.setItemValue('debtLevel', response.data.lmtLadEval.debtLevel);
      //         this.$xutils.showMsgBox('债项评级测算成功！');
      //       } else if (response.data.rtnCode == '20057') {
      //         this.$xutils.showMsgBox(response.data.rtnMsg);
      //       } else if (response.data.rtnCode == '20058') {
      //         this.$xutils.showMsgBox(response.data.rtnMsg);
      //       }
      //     } else {
      //       this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
      //     }
      //   },
      //   error: (result, b) => {
      //     this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    },

    onSaveDate () {
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }
      var _this = this;
      const param = _this.d1_BillCard.getBillCardValue();
      param['cusId'] = _this.$route.meta.params.borrowerCusId;
      param['cusName'] = _this.$route.meta.params.borrowerCusName;
      param['serno'] = _this.$route.meta.params.serno;
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/lmtladeval/insertselective',
        data: JSON.stringify(this.$xutils.toUpperCase(param, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.doMustCheck(_this.$route.meta.params.serno);
            this.$xutils.showMsgBox('提示', '保存成功');
            this.getFactory().back();
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    doMustCheck: function (serno) {
      var obj = {};
      obj.serno = serno;
      obj.pageId = 'khxejzxpj';
      obj.pageName = '客户限额及债项评级';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    goBack () {
      this.getFactory().back();
    },
    // 现有他行负债=客户对外负债-我行存量敞口授信
    calCurOtherBankDebt () {
      let _this = this;
      let param = _this.d1_BillCard.getBillCardValue();
      param['cusId'] = _this.$route.meta.params.borrowerCusId;
      param['cusName'] = _this.$route.meta.params.borrowerCusName;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtladeval/calcurotherbankdebt',
        data: JSON.stringify(_this.$xutils.toUpperCase(param, true)),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.d1_BillCard.setBillCardItemValue('curOtherBankDebt', response.data);
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    }
  }
};
</script>
