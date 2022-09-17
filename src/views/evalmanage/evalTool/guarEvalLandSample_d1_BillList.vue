<template>
  <div>
    <yu-panel title="样本列表（请选择三条比对样本）" panel-type="simple">
      <template> </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="所在/注册省份" prop="provinceCd" min-width="130px"></yu-xtable-column>
        <yu-xtable-column  label="所在/注册市" prop="cityCd" min-width="130px"></yu-xtable-column>
        <yu-xtable-column  label="所在县（区）" prop="countyCd" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="土地详细地址" prop="detailAddress" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="土地用途" prop="usePurp"></yu-xtable-column>
        <yu-xtable-column  label="土地使用权面积" prop="useArea" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="土地所在地段情况" prop="landPlaceCase" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="产权年限" prop="oldyears"></yu-xtable-column>
        <yu-xtable-column  label="样本单价" prop="unitPrice"></yu-xtable-column>
        <yu-xtable-column  label="样本总价" prop="totalPrice"></yu-xtable-column>
        <yu-xtable-column  label="评估日期" prop="evalDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_BillList",
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "rid",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevallandsample/",
      baseParams: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevallandsample/delete/"
    };
  }
};
</script>
