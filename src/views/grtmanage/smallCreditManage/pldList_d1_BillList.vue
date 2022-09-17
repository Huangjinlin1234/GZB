<template>
  <div>
    <yu-panel title="抵押物引入界面" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="抵押人名称" ctype="input" placeholder="抵押人名称" name="guarCusName"></yu-xform-item>
          <yu-xform-item label="抵押人客户号" ctype="input" placeholder="抵押人客户号" name="guarCusId"></yu-xform-item>
          <yu-xform-item label="押品名称" ctype="input" placeholder="押品名称" name="pldimnMemo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_cfirmImport" @click="customClick('cfirmImport')">确认引入</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" requestType="POST">
        <yu-xtable-column label="押品统一编号" prop="guarNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="抵质押标识" prop="grtFlag" width="100" data-code="STD_GRT_FLAG" ></yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="newlabel"></yu-xtable-column>
        <yu-xtable-column label="押品所有权人名称" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="pldimnMemo" width="140"></yu-xtable-column>
        <yu-xtable-column label="押品评估价值" prop="evalAmt" width="150"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GRT_FLAG');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/selectByModel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/delete/'
    };
  }

  // created(){
  //   var data = this.pageParams;
  //   if (data.isUnderLmt == 1) {
  //     // 是否授信项下为是时，展示授信分项下挂的抵质押品
  //     this.dataUrl = this.$backend.cmisBiz + '/api/guarbaseinfo/queryGuarInfoIsUnderLmt/';
  //     this.baseParams = {condition: {
  //       serno: data.iserno,
  //       oprType: '01'
  //     }};
  //   } else {
  //     // 是否授信项下为否时，展示所有的抵质押品
  //     this.dataUrl = this.$backend.cmisBiz + '/api/guarbaseinfo/selectByModel';
  //     this.baseParams = {condition: {
  //       oprType: '01'
  //     }};
  //   }
  // }
};
</script>