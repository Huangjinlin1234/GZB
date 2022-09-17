<template>
  <div>
    <yu-panel title="合作方退出申请列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" name="partnerType" ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus" ></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" placeholder="经办日期" name="inputDate" ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="yu-xorg" placeholder="登记机构"  @select-fn="commonSelectFn" :mapping="{'orgCode':'inputBrId'}" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button type="primary" ref="btn_doInsect" v-if="checkCtrl('add')" @click="customClick('doInsect')">新增</yu-button>
      <yu-button type="primary" ref="btn_doUpdate" v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
      <yu-button type="primary" ref="btn_doDelete" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
      <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
      <yu-button type="primary" ref="btn_doCommit" @click="customClick('doCommit')" hidden>提交</yu-button>
      <yu-xtable ref="refTable" row-number request-type="post" condition-key="condition" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_PARTNER_STATUS');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/query',
      baseParams: {sort: 'createTime desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/delete/'
    };
  }
};
</script>