<template>
  <div>
    <yu-panel title="业务规则方案管理">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="业务规则方案编号" ctype="input" placeholder="业务规则方案编号" name="planId"></yu-xform-item>
          <yu-xform-item label="业务规则方案名称" ctype="input" placeholder="业务规则方案名称" name="planName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_editFn" @click="customClick('editFn')">修改</yu-button>
          <yu-button ref="btn_${billButtonVO.btnCode}" @click="billButtonVO.methodName">${billButtonVO.btnName}</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_viewFn" @click="customClick('viewFn')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="true">
        <yu-xtable-column label="业务规则方案编号" prop="planId"></yu-xtable-column>
        <yu-xtable-column label="业务规则方案名称" prop="planName"></yu-xtable-column>
        <yu-xtable-column label="方案分类" prop="planType" data-code="STD_ZB_PLAN_TYPE"></yu-xtable-column>
        <yu-xtable-column label="拦截类型" prop="notiType" data-code="STD_ZB_NOTI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
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
      pkField: 'planId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + "/api/cfgbizruleplan/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgbizruleplan/delete/"
    }
  }
}
</script>
