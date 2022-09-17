<template>
  <div>
    <yu-panel title="lmt_app_list_pop">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" data-code="STD_ZB_CUS_TYPE" placeholder="客户类型" name="cusType" ></yu-xform-item>
          <yu-xform-item label="授信类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="授信类型" name="lmtType" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" width="100" data-code="STD_ZB_CUS_TYPE"></yu-xtable-column>
        <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="原授信批复流水号" prop="origiLmtRstSerno"></yu-xtable-column>
        <yu-xtable-column label="测算最高流动资金贷款额度" prop="evalHighCurfundLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType"></yu-xtable-column>
        <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度合计" prop="lowRiskLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="授信期限" prop="lmtTerm"></yu-xtable-column>
        <yu-xtable-column label="授信宽限期" prop="lmtGraperTerm"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="最近修改人" prop="updId"></yu-xtable-column>
        <yu-xtable-column label="最近修改机构" prop="updBrId"></yu-xtable-column>
        <yu-xtable-column label="最近修改日期" prop="updDate"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './lmtAppSubGuarList_dialog_BillCard'
export default{
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtapp/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtapp/delete/"
    }
  }
}
</script>