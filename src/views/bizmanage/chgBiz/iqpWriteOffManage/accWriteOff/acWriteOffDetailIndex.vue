<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './acWriteOffDetail_d1_BillCard.vue'
export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       *核销贷款台账详情页面
       *  @author xuchao
       */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({accNo:this.getFactory().contextData.accNo});

      // 加载工具js
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   null
      // );
    },

    // 查看合同
    viewCont() {
      const billData = this.d1_BillCard.getItemValue('cont_no');

      if (!(billData && billData != '')) {
        this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
        return;
      }

      const opeType = 'ctrLoanCont';
      const params = this.findContInfoFromBackend(billData, opeType);

      if (params) {
        params['model_group_no'] = 'CTR_LOAN_CONT_SIGN';
        params['op'] = 'VIEW';
        params['cont_no'] = billData;

        // 用于区分查询担保与业务申请(结果)表
        params['bizTy'] = 'grtLoanGuar';

        params['oprTyp'] = 'grtGuarBizRel';

        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },

    /**
       * 查看借据信息
       */
    viewBill() {
      const billNo = this.d1_BillCard.getBillCardItemValue('bill_no');

      if (billNo == '') {
        this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
        return;
      }

      const params = this.findAccInfoFromBackend(billNo);

      if (params) {
        params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';// 贷款台账模块
        params['op'] = 'VIEW';

        this.$dialog.open(
          '贷款台账',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },

    // 获取借据信息
    findAccInfoFromBackend(billNo) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisBiz + '/api/accloan/' + billNo,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return returnData;
    },

    /**
       * 查看客户信息
       */
    viewCus() {
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const params = {};

      if (jsoPar.cus_id == '' || jsoPar.cus_id == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }

      params['cus_id'] = jsoPar.cus_id;
      const cus_catalog = this.getFactory().contextData.cus_catalog;

      if (cus_catalog == '1') {
        //对公
        params['model_group_no'] = 'CMG000114';

        params['flag'] = 'view';

        this.$dialog.open(
          '企业客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      } else if (cus_catalog == '2') {
        //对私
        params['model_group_no'] = 'CMG000013';

        params['flag'] = 'view';

        this.$dialog.open(
          '个人客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      } else {
        this.$xutils.showMsgBox('提示', '无法确定客户大类！');
        return;
      }
    },

    // 客户信息
    findCusInfoFromBackend(cusId) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisCus + '/api/cusbase/' + cusId,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return returnData;
    },

    // 查看公司客户页面
    routeToPageCusCorp(cusId) {
      const params = {
        cus_id: cusId,
        flag: 'view',
        model_group_no: 'CMG000114'
      };

      this.$dialog.open(
        '企业客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        false
      );
    },

    // 查看个人客户页面
    routeToPageCusIndiv(cusId) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisCus + '/api/cusindiv/' + cusId,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      if (returnData) {
        const selectedRowData = returnData;
        selectedRowData.flag = 'view';
        this.$dialog.open('个人客户查看页面', 'cusmanage/indivCus/indivCusMsgIndex', -1, -1, selectedRowData);
      }
    }
  }
};
</script>
