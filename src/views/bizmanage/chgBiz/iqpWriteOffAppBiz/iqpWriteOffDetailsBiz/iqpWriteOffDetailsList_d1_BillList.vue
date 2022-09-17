<template>
  <div>
    <yu-panel title="呆账核销明细列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="yu-xdebt-list" placeholder="借据编号" name="billNo"  @select-fn="commonSelectFn" :mapping="{'twelveClass':'twelveClass','prdId':'prdId','guarWay':'guarWay','curType':'curType','prdName':'prdName','endDate':'endDate','contNo':'contNo','loanAmt':'loanAmt','loanBalance':'loanBalance','cusId':'cusId','billNo':'billNo','fiveClass':'fiveClass','startDate':'startDate'}" width="800" height="480" :parms="{'cusId':'${cusId}'}" ></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
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
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="起始日期" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="表内欠息" prop="innerOweInt" width="100"></yu-xtable-column>
        <yu-xtable-column label="表外欠息" prop="outOweInt"></yu-xtable-column>
        <yu-xtable-column label="累计欠息" prop="totalOweInt" width="100"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_ZB_FIVE_SORT"></yu-xtable-column>
        <yu-xtable-column label="十二级分类" prop="twelveClass" data-code="STD_ZB_TWELVE_SORT"></yu-xtable-column>
        <yu-xtable-column label="核销本金" prop="writeoffCap"></yu-xtable-column>
        <yu-xtable-column label="核销利息" prop="writeoffInt"></yu-xtable-column>
        <yu-xtable-column label="核销总金额" prop="writeoffSum" width="100"></yu-xtable-column>
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
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqpwriteoffdetl/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpwriteoffdetl/delete/"
    }
  }
}
</script>