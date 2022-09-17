<template>
  <div>
    <yu-panel title="微贷区域管理表" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="区域编号" ctype="input" placeholder="区域编号" name="areaNo" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')">添加</yu-button>
          <yu-button type="primary" ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button type="primary" ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button type="primary" ref="btn_setOrg" @click="customClick('setOrg')">设置机构</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" requestType="POST" :default-load="true">
        <yu-xtable-column label="区域编号" prop="areaNo"></yu-xtable-column>
        <yu-xtable-column label="区域名称" prop="areaName"></yu-xtable-column>
        <yu-xtable-column label="备注" prop="memo"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="isBegin" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="签约方式" prop="signMode" data-code="STD_SIGN_MODE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="750px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './areaManaList_dialog_BillCard';
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'areaNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/areamanager/querymodel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/areamanager/delete/'
    };
  }
};
</script>