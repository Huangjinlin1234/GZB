<template>
  <div>
    <yu-panel title="发行债券信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm"  v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsect" @click="customClick('doInsect')"  v-show="viewType !== 'VIEW'">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate"  v-show="viewType !== 'VIEW'">修改</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete"  v-show="viewType !== 'VIEW'">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="债券名称" prop="bondName"></yu-xtable-column>
        <yu-xtable-column label="债券类型" prop="bondTyp" data-code="STD_ZB_BOND_TYP"></yu-xtable-column>
        <yu-xtable-column label="发行时间" prop="bondPubDt"></yu-xtable-column>
        <yu-xtable-column label="债券期限(月)" prop="bondTrm" :precision="0"></yu-xtable-column>
        <yu-xtable-column label="债券币种" prop="bondCurTyp" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="总金额(元)" prop="bondAmt"></yu-xtable-column>
        <yu-xtable-column label="年利率(%)" prop="bondRate"></yu-xtable-column>
        <yu-xtable-column label="是否上市 " prop="bondMrkFlg" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="上市地" prop="bondMrkPlace" data-code="STD_ZB_MRK_AREA"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusCorpBondInfoList_dialog_BillCard';
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_MRK_AREA');

export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  props: {
    cusId: String,
    viewType: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuscorpbond/',
      baseParams: {condition: {cusId: this.cusId}},
      deleteUrl: this.$backend.cmisCus + '/api/cuscorpbond/delete/'
    };
  },
  created () {
  }
};
</script>