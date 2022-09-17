<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './guarWarrantInAppAdd_d1_BillCard.vue';
import { mapGetters } from 'vuex';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
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
    /**
       * 权证入库自增引导页面
       */

    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    /**
       * 下一步
       */
    doNext () {
      // 判断必输项
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 申请状态
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const checkFlag = this.checkContStatus(jsoPar.guarContNo);

      if (!checkFlag) {
       return;
      }

      const checkFlag2 = this.checkGuarStatus(jsoPar.guarNo);

      if (!checkFlag2) {
        return;
      }

      // const checkFlag3 = this.checkGuarStatus2(jsoPar.guarNo);

      // if (!checkFlag3) {
      //   return;
      // }

      const checkFlag4 = this.checkIsOnTheWay(jsoPar.guarNo);

      if (!checkFlag4) {
        return;
      }

      jsoPar['type'] = this.pageParams.type;
      jsoPar['warrantAppType'] = this.pageParams.warrantAppType;
      jsoPar['warrantInType'] = this.d1_BillCard.formdata.warrantInType;
      this.onClose();
      this.$dialog.open('权证入库新增', 'guarmanage/guarwarrant/guarwarrantin/guarWarrantInAppFormIndex', -1, -1, jsoPar);
    },

     //检查押品对应的担保合同状态，未签到合同不允许发起入库申请
    checkContStatus (guarContNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/grtguarcont/selectGuarContStateByGuarContNo/' +
          guarContNo,

        success: (response, status, xhr) => {
          if (response.data == '101') {
              returnData = true;
          } else {
            this.$xutils.showMsgBox('提示', '该押品关联的担保合同【' + guarContNo + '】不是生效状态，无法入库!', 350, 150);
          }
        }
      });

      return returnData;
    },

     //检查押品是否被未审批通过的抵押登记引用
    checkGuarStatus (guarNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarmortgagemanageapp/selectByGuarNo/' +
          guarNo,

        success: (response, status, xhr) => {
          if (response.data == null || response.data == '') {
              returnData = true;
          } else {
            this.$xutils.showMsgBox('提示', '该押品关联的流水号为【' + response.data + '】的抵押登记未审批通过!', 350, 150);
          }
        }
      });

      return returnData;
    },

    //检查押品是否被未审批通过的抵押登记引用
    checkGuarStatus2 (guarNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarmortgagemanageapp/selectApprovedRecordsByGuarNo/' +
          guarNo,

        success: (response, status, xhr) => {
          debugger;
          if (response.data > 0) {
              returnData = true;
          } else {
            this.$xutils.showMsgBox('提示', '该押品未做抵押登记!', 350, 150);
          }
        }
      });

      return returnData;
    },

     //检查该押品是否有在途的权证入库申请
    checkIsOnTheWay (guarNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarwarrantmanageapp/checkGuarNoIsOnTheWay/' +
          guarNo,

        success: (response, status, xhr) => {
          if (response.data == 'noExist') {
              returnData = true;
          } else {
            this.$xutils.showMsgBox('提示', '该押品有在途的权证入库申请!', 350, 150);
          }
        }
      });

      return returnData;
    },

    selectGuar () {
      var _this = this;
      this.$dialog.open('押品列表', 'guarmanage/guarwarrant/guarwarrantin/guarSelect_d1_BillList', 1000, 600, null, function (rowData) {
        // 数据处理,便于数据落库
        rowData['mortOrderFlag'] = rowData.pldOrder;// 押品顺位标示
        yufp.clone(rowData, _this.d1_BillCard.formdata);
      });
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    },

    // 引入担保合同
    selectGrtGuarCont () {
      var _this = this;
      let params = {};
      params['guarWay'] = '10,20';// 10 抵押 20 质押
      params['managerId'] = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      // regType 01 抵押登记 02抵押注销
      if (this.pageParams.warrantAppType == '01') {
        params['guarContState'] = '101';// 101生效 104注销
      } else {
        params['guarContState'] = '104';// 101生效 104注销
      }
      this.$dialog.open('担保合同信息', 'guarmanage/registerManage/grtGuarContSelectIndex', 1000, 600, params, function (rowData) {
        // 数据处理,便于数据落库
        rowData['isRegOnline'] = rowData.isOnlinePld;
        yufp.clone(rowData, _this.d1_BillCard.formdata);        
        if (rowData.guarWay == '10') {          
          _this.d1_BillCard.formdata.grtFlag = '01';
        } else if (rowData.guarWay == '20') {
          _this.d1_BillCard.formdata.grtFlag = '02';
        }
      });
    },
    /**
       * 下一步跳转押品列表
       */
    doNextYp () {
      // 判断必输项
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }        
      // 押品列表
      const jsoPar = this.d1_BillCard.getBillCardValue();

      if(jsoPar && jsoPar.warrantInType === '02') {
        // 1-异地支行（有分行）2-异地支行（无分行）3-异地分行 A-村镇银行
        if(this.org.orgType === '1' || this.org.orgType === '2' || this.org.orgType === '3' || this.org.orgType === 'A') {
          this.$xutils.showMsgBox('提示', '纸质权证集中入库模式仅适用于本地零售、综合、小企业、小微客户经理发起', 350, 150);
          return;
        }
      }

      jsoPar['regType'] = this.pageParams.warrantAppType;
      jsoPar['type'] = this.pageParams.type;
      jsoPar['warrantAppType'] = this.pageParams.warrantAppType;
      var _this = this;
      var guarContNo = _this.d1_BillCard.formdata.guarContNo;
      jsoPar['guarContNo'] = guarContNo;
      // 路径来源
      jsoPar['pathSource'] = '02';
      this.$dialog.open(
        '请选择押品',
        'guarmanage/registerManage/guarSelectIndex',
        900,
        650,
        jsoPar
      );
    }
  }
};
</script>
