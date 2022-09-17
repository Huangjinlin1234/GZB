<template>
  <div>
    <yu-panel title="汇率配置">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="原币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="原币种" name="origiCurType"></yu-xform-item>
          <yu-xform-item label="对照币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="对照币种" name="compCurType"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_doDel" @click="onBillListLogicDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_byImport" @click="customClick('byImport')">批量导入</yu-button>
          <yu-button ref="btn_byModelDown" @click="customClick('byModelDown')">模板下载</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ condition: { oprType: '01' } }" :default-load="true">
        <yu-xtable-column label="原币种" prop="origiCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="对照币种" prop="compCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="钞买价" prop="cshBuyRate"></yu-xtable-column>
        <yu-xtable-column label="中间汇率" prop="midRemit"></yu-xtable-column>
        <yu-xtable-column label="汇卖出汇率" prop="sldExchgRate"></yu-xtable-column>
        <yu-xtable-column label="汇买入汇率" prop="buyExchgRate"></yu-xtable-column>
        <yu-xtable-column label="最后修改日期" prop="updDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./cfgExchgRateInfoList_dialog_BillCard";
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
      dataUrl: this.$backend.cmisCfg + "/api/cfgexchgrate/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgexchgrate/delete/"
    };
  }
};
</script>