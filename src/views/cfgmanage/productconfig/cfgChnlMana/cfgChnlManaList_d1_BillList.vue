<template>
  <div>
    <yu-panel title="渠道配置管理功能列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="渠道代码" ctype="input" placeholder="渠道代码" name="chnlCode" fuzzyQuery="both"></yu-xform-item>
          <yu-xform-item label="渠道名称" ctype="input" placeholder="渠道名称" name="chnlName" fuzzyQuery="both"></yu-xform-item>
          <yu-xform-item label="渠道类型" ctype="select" data-code="STD_ZB_CHNL_TYPE" placeholder="渠道类型" name="chnlType" fuzzyQuery="both"></yu-xform-item>
          <yu-xform-item label="渠道性质" ctype="select" data-code="STD_ZB_CHNL_CHA" placeholder="渠道性质" name="chnlCha" fuzzyQuery="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ condition: { oprType: '01' } }" :default-load="true">
        <yu-xtable-column label="渠道代码" prop="chnlCode"></yu-xtable-column>
        <yu-xtable-column label="渠道名称" prop="chnlName"></yu-xtable-column>
        <yu-xtable-column label="渠道类型" prop="chnlType" data-code="STD_ZB_CHNL_TYPE"></yu-xtable-column>
        <yu-xtable-column label="渠道性质" prop="chnlCha" data-code="STD_ZB_CHNL_CHA"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="userName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="orgName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./cfgChnlManaList_dialog_BillCard";
export default {
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgchnlmana/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgchnlmana/delete/"
    };
  },
  mounted() {
    this.d1_BillList.queryDataByCondition({
      oprType: "01"
    });
  }
};
</script>
