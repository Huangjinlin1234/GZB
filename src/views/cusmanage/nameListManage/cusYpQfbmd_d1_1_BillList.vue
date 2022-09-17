<template>
  <div>
    <yu-panel title="白名单准入申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="lywaSerno"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'lwaSerno':'lwaSerno','listBelg':'listBelg','managerBrId':'mainBrId','innerEval':'innerEval','lmtAmt':'lmtAmt','cusId':'cusId','cusName':'cusName','belgOrg':'belgOrg','managerId':'managerId'}" width="1200" height="600" pagePath="cusmanage/nameListManage/cus_selectIndex" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请理由" ctype="select" data-code="STD_APP_RESN_YPQF" placeholder="申请理由" name="appResn" ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
          <yu-button type="primary" ref="btn_$insert" v-if="checkCtrl('add')" @click="onBillListInsert">新增</yu-button>
          <yu-button type="primary" ref="btn_onUpdate" v-if="checkCtrl('edit')" @click="onBillListUpdate">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('view')" @click="onBillListView">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="lywaSerno"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="申请理由" prop="appResn" data-code="STD_APP_RESN_YPQF"></yu-xtable-column>
        <yu-xtable-column label="申请有效期" prop="appIdate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huserName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrgName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYpQfbmd_dialog_BillCard';
export default {
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'lywaSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstypqfwhiteapp/query',
      baseParams: {'sort': 'app_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstypqfwhiteapp/delete/'
    };
  }
};
</script>
