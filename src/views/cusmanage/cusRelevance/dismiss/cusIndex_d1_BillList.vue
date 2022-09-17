<template>
  <div>
    <yu-panel title="关联客户申请列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="correCusId"></yu-xform-item>
          <yu-xform-item label="关联客户名称" ctype="input" placeholder="关联客户名称" name="correCusName"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_onAdd" v-if="checkCtrl('add')" @click="customClick('onAdd')">新增</yu-button>
        <yu-button type="primary" ref="btn_onUpdate" v-if="checkCtrl('edit')" @click="customClick('onUpdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_onDelete" v-if="checkCtrl('delete')" @click="customClick('onDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_onView" v-if="checkCtrl('view')" @click="customClick('onView')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition:{'oprType':'01', appType:'03'},'sort':'input_date desc'}" :default-load="false">
        <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="关联客户编号" prop="correCusId"></yu-xtable-column>
        <yu-xtable-column label="关联客户名称" prop="correCusName"></yu-xtable-column>
        <yu-xtable-column label="申请人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="申请机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'applySerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusrelcusapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusrelcusapp/delete/'
    };
  }
};
</script>
