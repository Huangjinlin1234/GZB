<template>
  <div class="tab-form">
    <yu-panel title="集团客户授信调查报告" panel-type="simple">
      <yu-tabs type="card">
        <yu-tab-pane label="申请信息">
          <groupBasicInfo :param="param"></groupBasicInfo>
        </yu-tab-pane>
        <yu-tab-pane label="集团客户">
          <groupBasicInfoAsso :param="param"></groupBasicInfoAsso>
        </yu-tab-pane>
        <yu-tab-pane label="融资情况">
          <rptGrpCptlSitu :param="param"></rptGrpCptlSitu>
        </yu-tab-pane>
        <yu-tab-pane label="成员调查报告详情">
          <rptGrpMem :param="param"></rptGrpMem>
        </yu-tab-pane>
        <yu-tab-pane label="其他事项申请（集团汇总）">
          <rptGrpOtherAppNoAppGuar :param="param"></rptGrpOtherAppNoAppGuar>
        </yu-tab-pane>
        <yu-tab-pane label="结论">
          <rptConclusion :param="param"></rptConclusion>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import groupBasicInfo from './groupBasicInfo';
import groupBasicInfoAsso from './groupBasicInfoAsso';
import rptGrpCptlSitu from './rptGrpCptlSitu';
import rpgIndex from './rpgIndex';
import rptGrpOtherAppNoAppGuar from './rptGrpOtherAppNoAppGuar';
import rptConclusion from './rptConclusion';
import rptGrpMem from './rptGrpMem';
export default {
  components: {
    groupBasicInfo,
    groupBasicInfoAsso,
    rptGrpCptlSitu,
    rpgIndex,
    rptGrpOtherAppNoAppGuar,
    rptConclusion,
    rptGrpMem
  },
  props: {},
  data: function () {
    return {
      Param: {},
      type: false
    };
  },
  created () {
    var _this = this;
    var grpSerno = '';
    var grpCusId = '';
    var op = '';
    if (this.getFactory().contextData.instanceInfo) {
      grpSerno = this.getFactory().contextData.instanceInfo.bizId;
      grpCusId = this.getFactory().contextData.instanceInfo.bizUserId;
      op = 'VIEW';
    } else if (this.$route.meta.params) {
      op = this.$route.meta.params.op;
      grpSerno = this.$route.meta.params.grpSerno;
      grpCusId = this.$route.meta.params.grpCusId;
    } else if (this.getFactory().contextData.serno) {
      grpSerno = this.getFactory().contextData.grpSerno;
      grpCusId = this.getFactory().contextData.grpCusId;
      op = this.getFactory().contextData.op;
    }
    if (!grpSerno || grpSerno === '') {
      grpSerno = this.getFactory().contextData.instanceInfo.bizId;
    }
    _this.param = {
      grpSerno: grpSerno,
      isGrp: true,
      grpCusId: grpCusId,
      op: op
    };
  },
  mounted: function () {},
  methods: {}
};
</script>

<style></style>
