<template>
  <div class="tab-form">
    <yu-tabs type="card">
      <yu-tab-pane label="批复变更详情" v-if="type">
        <lmtIntBankReplyChgAddList :pageParams="pageParams"></lmtIntBankReplyChgAddList>
      </yu-tab-pane>
      <yu-tab-pane label="批复变更详情" v-else>
        <lmtSigInvestChgReplyList :pageParams="pageParams"></lmtSigInvestChgReplyList>
      </yu-tab-pane>

    </yu-tabs>

  </div>
</template>

<script>
import lmtIntBankReplyChgAddList from "./lmtIntBankReplyChgAddList";
import lmtSigInvestChgReplyList from "../lmtSigInvestChgReply/lmtSigInvestChgReplyList";
export default {
  components: { lmtIntBankReplyChgAddList, lmtSigInvestChgReplyList },
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
      pageParams: {},
      type: false,
    };
  },
  created() {
    console.log("===============", this.bizPageData);
    let instanceInfo = this.bizPageData.instanceInfo;
    let flowParam = this.bizPageData.flowParam;
    let serno, cusId, op;
    let tableName = flowParam.tableName;
    if (tableName == "lmtIntBankReplyChg") {
      this.type = true;
      op = "DETAIL";
      serno = instanceInfo.bizId;
      cusId = instanceInfo.bizUserId;
      this.pageParams = {
        serno: serno,
        cusId: cusId,
        op: op,
      };
    } else if (tableName == "lmtSigInvestChgReply") {
      this.type = false;
      op = "DETAIL";
      serno = instanceInfo.bizId;
      cusId = instanceInfo.bizUserId;
      this.pageParams = {
        serno: serno,
        cusId: cusId,
        op: op,
      };
    }
  },
  mounted: function () {},
  methods: {},
};
</script>

<style></style>
