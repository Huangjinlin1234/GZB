<template>
  <div>
    <yu-panel title="利息减免变更列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_Oninsert" @click="customClick('Oninsert')">新增</yu-button>
          <yu-button ref="btn_OnUpdate" @click="customClick('OnUpdate')">修改</yu-button>
          <yu-button ref="btn_OnDelete" @click="customClick('OnDelete')">删除</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="200"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="200.00"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="200.00"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="180"></yu-xtable-column>
        <yu-xtable-column label="减免正常利息" prop="reducNormalInt" width="140"></yu-xtable-column>
        <yu-xtable-column label="减免逾期利息" prop="reducOverdueInt" width="160"></yu-xtable-column>
        <yu-xtable-column label="减免复利" prop="reducCi" width="160"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
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
      dataUrl: this.$backend.cmisBiz + "/api/iqpintreducapp/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpintreducapp/delete/"
    }
  }
}
</script>
