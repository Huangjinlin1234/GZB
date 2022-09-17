<template>
  <div>
    <yu-panel title="关联客户查看列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="correCusId"></yu-xform-item>
          <yu-xform-item label="关联客户名称" ctype="input" placeholder="关联客户名称" name="correCusName"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" placeholder="状态" name="status"  data-code="STD_ZB_STATUS" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_onView" v-if="checkCtrl('view')" @click="customClick('onView')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="{condition: {'oprType':'01'},'sort':'identy_date desc'}" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="关联客户名称" prop="correCusName"></yu-xtable-column>
        <yu-xtable-column label="关联客户编号" prop="correCusId"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrg"></yu-xtable-column>
        <yu-xtable-column label="认定日期" prop="identyDate"></yu-xtable-column>
        <yu-xtable-column label="解散日期" prop="dismissDate"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
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
