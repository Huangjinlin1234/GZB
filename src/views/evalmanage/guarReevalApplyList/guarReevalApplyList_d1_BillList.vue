<template>
  <div>
    <yu-panel title="押品价值重估申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="queryData">
        <yu-xform-group :column="4">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" placeholder="经办日期" name="inputDate"></yu-xform-item>
          <yu-xform-item
            label="所有人编号"
            ctype="yu-xcustom"
            placeholder="所有人编号"
            name="guarCusId"
            @select-fn="
              data => {
                let _this = this;
                _this.searchFormdata.guarCusName = data.cusName;
              }
            "
            :mapping="{ cusId: 'guarCusId', cusName: 'guarCusName' }"
            width="1080px"
            height="480"
            :parms="{ belgLine: 'bl300', cusState: '20', oprType: '01' }"
          ></yu-xform-item>
          <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" name="guarCusName" disabled></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APP_ST" placeholder="审批状态" name="approveStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doAdd">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
          <yu-button ref="btn_doDelete" @click="doDelete">删除</yu-button>
          <yu-button ref="btn_doCancel" @click="doCancel">取消</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column  label="申请流水号" prop="serno" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="押品编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column  label="经办人名称" prop="inputIdName" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column  label="所有人名称" prop="guarCusName" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="所有人编号" prop="guarCusId" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="任务来源" prop="dataSour" min-width="100" data-code="STD_ZB_EVE_DATASOUR"></yu-xtable-column>
        <yu-xtable-column  label="经办机构" prop="inputBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column  label="审批状态" prop="approveStatus" data-code="STD_ZB_APP_ST"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillList",
  mixins: [mixinUtils],
  inject: ["doAdd", "doUpdate", "doView", "doDelete", "doCancel"],
  data: function() {
    return {
      pkField: "serno",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/listQuery",
      baseParams: {
        oprType: "01"
      },
      searchFormdata: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/delete/",
      logicDeleteUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/logicalDelete",
      cancelUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/updateSelectiveInfo"
    };
  },
  methods: {
    queryData() {
      const _this = this;
      _this.$refs.refTable.remoteData({
        condition: Object.assign({ ..._this.searchFormdata }, _this.baseParams),
        sort: "serno desc"
      });
    }
  }
};
</script>
