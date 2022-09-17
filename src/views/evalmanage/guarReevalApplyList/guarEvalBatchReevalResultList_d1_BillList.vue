<template>
  <div>
    <yu-panel title="批量重估结果信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="queryData">
        <yu-xform-group :column="4">
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="重估结果" ctype="select" data-code="STD_ZB_REVEL_RESULT" placeholder="重估结果" name="evalResult"></yu-xform-item>
          <yu-xform-item label="重估日期" ctype="datepicker" placeholder="重估日期" name="evalDate"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_$query" @click="onView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column  label="押品统一编号" prop="guarNo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="担保分类" prop="guarTypeCd"></yu-xtable-column>
        <yu-xtable-column  label="担保分类名称" prop="guarTypeCdCnname"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人名称" prop="guarCusName" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="重估我行确认价值" prop="newEvelValue" :formatter="formatter" min-width="170px"></yu-xtable-column>
        <yu-xtable-column  label="确认币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column  label="重估结果" prop="evalResult" data-code="STD_ZB_REVEL_RESULT"></yu-xtable-column>
        <yu-xtable-column  label="重估日期" prop="evalDate"></yu-xtable-column>
        <yu-xtable-column  label="失败原因" prop="evalFaultResn"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%" high="60%">
      <dialog-billcard ref="dialog_BillCard" style="overflow:hidden auto;height:100%"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
import dialogBillcard from "./guarEvalBatchReevalResultList_dialog_BillCard";
import { moneyFormatter } from "@/utils/util";
export default {
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins: [mixinUtils],
  provide() {
    return {
      onCancel: () => {
        this.dialogVisible = false;
      }
    };
  },
  data: function() {
    return {
      pkField: "taskId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalbatchreevalresult/",
      baseParams: {
        oprType: "01"
      },
      searchFormdata: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalbatchreevalresult/delete/"
    };
  },
  methods: {
    queryData() {
      const _this = this;
      _this.$refs.refTable.remoteData({
        condition: Object.assign({ ..._this.searchFormdata }, _this.baseParams),
        sort: "input_date desc"
      });
    },
    onView() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let selectedRow = {};
      this.$xutils.clone(selections[0], selectedRow); //克隆数据
      this.dialogTitle = "查看";
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.dialog_BillCard.formType = "details";
        Object.assign(this.$refs.dialog_BillCard.formdata, selectedRow);
      }, 0);
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
