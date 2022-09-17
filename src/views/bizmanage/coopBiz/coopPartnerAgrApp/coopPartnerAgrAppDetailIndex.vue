<template>
  <!--
    @created by zhoumw
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="24" :xs="24">
      <yu-tabs v-model="activeName" @tab-click="handleClick4Refresh">
        <yu-tab-pane label="合作方协议信息" name="coopPartnerAgr">
          <coop-partner-agr ref="coopPartnerAgrPage" :is-from-acc="isFromAcc" :page-data="agrParam"></coop-partner-agr>
        </yu-tab-pane>
        <yu-tab-pane label="合作方案信息" name="cooPlanApp">
            <coop-plan-app ref="coopPlanAppPage" :page-data="param"></coop-plan-app>
        </yu-tab-pane>
        <yu-tab-pane label="资质信息" v-if="partnerType!=13" name="cusIndivContactInfo">
            <coop-plan-apti ref="coopPlanAptiPage" :page-data="paramApti"></coop-plan-apti>
        </yu-tab-pane>
        <yu-tab-pane label="项目信息" v-if="partnerType==1" name="coopPlanPro">
            <coop-plan-pro ref="coopPlanProPage" :page-data="param"></coop-plan-pro>
        </yu-tab-pane>
        <yu-tab-pane label="征信信息" name="coopCredit">
            <coop-credit :biz-page-data="bizPageData"></coop-credit>
        </yu-tab-pane>
        <yu-tab-pane label="预警信息" name="coopWarn">
            <coop-warn></coop-warn>
        </yu-tab-pane>
        <yu-tab-pane label="影像信息" name="coopImageList" v-if="partnerType==1||partnerType==2||partnerType==3||partnerType==4||partnerType==5||partnerType==8||partnerType==11">
          <coopImageList ref="coopImageList"></coopImageList>
        </yu-tab-pane>
        <yu-tab-pane label="审批历史" name="coopApproval" v-if="showApproval">
            <coop-approval :params="agrParam"></coop-approval>
        </yu-tab-pane>
      </yu-tabs>
    </yu-col>
  </yu-row>
 </div>
</template>
<script>
import coopPartnerAgr from './coopPartnerAgrAppBaseInfo.vue';
import coopPlanApp from '../coopPlanAccInfo/cooPlanAppInfoIndex.vue';
import coopPlanApti from '../coopPlanApti/coopPlanAptiListIndex.vue';
import coopPlanPro from '../coopPlanPro/coopPlanProListIndex.vue';
import coopCredit from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import coopWarn from '../coopWarn/coopWarnIndex.vue';
import coopReport from '../coopReport/coopReportIndex.vue';
import coopImageList from '../coopPlanApp/coopImageList';
import coopApproval from '../coopApproval/coopApprovalIndex.vue';

export default {
  components: { coopPartnerAgr, coopPlanApp, coopPlanApti, coopPlanPro, coopCredit, coopWarn, coopReport, coopImageList, coopApproval},
  props: {
    bizPageData: Object,
    pageParams: Object
  },
  data: function () {
    return {
      color: [],
      activeIndex: 1,
      activeName: 'coopPartnerAgr',
      param: {},
      paramApti: {},
      op: '',
      partnerType: '',
      agrParam: {},
      planQueryUrl: backend.cmisBiz + '/api/coopplanaccinfo/queryDetail',
      isFromAcc: false,
      showApproval: true,
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
    if (_this.$route.meta.params && _this.$route.meta.params.from && _this.$route.meta.params.from == 'coopPartnerAgrAcc') { // 协议台账进入
      _this.isFromAcc = true;
    }
    let coopPlanNo = _this.$route.meta.params && this.$route.meta.params.coopPlanNo || this.bizPageData && this.bizPageData.flowParam.coopPlanNo || this.pageParams.coopPlanNo;
    yufp.service.request({
      method: 'POST',
      data: {condition: JSON.stringify({
        coopPlanNo: coopPlanNo
      })},
      async: false,
      url: _this.planQueryUrl,
      callback: function (code, message, response) {
        if (response.code == 0 && response.data && response.data.length > 0) {
          // 转化为key-value形式便于选择
          _this.param.serno = response.data[0].serno;
          _this.paramApti.serno = response.data[0].serno;
          yufp.clone(response.data[0], _this.param);
        } else {
          _this.$message({ message: '查询合作方案基本信息失败', type: 'error' });
        }
      }
    });
    if (this.bizPageData && this.bizPageData.instanceInfo) {
      this.agrParam.op = 'details';
      this.agrParam.serno = this.bizPageData.instanceInfo.bizId;
      this.showApproval = false;
      //资质信息页面参数
      this.paramApti.op = 'details';
      this.isFromAgrBizPageMenu = true;
    } else if(this.pageParams){
      this.agrParam.op = 'details';
      this.agrParam.serno = this.pageParams.coopAgrSerno;
      this.$route.meta.params = {serno: this.pageParams.coopAgrSerno};
      this.showApproval = true;
      //资质信息页面参数
      this.paramApti.op = 'details';
    } else {
      this.agrParam = this.$route.params;
      let ap = {};
      this.$utils.clone(this.agrParam, ap);
      this.paramApti = ap;
      this.paramApti.serno = this.param.serno;
      if (this.agrParam.op != 'details') {
        this.paramApti.op = 'EDIT';
      } else {
        this.paramApti.op = 'details';
      }
    }
    this.partnerType = this.param.partnerType;
    // if (this.partnerType == 1) {
    //   this.imageBizParam[0].top_outsystem_code = 'LPHZYX';
    //   this.imageBizParam[0].index.contid = this.param.serno;
    // } else if (this.partnerType == 2) {
    //   this.imageBizParam[0].top_outsystem_code = 'DBGSSXZL';
    //   this.imageBizParam[0].index.businessid = this.param.serno;
    // } else{
    //   this.imageBizParam[0].top_outsystem_code = 'DBGSSXZL';
    //   this.imageBizParam[0].index.businessid = this.param.serno;
    // }
    this.param.op = 'details';
    this.param.from = 'coopPartnerAgr';
  },
  methods: {
    handleClick4Refresh() {
      this.$refs.coopImageList.refreshTable();
    },
    // 获取协议方案的表单数据
    getCoopPlanData () {
      return this.$refs.coopPlanAppPage.pageData;
    },
    /**
     * 关闭当前页面
     */
    onBack () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
