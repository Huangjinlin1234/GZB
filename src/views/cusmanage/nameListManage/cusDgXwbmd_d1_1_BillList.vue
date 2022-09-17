<template>
  <div>
    <yu-panel title="无还本续贷申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="lwaSerno"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="1200" height="600" pagePath="cusmanage/nameListManage/cus_selectIndex" title="选择"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="名单归属" ctype="select" data-code="STD_LST_WHBXD_LIST_BELG" placeholder="名单归属" name="listBelg" ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_$insert" v-if="checkCtrl('add')" @click="onBillListInsert">新增</yu-button>
        <yu-button type="primary" ref="btn_$update" v-if="checkCtrl('edit')" @click="onBillListUpdate">修改</yu-button>
        <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('view')" @click="onBillListView">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务编号" prop="lwaSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户规模" prop="cusScale" data-code="STD_ZB_CUS_SCALE"></yu-xtable-column>
        <yu-xtable-column label="是否优良信贷客户" prop="isFineCretCus" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt" ></yu-xtable-column>
        <yu-xtable-column label="内部评级" prop="innerEval" data-code="STD_ZB_EVAL_RST"></yu-xtable-column>
        <yu-xtable-column label="名单归属" prop="listBelg" data-code="STD_LST_WHBXD_LIST_BELG"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrgName"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="850px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusDgXwbmd_dialog_BillCard';
yufp.lookup.reg('STD_ZB_CUS_SCALE,STD_ZB_YES_NO,STD_ZB_EVAL_RST,STD_ZB_EVAL_RST,STD_LST_WHBXD_LIST_BELG,STD_ZB_APPR_STATUS');
export default {
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'lwaSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstwhbxdapp/query',
      baseParams: {'sort': 'app_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstwhbxdapp/delete/'
    };
  }
};
</script>
