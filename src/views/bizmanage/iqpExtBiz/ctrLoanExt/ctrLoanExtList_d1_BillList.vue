<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="展期协议号" ctype="input" placeholder="展期协议号" name="extCtrNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doSign" @click="customClick('doSign')">签订</yu-button>
          <yu-button ref="btn_doInvalid" @click="customClick('doInvalid')">作废</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'a.extCtrStatus':'001'}" :default-load="true">
        <yu-xtable-column label="展期申请流水号" prop="extSerno"></yu-xtable-column>
        <yu-xtable-column label="展期协议号" prop="extCtrNo"></yu-xtable-column>
        <yu-xtable-column label="原借据编号" prop="oldBillNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="原币种" prop="fountCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="展期金额" prop="extAmt"></yu-xtable-column>
        <yu-xtable-column label="展期到期日期" prop="extEndDate"></yu-xtable-column>
        <yu-xtable-column label="展期执行利率（年）" prop="extRealityIrY"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="展期协议状态" prop="extCtrStatus" width="100" data-code="STD_ZB_CTR_ST"></yu-xtable-column>
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
      pkField: 'extCtrNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/ctrloanext/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/ctrloanext/delete/"
    }
  }
}
</script>