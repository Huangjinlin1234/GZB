<template>
  <div>
    <yu-panel title="银票签发白名单" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请理由" ctype="select" placeholder="申请理由" name="appResn" ></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" placeholder="状态" name="status" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_stop" type="primary" v-if="checkCtrl('stop')" @click="customClick('stop')">停用</yu-button>
          <yu-button ref="btn_start" type="primary" v-if="checkCtrl('start')" @click="customClick('start')">启用</yu-button>
          <yu-button ref="btn_$query" type="primary" v-if="checkCtrl('viewlist')" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="申请理由" prop="appResn" data-code="STD_APP_RESN_YPQF"></yu-xtable-column>
        <yu-xtable-column label="申请有效期" prop="appIdate"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrg"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYpQfbmd_dialog_BillCard2';
yufp.lookup.reg('STD_ZB_STATUS');
export default {
  name: 'D12BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstypqfwhite/query',
      baseParams: {'sort': 'input_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstypqfwhite/delete/'
    };
  }
};
</script>