<template>
  <div class="tab-form">
    <yu-panel title="同业机构准入申报审批" panel-type="simple">
      <yu-tabs v-model="activeName" type="card">
        <yu-tab-pane label="授信申报详情" name="first">
          <OrgAdmitDetails :pageParams="detailsParams"></OrgAdmitDetails>
        </yu-tab-pane>
        <yu-tab-pane label="审查报告" name="fourth">
          <lmtIntBankOrgAdmitReport :pageParams="pageParams1" @doPrint="onPrint"></lmtIntBankOrgAdmitReport>
        </yu-tab-pane>
        <yu-tab-pane label="批复报告" name="second">
          <lmtIntBankOrgAdmitReplyReport :pageParams="pageParams" @doPrint="onPrint"></lmtIntBankOrgAdmitReplyReport>
        </yu-tab-pane>
        <yu-tab-pane v-if="printFlag" :label="label" name="third">
          <AppReplyReport v-if="activeName=='third'" :children="children"></AppReplyReport>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import lmtIntBankOrgAdmitReplyReport from "./lmtIntBankOrgAdmitReplyReport";
import lmtIntBankOrgAdmitReport from './lmtIntBankOrgAdmitReport';
import OrgAdmitDetails from "./orgAdmit/admitDetails";
import AppReplyReport from "@/views/bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport";
import {updateCommonSignAndOpinion} from "../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: {
    lmtIntBankOrgAdmitReplyReport,
    lmtIntBankOrgAdmitReport,
    OrgAdmitDetails,
    AppReplyReport,
  },
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
      label: "",
      replyUrl: "/api/intbankorgadmitreply/updateRestBySerno",
    };
  },
  created() {
    // 挂载的可修改批复页面  审查只读
    console.log(this.bizPageData);
    let instanceInfo = this.bizPageData.instanceInfo;
    let serno, cusId, op, rop;
    op = "DETAIL";
    serno = instanceInfo.bizId;
    cusId = instanceInfo.bizUserId;
    let pageType = instanceInfo.pageType;
    // 我的待办 我的已办 全都只读
    if(!pageType){
      rop = "EDIT";
    }else{
      rop = "DETAIL";
    }
    this.detailsParams = {
      serno: serno,
      cusId: cusId,
      op: op,
    }
    this.pageParams = {
      serno: serno,
      cusId: cusId,
      op: rop,
    };
    this.pageParams1 = {
      serno: serno,
      cusId: cusId,
      op: op,
    };
    this.activeName = "first";
  },


  mounted: function () {},
  methods: {
    onPrint(params) {
      var _this = this;
      if (_this.activeName == "second") {
        _this.label = "查看批复报告";
      } else if (_this.activeName == "fourth") {
        _this.label = "查看审查报告";
      }
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
