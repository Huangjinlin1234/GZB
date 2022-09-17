<template>
  <yu-panel title="同业机构准入名单查询">
    <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      <yu-xform-group :column="3">
        <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
        <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
        <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
        <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
        <yu-xform-item label="申请时间" ctype="datepicker" placeholder="申请时间" name="inputDate"></yu-xform-item>
        <yu-xform-item label="名单状态" ctype="select" placeholder="名单状态" name="accStatus" data-code="STD_REPLY_STATUS"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-button-drop v-if="isBtn" class="btn_bottom">
      <yu-button ref="btn_doView" type="primary" @click="selectBack">选取返回</yu-button>
    </yu-button-drop>
    <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true"
      :data-url="dataUrl" :base-params="Params" :default-load="true">
      <yu-xtable-column label="批复流水号" prop="replySerno"></yu-xtable-column>
      <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
      <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
      <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
      <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
      <yu-xtable-column label="申请时间" prop="inputDate"></yu-xtable-column>
      <yu-xtable-column label="名单状态" prop="accStatus" data-code="STD_REPLY_STATUS"></yu-xtable-column>
    </yu-xtable>
  </yu-panel>
</template>

<script>
export default {
  props: {
    btn: {
      type: String,
      // default: true,
    },
  },
  data() {
    return {
      d1_BillList: null,
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + "/api/intbankorgadmitacc/selectByModel",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/intbankorgadmitacc/delete/",
      isBtn: false,
      Params:{
        condition: JSON.stringify({oprType: '01', accStatus: '01'}),
      }
    };
  },
  created() {
    if (this.btn == "update" || this.btn == "look") {
      this.isBtn = false;
    } else if (this.btn == "add") {
      this.isBtn = true;
    }
  },
  methods: {
    selectBack() {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar.length < 1) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      } else {
        this.dialogVisibleCheck = false;
        this.$emit("changed", jsoPar[0]);
      }
    },
  },
};
</script>
<style scoped>
.btn_bottom {
  margin-bottom: 10px;
}
</style>
