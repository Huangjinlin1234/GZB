<template>
  <div>
    <yu-panel title="权证出库历史" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input"  name="serno"></yu-xform-item>
          <!-- <yu-xform-item label="押品编号" ctype="input"  name="guarNo"></yu-xform-item>-->
          <yu-xform-item label="权证编号" ctype="input"  name="warrantNo"></yu-xform-item>
          <!-- <yu-xform-item label="押品所有权人" ctype="input" name="guarCusName"></yu-xform-item>-->
          <yu-xform-item label="权证出库原因大类" ctype="select" placeholder="请选择" data-code="STD_ZB_EXWA_TYP"  name="warrantOutType"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" placeholder="请选择" data-code="STD_ZB_APPR_STATUS"  name="approveStatus"></yu-xform-item>
          <yu-xform-item label="核心担保编号" ctype="input"  name="coreGuarantyNo"></yu-xform-item>
          <yu-xform-item label="担保合同编号" ctype="input"  name="guarContNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('viewhis')" @click="customClick('doViewHistory')">查看</yu-button>
        <!--<yu-button type="primary" ref="btn_doPrintFn" v-if="checkCtrl('export')" @click="customClick('printFn')">凭证打印</yu-button>-->
        <yu-button type="primary" ref="btn_doUpdate" v-if="checkCtrl('dorighting')" @click="customClick('doRighting')">发送核心冲正</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" show-hidden-menu="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true"  request-type="POST">
        <yu-xtable-column label="业务流水号" prop="serno"  width="120"></yu-xtable-column>
        <yu-xtable-column label="权证出入库申请类型" prop="warrantAppType" data-code="STD_WARRANT_APP_TYPE" width="120"></yu-xtable-column>
        <yu-xtable-column label="权证出库原因大类" prop="warrantOutType" data-code="STD_ZB_EXWA_TYP" width="120"></yu-xtable-column>
        <yu-xtable-column label="权证编号" prop="warrantNo"  width="120"></yu-xtable-column>
        <yu-xtable-column label="权证出库原因细类" prop="warrantOutTypeSub" data-code="STD_WARRANT_OUT_TYPE_SUB" width="120" hidden></yu-xtable-column>
        <!-- <yu-xtable-column label="押品编号" prop="guarNo"  width="120">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewGuar(scope.row.guarNo)">{{ scope.row.guarNo }}</a>
          </template>
        </yu-xtable-column>-->
        <!-- <yu-xtable-column label="押品所有权人" prop="guarCusName"  width="120" ></yu-xtable-column>-->
        <yu-xtable-column label="抵质押类别" prop="grtFlag" data-code="STD_GRT_FLAG"  width="120"></yu-xtable-column>
        <yu-xtable-column label="核心担保编号" prop="coreGuarantyNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup } from '@/utils';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';

lookup.reg('STD_ZB_APPR_STATUS,STD_WARRANT_IN_TYPE,STD_GRT_FLAG,STD_WARRANT_APP_TYPE,STD_ZB_EXWA_TYP,STD_WARRANT_OUT_TYPE_SUB,STD_ZB_YES_NO');
export default{
  components: {guarBaseInfoView},
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        warrantAppType: '02',
        approveStatus: '996,997,998',
        oprType: '01'
      },
      'sort': 'input_date desc'
      },
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      logicDeleteUrl: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/deleteOnlogic',
      dataUrl: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/queryList',
      baseParams: {}
    };
  },
  methods: {
    viewGuar: function (data) {
      this.$refs.guarBaseInfoView.guarBaseinfoView(data);
    }
  }
};
</script>
