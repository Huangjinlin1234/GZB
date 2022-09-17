<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="关联客户名称" ctype="input" placeholder="关联客户名称" name="correCusName"></yu-xform-item>
          <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="correCusId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="{condition: {'oprType':'01'}}" :data-url="dataUrl" :default-load="false" request-type="POST">>
        <yu-xtable-column label="关联编号" prop="correNo"></yu-xtable-column>
        <yu-xtable-column label="关联客户名称" prop="correCusName"></yu-xtable-column>
        <yu-xtable-column label="关联客户编号" prop="correCusId"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrg"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" ref="btn_importIndiv" @click="customClick('import')">确定</yu-button>
      <yu-button type="primary" ref="btn_onCancel" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'applySerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusrelcus/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusrelcus/delete/'
    };
  }
};
</script>
