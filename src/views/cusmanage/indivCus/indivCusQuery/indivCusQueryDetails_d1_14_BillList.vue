<template>
  <div>
    <yu-panel title="社会关系信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="与客户关系" prop="indivCusRel"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certNo"></yu-xtable-column>
        <yu-xtable-column label="姓名" prop="name"></yu-xtable-column>
        <yu-xtable-column label="性别" prop="sex"></yu-xtable-column>
        <yu-xtable-column label="年收入（元）" prop="yearn"></yu-xtable-column>
        <yu-xtable-column label="职业" prop="occu"></yu-xtable-column>
        <yu-xtable-column label="职务" prop="duty"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './indivCusQueryDetails_dialog_BillCard';
export default{
  name: 'D114BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusindivsocial/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusindivsocial/delete/'
    };
  }
};
</script>