<template>
  <div>
    <yu-panel title="待重估信息列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="queryData" :custom-reset-fn="resetSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="批量申请流水号" ctype="input" placeholder="批量申请流水号" name="batchSerno"></yu-xform-item>
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo"></yu-xform-item>

          <yu-xform-item
            label="登记人"
            ctype="yu-xuser"
            placeholder="登记人"
            name="inputIdName"
            @select-fn="
              data => {
                let _this = this;
                _this.searchFormdata.inputId = data.loginCode;
                _this.searchFormdata.inputIdName = data.userName;
              }
            "
          ></yu-xform-item>

          <yu-xform-item name="inputBrId" label="登记机构" ctype="custom">
            <yu-combo-tree ref="tree" v-model="orgName" :placeholder="登记机构" :local-data="orgTreeData" data-id="orgId" data-label="orgName" data-pid="upOrgId" :clearable="true" @node-click="changeOrgIdFn($event, true)" @clear="clearUpOrgIdFn(true)" :filter-node-method="filterNode" :all-node-value="true" max-height="400"> </yu-combo-tree>
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_onImport" @click="onImport">确认选取</yu-button>
          <yu-button ref="btn_onCancel" @click="onCancel">返回</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column  label="批量申请流水号" prop="batchSerno" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="押品编号" prop="guarNo" width="150"></yu-xtable-column>
        <yu-xtable-column  label="担保分类代码" prop="guarTypeCd" min-width="150"></yu-xtable-column>
        <yu-xtable-column  label="担保分类名称" prop="pldimnMemo" min-width="150"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人编号" prop="guarCusId" min-width="150"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人名称" prop="guarCusName" min-width="150"></yu-xtable-column>
        <yu-xtable-column  label="押品状态" prop="guarStatus" width="150" data-code="STD_ZB_GUAR_STATE"></yu-xtable-column>
        <yu-xtable-column  label="登记人" prop="inputIdName" width="150"></yu-xtable-column>
        <yu-xtable-column  label="登记机构" prop="inputBrIdName" width="150"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import { lookup } from "@/utils";
import mixinUtils from "@/utils/mixins/mixin-utils";
import { mapGetters } from "vuex";
import { checkBelongToChooseNode } from "@/utils/util";

lookup.reg("DATA_STS,SEX_TYPE,IDENT_TYPE,HIGHEST_EDU");
export default {
  name: "d1_BillList",
  mixins: [mixinUtils],
  inject: ["onImport", "onCancel"],
  computed: {
    ...mapGetters(["orgTreeData"])
  },
  watch: {
    orgName: function(newVal, oldVal) {
      this.$refs.tree.filter(newVal);
    }
  },
  mounted() {
    this.userSts = lookup.find("DATA_STS", false);
    this.$store.dispatch("funData/orgTreeFn");
  },
  data: function() {
    return {
      pkField: "pk",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalrel/listQuery",
      searchFormdata: {},
      baseParams: {
        oprType: "01"
      },
      orgName: "",
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
    resetSearch: function() {
      for (var key in this.searchFormdata) {
        if (!this.searchFormdata.hasOwnProperty(key)) {
          continue;
        }
        this.searchFormdata[key] = "";
      }
      this.clearUpOrgIdFn();
    },
    changeOrgIdFn: function(node) {
      this.orgName = node.orgId;
      this.searchFormdata.inputBrId = node.orgId;
    },
    clearUpOrgIdFn: function() {
      this.orgName = "";
      this.searchFormdata.inputBrId = "";
    },
    filterNode: function(value, nodeData, node) {
      if (!this.$refs.tree.selectedLabel) {
        return true;
      }
      if (nodeData.orgName.indexOf(this.$refs.tree.selectedLabel) !== -1) {
        return true;
      }
      return checkBelongToChooseNode(this.$refs.tree.selectedLabel, node, "orgName");
    }
  }
};
</script>
