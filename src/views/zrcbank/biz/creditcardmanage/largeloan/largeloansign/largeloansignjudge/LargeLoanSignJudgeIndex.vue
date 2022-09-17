<template>
  <yu-tabs type="card" v-model="activeTab">
    <yu-tab-pane label="大额分期申请信息" name="1">
      <large-loan-apply-info :apply-info-params="childParams"></large-loan-apply-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="2">
      <large-loan-apply-info-pic :apply-info-pic-params="childParams"></large-loan-apply-info-pic>
    </yu-tab-pane>
    <yu-tab-pane label="大额分期审批意见信息" name="3">
      <large-loan-judge-his :judge-his-params="childParams"></large-loan-judge-his>
    </yu-tab-pane>
    <yu-tab-pane label="合同审核" name="4">
      <judge-suggestion :judge-suggestion-params="bizPageData"></judge-suggestion>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import LargeLoanApplyInfo from './tabs/LargeLoanApplyInfo';
import LargeLoanApplyInfoPic from './tabs/LargeLoanApplyInfoPic';
import LargeLoanJudgeHis from './tabs/LargeLoanJudgeHis';
import JudgeSuggestion from './tabs/JudgeSuggestion';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {LargeLoanApplyInfo, LargeLoanApplyInfoPic, LargeLoanJudgeHis, JudgeSuggestion},
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
      activeTab: '4'
    };
  },
  mounted () {
    this.afterInit();
    // const loginUser = this.$xutils.getLoginUserInfo();
    // console.log(this.bizPageData);
    // this.$request({
    //   url: _this.dutysTableUrl,
    //   method: 'GET',
    //   data: {userId: loginUser.userId}
    // }).then(({code, message, data}) => {
    //   if (code == '0') {
    //     const duties=res
    //   } else {
    //     this.$message({message: message || '操作失败', type: 'error'});
    //   }
    // });
  },
  computed: {
    childParams: function () {
      debugger;
      let params = {
        contNo: this.bizPageData.instanceInfo.bizId,
        serno: this.bizPageData.instanceInfo.param.serno,
        certCode: this.bizPageData.flowParam.certCode,
        nodeId: this.bizPageData.instanceInfo.nodeId
        // serno: '709F56018773480C8D6F5C6A5A76FBF0',
        // certCode: '125466',
        // nodeId: ''
      };
      return params;
    },
    stepOne: function () {
      // nodeId === '238_4' 代表额度申请审批一岗
      // return this.bizPageData.instanceInfo.nodeId === '238_4';
      return true;
    },
    stepTwo: function () {
      // const loginUser = this.$xutils.getLoginUserInfo();
      return false;
    }
  },
  methods: {
    /* 小微功能管理--调查任务分配页面*/
    afterInit () {
      // console.log(this.$refs);
      this.adjustmentApplyList = this.$refs.adjustmentApplyList;
      this.adjustmentApplyHis = this.$refs.adjustmentApplyHis;
    }
  }
};
</script>
