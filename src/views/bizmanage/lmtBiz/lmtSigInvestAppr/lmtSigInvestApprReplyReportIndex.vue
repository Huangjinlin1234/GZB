<template>
  <div class="tab-form">
    <yu-panel title="主体授信申报审批" panel-type="simple">
      <yu-tabs type="card">
        <yu-tab-pane label="授信申报详情">
          <subjectCreditDetails :pageParams="pageParams"></subjectCreditDetails>
        </yu-tab-pane>
        <yu-tab-pane label="批复报告">
          <lmtSigInvestApprReplyReport :pageParams="pageParams"></lmtSigInvestApprReplyReport>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import lmtSigInvestApprReplyReport from "./lmtSigInvestApprReplyReport";
import subjectCreditDetails from "../subjectCredit/subjectCreditDetails";
export default {
  components: { lmtSigInvestApprReplyReport, subjectCreditDetails },
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
    };
  },
  created() {
    var _this = this;
    let instanceInfo = _this.bizPageData.instanceInfo;
    let serno, op;
    op = "DETAIL";
    serno = instanceInfo.bizId;
    yufp.service.request({
      method: "POST",
      url: _this.$backend.cmisBiz + "/api/lmtsiginvestapp/selectBySerno",
      data: {
        condition: JSON.stringify({
          serno: serno,
        }),
      },
      callback: function (code, message, response) {
        if (code == 0) {
          this.pageParams = response.data;
          this.pageParams.serno = serno;
          this.pageParams.op = op;
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
