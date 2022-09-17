<template>
  <div>
    <yu-panel title="权证入库申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input"  name="serno"></yu-xform-item>
          <!-- <yu-xform-item label="押品编号" ctype="input"  name="guarNo"></yu-xform-item> -->
          <yu-xform-item label="审批状态" ctype="select" placeholder="请选择" data-code="STD_ZB_APPR_STATUS" name="approveStatus"></yu-xform-item>
          <!-- <yu-xform-item label="押品所有权人" ctype="input"  name="guarCusName" fuzzy-query="both"></yu-xform-item> -->
          <yu-xform-item label="权证入库模式" ctype="select" placeholder="请选择"  data-code="STD_WARRANT_IN_TYPE" name="warrantInType"></yu-xform-item>
          <yu-xform-item label="核心担保编号" ctype="input"  name="coreGuarantyNo"></yu-xform-item>
          <yu-xform-item label="担保合同编号" ctype="input"  name="guarContNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doAdd" v-if="checkCtrl('add')" @click="customClick('doAdd')">新增</yu-button>
        <yu-button type="primary" ref="btn_doUpdate" v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_doDelete" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" show-hidden-menu="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true"  request-type="POST">
        <yu-xtable-column label="业务流水号" prop="serno"  width="180"></yu-xtable-column>
        <yu-xtable-column label="权证出入库申请类型" prop="warrantAppType" data-code="STD_WARRANT_APP_TYPE" hide-column  width="180"></yu-xtable-column>
        <yu-xtable-column label="权证入库模式" prop="warrantInType"  data-code="STD_WARRANT_IN_TYPE" width="180"></yu-xtable-column>
        <!-- <yu-xtable-column label="押品编号" prop="guarNo">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewGuar(scope.row.guarNo)">{{ scope.row.guarNo }}</a>
            </template>
        </yu-xtable-column> -->
        <!-- <yu-xtable-column label="押品所有权人" prop="guarCusName"  width="120" ></yu-xtable-column> -->
        <!-- <yu-xtable-column label="押品所有权人编号" prop="guarCusId"  width="120" hide-column></yu-xtable-column> -->
        <yu-xtable-column label="抵质押分类" prop="grtFlag"  data-code="STD_GRT_FLAG" width="120"></yu-xtable-column>
        <yu-xtable-column label="核心担保编号" prop="coreGuarantyNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="担保合同编号" prop="guarContNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName" width="180"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup } from '@/utils';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';

lookup.reg('STD_WARRANT_IN_TYPE,STD_ZB_APPR_STATUS,STD_GRT_FLAG');
export default{
  components: {guarBaseInfoView},
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {
        warrantAppType: '01',
        approveStatus: '000,992,111',
        oprType: '01'
      }},
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
