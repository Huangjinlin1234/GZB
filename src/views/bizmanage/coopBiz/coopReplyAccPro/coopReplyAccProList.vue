<template>
  <div>
    <yu-panel title="项目信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_quotaInsert" v-if="operate!='details'" @click="customClick('quotaProInsert')">新增</yu-button>
          <yu-button type="primary" ref="btn_quotaUpdate" v-if="operate!='details'" @click="customClick('quotaProUpdate')">修改</yu-button>
          <yu-button type="primary" ref="btn_quataDelete" v-if="operate!='details'" @click="customClick('quataProDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="get" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
        <yu-xtable-column label="项目类型" prop="proType" data-code="STD_COOP_PRO_TYPE"></yu-xtable-column>
        <yu-xtable-column label="项目名称" prop="proName" ></yu-xtable-column>
        <yu-xtable-column label="项目额度(元)" prop="proLmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="本次签订金额" prop="signAmt" :formatter="Currency"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_PRD_TYPE_PROP_COOP');
export default {
  name: 'coopReplyAccProList',
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
      dataUrl: this.$backend.cmisBiz + '/api/coopreplyagrpro/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopreplyagrpro/delete/'
    };
  }
};
</script>
