<template>
  <div>
    <yu-panel title="批量客户移交基本信息"  panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="登记日期" ctype="datepicker" placeholder="登记日期" name="inputDate" ></yu-xform-item>
          <yu-xform-item label="批量移交状态" ctype="select" data-code="STD_CUS_BATCH_HANDO_STATUS" placeholder="批量移交状态" name="batchHandoStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doAdd" v-if="checkCtrl('add')" @click="customClick('doAdd')">新增</yu-button>
        <yu-button type="primary" ref="btn_doUpdate" v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_doDelete" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'oprType':'01'}}" :default-load="true" request-type="POST">
        <yu-xtable-column label="所属机构" prop="belgOrgName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="批量移交状态" prop="batchHandoStatus" data-code="STD_CUS_BATCH_HANDO_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cbphaSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverapp/queryByModel',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverapp/delete/'
    };
  }
};
</script>