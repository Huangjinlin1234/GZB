<template>
  <div>
    <yu-panel title="业务权申领客户列表" panel-type="simple">
      <yu-xform ref="refForm" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onAdd" v-if="operate!='details'" @click="customClick('onAdd')">添加</yu-button>
          <yu-button ref="btn_ondelete" v-if="operate!='details'" @click="customClick('ondelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CUS_TYP,STD_ZB_CERT_TYP');
export default {
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    operate: String
  },
  data: function () {
    return {
      pkField: 'aarCusLstSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      dataUrl: this.$backend.cmisCus + '/api/cusbizaarcuslst/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusbizaarcuslst/delete/'
    };
  },
  methods: {
    rowClickFn: function () {
      var row = this.$refs.refTable.getSelectedRowData();
      this.$dialog.close(this.dialogId, row);
    }
  }
};
</script>