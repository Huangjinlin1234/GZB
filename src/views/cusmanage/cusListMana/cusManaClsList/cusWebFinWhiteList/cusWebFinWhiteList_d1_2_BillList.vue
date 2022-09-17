<template>
  <div>
    <yu-panel title="网金客户白名单信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select" data-code="STD_CUS_LIST_STATUS" placeholder="名单状态" name="listStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button ref="btn_$query" type="primary" v-if="checkCtrl('viewlist')"  @click="onBillListView">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number request-type="post" condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="名单流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="导入原因" prop="importResn" data-code="STD_LST_WTSX_IMPORT_REASON"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huserName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrgName"></yu-xtable-column>
        <yu-xtable-column label="进入日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="名单状态" prop="listStatus" data-code="STD_CUS_LIST_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusWebFinWhiteList_dialog_BillCard2';
export default{
  name: 'D12BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstwjkhwhite/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstwjkhwhite/delete/'
    };
  }
};
</script>