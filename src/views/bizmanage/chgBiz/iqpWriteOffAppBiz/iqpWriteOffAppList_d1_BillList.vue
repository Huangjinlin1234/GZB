<template>
  <div>
    <yu-panel title="核销申请列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" :parms="{'belgLine':'bl300','cusState':'20','oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsert" @click="customClick('doInsert')">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="customClick('onDelete')">删除</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="baseParams" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="totalBal"></yu-xtable-column>
        <yu-xtable-column label="欠息累计" prop="totalSumInt" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="核销本金" prop="totalWriteoffCap"></yu-xtable-column>
        <yu-xtable-column label="核销利息" prop="totalWriteoffInt"></yu-xtable-column>
        <yu-xtable-column label="核销总金额" prop="totalWriteoffSum" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqpwriteoffapp/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpwriteoffapp/delete/"
    }
  }
}
</script>
