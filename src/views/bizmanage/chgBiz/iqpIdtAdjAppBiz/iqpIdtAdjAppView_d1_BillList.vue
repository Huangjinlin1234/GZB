<template>
  <div>
    <yu-panel title="授信审批通知书">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno"></yu-xform-item>
          <yu-xform-item label="授信协议编号" ctype="yu-xcredit-proto2" placeholder="授信协议编号" name="lmtCtrNo"  @select-fn="commonSelectFn" :mapping="{'lmtCtrNo':'lmtCtrNo'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
<!--          <yu-button ref="btn_${billButtonVO.btnCode}" @click="${billButtonVO.methodName}">${billButtonVO.btnName}</yu-button>-->
          <yu-button ref="btn_doImage" @click="customClick('doImage')">影像查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="baseParams" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="授信协议编号" prop="lmtCtrNo"></yu-xtable-column>
        <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="授信总额度" prop="lmtTotlAmt"></yu-xtable-column>
        <yu-xtable-column label="循环额度" prop="revolvAmt"></yu-xtable-column>
        <yu-xtable-column label="一次性额度" prop="oneAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险业务类型" prop="lowRiskType" data-code="STD_ZB_LOW_RISK_TYP"></yu-xtable-column>
        <yu-xtable-column label="授信起始日期" prop="lmtStarDate"></yu-xtable-column>
        <yu-xtable-column label="授信到期日期" prop="lmtEndDate"></yu-xtable-column>
        <yu-xtable-column label="授信审批通知书有效期" prop="lmtDocIdate"></yu-xtable-column>
        <yu-xtable-column label="调整后的授信审批通知书有效期" prop="adjustIdate"></yu-xtable-column>
        <yu-xtable-column label="调整原因" prop="adjustResn"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="updName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="最后修改机构" prop="updBrId"></yu-xtable-column>
        <yu-xtable-column label="最后修改机构" prop="updBrName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="最后修改日期" prop="updDate"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType" data-code="STD_ZB_OPR_TYPE"></yu-xtable-column>
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
      dataUrl: this.$backend.cmisBiz + "/api/iqpidtadjapp/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpidtadjapp/delete/"
    }
  }
}
</script>
