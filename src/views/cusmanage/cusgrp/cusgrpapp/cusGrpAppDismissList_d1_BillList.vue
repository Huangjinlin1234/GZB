<template>
  <div>
    <yu-panel title="集团客户解散" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpNo"></yu-xform-item>
          <yu-xform-item label="集团名称" ctype="input" placeholder="集团名称" name="grpName"></yu-xform-item>
          <yu-xform-item label="核心客户编号" ctype="input" placeholder="核心客户编号" name="coreCusId"></yu-xform-item>
          <yu-xform-item label="核心客户名称" ctype="input" placeholder="核心客户名称" name="coreCusName"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button ref="btn_doInsert" type="primary" v-if="checkCtrl('add')" @click="customClick('doInsert')">新增</yu-button>
        <yu-button ref="btn_doDelete" type="primary" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
        <yu-button ref="btn_doUpdate" type="primary" v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
        <yu-button ref="btn_doView" type="primary" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="POST" :default-load="fasle">
        <yu-xtable-column label="业务编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpNo"></yu-xtable-column>
        <yu-xtable-column label="集团名称" prop="grpName"></yu-xtable-column>
        <yu-xtable-column label="核心客户编号" prop="coreCusId"></yu-xtable-column>
        <yu-xtable-column label="核心客户名称" prop="coreCusName"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" width="180"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" width="180"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
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
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusgrpapp/query',
      baseParams: {condition: {'oprType': '01', appType: '03', managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode')}, 'sort': 'app_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cusgrpapp/delete/',
      logicDeleteUrl: this.$backend.cmisCus + '/api/cusgrpapp/update'
    };
  }
};
</script>
