<template>
  <div>
    <yu-panel title="合作方案适用机构信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_selectOrg" v-if="operate!='details'" @click="customClick('selectOrg')">选取</yu-button>
          <yu-button type="primary" ref="btn_deleteOrg" v-if="operate!='details'" @click="customClick('deleteOrg')">删除</yu-button>
          <yu-button type="primary" ref="btn_deleteAllOrg" v-if="operate!='details'" @click="customClick('deleteAllOrg')">全部删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="适用机构名称" prop="suitOrgName"></yu-xtable-column>
        <yu-xtable-column label="适用机构编号" prop="suitOrgNo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BABillList',
  mixins: [mixinList],
  props: {
    operate: String
  },
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopplansuitorginfo/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopplansuitorginfo/delete/'
    };
  }
};
</script>
