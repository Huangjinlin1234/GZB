<template>
  <div>
    <yu-panel title="集团客户Pop">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpNo"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpName"></yu-xform-item>
          <yu-xform-item label="工商登记注册号" ctype="input" placeholder="工商登记注册号" name="businessCirclesRegiNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button ref="btn_$insert" @click="customClick('confimBtn')">选择</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="集团客户编号" prop="grpNo"></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpName"></yu-xtable-column>
        <yu-xtable-column label="核心客户编号" prop="coreCusId"></yu-xtable-column>
        <yu-xtable-column label="核心客户中征码" prop="coreCusLoanCardId"></yu-xtable-column>
        <yu-xtable-column label="核心客户名称" prop="coreCusName"></yu-xtable-column>
        <yu-xtable-column label="核心客户证件号码" prop="coreCusCertNo"></yu-xtable-column>
        <yu-xtable-column label="更新办公地址日期" prop="updateOfficeAddrDate"></yu-xtable-column>
        <yu-xtable-column label="办公地址" prop="officeAddr"></yu-xtable-column>
        <yu-xtable-column label="社会信用代码" prop="sociCredCode"></yu-xtable-column>
        <yu-xtable-column label="工商登记注册号" prop="businessCirclesRegiNo"></yu-xtable-column>
        <yu-xtable-column label="办公地址行政区划" prop="officeAddrAdminDiv"></yu-xtable-column>
        <yu-xtable-column label="集团紧密程度" prop="grpCloseTogetherDeg"></yu-xtable-column>
        <yu-xtable-column label="集团客户情况说明" prop="grpCaseMemo"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="集团客户状态" prop="groupCusStatus"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="更新人" prop="updId"></yu-xtable-column>
        <yu-xtable-column label="更新机构" prop="updBrId"></yu-xtable-column>
        <yu-xtable-column label="更新时间" prop="updDate"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_2_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + "/api/cusgrp/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + "/api/cusgrp/delete/"
    }
  }
}
</script>