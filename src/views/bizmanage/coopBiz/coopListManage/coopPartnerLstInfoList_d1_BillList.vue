<template>
  <div>
    <yu-panel title="合作方名单信息列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合作方状态" ctype="select" data-code="STD_PARTNER_STATUS" placeholder="合作方状态" name="partnerStatus" ></yu-xform-item>
          <yu-xform-item label="责任人" ctype="yu-xuser" placeholder="责任人" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" name="managerId"></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="yu-xorg" placeholder="责任机构"  @select-fn="commonSelectFn" :mapping="{'orgCode':'managerBrId'}" name="managerBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <!--<yu-button-drop>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>-->
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作方状态" prop="partnerStatus" data-code="STD_PARTNER_STATUS"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
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
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/cooppartnerlstinfo/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/cooppartnerlstinfo/delete/'
    };
  }
};
</script>