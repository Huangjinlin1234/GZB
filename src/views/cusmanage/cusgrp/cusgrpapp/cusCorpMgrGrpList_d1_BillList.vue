<template>
  <div>
    <yu-panel title="对公高管人员信息">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="高管类别" prop="mrgType" data-code="STD_CROP_MRG_TYPE"></yu-xtable-column>
        <yu-xtable-column label="高管证件类型" prop="mrgCertType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="高管证件号码" prop="mrgCertCode"></yu-xtable-column>
        <yu-xtable-column label="高管姓名" prop="mrgName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CROP_MRG_TYPE');
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + "/api/cuscorpmgr/",
      baseParams: {condition: {cusIdRel:this.getFactory().contextData.coreCusId}},
      deleteUrl: this.$backend.cmisCus + "/api/cuscorpmgr/delete/"
    }
  }
}
</script>