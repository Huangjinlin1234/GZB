<template>
  <div>
    <yu-panel title="同业客户机构基本信息查看">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="机构客户编号" ctype="input" placeholder="机构客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="社会信用代码" ctype="input" placeholder="社会信用代码" name="socialCreditCode"></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480"></yu-xform-item>
          <yu-xform-item label="客户状态 " ctype="select" placeholder="客户状态 " name="cusState" data-code="STD_CUS_STATE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="机构客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="社会信用代码" prop="socialCreditCode" width="100px"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" width="100px"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button  type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button  type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CUS_STATE');
import { isLoginEdit } from '@/utils/unitchange';;
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

import mixinList from '@/utils/mixins/mixin-list';

export default{
  mixins: [mixinList],
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisCus + '/api/cusintbank/queryall',
      baseParams: {}
    };
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
