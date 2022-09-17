<template>
  <div class="ctrCvrgContBasic_d1_B_A_billList">
    <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false">
      <!-- <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform> -->
      <yu-button-drop>
        <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
        <yu-xtable-column label="保证金账号" prop="bailAccNo"></yu-xtable-column>
        <yu-xtable-column label="保证金币种" prop="bailCurType" data-code="STD_ZX_CUR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="accobName"></yu-xtable-column>
        <yu-xtable-column label="保证金计息方式" prop="bailInterestMode"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './ctrCvrgContBasic_dialog_BillCard';
export default {
  name: 'D1BABillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/bailaccinfo/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/bailaccinfo/delete/'
    };
  }
};
</script>
<style scoped>
.ctrCvrgContBasic_d1_B_A_billList /deep/ .yu-buttons {
  margin-bottom: 10px;
}
</style>
