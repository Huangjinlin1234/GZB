<template>
  <div class="tab-form">
    <yu-panel title="同业机构准入申报审批" panel-type="simple">
      <yu-tabs type="card">
        <yu-tab-pane label="授信申报详情">
          <OrgAdmitDetails :pageParams="pageParams"></OrgAdmitDetails>
        </yu-tab-pane>
        <!--<yu-tab-pane label="授信审批详情"> modify by zhangjw 20210812 审批过程中只展示授信申报页面
          <OrgAdmitAudit :pageParams="pageParams"></OrgAdmitAudit>
        </yu-tab-pane>-->
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import OrgAdmitDetails from '../orgAdmit/admitDetails';
import OrgAdmitAudit from '../orgAdmit/admitAudit';
import {updateCommonSignAndOpinion} from "../../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: {OrgAdmitDetails, OrgAdmitAudit},
  props: {
    bizPageData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      pageParams: {},
      replyUrl: "/api/intbankorgadmitappr/updateRestByPkId",
    };
  },
  created() {
    console.log(this.bizPageData);
    let instanceInfo = this.bizPageData.instanceInfo;
    let serno, cusId, op;
    op = 'DETAIL';
    serno = instanceInfo.bizId;
    cusId = instanceInfo.bizUserId;
    this.pageParams = {
      serno: serno,
      cusId: cusId,
      op: op
    };
  },
  mounted: function() {

  },
  methods: {}
};
</script>

<style></style>
