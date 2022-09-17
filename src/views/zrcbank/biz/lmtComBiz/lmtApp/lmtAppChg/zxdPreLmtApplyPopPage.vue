  <!--
    @description 对公授信申请选取征信贷预授信评分卡pop页
    @创建者：zhangliang15
  -->
<template>
  <div>
  <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="对接记录ID" ctype="input" placeholder="对接记录ID" name="applyRecordId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借款人名称" ctype="input" placeholder="借款人名称" name="corpName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition: {'corpName':corpName}}" :default-load="false" request-type="POST">
        <yu-xtable-column label="对接记录ID" prop="applyRecordId"></yu-xtable-column>
        <yu-xtable-column label="借款人名称" prop="corpName"></yu-xtable-column>
        <yu-xtable-column label="借款人预期借款额度" prop="borrowerLossLmt"></yu-xtable-column>
        <yu-xtable-column label="授信期限" prop="lmtTerm" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_ZXD_STATUS"></yu-xtable-column>
        <yu-xtable-column label="是否准入" prop="ifAdmitSys" data-code="STD_ZB_ZXD_ADMIT"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" ref="btn_importIndiv" @click="customClick('importUser')">确定</yu-button>
      <yu-button type="primary" ref="btn_onCancel" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_PRD_TYPE_PROP,STD_ZB_ZXD_STATUS,STD_ZB_ZXD_ADMIT');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    corpName: String
  },
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/zxdprelmtapply/queryZxdPreLmtApply'
    };
  }
};
</script>