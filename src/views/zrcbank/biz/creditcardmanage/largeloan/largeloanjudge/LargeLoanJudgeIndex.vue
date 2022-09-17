<template>
  <yu-tabs type="card" v-model="activeTab">
    <yu-tab-pane label="大额分期申请信息" name="1">
      <large-loan-apply-info :apply-info-params="childParams"></large-loan-apply-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="2">
      <large-loan-apply-info-pic :apply-info-pic-params="childParams"></large-loan-apply-info-pic>
    </yu-tab-pane>
    <yu-tab-pane label="征信信息" name="3">
      <cus-credit-record-info :apply-info-params="childParams"></cus-credit-record-info>
    </yu-tab-pane>
    <!--
      <yu-tab-pane label="零售内评信息" name="4">
        <cus-lsnp-info></cus-lsnp-info>
      </yu-tab-pane>
    -->
    <yu-tab-pane label="老客户信息" name="largeLoanJudgeCustomOldInfo">
      <custom-old-info :custom-old-info-params="childParams" @signRedColor="handleSignRedColor"></custom-old-info>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史信息" name="6">
      <large-loan-judge-his :large-loan-judge-his-params="childParams"></large-loan-judge-his>
    </yu-tab-pane>
    <yu-tab-pane label="审批意见" name="7">
      <judge-step-one v-if="stepOne" :judge-step-one-params="bizPageData"></judge-step-one>
      <judge-step-two v-if="stepTwo" :judge-step-two-params="bizPageData"></judge-step-two>
    </yu-tab-pane>
  </yu-tabs>
</template>CusLsnpInfo
<script>
import LargeLoanApplyInfo from './tabs/LargeLoanApplyInfo';
import LargeLoanApplyInfoPic from './tabs/LargeLoanApplyInfoPic';
import CusCreditRecordInfo from './tabs/CusCreditRecordInfo';
import CusLsnpInfo from './tabs/CusLsnpInfo';
import CustomOldInfo from '../../common/tabs/CustomOldInfo';
import LargeLoanJudgeHis from './tabs/LargeLoanJudgeHis';
import JudgeStepOne from './tabs/JudgeStepOne';
import JudgeStepTwo from './tabs/JudgeStepTwo';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {LargeLoanApplyInfo, LargeLoanApplyInfoPic, CusCreditRecordInfo, CusLsnpInfo, CustomOldInfo, LargeLoanJudgeHis, JudgeStepOne, JudgeStepTwo},
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dutysTableUrl: backend.appOcaService + '/api/adminsmuser/queryuserduty?userId=FBD6B9E01C344C4F8E6DE07D6C6C4DEB', // 岗位关联查询地址
      adjustmentApplyList: null,
      adjustmentApplyHis: null,
      activeTab: '7'
    };
  },
  mounted () {
    this.afterInit();
  },
  computed: {
    childParams: function () {
      let params = {
        serno: this.bizPageData.instanceInfo.bizId,
        certCode: this.bizPageData.flowParam.certCode,
        nodeId: this.bizPageData.instanceInfo.nodeId,
        pageType: this.bizPageData.instanceInfo.pageType
      };
      return params;
    },
    stepOne: function () {
      // approvePostFlag === '00' 代表额大额分期审批一岗
      return this.bizPageData.flowParam.approvePostFlag === '00';
    },
    stepTwo: function () {
      // approvePostFlag === '01' 代表大额分期审批二岗
      return this.bizPageData.flowParam.approvePostFlag === '01';
    }
  },
  methods: {
    /**
     *  老客户信息标签红色字体标识
     */
    handleSignRedColor (hasInfo) {
      if (hasInfo) {
        document.getElementById('tab-largeLoanJudgeCustomOldInfo').style.color = 'red';
      } else {
        document.getElementById('tab-largeLoanJudgeCustomOldInfo').style.color = '';
      }
    },
    /* 小微功能管理--调查任务分配页面*/
    afterInit () {
      // console.log(this.$refs);
      this.adjustmentApplyList = this.$refs.adjustmentApplyList;
      this.adjustmentApplyHis = this.$refs.adjustmentApplyHis;
    }
  }
};
</script>
