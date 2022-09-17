<template>
  <div>
    <yu-panel title="批量重估押品明细" panel-type="simple">
      <!--<yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4"> </yu-xform-group>
      </yu-xform>-->
      <template> </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column  label="批量申请流水号" prop="batchSerno" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="押品编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人编号" prop="guarCusId" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人名称" prop="guarCusName" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="我行确认价值" prop="evalValue" min-width="120px" :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column  label="确认价值币种" prop="evalCurType" min-width="120px" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column  label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column  label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column  label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import { moneyFormatter } from "@/utils/util";
export default {
  name: "d1_BillList",
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "pk",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalrel/listQuery",
      baseParams: {},
      searchFormdata: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalrel/delete/"
    };
  },
  methods: {
    queryData() {
      const _this = this;
      _this.$refs.refTable.remoteData({
        condition: Object.assign({ ..._this.searchFormdata }, _this.baseParams)
      });
    },
    formatter: function(row, column, cellValue) {
      if (cellValue == null) {
        return "0.00";
      } else {
        return moneyFormatter(cellValue, 2);
      }
    }
  }
};
</script>
