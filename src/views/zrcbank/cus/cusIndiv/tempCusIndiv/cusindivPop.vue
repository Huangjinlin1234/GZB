<template>
  <div>
    <yu-panel title="客户信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certNo"></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" placeholder="客户分类" name="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型 " prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="联系电话" prop="mobileNo" ></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
      </yu-xtable>
      <div style="text-align:center;">
        <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
        <el-button @click="onClose" size="small">取消</el-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_CUS_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'cusId',
      dicOptions: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusindiv/queryAllCusIndiv',
      baseParams: {}
    };
  },
  methods: {
    /** *确认****/
    confirmFn () {
      let _this = this;
      const jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        _this.$xutils.showMsgBox('提示', '必须选择至少一条记录进行操作!\r\n请重新操作!', -1, -1);
        return;
      }

      _this.$dialog.close(_this.dialogId, jsoPar);
    },

    // 返回
    onClose () {
      let _this = this;
      _this.$dialog.close(_this.dialogId);
    }
  }
};
</script>