<template>
  <div>
    <yu-panel title="授信分项明细（YUFP中修改成展开树）">
      <template slot="right"> </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="post" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="成员所属名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="授信分项流水号" prop="subSerno"></yu-xtable-column>
        <yu-xtable-column label="原额度分项编号" prop="origiLmtAccSubNo"></yu-xtable-column>
        <yu-xtable-column label="授信品种" prop="subName"></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolvLmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="原额度额度" prop="origiLmtAccSubAmt"></yu-xtable-column>
        <yu-xtable-column label="变更后授信额度" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="原额度期限(月)" prop="origiLmtAccSubTerm"></yu-xtable-column>
        <yu-xtable-column label="授信期限(月)" prop="lmtTerm"></yu-xtable-column>
        <yu-xtable-column label="变更标识" prop="chgFlag" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_B_17_BillList",
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisBiz + "/api/lmtgrpapp/getSubInfoData",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api//delete/"
    };
  }
};
</script>
