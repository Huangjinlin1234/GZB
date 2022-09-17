<template>
  <div class="tab-form">
    <yu-panel title="主体授信申报审批" panel-type="simple">
      <yu-tabs type="card">
        <yu-tab-pane label="授信申报详情">
          <subjectCreditDetails v-if="show_params" :pageParams="detailsParams"></subjectCreditDetails>
        </yu-tab-pane>
        <yu-tab-pane label="核查报告">
          <lmtSigInvestApprCheckReport v-if="show_params" :pageParams="pageParams"></lmtSigInvestApprCheckReport>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import lmtSigInvestApprCheckReport from "./lmtSigInvestApprCheckReport";
import subjectCreditDetails from "../subjectCredit/subjectCreditDetails";
export default {
  components: { lmtSigInvestApprCheckReport, subjectCreditDetails },
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
      show_params: false,
      detailsParams: {},
    };
  },
  created() {
    // 挂载的可修改核查页面   批复、审查只读
    var _this = this;
    let instanceInfo = this.bizPageData.instanceInfo;
    let serno, op;
    serno = instanceInfo.bizId;
    let nodeId = instanceInfo.nodeId;
    let pageType = instanceInfo.pageType;
     // 我的待办 我的已办 全都只读
    if(!pageType){
      if (nodeId == "164_13") {
        op = "EDIT";
      }else{
        op = "DETAIL";
      }
    }else{
      op = "DETAIL";
    };
    yufp.service.request({
      method: "POST",
      url: _this.$backend.cmisBiz + "/api/lmtsiginvestapp/selectBySerno",
      data: {
        serno: serno,
      },
      callback: function (code, message, response) {
        if (code == 0) {
          _this.pageParams = Object.assign({}, response.data);
          _this.detailsParams = Object.assign({}, response.data);
          _this.detailsParams.serno = _this.pageParams.serno = serno;
          _this.detailsParams.op = "DETAIL"
          _this.pageParams.op = op;
          _this.show_params = false;
          _this.$nextTick(() => {
            _this.show_params = true;
          });
          return;
        } else {
          _this.$message({
            duration: 4000,
            message: "系统错误，请联系管理员！",
            type: "warning",
          });
          return;
        }
      },
    });
  },
  mounted: function () {},
  methods: {},
};
</script>

<style></style>
