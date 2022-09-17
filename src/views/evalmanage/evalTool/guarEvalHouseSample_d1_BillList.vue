<template>
  <div>
    <yu-panel title="样本列表（请选择三条比对样本）" panel-type="simple">
      <template> </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="所在/注册省份" prop="provinceCd" min-width="140px"></yu-xtable-column>
        <yu-xtable-column  label="所在/注册市" prop="cityCd" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="所在县（区）" prop="countyCd"></yu-xtable-column>
        <yu-xtable-column  label="街道/村镇/路名" prop="street" min-width="140px"></yu-xtable-column>
        <yu-xtable-column  label="楼盘（社区）名称" prop="communityName" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="楼号" prop="buildingNum"></yu-xtable-column>
        <yu-xtable-column  label="建筑面积" prop="buildArea"></yu-xtable-column>
        <yu-xtable-column  label="地面构造" prop="groundStructure"></yu-xtable-column>
        <yu-xtable-column  label="层次（标的所在楼层）" prop="bdlc" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="公共配置" prop="publicFacilities"></yu-xtable-column>
        <yu-xtable-column  label="装修状况" prop="decoration"></yu-xtable-column>
        <yu-xtable-column  label="临街状况" prop="streetSituation"></yu-xtable-column>
        <yu-xtable-column  label="通风采光" prop="ventilationAndLighting"></yu-xtable-column>
        <yu-xtable-column  label="样本单价" prop="unitPrice"></yu-xtable-column>
        <yu-xtable-column  label="样本总价" prop="totalPrice"></yu-xtable-column>
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
      dataUrl: this.$backend.cmisEval + "/api/guarevalhousesample/",
      baseParams: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalhousesample/delete/"
    };
  }
};
</script>
