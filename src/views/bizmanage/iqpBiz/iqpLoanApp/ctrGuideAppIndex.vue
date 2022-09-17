<template>
  <d1-billcard ref="d1_BillCard" :page-data="pageData"></d1-billcard>
</template>
<script>
import d1Billcard from './ctrGuideApp_d1_BillCard.vue';
/* 确定按钮*/
let jsoPar = '';

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      pageData: this.pageParams
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.formdata.isRenew = '0';
      this.d1_BillCard.formdata.isUtilLmt = '1';
    },
    doNextStep () {
      // 创建要保存的表单
      jsoPar = this.d1_BillCard.getBillCardValue();

      // 选择档案信息提示b
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      if (this.d1_BillCard.guarMode == '60' && this.d1_BillCard.formdata.guarWay != '60') {
        this.$xutils.showMsgBox('提示', '已选授信品种为低风险品种，担保方式必须为低风险');
        this.d1_BillCard.formdata.guarWay = '60';
        return;
      }

      // jsoPar.contNo = 'IFP' + this.$xutils.dateFormat('yyyyMMddhhmmss', new Date());
      // 登录信息
      const userInfo = this.$xutils.getLoginUserInfo();
      jsoPar.inputId = userInfo.loginCode;
      jsoPar.inputBrId = userInfo.orgCode;
      jsoPar.managerId = userInfo.loginCode;
      jsoPar.managerBrId = userInfo.orgCode;
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.udpId = userInfo.loginCode;
      jsoPar.udpBrId = userInfo.orgCode;
      jsoPar.udpDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.createTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.updateTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.bizType = '02';
      if (jsoPar) {
        this.$xutils.request({
          // 同步请求
          async: false,

          // 新增
          url: this.$backend.cmisBiz + '/api/iqploanapp/insertIqpLoanApp',

          data: JSON.stringify(jsoPar),

          success: (response, status, xhr) => {
            if (response.code == '0') {
              // rtnData = response.data;
              jsoPar.iqpSerno = response.data['iqpSerno'];
              jsoPar['op'] = 'EDIT';
              jsoPar['period'] = '02';
              jsoPar['bizLine'] = '03';
              if (jsoPar.guarWay == '21') {
                jsoPar['isAddGuar'] = '0';
              }
              jsoPar['busiType'] = '02';
              jsoPar['model_group_no'] = 'CMG000243';
              jsoPar['imageType'] = '2';
              jsoPar['topOutsystemCode'] = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
              jsoPar['imageParams'] = {
                contid: response.data['contNo'],
                businessid: jsoPar.iqpSerno,
                docid: jsoPar.iqpSerno
              };
              // this.$dialog.open(
              //   '',
              //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              //   -1,
              //   -1,
              //   jsoPar,
              //   this.$dialog.close(this.dialogId),
              //   true,
              //   true
              // );
              let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              this.$router.addTab({
                name: path,
                key: jsoPar.iqpSerno + jsoPar.op,
                title: '普通贷款合同申请',
                data: jsoPar
              });
              this.$dialog.close(this.dialogId);
            } else {
              // rtnFlag = false;
              this.$xutils.showMsgBox('提示', response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        return;
      }

      //   frameContext.selectedCusObj=jsoPar;
      //    window.parent.selectedRowData=jsoPar;
      //    YuXP.closeDialog(jsoPar);

      //    d1_BillList.queryDataByCondition('doc_read_serno = \'' + jsoPar.doc_read_serno + '\'');
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
