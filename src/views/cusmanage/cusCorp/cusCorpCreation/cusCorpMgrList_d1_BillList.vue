<template>
  <div>
    <yu-panel title="对公高管人员信息列表" :hideFilter="false" :collapseHide="false">
      <!-- <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform> -->
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsect" v-show="viewType !== 'VIEW'" @click="customClick('doInsect')">新增</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$update" v-show="viewType !== 'VIEW'" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$delete" v-show="viewType !== 'VIEW'" @click="onBillListDelete">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" >
        <yu-xtable-column label="高管类别" prop="mrgType" data-code="STD_CROP_MRG_TYPE"></yu-xtable-column>
        <yu-xtable-column label="高管证件号码" prop="mrgCertCode"></yu-xtable-column>
        <yu-xtable-column label="高管证件类型" prop="mrgCertType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="高管姓名" prop="mrgName"></yu-xtable-column>
        <yu-xtable-column label="关联客户编号" prop="cusIdRel"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="950px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusCorpMgrList_dialog_BillCard';
yufp.lookup.reg("STD_CROP_MRG_TYPE")
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  props: {
    viewType: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuscorpmgr/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuscorpmgr/delete/'
    };
  }
};
</script>