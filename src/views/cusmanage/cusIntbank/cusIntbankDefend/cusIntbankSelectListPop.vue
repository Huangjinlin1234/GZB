<template>
  <div>
    <yu-panel title="同业客户选择">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="机构编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
     <yu-xtable ref="refTable" :row-number="true"  selection-type="radio" :pageable="true" condition-key="condition"  @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick"  :data-url="dataUrl" :base-params="baseParams" :default-load="false" request-type="POST">
        <yu-xtable-column label="机构编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" ref="btn_importIndiv" @click="confirm">确定</yu-button>
      <yu-button type="primary" ref="btn_onCancel" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CUS_STATE,STD_ZB_CUS_CLS');
export default {
  name: 'D12BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusintbank/querylist',
      baseParams: {condition: {}}
    };
  },
  mounted () {
    this.queryDataByCondition();
  },
  methods: {
  // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 选取
    confirm () {
      let jsoPar = '';

      // 未选择信息提示
      jsoPar = this.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.close(this.dialogId, jsoPar);
    }
  }
};
</script>
