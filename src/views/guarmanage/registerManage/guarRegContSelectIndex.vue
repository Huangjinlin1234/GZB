<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './guarRegContSelect_d1_BillCard.vue';

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      guarMortgageRegisterApp: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /** *****抵押登记跳转合同向导界面*********/
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    doNext () {
      // 检验必输项
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const checkFlag = this.isExistByGuarContNo(jsoPar.guarContNo, this.pageParams.regType);

      //if (!checkFlag) {
      //  return;
      //}

      jsoPar['regType'] = this.pageParams.regType;
      jsoPar['type'] = this.pageParams.type;

      if (jsoPar['regType'] == '02') {
        this.$dialog.open(
        '请选择押品',
        'guarmanage/registerManage/guarSelectIndex2',
        900,
        650,
        jsoPar,
        () => {
          this.$dialog.close(this.dialogId);
        }
        );
      } else {
        this.$dialog.open(
        '请选择押品',
        'guarmanage/registerManage/guarSelectIndex',
        900,
        650,
        jsoPar,
        () => {
          this.$dialog.close(this.dialogId);
        }
      );
      }   
    },

    // 引入担保合同
    selectGrtGuarCont () {
      var _this = this;
      let params = {};
      params['guarWay'] = '10';// 10 抵押
      params['managerId'] = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      // regType 01 抵押登记 02抵押注销
      if (this.pageParams.regType == '01') {
        params['guarContState'] = '101';// 101生效 104注销
      } else {
        params['guarContState'] = '104';// 101生效 104注销
      }
      this.$dialog.open('担保合同信息', 'guarmanage/registerManage/grtGuarContSelectIndex', 1000, 600, params, function (rowData) {
        // 数据处理,便于数据落库
        rowData['isRegOnline'] = rowData.isOnlinePld;
        yufp.clone(rowData, _this.d1_BillCard.formdata);
      });
    },

    //判断当前担保合同有没有发起过抵押登记申请，如果已发起提示在途
    isExistByGuarContNo (guarContNo, regType) {
      let checkFlag = false;

      // var rtnData = {};
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/isExistByGuarContNo',
        data: {'guarContNo':guarContNo, 'regType': regType},
        success: (response, status, xhr) => {
          if (response.code == '000000') {
            if(response.data){
              if(regType == '01'){
              //  this.$xutils.showMsgBox('提示', '该担保合同有在途的抵押登记申请！');
              }else{
              //  this.$xutils.showMsgBox('提示', '该担保合同有在途的抵押注销申请！');
              }
            }else{
              checkFlag = true;
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return checkFlag;
    },
    onClose () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
