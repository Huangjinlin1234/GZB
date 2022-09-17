<template>
  <div>
    <yu-panel title="客户信息pop框">
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="customClick('doNextStep')">选择</yu-button>
          <yu-button @click="customClick('cancel')">取消</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="true" @loaded="listLoadedFn">
        <yu-xtable-column label="客户编号" prop="cusId" width="150"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" width="120" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="200"></yu-xtable-column>
        <yu-xtable-column label="开户日期" prop="openDate"></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理名称" prop="managerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_BillList",
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "cusId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCus + "/api/cusbase/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + "/api/cusbase/delete/"
    };
  },
  methods: {
    listLoadedFn(data, total) {
      this.$emit("loaded", data, total);
    }
  }
};
</script>
