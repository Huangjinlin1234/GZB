<template>
  <div>
    <yu-panel title="抵押物列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="100px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="抵质押物编号" ctype="input"  name="guarNo"></yu-xform-item>
          <yu-xform-item label="所有权人" ctype="input"  name="guarCusName"></yu-xform-item>
          <yu-xform-item label="担保合同编号" ctype="input" name="guarContNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="抵质押物编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="押品类型" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
        <yu-xtable-column label="抵质押物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="认定价值" prop="confirmAmt"></yu-xtable-column>
      </yu-xtable>
       <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="onClose" size="small">取消</el-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_GRT_FLAG');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'serno',
      dicOptions: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarcontrel/selectGrtGuarContRelLinkGuarBaseInfo',
      baseParams: {},
      deleteUrl: ''
    };
  },

  mounted () {
    this.afterInit();
  },

  methods: {
    afterInit () {
      // var data = this.pageParams;
      // this.baseParams['condition'] = {'bizType': data.bizType};
      this.$refs.refTable.remoteData();
    },
    /** *确认****/
    confirmFn () {
      const jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择至少一条记录进行操作!\r\n请重新操作!', -1, -1);
        return;
      }

      this.$dialog.close(this.dialogId, jsoPar);
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
