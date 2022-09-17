<template>
  <!--
    @created by zhoumw
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="24" :xs="24">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="合作方案信息" name="cooPlanApp">
            <coop-plan-app ref="coopPlanAppPage" :page-data="param"></coop-plan-app>
        </yu-tab-pane>
        <yu-tab-pane label="资质信息" v-if="partnerType!=13" name="cusIndivContactInfo">
            <coop-plan-apti ref="coopPlanAptiPage" :page-data="param"></coop-plan-apti>
        </yu-tab-pane>
        <yu-tab-pane label="项目信息" v-if="partnerType==1" name="coopPlanPro">
            <coop-plan-pro ref="coopPlanProPage" :page-data="param"></coop-plan-pro>
        </yu-tab-pane>
        <yu-tab-pane label="征信信息" name="coopCredit">
            <coop-credit></coop-credit>
        </yu-tab-pane>
        <yu-tab-pane label="影像信息" name="coopImageList" v-if="partnerType==1||partnerType==2||partnerType==3||partnerType==4||partnerType==5||partnerType==8||partnerType==11">
          <coopImageList ref="coopImageList"></coopImageList>
        </yu-tab-pane>
        <yu-tab-pane label="审批历史" name="coopApproval">
            <coop-approval :params="param"></coop-approval>
        </yu-tab-pane>
      </yu-tabs>
    </yu-col>
  </yu-row>
 </div>
</template>
<script>
import coopPlanApp from './cooPlanAppInfoIndex.vue';
import coopPlanApti from '../coopPlanApti/coopPlanAptiListIndex.vue';
import coopPlanPro from '../coopPlanPro/coopPlanProListIndex.vue';
import coopCredit from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import coopWarn from '../coopWarn/coopWarnIndex.vue';
import coopReport from '../coopReport/coopReportIndex';
import coopImageList from '../coopPlanApp/coopImageList';
import coopApproval from '../coopApproval/coopApprovalIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { coopPlanApp, coopPlanApti, coopPlanPro, coopCredit, coopWarn, coopReport, coopImageList, coopApproval, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      color: [],
      activeIndex: 1,
      activeName: 'cooPlanApp',
      param: {},
      partnerType: '',
      imageBizParam: [
        {
          'top_outsystem_code': '',
          'index': {
            'contid': '',
            'businessid': 'XD00234997'
          }
        }
      ]
    };
  },
  created () {
    let _this = this;
    this.param = this.$route.meta.params;
    this.partnerType = this.param.partnerType;
    if (this.partnerType == 1) {
      _this.imageBizParam[0].top_outsystem_code = 'LPHZYX';
      this.imageBizParam[0].index.contid = this.param.serno;
    } else if (this.partnerType == 2) {
      _this.imageBizParam[0].top_outsystem_code = 'DBGSSXZL';
    }
    _this.imageBizParam[0].index.businessid = this.param.serno;
  },
  mounted () {

  },
  methods: {
    /**
     * 关闭当前页面
     */
    onBack () {
      yufp.frame.removeTab(this.$route.path);
    },
    handleClick () {
      this.$refs.coopImageList.refreshTable();
    }
  }
};
</script>
<style>

</style>
