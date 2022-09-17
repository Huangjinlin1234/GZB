<template>
  <div>
    <yu-panel title="共借人基本信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'a.oprType':'01','r.relType':'01'}" :default-load="false">
        <yu-xtable-column label="相关人类型" prop="relType" width="100" data-code="STD_ZB_PRMSBORR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="相关人姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="客户曾用名" prop="perCustName"></yu-xtable-column>
        <yu-xtable-column label="婚姻状况" prop="marrSts" data-code="STD_ZB_MAR_ST"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_4_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'apptCode',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqpapplappt/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpapplappt/delete/"
    }
  }
}
</script>