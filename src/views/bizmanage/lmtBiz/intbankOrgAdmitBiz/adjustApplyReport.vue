<template>
  <div class="tab-form">
    <yu-panel title="名单调整审批" panel-type="simple">
      <yu-tabs v-model="activeName" type="card">
        <yu-tab-pane label="名单调整详情" name="first">
          <adjustDetails :pageParams="pageParams"></adjustDetails>
        </yu-tab-pane>
        <yu-tab-pane label="审查报告" name="second">
          <lmtIntBankOrgAdmitReport v-if="show_pageParams" :pageParams="paramsReport" @doPrint="onPrint"></lmtIntBankOrgAdmitReport>
        </yu-tab-pane>
        <yu-tab-pane v-if="printFlag" label="查看审查报告" name="third">
          <AppReplyReport v-if="activeName=='third'" :children="children"></AppReplyReport>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import lmtIntBankOrgAdmitReport from "./lmtIntBankOrgAdmitReport";
import adjustDetails from './listAdjust/adjustDetails';
import AppReplyReport from "@/views/bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport";
import {nodeHandle} from "@/utils/unitchange";
import {updateCommonSignAndOpinion} from "../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: { lmtIntBankOrgAdmitReport, adjustDetails, AppReplyReport },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data: function () {
    return {
      pageParams: "",
      activeName: "first",
      children: Object,
      printFlag: false,
      show_pageParams: false,
    };
  },
  created() {
    let instanceInfo = this.bizPageData.instanceInfo;
    let serno, cusId, op, disabledInteAnaly, disabledInteAnalyZH;
    op = 'DETAIL';
    serno = instanceInfo.bizId;
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
    }else{
      op = 'DETAIL';
    }
    this.paramsReport = {
      serno: serno,
      cusId: cusId,
      op: op,
      disabledInteAnaly,
      disabledInteAnalyZH,
    };
    this.pageParams = {
      serno: serno,
      cusId: cusId,
      op: "DETAIL",
    };
    this.show_pageParams = false;
    this.$nextTick(() => {
      this.show_pageParams = true;
    });
  },
  mounted: function () {},
  methods: {
    onPrint(params) {
      var _this = this;
      _this.printFlag = true;
      _this.children = params;
      _this.$nextTick(() => {
        _this.activeName = "third";
      });
    },
  },
};
</script>

<style></style>
