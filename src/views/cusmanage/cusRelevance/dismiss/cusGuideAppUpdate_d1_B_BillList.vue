<template>
  <div>
    <yu-panel title="关联客户集团申请列表">
      <yu-xform ref="refForm" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="关联成员客户编号" prop="correMemCusNo"></yu-xtable-column>
        <yu-xtable-column label="关联成员客户名称" prop="correMemCusName"></yu-xtable-column>
        <yu-xtable-column label="关联关系类型" prop="correRelaType" data-code="STD_CORRE_RELA_TYPE"></yu-xtable-column>
        <yu-xtable-column label="关联关系说明" prop="correRelaExpl"></yu-xtable-column>
        <yu-xtable-column label="数据来源" prop="dataSour" data-code="STD_ZB_DATA_SOUR"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="850px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusGuideAppUpdate_dialog_BillCard';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CORRE_RELA_TYPE,STD_ZB_DATA_SOUR');
export default{
  name: 'D1BBillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusrelcusmemberrel/',
      baseParams: {}
    };
  }
};
</script>
