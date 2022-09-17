<template>
  <div>
    <yu-panel title="担保品信息">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="担保分类名称" ctype="yu-xcustom-ref" placeholder="担保分类名称" name="guarTypeCdCnname"  @select-fn="commonSelectFn" :mapping="{'guarTypeCdCnname':'guarTypeCdCnname','hUseFlag':'hUseFlag','guarWay':'guarWay','uniqueSupportInd':'uniqueSupportInd','guarTypeCd':'guarTypeCd'}" width="480" height="480" :parms="{'guarTypeState':'0'}" :selectionType="radio" pagePath="guarmanage/collateralInfo/guarRef/guarClassRefDialogIndex" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="关键字段1" ctype="input" placeholder="关键字段1" name="keyword1"></yu-xform-item>
          <yu-xform-item label="关键字段2" ctype="input" placeholder="关键字段2" name="keyword2"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onImport" @click="customClick('onImport')">引入</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{}" :default-load="false">
        <yu-xtable-column label="押品统一编号" prop="guarNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="guarTypeCdCnname" width="100"></yu-xtable-column>
        <yu-xtable-column label="押品所有人编号" prop="guarCusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="押品所有人名称" prop="guarCusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="押品所有人证件类型" prop="guarCertType" width="100" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="押品所有人证件号码" prop="guarCertCode" width="100"></yu-xtable-column>
        <yu-xtable-column label="我行认定价值" prop="evalAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="确认价值币种" prop="evalCurrency" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="押品状态" prop="guarState" width="100" data-code="STD_ZB_GUAR_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'guarNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisGuar + "/api/guarbaseinfo/",
      baseParams: {},
      deleteUrl: this.$backend.cmisGuar + "/api/guarbaseinfo/delete/"
    }
  }
}
</script>