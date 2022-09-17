<template>
  <div>
    <yu-xform v-model="searchFormdata" label-width="120px" related-table-name="refTable" form-type="search">
      <yu-xform-group :column="4">
        <yu-xform-item label="批复编号" placeholder="批复编号" ctype="input" name="replySerno"></yu-xform-item>
        <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
        <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-xtable ref="refTable" condition-key="condition" label-width="100px" request-type="POST" :data-url="dataUrl" selection-type="radio" :pageable="true">
      <yu-xtable-column label="批复编号" prop="replySerno" width="200"></yu-xtable-column>
      <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
      <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
    </yu-xtable>
    <div class="yu-grpButton">
      <yu-button icon="check" type="primary" @click="backToAdd">选取返回</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="cancel">取消</yu-button>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_REPLY_STATUS,STD_ZB_CUS_CLS,STD_CUS_STATE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl: backend.cmisBiz + '/api/lmtreplyacc/replyaccformanager',
      baseParams: {}
    };
  },
  created () {
    this.show = this.pageParams.show;
  },
  mounted () {
  },
  methods: {
    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTable.selections[0];
      this.$dialog.close(this.dialogId, params);
    },
    /**
     * 取消
     */
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
