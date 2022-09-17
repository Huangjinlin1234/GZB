<template>
  <div>
    <yu-panel title="合作协议列表" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_agrInsert" v-if="operate!='details'" @click="customClick('agrInsert')">新增</yu-button>
          <yu-button ref="btn_agrDelete" v-if="operate!='details'" @click="customClick('agrDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="post" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="协议编号" prop="coopAgrNo"></yu-xtable-column>
        <yu-xtable-column label="协议金额" prop="coopAgrAmt" :formatter="Currency" width="140"></yu-xtable-column>
        <yu-xtable-column label="协议起始日" prop="coopAgrStartDate"></yu-xtable-column>
        <yu-xtable-column label="协议到期日" prop="coopAgrEndDate"></yu-xtable-column>
        <yu-xtable-column label="协议签订日" prop="coopAgrSignDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_PRD_TYPE_PROP');
export default {
  name: 'D1BBBABillList',
  mixins: [mixinList, mixin],
  props: {
    operate: String,
    source: String
  },
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/cooppartneragraddrel/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/cooppartneragraddrel/delete/'
    };
  }
};
</script>
