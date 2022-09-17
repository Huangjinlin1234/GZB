<template>
  <div class="tab-form">
    <yu-panel title="同业机构准入申报调整" panel-type="simple">
      <adjustDetails :pageParams="pageParams"></adjustDetails>
    </yu-panel>
  </div>
</template>

<script>
import adjustDetails from './listAdjust/adjustDetails';
import {updateCommonSignAndOpinion} from "../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: { adjustDetails},
  name: "intBankOrgAdmitAdjustReportIndex",
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
      replyUrl: "/api/intbankorgadmitappr/updateRestByPkId",
    };
  },
  created () {
    let instanceInfo = this.bizPageData.instanceInfo;
    let serno, cusId, op;
    op = 'DETAIL';
    this.serno = serno = instanceInfo.bizId;
    cusId = instanceInfo.bizUserId;
    this.pageParams = {
      serno: serno,
      cusId: cusId,
      op: op
    };
  }
}
</script>

<style scoped>

</style>
