<template>
  <div class="tab-form">
    <yu-panel title="名单调整审批" panel-type="simple">
      <yu-tabs v-model="activeName" type="card">
        <yu-tab-pane label="名单调整详情" name="first">
          <adjustDetails :pageParams="pageParams"></adjustDetails>
        </yu-tab-pane>
        <yu-tab-pane label="批复报告" name="second">
          <lmtIntBankOrgAdmitReplyReport :pageParams="paramsReport" @doPrint="onPrint"></lmtIntBankOrgAdmitReplyReport>
        </yu-tab-pane>
        <yu-tab-pane v-if="printFlag" label="查看批复报告" name="third">
          <AppReplyReport v-if="activeName=='third'" :children="children"></AppReplyReport>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import lmtIntBankOrgAdmitReplyReport from './lmtIntBankOrgAdmitReplyReport';
import adjustDetails from './listAdjust/adjustDetails';
import AppReplyReport from '@/views/bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
import {updateCommonSignAndOpinion} from "../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: { lmtIntBankOrgAdmitReplyReport, adjustDetails, AppReplyReport },
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
      replyUrl: '/api/intbankorgadmitreply/updateRestBySerno',
    };
  },
  created () {
    console.log(this.bizPageData);
    let instanceInfo = this.bizPageData.instanceInfo;
    let serno, cusId, op;
    op = 'look';
    serno = instanceInfo.bizId;
    cusId = instanceInfo.bizUserId;
    this.paramsReport = {
      serno: serno,
      cusId: cusId,
      op: op
    };
    this.pageParams = {
      serno: serno,
      cusId: cusId,
      op: op,
    };
    this.pageParams = this.bizPageData
    this.activeName = 'first';
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
