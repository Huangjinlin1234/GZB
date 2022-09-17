<template>
  <div class="templetfactorydetail_d1_A_B_BillList">
    <yu-panel title="模板工厂和页面关系表" panel-type="simple">
      <template slot="right">
        <yu-button-drop class="btn-box">
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="关联类型" prop="relType" width="100" data-code="STD_ZB_REL_TYPE"></yu-xtable-column>
        <yu-xtable-column label="页面名称" prop="funcName" width="150"></yu-xtable-column>
        <yu-xtable-column label="URL" prop="funcUrl" width="150"></yu-xtable-column>
        <yu-xtable-column label="是否主页面" prop="isMainFunc" width="150" data-code="STD_ZB_Y_N"></yu-xtable-column>
        <yu-xtable-column label="页面显示顺序" prop="seqNo" width="150"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <dialog-billcard ref="dialog_BillCard" :model-group-no="modelGroupNo"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './templetfactorydetail_dialog_BillCard';
export default {
  name: 'd1_A_B_BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      modelGroupNo: '',
      dataUrl: this.$backend.cmisCfg + '/api/cfgmodelgroupdetail/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgmodelgroupdetail/delete/'
    };
  }
};
</script>
<style scoped>
.templetfactorydetail_d1_A_B_BillList /deep/ .yu-base-panel-title {
  border: none;
  position: relative;
  bottom: 4px;
}
.templetfactorydetail_d1_A_B_BillList /deep/ .yu-base-panel-right-content {
  margin-bottom: 10px;
}
</style>
