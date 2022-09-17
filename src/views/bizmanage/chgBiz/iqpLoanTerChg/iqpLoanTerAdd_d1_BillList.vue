<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'certType':'assureCertType','cusId':'cusId','cusName':'cusName','certCode':'assureCertCode'}" width="700" height="480" :parms="{'cusState':'20','cusCatalog':'2'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xproduct" placeholder="产品编号" name="prdId"  @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_ZB_CONT_TYP" placeholder="合同状态" name="contStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doNextStep" @click="customClick('doNextStep')">下一步</yu-button>
          <yu-button ref="btn_cancel" @click="customClick('cancel')">返回</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务申请流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="主担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同余额" prop="contBalance"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
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
      pkField: 'contNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/ctrloancont/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/ctrloancont/delete/"
    }
  }
}
</script>