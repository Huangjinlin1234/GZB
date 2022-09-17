<template>
  <div>
    <yu-panel title="保证人列表">
      <template slot="right">
        <yu-button-drop>
          <yu-button  @click="onImportGuar">引入</yu-button>
          <yu-button  @click="cancel">取消</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="担保编号" prop="guarantyId"></yu-xtable-column>
        <yu-xtable-column label="保证人客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型" prop="cerType"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="担保金额(元)" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="抵质押类别" prop="guarType" width="100"></yu-xtable-column>

      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  props: {
    dialogId: String
  },
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/'
    };
  },

  methods: {
    onImportGuar: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var len = selections.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }
      _this.$confirm('确认引入', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            _this.$dialog.close(_this.dialogId, selections[0]);
          }
        }
      });
    }
  }
};
</script>