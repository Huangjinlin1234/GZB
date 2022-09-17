<template>
  <div>
    <yu-panel title="国控类客户信息列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="是否国控" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否国控" name="isNatctl" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId"></yu-xform-item>
          <yu-xform-item label="国控层级" ctype="select" data-code="STD_ZB_NATCTL_LEVEL" placeholder="国控层级" name="natctlLevel" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_batchNo" v-if="checkCtrl('batchno')" @click="customClick('batchNo')">批量转换为否</yu-button>
        <yu-button type="primary" ref="btn_batchYes" v-if="checkCtrl('batchyes')" @click="customClick('batchYes')">批量转换为是</yu-button>
        <yu-button type="primary" ref="btn_single" v-if="checkCtrl('single')" @click="customClick('single')">单笔调整</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId" width="200"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="200"></yu-xtable-column>
        <yu-xtable-column label="是否国控" prop="isNatctl" width="100" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="200"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId" width="120"></yu-xtable-column>
        <yu-xtable-column label="国控层级" prop="natctlLevel" width="200" data-code="STD_ZB_NATCTL_LEVEL"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" width="200" data-code="STD_ZB_CUS_TYP" ></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" width="100" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" width="200" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="mainBrId" width="200"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_NATCTL_LEVEL,STD_ZB_CUS_TYP,STD_ZB_CUS_CLS,STD_ZB_CERT_TYP');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuscorp/selectCusCorpSignUpholdByModel',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuscorp/delete/'
    };
  }
};
</script>