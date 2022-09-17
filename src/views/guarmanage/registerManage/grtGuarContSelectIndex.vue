<template>
  <div>
    <yu-panel  title="担保合同信息" panel-type="normal">
        <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="100px" :custom-search-fn="customSearch">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保合同编号" ctype="input" placeholder="担保合同编号" name="guarContNo" fuzzy="both"></yu-xform-item>
            <yu-xform-item label="借款人名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" row-number="true" selection-type="radio" request-type="post"  :pageable="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :data-url="dataUrl" :default-load="false" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="担保合同编号 " prop="guarContNo"></yu-xtable-column>
          <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="guarAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="借款人名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
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
yufp.lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dicOptions: {},
      dataUrl: backend.cmisBiz + '/api/grtguarcont/queryList',
      baseParams: {}
    };
  },
  mounted () {
    this.afterInit();
  },

  methods: {
    afterInit () {
      // 刷新数据//查询条件改变时,会默认刷新页面
      this.baseParams = {condition: {
        oprType: '01', guarContState: this.pageParams.guarContState, guarWay: this.pageParams.guarWay, managerId: this.pageParams.managerId
      }};
      // this.$refs.refTable.remoteData();
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
