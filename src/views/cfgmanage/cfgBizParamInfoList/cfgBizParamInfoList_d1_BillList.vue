<template>
  <div>
    <yu-panel title="业务参数配置">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="customClick('onDelete')">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" :pageable="true" :data-url="dataUrl" :base-params="{ condition: { oprType: '01' } }" :default-load="true">
        <yu-xtable-column label="业务参数类型" prop="bizParamType" width="300.00" data-code="STD_BIZ_PARAM_TYPE"></yu-xtable-column>
        <yu-xtable-column label="业务参数值" prop="bizParamValue" width="300.00"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./cfgBizParamInfoList_dialog_BillCard";
yufp.lookup.reg("STD_BIZ_PARAM_TYPE");
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
      dataUrl: this.$backend.cmisCfg + "/api/cfgbizparaminfo/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgbizparaminfo/delete/"
    };
  }
};
</script>
