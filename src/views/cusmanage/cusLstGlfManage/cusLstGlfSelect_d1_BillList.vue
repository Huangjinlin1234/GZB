<template>
  <div>
    <yu-panel title="关联方名单管理" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="关联方类型" ctype="select" data-code="STD_ZB_RELATED_PARTY_TYPE" placeholder="关联方类型" name="relatedPartyType" ></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" ></yu-xform-item>
          <yu-xform-item label="归属组别" ctype="select" placeholder="归属组别" name="belongGroup" ></yu-xform-item>
          <yu-xform-item label="关联方名称" ctype="input" placeholder="关联方名称" name="relatedPartyName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="状态" name="status" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="关联方类型" prop="relatedPartyType" width="120px" data-code="STD_ZB_RELATED_PARTY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" width="150px" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="境内/境外" prop="lcaos" width="120px" data-code="STD_LCAOS"></yu-xtable-column>
        <yu-xtable-column label="归属组别" prop="belongGroup" data-code="STD_BELONG_GROUP" width="100px"></yu-xtable-column>
        <yu-xtable-column label="关联方名称" prop="relatedPartyName" width="120px"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="120px"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120px"></yu-xtable-column>
        <yu-xtable-column label="层级标识" prop="levels" width="100px" data-code="STD_ZB_LEVELS_FLAG"></yu-xtable-column>
        <yu-xtable-column label="上一级关联方名称" prop="parebtRelatedPartyName" width="170px"></yu-xtable-column>
        <yu-xtable-column label="与上一级关联方关系" prop="parebtRelatedPartyRela" width="170px" data-code="STD_CUS_PAREBT_RELATED_PARTY_RELA"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120px"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" width="120px"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" width="120px" data-code="STD_ZB_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="customClick('confirm')">确定</yu-button>
        <yu-button type="primary" @click="customClick('back')">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_RELATED_PARTY_TYPE,STD_LCAOS,STD_ZB_LEVELS_FLAG,STD_CUS_PAREBT_RELATED_PARTY_RELA,STD_BELONG_GROUP');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstglf/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstglf/delete/'
    };
  }
};
</script>
