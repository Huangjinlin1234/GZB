<template>
  <div class="tab-form">
    <yu-panel title="同业机构准入申报审批" panel-type="simple">
      <yu-tabs v-model="activeName" type="card">
        <yu-tab-pane label="授信申报详情" name="first">
          <OrgAdmitDetails :pageParams="detailsParams"></OrgAdmitDetails>
        </yu-tab-pane>
        <yu-tab-pane label="审查报告" name="second">
          <lmtIntBankOrgAdmitReport v-if="show_pageParams" :pageParams="pageParams" @doPrint="onPrint"></lmtIntBankOrgAdmitReport>
        </yu-tab-pane>
        <yu-tab-pane v-if="printFlag" label="查看审查报告" name="third">
          <AppReplyReport v-if="activeName=='third'" :children="children"></AppReplyReport>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import lmtIntBankOrgAdmitReport from './lmtIntBankOrgAdmitReport';
import OrgAdmitDetails from './orgAdmit/admitDetails';
import AppReplyReport from '@/views/bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
import {nodeHandle} from "@/utils/unitchange";
import {updateCommonSignAndOpinion} from "../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: { lmtIntBankOrgAdmitReport, OrgAdmitDetails, AppReplyReport },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      pageParams: '',
      activeName: 'first',
      children: Object,
      printFlag: false,
      show_pageParams: false,
      replyUrl: "",
    };
  },
  created () {
    let instanceInfo = this.bizPageData.instanceInfo;
    let serno, cusId, op, disabledInteAnaly, disabledInteAnalyZH;
    op = 'DETAIL';
    this.serno = serno = instanceInfo.bizId;
    cusId = instanceInfo.bizUserId;
    let nodeId = instanceInfo.nodeId;
    let pageType = instanceInfo.pageType;
    let replyUrl = '/api/lmtintbankappr/updateRestByPkId';
    let replyUrlZH = '/api/lmtintbankappr/updateRestByPkIdZH';
   // 我的待办（我的已办 我的办结 都只读）
    if(!pageType){
      let obj = nodeHandle(nodeId);
      // 审查
      if(obj.op){
        op = obj.op;
      }

      // 金融市场总部风险合规部信评岗
      if(obj.disabled){
        disabledInteAnaly = obj.disabled;
      }
      // 信贷管理风险派驻岗
      if(obj.disabledZH){
        disabledInteAnalyZH = obj.disabledZH;
        this.replyUrl = replyUrlZH;
      }else{
        this.replyUrl = replyUrl;
      }

    }

    this.detailsParams = {
      serno: serno,
      cusId: cusId,
      op: 'DETAIL',
    }
    this.pageParams = {
      serno: serno,
      cusId: cusId,
      op: op,
      disabledInteAnaly,
      disabledInteAnalyZH,
    };
    this.show_pageParams = false
    this.$nextTick(() => {
      this.show_pageParams = true
    });
  },
  mounted: function () {
  },
  methods: {
    onPrint (params) {
      var _this = this;
      _this.printFlag = true;
      _this.children = params;
      _this.$nextTick(() => {
        _this.activeName = 'third';
      });
    }
  }
};
</script>

<style></style>
