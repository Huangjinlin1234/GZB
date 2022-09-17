<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './addIqpLoan_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      // 合同申请新增
      htsqxz: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 新增合同申请界面 下一步/取消按钮*/
    afterInit () {
      this.htsqxz = this.$refs.d1_BillCard;
      // 初始化序列号信息
      // 给流水号赋值
      /*       debugger;
      const iqpSerno = this.$xutils.getSEQWithParamFromServer('LMT_XD_SERNO');
      this.d1_BillCard.setItemValue('iqpSerno', iqpSerno);
      // 数据挡板
      this.d1_BillCard.setItemValue('serno', iqpSerno); */
      // this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    /* 选择批复编号*/
    doSelect () {
      let _this = this;
      if (!_this.htsqxz) {
        return false;
      }
      let rtParam = _this.htsqxz.getBillCardValue();

      _this.$dialog.open(
        '',
        'xwmanage/iqpManage/iqpLoanApp/crdReplyInfoListPopIndex',
        -1,
        -1,
        rtParam,
        params => {
          if (!params) {
            // 取消返回
            return;
          }
          yufp.clone(params, _this.htsqxz.formdata);
          _this.htsqxz.formdata.replyNo = params.replySerno; // 批复编号
          _this.htsqxz.formdata.surveySerno = params.surveySerno; // 调查编号
          _this.htsqxz.formdata.guarWay = params.guarMode;// 担保方式
          _this.htsqxz.execBillCardDefaultValueFormula();// 初始化
          _this.htsqxz.formdata.contHighAvlAmt = params.replyAmt;// 本合同项下最高可用信金额
          // del by wzy 一次性额度时也可做最高额合同，循环默认最高额
          var limiType = _this.htsqxz.formdata.limitType;
          if (limiType == '02') {
            // 控制规则：批复额度类型=临时额度时，默认“一般合同”且只读
            this.htsqxz.disabledFlg = true;
            _this.htsqxz.formdata.contType = '2';
          } else {
            this.htsqxz.disabledFlg = false;
          }
          if (params.isWxbxd == '1') {
            _this.htsqxz.formdata.loanModal = '6';
          }
        }
      );
    },

    /* 下一步按钮*/
    doNextStep () {
      // 先进行校验
      const validateFlag = this.htsqxz.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      this.htsqxz.buttonLoading = true;
      this.htsqxz.formdata.certType = 'A';
      let data = this.addData(this.htsqxz.formdata);
      this.htsqxz.buttonLoading = false;
      if (data.code == '0000') {
        this.$xutils.showConfirmBox('提示', '新增成功,进入详细页面', 400, 200, _isOK => {
          if (_isOK) {
            debugger;
            let IqpLoanApp = data.IqpLoanApp;
            IqpLoanApp['model_group_no'] = 'CMG000350';
            IqpLoanApp['op'] = 'UPDATE';
            IqpLoanApp['managerId'] = this.htsqxz.formdata.managerId;
            IqpLoanApp['managerBrId'] = this.htsqxz.formdata.managerBrId;
            this.$dialog.close(this.dialogId);
            this.$router.addTab({
              name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              key: new Date().getTime(),
              title: '业务申请',
              data: IqpLoanApp
            });
          } else {
            this.$dialog.close(this.dialogId);
          }
        });
      } else {
        this.$message({ message: '创建失败,请重试!', type: 'warning' });
        this.$dialog.close(this.dialogId);
      }
    },
    /** 新增申请
     */
    addData (data) {
      let returnData = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/xw/createIqpLoanApp',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            returnData = response.data;
          }
        }
      });
      return returnData;
    },
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
