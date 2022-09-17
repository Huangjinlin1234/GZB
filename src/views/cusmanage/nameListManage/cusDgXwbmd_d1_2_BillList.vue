<template>
  <div>
    <yu-panel title="无还本续贷名单" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="名单归属" ctype="input" placeholder="名单归属" name="listBelg"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','orgId':'accountManagerBr'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="状态" name="status" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_stop" v-if="checkCtrl('stop')" @click="customClick('stop')">停用</yu-button>
        <yu-button type="primary" ref="btn_start" v-if="checkCtrl('start')" @click="customClick('start')">启用</yu-button>
        <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('viewlist')" @click="onBillListView">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户规模" prop="cusScale" data-code="STD_ZB_CUS_SCALE"></yu-xtable-column>
        <yu-xtable-column label="是否优良信贷客户" prop="isFineCretCus"  data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="内部评级" prop="innerEval" data-code="STD_ZB_EVAL_RST"></yu-xtable-column>
        <yu-xtable-column label="名单归属" prop="listBelg"  data-code="STD_LST_WHBXD_LIST_BELG"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrgName"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusDgXwbmd_dialog_BillCard2';
yufp.lookup.reg('STD_ZB_CUS_SCALE,STD_ZB_YES_NO,STD_ZB_EVAL_RST,STD_ZB_EVAL_RST,STD_LST_WHBXD_LIST_BELG,STD_ZB_APPR_STATUS');
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
      dataUrl: this.$backend.cmisCus + '/api/cuslstwhbxd/query',
      baseParams: {'sort': 'input_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstwhbxd/delete/'
    };
  }
};
</script>