<template>
  <yu-tabs type="card" v-model="activeTab" :tab-position="'left'">
    <yu-tab-pane label="申请信息" name="1">
      <iqp-loan-app-view :node="childParams"></iqp-loan-app-view>
    </yu-tab-pane>
    <yu-tab-pane label="客户信息" name="2">
      <iqp-appl-appt-index :node="childParams"></iqp-appl-appt-index>
    </yu-tab-pane>
    <yu-tab-pane label="房屋信息" name="3" v-if="nodeflag">
      <house-info-index :node="childParams"></house-info-index>
    </yu-tab-pane>
    <yu-tab-pane label="担保信息" name="4" >
      <grt-guar-cont-index :node="childParams"></grt-guar-cont-index>
    </yu-tab-pane>
    <yu-tab-pane label="还款能力分析" name="5" >
      <iqp-dis-asset-income-list-view :node="childParams"></iqp-dis-asset-income-list-view>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="6">
       <imageSystem ref="imageSystemRef" authority="import;delImg;insert;scan;replace;copy;cut;download;setValidDate;approve;takePic;reuse;move" :s="power" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
    <yu-tab-pane label="共同借款人" name="7">
       <iqp-loan-app-common-list-index :node="childParams"></iqp-loan-app-common-list-index>
    </yu-tab-pane>
    <yu-tab-pane label="零售内评信息" name="8">
       <iqp-cus-lsnp-info-list-view :node="childParams"></iqp-cus-lsnp-info-list-view>
    </yu-tab-pane>
    <yu-tab-pane label="信用信息" name="9">
       <iqp-credit-view :node="childParams"></iqp-credit-view>
    </yu-tab-pane>
    <yu-tab-pane label="征信查询信息" name="coopCredit">
       <coop-credit :bizPageData="childParams"></coop-credit>
    </yu-tab-pane>
    <yu-tab-pane label="征信查看" name="zhengxin"  v-if="zhenxinflag">
       <credit-card-report-view :node="childParams"></credit-card-report-view>
    </yu-tab-pane>
    <yu-tab-pane label="存量业务信息" name="11">
       <iqp-stock-loan-info :node="childParams"></iqp-stock-loan-info>
    </yu-tab-pane>
    <yu-tab-pane label="调查报告" name="12" >
      <iqp-survey-con-infoanj :node="childParams" @signRedColor="handleSignRedColor"></iqp-survey-con-infoanj>
    </yu-tab-pane>
    <yu-tab-pane label="批复信息" name="13" >
      <iqp-loan-app-pi-fu :node="childParams"></iqp-loan-app-pi-fu>
    </yu-tab-pane>
     <yu-tab-pane label="审批历史" name="14">
      <approval-index :node="childParams"></approval-index>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import iqpLoanAppView from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppViewPage.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import approvalIndex from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/coopApprovalIndex.vue';
import iqpSurveyConInfoanj from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpSurveyConInfoanj.vue';
import iqpLoanAppPiFu from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppPiFu.vue';
import grtGuarContIndex from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/grtGuarContIndex.vue';
import iqpDisAssetIncomeListView from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpDisAssetIncomeListView.vue';
import houseInfoIndex from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/houseInfoIndex.vue';
import iqpApplApptIndex from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpApplApptIndex.vue';
import iqpLoanAppCommonListIndex from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppCommonListIndex.vue';
import iqpCusLsnpInfoListView from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpCusLsnpInfoListView.vue';
import iqpCreditView from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpCusCreditInfoList.vue';
import iqpStockLoanInfo from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpStockLoanInfo.vue';
import coopCredit from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import creditCardReportView from '@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/creditCardReportView';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {iqpLoanAppView,
    imageSystem,
    approvalIndex,
    iqpSurveyConInfoanj,
    iqpLoanAppPiFu,
    grtGuarContIndex,
    iqpDisAssetIncomeListView,
    houseInfoIndex,
    iqpApplApptIndex,
    iqpLoanAppCommonListIndex,
    iqpCusLsnpInfoListView,
    coopCredit,
    iqpCreditView,
    iqpStockLoanInfo,
    creditCardReportView},
  props: {
    bizPageData: Object,
    pageParams: Object,
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data () {
    return {
      dutysTableUrl: backend.appOcaService + '/api/adminsmuser/queryuserduty?userId=FBD6B9E01C344C4F8E6DE07D6C6C4DEB', // 岗位关联查询地址
      adjustmentApplyList: null,
      adjustmentApplyHis: null,
      activeTab: '1',
      nodeflag: true,
      topOutsystemCode: 'GRXFDKSX',
      zhenxinflag: false
    };
  },
  mounted () {
    var _this = this;
    if (this.node.nodeId == '230_11' || this.node.nodeId == '230_62' || this.node.nodeId == '230_12' || this.node.nodeId == '230_13' || this.node.nodeId == '230_4') {
      this.zhenxinflag = true;
    }
    yufp.service.request({
      async: true,
      method: 'POST',
      url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
      data: {iqpSerno: this.node.bizId},
      callback: function (code, message, response) {
        if (code == '0') {
          if (response.data.prdId == '022028') {
            _this.topOutsystemCode = 'GRXFDKSX;XD_FZHYXCL';
          }
          yufp.service.request({
            async: true,
            method: 'POST',
            url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
            data: response.data.prdId,
            callback: function (code, message, response) {
              if (response.data.prdType != '10') {
                _this.nodeflag = false;
              }
            }
          });
        }
      }
    });
  },
  computed: {
    childParams: function () {
      let params = {
        iqpSerno: this.node.hasOwnProperty('bizId') ? this.node.bizId : this.pageParams.iqpSerno,
        borrowerCusId: this.node.hasOwnProperty('cusId') ? this.node.cusId : this.pageParams.borrowerCusId,
        borrowerCusName: this.node.hasOwnProperty('custName') ? this.node.custName : this.pageParams.borrowerCusName,
        borrowerCertCode: this.node.hasOwnProperty('certCode') ? this.node.certCode : this.pageParams.borrowerCertCode,
        isView: true,
        op: 'VIEW',
        bizId: this.node.hasOwnProperty('bizId') ? this.node.bizId : this.pageParams.iqpSerno
      };
      return params;
    },
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': this.topOutsystemCode,
          'outsystem_code': '',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': this.node.hasOwnProperty('bizId') ? this.node.bizId : this.pageParams.iqpSerno,
            'businessid': this.node.hasOwnProperty('bizId') ? this.node.bizId : this.pageParams.iqpSerno,
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': this.node.hasOwnProperty('bizId') ? this.node.bizId : this.pageParams.iqpSerno,
            'orgname': '',
            'opername': '',
            'custid': '',
            'creditamount': '',
            'maintaindate': '',
            'billno': '',
            'custname': '',
            'credittype': ''
          }
        }
      ];
      return imageBizParam;
    },
    power () {
      if (this.node.nodeId == '230_8' || this.node.nodeId == '230_64' || this.node.nodeId == '646_11' || this.node.nodeId == '706_11') {
        return '1';
      } else {
        return '2';
      }
    }

  },
  methods: {

  }
};
</script>
