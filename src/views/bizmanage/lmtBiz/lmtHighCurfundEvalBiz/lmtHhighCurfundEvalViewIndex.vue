<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import cfgNodeRuleRelDetailList_d1_A_A_BillCardVue from '../../../cfgmanage/productconfig/cfgBizRulePlan/cfgNodeRuleRelDetailList_d1_A_A_BillCard.vue';
import d1Billcard from './lmtHhighCurfundEvalView_d1_BillCard.vue';
let serno;

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
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      if (_this.pageParams) {
        serno = _this.pageParams.serno;
        _this.$refs.d1_BillCard.flag = false;
        _this.$refs.d1_BillCard.isGrp = true;
      } else {
        serno = _this.$route.meta.params.serno;
      }
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      // 财报数据暂时不处理
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmthighcurfundeval/selectbyserno/' + serno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 重置表单数据
            this.d1_BillCard.form.resetFields();
            this.$utils.clone(response.data, this.d1_BillCard.formdata);
            if (response.data == null) {
              let rtnData = {
                'ltYearSaleIncome': 20000,
                'ltYearSaleProfitRate': 0.2,
                'ltYearPpmTurnoDay': 3,
                'ltYearIvtTurnoDay': 4,
                'ltYearRcvTurnovDay': 5,
                'ltYearAcpTurnovDay': 7,
                'ltYearAdvanceTurnovDay': 8,
                'ltYearOprfundsTurnovDay': 9,
                'borrowerCap': 10
              };
              // 重置表单数据
              this.d1_BillCard.form.resetFields();
              this.$utils.clone(rtnData, this.d1_BillCard.formdata);
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 将取到的最新的 财报数据重新赋值到页面上
      // let rtnData = {
      //   'ltYearSaleIncome': 20000,
      //   'ltYearSaleProfitRate': 0.2,
      //   'ltYearPpmTurnoDay': 3,
      //   'ltYearIvtTurnoDay': 4,
      //   'ltYearRcvTurnovDay': 5,
      //   'ltYearAcpTurnovDay': 7,
      //   'ltYearAdvanceTurnovDay': 8,
      //   'ltYearOprfundsTurnovDay': 9,
      //   'borrowerCap': 10
      // };
      // // 重置表单数据
      // this.d1_BillCard.form.resetFields();
      // this.$utils.clone(rtnData, this.d1_BillCard.formdata);
    },

    onSure () {
      // 校验参数是否为空
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }

      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();
      let iqpEntrustLoanApp = this.$xutils.toUpperCase(jsoPar, true);
      // 确认操作
      // 调用ajax请求落地后端接口数据
      this.$request({
        // 同步请求
        method: 'post',
        url: this.$backend.cmisBiz + '/api/lmthighcurfundeval/update',
        data: JSON.stringify(iqpEntrustLoanApp)
      })
        .then(response => {
          if (response.code == '0') {
            this.doMustCheck(jsoPar.serno);
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
            });
          }
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    doMustCheck: function (data) {
      var _this = this;
      var obj = {};
      obj.serno = data;
      obj.pageId = 'ldzjcsb';
      obj.pageName = '流动资金测算表';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    // 测算营运资金量
    calOptAmt () {
      let fdata = this.d1_BillCard.getBillCardValue();
      let checkFlag = this.d1_BillCard.validateBillCardValue();
      if (!checkFlag) {
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmthighcurfundeval/calOptAmt',
        data: JSON.stringify(this.$xutils.toUpperCase(fdata, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data;
            this.d1_BillCard.setItemValue('opr_cap', this.rtnData['oprCap']);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 测算额度
    calLimit () {
      let fdata = this.d1_BillCard.getBillCardValue();
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      if (!fdata['oprCap']) {
        this.$xutils.showMsgBox('提示', '请先测算营运资金');
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmthighcurfundeval/calLimit',
        data: JSON.stringify(this.$xutils.toUpperCase(fdata, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data;
            this.d1_BillCard.setItemValue('curfund_loan_lmt', this.rtnData['curfundLoanLmt']);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }

  }
};
</script>
