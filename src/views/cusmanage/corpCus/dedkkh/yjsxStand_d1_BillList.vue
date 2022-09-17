<template>
  <div>
    <yu-panel title="压降情况台账" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId"  @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_select" v-if="checkCtrl('view')" @click="customClick('select')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="post" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="150"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" width="150"></yu-xtable-column>
        <yu-xtable-column label="压降年度" prop="pressureDropYearly" width="120"></yu-xtable-column>
        <yu-xtable-column label="本年度计划总压降金额（万元）" prop="planAmt" width="150"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrgName" width="150"></yu-xtable-column>
        <yu-xtable-column label="本年度已落实压降金额（万元）" prop="sumamt" width="150"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="150"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="进入名单标识" prop="enterListFlag" data-code="STD_ENTER_LIST_FLAG" width="120"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS" width="120"></yu-xtable-column>
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
      pkField: 'listSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/queryListData',
      baseParams: {'sort': 'input_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/delete/'
    };
  }
};
</script>