<template>
  <div>
    <yu-panel title="关联客户集团列表" panel-type="simple">

        <yu-button-group>
          <yu-button type="primary" ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-group>

      <yu-xtable ref="refTable" row-number selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" request-type="POST" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="关联成员客户编号" prop="correMemCusNo"></yu-xtable-column>
        <yu-xtable-column label="关联成员客户名称" prop="correMemCusName"></yu-xtable-column>
        <yu-xtable-column label="关联关系类型" prop="correRelaType" data-code="STD_CORRE_RELA_TYPE"></yu-xtable-column>
        <yu-xtable-column label="关联关系说明" prop="correRelaExpl"></yu-xtable-column>
        <yu-xtable-column label="数据来源" prop="dataSour" data-code="STD_ZB_DATA_SOUR"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusGuideApp2_dialog_BillCard';
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
      dataUrl: this.$backend.cmisCus + '/api/cusrelcusmemberrel/query'
    };
  }
};
</script>
