<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="名单状态" name="listStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="名单流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="导入原因" prop="importResn" data-code="STD_LST_WTSX_IMPORT_REASON"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huser"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrg"></yu-xtable-column>
        <yu-xtable-column label="进入日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="名单状态" prop="listStatus" data-code="STD_CUS_LIST_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="confrim">确认</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  props: {
    pageParams: Object,
    dialogId: String
  },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstwjkhwhite/',
      baseParams: {}
    };
  },
  methods: {
    confrim () {
      var closePar = this.getSelectedRowData();
      if (!closePar) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      if(closePar.listStatus != '01'){
        this.$xutils.showMsgBox('提示', '该客户不是生效的白名单!', 350, 150);
        return;
      }
      this.$dialog.close(this.dialogId, closePar);
    },
    cancel () {
      this.$dialog.close(this.dialogId, null);
    }
  }
};
</script>