<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './addIqpLoanApp_d1_BillCard.vue';
export default {
  components: { d1Billcard },
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
    // 新增单笔单批申请
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 初始化序列号信息
      this.initSequene();
    },
    /* 下一步按钮*/
    doNextStep () {
      const validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      this.saveData();
    },
    checkCusData4App () {},

    // 发后端保存
    saveData () {
      var flag = false;
      var iqpSerno = null;
      const reqData = this.$xutils.toUpperCase(
        this.d1_BillCard.getBillCardValue(),
        true
      );

      if (reqData) {
        var _this = this;
        // 向后台发送保存请求
        yufp.service.request({
          method: 'POST',
          async: true,
          url: this.$backend.cmisBiz + '/api/iqploanapp/saveiqploanappsell',
          data: JSON.stringify(reqData),
          callback: function (code, message, response) {
            if (code == '0') {
              iqpSerno = response.data.iqpSerno;
              flag = true;
              _this.nextPage(flag, iqpSerno);
            } else {
              _this.$message({ showClose: true, message: message, type: 'error' });
            }
          }
        });
      } else {
        return;
      }
    },

    nextPage (flag, iqpSerno) {
      let _this = this;
      // 进入详细页面
      if (flag) {
        let params = _this.d1_BillCard.getBillCardValue();
        var prdId = params.prdId;

        var code = 'GRXFDKSX';
        if (params.prdId == '022028') {
          code = 'GRXFDKSX;XD_FZHYXCL';
        }

        let image = '2';
        let orgCode = _this.$xutils.getLoginUserInfo().orgCode;
        // 非PC端，寿光,东海，允许客户经理影像扫描
        if (params.appChnl != '02' || orgCode.startsWith('80') || orgCode.startsWith('81')) {
          image = '1';
        }


        _this.$xutils.showConfirmBox(
          '提示',
          '新增成功,进入详情页面',
          1500,
          1200,
          _isOK => {
            if (_isOK) {
              var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              _this.$router.addTab({
                name: path,
                key: '1',
                title: '业务申请',
                data: {
                  model_group_no: 'IQP_LOAN_APP_LS',
                  op: 'EDIT',
                  iqpSerno: iqpSerno,
                  period: '01',
                  prdId: prdId,
                  borrowerCusId: params.cusId,
                  borrowerCusName: params.cusName,
                  borrowerCertCode: params.certCode,
                  topOutsystemCode: code,
                  s: image
                }
              });
              _this.$dialog.close(_this.dialogId);
            }
          }
        );
      }
    },
    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    },

    initSequene () {
      const param = {
        biz: '01'
      };

      const param2 = {
        bizType: '01'
      };

      const serno = this.$xutils.getSEQWithParamFromServer('YPSEQ', param);
      const iqp_serno = this.$xutils.getSEQWithParamFromServer(
        'IQP_SERNO',
        param2
      );
      this.d1_BillCard.setItemValue('serno', serno);
      this.d1_BillCard.setItemValue('iqp_serno', iqp_serno);
      this.d1_BillCard.setItemValue('is_reconsid', 'N'); // 是否复议N
    }
  }
};
</script>
