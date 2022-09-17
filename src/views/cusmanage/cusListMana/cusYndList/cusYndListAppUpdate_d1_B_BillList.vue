<template>
  <div>
    <yu-panel title="紧急联系人">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right" v-if="showbtn">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_onInsert" @click="customClick('onInsert')">新增</yu-button>
          <yu-button type="primary" ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label=" 紧急联系人姓名" prop="emgLinkmanName"></yu-xtable-column>
        <yu-xtable-column label=" 紧急联系人电话" prop="emgLinkmanPhone"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYndListAppUpdate_dialog_BillCard';
export default{
  name: 'D1BBillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      showbtn: true,
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstyndlinkman/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstyndlinkman/delete/'
    };
  }
};
</script>