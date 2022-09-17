<template>
  <yu-tabs type="card" v-model="activeTab">
    <yu-tab-pane label="调额申请信息" name="1">
      <adjustment-apply-info :apply-info-params="childParams"></adjustment-apply-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="2">
      <adjustment-apply-info-pic :apply-info-pic-params="childParams"></adjustment-apply-info-pic>
    </yu-tab-pane>
    <yu-tab-pane label="征信信息" name="3" v-if="nodeflag">
      <cus-credit-record-info :apply-info-params="childParams"></cus-credit-record-info>
    </yu-tab-pane>
    <yu-tab-pane label="老客户信息" name="adjustmentJudgeCustomOldInfo" v-if="nodeflag">
      <custom-old-info :custom-old-info-params="childParams" @signRedColor="handleSignRedColor"></custom-old-info>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史信息" name="6" v-if="nodeflag">
      <adjustment-judge-his :judge-his-params="childParams"></adjustment-judge-his>
    </yu-tab-pane>
    <yu-tab-pane label="历史交易记录" name="7" v-if="nodeflag">
      <trade-record-his :trade-record-his-params="childParams"></trade-record-his>
    </yu-tab-pane>
    <yu-tab-pane label="审批意见" name="8">
      <judge-step-one v-if="stepOne" :judge-step-one-params="bizPageData"></judge-step-one>
      <judge-step-two v-if="stepTwo" :judge-step-two-params="bizPageData"></judge-step-two>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import AdjustmentApplyInfo from './tabs/AdjustmentApplyInfo';
import AdjustmentApplyInfoPic from './tabs/AdjustmentApplyInfoPic';
import CusCreditRecordInfo from './tabs/CusCreditRecordInfo';
import CusLsnpInfo from './tabs/CusLsnpInfo';
import CustomOldInfo from '../../common/tabs/CustomOldInfo';
import AdjustmentJudgeHis from './tabs/AdjustmentJudgeHis';
import TradeRecordHis from './tabs/TradeRecordHis';
import JudgeStepOne from './tabs/JudgeStepOne';
import JudgeStepTwo from './tabs/JudgeStepTwo';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {AdjustmentApplyInfo, AdjustmentApplyInfoPic, CusCreditRecordInfo, CusLsnpInfo, CustomOldInfo, AdjustmentJudgeHis, TradeRecordHis, JudgeStepOne, JudgeStepTwo},
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
      activeTab: '8',
      nodeflag: true
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
        cardNo: this.bizPageData.flowParam.cardNo
      };
      return params;
    },
    stepOne: function () {
      // approvePostFlag === '00' 代表额度申请审批一岗
      return this.bizPageData.flowParam.approvePostFlag === '00';
    },
    stepTwo: function () {
      // approvePostFlag === '01' 代表额度申请审批二岗
      return this.bizPageData.flowParam.approvePostFlag === '01';
    }

  },
  methods: {
    /**
     *  老客户信息标签红色字体标识
     */
    handleSignRedColor (hasInfo) {
      if (hasInfo) {
        document.getElementById('tab-adjustmentJudgeCustomOldInfo').style.color = 'red';
      } else {
        document.getElementById('tab-adjustmentJudgeCustomOldInfo').style.color = '';
      }
    },
    afterInit () {
      if (this.bizPageData.instanceInfo.nodeId == '238_4' || this.bizPageData.instanceInfo.nodeId == '364_4') {
        this.nodeflag = false;
      }
      this.adjustmentApplyList = this.$refs.adjustmentApplyList;
      this.adjustmentApplyHis = this.$refs.adjustmentApplyHis;
    }
  }
};
</script>
